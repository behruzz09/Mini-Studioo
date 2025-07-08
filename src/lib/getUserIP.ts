export async function getUserIP(): Promise<string> {
  const res = await fetch('https://api.ipify.org?format=json');
  if (!res.ok) throw new Error('IP manzilni olishda xatolik');
  const data = await res.json();
  return data.ip;
} 