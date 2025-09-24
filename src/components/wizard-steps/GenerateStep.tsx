import { useState } from "react";
import { Sparkles, Star, Download, Trash2, Share, Edit3, Play, Heart, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface GenerateStepProps {
  data: any;
  updateData: (updates: any) => void;
}

interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  isFavorited: boolean;
  comments: Comment[];
}

interface Comment {
  id: string;
  user: string;
  message: string;
  timestamp: string;
}

// Mock generated images
const mockImages: GeneratedImage[] = [
  {
    id: '1',
    url: '/api/placeholder/400/600',
    prompt: 'Professional jewelry photography with elegant lighting on marble surface',
    isFavorited: false,
    comments: []
  },
  {
    id: '2',
    url: '/api/placeholder/400/600',
    prompt: 'Modern minimalist product shot with soft shadows',
    isFavorited: true,
    comments: [
      { id: '1', user: 'Sarah M.', message: 'Love this composition!', timestamp: '2 min ago' }
    ]
  },
  {
    id: '3',
    url: '/api/placeholder/400/600',
    prompt: 'Lifestyle shot with natural lighting and casual styling',
    isFavorited: false,
    comments: []
  },
  {
    id: '4',
    url: '/api/placeholder/400/600',
    prompt: 'High-fashion editorial style with dramatic lighting',
    isFavorited: false,
    comments: []
  }
];

export const GenerateStep = ({ data, updateData }: GenerateStepProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>(mockImages);
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);
  const [editPrompt, setEditPrompt] = useState('');
  const [newComment, setNewComment] = useState('');

  const generateImages = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Add new generated images
    const newImages = Array.from({ length: 4 }, (_, i) => ({
      id: Date.now() + i + '',
      url: '/api/placeholder/400/600',
      prompt: `Generated image ${i + 1} based on project brief`,
      isFavorited: false,
      comments: []
    }));
    
    setGeneratedImages(prev => [...prev, ...newImages]);
    updateData({ generatedImages: [...generatedImages, ...newImages] });
    setIsGenerating(false);
  };

  const toggleFavorite = (imageId: string) => {
    setGeneratedImages(prev => 
      prev.map(img => 
        img.id === imageId 
          ? { ...img, isFavorited: !img.isFavorited }
          : img
      )
    );
  };

  const regenerateImage = async (imageId: string) => {
    if (!editPrompt.trim()) return;
    
    setGeneratedImages(prev => 
      prev.map(img => 
        img.id === imageId 
          ? { ...img, prompt: editPrompt }
          : img
      )
    );
    
    setEditPrompt('');
    setSelectedImage(null);
    
    // Simulate regeneration
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  const addComment = (imageId: string) => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now() + '',
      user: 'You',
      message: newComment,
      timestamp: 'Just now'
    };
    
    setGeneratedImages(prev => 
      prev.map(img => 
        img.id === imageId 
          ? { ...img, comments: [...img.comments, comment] }
          : img
      )
    );
    
    setNewComment('');
  };

  const deleteImage = (imageId: string) => {
    setGeneratedImages(prev => prev.filter(img => img.id !== imageId));
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Generate & Edit
        </CardTitle>
        <CardDescription>
          Create AI-powered campaign images and collaborate on refinements with your team.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Generation Controls */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20">
          <div>
            <h3 className="font-medium text-foreground">Ready to Generate</h3>
            <p className="text-sm text-muted-foreground">
              {data.selectedModels?.length || 0} models • {data.productImages?.length || 0} products • Brief uploaded
            </p>
          </div>
          <Button 
            onClick={generateImages} 
            disabled={isGenerating}
            className="gap-2 min-w-[140px]"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Images
              </>
            )}
          </Button>
        </div>

        {/* Generated Images Grid */}
        {generatedImages.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-foreground">Generated Images ({generatedImages.length})</h3>
              <div className="flex gap-2">
                <Badge variant="secondary">
                  <Heart className="w-3 h-3 mr-1" />
                  {generatedImages.filter(img => img.isFavorited).length} Favorited
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {generatedImages.map((image) => (
                <div key={image.id} className="group relative">
                  <div className="aspect-[3/4] rounded-lg overflow-hidden bg-muted border">
                    {/* Placeholder image */}
                    <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center">
                      <div className="text-center">
                        <Sparkles className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-xs text-muted-foreground">AI Generated Image</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors rounded-lg">
                    <div className="absolute top-2 right-2 space-y-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="icon"
                        variant={image.isFavorited ? "default" : "secondary"}
                        className="w-8 h-8"
                        onClick={() => toggleFavorite(image.id)}
                      >
                        <Star className={`w-4 h-4 ${image.isFavorited ? 'fill-current' : ''}`} />
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="w-8 h-8"
                        onClick={() => {
                          setSelectedImage(image);
                          setEditPrompt(image.prompt);
                        }}
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="absolute bottom-2 left-2 right-2 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex gap-1">
                        <Button size="sm" variant="secondary" className="flex-1 text-xs">
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                        <Button size="sm" variant="secondary" className="flex-1 text-xs">
                          <Share className="w-3 h-3 mr-1" />
                          Share
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive" 
                          onClick={() => deleteImage(image.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Image Info */}
                  <div className="mt-3 space-y-2">
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {image.prompt}
                    </p>
                    
                    {image.comments.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-1 text-xs text-primary"
                        onClick={() => setSelectedImage(image)}
                      >
                        <MessageSquare className="w-3 h-3 mr-1" />
                        {image.comments.length} comment{image.comments.length !== 1 ? 's' : ''}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {generatedImages.length === 0 && (
          <div className="text-center py-12">
            <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Ready to Create Magic</h3>
            <p className="text-muted-foreground mb-6">
              Click "Generate Images" to create stunning AI-powered campaign shots based on your brief.
            </p>
          </div>
        )}
      </CardContent>

      {/* Image Detail Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Image Details & Edit</DialogTitle>
          </DialogHeader>
          
          {selectedImage && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Image Preview */}
              <div className="space-y-4">
                <div className="aspect-[3/4] rounded-lg overflow-hidden bg-muted">
                  <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center">
                    <Sparkles className="w-16 h-16 text-muted-foreground" />
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button className="flex-1 gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2">
                    <Share className="w-4 h-4" />
                    Share
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => toggleFavorite(selectedImage.id)}
                  >
                    <Star className={`w-4 h-4 ${selectedImage.isFavorited ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>

              {/* Edit & Comments */}
              <div className="space-y-6">
                {/* Edit Prompt */}
                <div>
                  <h4 className="font-medium mb-2">Edit Prompt</h4>
                  <Textarea
                    value={editPrompt}
                    onChange={(e) => setEditPrompt(e.target.value)}
                    placeholder="Describe changes you want to make..."
                    className="min-h-[100px]"
                  />
                  <Button 
                    className="w-full mt-2 gap-2" 
                    onClick={() => regenerateImage(selectedImage.id)}
                    disabled={!editPrompt.trim()}
                  >
                    <Play className="w-4 h-4" />
                    Regenerate Image
                  </Button>
                </div>

                {/* Comments */}
                <div>
                  <h4 className="font-medium mb-2">Team Comments</h4>
                  <div className="space-y-3 max-h-40 overflow-y-auto">
                    {selectedImage.comments.map((comment) => (
                      <div key={comment.id} className="text-sm">
                        <div className="flex justify-between items-start">
                          <span className="font-medium">{comment.user}</span>
                          <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                        </div>
                        <p className="text-muted-foreground mt-1">{comment.message}</p>
                      </div>
                    ))}
                    {selectedImage.comments.length === 0 && (
                      <p className="text-sm text-muted-foreground">No comments yet</p>
                    )}
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <Input
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addComment(selectedImage.id)}
                    />
                    <Button 
                      onClick={() => addComment(selectedImage.id)}
                      disabled={!newComment.trim()}
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};