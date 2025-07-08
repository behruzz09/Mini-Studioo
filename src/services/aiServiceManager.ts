import { AdvancedAIService } from './advancedAI';

export interface AIGenerationRequest {
  type: 'logo' | 'merchandise' | 'videoPreview' | 'text';
  businessName: string;
  description?: string;
  merchandiseType?: 'tshirt' | 'banner' | 'card';
  prompt?: string;
  style?: 'modern' | 'classic' | 'minimal' | 'bold' | 'creative' | 'luxury' | 'tech' | 'nature';
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

  async generateText(prompt: string, style: string = 'modern'): Promise<string> {
    try {
      return await this.advancedAI.generateText(prompt, style);
    } catch (error) {
      console.error('Failed to generate text:', error);
      throw new Error('Failed to generate text');
    }
  }

  async generateBusinessDescription(businessName: string, industry: string): Promise<string> {
    const prompt = `Write a professional business description for ${businessName} in the ${industry} industry`;
    return this.generateText(prompt, 'modern');
  }

  async generateMarketingCopy(businessName: string, product: string): Promise<string> {
    const prompt = `Create compelling marketing copy for ${product} by ${businessName}`;
    return this.generateText(prompt, 'creative');
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