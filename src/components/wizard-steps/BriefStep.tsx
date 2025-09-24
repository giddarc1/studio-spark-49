import { useCallback, useState } from "react";
import { Upload, X, FileText, Image as ImageIcon, Palette, Layers, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  const renderCompactUploadSection = (
    category: string, 
    files: File[], 
    showDescriptions: boolean = false
  ) => (
    <div className="space-y-4">
      <div 
        className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer"
        onDrop={(e) => {
          e.preventDefault();
          handleFileUpload(e.dataTransfer.files, category);
        }}
        onDragOver={handleDragOver}
        onClick={() => document.getElementById(`${category}-upload`)?.click()}
      >
        <Upload className="w-5 h-5 text-muted-foreground mx-auto mb-1" />
        <p className="text-sm text-muted-foreground mb-1">
          Drag and drop or click to browse
        </p>
        <p className="text-xs text-muted-foreground">
          JPG, PNG, PDF, AI, PSD (Max 10MB each)
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
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
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
                      <FileText className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute -top-1 -right-1 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeFile(index, category)}
                >
                  <X className="w-2.5 h-2.5" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground truncate">
                {file.name}
              </p>
              {showDescriptions && (
                <Input
                  placeholder="Describe this reference..."
                  value={otherReferenceDescriptions[index] || ''}
                  onChange={(e) => updateOtherReferenceDescription(index, e.target.value)}
                  className="text-xs h-7"
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
      <CardContent className="space-y-6">
        {/* Reference Materials Tabs */}
        <div>
          <Label className="text-base font-medium mb-3 block">Reference Materials</Label>
          <Tabs defaultValue="moodBoards" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="moodBoards" className="flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span className="hidden sm:inline">Mood Boards</span>
                <span className="sm:hidden">Mood</span>
              </TabsTrigger>
              <TabsTrigger value="styleFrames" className="flex items-center gap-1">
                <Layers className="w-3 h-3" />
                <span className="hidden sm:inline">Style Frames</span>
                <span className="sm:hidden">Style</span>
              </TabsTrigger>
              <TabsTrigger value="colorPalettes" className="flex items-center gap-1">
                <Palette className="w-3 h-3" />
                <span className="hidden sm:inline">Color Palettes</span>
                <span className="sm:hidden">Colors</span>
              </TabsTrigger>
              <TabsTrigger value="otherReferences" className="flex items-center gap-1">
                <ImageIcon className="w-3 h-3" />
                <span className="hidden sm:inline">Other</span>
                <span className="sm:hidden">Other</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="moodBoards" className="mt-4">
              <p className="text-sm text-muted-foreground mb-3">Visual inspiration and overall aesthetic direction</p>
              {renderCompactUploadSection("moodBoards", moodBoards)}
            </TabsContent>
            
            <TabsContent value="styleFrames" className="mt-4">
              <p className="text-sm text-muted-foreground mb-3">Layout compositions and visual style references</p>
              {renderCompactUploadSection("styleFrames", styleFrames)}
            </TabsContent>
            
            <TabsContent value="colorPalettes" className="mt-4">
              <p className="text-sm text-muted-foreground mb-3">Color schemes and brand palette references</p>
              {renderCompactUploadSection("colorPalettes", colorPalettes)}
            </TabsContent>
            
            <TabsContent value="otherReferences" className="mt-4">
              <p className="text-sm text-muted-foreground mb-3">Any additional references - add descriptions below each upload</p>
              {renderCompactUploadSection("otherReferences", otherReferences, true)}
            </TabsContent>
          </Tabs>
        </div>

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
            className="min-h-[100px] resize-none"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Be as detailed as possible to get the best AI-generated results.
          </p>
        </div>

        {/* Example References */}
        <div className="bg-muted/30 rounded-lg p-3">
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
