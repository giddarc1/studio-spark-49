import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ImagesSection } from "@/components/ImagesSection";

const Index = () => {
  const [activeMode, setActiveMode] = useState<'home' | 'projects' | 'images'>('home');

  const renderContent = () => {
    switch (activeMode) {
      case 'projects':
        return <ProjectsSection />;
      case 'images':
        return <ImagesSection />;
      default:
        return <HeroSection onModeSelect={setActiveMode} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-surface">
      <Navigation activeMode={activeMode} onModeChange={setActiveMode} />
      <main className="transition-all duration-500 ease-out">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;