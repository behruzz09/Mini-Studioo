import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Palette, Wand2, Sparkles, Brain, Zap, Crown, Leaf, Cpu } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { supabase, GeneratedDesign } from '../../lib/supabase';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { aiServiceManager } from '../../services/aiServiceManager';

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

export function CreateDesignModal({ onClose, onDesignCreated, canGenerate, remainingUsage }: CreateDesignModalProps) {
  const { t } = useTranslation();
  const { user, profile } = useAuth();
  const [businessName, setBusinessName] = useState('');
  const [description, setDescription] = useState('');
  const [businessType, setBusinessType] = useState('modern');
  const [selectedStyle, setSelectedStyle] = useState('modern');
  const [recommendedStyle, setRecommendedStyle] = useState('modern');
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

    setLoading(true);

    try {
      // Use selected business type for logo generation
      const finalStyle = selectedStyle === 'modern' ? businessType : selectedStyle;
      
      // Advanced AI orqali logo generatsiya qilish
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{t('createNewDesign')}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Brain className="h-8 w-8 text-purple-600" />
            <Cpu className="h-8 w-8 text-blue-600" />
            <Sparkles className="h-8 w-8 text-pink-600" />
          </div>
          <p className="text-gray-600 text-center">
            Enter your business details and let our Advanced AI create professional designs for you!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('businessName')}
            </label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="e.g., TechCorp, Coffee House, Design Studio"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Describe your business, industry, and style preferences..."
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Business Type
            </label>
            
            <div className="grid grid-cols-2 gap-3">
              {businessTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setBusinessType(type.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    businessType === type.id
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="text-2xl mb-2">{type.icon}</div>
                  <div className="font-medium text-sm">{type.name}</div>
                  <div className="text-xs text-gray-500">{type.description}</div>
                </button>
              ))}
            </div>
            
            <p className="text-xs text-gray-500 mt-2">
              🎯 Select your business type to get the most appropriate logo design with relevant icons and symbols.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Design Style
            </label>
            
            {/* AI Recommendation */}
            {businessName && businessType && (
              <div className="mb-4 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2 mb-1">
                  <Brain className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">AI Recommendation</span>
                </div>
                <p className="text-xs text-green-700">
                  For your <strong>{businessTypes.find(t => t.id === businessType)?.name}</strong> business "{businessName}", we recommend the <strong>{AI_STYLES.find(s => s.id === recommendedStyle)?.name}</strong> style for the best results.
                </p>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-3">
              {AI_STYLES.map((style) => (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => setSelectedStyle(style.id)}
                  className={`p-4 rounded-lg border-2 transition-all relative ${
                    selectedStyle === style.id
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : style.id === recommendedStyle
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                  style={{
                    borderColor: selectedStyle === style.id ? style.color : 
                                style.id === recommendedStyle ? '#10b981' : undefined,
                    backgroundColor: selectedStyle === style.id ? style.color + '10' : 
                                   style.id === recommendedStyle ? '#f0fdf4' : undefined
                  }}
                >
                  {style.id === recommendedStyle && (
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      AI Pick
                    </div>
                  )}
                  <div className="text-2xl mb-2">{style.icon}</div>
                  <div className="font-medium text-sm">{style.name}</div>
                  <div className="text-xs text-gray-500">{style.description}</div>
                </button>
              ))}
            </div>
            
            <p className="text-xs text-gray-500 mt-2">
              💡 The AI automatically analyzes your business and recommends the best style. You can override this choice if you prefer a different style.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Daily Usage</span>
              <span className="text-sm text-gray-600">{remainingUsage} remaining</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
                style={{ width: `${((10 - remainingUsage) / 10) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Brain className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-purple-800">Advanced AI Active</span>
            </div>
            <p className="text-xs text-purple-600">
              Canvas API • Professional designs • Realistic graphics • No API keys required
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || !canGenerate}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Generating with Advanced AI...</span>
              </>
            ) : (
              <>
                <Palette className="h-5 w-5" />
                <span>{t('createDesign')}</span>
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}