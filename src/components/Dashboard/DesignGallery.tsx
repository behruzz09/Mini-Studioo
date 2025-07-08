import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Download, Eye, Calendar, Video, Shirt, Trash2, Package, Palette, Type } from 'lucide-react';
import { GeneratedDesign } from '../../lib/supabase';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { supabase } from '../../lib/supabase';

interface DesignGalleryProps {
  designs: GeneratedDesign[];
  onDesignUpdate: () => void;
  setDesigns?: React.Dispatch<React.SetStateAction<GeneratedDesign[]>>;
  profile?: any;
}

export function DesignGallery({ designs, onDesignUpdate, setDesigns, profile }: DesignGalleryProps) {
  const { t } = useTranslation();
  const [selectedDesign, setSelectedDesign] = useState<GeneratedDesign | null>(null);

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Download started!');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDelete = async () => {
    if (!selectedDesign) return;
    await supabase
      .from('designs')
      .delete()
      .eq('id', selectedDesign.id);
    toast.success('Design deleted!');
    setSelectedDesign(null);
    if (setDesigns) {
      setDesigns(prev => prev.filter(d => d.id !== selectedDesign.id));
    }
  };

  const isBrandKit = (design: GeneratedDesign) => {
    return design.design_type === 'brandKit' || design.brand_kit_data;
  };

  if (designs.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="max-w-md mx-auto">
          <div className="bg-gray-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <Eye className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No designs yet</h3>
          <p className="text-gray-600 mb-6">
            Create your first design to get started with AI-powered branding!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{t('yourDesigns')}</h2>
        <span className="text-sm text-gray-500">{designs.length} designs</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {designs.map((design, index) => (
          <motion.div
            key={design.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer"
            onClick={() => setSelectedDesign(design)}
          >
            <div className="aspect-square bg-white rounded-lg mb-4 overflow-hidden relative">
              <img
                src={design.logo_url}
                alt={design.business_name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error('Image failed to load:', design.logo_url);
                  // Create a fallback image using Canvas
                  const canvas = document.createElement('canvas');
                  canvas.width = 400;
                  canvas.height = 400;
                  const ctx = canvas.getContext('2d')!;
                  
                  // Create a simple fallback design
                  ctx.fillStyle = '#f3f4f6';
                  ctx.fillRect(0, 0, 400, 400);
                  
                  ctx.fillStyle = '#6b7280';
                  ctx.font = 'bold 24px Arial';
                  ctx.textAlign = 'center';
                  ctx.fillText(design.business_name, 200, 200);
                  
                  ctx.fillStyle = '#9ca3af';
                  ctx.font = '16px Arial';
                  ctx.fillText('Image Preview', 200, 230);
                  
                  e.currentTarget.src = canvas.toDataURL('image/png');
                }}
              />
              
              {/* Brand Kit Badge */}
              {isBrandKit(design) && (
                <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                  <Package className="h-3 w-3" />
                  <span>Brand Kit</span>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">{design.business_name}</h3>
              <p className="text-sm text-gray-600">{design.slogan}</p>
              
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(design.created_at)}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                {isBrandKit(design) && (
                  <div className="flex items-center space-x-1 text-xs text-yellow-600">
                    <Package className="h-3 w-3" />
                    <span>Complete Kit</span>
                  </div>
                )}
                {design.video_url && (
                  <div className="flex items-center space-x-1 text-xs text-blue-600">
                    <Video className="h-3 w-3" />
                    <span>Video</span>
                  </div>
                )}
                {design.merchandise_urls && design.merchandise_urls.length > 0 && (
                  <div className="flex items-center space-x-1 text-xs text-green-600">
                    <Shirt className="h-3 w-3" />
                    <span>Merch</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Design Detail Modal */}
      {selectedDesign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-8 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
              <h2 className="text-2xl font-bold text-gray-900">{selectedDesign.business_name}</h2>
                {isBrandKit(selectedDesign) && (
                  <div className="flex items-center space-x-2 mt-2">
                    <Package className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm text-yellow-600 font-medium">Complete Brand Kit</span>
                  </div>
                )}
              </div>
              <button
                onClick={handleDelete}
                className="text-red-500 hover:text-red-700 transition-colors"
                title="Delete design"
              >
                <Trash2 className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              {isBrandKit(selectedDesign) && selectedDesign.brand_kit_data ? (
                // Brand Kit Display
                <div className="space-y-8">
                  {/* Logo Variations */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                      <Palette className="h-5 w-5" />
                      <span>Logo Variations</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Primary Logo</h4>
                        <img
                          src={selectedDesign.brand_kit_data.primaryLogo}
                          alt="Primary Logo"
                          className="w-full rounded-lg"
                        />
                        <button
                          onClick={() => handleDownload(selectedDesign.brand_kit_data.primaryLogo, `${selectedDesign.business_name}-primary-logo.png`)}
                          className="mt-2 w-full bg-purple-600 text-white py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors"
                        >
                          Download
                        </button>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Secondary Logo</h4>
                        <img
                          src={selectedDesign.brand_kit_data.secondaryLogo}
                          alt="Secondary Logo"
                          className="w-full rounded-lg"
                        />
                        <button
                          onClick={() => handleDownload(selectedDesign.brand_kit_data.secondaryLogo, `${selectedDesign.business_name}-secondary-logo.png`)}
                          className="mt-2 w-full bg-purple-600 text-white py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors"
                        >
                          Download
                        </button>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Icon Logo</h4>
                        <img
                          src={selectedDesign.brand_kit_data.iconLogo}
                          alt="Icon Logo"
                          className="w-full rounded-lg"
                        />
                        <button
                          onClick={() => handleDownload(selectedDesign.brand_kit_data.iconLogo, `${selectedDesign.business_name}-icon-logo.png`)}
                          className="mt-2 w-full bg-purple-600 text-white py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors"
                        >
                          Download
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Color Palette */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                      <Palette className="h-5 w-5" />
                      <span>Color Palette</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {Object.entries(selectedDesign.brand_kit_data.colorPalette).map(([category, colors]) => (
                        <div key={category} className="bg-gray-50 rounded-lg p-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-3 capitalize">{category} Colors</h4>
                          <div className="space-y-2">
                            {colors.map((color, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <div 
                                  className="w-6 h-6 rounded border border-gray-200"
                                  style={{ backgroundColor: color }}
                                ></div>
                                <span className="text-xs text-gray-600 font-mono">{color}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Typography */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                      <Type className="h-5 w-5" />
                      <span>Typography</span>
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Primary Font</h4>
                          <p className="text-lg" style={{ fontFamily: selectedDesign.brand_kit_data.typography.primary }}>
                            {selectedDesign.business_name}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">{selectedDesign.brand_kit_data.typography.primary}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Secondary Font</h4>
                          <p className="text-lg" style={{ fontFamily: selectedDesign.brand_kit_data.typography.secondary }}>
                            {selectedDesign.business_name}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">{selectedDesign.brand_kit_data.typography.secondary}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Brand Guidelines */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Brand Guidelines</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">
                        {selectedDesign.brand_kit_data.brandGuidelines}
                      </pre>
                    </div>
                  </div>
                </div>
              ) : (
                // Regular Design Display
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Logo Design</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <img
                    src={selectedDesign.logo_url}
                    alt={selectedDesign.business_name}
                    className="w-full max-w-md mx-auto rounded-lg"
                    onError={(e) => {
                      console.error('Modal image failed to load:', selectedDesign.logo_url);
                      // Create a fallback image using Canvas
                      const canvas = document.createElement('canvas');
                      canvas.width = 400;
                      canvas.height = 400;
                      const ctx = canvas.getContext('2d')!;
                      
                      // Create a simple fallback design
                      ctx.fillStyle = '#f3f4f6';
                      ctx.fillRect(0, 0, 400, 400);
                      
                      ctx.fillStyle = '#6b7280';
                      ctx.font = 'bold 24px Arial';
                      ctx.textAlign = 'center';
                      ctx.fillText(selectedDesign.business_name, 200, 200);
                      
                      ctx.fillStyle = '#9ca3af';
                      ctx.font = '16px Arial';
                      ctx.fillText('Image Preview', 200, 230);
                      
                      e.currentTarget.src = canvas.toDataURL('image/png');
                    }}
                  />
                </div>
                <button
                  onClick={() => {
                    if (profile?.role === 'user' && !profile?.isPro) {
                      toast.error('Fayl yuklash faqat Pro yoki Freelancer obunachilar uchun!');
                      return;
                    }
                    handleDownload(selectedDesign.logo_url, `${selectedDesign.business_name}-logo.png`);
                  }}
                    className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                    <span>Download Logo</span>
                </button>
                </div>
              )}

              {/* Video Preview */}
              {selectedDesign.video_url && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Video Preview</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <img
                      src={selectedDesign.video_url}
                      alt="Video Preview"
                      className="w-full max-w-md mx-auto rounded-lg"
                    />
                  </div>
                  <button
                    onClick={() => handleDownload(selectedDesign.video_url!, `${selectedDesign.business_name}-video.mp4`)}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Video</span>
                  </button>
                </div>
              )}

              {/* Merchandise */}
              {selectedDesign.merchandise_urls && selectedDesign.merchandise_urls.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Merchandise Designs</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedDesign.merchandise_urls.map((url, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <img
                          src={url}
                          alt={`Merchandise ${index + 1}`}
                          className="w-full rounded-lg"
                        />
                        <button
                          onClick={() => handleDownload(url, `${selectedDesign.business_name}-merchandise-${index + 1}.png`)}
                          className="mt-2 w-full bg-green-600 text-white py-2 rounded-lg text-sm hover:bg-green-700 transition-colors"
                        >
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedDesign(null)}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}