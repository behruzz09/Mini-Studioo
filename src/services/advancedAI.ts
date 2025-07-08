interface AdvancedAIRequest {
  type: 'logo' | 'merchandise' | 'videoPreview' | 'text';
  businessName: string;
  description?: string;
  merchandiseType?: 'tshirt' | 'banner' | 'card';
  prompt?: string;
  style?: 'modern' | 'classic' | 'minimal' | 'bold' | 'creative' | 'luxury' | 'tech' | 'nature';
}

interface GeneratedContent {
  id: string;
  content: string;
  type: 'image' | 'text';
  prompt: string;
  style: string;
  createdAt: string;
}

export class AdvancedAIService {
  private colorSchemes = {
    modern: {
      primary: '#6366f1',
      secondary: '#8b5cf6',
      accent: '#06b6d4',
      background: '#f8fafc',
      text: '#1e293b'
    },
    classic: {
      primary: '#2c3e50',
      secondary: '#34495e',
      accent: '#7f8c8d',
      background: '#ffffff',
      text: '#2c3e50'
    },
    minimal: {
      primary: '#000000',
      secondary: '#6b7280',
      accent: '#f3f4f6',
      background: '#ffffff',
      text: '#000000'
    },
    bold: {
      primary: '#e74c3c',
      secondary: '#f39c12',
      accent: '#27ae60',
      background: '#ffffff',
      text: '#2c3e50'
    },
    creative: {
      primary: '#ff6b6b',
      secondary: '#4ecdc4',
      accent: '#45b7d1',
      background: '#f8fafc',
      text: '#2d3748'
    },
    luxury: {
      primary: '#d4af37',
      secondary: '#b8860b',
      accent: '#daa520',
      background: '#1a1a1a',
      text: '#ffffff'
    },
    tech: {
      primary: '#00d4ff',
      secondary: '#0099cc',
      accent: '#0066cc',
      background: '#0a0a0a',
      text: '#ffffff'
    },
    nature: {
      primary: '#2ecc71',
      secondary: '#27ae60',
      accent: '#16a085',
      background: '#f0fff4',
      text: '#2d3748'
    }
  };

  async generateLogo(businessName: string, description: string, style?: string): Promise<string> {
    // Auto-detect business type and recommend style if not provided
    const businessType = this.analyzeBusinessType(businessName, description);
    const recommendedStyle = style || this.getRecommendedStyle(businessType);
    
    console.log(`🎨 Advanced AI generating logo for: ${businessName}`);
    console.log(`📊 Business type detected: ${businessType}`);
    console.log(`🎯 Recommended style: ${recommendedStyle}`);
    
    await this.simulateProcessing();
    
    const colors = this.colorSchemes[recommendedStyle as keyof typeof this.colorSchemes] || this.colorSchemes.modern;
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d')!;
    
    // Background
    this.drawBackground(ctx, colors, canvas.width, canvas.height);
    
    // Logo design based on recommended style
    this.drawLogoDesign(ctx, colors, businessName, recommendedStyle, canvas.width, canvas.height);
    
    // Business name
    this.drawBusinessName(ctx, colors, businessName, canvas.width, canvas.height);
    
    const dataUrl = canvas.toDataURL('image/png', 0.9);
    console.log(`✅ Advanced AI logo generated with ${recommendedStyle} style for ${businessType} business`);
    return dataUrl;
  }

  async generateMerchandise(type: 'tshirt' | 'banner' | 'card', businessName: string, style?: string, description?: string): Promise<string> {
    // Auto-detect business type and recommend style if not provided
    const businessType = this.analyzeBusinessType(businessName, description || '');
    const recommendedStyle = style || this.getRecommendedStyle(businessType);
    
    console.log(`🛍️ Advanced AI generating ${type} for: ${businessName}`);
    console.log(`📊 Business type detected: ${businessType}`);
    console.log(`🎯 Recommended style: ${recommendedStyle}`);
    
    await this.simulateProcessing();
    
    const colors = this.colorSchemes[recommendedStyle as keyof typeof this.colorSchemes] || this.colorSchemes.modern;
    const canvas = document.createElement('canvas');
    
    switch (type) {
      case 'tshirt':
        canvas.width = 800;
        canvas.height = 800;
        break;
      case 'banner':
        canvas.width = 1200;
        canvas.height = 630;
        break;
      case 'card':
        canvas.width = 1050;
        canvas.height = 600;
        break;
    }
    
    const ctx = canvas.getContext('2d')!;
    
    // Background
    this.drawBackground(ctx, colors, canvas.width, canvas.height);
    
    // Design based on type
    switch (type) {
      case 'tshirt':
        this.drawTshirtDesign(ctx, colors, businessName, recommendedStyle, canvas.width, canvas.height);
        break;
      case 'banner':
        this.drawBannerDesign(ctx, colors, businessName, recommendedStyle, canvas.width, canvas.height);
        break;
      case 'card':
        this.drawCardDesign(ctx, colors, businessName, recommendedStyle, canvas.width, canvas.height);
        break;
    }
    
    // Use data URL instead of blob URL
    const dataUrl = canvas.toDataURL('image/png', 0.9);
    console.log(`✅ Advanced AI ${type} generated with ${recommendedStyle} style for ${businessType} business`);
    return dataUrl;
  }

  async generateVideoPreview(businessName: string, style?: string, description?: string): Promise<string> {
    // Auto-detect business type and recommend style if not provided
    const businessType = this.analyzeBusinessType(businessName, description || '');
    const recommendedStyle = style || this.getRecommendedStyle(businessType);
    
    console.log(`🎬 Advanced AI generating video preview for: ${businessName}`);
    console.log(`📊 Business type detected: ${businessType}`);
    console.log(`🎯 Recommended style: ${recommendedStyle}`);
    
    await this.simulateProcessing();
    
    const colors = this.colorSchemes[recommendedStyle as keyof typeof this.colorSchemes] || this.colorSchemes.modern;
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext('2d')!;
    
    // Background
    this.drawBackground(ctx, colors, canvas.width, canvas.height);
    
    // Video preview design
    this.drawVideoPreviewDesign(ctx, colors, businessName, recommendedStyle, canvas.width, canvas.height);
    
    // Use data URL instead of blob URL
    const dataUrl = canvas.toDataURL('image/png', 0.9);
    console.log(`✅ Advanced AI video preview generated with ${recommendedStyle} style for ${businessType} business`);
    return dataUrl;
  }

  private drawBackground(ctx: CanvasRenderingContext2D, colors: any, width: number, height: number) {
    // Professional gradient background with sophisticated patterns
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, colors.background);
    gradient.addColorStop(0.3, colors.accent + '15');
    gradient.addColorStop(0.7, colors.secondary + '10');
    gradient.addColorStop(1, colors.background);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Sophisticated geometric pattern
    ctx.strokeStyle = colors.primary + '08';
    ctx.lineWidth = 0.5;
    ctx.globalAlpha = 0.6;
    
    // Diagonal lines
    for (let i = -width; i < width * 2; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + height, height);
      ctx.stroke();
    }
    
    // Subtle dots pattern
    ctx.fillStyle = colors.primary + '05';
    for (let x = 0; x < width; x += 60) {
      for (let y = 0; y < height; y += 60) {
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    ctx.globalAlpha = 1;
  }

  private drawLogoDesign(ctx: CanvasRenderingContext2D, colors: any, businessName: string, style: string, width: number, height: number) {
    const centerX = width / 2;
    const centerY = height / 2 - 50;

    // Har bir biznes uchun seed (hash) hosil qilamiz
    const seed = this.stringToSeed(businessName);
    const rand = this.seededRandom(seed);

    ctx.save();
    ctx.translate(centerX, centerY);

    // Har bir uslubga noyoblik kiritish uchun random parametrlar uzatamiz
    switch (style) {
      case 'modern':
        this.drawModernLogo(ctx, colors, businessName, rand);
        break;
      case 'classic':
        this.drawClassicLogo(ctx, colors, businessName, rand);
        break;
      case 'minimal':
        this.drawMinimalLogo(ctx, colors, businessName, rand);
        break;
      case 'bold':
        this.drawBoldLogo(ctx, colors, businessName, rand);
        break;
      case 'creative':
        this.drawCreativeLogo(ctx, colors, businessName, rand);
        break;
      case 'luxury':
        this.drawLuxuryLogo(ctx, colors, businessName, rand);
        break;
      case 'tech':
        this.drawTechLogo(ctx, colors, businessName, rand);
        break;
      case 'nature':
        this.drawNatureLogo(ctx, colors, businessName, rand);
        break;
      default:
        this.drawModernLogo(ctx, colors, businessName, rand);
    }

    ctx.restore();
  }

  // Stringdan seed olish uchun yordamchi funksiya
  private stringToSeed(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  // Seed asosida random generator
  private seededRandom(seed: number): () => number {
    let s = seed % 2147483647;
    return function() {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
  }

  private drawModernLogo(ctx: CanvasRenderingContext2D, colors: any, businessName: string, rand: () => number) {
    // Ultra-modern logo with business type recognition
    const businessType = this.analyzeBusinessType(businessName, '');
    
    // Tasodifiy gradient yo'nalishi va ranglar
    const angle = rand() * Math.PI * 2;
    const x1 = Math.cos(angle) * 100;
    const y1 = Math.sin(angle) * 100;
    const x2 = -x1;
    const y2 = -y1;
    const gradient1 = ctx.createLinearGradient(x1, y1, x2, y2);
    gradient1.addColorStop(0, colors.primary);
    gradient1.addColorStop(rand() * 0.5, colors.secondary);
    gradient1.addColorStop(0.7 + rand() * 0.3, colors.accent);
    gradient1.addColorStop(1, colors.primary);
    
    const gradient2 = ctx.createRadialGradient(0, 0, 0, 0, 0, 100 + rand() * 40);
    gradient2.addColorStop(0, 'rgba(255,255,255,0.1)');
    gradient2.addColorStop(0.5, 'rgba(255,255,255,0.05)');
    gradient2.addColorStop(1, 'rgba(255,255,255,0)');
    
    // Main background with glassmorphism effect
    ctx.fillStyle = gradient1;
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 20 + rand() * 15;
    ctx.shadowOffsetX = 8 + rand() * 8;
    ctx.shadowOffsetY = 8 + rand() * 8;
    
    // Modern asymmetric shape with random corners
    ctx.beginPath();
    ctx.moveTo(-90 + rand() * 30, -60 + rand() * 30);
    ctx.lineTo(90 - rand() * 30, -90 + rand() * 30);
    ctx.lineTo(90 - rand() * 30, 60 - rand() * 30);
    ctx.lineTo(-60 + rand() * 30, 90 - rand() * 30);
    ctx.lineTo(-90 + rand() * 30, 30 + rand() * 30);
    ctx.closePath();
    ctx.fill();
    
    // Glassmorphism overlay
    ctx.fillStyle = gradient2;
    ctx.fill();
    
    // Modern accent lines (soni va burchagi tasodifiy)
    const lineCount = 2 + Math.floor(rand() * 3);
    for (let i = 0; i < lineCount; i++) {
      ctx.save();
      ctx.rotate(rand() * Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      ctx.lineWidth = 1.5 + rand();
      ctx.beginPath();
      ctx.moveTo(-70 + rand() * 40, -40 + rand() * 40);
      ctx.lineTo(70 - rand() * 40, -70 + rand() * 40);
      ctx.stroke();
      ctx.restore();
    }
    
    // Business type icon with modern styling
    this.drawBusinessIcon(ctx, colors, businessType);
    
    // Modern typography with gradient text
    const textGradient = ctx.createLinearGradient(-50, 40, 50, 80);
    textGradient.addColorStop(0, 'rgba(255,255,255,0.95)');
    textGradient.addColorStop(0.5, 'rgba(255,255,255,1)');
    textGradient.addColorStop(1, 'rgba(255,255,255,0.8)');
    
    ctx.fillStyle = textGradient;
    ctx.font = `bold ${24 + Math.floor(rand() * 6)}px Inter, Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.shadowBlur = 6 + rand() * 8;
    ctx.shadowOffsetX = 2 + rand() * 3;
    ctx.shadowOffsetY = 2 + rand() * 3;
    ctx.fillText(businessName, 0, 65 + rand() * 10);
    
    // Modern accent dot (joylashuvi va o'lchami tasodifiy)
    ctx.fillStyle = colors.accent;
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 3 + rand() * 6;
    ctx.shadowOffsetX = 1 + rand() * 3;
    ctx.shadowOffsetY = 1 + rand() * 3;
    ctx.beginPath();
    ctx.arc(60 + rand() * 40, -60 - rand() * 40, 6 + rand() * 6, 0, Math.PI * 2);
    ctx.fill();
  }

  private drawClassicLogo(ctx: CanvasRenderingContext2D, colors: any, businessName: string, rand: () => number) {
    // Classic logo with business type recognition
    const businessType = this.analyzeBusinessType(businessName, '');
    
    // Background
    const gradient = ctx.createLinearGradient(-90, -90, 90, 90);
    gradient.addColorStop(0, colors.primary);
    gradient.addColorStop(0.5, colors.secondary);
    gradient.addColorStop(1, colors.accent);
    
    ctx.fillStyle = gradient;
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    
    // Classic circle
    ctx.beginPath();
    ctx.arc(0, 0, 80, 0, Math.PI * 2);
    ctx.fill();
    
    // Business type icon
    this.drawBusinessIcon(ctx, colors, businessType);
    
    // Business name
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.font = 'bold 20px Inter, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 3;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    ctx.fillText(businessName, 0, 70);
  }

  private drawMinimalLogo(ctx: CanvasRenderingContext2D, colors: any, businessName: string, rand: () => number) {
    // Minimal logo with business type recognition
    const businessType = this.analyzeBusinessType(businessName, '');
    
    // Clean background
    ctx.fillStyle = colors.primary;
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.fillRect(-80, -80, 160, 160);
    
    // Business type icon (minimal style)
    this.drawBusinessIcon(ctx, colors, businessType, true);
    
    // Business name
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.font = 'bold 18px Inter, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(businessName, 0, 70);
  }

  private drawBoldLogo(ctx: CanvasRenderingContext2D, colors: any, businessName: string, rand: () => number) {
    // Bold logo with business type recognition
    const businessType = this.analyzeBusinessType(businessName, '');
    
    // Bold background
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 90);
    gradient.addColorStop(0, colors.primary);
    gradient.addColorStop(0.4, colors.secondary);
    gradient.addColorStop(0.8, colors.accent);
    gradient.addColorStop(1, colors.primary);
    
    ctx.fillStyle = gradient;
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 25;
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 10;
    
    // Bold triangle
    ctx.beginPath();
    ctx.moveTo(0, -90);
    ctx.lineTo(80, 70);
    ctx.lineTo(-80, 70);
    ctx.closePath();
    ctx.fill();
    
    // Business type icon
    this.drawBusinessIcon(ctx, colors, businessType);
    
    // Business name
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.font = 'bold 22px Inter, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.fillText(businessName, 0, 50);
  }

  private drawCreativeLogo(ctx: CanvasRenderingContext2D, colors: any, businessName: string, rand: () => number) {
    // Creative logo with business type recognition
    const businessType = this.analyzeBusinessType(businessName, '');
    
    // Creative background shapes
    const gradient1 = ctx.createRadialGradient(-30, -30, 0, -30, -30, 50);
    gradient1.addColorStop(0, colors.primary);
    gradient1.addColorStop(1, colors.secondary);
    
    const gradient2 = ctx.createRadialGradient(30, 30, 0, 30, 30, 60);
    gradient2.addColorStop(0, colors.secondary);
    gradient2.addColorStop(1, colors.accent);
    
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    
    // Creative overlapping shapes
    ctx.fillStyle = gradient1;
    ctx.beginPath();
    ctx.ellipse(-25, -25, 45, 65, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = gradient2;
    ctx.beginPath();
    ctx.ellipse(25, 25, 55, 35, -Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();
    
    // Business type icon
    this.drawBusinessIcon(ctx, colors, businessType);
    
    // Business name
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.font = 'bold 20px Inter, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.fillText(businessName, 0, 60);
  }

  private drawLuxuryLogo(ctx: CanvasRenderingContext2D, colors: any, businessName: string, rand: () => number) {
    // Luxury logo with business type recognition
    const businessType = this.analyzeBusinessType(businessName, '');
    
    // Luxury background
    const gradient = ctx.createLinearGradient(-90, -90, 90, 90);
    gradient.addColorStop(0, colors.primary);
    gradient.addColorStop(0.25, colors.secondary);
    gradient.addColorStop(0.5, colors.accent);
    gradient.addColorStop(0.75, colors.secondary);
    gradient.addColorStop(1, colors.primary);
    
    ctx.fillStyle = gradient;
    ctx.shadowColor = 'rgba(0,0,0,0.6)';
    ctx.shadowBlur = 30;
    ctx.shadowOffsetX = 12;
    ctx.shadowOffsetY = 12;
    
    // Luxury diamond shape
    ctx.beginPath();
    ctx.moveTo(0, -90);
    ctx.lineTo(70, -25);
    ctx.lineTo(70, 25);
    ctx.lineTo(0, 90);
    ctx.lineTo(-70, 25);
    ctx.lineTo(-70, -25);
    ctx.closePath();
    ctx.fill();
    
    // Business type icon
    this.drawBusinessIcon(ctx, colors, businessType);
    
    // Business name
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.font = 'bold 20px Inter, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.fillText(businessName, 0, 50);
  }

  private drawTechLogo(ctx: CanvasRenderingContext2D, colors: any, businessName: string, rand: () => number) {
    // Sub-seed generator
    const subRand = (suffix: string) => this.seededRandom(this.stringToSeed(businessName + suffix));

    // 1. Gear (shesternya) shakli - joylashuvi va burchagi nomga bog'liq
    const gearRand = subRand('gear');
    const gearRadius = 60 + gearRand() * 10;
    const teeth = 8 + Math.floor(gearRand() * 5); // 8-12 tish
    const innerRadius = gearRadius * (0.7 + gearRand() * 0.1);
    const gearAngle = gearRand() * Math.PI * 2;
    const gearX = (gearRand() - 0.5) * 40;
    const gearY = (gearRand() - 0.5) * 40;
    ctx.save();
    ctx.translate(gearX, gearY);
    ctx.rotate(gearAngle);
    // Gear gradient
    const gearGrad = ctx.createLinearGradient(-gearRadius, 0, gearRadius, 0);
    gearGrad.addColorStop(0, '#00c3ff');
    gearGrad.addColorStop(0.5, '#fff');
    gearGrad.addColorStop(1, '#ffb300');
    ctx.beginPath();
    for (let i = 0; i < teeth * 2; i++) {
      const angle = (Math.PI * 2 / (teeth * 2)) * i;
      const r = i % 2 === 0 ? gearRadius : gearRadius * 0.88;
      ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
    }
    ctx.closePath();
    ctx.fillStyle = gearGrad;
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 18;
    ctx.globalAlpha = 0.92;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    ctx.restore();

    // 2. Circuit chiziqlari va nuqtalari (har biri uchun sub-seed)
    const circuitCount = 6 + Math.floor(subRand('circuitCount')() * 4);
    for (let i = 0; i < circuitCount; i++) {
      const cRand = subRand('circuit' + i);
      const angle = cRand() * Math.PI * 2;
      const r1 = innerRadius + cRand() * (gearRadius - innerRadius - 10);
      const r2 = gearRadius + 10 + cRand() * 20;
      ctx.save();
      ctx.rotate(angle);
      // Chiziq
      ctx.beginPath();
      ctx.moveTo(r1, 0);
      ctx.lineTo(r2, 0);
      ctx.strokeStyle = cRand() > 0.5 ? '#00f0ff' : '#ffb300';
      ctx.lineWidth = 2 + cRand() * 2;
      ctx.shadowColor = ctx.strokeStyle;
      ctx.shadowBlur = 10 + cRand() * 8;
      ctx.globalAlpha = 0.7;
      ctx.stroke();
      // Nuqta (circuit endpoint)
      ctx.beginPath();
      ctx.arc(r2, 0, 4 + cRand() * 3, 0, Math.PI * 2);
      ctx.fillStyle = ctx.strokeStyle;
      ctx.shadowBlur = 14;
      ctx.globalAlpha = 0.9;
      ctx.fill();
      ctx.restore();
    }

    // 3. Motion/swoosh/spiral element (harakat hissi uchun, sub-seed)
    const spiralRand = subRand('spiral');
    ctx.save();
    ctx.rotate(spiralRand() * Math.PI * 2);
    ctx.beginPath();
    for (let t = 0; t < Math.PI * (1.2 + spiralRand() * 0.8); t += 0.15 + spiralRand() * 0.05) {
      const r = innerRadius + 10 + t * 10 + spiralRand() * 4;
      ctx.lineTo(Math.cos(t) * r, Math.sin(t) * r);
    }
    ctx.strokeStyle = spiralRand() > 0.5 ? '#ffb300' : '#00c3ff';
    ctx.lineWidth = 4 + spiralRand() * 3;
    ctx.shadowColor = ctx.strokeStyle;
    ctx.shadowBlur = 16;
    ctx.globalAlpha = 0.7;
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    ctx.restore();

    // 4. Markaziy circuit nuqtalar va chiziqlar (sub-seed)
    const centerCount = 3 + Math.floor(subRand('centerCount')() * 3);
    for (let i = 0; i < centerCount; i++) {
      const cRand = subRand('center' + i);
      const angle = cRand() * Math.PI * 2;
      const r = 18 + cRand() * 18;
      ctx.save();
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(r, 0);
      ctx.strokeStyle = cRand() > 0.5 ? '#00f0ff' : '#ffb300';
      ctx.lineWidth = 3 + cRand() * 3;
      ctx.shadowColor = ctx.strokeStyle;
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(r, 0, 5 + cRand() * 3, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
    }

    // 5. Logotip nomi: joylashuvi va harflar ham sub-seed asosida
    const nameRand = subRand('name');
    ctx.save();
    ctx.font = 'bold 32px Inter, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    // Joylashuv: ba'zan pastda, ba'zan yon tomonda, ba'zan markazda
    const nameLayout = Math.floor(nameRand() * 3);
    let nameX = 0, nameY = 80;
    if (nameLayout === 1) { nameX = 90; nameY = 0; ctx.textAlign = 'left'; }
    if (nameLayout === 2) { nameX = 0; nameY = -gearRadius - 30; }
    let x = -ctx.measureText(businessName).width / 2;
    for (let i = 0; i < businessName.length; i++) {
      const ch = businessName[i];
      const w = ctx.measureText(ch).width;
      const grad = ctx.createLinearGradient(x, 0, x + w, 0);
      grad.addColorStop(0, nameRand() > 0.5 ? '#00c3ff' : '#ffb300');
      grad.addColorStop(1, nameRand() > 0.5 ? '#fff' : '#6366f1');
      ctx.fillStyle = grad;
      ctx.shadowColor = i % 2 === 0 ? '#00f0ff' : '#ffb300';
      ctx.shadowBlur = 14 + nameRand() * 8;
      ctx.fillText(ch, nameX + x + w / 2, nameY + Math.sin(i + nameRand()) * 4);
      x += w;
    }
    ctx.restore();
  }

  private drawNatureLogo(ctx: CanvasRenderingContext2D, colors: any, businessName: string, rand: () => number) {
    // Nature logo with organic symbols
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 85);
    gradient.addColorStop(0, colors.primary);
    gradient.addColorStop(0.4, colors.secondary);
    gradient.addColorStop(0.8, colors.accent);
    gradient.addColorStop(1, colors.primary);
    
    ctx.fillStyle = gradient;
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    
    // Organic leaf shape
    ctx.beginPath();
    ctx.ellipse(0, 0, 70, 45, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();
    
    // Nature icon (leaf, tree, etc.)
    this.drawNatureIcon(ctx, colors);
    
    // Business name
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.font = 'bold 20px Inter, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.fillText(businessName, 0, 60);
  }

  // Business type icons
  private drawBusinessIcon(ctx: CanvasRenderingContext2D, colors: any, businessType: string, minimal: boolean = false) {
    const size = minimal ? 30 : 40;
    
    switch (businessType) {
      case 'tech':
        this.drawTechIcon(ctx, colors, size);
        break;
      case 'nature':
        this.drawNatureIcon(ctx, colors, size);
        break;
      case 'luxury':
        this.drawLuxuryIcon(ctx, colors, size);
        break;
      case 'creative':
        this.drawCreativeIcon(ctx, colors, size);
        break;
      case 'bold':
        this.drawBoldIcon(ctx, colors, size);
        break;
      case 'classic':
        this.drawClassicIcon(ctx, colors, size);
        break;
      case 'minimal':
        this.drawMinimalIcon(ctx, colors, size);
        break;
      default:
        this.drawModernIcon(ctx, colors, size);
    }
  }

  private drawTechIcon(ctx: CanvasRenderingContext2D, colors: any, size: number = 40) {
    // Computer monitor icon
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    
    // Monitor screen
    ctx.fillRect(-size/2, -size/2, size, size * 0.7);
    
    // Monitor stand
    ctx.fillRect(-size/4, size * 0.2, size/2, size/4);
    
    // Screen content (simplified)
    ctx.fillStyle = colors.accent;
    ctx.fillRect(-size/2 + 4, -size/2 + 4, size - 8, size * 0.7 - 8);
    
    // Power indicator
    ctx.fillStyle = colors.primary;
    ctx.beginPath();
    ctx.arc(size/2 - 8, -size/2 + 8, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  private drawNatureIcon(ctx: CanvasRenderingContext2D, colors: any, size: number = 40) {
    // Tree/leaf icon
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    
    // Tree trunk
    ctx.fillRect(-size/8, size/4, size/4, size/2);
    
    // Tree leaves
    ctx.fillStyle = colors.accent;
    ctx.beginPath();
    ctx.arc(0, -size/4, size/2, 0, Math.PI * 2);
    ctx.fill();
    
    // Additional leaves
    ctx.beginPath();
    ctx.arc(-size/3, -size/6, size/3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(size/3, -size/6, size/3, 0, Math.PI * 2);
    ctx.fill();
  }

  private drawLuxuryIcon(ctx: CanvasRenderingContext2D, colors: any, size: number = 40) {
    // Diamond/crown icon
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    
    // Diamond shape
    ctx.beginPath();
    ctx.moveTo(0, -size/2);
    ctx.lineTo(size/3, -size/6);
    ctx.lineTo(size/3, size/6);
    ctx.lineTo(0, size/2);
    ctx.lineTo(-size/3, size/6);
    ctx.lineTo(-size/3, -size/6);
    ctx.closePath();
    ctx.fill();
    
    // Inner diamond
    ctx.fillStyle = colors.accent;
    ctx.beginPath();
    ctx.moveTo(0, -size/4);
    ctx.lineTo(size/6, -size/12);
    ctx.lineTo(size/6, size/12);
    ctx.lineTo(0, size/4);
    ctx.lineTo(-size/6, size/12);
    ctx.lineTo(-size/6, -size/12);
    ctx.closePath();
    ctx.fill();
  }

  private drawCreativeIcon(ctx: CanvasRenderingContext2D, colors: any, size: number = 40) {
    // Paint brush/palette icon
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    
    // Paint palette
    ctx.beginPath();
    ctx.arc(0, 0, size/2, 0, Math.PI * 2);
    ctx.fill();
    
    // Paint colors
    ctx.fillStyle = colors.primary;
    ctx.beginPath();
    ctx.arc(-size/4, -size/4, size/8, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = colors.secondary;
    ctx.beginPath();
    ctx.arc(size/4, -size/4, size/8, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = colors.accent;
    ctx.beginPath();
    ctx.arc(0, size/4, size/8, 0, Math.PI * 2);
    ctx.fill();
  }

  private drawBoldIcon(ctx: CanvasRenderingContext2D, colors: any, size: number = 40) {
    // Lightning bolt icon
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    
    // Lightning bolt
    ctx.beginPath();
    ctx.moveTo(-size/4, -size/2);
    ctx.lineTo(size/6, -size/6);
    ctx.lineTo(-size/6, 0);
    ctx.lineTo(size/4, size/2);
    ctx.lineTo(-size/6, size/6);
    ctx.lineTo(size/6, 0);
    ctx.closePath();
    ctx.fill();
  }

  private drawClassicIcon(ctx: CanvasRenderingContext2D, colors: any, size: number = 40) {
    // Classic building/column icon
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    
    // Building/column
    ctx.fillRect(-size/3, -size/2, size * 2/3, size);
    
    // Windows
    ctx.fillStyle = colors.accent;
    ctx.fillRect(-size/4, -size/3, size/6, size/6);
    ctx.fillRect(-size/4, 0, size/6, size/6);
    ctx.fillRect(size/12, -size/3, size/6, size/6);
    ctx.fillRect(size/12, 0, size/6, size/6);
  }

  private drawMinimalIcon(ctx: CanvasRenderingContext2D, colors: any, size: number = 40) {
    // Simple geometric icon
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    
    // Simple square
    ctx.fillRect(-size/3, -size/3, size * 2/3, size * 2/3);
    
    // Inner accent
    ctx.fillStyle = colors.accent;
    ctx.fillRect(-size/6, -size/6, size/3, size/3);
  }

  private drawModernIcon(ctx: CanvasRenderingContext2D, colors: any, size: number = 40) {
    // Modern geometric icon
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    
    // Modern rounded rectangle
    ctx.beginPath();
    ctx.roundRect(-size/2, -size/2, size, size, size/8);
    ctx.fill();
    
    // Modern accent
    ctx.fillStyle = colors.accent;
    ctx.beginPath();
    ctx.arc(0, 0, size/4, 0, Math.PI * 2);
    ctx.fill();
  }

  private drawBusinessName(ctx: CanvasRenderingContext2D, colors: any, businessName: string, width: number, height: number) {
    // Professional typography with sophisticated styling
    const textGradient = ctx.createLinearGradient(width / 2 - 100, height - 100, width / 2 + 100, height - 60);
    textGradient.addColorStop(0, colors.text);
    textGradient.addColorStop(0.5, colors.primary);
    textGradient.addColorStop(1, colors.text);
    
    ctx.fillStyle = textGradient;
    ctx.font = 'bold 42px Inter, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Sophisticated text shadow
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    
    // Main text
    ctx.fillText(businessName, width / 2, height - 80);
    
    // Subtle text outline
    ctx.strokeStyle = colors.primary + '30';
    ctx.lineWidth = 1;
    ctx.strokeText(businessName, width / 2, height - 80);
    
    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  }

  private drawTshirtDesign(ctx: CanvasRenderingContext2D, colors: any, businessName: string, style: string, width: number, height: number) {
    // Professional t-shirt design with realistic appearance
    
    // Background
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, width, height);
    
    // T-shirt shadow
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 10;
    ctx.beginPath();
    ctx.ellipse(width/2, height*0.9, width*0.4, height*0.1, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    
    // T-shirt main body with gradient
    const tshirtGradient = ctx.createLinearGradient(0, 0, 0, height);
    tshirtGradient.addColorStop(0, '#ffffff');
    tshirtGradient.addColorStop(0.3, '#f1f5f9');
    tshirtGradient.addColorStop(0.7, '#e2e8f0');
    tshirtGradient.addColorStop(1, '#cbd5e1');
    
    ctx.fillStyle = tshirtGradient;
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    
    // Realistic t-shirt shape
    ctx.beginPath();
    ctx.moveTo(width*0.25, height*0.25); // Left shoulder
    ctx.lineTo(width*0.15, height*0.35); // Left sleeve
    ctx.lineTo(width*0.1, height*0.5);   // Left sleeve bottom
    ctx.lineTo(width*0.15, height*0.65); // Left side
    ctx.lineTo(width*0.2, height*0.8);   // Left bottom
    ctx.lineTo(width*0.8, height*0.8);   // Right bottom
    ctx.lineTo(width*0.85, height*0.65); // Right side
    ctx.lineTo(width*0.9, height*0.5);   // Right sleeve bottom
    ctx.lineTo(width*0.85, height*0.35); // Right sleeve
    ctx.lineTo(width*0.75, height*0.25); // Right shoulder
    ctx.closePath();
    ctx.fill();
    
    // T-shirt collar
    ctx.fillStyle = '#e2e8f0';
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    
    ctx.beginPath();
    ctx.ellipse(width*0.5, height*0.25, width*0.15, height*0.08, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Inner collar
    ctx.fillStyle = '#cbd5e1';
    ctx.beginPath();
    ctx.ellipse(width*0.5, height*0.25, width*0.12, height*0.06, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Fabric texture
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.6;
    
    for (let i = 0; i < 20; i++) {
      const y = height*0.3 + (i * 20);
      ctx.beginPath();
      ctx.moveTo(width*0.2, y);
      ctx.lineTo(width*0.8, y);
      ctx.stroke();
    }
    
    ctx.globalAlpha = 1;
    
    // Logo design on t-shirt (smaller and centered)
    ctx.save();
    ctx.translate(width*0.5, height*0.55);
    ctx.scale(0.6, 0.6);
    this.drawLogoDesign(ctx, colors, businessName, style, 200, 200);
    ctx.restore();
    
    // Business name on t-shirt with professional typography
    const textGradient = ctx.createLinearGradient(width*0.3, height*0.75, width*0.7, height*0.75);
    textGradient.addColorStop(0, colors.primary);
    textGradient.addColorStop(0.5, colors.secondary);
    textGradient.addColorStop(1, colors.primary);
    
    ctx.fillStyle = textGradient;
    ctx.font = 'bold 28px Inter, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 6;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    
    ctx.fillText(businessName, width*0.5, height*0.75);
    
    // Subtle tagline
    ctx.fillStyle = colors.accent;
    ctx.font = '16px Inter, Arial, sans-serif';
    ctx.globalAlpha = 0.8;
    ctx.fillText('Professional Quality', width*0.5, height*0.82);
    ctx.globalAlpha = 1;
  }

  private drawBannerDesign(ctx: CanvasRenderingContext2D, colors: any, businessName: string, style: string, width: number, height: number) {
    // Professional banner design with sophisticated elements
    
    // Sophisticated background gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, colors.primary);
    gradient.addColorStop(0.3, colors.secondary);
    gradient.addColorStop(0.7, colors.accent);
    gradient.addColorStop(1, colors.primary);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Geometric pattern overlay
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    for (let i = 0; i < width; i += 60) {
      for (let j = 0; j < height; j += 60) {
        ctx.beginPath();
        ctx.moveTo(i, j);
        ctx.lineTo(i + 30, j + 30);
        ctx.lineTo(i, j + 60);
        ctx.closePath();
        ctx.fill();
      }
    }
    
    // Professional decorative elements
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    
    // Left decorative circle
    ctx.beginPath();
    ctx.arc(width * 0.15, height * 0.5, 120, 0, Math.PI * 2);
    ctx.fill();
    
    // Right decorative circle
    ctx.beginPath();
    ctx.arc(width * 0.85, height * 0.5, 100, 0, Math.PI * 2);
    ctx.fill();
    
    // Center accent element
    ctx.beginPath();
    ctx.arc(width * 0.5, height * 0.3, 80, 0, Math.PI * 2);
    ctx.fill();
    
    // Professional typography with sophisticated styling
    const textGradient = ctx.createLinearGradient(width * 0.2, height * 0.4, width * 0.8, height * 0.4);
    textGradient.addColorStop(0, 'rgba(255,255,255,0.9)');
    textGradient.addColorStop(0.5, '#ffffff');
    textGradient.addColorStop(1, 'rgba(255,255,255,0.9)');
    
    ctx.fillStyle = textGradient;
    ctx.font = 'bold 72px Inter, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.6)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    
    // Main business name
    ctx.fillText(businessName, width / 2, height * 0.45);
    
    // Professional subtitle
    ctx.font = '32px Inter, Arial, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.fillText(`Professional ${style.charAt(0).toUpperCase() + style.slice(1)} Design`, width / 2, height * 0.6);
    
    // Tagline
    ctx.font = '20px Inter, Arial, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.fillText('Advanced AI Generated • Premium Quality', width / 2, height * 0.7);
    
    // Decorative lines
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    
    ctx.beginPath();
    ctx.moveTo(width * 0.2, height * 0.75);
    ctx.lineTo(width * 0.4, height * 0.75);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(width * 0.6, height * 0.75);
    ctx.lineTo(width * 0.8, height * 0.75);
    ctx.stroke();
  }

  private drawCardDesign(ctx: CanvasRenderingContext2D, colors: any, businessName: string, style: string, width: number, height: number) {
    // Professional business card design with realistic appearance
    
    // Card shadow
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.shadowBlur = 25;
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 10;
    ctx.fillRect(20, 20, width - 40, height - 40);
    
    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    
    // Card background with subtle gradient
    const cardGradient = ctx.createLinearGradient(0, 0, width, height);
    cardGradient.addColorStop(0, '#ffffff');
    cardGradient.addColorStop(0.5, '#fafafa');
    cardGradient.addColorStop(1, '#f5f5f5');
    
    ctx.fillStyle = cardGradient;
    ctx.fillRect(0, 0, width, height);
    
    // Card border with gradient
    const borderGradient = ctx.createLinearGradient(0, 0, width, height);
    borderGradient.addColorStop(0, colors.primary);
    borderGradient.addColorStop(0.5, colors.secondary);
    borderGradient.addColorStop(1, colors.accent);
    
    ctx.strokeStyle = borderGradient;
    ctx.lineWidth = 4;
    ctx.strokeRect(0, 0, width, height);
    
    // Logo area with sophisticated design
    const logoGradient = ctx.createLinearGradient(50, 50, 250, 150);
    logoGradient.addColorStop(0, colors.primary);
    logoGradient.addColorStop(0.5, colors.secondary);
    logoGradient.addColorStop(1, colors.accent);
    
    ctx.fillStyle = logoGradient;
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.fillRect(50, 50, 200, 100);
    
    // Logo text with professional styling
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.font = 'bold 24px Inter, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.fillText(style.charAt(0).toUpperCase() + style.slice(1), 150, 105);
    
    // Business name with sophisticated typography
    const nameGradient = ctx.createLinearGradient(300, 100, 800, 100);
    nameGradient.addColorStop(0, colors.primary);
    nameGradient.addColorStop(0.5, colors.secondary);
    nameGradient.addColorStop(1, colors.primary);
    
    ctx.fillStyle = nameGradient;
    ctx.font = 'bold 48px Inter, Arial, sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.fillText(businessName, 300, 150);
    
    // Professional title
    ctx.fillStyle = colors.accent;
    ctx.font = '28px Inter, Arial, sans-serif';
    ctx.shadowColor = 'rgba(0,0,0,0.1)';
    ctx.shadowBlur = 3;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    ctx.fillText('Professional Business Solutions', 300, 200);
    
    // Contact information with icons and professional layout
    ctx.fillStyle = colors.text;
    ctx.font = '18px Inter, Arial, sans-serif';
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    
    const email = `info@${businessName.toLowerCase().replace(/\s+/g, '')}.com`;
    const phone = '+1 (555) 123-4567';
    const website = `www.${businessName.toLowerCase().replace(/\s+/g, '')}.com`;
    const address = '123 Business Street, City, State 12345';
    
    // Email
    ctx.fillStyle = colors.primary;
    ctx.fillText('📧', 300, 350);
    ctx.fillStyle = colors.text;
    ctx.fillText(email, 330, 350);
    
    // Phone
    ctx.fillStyle = colors.primary;
    ctx.fillText('📞', 300, 380);
    ctx.fillStyle = colors.text;
    ctx.fillText(phone, 330, 380);
    
    // Website
    ctx.fillStyle = colors.primary;
    ctx.fillText('🌐', 300, 410);
    ctx.fillStyle = colors.text;
    ctx.fillText(website, 330, 410);
    
    // Address
    ctx.fillStyle = colors.primary;
    ctx.fillText('📍', 300, 440);
    ctx.fillStyle = colors.text;
    ctx.fillText(address, 330, 440);
    
    // Sophisticated decorative element
    const accentGradient = ctx.createRadialGradient(width * 0.85, height * 0.5, 0, width * 0.85, height * 0.5, 100);
    accentGradient.addColorStop(0, colors.accent + '40');
    accentGradient.addColorStop(0.7, colors.secondary + '20');
    accentGradient.addColorStop(1, 'transparent');
    
    ctx.fillStyle = accentGradient;
    ctx.beginPath();
    ctx.arc(width * 0.85, height * 0.5, 100, 0, Math.PI * 2);
    ctx.fill();
    
    // Professional tagline
    ctx.fillStyle = colors.accent;
    ctx.font = '16px Inter, Arial, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('Advanced AI Generated Design', width - 50, height - 50);
  }

  private drawVideoPreviewDesign(ctx: CanvasRenderingContext2D, colors: any, businessName: string, style: string, width: number, height: number) {
    // Professional video preview design with realistic appearance
    
    // Sophisticated background gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, colors.primary);
    gradient.addColorStop(0.3, colors.secondary);
    gradient.addColorStop(0.7, colors.accent);
    gradient.addColorStop(1, colors.primary);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Geometric pattern overlay for texture
    ctx.fillStyle = 'rgba(255,255,255,0.03)';
    for (let i = 0; i < width; i += 40) {
      for (let j = 0; j < height; j += 40) {
        ctx.beginPath();
        ctx.moveTo(i, j);
        ctx.lineTo(i + 20, j + 20);
        ctx.lineTo(i, j + 40);
        ctx.closePath();
        ctx.fill();
      }
    }
    
    // Professional play button with realistic 3D effect
    const playButtonGradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, 140);
    playButtonGradient.addColorStop(0, 'rgba(255,255,255,0.95)');
    playButtonGradient.addColorStop(0.7, 'rgba(255,255,255,0.8)');
    playButtonGradient.addColorStop(1, 'rgba(255,255,255,0.6)');
    
    ctx.fillStyle = playButtonGradient;
    ctx.shadowColor = 'rgba(0,0,0,0.6)';
    ctx.shadowBlur = 25;
    ctx.shadowOffsetX = 8;
    ctx.shadowOffsetY = 8;
    
    // Main play button circle
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, 140, 0, Math.PI * 2);
    ctx.fill();
    
    // Inner play button circle for depth
    const innerGradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, 120);
    innerGradient.addColorStop(0, colors.accent);
    innerGradient.addColorStop(0.7, colors.secondary);
    innerGradient.addColorStop(1, colors.primary);
    
    ctx.fillStyle = innerGradient;
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, 120, 0, Math.PI * 2);
    ctx.fill();
    
    // Professional play triangle
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    
    ctx.beginPath();
    ctx.moveTo(width / 2 - 25, height / 2 - 45);
    ctx.lineTo(width / 2 - 25, height / 2 + 45);
    ctx.lineTo(width / 2 + 55, height / 2);
    ctx.closePath();
    ctx.fill();
    
    // Video frame elements
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    
    // Top-left frame
    ctx.fillRect(50, 50, 150, 100);
    
    // Top-right frame
    ctx.fillRect(width - 200, 50, 150, 100);
    
    // Center accent element
    ctx.beginPath();
    ctx.arc(width / 2, height * 0.25, 60, 0, Math.PI * 2);
    ctx.fill();
    
    // Professional typography with sophisticated styling
    const textGradient = ctx.createLinearGradient(width * 0.2, height * 0.75, width * 0.8, height * 0.75);
    textGradient.addColorStop(0, 'rgba(255,255,255,0.9)');
    textGradient.addColorStop(0.5, '#ffffff');
    textGradient.addColorStop(1, 'rgba(255,255,255,0.9)');
    
    ctx.fillStyle = textGradient;
    ctx.font = 'bold 56px Inter, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.7)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    
    // Main business name
    ctx.fillText(businessName, width / 2, height * 0.75);
    
    // Professional subtitle
    ctx.font = '28px Inter, Arial, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.fillText(`${style.charAt(0).toUpperCase() + style.slice(1)} Video Preview`, width / 2, height * 0.85);
    
    // Video duration indicator
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(width - 120, height - 60, 100, 40);
    
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.font = 'bold 16px Inter, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('2:45', width - 70, height - 40);
    
    // Professional tagline
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.font = '18px Inter, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Click to Play • Professional Quality', width / 2, height - 30);
  }

  async generateText(prompt: string, style: string = 'modern'): Promise<string> {
    console.log(`📝 Advanced AI generating text: ${prompt}`);
    
    await this.simulateProcessing();
    
    const businessName = this.extractBusinessName(prompt);
    const businessType = this.analyzeBusinessType(businessName, prompt);
    
    let generatedText = '';
    
    if (prompt.toLowerCase().includes('description')) {
      generatedText = this.generateBusinessDescription(businessName, businessType, style);
    } else if (prompt.toLowerCase().includes('slogan') || prompt.toLowerCase().includes('tagline')) {
      generatedText = this.generateSlogan(businessName, businessType, style);
    } else if (prompt.toLowerCase().includes('marketing') || prompt.toLowerCase().includes('copy')) {
      generatedText = this.generateMarketingCopy(businessName, businessType, style);
    } else {
      generatedText = this.generateGenericText(prompt, businessName, businessType, style);
    }
    
    console.log(`✅ Advanced AI text generated: ${generatedText}`);
    return generatedText;
  }

  private extractBusinessName(text: string): string {
    const words = text.split(' ');
    return words.slice(0, 2).join(' ') || 'Business';
  }

  private analyzeBusinessType(businessName: string, description: string): string {
    const name = businessName.toLowerCase();
    const desc = description.toLowerCase();
    const combined = `${name} ${desc}`;
    
    // Tech & Software
    if (combined.includes('tech') || combined.includes('software') || combined.includes('app') || 
        combined.includes('digital') || combined.includes('ai') || combined.includes('data') ||
        combined.includes('cyber') || combined.includes('web') || combined.includes('mobile') ||
        combined.includes('startup') || combined.includes('platform') || combined.includes('system')) {
      return 'tech';
    }
    
    // Nature & Organic
    if (combined.includes('nature') || combined.includes('organic') || combined.includes('eco') ||
        combined.includes('green') || combined.includes('natural') || combined.includes('bio') ||
        combined.includes('garden') || combined.includes('plant') || combined.includes('farm') ||
        combined.includes('health') || combined.includes('wellness') || combined.includes('yoga')) {
      return 'nature';
    }
    
    // Luxury & Premium
    if (combined.includes('luxury') || combined.includes('premium') || combined.includes('elite') ||
        combined.includes('exclusive') || combined.includes('gold') || combined.includes('diamond') ||
        combined.includes('royal') || combined.includes('vip') || combined.includes('boutique') ||
        combined.includes('designer') || combined.includes('high-end') || combined.includes('prestige')) {
      return 'luxury';
    }
    
    // Creative & Arts
    if (combined.includes('creative') || combined.includes('art') || combined.includes('design') ||
        combined.includes('studio') || combined.includes('agency') || combined.includes('media') ||
        combined.includes('film') || combined.includes('music') || combined.includes('photography') ||
        combined.includes('branding') || combined.includes('marketing') || combined.includes('advertising')) {
      return 'creative';
    }
    
    // Bold & Sports
    if (combined.includes('sport') || combined.includes('fitness') || combined.includes('gym') ||
        combined.includes('energy') || combined.includes('power') || combined.includes('strength') ||
        combined.includes('action') || combined.includes('adventure') || combined.includes('extreme') ||
        combined.includes('dynamic') || combined.includes('bold') || combined.includes('strong')) {
      return 'bold';
    }
    
    // Classic & Traditional
    if (combined.includes('classic') || combined.includes('traditional') || combined.includes('heritage') ||
        combined.includes('legacy') || combined.includes('established') || combined.includes('vintage') ||
        combined.includes('antique') || combined.includes('timeless') || combined.includes('elegant') ||
        combined.includes('sophisticated') || combined.includes('refined') || combined.includes('formal')) {
      return 'classic';
    }
    
    // Minimal & Clean
    if (combined.includes('minimal') || combined.includes('simple') || combined.includes('clean') ||
        combined.includes('pure') || combined.includes('essential') || combined.includes('basic') ||
        combined.includes('modern') || combined.includes('contemporary') || combined.includes('sleek') ||
        combined.includes('streamlined') || combined.includes('efficient') || combined.includes('smart')) {
      return 'minimal';
    }
    
    // Default to modern for general businesses
    return 'modern';
  }

  private getRecommendedStyle(businessType: string): string {
    const styleMap: { [key: string]: string } = {
      'tech': 'tech',
      'nature': 'nature', 
      'luxury': 'luxury',
      'creative': 'creative',
      'bold': 'bold',
      'classic': 'classic',
      'minimal': 'minimal',
      'modern': 'modern'
    };
    
    return styleMap[businessType] || 'modern';
  }

  private generateBusinessDescription(businessName: string, businessType: string, style: string): string {
    const descriptions = {
      tech: `${businessName} is a cutting-edge technology company specializing in innovative digital solutions. We help businesses transform their operations through advanced software and digital strategies.`,
      food: `${businessName} is a premier culinary establishment offering exceptional dining experiences. Our passion for quality ingredients and creative cuisine sets us apart in the industry.`,
      fashion: `${businessName} is a trendsetting fashion brand that combines style with innovation. We create unique designs that reflect modern aesthetics and individual expression.`,
      health: `${businessName} is a comprehensive healthcare provider dedicated to improving lives through quality medical care and wellness programs.`,
      finance: `${businessName} is a trusted financial services company helping individuals and businesses achieve their financial goals through expert guidance and innovative solutions.`,
      general: `${businessName} is a professional business committed to excellence and customer satisfaction. We deliver quality services tailored to meet your specific needs.`
    };
    
    return descriptions[businessType as keyof typeof descriptions] || descriptions.general;
  }

  private generateSlogan(businessName: string, businessType: string, style: string): string {
    const slogans = {
      tech: "Innovation at Your Fingertips",
      food: "Taste the Difference",
      fashion: "Style Redefined",
      health: "Your Health, Our Priority",
      finance: "Building Your Financial Future",
      general: "Excellence in Every Detail"
    };
    
    return slogans[businessType as keyof typeof slogans] || slogans.general;
  }

  private generateMarketingCopy(businessName: string, businessType: string, style: string): string {
    const copies = {
      tech: `Discover how ${businessName} can revolutionize your business with our cutting-edge technology solutions. Experience innovation that drives results.`,
      food: `Indulge in the exceptional flavors at ${businessName}. Every dish tells a story of passion, quality, and culinary excellence.`,
      fashion: `Express your unique style with ${businessName}. Our collections blend contemporary trends with timeless elegance.`,
      health: `Your wellness journey starts with ${businessName}. We provide comprehensive healthcare solutions for a healthier tomorrow.`,
      finance: `Secure your financial future with ${businessName}. Expert guidance and innovative solutions for all your financial needs.`,
      general: `Choose ${businessName} for quality, reliability, and excellence. We're here to exceed your expectations.`
    };
    
    return copies[businessType as keyof typeof copies] || copies.general;
  }

  private generateGenericText(prompt: string, businessName: string, businessType: string, style: string): string {
    return `Based on your request about ${businessName}, here's a professional response tailored to your ${businessType} business needs. We understand the importance of quality and innovation in today's competitive market.`;
  }

  private async simulateProcessing(): Promise<void> {
    const processingTime = Math.random() * 2000 + 1000; // 1-3 seconds
    await new Promise(resolve => setTimeout(resolve, processingTime));
  }

  async getRemainingCredits(): Promise<number> {
    return 9999; // Advanced AI uchun cheksiz
  }

  async testConnection(): Promise<boolean> {
    return true; // Advanced AI har doim ishlaydi
  }

  async generateDesign(request: AdvancedAIRequest): Promise<GeneratedContent> {
    console.log(`🤖 Advanced AI generating ${request.type} for ${request.businessName}`);
    
    await this.simulateProcessing();
    
    let content: string;
    let type: 'image' | 'text' = 'image';
    
    switch (request.type) {
      case 'logo':
        content = await this.generateLogo(request.businessName, request.description || '', request.style || 'modern');
        break;
      case 'merchandise':
        if (!request.merchandiseType) throw new Error('Merchandise type required');
        content = await this.generateMerchandise(request.merchandiseType, request.businessName, request.style || 'modern');
        break;
      case 'videoPreview':
        content = await this.generateVideoPreview(request.businessName, request.style || 'modern');
        break;
      case 'text':
        if (!request.prompt) throw new Error('Prompt required for text generation');
        content = await this.generateText(request.prompt, request.style || 'modern');
        type = 'text';
        break;
      default:
        throw new Error('Invalid generation type');
    }
    
    return {
      id: this.generateId(),
      content,
      type,
      prompt: request.prompt || `${request.type} for ${request.businessName}`,
      style: request.style || 'modern',
      createdAt: new Date().toISOString(),
    };
  }

  private generateId(): string {
    return 'advanced_' + Math.random().toString(36).substr(2, 9);
  }
}

export const advancedAI = new AdvancedAIService(); 