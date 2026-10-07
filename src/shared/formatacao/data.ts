export function formatarHora(criadoEm: string) {
  const data = new Date(criadoEm);
  const hora = String(data.getHours()).padStart(2, '0');
  const minuto = String(data.getMinutes()).padStart(2, '0');

  return `${hora}:${minuto}`;
}

export function formatarDataHora(criadoEm: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(new Date(criadoEm));
}
