import { useState } from "react";
import { Camera, Palette, Users, Wand2, Edit3, Sparkles, Upload, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ImageTool {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  badge?: string;
  color: string;
}

export const ImagesSection = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const imageTools: ImageTool[] = [
    {
      id: 'background',
      title: 'Plain Background Generator',
      description: 'Create clean product shots with custom background colors and professional lighting',
      icon: Palette,
      badge: 'Popular',
      color: 'primary'
    },
    {
      id: 'replacement',
      title: 'Background Replacement', 
      description: 'Replace backgrounds with custom scenes, themes, or uploaded reference images',
      icon: Camera,
      color: 'accent'
    },
    {
      id: 'ai-model',
      title: 'AI Model Wearing Product',
      description: 'Generate AI models showcasing your products with customizable styles and poses',
      icon: Users,
      badge: 'New',
      color: 'success'
    },
    {
      id: 'real-model',
      title: 'Real Model Simulation',
      description: 'Create realistic human models wearing or using your products',
      icon: Sparkles,
      color: 'warning'
    },
    {
      id: 'campaign',
      title: 'Campaign Shots',
      description: 'Professional campaign-style photography for seasonal and themed collections',
      icon: Wand2,
      color: 'destructive'
    },
    {
      id: 'free-prompt',
      title: 'Free Prompt / Edit',
      description: 'Custom image generation and editing with natural language prompts',
      icon: Edit3,
      color: 'muted'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'primary': return 'bg-primary text-primary-foreground';
      case 'accent': return 'bg-accent text-accent-foreground';
      case 'success': return 'bg-success text-success-foreground';
      case 'warning': return 'bg-warning text-warning-foreground';
      case 'destructive': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getBorderColor = (color: string) => {
    switch (color) {
      case 'primary': return 'border-primary/20 hover:border-primary/40';
      case 'accent': return 'border-accent/20 hover:border-accent/40';
      case 'success': return 'border-success/20 hover:border-success/40';
      case 'warning': return 'border-warning/20 hover:border-warning/40';
      case 'destructive': return 'border-destructive/20 hover:border-destructive/40';
      default: return 'border-border hover:border-muted/40';
    }
  };

  return (
    <div className="pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Image Generation Tools</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fast, powerful AI tools for instant product photography. 
            No setup required - just upload and generate.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="card-elevated text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">6</div>
              <div className="text-sm text-muted-foreground">AI Tools</div>
            </CardContent>
          </Card>
          <Card className="card-elevated text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-accent">30s</div>
              <div className="text-sm text-muted-foreground">Avg. Generation</div>
            </CardContent>
          </Card>
          <Card className="card-elevated text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-success">4K</div>
              <div className="text-sm text-muted-foreground">Max Resolution</div>
            </CardContent>
          </Card>
          <Card className="card-elevated text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-warning">∞</div>
              <div className="text-sm text-muted-foreground">Variations</div>
            </CardContent>
          </Card>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {imageTools.map((tool) => (
            <Card 
              key={tool.id} 
              className={`card-interactive border-2 ${getBorderColor(tool.color)} group cursor-pointer`}
              onClick={() => setSelectedTool(tool.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getColorClasses(tool.color)}`}>
                    <tool.icon className="w-6 h-6" />
                  </div>
                  {tool.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {tool.badge}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {tool.title}
                </CardTitle>
                <CardDescription className="text-base">
                  {tool.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                >
                  Open Tool
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Upload Area */}
        <Card className="card-elevated mt-12">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <Upload className="w-6 h-6" />
              Quick Upload & Generate
            </CardTitle>
            <CardDescription className="text-lg">
              Drag and drop your product images to get started instantly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-primary/50 transition-colors cursor-pointer group">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4 group-hover:text-primary transition-colors" />
              <p className="text-lg font-medium text-foreground mb-2">
                Drop your product images here
              </p>
              <p className="text-muted-foreground mb-6">
                Supports JPG, PNG up to 20MB each
              </p>
              <Button className="gap-2">
                <Upload className="w-4 h-4" />
                Browse Files
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="text-lg">Best Results</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>• Use high-resolution product images</p>
              <p>• White or transparent backgrounds work best</p>
              <p>• Multiple angles increase variety</p>
            </CardContent>
          </Card>
          
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="text-lg">Export Options</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>• PNG with transparency</p>
              <p>• High-resolution JPEG</p>
              <p>• Batch download available</p>
            </CardContent>
          </Card>
          
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="text-lg">Pro Tips</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>• Use specific prompts for better results</p>
              <p>• Save favorite styles as templates</p>
              <p>• Iterate with small adjustments</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};