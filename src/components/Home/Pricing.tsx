import React from 'react'
import { useTranslation } from 'react-i18next'
import { Check, Star, Crown, Zap, Package } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export function Pricing() {
  const { t } = useTranslation()

  const plans = [
    {
      name: t('free'),
      price: '0',
      currency: 'UZS',
      period: t('perMonth'),
      description: '3 ' + t('generationsPerDay'),
      features: [
        'Logo generation',
        'Basic slogans',
        'PNG downloads',
        'Community support'
      ],
      icon: Zap,
      popular: false,
      gradient: 'from-gray-500 to-gray-600'
    },
    {
      name: t('freelancer'),
      price: '50,000',
      currency: 'UZS',
      period: t('perMonth'),
      description: '10 ' + t('generationsPerDay'),
      features: [
        'Logo + slogan generation',
        'Merchandise designs',
        'PNG, SVG downloads',
        'Priority support',
        'Commercial license'
      ],
      icon: Star,
      popular: true,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      name: t('proAgent'),
      price: '150,000',
      currency: 'UZS',
      period: t('perMonth'),
      description: '50 ' + t('generationsPerDay'),
      features: [
        'Everything in Freelancer',
        'Complete Brand Kit',
        'Video preview generation',
        'All formats (PNG, SVG, MP4)',
        'Advanced AI models',
        'Brand guidelines PDF',
        'Dedicated support'
      ],
      icon: Crown,
      popular: false,
      gradient: 'from-blue-500 to-cyan-500',
      highlight: true
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('pricing')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your design needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                plan.popular ? 'ring-2 ring-purple-500 scale-105' : ''
              } ${plan.highlight ? 'ring-2 ring-yellow-500' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}
              
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <Package className="h-3 w-3" />
                    <span>NEW FEATURE</span>
                  </div>
                </div>
              )}

              <div className="p-8">
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${plan.gradient} flex items-center justify-center mx-auto mb-4`}>
                    <plan.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-500 ml-2">{plan.currency}</span>
                  </div>
                  
                  <p className="text-gray-600">{plan.period}</p>
                  <p className="text-sm text-gray-500 mt-2">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/register"
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-center transition-all duration-300 block ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/25'
                      : plan.highlight
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:shadow-lg hover:shadow-yellow-500/25'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {t('selectPlan')}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}