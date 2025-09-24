import { useState } from "react";
import { Users, Upload, Search, Filter, Star, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ModelStepProps {
  data: any;
  updateData: (updates: any) => void;
}

const mockModels = [
  { id: 1, name: "Elena Martinez", category: "Fashion", ethnicity: "Latina", age: "25-30", featured: true },
  { id: 2, name: "James Chen", category: "Lifestyle", ethnicity: "Asian", age: "30-35", featured: false },
  { id: 3, name: "Amara Johnson", category: "Beauty", ethnicity: "African American", age: "20-25", featured: true },
  { id: 4, name: "Lucas Weber", category: "Sports", ethnicity: "Caucasian", age: "25-30", featured: false },
  { id: 5, name: "Priya Patel", category: "Business", ethnicity: "South Asian", age: "28-33", featured: false },
  { id: 6, name: "Sofia Rodriguez", category: "Fashion", ethnicity: "Latina", age: "22-27", featured: true },
];

export const ModelStep = ({ data, updateData }: ModelStepProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [previewModel, setPreviewModel] = useState<any>(null);

  const filteredModels = mockModels.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         model.ethnicity.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || model.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const toggleModelSelection = (model: any) => {
    const isSelected = data.selectedModels.some((m: any) => m.id === model.id);
    if (isSelected) {
      updateData({
        selectedModels: data.selectedModels.filter((m: any) => m.id !== model.id)
      });
    } else {
      updateData({
        selectedModels: [...data.selectedModels, model]
      });
    }
  };

  const handleCustomModelUpload = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files);
      updateData({
        uploadedModelImages: [...data.uploadedModelImages, ...newFiles]
      });
    }
  };

  const removeCustomModel = (index: number) => {
    updateData({
      uploadedModelImages: data.uploadedModelImages.filter((_: any, i: number) => i !== index)
    });
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Model Selection
        </CardTitle>
        <CardDescription>
          Choose AI models from our library or upload your own reference images for custom model creation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="ai-library" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ai-library">AI Model Library</TabsTrigger>
            <TabsTrigger value="custom-upload">Custom References</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ai-library" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Search models by name or ethnicity..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                {["all", "fashion", "lifestyle", "beauty", "business"].map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="capitalize"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Selected Models */}
            {data.selectedModels.length > 0 && (
              <div>
                <h4 className="font-medium text-sm mb-3">Selected Models ({data.selectedModels.length})</h4>
                <div className="flex gap-2 flex-wrap">
                  {data.selectedModels.map((model: any) => (
                    <Badge key={model.id} variant="secondary" className="gap-2">
                      {model.name}
                      <button onClick={() => toggleModelSelection(model)}>
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Model Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredModels.map((model) => {
                const isSelected = data.selectedModels.some((m: any) => m.id === model.id);
                return (
                  <div 
                    key={model.id} 
                    className={`relative group cursor-pointer border-2 rounded-lg overflow-hidden transition-all ${
                      isSelected ? 'border-primary shadow-lg' : 'border-transparent hover:border-muted-foreground/50'
                    }`}
                  >
                    <div className="aspect-[3/4] bg-gradient-to-br from-muted to-muted-foreground/20">
                      {/* Placeholder for model image */}
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <Users className="w-12 h-12" />
                      </div>
                    </div>
                    
                    {model.featured && (
                      <div className="absolute top-2 left-2">
                        <Badge variant="secondary" className="text-xs">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity space-y-2">
                        <Button 
                          size="sm" 
                          onClick={() => setPreviewModel(model)}
                          variant="secondary"
                        >
                          Preview
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => toggleModelSelection(model)}
                          variant={isSelected ? "destructive" : "default"}
                        >
                          {isSelected ? "Remove" : "Select"}
                        </Button>
                      </div>
                    </div>

                    <div className="p-3 bg-background">
                      <h4 className="font-medium text-sm">{model.name}</h4>
                      <p className="text-xs text-muted-foreground">{model.ethnicity} • {model.age}</p>
                      <p className="text-xs text-primary">{model.category}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="custom-upload" className="space-y-6">
            {/* Upload Zone */}
            <div 
              className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors"
              onClick={() => document.getElementById('model-upload')?.click()}
            >
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-2">
                Upload reference images for custom model creation
              </p>
              <p className="text-xs text-muted-foreground">
                Multiple angles recommended • JPG, PNG • Max 10MB each
              </p>
              <input 
                id="model-upload"
                type="file" 
                multiple 
                accept="image/*"
                className="hidden"
                onChange={(e) => handleCustomModelUpload(e.target.files)}
              />
            </div>

            {/* Custom Model References */}
            {data.uploadedModelImages.length > 0 && (
              <div>
                <h4 className="font-medium text-sm mb-3">Reference Images ({data.uploadedModelImages.length})</h4>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                  {data.uploadedModelImages.map((file: File, index: number) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                        <img 
                          src={URL.createObjectURL(file)}
                          alt={`Reference ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeCustomModel(index)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-medium text-sm mb-2">📸 Reference Tips</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Upload 5-10 clear photos from different angles</li>
                <li>• Include front, side, and 3/4 profile views</li>
                <li>• Ensure good lighting and sharp focus</li>
                <li>• Avoid heavy makeup or filters for best results</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>

        {/* Preview Modal */}
        <Dialog open={!!previewModel} onOpenChange={() => setPreviewModel(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Model Preview - {previewModel?.name}</DialogTitle>
            </DialogHeader>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center">
                <Users className="w-16 h-16 text-muted-foreground" />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">{previewModel?.name}</h3>
                  <p className="text-muted-foreground">{previewModel?.ethnicity}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Age Range:</span>
                    <span>{previewModel?.age}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Category:</span>
                    <span>{previewModel?.category}</span>
                  </div>
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => {
                    toggleModelSelection(previewModel);
                    setPreviewModel(null);
                  }}
                >
                  {data.selectedModels.some((m: any) => m.id === previewModel?.id) ? 'Remove Model' : 'Select Model'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </>
  );
};