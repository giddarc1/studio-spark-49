import { useCallback } from "react";
import { Upload, X, FileText, Image as ImageIcon, Palette, Layers, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface BriefStepProps {
  data: any;
  updateData: (updates: any) => void;
}

export const BriefStep = ({ data, updateData }: BriefStepProps) => {
  // Initialize data structure if not present
  const moodBoards = data.moodBoards || [];
  const styleFrames = data.styleFrames || [];
  const colorPalettes = data.colorPalettes || [];
  const otherReferences = data.otherReferences || [];
  const otherReferenceDescriptions = data.otherReferenceDescriptions || [];

  const handleFileUpload = useCallback((files: FileList | null, category: string) => {
    if (files) {
      const newFiles = Array.from(files);
      updateData({ 
        [category]: [...(data[category] || []), ...newFiles] 
      });
    }
  }, [data, updateData]);

  const removeFile = (index: number, category: string) => {
    const newAssets = (data[category] || []).filter((_: any, i: number) => i !== index);
    updateData({ [category]: newAssets });
    
    // Also remove description if it's other references
    if (category === 'otherReferences') {
      const newDescriptions = otherReferenceDescriptions.filter((_: any, i: number) => i !== index);
      updateData({ otherReferenceDescriptions: newDescriptions });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const updateOtherReferenceDescription = (index: number, description: string) => {
    const newDescriptions = [...otherReferenceDescriptions];
    newDescriptions[index] = description;
    updateData({ otherReferenceDescriptions: newDescriptions });
  };

  const renderUploadSection = (
    title: string, 
    icon: React.ReactNode, 
    category: string, 
    files: File[], 
    description?: string
  ) => (
    <div className="space-y-4">
      <Label className="text-base font-medium flex items-center gap-2">
        {icon}
        {title}
      </Label>
      <div 
        className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer"
        onDrop={(e) => {
          e.preventDefault();
          handleFileUpload(e.dataTransfer.files, category);
        }}
        onDragOver={handleDragOver}
        onClick={() => document.getElementById(`${category}-upload`)?.click()}
      >
        <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm text-muted-foreground mb-1">
          Drag and drop files here, or click to browse
        </p>
        <p className="text-xs text-muted-foreground">
          {description || "Supports: JPG, PNG, PDF, AI, PSD (Max 10MB each)"}
        </p>
        <input 
          id={`${category}-upload`}
          type="file" 
          multiple 
          accept="image/*,.pdf,.ai,.psd"
          className="hidden"
          onChange={(e) => handleFileUpload(e.target.files, category)}
        />
      </div>
      
      {/* Uploaded Files Preview */}
      {files.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {files.map((file: File, index: number) => (
            <div key={index} className="space-y-2">
              <div className="relative group">
                <div className="aspect-square rounded-lg bg-muted border overflow-hidden">
                  {file.type.startsWith('image/') ? (
                    <img 
                      src={URL.createObjectURL(file)} 
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FileText className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeFile(index, category)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground truncate">
                {file.name}
              </p>
              {category === 'otherReferences' && (
                <Input
                  placeholder="Describe this reference..."
                  value={otherReferenceDescriptions[index] || ''}
                  onChange={(e) => updateOtherReferenceDescription(index, e.target.value)}
                  className="text-xs"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Brief & Concept
        </CardTitle>
        <CardDescription>
          Upload reference materials and define your creative vision with detailed categories.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Mood Boards Section */}
        {renderUploadSection(
          "Mood Boards", 
          <Sparkles className="w-4 h-4" />, 
          "moodBoards", 
          moodBoards,
          "Visual inspiration and overall aesthetic direction"
        )}

        {/* Style Frames Section */}
        {renderUploadSection(
          "Style Frames", 
          <Layers className="w-4 h-4" />, 
          "styleFrames", 
          styleFrames,
          "Layout compositions and visual style references"
        )}

        {/* Color Palettes Section */}
        {renderUploadSection(
          "Color Palettes", 
          <Palette className="w-4 h-4" />, 
          "colorPalettes", 
          colorPalettes,
          "Color schemes and brand palette references"
        )}

        {/* Other Reference Materials Section */}
        {renderUploadSection(
          "Other Reference Materials", 
          <ImageIcon className="w-4 h-4" />, 
          "otherReferences", 
          otherReferences,
          "Any additional references - add descriptions below each upload"
        )}

        {/* Creative Brief Notes */}
        <div>
          <Label htmlFor="brief-notes" className="text-base font-medium mb-3 block">
            Creative Brief
          </Label>
          <Textarea
            id="brief-notes"
            placeholder="Describe your creative vision, target audience, brand guidelines, mood, style direction, and any specific requirements..."
            value={data.briefNotes || ''}
            onChange={(e) => updateData({ briefNotes: e.target.value })}
            className="min-h-[120px] resize-none"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Be as detailed as possible to get the best AI-generated results.
          </p>
        </div>

        {/* Example References */}
        <div className="bg-muted/30 rounded-lg p-4">
          <h4 className="font-medium text-sm mb-2">💡 Pro Tips</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Upload mood boards to define visual style and color palette</li>
            <li>• Include pose references for better model positioning</li>
            <li>• Add lighting examples for consistent campaign look</li>
            <li>• Reference competitor campaigns for inspiration</li>
          </ul>
        </div>
      </CardContent>
    </>
  );
};
