import { useState } from 'react';
import { toast } from 'sonner';

interface GenerateImageParams {
  prompt: string;
  width?: number; // Not used by API directly, kept for future providers
  height?: number; // Not used by API directly, kept for future providers
  model?: 'gemini-2.5-flash-image-preview';
  apiKey?: string; // Optional override, otherwise read from localStorage
}

export const useImageGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  const generateImage = async ({ prompt, width = 1024, height = 1024 }: GenerateImageParams) => {
    setIsGenerating(true);

    try {
      // Enhance prompt for cinematic advertisement quality
      const enhancedPrompt = `Professional advertising photography, cinematic lighting, commercial grade quality. ${prompt}. Shot with professional camera equipment, studio lighting setup, ultra high resolution 8K, award-winning composition, magazine advertisement quality, dramatic shadows and highlights, color graded, photorealistic, masterpiece quality, trending on behance and dribbble.`;

      // Generate 20 unique images with different seeds
      const imageUrls: string[] = [];
      const baseTime = Date.now();

      for (let i = 0; i < 20; i++) {
        const seed = baseTime + i * 1000; // Different seed for each image
        const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(
          enhancedPrompt
        )}?width=${width}&height=${height}&model=flux&n=1&safe=true&seed=${seed}`;
        imageUrls.push(url);
      }

      setGeneratedImages(imageUrls);
      toast.success(`${imageUrls.length} professional images generated successfully!`);
      return imageUrls;
    } catch (error) {
      console.error('Error generating images:', error);
      toast.error('Failed to generate images. Please try again.');
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  const resetImages = () => setGeneratedImages([]);

  return { isGenerating, generatedImages, generateImage, resetImages };
};