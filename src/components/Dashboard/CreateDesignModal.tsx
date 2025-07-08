import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Palette, Wand2, Sparkles, Brain, Zap, Crown, Leaf, Cpu, Package } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { supabase, GeneratedDesign } from '../../lib/supabase';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { aiServiceManager, BrandKit } from '../../services/aiServiceManager';

interface CreateDesignModalProps {
  onClose: () => void;
  onDesignCreated: (design: GeneratedDesign) => void;
  canGenerate: boolean;
  remainingUsage: number;
}

const AI_STYLES = [
  { id: 'modern', name: 'Modern', icon: '🎨', description: 'Clean and contemporary design', color: '#667eea' },
  { id: 'classic', name: 'Classic', icon: '🏛️', description: 'Timeless and elegant', color: '#2c3e50' },
  { id: 'minimal', name: 'Minimal', icon: '⚪', description: 'Simple and clean', color: '#000000' },
  { id: 'bold', name: 'Bold', icon: '🔥', description: 'Strong and impactful', color: '#e74c3c' },
  { id: 'creative', name: 'Creative', icon: '✨', description: 'Unique and artistic', color: '#ff6b6b' },
  { id: 'luxury', name: 'Luxury', icon: '👑', description: 'Premium and sophisticated', color: '#d4af37' },
  { id: 'tech', name: 'Tech', icon: '💻', description: 'Futuristic and digital', color: '#00d4ff' },
  { id: 'nature', name: 'Nature', icon: '🌿', description: 'Organic and natural', color: '#2ecc71' }
];

const DESIGN_TYPES = [
  { 
    id: 'logo', 
    name: 'Logo Design', 
    icon: Palette, 
    description: 'Professional logo with slogan',
    color: '#667eea',
    available: 'all'
  },
  { 
    id: 'brandKit', 
    name: 'Complete Brand Kit', 
    icon: Package, 
    description: 'Logo variations, color palette, brand guidelines',
    color: '#d4af37',
    available: 'pro'
  }
];

export function CreateDesignModal({ onClose, onDesignCreated, canGenerate, remainingUsage }: CreateDesignModalProps) {
  const { t } = useTranslation();
  const { user, profile } = useAuth();
  const [businessName, setBusinessName] = useState('');
  const [description, setDescription] = useState('');
  const [businessType, setBusinessType] = useState('modern');
  const [selectedStyle, setSelectedStyle] = useState('modern');
  const [recommendedStyle, setRecommendedStyle] = useState('modern');
  const [selectedDesignType, setSelectedDesignType] = useState('logo');
  const [loading, setLoading] = useState(false);

  // Business type options
  const businessTypes = [
    { id: 'tech', name: 'Technology & Software', icon: '💻', description: 'Tech companies, software, apps, digital services' },
    { id: 'nature', name: 'Nature & Organic', icon: '🌿', description: 'Organic products, health, wellness, eco-friendly' },
    { id: 'luxury', name: 'Luxury & Premium', icon: '💎', description: 'High-end products, premium services, exclusive brands' },
    { id: 'creative', name: 'Creative & Arts', icon: '🎨', description: 'Design studios, agencies, media, creative services' },
    { id: 'bold', name: 'Bold & Sports', icon: '⚡', description: 'Fitness, sports, energy, dynamic businesses' },
    { id: 'classic', name: 'Classic & Traditional', icon: '🏛️', description: 'Traditional businesses, heritage, established companies' },
    { id: 'minimal', name: 'Minimal & Clean', icon: '📐', description: 'Simple, clean, essential products and services' },
    { id: 'modern', name: 'Modern & Contemporary', icon: '🚀', description: 'Contemporary businesses, startups, modern services' }
  ];

  // Auto-detect business type and recommend style (now based on selected business type)
  const updateRecommendedStyle = (type: string) => {
    setRecommendedStyle(type);
  };

  // Update recommended style when business type changes
  useEffect(() => {
    updateRecommendedStyle(businessType);
  }, [businessType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Form submitted');
    console.log('canGenerate:', canGenerate);
    console.log('remainingUsage:', remainingUsage);
    console.log('businessName:', businessName);
    console.log('description:', description);
    console.log('businessType:', businessType);
    console.log('selectedStyle:', selectedStyle);
    console.log('selectedDesignType:', selectedDesignType);
    console.log('recommendedStyle:', recommendedStyle);
    console.log('user:', user);
    console.log('profile:', profile);
    
    if (!canGenerate) {
      toast.error('Daily limit reached. Please upgrade your plan or try again tomorrow.');
      return;
    }

    if (!businessName.trim()) {
      toast.error('Please enter a business name');
      return;
    }

    // Check if user can access selected design type
    const selectedType = DESIGN_TYPES.find(type => type.id === selectedDesignType);
    if (selectedType?.available === 'pro' && !profile?.isPro) {
      toast.error('Complete Brand Kit is only available for Pro users. Please upgrade your plan.');
      return;
    }

    setLoading(true);

    try {
      const finalStyle = selectedStyle === 'modern' ? businessType : selectedStyle;
      
      if (selectedDesignType === 'brandKit') {
        // Generate complete brand kit
        console.log('Generating complete brand kit...');
        const brandKit = await aiServiceManager.generateBrandKit(
          businessName, 
          description || `Professional ${businessType} business brand kit`,
          finalStyle as any
        );
        
        console.log('Brand kit generated successfully:', brandKit);
        
        const design = {
          id: crypto.randomUUID(),
          user_id: user?.id || '',
          business_name: businessName,
          logo_url: brandKit.primaryLogo,
          slogan: `${businessName} - Professional Brand Identity`,
          video_url: undefined,
          merchandise_urls: [brandKit.secondaryLogo, brandKit.iconLogo],
          design_type: 'brandKit' as const,
          brand_kit_data: brandKit,
          created_at: new Date().toISOString()
        };

        console.log('Brand kit design created:', design);

        // Save to database
        try {
          const { data, error } = await supabase
            .from('designs')
            .insert([{
              user_id: user?.id,
              business_name: businessName,
              logo_url: design.logo_url,
              slogan: design.slogan,
              video_url: design.video_url,
              merchandise_urls: design.merchandise_urls,
              design_type: design.design_type,
              brand_kit_data: design.brand_kit_data
            }])
            .select()
            .single();

          if (error) throw error;

          console.log('Brand kit saved to database:', data);
          onDesignCreated(data);
        } catch (dbError) {
          console.warn('Database save failed, using localStorage:', dbError);
          
          const offlineDesigns = JSON.parse(localStorage.getItem('offlineDesigns') || '[]');
          offlineDesigns.push(design);
          localStorage.setItem('offlineDesigns', JSON.stringify(offlineDesigns));
          
          console.log('Brand kit saved to localStorage:', design);
          onDesignCreated(design);
        }

        toast.success('Complete Brand Kit created successfully! 🎨✨');
      } else {
        // Original logo generation logic
        console.log('Generating logo with Advanced AI...');
        const logoUrl = await aiServiceManager.generateImage({
          type: 'logo',
          businessName,
          description: description || `Professional ${businessType} business logo design`,
          style: finalStyle as any
        });
        console.log('Logo generated successfully:', logoUrl);
        
        // Generate merchandise if user has access
        let merchandiseUrls: string[] = [];
        if (profile?.role === 'freelancer' || profile?.isPro) {
          const tshirtUrl = await aiServiceManager.generateImage({
            type: 'merchandise',
            businessName,
            merchandiseType: 'tshirt',
            style: finalStyle as any,
            description: description || `Professional ${businessType} business logo design`
          });
          const bannerUrl = await aiServiceManager.generateImage({
            type: 'merchandise',
            businessName,
            merchandiseType: 'banner',
            style: finalStyle as any,
            description: description || `Professional ${businessType} business logo design`
          });
          merchandiseUrls = [tshirtUrl, bannerUrl];
        }

        // Generate video preview if user is Pro
        let videoUrl: string | undefined;
        if (profile?.isPro) {
          videoUrl = await aiServiceManager.generateImage({
            type: 'videoPreview',
            businessName,
            style: finalStyle as any,
            description: description || `Professional ${businessType} business logo design`
          });
        }

        const design = {
          id: crypto.randomUUID(),
          user_id: user?.id || '',
          business_name: businessName,
          logo_url: logoUrl,
          slogan: `${businessName} - Your Success Partner`,
          video_url: videoUrl,
          merchandise_urls: merchandiseUrls,
          design_type: 'logo' as const,
          created_at: new Date().toISOString()
        };

        console.log('Design created:', design);

        // Try to save to database, fallback to localStorage if offline
        try {
          const { data, error } = await supabase
            .from('designs')
            .insert([{
              user_id: user?.id,
              business_name: businessName,
              logo_url: design.logo_url,
              slogan: design.slogan,
              video_url: design.video_url,
              merchandise_urls: design.merchandise_urls,
              design_type: design.design_type
            }])
            .select()
            .single();

          if (error) throw error;

          console.log('Design saved to database:', data);
          onDesignCreated(data);
        } catch (dbError) {
          console.warn('Database save failed, using localStorage:', dbError);
          
          // Save to localStorage as fallback
          const offlineDesigns = JSON.parse(localStorage.getItem('offlineDesigns') || '[]');
          offlineDesigns.push(design);
          localStorage.setItem('offlineDesigns', JSON.stringify(offlineDesigns));
          
          console.log('Design saved to localStorage:', design);
          onDesignCreated(design);
        }
      }

      // Update user's daily usage (skip if offline)
      try {
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ 
            daily_usage: (profile?.dailyUsage || 0) + 1,
            last_usage_date: new Date().toISOString()
          })
          .eq('id', user?.id);

        if (updateError) {
          console.error('Update usage error:', updateError);
        }
      } catch (updateError) {
        console.warn('Usage update failed (offline):', updateError);
      }

      toast.success('Design created successfully!');
      setLoading(false);
    } catch (error: any) {
      console.error('Design creation error:', error);
      toast.error(error.message || 'AI rasm generatsiya qilishda xatolik!');
      setLoading(false);
      return;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    switch (name) {
      case 'businessName':
        setBusinessName(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'businessType':
        setBusinessType(value);
        break;
      case 'selectedStyle':
        setSelectedStyle(value);
        break;
      case 'selectedDesignType':
        setSelectedDesignType(value);
        break;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Create New Design</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Design Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Choose Design Type
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DESIGN_TYPES.map((type) => {
                const Icon = type.icon;
                const isAvailable = type.available === 'all' || (type.available === 'pro' && profile?.isPro);
                
                return (
                  <motion.div
                    key={type.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all ${
                      selectedDesignType === type.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${!isAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => isAvailable && setSelectedDesignType(type.id)}
                  >
                    {type.available === 'pro' && !profile?.isPro && (
                      <div className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                        PRO
                      </div>
                    )}
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: type.color + '20' }}
                      >
                        <Icon className="h-6 w-6" style={{ color: type.color }} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{type.name}</h3>
                        <p className="text-sm text-gray-600">{type.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Business Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Name *
            </label>
            <input
              type="text"
              name="businessName"
              value={businessName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Enter your business name"
              required
            />
          </div>

          {/* Business Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Description
            </label>
            <textarea
              name="description"
              value={description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
              placeholder="Describe your business, services, or target audience..."
            />
          </div>

          {/* Business Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Business Type
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {businessTypes.map((type) => (
                <motion.div
                  key={type.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`cursor-pointer rounded-lg border-2 p-3 transition-all ${
                    businessType === type.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setBusinessType(type.id)}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{type.icon}</span>
                    <div>
                      <h4 className="font-medium text-gray-900">{type.name}</h4>
                      <p className="text-xs text-gray-600">{type.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Style Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Design Style
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {AI_STYLES.map((style) => (
                <motion.div
                  key={style.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`cursor-pointer rounded-lg border-2 p-3 text-center transition-all ${
                    selectedStyle === style.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedStyle(style.id)}
                >
                  <div className="text-2xl mb-2">{style.icon}</div>
                  <h4 className="font-medium text-gray-900 text-sm">{style.name}</h4>
                  <p className="text-xs text-gray-600 mt-1">{style.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Usage Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Daily Usage:</span>
              <span className="font-medium">
                {remainingUsage} generations remaining
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
                style={{ width: `${((profile?.dailyLimit || 3) - remainingUsage) / (profile?.dailyLimit || 3) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !canGenerate}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <Palette className="h-5 w-5" />
                  <span>Create Design</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}