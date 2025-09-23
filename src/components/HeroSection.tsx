import { ArrowRight, Star, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

interface HeroSectionProps {
  onModeSelect: (mode: 'projects' | 'images') => void;
}

export const HeroSection = ({ onModeSelect }: HeroSectionProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Before/After Example */}
            <div className="relative">
              <div className="bg-muted/50 rounded-2xl p-8 text-center">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-6">
                  <Star className="w-4 h-4 fill-current" />
                  "We've tested a bunch of tools, they have the best quality."
                </div>
                <img 
                  src={heroImage} 
                  alt="Before and after product transformation" 
                  className="w-full h-auto rounded-xl shadow-lg"
                />
              </div>
            </div>

            {/* Right Side - Main Content */}
            <div className="text-center lg:text-left space-y-8">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Pro-quality product photos{" "}
                <span className="text-muted-foreground">in seconds</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Generate, enhance, and edit with AI. Perfect for your catalogs, ads, and socials.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  onClick={() => onModeSelect('projects')}
                  size="lg" 
                  className="text-lg px-8 py-6"
                >
                  Start creating free
                </Button>
                <Button 
                  onClick={() => onModeSelect('images')}
                  variant="outline" 
                  size="lg" 
                  className="text-lg px-8 py-6"
                >
                  Quick tools
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="border-t bg-muted/30 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-muted-foreground text-lg mb-8">
            Join over 10,000 businesses creating together
          </p>
          
          {/* Company Logos Placeholder */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center opacity-60">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-8 bg-muted rounded-lg flex items-center justify-center">
                <span className="text-xs text-muted-foreground font-medium">Brand {i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Feature Overview */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Your all-in-one AI photo studio
          </h2>
          <p className="text-lg text-muted-foreground mb-12">
            Simplify your product photography with tools that handle everything
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
                <Check className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Background Replacement</h3>
              <p className="text-muted-foreground">Replace backgrounds instantly with AI-generated scenes</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
                <Check className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">AI Model Generation</h3>
              <p className="text-muted-foreground">Create lifestyle shots with AI models wearing your products</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
                <Check className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Team Collaboration</h3>
              <p className="text-muted-foreground">Work together on campaigns with real-time editing</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};