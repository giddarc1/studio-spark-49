import { useState } from "react";
import { ArrowLeft, ArrowRight, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BriefStep } from "./wizard-steps/BriefStep";
import { ModelStep } from "./wizard-steps/ModelStep";
import { ProductStep } from "./wizard-steps/ProductStep";
import { GenerateStep } from "./wizard-steps/GenerateStep";

interface ProjectWizardProps {
  projectId?: string;
  onClose: () => void;
  onSave: (projectData: any) => void;
}

interface ProjectData {
  name: string;
  briefAssets: File[];
  briefNotes: string;
  selectedModels: any[];
  uploadedModelImages: File[];
  productImages: File[];
  generatedImages: any[];
}

const steps = [
  { id: 1, title: "Brief & Concept", subtitle: "Upload mood boards and creative direction" },
  { id: 2, title: "Model Selection", subtitle: "Choose AI models or upload references" },
  { id: 3, title: "Products Upload", subtitle: "Upload your product images" },
  { id: 4, title: "Generate & Edit", subtitle: "Create and refine your campaign images" }
];

export const ProjectWizard = ({ projectId, onClose, onSave }: ProjectWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [projectData, setProjectData] = useState<ProjectData>({
    name: `New Project ${new Date().toLocaleDateString()}`,
    briefAssets: [],
    briefNotes: "",
    selectedModels: [],
    uploadedModelImages: [],
    productImages: [],
    generatedImages: []
  });

  const updateProjectData = (updates: Partial<ProjectData>) => {
    setProjectData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveAndExit = () => {
    onSave(projectData);
    onClose();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BriefStep 
            data={projectData} 
            updateData={updateProjectData}
          />
        );
      case 2:
        return (
          <ModelStep 
            data={projectData} 
            updateData={updateProjectData}
          />
        );
      case 3:
        return (
          <ProductStep 
            data={projectData} 
            updateData={updateProjectData}
          />
        );
      case 4:
        return (
          <GenerateStep 
            data={projectData} 
            updateData={updateProjectData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <input 
                type="text" 
                value={projectData.name}
                onChange={(e) => updateProjectData({ name: e.target.value })}
                className="text-xl font-semibold bg-transparent border-none outline-none text-foreground focus:underline"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleSaveAndExit} className="gap-2">
                <Save className="w-4 h-4" />
                Save & Exit
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="border-b bg-background">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex items-center gap-3">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                    ${currentStep >= step.id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                    }
                  `}>
                    {step.id}
                  </div>
                  <div className="hidden sm:block">
                    <div className={`font-medium text-sm ${
                      currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {step.subtitle}
                    </div>
                  </div>
                </div>
                
                {index < steps.length - 1 && (
                  <div className={`
                    flex-1 h-0.5 mx-4
                    ${currentStep > step.id ? 'bg-primary' : 'bg-muted'}
                  `} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <Card className="card-elevated">
          {renderStep()}
        </Card>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={prevStep}
              disabled={currentStep === 1}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            
            <div className="text-sm text-muted-foreground">
              Step {currentStep} of {steps.length}
            </div>
            
            <Button 
              onClick={nextStep}
              disabled={currentStep === 4}
              className="gap-2"
            >
              {currentStep === 4 ? 'Complete' : 'Next'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};