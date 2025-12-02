"use client";

import { HeroSection } from "@/components/sections/HeroSection";
import { ContributionGraph } from "@/components/sections/ContributionGraph";
import { LinksSection } from "@/components/sections/LinksSection";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { Footer } from "@/components/sections/Footer";
import { IslandNavigation } from "@/components/navigation/IslandNavigation";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#C5CBD7]">
      <main className="w-full max-w-[758px] mx-auto pb-32">
        {/* Hero Section */}
        <HeroSection />

        {/* Dashed Separator */}
        <div className="w-full border-t border-dashed border-black/20 my-4" />

        {/* Contribution Graph with Navigation Context */}
        <div className="relative">
          <ContributionGraph />
        </div>

        {/* Dashed Separator */}
        <div className="w-full border-t border-dashed border-black/20 my-4" />

        {/* Links Section */}
        <LinksSection />

        {/* Dashed Separator */}
        <div className="w-full border-t border-dashed border-black/20 my-4" />

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
