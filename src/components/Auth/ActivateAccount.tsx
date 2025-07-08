import React, { useState } from 'react';

export default function ActivateAccount() {
  const [login] = useState('1307983617'); // Demo login, prop yoki contextdan olish mumkin
  const [password, setPassword] = useState('password'); // Demo parol, prop yoki contextdan olish mumkin
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(login);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen bg-purple-100 flex flex-col items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-center text-lg font-bold text-purple-700 mb-2">AKKAUNTINGIZNI FAOLLASHTIRING</h2>
        <p className="text-center text-gray-700 mb-4 text-sm">
          Sizning Email ga saytimizning aktivatsiya sahifasiga olib o‘tadigan haolali xat yuborildi. Iltimos 72 soat mobaynida tasdiqlang.<br />
          <span className="font-semibold text-black">Agar siz xat olmagan bo‘lsangiz, "Spam" papkasini tekshiring</span>
        </p>
        <div className="mb-3">
          <label className="block text-gray-600 mb-1 text-sm">Sizning login</label>
          <div className="flex items-center border rounded px-2 bg-gray-50">
            <input value={login} readOnly className="flex-1 py-2 outline-none bg-transparent text-base" />
            <button
              onClick={handleCopy}
              className="text-purple-600 px-2 text-lg"
              title="Nusxalash"
            >
              {copied ? '✅' : '📋'}
            </button>
          </div>
        </div>
        <div className="mb-3">
          <label className="block text-gray-600 mb-1 text-sm">Parolingiz</label>
          <div className="flex items-center border rounded px-2 bg-gray-50">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="flex-1 py-2 outline-none bg-transparent text-base"
            />
            <button
              onClick={() => setShowPassword(v => !v)}
              className="text-purple-600 px-2 text-lg"
              title="Ko‘rsatish/Berkitish"
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>
        <button className="w-full bg-yellow-400 text-black font-bold py-2 rounded my-2 text-base">KIRISH</button>
        <button className="w-full bg-gray-200 text-gray-700 font-bold py-2 rounded my-2 text-base">BOSH BETGA O‘TISH</button>
        <div className="text-center text-xs text-gray-500 mb-2">Login va parolingizni saqlashni unutmang</div>
        <button className="w-full bg-purple-600 text-white font-bold py-2 rounded text-base">LOGIN VA PAROLNI SAQLASH</button>
      </div>
    </div>
  );
} 