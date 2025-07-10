import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Users, Settings, Crown, Star, Zap, Mail, MessageSquare, Send } from 'lucide-react';
import { supabase, UserProfile } from '../../lib/supabase';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface SupportTicket {
  id: string;
  email: string;
  message: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  created_at: string;
  user_id?: string;
}

export function AdminPanel() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [activeTab, setActiveTab] = useState<'users' | 'tickets'>('users');
  const [loading, setLoading] = useState(true);
  const [activeChatUser, setActiveChatUser] = useState<UserProfile | null>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [adminInput, setAdminInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchUsers();
    fetchTickets();
  }, []);

  // Foydalanuvchi tanlanganda chat xabarlarini olish
  useEffect(() => {
    if (!activeChatUser) return;
    const fetchChat = async () => {
      const { data, error } = await supabase
        .from('support_tickets')
        .select('*')
        .eq('user_id', activeChatUser.id)
        .order('created_at', { ascending: true });
      if (!error) setChatMessages(data || []);
    };
    fetchChat();
    const channel = supabase
      .channel('support_tickets')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'support_tickets' }, fetchChat)
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [activeChatUser]);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatMessages]);

  const handleAdminSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!adminInput.trim() || !activeChatUser) return;
    setChatLoading(true);
    await supabase.from('support_tickets').insert([
      { user_id: activeChatUser.id, email: activeChatUser.email, message: adminInput, status: 'open', sender: 'admin' }
    ]);
    setAdminInput('');
    setChatLoading(false);
  };

  const fetchUsers = async () => {
    try {
      console.log('Fetching users from profiles table...');
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('Supabase response:', { data, error });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Setting users:', data);
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const fetchTickets = async () => {
    try {
      const { data, error } = await supabase
        .from('support_tickets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTickets(data || []);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast.error('Failed to load support tickets');
    }
  };

  const updateUserRole = async (userId: string, role: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role })
        .eq('id', userId);

      if (error) throw error;
      toast.success('User role updated successfully');
      fetchUsers();
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error('Failed to update user role');
    }
  };

  const toggleProStatus = async (userId: string, isPro: boolean) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_pro: isPro })
        .eq('id', userId);

      if (error) throw error;
      toast.success(`Pro status ${isPro ? 'enabled' : 'disabled'} successfully`);
      fetchUsers();
    } catch (error) {
      console.error('Error updating pro status:', error);
      toast.error('Failed to update pro status');
    }
  };

  const resetDailyUsage = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ daily_usage: 0 })
        .eq('id', userId);

      if (error) throw error;
      toast.success('Daily usage reset successfully');
      fetchUsers();
    } catch (error) {
      console.error('Error resetting daily usage:', error);
      toast.error('Failed to reset daily usage');
    }
  };



  const updateUserPlan = async (userId: string, plan: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ plan })
        .eq('id', userId);

      if (error) throw error;
      toast.success('User plan updated successfully');
      fetchUsers();
    } catch (error) {
      console.error('Error updating user plan:', error);
      toast.error('Failed to update user plan');
    }
  };

  const getRoleIcon = (role: string, isPro: boolean) => {
    if (isPro) return <Crown className="h-5 w-5 text-yellow-500" />;
    if (role === 'freelancer') return <Star className="h-5 w-5 text-blue-500" />;
    if (role === 'admin') return <Settings className="h-5 w-5 text-purple-500" />;
    return <Zap className="h-5 w-5 text-gray-500" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <p className="text-gray-600">Manage users, plans, and support tickets</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{users.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pro Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.filter(u => u.isPro).length}
                </p>
              </div>
              <Crown className="h-8 w-8 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Support Tickets</p>
                <p className="text-2xl font-bold text-gray-900">{tickets.length}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Open Tickets</p>
                <p className="text-2xl font-bold text-gray-900">
                  {tickets.filter(t => t.status === 'open').length}
                </p>
              </div>
              <Mail className="h-8 w-8 text-red-600" />
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('users')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'users'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Users Management
            </button>
            <button
              onClick={() => setActiveTab('tickets')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'tickets'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Support Chats
            </button>
          </div>
        </div>

        {/* Users Tab */}
        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Users Management</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Daily Usage
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Admin Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getRoleIcon(user.role, user.isPro)}
                          <span className="text-sm text-gray-900 capitalize">{user.role}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.isPro ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.isPro ? 'Pro' : 'Free'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.dailyUsage || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <select
                          value={user.role}
                          onChange={(e) => updateUserRole(user.id, e.target.value)}
                          className="text-xs border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="user">User</option>
                          <option value="freelancer">Freelancer</option>
                          <option value="admin">Admin</option>
                        </select>
                        
                        <button
                          onClick={() => toggleProStatus(user.id, !user.isPro)}
                          className={`text-xs px-2 py-1 rounded ${
                            user.isPro
                              ? 'bg-red-100 text-red-600 hover:bg-red-200'
                              : 'bg-green-100 text-green-600 hover:bg-green-200'
                          }`}
                        >
                          {user.isPro ? 'Remove Pro' : 'Make Pro'}
                        </button>
                        
                        <button
                          onClick={() => resetDailyUsage(user.id)}
                          className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-600 hover:bg-blue-200"
                        >
                          Reset Usage
                        </button>

                        <select
                          value={typeof user.plan === 'string' ? user.plan : 'free'}
                          onChange={e => updateUserPlan(user.id, e.target.value)}
                          className="text-xs border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="free">Free</option>
                          <option value="pro">Pro</option>
                          <option value="premium">Premium</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Tickets Tab */}
        {activeTab === 'tickets' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Support Chats</h2>
            </div>
            <div className="flex">
              {/* Foydalanuvchilar ro‘yxati */}
              <div className="w-1/3 border-r p-4 max-h-[60vh] overflow-y-auto">
                <h3 className="font-semibold mb-2">Foydalanuvchilar</h3>
                {users.map(u => (
                  <div
                    key={u.id}
                    className={`p-2 rounded cursor-pointer mb-1 ${activeChatUser?.id === u.id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                    onClick={() => setActiveChatUser(u)}
                  >
                    <div className="font-medium">{u.name || u.email}</div>
                    <div className="text-xs text-gray-500">{u.email}</div>
                  </div>
                ))}
              </div>
              {/* Chat oynasi */}
              <div className="flex-1 flex flex-col h-[60vh]">
                {activeChatUser ? (
                  <>
                    <div className="p-4 border-b font-semibold">{activeChatUser.name || activeChatUser.email} bilan chat</div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gradient-to-br from-white via-blue-50 to-purple-50">
                      {chatMessages.map((msg, i) => (
                        <div key={msg.id || i} className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`px-3 py-2 rounded-lg max-w-[80%] text-sm shadow ${msg.sender === 'admin' ? 'bg-green-500 text-white' : msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'} flex items-center space-x-2`}>
                            <span>{msg.message}</span>
                          </div>
                        </div>
                      ))}
                      <div ref={chatEndRef} />
                    </div>
                    <form onSubmit={handleAdminSend} className="flex items-center p-4 border-t bg-white">
                      <input
                        type="text"
                        value={adminInput}
                        onChange={e => setAdminInput(e.target.value)}
                        placeholder="Javob yozing..."
                        className="flex-1 px-3 py-2 rounded-lg border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
                        disabled={chatLoading}
                      />
                      <button
                        type="submit"
                        className="ml-2 p-2 rounded-full bg-green-500 text-white hover:bg-green-600 disabled:opacity-50"
                        disabled={chatLoading || !adminInput.trim()}
                        title="Yuborish"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-gray-400">Foydalanuvchini tanlang</div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}