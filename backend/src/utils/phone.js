/**
 * Utilitários de telefone
 * Padrão interno: 5511999999999 (só dígitos, com código de país)
 */

/**
 * Normaliza qualquer formato de número para o padrão interno
 * Aceita: +55 11 9999-9999, 5511999999999, 11999999999, 5511999999999@s.whatsapp.net
 */
export function normalizePhone(raw) {
  if (!raw) return '';

  // Remove o sufixo do WhatsApp
  let phone = raw.replace(/@s\.whatsapp\.net$/, '').replace(/@.*$/, '');

  // Remove tudo que não é dígito
  phone = phone.replace(/\D/g, '');

  // Se começa com 0 (ligação local), remove
  if (phone.startsWith('0')) phone = phone.slice(1);

  // Adiciona código do Brasil se necessário (número sem DDI)
  // <= 11 dígitos = sem DDI
  if (phone.length <= 11 && !phone.startsWith('55')) {
    phone = '55' + phone;
  }

  return phone;
}

/**
 * Formata para exibição: +55 (11) 99999-9999
 */
export function formatPhoneDisplay(phone) {
  const p = normalizePhone(phone);
  if (!p || p.length < 12) return phone;
  // Ex: 5511999999999 → +55 (11) 99999-9999
  const country = p.slice(0, 2);   // 55
  const ddd = p.slice(2, 4);       // 11
  const rest = p.slice(4);         // 999999999
  const part1 = rest.length === 9 ? rest.slice(0, 5) : rest.slice(0, 4);
  const part2 = rest.slice(part1.length);
  return `+${country} (${ddd}) ${part1}-${part2}`;
}

/**
 * Verifica se é um JID de grupo (ignora grupos)
 */
export function isGroupJid(jid) {
  return jid?.includes('@g.us') || jid?.includes('@broadcast');
}

/**
 * Extrai apenas o número puro do JID do WhatsApp
 */
export function jidToPhone(jid) {
  return normalizePhone(jid);
}
