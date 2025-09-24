import { useCallback, useState } from "react";
import { Upload, X, CheckCircle, AlertCircle, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface ProductStepProps {
  data: any;
  updateData: (updates: any) => void;
}

interface ProductImage {
  file: File;
  status: 'uploading' | 'processing' | 'valid' | 'error';
  errorMessage?: string;
  preview: string;
}

export const ProductStep = ({ data, updateData }: ProductStepProps) => {
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});

  // Mock validation function
  const validateImage = async (file: File): Promise<{ valid: boolean; error?: string }> => {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    // Mock validation logic
    if (file.size > 10 * 1024 * 1024) {
      return { valid: false, error: "File too large (max 10MB)" };
    }
    if (!file.type.startsWith('image/')) {
      return { valid: false, error: "Invalid file type" };
    }
    
    // Random validation failure for demo
    if (Math.random() < 0.1) {
      return { valid: false, error: "Poor image quality detected" };
    }
    
    return { valid: true };
  };

  const processFile = async (file: File): Promise<ProductImage> => {
    const preview = URL.createObjectURL(file);
    const productImage: ProductImage = {
      file,
      status: 'processing',
      preview
    };

    // Update progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        const current = prev[file.name] || 0;
        if (current >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return { ...prev, [file.name]: current + 10 };
      });
    }, 100);

    const validation = await validateImage(file);
    clearInterval(progressInterval);
    
    setUploadProgress(prev => ({ ...prev, [file.name]: 100 }));

    if (validation.valid) {
      return { ...productImage, status: 'valid' };
    } else {
      return { 
        ...productImage, 
        status: 'error', 
        errorMessage: validation.error 
      };
    }
  };

  const handleFileUpload = useCallback(async (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files);
    const currentImages = data.productImages || [];
    
    // Add files with processing status
    const processingImages = newFiles.map(file => ({
      file,
      status: 'uploading' as const,
      preview: URL.createObjectURL(file)
    }));

    updateData({ 
      productImages: [...currentImages, ...processingImages] 
    });

    // Process each file
    for (const file of newFiles) {
      try {
        const processedImage = await processFile(file);
        updateData((prevData: any) => ({
          productImages: prevData.productImages.map((img: ProductImage) => 
            img.file.name === file.name ? processedImage : img
          )
        }));
      } catch (error) {
        updateData((prevData: any) => ({
          productImages: prevData.productImages.map((img: ProductImage) => 
            img.file.name === file.name 
              ? { ...img, status: 'error', errorMessage: 'Processing failed' }
              : img
          )
        }));
      }
    }
  }, [data.productImages, updateData]);

  const removeImage = (index: number) => {
    const newImages = (data.productImages || []).filter((_: any, i: number) => i !== index);
    updateData({ productImages: newImages });
  };

  const replaceImage = (index: number) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const newImages = [...(data.productImages || [])];
        newImages[index] = {
          file,
          status: 'uploading',
          preview: URL.createObjectURL(file)
        };
        updateData({ productImages: newImages });
        
        processFile(file).then(processedImage => {
          updateData((prevData: any) => ({
            productImages: prevData.productImages.map((img: ProductImage, i: number) => 
              i === index ? processedImage : img
            )
          }));
        });
      }
    };
    input.click();
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    handleFileUpload(e.dataTransfer.files);
  }, [handleFileUpload]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const productImages = data.productImages || [];
  const validImages = productImages.filter((img: ProductImage) => img.status === 'valid');
  const errorImages = productImages.filter((img: ProductImage) => img.status === 'error');

  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="w-5 h-5" />
          Products Upload
        </CardTitle>
        <CardDescription>
          Upload your product images with clean, white backgrounds for the best AI generation results.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Statistics */}
        {productImages.length > 0 && (
          <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-semibold text-foreground">{productImages.length}</div>
              <div className="text-sm text-muted-foreground">Total Uploaded</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-green-600">{validImages.length}</div>
              <div className="text-sm text-muted-foreground">Validated</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-red-600">{errorImages.length}</div>
              <div className="text-sm text-muted-foreground">Errors</div>
            </div>
          </div>
        )}

        {/* Upload Zone */}
        <div 
          className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => document.getElementById('product-upload')?.click()}
        >
          <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground mb-2">
            Drag and drop product images here, or click to browse
          </p>
          <p className="text-xs text-muted-foreground">
            Supports: JPG, PNG • White background recommended • Max 10MB each
          </p>
          <input 
            id="product-upload"
            type="file" 
            multiple 
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileUpload(e.target.files)}
          />
        </div>

        {/* Image Grid */}
        {productImages.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {productImages.map((image: ProductImage, index: number) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-muted border">
                  <img 
                    src={image.preview}
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Status Indicator */}
                <div className="absolute top-2 left-2">
                  {image.status === 'uploading' && (
                    <Badge variant="secondary" className="text-xs">
                      Uploading...
                    </Badge>
                  )}
                  {image.status === 'processing' && (
                    <Badge variant="secondary" className="text-xs">
                      Processing...
                    </Badge>
                  )}
                  {image.status === 'valid' && (
                    <Badge className="text-xs bg-green-600 hover:bg-green-700">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Valid
                    </Badge>
                  )}
                  {image.status === 'error' && (
                    <Badge variant="destructive" className="text-xs">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Error
                    </Badge>
                  )}
                </div>

                {/* Progress Bar for uploading files */}
                {image.status === 'uploading' && uploadProgress[image.file.name] && (
                  <div className="absolute bottom-2 left-2 right-2">
                    <Progress value={uploadProgress[image.file.name]} className="h-1" />
                  </div>
                )}

                {/* Action Buttons */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity space-x-2">
                    <Button 
                      size="sm" 
                      variant="secondary"
                      onClick={() => replaceImage(index)}
                    >
                      Replace
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => removeImage(index)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                {/* Error Message */}
                {image.status === 'error' && image.errorMessage && (
                  <p className="text-xs text-red-600 mt-1">{image.errorMessage}</p>
                )}
                
                {/* File Name */}
                <p className="text-xs text-muted-foreground mt-1 truncate">
                  {image.file.name}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Guidelines */}
        <div className="bg-muted/30 rounded-lg p-4">
          <h4 className="font-medium text-sm mb-2">📷 Upload Guidelines</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• White or clean backgrounds work best for AI generation</li>
            <li>• High resolution images (at least 1024x1024px) recommended</li>
            <li>• Multiple angles of the same product can improve results</li>
            <li>• Avoid shadows, reflections, or distracting elements</li>
            <li>• Product should be centered and well-lit</li>
          </ul>
        </div>
      </CardContent>
    </>
  );
};