import { useCallback } from "react";
import { Upload, X, FileText, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface BriefStepProps {
  data: any;
  updateData: (updates: any) => void;
}

export const BriefStep = ({ data, updateData }: BriefStepProps) => {
  const handleFileUpload = useCallback((files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files);
      updateData({ 
        briefAssets: [...data.briefAssets, ...newFiles] 
      });
    }
  }, [data.briefAssets, updateData]);

  const removeFile = (index: number) => {
    const newAssets = data.briefAssets.filter((_: any, i: number) => i !== index);
    updateData({ briefAssets: newAssets });
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    handleFileUpload(e.dataTransfer.files);
  }, [handleFileUpload]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Brief & Concept
        </CardTitle>
        <CardDescription>
          Upload mood boards, style frames, color palettes, and reference materials to define your creative vision.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Asset Upload Zone */}
        <div>
          <Label className="text-base font-medium mb-3 block">Reference Materials</Label>
          <div 
            className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById('asset-upload')?.click()}
          >
            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground mb-2">
              Drag and drop files here, or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              Supports: JPG, PNG, PDF, AI, PSD (Max 10MB each)
            </p>
            <input 
              id="asset-upload"
              type="file" 
              multiple 
              accept="image/*,.pdf,.ai,.psd"
              className="hidden"
              onChange={(e) => handleFileUpload(e.target.files)}
            />
          </div>
          
          {/* Uploaded Files Preview */}
          {data.briefAssets.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {data.briefAssets.map((file: File, index: number) => (
                <div key={index} className="relative group">
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
                    onClick={() => removeFile(index)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1 truncate">
                    {file.name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Creative Brief Notes */}
        <div>
          <Label htmlFor="brief-notes" className="text-base font-medium mb-3 block">
            Creative Brief
          </Label>
          <Textarea
            id="brief-notes"
            placeholder="Describe your creative vision, target audience, brand guidelines, color preferences, mood, style direction, and any specific requirements..."
            value={data.briefNotes}
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