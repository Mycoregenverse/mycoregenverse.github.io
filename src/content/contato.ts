/**
 * Contatos públicos do site, num lugar só.
 *
 * Antes cada página repetia o endereço à mão; trocar um e-mail exigia caçar
 * todas as cópias. Os mesmos valores também aparecem no index.html (dados
 * estruturados), em public/llms.txt e no README — ao mudar aqui, mudar lá.
 */
import type { Lang } from '@/i18n';

export const EMAILS = ['mycoregenverse@proton.me', 'mycoregenverse@gmail.com'] as const;

/** Conta Google que recebe os convites de agendamento. */
export const EMAIL_AGENDA = 'mycoregenverse@gmail.com';

export const REDES = {
  x: 'https://x.com/mycoregenverse',
  instagram: 'https://instagram.com/mycoregenverse',
  substack: 'https://mycoregenverse.substack.com',
} as const;

const CONVITE: Record<Lang, { titulo: string; detalhes: string }> = {
  pt: {
    titulo: 'Transmissão · Mycoregenverse',
    detalhes:
      'Primeira conversa com o Mycoregenverse.\n\n' +
      `Escolha o dia e o horário que funcionam para você e salve o evento: o convite chega para ${EMAIL_AGENDA} e a confirmação volta por e-mail.\n\n` +
      'Se puder, adicione uma videochamada do Google Meet antes de salvar.',
  },
  en: {
    titulo: 'Transmission · Mycoregenverse',
    detalhes:
      'A first conversation with Mycoregenverse.\n\n' +
      `Pick a day and time that work for you and save the event: the invitation goes to ${EMAIL_AGENDA} and the confirmation comes back by email.\n\n` +
      'If you can, add a Google Meet video call before saving.',
  },
};

/**
 * Abre o Google Agenda de quem clica com o evento já preenchido e com
 * mycoregenverse@gmail.com como convidado. Ao salvar, o Google envia o convite
 * para a conta da agenda — a call fica marcada nas duas pontas.
 */
export function linkAgenda(lang: Lang): string {
  const { titulo, detalhes } = CONVITE[lang];
  const q = new URLSearchParams({
    action: 'TEMPLATE',
    text: titulo,
    details: detalhes,
    add: EMAIL_AGENDA,
  });
  return `https://calendar.google.com/calendar/render?${q.toString()}`;
}
