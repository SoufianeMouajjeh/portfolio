'use server';

import { fetchGitHubContributions, type ContributionData } from '@/lib/github';

/**
 * Server Action to fetch GitHub contribution data
 * This runs on the server and can safely access environment variables
 */
export async function getGitHubContributions(): Promise<ContributionData> {
  return await fetchGitHubContributions();
}
