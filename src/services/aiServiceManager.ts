import { AdvancedAIService } from './advancedAI';

export interface AIGenerationRequest {
  type: 'logo' | 'merchandise' | 'videoPreview' | 'text' | 'brandKit';
  businessName: string;
  description?: string;
  merchandiseType?: 'tshirt' | 'banner' | 'card';
  prompt?: string;
  style?: 'modern' | 'classic' | 'minimal' | 'bold' | 'creative' | 'luxury' | 'tech' | 'nature';
}

export interface BrandKit {
  id: string;
  businessName: string;
  primaryLogo: string;
  secondaryLogo: string;
  iconLogo: string;
  colorPalette: {
    primary: string[];
    secondary: string[];
    accent: string[];
    neutral: string[];
  };
  typography: {
    primary: string;
    secondary: string;
  };
  brandGuidelines: string;
  createdAt: string;
}

export class AIServiceManager {
  private advancedAI: AdvancedAIService;

  constructor() {
    this.advancedAI = new AdvancedAIService();
  }

  async generateImage(request: AIGenerationRequest): Promise<string> {
    console.log(`🔄 Advanced AI generating ${request.type}...`);
    
    try {
      let result: string;
      
      switch (request.type) {
        case 'logo':
          result = await this.advancedAI.generateLogo(request.businessName, request.description || '', request.style);
          break;
        case 'merchandise':
          if (!request.merchandiseType) {
            throw new Error('Merchandise type is required');
          }
          result = await this.advancedAI.generateMerchandise(request.merchandiseType, request.businessName, request.style, request.description);
          break;
        case 'videoPreview':
          result = await this.advancedAI.generateVideoPreview(request.businessName, request.style, request.description);
          break;
        default:
          throw new Error('Invalid generation type');
      }

      console.log(`✅ Advanced AI ${request.type} generated successfully:`, result);
      return result;
      
    } catch (error) {
      console.error(`❌ Advanced AI failed:`, error);
      throw new Error(`Failed to generate ${request.type} with Advanced AI`);
    }
  }

  async generateBrandKit(businessName: string, description: string, style?: string): Promise<BrandKit> {
    console.log(`🎨 Advanced AI generating complete brand kit for: ${businessName}`);
    
    try {
      const brandKit = await this.advancedAI.generateCompleteBrandKit(businessName, description, style);
      console.log(`✅ Advanced AI brand kit generated successfully:`, brandKit);
      return brandKit;
    } catch (error) {
      console.error(`❌ Advanced AI brand kit generation failed:`, error);
      throw new Error('Failed to generate brand kit with Advanced AI');
    }
  }

  async generateText(prompt: string, style: string = 'modern'): Promise<string> {
    try {
      return await this.advancedAI.generateText(prompt, style);
    } catch (error) {
      console.error('Failed to generate text:', error);
      throw new Error('Failed to generate text');
    }
  }

  async generateSlogan(businessName: string, businessType: string, style: string = 'modern'): Promise<string> {
    try {
      const prompt = `Create a catchy slogan for ${businessName}, a ${businessType} business. Style: ${style}`;
      return await this.advancedAI.generateText(prompt, style);
    } catch (error) {
      console.error('Failed to generate slogan:', error);
      throw new Error('Failed to generate slogan');
    }
  }

  async generateBusinessDescription(businessName: string, businessType: string, style: string = 'modern'): Promise<string> {
    try {
      const prompt = `Write a professional business description for ${businessName}, a ${businessType} business. Style: ${style}`;
      return await this.advancedAI.generateText(prompt, style);
    } catch (error) {
      console.error('Failed to generate business description:', error);
      throw new Error('Failed to generate business description');
    }
  }

  async generateMarketingCopy(businessName: string, businessType: string, style: string = 'modern'): Promise<string> {
    try {
      const prompt = `Create compelling marketing copy for ${businessName}, a ${businessType} business. Style: ${style}`;
      return await this.advancedAI.generateText(prompt, style);
    } catch (error) {
      console.error('Failed to generate marketing copy:', error);
      throw new Error('Failed to generate marketing copy');
    }
  }

  async getRemainingCredits(): Promise<{ service: string; credits: number }[]> {
    try {
      const credits = await this.advancedAI.getRemainingCredits();
      return [{ service: 'Advanced AI', credits }];
    } catch (error) {
      return [{ service: 'Advanced AI', credits: 0 }];
    }
  }

  async testAllServices(): Promise<{ service: string; status: 'success' | 'failed' }[]> {
    try {
      const isWorking = await this.advancedAI.testConnection();
      return [{ service: 'Advanced AI', status: isWorking ? 'success' : 'failed' }];
    } catch (error) {
      return [{ service: 'Advanced AI', status: 'failed' }];
    }
  }

  async getBestService(): Promise<string> {
    return 'Advanced AI';
  }
}

// Global instance
export const aiServiceManager = new AIServiceManager();

// Qulay funksiyalar
export async function generateLogo(businessName: string, description: string, style?: string): Promise<string> {
  return aiServiceManager.generateImage({
    type: 'logo',
    businessName,
    description,
    style
  });
}

export async function generateMerchandise(type: 'tshirt' | 'banner' | 'card', businessName: string, style?: string): Promise<string> {
  return aiServiceManager.generateImage({
    type: 'merchandise',
    businessName,
    merchandiseType: type,
    style
  });
}

export async function generateVideoPreview(businessName: string, style?: string): Promise<string> {
  return aiServiceManager.generateImage({
    type: 'videoPreview',
    businessName,
    style
  });
}

export async function generateBusinessDescription(businessName: string, industry: string): Promise<string> {
  return aiServiceManager.generateBusinessDescription(businessName, industry);
}

export async function generateMarketingCopy(businessName: string, product: string): Promise<string> {
  return aiServiceManager.generateMarketingCopy(businessName, product);
}

export async function generateText(prompt: string, style?: string): Promise<string> {
  return aiServiceManager.generateText(prompt, style);
} 