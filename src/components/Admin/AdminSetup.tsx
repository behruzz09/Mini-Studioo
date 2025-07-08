import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, User, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';

export function AdminSetup() {
  const { t } = useTranslation();
  const { user, profile, loading } = useAuth();
  const [email, setEmail] = useState('bbekhruz009@gmail.com');
  const [loadingAction, setLoadingAction] = useState(false);
  const [success, setSuccess] = useState(false);

  // Check if current user is admin
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-8 text-center">
          <div className="text-red-500 mb-4">
            <svg className="h-12 w-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Kirish talab qilinadi</h2>
          <p className="text-gray-600 mb-4">Admin setup sahifasiga kirish uchun avval tizimga kiring</p>
          <a href="/login" className="inline-flex items-center bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
            Login qilish
          </a>
        </div>
      </div>
    );
  }

  if (!profile || profile.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-8 text-center">
          <div className="text-red-500 mb-4">
            <svg className="h-12 w-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Admin huquqi yo'q</h2>
          <p className="text-gray-600 mb-4">
            Bu sahifaga faqat admin foydalanuvchilar kirishi mumkin. Hozirgi rol: <span className="font-semibold">{profile?.role || 'unknown'}</span>
          </p>
          <a href="/" className="inline-flex items-center bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
            Bosh sahifaga qaytish
          </a>
        </div>
      </div>
    );
  }

  const handleAssignAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingAction(true);

    try {
      console.log('Assigning admin role to:', email);

      // First, find the user by email
      const { data: users, error: findError } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', email);

      if (findError) {
        console.error('Error finding user:', findError);
        toast.error('Error finding user: ' + findError.message);
        return;
      }

      if (!users || users.length === 0) {
        toast.error('User not found with this email');
        return;
      }

      const user = users[0];
      console.log('Found user:', user);

      // Update the user's profile to have admin role
      const { data, error } = await supabase
        .from('profiles')
        .update({ 
          role: 'admin',
          is_pro: true,
          plan: 'premium'
        })
        .eq('id', user.id)
        .select();

      if (error) {
        console.error('Error updating profile:', error);
        toast.error('Error updating user role: ' + error.message);
        return;
      }

      if (data && data.length > 0) {
        setSuccess(true);
        toast.success('Admin role assigned successfully!');
        console.log('Admin role assigned to:', email);
        console.log('Updated profile:', data[0]);
      } else {
        toast.error('Failed to update user role');
      }

    } catch (error) {
      console.error('Error assigning admin role:', error);
      toast.error('Failed to assign admin role');
    } finally {
      setLoadingAction(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center"
        >
          <div className="bg-green-100 p-4 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Admin Role Assigned!</h2>
          <p className="text-gray-600 mb-6">
            {email} ga admin huquqi berildi. Endi admin paneliga kirishingiz mumkin.
          </p>
          <div className="space-y-2 text-sm text-gray-500">
            <p>Email: {email}</p>
            <p>Role: Admin</p>
            <p>Plan: Premium</p>
          </div>
          <div className="mt-6 space-y-3">
            <a
              href="/admin"
              className="inline-flex items-center bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              <Shield className="h-4 w-4 mr-2" />
              Admin Paneliga o'tish
            </a>
            <br />
            <a
              href="/login"
              className="inline-flex items-center bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              <User className="h-4 w-4 mr-2" />
              Login qilish
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8"
      >
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Setup</h2>
          <p className="text-gray-600">Foydalanuvchiga admin huquqini bering</p>
        </div>

        <form onSubmit={handleAssignAdmin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email manzil
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="bekhruz009@gmail.com"
              required
            />
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800">Eslatma</span>
            </div>
            <p className="text-sm text-yellow-700">
              Bu foydalanuvchiga to'liq admin huquqlarini beradi. Faqat ishonchli foydalanuvchilar uchun ishlatiling.
            </p>
          </div>

          <button
            type="submit"
            disabled={loadingAction}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingAction ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Admin huquqini berish...
              </span>
            ) : (
              'Admin huquqini bering'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Foydalanuvchi avval ro'yxatdan o'tgan bo'lishi kerak
          </p>
        </div>
      </motion.div>
    </div>
  );
}
 