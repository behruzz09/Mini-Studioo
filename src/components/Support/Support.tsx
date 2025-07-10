import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Send, Bot, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

export function Support() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Chatni Supabase’dan olish
  useEffect(() => {
    if (!user) return;
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('support_tickets')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });
      if (!error) setMessages(data || []);
    };
    fetchMessages();
    // Real-time update (optional)
    const channel = supabase
      .channel('support_tickets')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'support_tickets' }, fetchMessages)
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    // Foydalanuvchi xabarini Supabase’ga yozish
    const { error } = await supabase.from('support_tickets').insert([
      { user_id: user.id, email: user.email, message: input, status: 'open', sender: 'user' }
    ]);
    if (error) {
      toast.error('Xabar yuborilmadi');
      setLoading(false);
      return;
    }
    setInput('');
    // Demo AI javobi (real API bilan almashtirish mumkin)
    setTimeout(async () => {
      await supabase.from('support_tickets').insert([
        { user_id: user.id, email: user.email, message: t('Bu savolingizga AI yordamchi javobi (demo).'), status: 'open', sender: 'bot' }
      ]);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg flex flex-col h-[70vh]">
        <div className="p-6 border-b text-xl font-bold text-gray-900 flex items-center space-x-2">
          <Bot className="w-6 h-6 text-blue-500" />
          <span>{t('Yordam markazi (Chat)')}</span>
            </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gradient-to-br from-white via-blue-50 to-purple-50">
          {messages.map((msg, i) => (
            <div key={msg.id || i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`px-3 py-2 rounded-lg max-w-[80%] text-sm shadow ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'} flex items-center space-x-2`}>
                {msg.sender === 'bot' && <Bot className="w-4 h-4 text-blue-400" />}
                {msg.sender === 'user' && <User className="w-4 h-4 text-blue-100" />}
                <span>{msg.message}</span>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="px-3 py-2 rounded-lg bg-gray-100 text-gray-500 text-sm animate-pulse">{t('Yuklanmoqda...')}</div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        <form onSubmit={handleSend} className="flex items-center p-4 border-t bg-white">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={t('Savolingizni yozing...')}
            className="flex-1 px-3 py-2 rounded-lg border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
            disabled={loading}
          />
          <button
            type="submit"
            className="ml-2 p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
            disabled={loading || !input.trim()}
            title={t('Yuborish')}
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}