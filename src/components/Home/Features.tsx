import React from 'react'
import { useTranslation } from 'react-i18next'
import { Palette, Video, Shirt, Zap, Download, Globe, Package } from 'lucide-react'
import { motion } from 'framer-motion'

export function Features() {
  const { t } = useTranslation()

  const features = [
    {
      icon: Package,
      title: 'Complete Brand Kit',
      description: 'Professional logo variations, color palette, typography & brand guidelines',
      gradient: 'from-yellow-500 to-orange-500',
      highlight: true
    },
    {
      icon: Palette,
      title: t('logoDesign'),
      description: t('logoDesignDesc'),
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Video,
      title: t('videoPreview'),
      description: t('videoPreviewDesc'),
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Shirt,
      title: t('merchandise'),
      description: t('merchandiseDesc'),
      gradient: 'from-green-500 to-teal-500'
    },
    {
      icon: Zap,
      title: 'AI Powered',
      description: 'Advanced AI algorithms for professional results',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Download,
      title: 'Multiple Formats',
      description: 'Download in PNG, SVG, MP4 formats',
      gradient: 'from-red-500 to-rose-500'
    },
    {
      icon: Globe,
      title: 'Multi-language',
      description: 'Support for Uzbek, English, and Russian',
      gradient: 'from-indigo-500 to-purple-500'
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('features')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to create professional designs for your business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group ${
                feature.highlight ? 'ring-2 ring-yellow-500 scale-105' : ''
              }`}
            >
              {feature.highlight && (
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                  NEW
                </div>
              )}
              
              <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}