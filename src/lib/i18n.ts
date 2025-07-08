import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  en: {
    translation: {
      // Navigation
      home: 'Home',
      dashboard: 'Dashboard',
      support: 'Support',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      adminPanel: 'Admin Panel',
      adminSetup: 'Admin Setup',
      
      // Hero Section
      heroTitle: 'AI Design & Branding Platform',
      heroSubtitle: 'Create professional logos, slogans, videos, and merchandise for your business with AI',
      getStarted: 'Get Started',
      goToDashboard: 'Go to Dashboard',
      watchDemo: 'Watch Demo',
      
      // Features
      features: 'Features',
      logoDesign: 'Logo Design',
      logoDesignDesc: 'AI-powered logo generation with custom slogans',
      videoPreview: 'Video Preview',
      videoPreviewDesc: 'Create promotional video previews for your brand',
      merchandise: 'Merchandise',
      merchandiseDesc: 'Design t-shirts, caps, and banners automatically',
      
      // Pricing
      pricing: 'Pricing',
      free: 'Free',
      freelancer: 'Freelancer',
      proAgent: 'Pro Agent',
      perMonth: '/month',
      generationsPerDay: 'generations per day',
      selectPlan: 'Select Plan',
      
      // Auth
      emailAddress: 'Email Address',
      password: 'Password',
      fullName: 'Full Name',
      confirmPassword: 'Confirm Password',
      selectRole: 'Select Role',
      user: 'User',
      admin: 'Admin',
      
      // Dashboard
      welcomeBack: 'Welcome back',
      createNewDesign: 'Create New Design',
      yourDesigns: 'Your Designs',
      dailyUsage: 'Daily Usage',
      businessName: 'Business Name',
      generateDesign: 'Generate Design',
      
      // Support
      supportTitle: 'Support Center',
      supportSubtitle: 'Get help with your account and designs',
      contactUs: 'Contact Us',
      message: 'Message',
      sendMessage: 'Send Message'
    }
  },
  uz: {
    translation: {
      // Navigation
      home: 'Bosh sahifa',
      dashboard: 'Boshqaruv paneli',
      support: 'Qo\'llab-quvvatlash',
      login: 'Kirish',
      register: 'Ro\'yxatdan o\'tish',
      logout: 'Chiqish',
      adminPanel: 'Admin Panel',
      adminSetup: 'Admin Setup',
      
      // Hero Section
      heroTitle: 'AI Dizayn va Brending Platformasi',
      heroSubtitle: 'Biznesingiz uchun professional logotip, slogan, video va merch dizaynlarini AI yordamida yarating',
      getStarted: 'Boshlash',
      goToDashboard: 'Boshqaruv paneliga o\'tish',
      watchDemo: 'Demoni ko\'rish',
      
      // Features
      features: 'Imkoniyatlar',
      logoDesign: 'Logo Dizayn',
      logoDesignDesc: 'AI yordamida logotip va slogan yaratish',
      videoPreview: 'Video Preview',
      videoPreviewDesc: 'Brendingiz uchun reklama videolarini yaratish',
      merchandise: 'Merch dizayn',
      merchandiseDesc: 'Futbolka, kepka va bannerlarni avtomatik yaratish',
      
      // Pricing
      pricing: 'Tariflar',
      free: 'Bepul',
      freelancer: 'Frilanser',
      proAgent: 'Pro Agent',
      perMonth: '/oylik',
      generationsPerDay: 'kunlik generatsiya',
      selectPlan: 'Rejani tanlash',
      
      // Auth
      emailAddress: 'Email manzil',
      password: 'Parol',
      fullName: 'To\'liq ism',
      confirmPassword: 'Parolni tasdiqlash',
      selectRole: 'Rolni tanlash',
      user: 'Foydalanuvchi',
      admin: 'Administrator',
      
      // Dashboard
      welcomeBack: 'Xush kelibsiz',
      createNewDesign: 'Yangi dizayn yaratish',
      yourDesigns: 'Sizning dizaynlaringiz',
      dailyUsage: 'Kunlik foydalanish',
      businessName: 'Biznes nomi',
      generateDesign: 'Dizayn yaratish',
      
      // Support
      supportTitle: 'Yordam markazi',
      supportSubtitle: 'Hisob va dizaynlar bo\'yicha yordam oling',
      contactUs: 'Biz bilan bog\'laning',
      message: 'Xabar',
      sendMessage: 'Xabar yuborish'
    }
  },
  ru: {
    translation: {
      // Navigation
      home: 'Главная',
      dashboard: 'Панель управления',
      support: 'Поддержка',
      login: 'Вход',
      register: 'Регистрация',
      logout: 'Выход',
      adminPanel: 'Панель администратора',
      adminSetup: 'Настройка администратора',
      
      // Hero Section
      heroTitle: 'ИИ Платформа для Дизайна и Брендинга',
      heroSubtitle: 'Создавайте профессиональные логотипы, слоганы, видео и мерч для вашего бизнеса с помощью ИИ',
      getStarted: 'Начать',
      goToDashboard: 'Перейти в панель управления',
      watchDemo: 'Смотреть демо',
      
      // Features
      features: 'Возможности',
      logoDesign: 'Дизайн логотипа',
      logoDesignDesc: 'Создание логотипов и слоганов с помощью ИИ',
      videoPreview: 'Видео превью',
      videoPreviewDesc: 'Создание рекламных видео для вашего бренда',
      merchandise: 'Мерч дизайн',
      merchandiseDesc: 'Автоматическое создание дизайна футболок, кепок и баннеров',
      
      // Pricing
      pricing: 'Тарифы',
      free: 'Бесплатно',
      freelancer: 'Фрилансер',
      proAgent: 'Про Агент',
      perMonth: '/месяц',
      generationsPerDay: 'генераций в день',
      selectPlan: 'Выбрать план',
      
      // Auth
      emailAddress: 'Email адрес',
      password: 'Пароль',
      fullName: 'Полное имя',
      confirmPassword: 'Подтвердить пароль',
      selectRole: 'Выбрать роль',
      user: 'Пользователь',
      admin: 'Администратор',
      
      // Dashboard
      welcomeBack: 'Добро пожаловать',
      createNewDesign: 'Создать новый дизайн',
      yourDesigns: 'Ваши дизайны',
      dailyUsage: 'Дневное использование',
      businessName: 'Название бизнеса',
      generateDesign: 'Создать дизайн',
      
      // Support
      supportTitle: 'Центр поддержки',
      supportSubtitle: 'Получите помощь по вашему аккаунту и дизайнам',
      contactUs: 'Связаться с нами',
      message: 'Сообщение',
      sendMessage: 'Отправить сообщение'
    }
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n