import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Palette, User, LogOut, Globe, Shield } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { motion } from 'framer-motion'

export function Header() {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const { user, signOut, profile } = useAuth()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  const isActive = (path: string) => location.pathname === path

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg"
            >
              <Palette className="h-6 w-6 text-white" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              MiniStudio
            </span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                isActive('/') ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              {t('home')}
            </Link>
            {user && (
              <Link
                to="/dashboard"
                className={`text-sm font-medium transition-colors ${
                  isActive('/dashboard') ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'
                }`}
              >
                {t('dashboard')}
              </Link>
            )}
            {user && profile?.role === 'admin' && (
              <>
                <Link
                  to="/admin"
                  className={`text-sm font-medium transition-colors flex items-center space-x-1 ${
                    isActive('/admin') ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'
                  }`}
                >
                  <Shield className="h-4 w-4" />
                  <span>Admin Panel</span>
                </Link>
                <Link
                  to="/admin-setup"
                  className={`text-sm font-medium transition-colors flex items-center space-x-1 ${
                    isActive('/admin-setup') ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'
                  }`}
                >
                  <Shield className="h-4 w-4" />
                  <span>Admin Setup</span>
                </Link>
              </>
            )}
            <Link
              to="/support"
              className={`text-sm font-medium transition-colors ${
                isActive('/support') ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              {t('support')}
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-colors">
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {i18n.language.toUpperCase()}
                </span>
              </button>
              <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="py-1">
                  <button
                    onClick={() => changeLanguage('en')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    English
                  </button>
                  <button
                    onClick={() => changeLanguage('uz')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    O'zbek
                  </button>
                  <button
                    onClick={() => changeLanguage('ru')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Русский
                  </button>
                </div>
              </div>
            </div>

            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {user.email}
                  </span>
                </div>

                <button
                  onClick={signOut}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm font-medium">{t('logout')}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
                >
                  {t('login')}
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-shadow"
                >
                  {t('register')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}