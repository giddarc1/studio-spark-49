import { useState } from "react";
import { Plus, FolderOpen, Users, Calendar, ChevronRight, Upload, Palette, Camera, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'in-progress' | 'review' | 'completed';
  collaborators: number;
  lastUpdated: string;
  step: number;
}

export const ProjectsSection = () => {
  const [projects] = useState<Project[]>([
    {
      id: '1',
      name: 'Summer Jewelry Collection',
      description: 'AI-generated campaign shots for new summer jewelry line',
      status: 'in-progress',
      collaborators: 3,
      lastUpdated: '2 hours ago',
      step: 2
    },
    {
      id: '2',
      name: 'Winter Apparel Campaign',
      description: 'Holiday season clothing photography replacement',
      status: 'review',
      collaborators: 5,
      lastUpdated: '1 day ago',
      step: 4
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'review': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const workflowSteps = [
    { icon: Palette, title: 'Brief & Concept', description: 'Upload mood boards and style references' },
    { icon: Users, title: 'Model Selection', description: 'Choose AI models or upload references' },
    { icon: Upload, title: 'Product Upload', description: 'Bulk upload product images' },
    { icon: Camera, title: 'Generate & Edit', description: 'AI generation and collaborative editing' }
  ];

  return (
    <div className="pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Projects</h1>
            <p className="text-lg text-muted-foreground">
              Collaborative photoshoot replacement workflows
            </p>
          </div>
          <Button className="gap-2 shadow-[var(--shadow-soft)]">
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Project List */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">Your Projects</h2>
            
            {projects.length === 0 ? (
              <Card className="card-elevated text-center py-12">
                <CardContent>
                  <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Create your first project to start generating professional product photography.
                  </p>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create First Project
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {projects.map((project) => (
                  <Card key={project.id} className="card-interactive">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-xl">{project.name}</CardTitle>
                            <Badge className={getStatusColor(project.status)}>
                              {project.status.replace('-', ' ')}
                            </Badge>
                          </div>
                          <CardDescription className="text-base">
                            {project.description}
                          </CardDescription>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {project.collaborators} members
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {project.lastUpdated}
                          </span>
                        </div>
                        <div className="text-primary font-medium">
                          Step {project.step}/4
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Workflow Guide */}
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-6">Project Workflow</h2>
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-lg">Campaign Process</CardTitle>
                <CardDescription>
                  Professional photoshoot replacement in 4 steps
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {workflowSteps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <step.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-foreground mb-1">
                        {step.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="card-elevated mt-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Edit3 className="w-5 h-5" />
                  Team Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  Real-time collaboration
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  Comment & approval system
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  Version history tracking
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  Role-based permissions
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};