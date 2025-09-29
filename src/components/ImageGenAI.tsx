import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Download, Sparkles, Image as ImageIcon, Wand2, Palette, Zap, Star } from 'lucide-react';
import { useImageGeneration } from '@/hooks/useImageGeneration';
import { toast } from 'sonner';

const ImageGenAI = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { isGenerating, generatedImages, generateImage, resetImages } = useImageGeneration();


  const examplePrompts = [
    "Luxury sports car parked in a modern glass building lobby, dramatic lighting, commercial automotive advertisement",
    "Professional business team celebrating success in a sleek boardroom, cinematic corporate photography",
    "Premium skincare product floating in ethereal lighting with water droplets, beauty advertisement style",
    "High-end restaurant interior with elegant plating, food photography for luxury dining magazine",
    "Fashion model in designer clothing against urban cityscape backdrop, editorial fashion photography",
    "Technology product showcase with holographic elements, futuristic commercial advertising style"
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt to generate an image');
      return;
    }

    try {
      await generateImage({ 
        prompt
      });
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  const handleDownload = async (imageUrl: string, index: number) => {
    try {
      const res = await fetch(imageUrl, { mode: 'cors' });
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `cinematic-ai-image-${index + 1}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success(`Image ${index + 1} downloaded successfully!`);
    } catch (e) {
      toast.error('Download failed. Please try again.');
    }
  };

  const handleDownloadAll = async () => {
    if (generatedImages.length === 0) return;
    
    for (let i = 0; i < generatedImages.length; i++) {
      await handleDownload(generatedImages[i], i);
      // Small delay between downloads to prevent overwhelming the browser
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  };

  const handleNewImages = () => {
    resetImages();
    setPrompt('');
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle relative overflow-hidden">
      {/* Cyberpunk Background Mesh */}
      <div className="fixed inset-0 bg-gradient-mesh opacity-50 pointer-events-none"></div>
      
      {/* Hero Header */}
      <header className="bg-gradient-hero text-primary-foreground py-24 relative overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-3xl"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="animate-fade-in">
            <div className="flex items-center justify-center gap-6 mb-8 animate-float">
              <div className="p-4 bg-primary/20 rounded-2xl backdrop-blur-xl border border-primary/30 animate-pulse-neon">
                <Wand2 className="w-10 h-10" />
              </div>
              <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-primary-glow to-secondary bg-clip-text text-transparent">
                NovaCode AI STUDIO
              </h1>
              <div className="p-4 bg-secondary/20 rounded-2xl backdrop-blur-xl border border-secondary/30 animate-glow">
                <Sparkles className="w-10 h-10" />
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-bold opacity-95 max-w-5xl mx-auto leading-relaxed mb-4">
              Generate 20 Professional Cinematic Images Instantly
            </p>
            <p className="text-lg md:text-xl opacity-80 max-w-4xl mx-auto leading-relaxed">
              Powered by cutting-edge AI technology for advertisement-quality visuals
            </p>
            <div className="flex items-center justify-center gap-6 mt-8">
              <Badge variant="secondary" className="px-6 py-3 text-base bg-primary/20 border border-primary/30 backdrop-blur-xl">
                <Star className="w-5 h-5 mr-2" />
                20 Images Per Prompt
              </Badge>
              <Badge variant="secondary" className="px-6 py-3 text-base bg-secondary/20 border border-secondary/30 backdrop-blur-xl">
                <Zap className="w-5 h-5 mr-2" />
                Flux AI Technology
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Input Section */}
          <div className="animate-slide-up">
            <Card className="card-elegant p-8 max-w-4xl mx-auto">
              <CardContent className="space-y-8 p-0">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary/20 rounded-xl">
                      <Palette className="w-6 h-6 text-primary" />
                    </div>
                    <label className="text-2xl font-bold text-foreground">
                      Describe Your Cinematic Vision
                    </label>
                  </div>
                  <Textarea
                    placeholder="Describe your professional advertisement concept... Think like a creative director: lighting, composition, mood, style, setting. The more specific, the better the results."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-40 text-lg border-2 border-primary/20 focus:border-primary/60 bg-muted/20 backdrop-blur-xl rounded-xl transition-all duration-300 resize-none"
                    disabled={isGenerating}
                  />
                  <p className="text-muted-foreground mt-3 text-base">
                    💡 Pro tip: Include specific details about lighting, camera angles, mood, and visual style for cinematic results
                  </p>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className="btn-hero w-full h-16 text-xl"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-7 h-7 mr-4 animate-spin" />
                      Generating 20 Professional Images...
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-7 h-7 mr-4" />
                      Generate 20 Cinematic Images
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Example Prompts */}
            <Card className="card-cyber p-8 max-w-4xl mx-auto">
              <CardContent className="p-0">
                <h3 className="font-bold text-xl text-foreground mb-8 flex items-center gap-3">
                  <div className="p-2 bg-accent/20 rounded-xl">
                    <Sparkles className="w-6 h-6 text-accent" />
                  </div>
                  Professional Advertisement Examples
                </h3>
                <div className="grid gap-4">
                  {examplePrompts.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => setPrompt(example)}
                      className="text-left w-full p-6 rounded-xl bg-muted/30 hover:bg-muted/50 border border-primary/20 hover:border-primary/40 transition-all duration-300 text-base backdrop-blur-xl group"
                      disabled={isGenerating}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-3 h-3 bg-gradient-primary rounded-full mt-2 flex-shrink-0 group-hover:animate-pulse-neon"></div>
                        <span className="text-foreground font-medium">{example}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Output Section */}
          <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            {isGenerating ? (
              <Card className="card-elegant p-12">
                <CardContent className="p-0">
                  <div className="text-center">
                    <div className="animate-glow mb-8">
                      <div className="relative">
                        <Sparkles className="w-24 h-24 mx-auto text-primary animate-float" />
                        <div className="absolute inset-0 animate-spin">
                          <Loader2 className="w-24 h-24 mx-auto text-accent/50" />
                        </div>
                      </div>
                    </div>
                    <h2 className="text-3xl font-bold text-foreground mb-4">
                      Nexus AI is crafting your cinematic masterpieces...
                    </h2>
                    <p className="text-xl text-muted-foreground mb-8">
                      Generating 20 professional-grade images with advertisement quality
                    </p>
                    <div className="w-96 h-4 bg-muted/30 rounded-full mx-auto overflow-hidden">
                      <div className="h-full bg-gradient-primary rounded-full animate-shimmer" 
                           style={{ 
                             width: '100%',
                             background: 'linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 50%, hsl(var(--primary)) 100%)',
                             backgroundSize: '200% 100%'
                           }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : generatedImages.length > 0 ? (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
                    <div className="p-2 bg-primary/20 rounded-xl">
                      <ImageIcon className="w-8 h-8 text-primary" />
                    </div>
                    Your Cinematic Collection ({generatedImages.length} Images)
                  </h2>
                  <div className="flex gap-4">
                    <Button
                      onClick={handleDownloadAll}
                      className="btn-professional h-12 px-6"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download All
                    </Button>
                    <Button
                      onClick={handleNewImages}
                      variant="outline"
                      className="px-6 h-12 border-2 border-accent/30 hover:border-accent/60 text-accent hover:bg-accent/10"
                    >
                      Create New Collection
                    </Button>
                  </div>
                </div>

                <div className="gallery-grid">
                  {generatedImages.map((imageUrl, index) => (
                    <div 
                      key={index} 
                      className="gallery-item group cursor-pointer"
                      onClick={() => setSelectedImage(imageUrl)}
                    >
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={imageUrl}
                          alt={`Generated cinematic image ${index + 1} for: ${prompt}`}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-4 flex justify-between items-center">
                        <span className="text-sm font-semibold text-foreground">
                          Image #{index + 1}
                        </span>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(imageUrl, index);
                          }}
                          size="sm"
                          className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedImage && (
                  <div 
                    className="fixed inset-0 bg-background/95 backdrop-blur-xl z-50 flex items-center justify-center p-8"
                    onClick={() => setSelectedImage(null)}
                  >
                    <div className="max-w-4xl max-h-full">
                      <img
                        src={selectedImage}
                        alt="Selected cinematic image"
                        className="w-full h-full object-contain rounded-2xl shadow-glow"
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Card className="card-elegant p-12">
                <CardContent className="p-0">
                  <div className="text-center">
                    <div className="animate-float mb-8">
                      <ImageIcon className="w-24 h-24 mx-auto text-primary opacity-50" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      Your Cinematic Studio Awaits
                    </h3>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                      Enter your creative vision above and generate 20 professional-quality images instantly
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-32 animate-fade-in relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-primary-glow to-secondary bg-clip-text text-transparent">
              Why Choose NEXUS AI Studio?
            </h2>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
              Next-generation AI technology for professional cinematic imagery
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {[
              {
                icon: Sparkles,
                title: "20 Images Per Generation",
                description: "Generate multiple professional variations instantly, giving you endless creative options for your projects.",
              },
              {
                icon: ImageIcon,
                title: "Zero Cost, Maximum Quality",
                description: "Enterprise-grade AI technology accessible to everyone. No subscriptions, no hidden fees, no limits.",
              },
              {
                icon: Zap,
                title: "Cinematic Excellence",
                description: "Advertisement-quality results with perfect lighting, composition, and professional-grade aesthetics.",
              }
            ].map((feature, index) => (
              <Card key={index} className="card-cyber p-10 text-center group hover:scale-105 transition-all duration-500">
                <CardContent className="p-0">
                  <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-primary flex items-center justify-center group-hover:animate-pulse-neon">
                    <feature.icon className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-32 text-center animate-fade-in relative z-10">
          <Card className="card-elegant p-16 bg-gradient-hero border-primary/30">
            <CardContent className="p-0">
              <h2 className="text-4xl font-black mb-6 text-primary-foreground">Ready to Create Your Cinematic Collection?</h2>
              <p className="text-xl opacity-90 mb-10 max-w-3xl mx-auto text-primary-foreground">
                Join the future of visual content creation with AI-powered professional imagery
              </p>
              <Button 
                onClick={() => {
                  document.querySelector('textarea')?.focus();
                  document.querySelector('textarea')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-hero text-xl px-12 py-6"
              >
                <Wand2 className="w-6 h-6 mr-3" />
                Launch Your Studio
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ImageGenAI;