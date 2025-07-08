import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Download, Eye, Calendar, Zap, Crown, Star, Brain, Sparkles } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useDailyLimit } from '../../hooks/useDailyLimit';
import { CreateDesignModal } from './CreateDesignModal';
import { DesignGallery } from './DesignGallery';
import { supabase, GeneratedDesign, mapGeneratedDesign } from '../../lib/supabase';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { aiServiceManager } from '../../services/aiServiceManager';

export function Dashboard() {
  const { t } = useTranslation();
  const { user, profile } = useAuth();
  const { dailyLimit, remainingUsage, canGenerate } = useDailyLimit(profile);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [designs, setDesigns] = useState<GeneratedDesign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDesigns();
    }
  }, [user]);

  const fetchDesigns = async () => {
    try {
      const { data, error } = await supabase
        .from('designs')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Map database data to interface
      const mappedDesigns = (data || []).map(mapGeneratedDesign);
      console.log('Fetched designs from database:', mappedDesigns);
      setDesigns(mappedDesigns);
    } catch (error) {
      console.warn('Database fetch failed, using localStorage:', error);
      
      // Fallback to localStorage
      try {
        const offlineDesigns = JSON.parse(localStorage.getItem('offlineDesigns') || '[]');
        console.log('Fetched designs from localStorage:', offlineDesigns);
        setDesigns(offlineDesigns);
      } catch (localStorageError) {
        console.error('LocalStorage error:', localStorageError);
        setDesigns([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDesignCreated = (design: GeneratedDesign) => {
    setDesigns(prev => [design, ...prev]);
    setShowCreateModal(false);
    toast.success('Design created successfully!');
  };

  const getRoleIcon = (role: string, isPro: boolean) => {
    if (isPro) return <Crown className="h-5 w-5 text-yellow-500" />;
    if (role === 'freelancer') return <Star className="h-5 w-5 text-blue-500" />;
    return <Zap className="h-5 w-5 text-gray-500" />;
  };

  const getRoleName = (role: string, isPro: boolean) => {
    if (isPro) return 'Pro Agent';
    if (role === 'freelancer') return 'Freelancer';
    return 'Free';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {t('welcomeBack')}, {profile?.name}!
                </h1>
                <p className="text-gray-600">Ready to create amazing designs?</p>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg">
                  {getRoleIcon(profile?.role || 'user', profile?.isPro || false)}
                  <span className="font-medium text-gray-700">
                    {getRoleName(profile?.role || 'user', profile?.isPro || false)}
                  </span>
                </div>
                
                {/* Debug information */}
                <div className="text-xs text-gray-500 bg-yellow-100 p-2 rounded">
                  Debug: canGenerate={canGenerate.toString()}, 
                  remainingUsage={remainingUsage}, 
                  dailyLimit={dailyLimit}
                </div>
                
                <button
                  onClick={() => {
                    console.log('Create button clicked');
                    console.log('canGenerate:', canGenerate);
                    console.log('remainingUsage:', remainingUsage);
                    console.log('profile:', profile);
                    setShowCreateModal(true);
                  }}
                  disabled={!canGenerate}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <Plus className="h-5 w-5" />
                  <span>{t('createNewDesign')}</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{t('dailyUsage')}</h3>
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Used</span>
                <span className="font-medium">{dailyLimit - remainingUsage}/{dailyLimit}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
                  style={{ width: `${((dailyLimit - remainingUsage) / dailyLimit) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500">
                {remainingUsage} generations remaining today
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Total Designs</h3>
              <Eye className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{designs.length}</div>
            <p className="text-sm text-gray-600">Designs created</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">AI Services</h3>
              <Brain className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">3</div>
            <p className="text-sm text-gray-600">OpenAI • Leonardo • Hugging Face</p>
          </div>
        </motion.div>

        {/* Designs Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <DesignGallery 
            designs={designs} 
            onDesignUpdate={fetchDesigns}
            setDesigns={setDesigns}
            profile={profile}
          />
        </motion.div>
      </div>

      {/* Create Design Modal */}
      {showCreateModal && (
        <CreateDesignModal
          onClose={() => setShowCreateModal(false)}
          onDesignCreated={handleDesignCreated}
          canGenerate={canGenerate}
          remainingUsage={remainingUsage}
        />
      )}
    </div>
  );
}