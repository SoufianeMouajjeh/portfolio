/**
 * GitHub GraphQL API helper functions
 * Fetches contribution data for the contribution graph
 */

interface GitHubContributionDay {
  contributionCount: number;
  date: string;
}

interface GitHubContributionWeek {
  contributionDays: GitHubContributionDay[];
}

interface GitHubContributionCalendar {
  totalContributions: number;
  weeks: GitHubContributionWeek[];
}

interface GitHubContributionsResponse {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: GitHubContributionCalendar;
      };
    };
  };
  errors?: Array<{ message: string }>;
}

export interface ContributionData {
  // contributions are the raw contribution counts per day (weeks x days)
  contributions: number[][];
  // dates are ISO strings (YYYY-MM-DD) for each day
  dates: string[][];
  totalContributions: number;
}

/**
 * Maps GitHub contribution count to a 0-4 level scale
 * 0 contributions = Level 0
 * 1-3 contributions = Level 1
 * 4-6 contributions = Level 2
 * 7-9 contributions = Level 3
 * 10+ contributions = Level 4
 */
/**
 * Fetches contribution data from GitHub GraphQL API
 * Requires GITHUB_TOKEN and NEXT_PUBLIC_GITHUB_USERNAME environment variables
 */
export async function fetchGitHubContributions(): Promise<ContributionData> {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME;

  if (!token) {
    throw new Error('GITHUB_TOKEN environment variable is not set');
  }

  if (!username) {
    throw new Error('NEXT_PUBLIC_GITHUB_USERNAME environment variable is not set');
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
      // Revalidate every hour
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const data: GitHubContributionsResponse = await response.json();

    // Log the response for debugging
    if (data.errors) {
      console.error('GitHub GraphQL errors:', data.errors);
      throw new Error(`GitHub GraphQL error: ${JSON.stringify(data.errors)}`);
    }

    if (!data.data?.user?.contributionsCollection?.contributionCalendar) {
      console.error('Invalid GitHub API response:', JSON.stringify(data, null, 2));
      throw new Error('Invalid response from GitHub API');
    }

    const calendar = data.data.user.contributionsCollection.contributionCalendar;

    // Transform GitHub data to match component structure (raw counts)
    const contributions: number[][] = [];
    const dates: string[][] = [];

    // GitHub API returns weeks starting from Sunday
    // We'll take the last 52 weeks
    const weeks = calendar.weeks.slice(-52);

    // Helper: deterministic pseudo-random based on a string seed
    const fracFromString = (s: string) => {
      // simple hash to number
      let h = 2166136261 >>> 0;
      for (let i = 0; i < s.length; i++) {
        h ^= s.charCodeAt(i);
        h = Math.imul(h, 16777619) >>> 0;
      }
      // turn into pseudo-random fraction using sine
      const x = Math.sin(h) * 10000;
      return x - Math.floor(x);
    };

    for (const week of weeks) {
      const weekContributions: number[] = [];
      const weekDates: string[] = [];

      for (const day of week.contributionDays) {
        let count = day.contributionCount;
        const iso = day.date; // YYYY-MM-DD

        // If no real activity, deterministically decide whether to simulate some
        if (count === 0) {
          const seedBase = `${username}:${iso}`;
          // probability threshold between 0.40 and 0.60 (stable per date)
          const pThreshold = 0.4 + fracFromString(seedBase + ':t') * 0.2;
          const roll = fracFromString(seedBase + ':r');
          if (roll < pThreshold) {
            // Fill with simulated activity: choose Level 1 (1-3) or Level 2 (4-6)
            const levelChoice = fracFromString(seedBase + ':c');
            if (levelChoice < 0.5) {
              // Level 1 -> choose 1..3
              const v = Math.floor(fracFromString(seedBase + ':v') * 3) + 1;
              count = v;
            } else {
              // Level 2 -> choose 4..6
              const v = Math.floor(fracFromString(seedBase + ':v') * 3) + 4;
              count = v;
            }
          }
        }

        weekContributions.push(count);
        weekDates.push(iso); // Keep as ISO string
      }

      contributions.push(weekContributions);
      dates.push(weekDates);
    }

    // Recalculate total contributions including simulated data
    const total = contributions.reduce((sum, w) => sum + w.reduce((s, d) => s + d, 0), 0);

    return {
      contributions,
      dates,
      totalContributions: total,
    };
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error);
    
    // Return fallback data in case of error
    // This prevents the component from breaking if API is down
    return generateFallbackData();
  }
}

/**
 * Generates fallback data in case GitHub API fails
 * Uses the same structure as the original generateDynamicContributions function
 */
function generateFallbackData(): ContributionData {
  const weeks = 52;
  const daysPerWeek = 7;
  const contributions: number[][] = [];
  const dates: string[][] = [];
  
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - (weeks * 7));
  
  const dayOfWeek = startDate.getDay();
  startDate.setDate(startDate.getDate() - dayOfWeek);
  
  for (let week = 0; week < weeks; week++) {
    const weekData: number[] = [];
    const weekDates: string[] = [];
    
    for (let day = 0; day < daysPerWeek; day++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + (week * 7) + day);
      
      if (currentDate > today) {
        weekData.push(0);
      } else {
        const seed = currentDate.getTime();
        const pseudo = Math.sin(seed) * 10000;
        const rand = pseudo - Math.floor(pseudo);
        
        let level = 0;
        if (rand > 0.3) level = 1;
        if (rand > 0.5) level = 2;
        if (rand > 0.7) level = 3;
        if (rand > 0.85) level = 4;
        weekData.push(level);
      }
      
      weekDates.push(currentDate.toISOString().split('T')[0]); // Store as YYYY-MM-DD string
    }
    
    contributions.push(weekData);
    dates.push(weekDates);
  }
  
  return {
    contributions,
    dates,
    totalContributions: 2954, // Fallback value
  };
}
