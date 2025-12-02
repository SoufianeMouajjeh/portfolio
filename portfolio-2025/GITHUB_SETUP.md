# GitHub Contribution Graph Setup Guide

## Current Status
✅ Code is ready
⚠️ Needs environment variables configuration

## Steps to Complete Setup:

### 1. Create GitHub Personal Access Token

1. Go to [GitHub Settings → Developer Settings → Personal Access Tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a name: `Portfolio Contribution Graph`
4. Select permissions:
   - ✅ `read:user` (Read user profile data)
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again!)

### 2. Add Environment Variables

Your `.env.local` file should contain:

```env
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_GITHUB_USERNAME=SoufianeMouajjeh
```

Replace `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` with your actual token.

### 3. Restart Development Server

After adding the environment variables:

```bash
# Stop the current dev server (Ctrl+C)
# Then restart it
npm run dev
```

## Troubleshooting

### Error: "GITHUB_TOKEN environment variable is not set"
- Make sure `.env.local` exists in the root directory
- Check that the variable name is exactly `GITHUB_TOKEN` (not `GITHUB_API_TOKEN` or similar)
- Restart your dev server after creating/editing `.env.local`

### Error: "Invalid response from GitHub API"
This usually means:
1. The username doesn't exist on GitHub
2. The token doesn't have the right permissions
3. The token has expired

**To debug:**
Check the server console for the full error message with the API response.

### Error: "Cannot read properties of undefined (reading 'map')"
This means the fallback data had an issue with Date serialization (now fixed).

## Testing the Setup

Once configured correctly, you should see:
- ✅ No errors in the console
- ✅ Real GitHub contribution graph displaying
- ✅ Hover tooltips showing actual dates and contribution counts
- ✅ Total contribution count at the bottom

## How It Works

1. **Server-Side Fetch**: `app/page.tsx` calls the server action
2. **GitHub API Call**: `lib/github.ts` queries GitHub GraphQL API
3. **Data Transform**: Maps GitHub's data to the component's format
4. **Client Render**: `ContributionGraph` displays with animations
5. **Caching**: Data is cached for 1 hour to avoid rate limits

## GraphQL Query Being Used

```graphql
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
```

## Fallback Behavior

If the GitHub API fails for any reason, the component will:
- ✅ Still render (no crashes)
- ✅ Show generated fallback data
- ✅ Log the error to the console
- ✅ Maintain all animations and UI

This ensures your portfolio never breaks even if GitHub is down!
