import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import SEO from './components/SEO';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { Hero } from './components/Home/Hero';
import { Features } from './components/Home/Features';
import { Pricing } from './components/Home/Pricing';
import { Login } from './components/Auth/Login';
import { Register } from './components/Auth/Register';
import { ForgotPassword } from './components/Auth/ForgotPassword';
import { ResetPassword } from './components/Auth/ResetPassword';
import { AdminSetup } from './components/Admin/AdminSetup';
import { NotFound } from './components/Error/NotFound';
import { Dashboard } from './components/Dashboard/Dashboard';
import { Support } from './components/Support/Support';
import { AdminPanel } from './components/Admin/AdminPanel';
import { useAuth } from './hooks/useAuth';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';
import { AdminRoute } from './components/Auth/AdminRoute';
import './lib/i18n';

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg">Loading MiniStudio...</p>
        </div>
      </div>
    );
  }

  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<><SEO /><HomePage /></>} />
              <Route path="/login" element={<><SEO title="Login" description="Login to your MiniStudio account." /><Login /></>} />
              <Route path="/register" element={<><SEO title="Register" description="Create a new MiniStudio account." /><Register /></>} />
              <Route path="/forgot-password" element={<><SEO title="Forgot Password" description="Reset your MiniStudio password." /><ForgotPassword /></>} />
              <Route path="/reset-password" element={<><SEO title="Reset Password" description="Set a new password for your MiniStudio account." /><ResetPassword /></>} />
              <Route path="/admin-setup" element={<><SEO title="Admin Setup" description="Setup MiniStudio admin panel." /><AdminSetup /></>} />
              <Route path="*" element={<><SEO title="404 Not Found" description="Page not found." /><NotFound /></>} />
              <Route path="/support" element={<><SEO title="Support" description="Get help and support for MiniStudio." /><Support /></>} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <><SEO title="Dashboard" description="Your MiniStudio dashboard." /><Dashboard /></>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <AdminRoute>
                    <><SEO title="Admin Panel" description="MiniStudio admin panel." /><AdminPanel /></>
                  </AdminRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
          <Toaster position="top-right" />
        </div>
      </Router>
    </HelmetProvider>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Pricing />
    </>
  );
}

export default App;