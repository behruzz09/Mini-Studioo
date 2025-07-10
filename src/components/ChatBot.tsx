import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Send, Bot } from 'lucide-react';

const LANGUAGES = [
  { code: 'uz', label: 'O\'zbekcha' },
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
] as const;

type LanguageCode = typeof LANGUAGES[number]['code'];

const EXAMPLES = [
  { uz: 'Qaysi merchni tavsiya qilasiz?', en: 'Which merch do you recommend?', ru: 'Какой мерч вы порекомендуете?' },
  { uz: 'Qora fon yaxshi bo\'ladimi?', en: 'Is a black background good?', ru: 'Черный фон подойдет?' },
  { uz: 'Logo uchun zamonaviy uslub bormi?', en: 'Any modern style for logo?', ru: 'Есть ли современный стиль для логотипа?' },
];

export default function ChatBot() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: t('Salom! Men sizga dizayn va merch bo\'yicha yordam bera olaman. Savolingizni yozing!') }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState<LanguageCode>(i18n.language as LanguageCode || 'uz');
  const inputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { role: 'user', text: input }]);
    setLoading(true);
    setInput('');
    // Simulyatsiya qilingan AI javobi (real API bilan almashtirish mumkin)
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        { role: 'bot', text: t('Bu savolingizga AI yordamchi javobi (demo).') }
      ]);
      setLoading(false);
    }, 1200);
  };

  return (
    <>
      {/* Chatbot tugmasi */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-blue-500 to-purple-500 text-white p-4 rounded-full shadow-lg hover:scale-105 transition-all flex items-center"
        title={t('AI yordamchi')}
      >
        <Bot className="w-6 h-6 mr-2" />
        <span className="font-semibold hidden md:inline">AI</span>
      </button>
      {/* Modal/Sidebar */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-end md:items-center md:justify-end">
          <div className="w-full md:w-[400px] h-[70vh] md:h-[80vh] bg-white rounded-t-2xl md:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fadeInUp">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5 text-blue-500" />
                <span className="font-bold text-lg">AI ChatBot</span>
              </div>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            {/* Language select */}
            <div className="flex space-x-2 p-2 border-b bg-gray-50">
              {LANGUAGES.map(l => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`px-2 py-1 rounded text-xs font-medium ${lang === l.code ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                  {l.label}
                </button>
              ))}
            </div>
            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gradient-to-br from-white via-blue-50 to-purple-50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`px-3 py-2 rounded-lg max-w-[80%] text-sm shadow ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
                    {msg.text}
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
            {/* Input */}
            <form
              className="flex items-center p-3 border-t bg-white"
              onSubmit={e => { e.preventDefault(); handleSend(); }}
            >
              <input
                ref={inputRef}
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
            {/* Example questions */}
            <div className="p-2 bg-gray-50 border-t text-xs text-gray-500 flex flex-wrap gap-2">
              {EXAMPLES.map((ex, i) => (
                <button
                  key={i}
                  className="px-2 py-1 rounded bg-white border hover:bg-blue-50"
                  onClick={() => setInput(ex[lang])}
                >
                  {ex[lang]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
} 