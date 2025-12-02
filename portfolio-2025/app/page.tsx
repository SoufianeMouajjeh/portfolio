import { HeroSection } from "@/components/sections/HeroSection";
import { ContributionGraph } from "@/components/sections/ContributionGraph";
import { LinksSection } from "@/components/sections/LinksSection";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { Footer } from "@/components/sections/Footer";
import { IslandNavigation } from "@/components/navigation/IslandNavigation";
import { getGitHubContributions } from "@/app/actions/github";

export default async function Home() {
  // Fetch GitHub contribution data server-side
  const contributionData = await getGitHubContributions();

  // Support legacy property name `counts` if present (some earlier runs used `counts`)
  const legacy = (contributionData as unknown) as { counts?: number[][] };
  const weeks = contributionData.contributions ?? legacy.counts ?? [];
  const dates = contributionData.dates ?? [];
  const total = contributionData.totalContributions ?? 0;

  // Ensure structure is correct (52 weeks x 7 days)
  const safeWeeks = Array.isArray(weeks) ? weeks : [];

  return (
    <div className="min-h-screen bg-[#C5CBD7]">
      <main className="w-full max-w-[758px] mx-auto pb-32">
        {/* Hero Section */}
        <HeroSection />

        {/* Contribution Graph with Navigation Context */}
        <div className="relative">
          <ContributionGraph
            contributions={safeWeeks}
            dates={dates}
            totalContributions={total}
          />
        </div>
        {/* Links Section */}
        <LinksSection />
        {/* Projects Grid */}
        <ProjectsGrid />

        {/* Footer */}
        <Footer />
      </main>

      {/* Floating Island Navigation */}
      <IslandNavigation />
    </div>
  );
}
