import { Camera, FolderOpen, Home, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  activeMode: 'home' | 'projects' | 'images';
  onModeChange: (mode: 'home' | 'projects' | 'images') => void;
}

export const Navigation = ({ activeMode, onModeChange }: NavigationProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onModeChange('home')}
          >
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:animate-glow transition-all">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-semibold text-foreground">PhotoStudio</span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            <Button
              variant={activeMode === 'home' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onModeChange('home')}
              className="gap-2"
            >
              <Home className="w-4 h-4" />
              Home
            </Button>
            <Button
              variant={activeMode === 'projects' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onModeChange('projects')}
              className="gap-2"
            >
              <FolderOpen className="w-4 h-4" />
              Projects
            </Button>
            <Button
              variant={activeMode === 'images' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onModeChange('images')}
              className="gap-2"
            >
              <Camera className="w-4 h-4" />
              Images
            </Button>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};