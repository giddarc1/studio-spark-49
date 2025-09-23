import { ArrowRight, FolderOpen, Camera, Sparkles, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import heroImage from "@/assets/hero-image.jpg";

interface HeroSectionProps {
  onModeSelect: (mode: 'projects' | 'images') => void;
}

export const HeroSection = ({ onModeSelect }: HeroSectionProps) => {
  return (
    <div className="pt-16 pb-8">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm text-primary font-medium">
            <Sparkles className="w-4 h-4" />
            AI-Powered Photography Studio
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
            Replace Traditional
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Product Photography
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Create stunning jewelry, apparel, and product images with AI. No photoshoots, 
            no studios, no limits. Generate professional campaign shots in minutes.
          </p>
        </div>

        {/* Hero Image */}
        <div className="mt-8 relative">
          <div className="card-elevated rounded-2xl overflow-hidden">
            <img 
              src={heroImage} 
              alt="AI Photography Studio Interface" 
              className="w-full h-auto"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
        </div>
      </section>

      {/* Mode Selection */}
      <section className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Choose Your Workflow
          </h2>
          <p className="text-lg text-muted-foreground">
            Team collaboration or quick solo generation
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Projects Mode */}
          <Card className="card-interactive group border-2 hover:border-primary/20">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
                  <FolderOpen className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  Team Mode
                </div>
              </div>
              <CardTitle className="text-2xl">Projects</CardTitle>
              <CardDescription className="text-base">
                Full campaign workflow with team collaboration, 
                mood boards, and professional photoshoot replacement.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  Brief & concept planning
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  AI model selection
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  Bulk product uploads
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  Real-time collaboration
                </li>
              </ul>
              <Button 
                onClick={() => onModeSelect('projects')}
                className="w-full group-hover:shadow-[var(--shadow-glow)] transition-all"
              >
                Start Project
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Images Mode */}
          <Card className="card-interactive group border-2 hover:border-accent/20">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center mb-4">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Zap className="w-4 h-4" />
                  Quick Mode
                </div>
              </div>
              <CardTitle className="text-2xl">Images</CardTitle>
              <CardDescription className="text-base">
                Fast, single-user tools for immediate image generation.
                Perfect for quick product shots and variations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-accent" />
                  Background replacement
                </li>
                <li className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-accent" />
                  AI model generation
                </li>
                <li className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-accent" />
                  Campaign shots
                </li>
                <li className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-accent" />
                  Free prompt editing
                </li>
              </ul>
              <Button 
                onClick={() => onModeSelect('images')}
                variant="secondary"
                className="w-full group-hover:bg-accent group-hover:text-accent-foreground transition-all"
              >
                Generate Images
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};