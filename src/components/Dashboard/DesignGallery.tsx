import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Download, Eye, Calendar, Video, Shirt, Trash2 } from 'lucide-react';
import { GeneratedDesign } from '../../lib/supabase';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { supabase } from '../../lib/supabase';

interface DesignGalleryProps {
  designs: GeneratedDesign[];
  onDesignUpdate: () => void;
  setDesigns?: React.Dispatch<React.SetStateAction<GeneratedDesign[]>>;
  profile?: any;
  hasMore: boolean;
  onLoadMore: () => void;
}

export function DesignGallery({ designs, onDesignUpdate, setDesigns, profile, hasMore, onLoadMore }: DesignGalleryProps) {
  const { t } = useTranslation();
  const [selectedDesign, setSelectedDesign] = useState<GeneratedDesign | null>(null);
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9, rotate: -5 }}
            animate={prefersReducedMotion ? false : { opacity: 1, scale: 1, rotate: 0 }}
            transition={prefersReducedMotion ? false : { duration: 0.6, delay: index * 0.1, type: 'spring' }}
            className="bg-gradient-to-br from-blue-50 via-white to-purple-100 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer"
            onClick={() => setSelectedDesign(design)}
          >
            <motion.div
              className="aspect-square bg-white rounded-lg mb-4 overflow-hidden flex items-center justify-center"
              whileHover={prefersReducedMotion ? false : { scale: 1.05, rotate: 2 }}
              style={{ boxShadow: '0 4px 32px 0 rgba(80,80,200,0.08)' }}
            >
              <motion.img
                src={design.logo_url}
                alt={design.business_name}
                className="w-full h-full object-cover"
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
                animate={prefersReducedMotion ? false : { opacity: 1, scale: 1 }}
                transition={prefersReducedMotion ? false : { duration: 0.7 }}
                loading="lazy"
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
            </motion.div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">{design.business_name}</h3>
              <p className="text-sm text-gray-600">{design.slogan}</p>
              
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(design.created_at)}</span>
              </div>
              
              <div className="flex items-center space-x-2">
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
      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={onLoadMore}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-all"
          >
            {t('Yana ko‘rsatish')}
          </button>
        </div>
      )}

      {/* Design Detail Modal */}
      {selectedDesign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{selectedDesign.business_name}</h2>
              <button
                onClick={handleDelete}
                className="text-red-500 hover:text-red-700 transition-colors"
                title="Delete design"
              >
                <Trash2 className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Logo */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Logo Design</h3>
                <div className="bg-gradient-to-br from-blue-100 via-white to-purple-200 rounded-lg p-4 flex items-center justify-center">
                  <motion.img
                    src={selectedDesign.logo_url}
                    alt={selectedDesign.business_name}
                    className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                    initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8, rotate: -8 }}
                    animate={prefersReducedMotion ? false : { opacity: 1, scale: 1, rotate: 0 }}
                    transition={prefersReducedMotion ? false : { duration: 0.7, type: 'spring' }}
                    loading="lazy"
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
                  className={`mt-3 px-4 py-2 rounded-lg flex items-center space-x-2 ${profile?.role === 'user' && !profile?.isPro ? 'bg-gray-200 text-gray-400 hover:bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700 transition-colors'}`}
                >
                  <Download className="h-4 w-4" />
                  <span>Download PNG</span>
                </button>
              </div>

              {/* Slogan */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Slogan</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xl text-gray-800 font-medium">{selectedDesign.slogan}</p>
                </div>
              </div>

              {/* Video Preview */}
              {selectedDesign.video_url && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Video Preview</h3>
                  <motion.div
                    className="bg-gradient-to-br from-purple-100 via-white to-blue-100 rounded-lg p-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.video
                      src={selectedDesign.video_url}
                      controls
                      className="w-full rounded-lg shadow-md"
                      poster={selectedDesign.logo_url}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.7 }}
                    />
                  </motion.div>
                  <button
                    onClick={() => {
                      if (profile?.role === 'user' && !profile?.isPro) {
                        toast.error('Fayl yuklash faqat Pro yoki Freelancer obunachilar uchun!');
                        return;
                      }
                      handleDownload(selectedDesign.video_url!, `${selectedDesign.business_name}-video.mp4`);
                    }}
                    className={`mt-3 px-4 py-2 rounded-lg flex items-center space-x-2 ${profile?.role === 'user' && !profile?.isPro ? 'bg-gray-200 text-gray-400 hover:bg-gray-300' : 'bg-purple-600 text-white hover:bg-purple-700 transition-colors'}`}
                  >
                    <Download className="h-4 w-4" />
                    <span>Download MP4</span>
                  </button>
                </div>
              )}

              {/* Merchandise */}
              {selectedDesign.merchandise_urls && selectedDesign.merchandise_urls.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Merchandise Designs</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedDesign.merchandise_urls.map((url, index) => {
                      // Mockup type aniqlash (t-shirt, cup, sticker)
                      let mockupType = 'tshirt';
                      if (url.toLowerCase().includes('cup') || url.toLowerCase().includes('kubok')) mockupType = 'cup';
                      if (url.toLowerCase().includes('sticker')) mockupType = 'sticker';
                      return (
                        <div key={index} className="bg-gray-50 rounded-lg p-4 relative overflow-hidden flex items-center justify-center">
                          {/* T-shirt uchun mato teksturasi overlay */}
                          {mockupType === 'tshirt' && (
                            <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-multiply" style={{backgroundImage: 'url(https://www.transparenttextures.com/patterns/cloth-alike.png)'}} />
                          )}
                          {/* Kubok uchun aks (reflection) */}
                          {mockupType === 'cup' && (
                            <div className="absolute inset-0 pointer-events-none opacity-20" style={{background: 'linear-gradient(120deg, rgba(255,255,255,0.7) 10%, rgba(255,255,255,0.1) 60%)'}} />
                          )}
                          {/* Stiker uchun shaffoflik va soya */}
                          {mockupType === 'sticker' && (
                            <div className="absolute inset-0 pointer-events-none" style={{boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)', borderRadius: '1rem', background: 'rgba(255,255,255,0.2)'}} />
                          )}
                          <img
                            src={url}
                            alt={`${selectedDesign.business_name} merchandise ${index + 1}`}
                            className={`w-full rounded-lg relative z-10 ${mockupType === 'sticker' ? 'bg-white bg-opacity-60' : ''}`}
                            style={mockupType === 'sticker' ? {backdropFilter: 'blur(2px)'} : {}}
                            loading="lazy"
                            onError={(e) => {
                              console.error('Merchandise image failed to load:', url);
                              // Create a fallback image using Canvas
                              const canvas = document.createElement('canvas');
                              canvas.width = 400;
                              canvas.height = 400;
                              const ctx = canvas.getContext('2d')!;
                              
                              // Create a simple fallback design
                              ctx.fillStyle = '#f3f4f6';
                              ctx.fillRect(0, 0, 400, 400);
                              
                              ctx.fillStyle = '#6b7280';
                              ctx.font = 'bold 20px Arial';
                              ctx.textAlign = 'center';
                              ctx.fillText(selectedDesign.business_name, 200, 190);
                              
                              ctx.fillStyle = '#9ca3af';
                              ctx.font = '14px Arial';
                              ctx.fillText('Merchandise Preview', 200, 220);
                              ctx.fillText(`${index + 1}`, 200, 240);
                              
                              e.currentTarget.src = canvas.toDataURL('image/png');
                            }}
                          />
                          <button
                            onClick={() => {
                              if (profile?.role === 'user' && !profile?.isPro) {
                                toast.error('Fayl yuklash faqat Pro yoki Freelancer obunachilar uchun!');
                                return;
                              }
                              handleDownload(url, `${selectedDesign.business_name}-merch-${index + 1}.png`);
                            }}
                            className={`mt-3 px-4 py-2 rounded-lg flex items-center space-x-2 ${profile?.role === 'user' && !profile?.isPro ? 'bg-gray-200 text-gray-400 hover:bg-gray-300' : 'bg-green-600 text-white hover:bg-green-700 transition-colors'} absolute bottom-4 left-1/2 -translate-x-1/2 z-20`}
                          >
                            <Download className="h-4 w-4" />
                            <span>Download</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}