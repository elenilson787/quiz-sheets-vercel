const API_URL = process.env.GOOGLE_APPS_SCRIPT_URL;

export async function appsScript<T>(
  action: string,
  payload: Record<string, unknown> = {}
) {
  if (!API_URL) {
    throw new Error('GOOGLE_APPS_SCRIPT_URL não configurada.');
  }

  const r = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ action, ...payload }),
    cache: 'no-store',
  });

  if (!r.ok) {
    throw new Error(`Apps Script HTTP ${r.status}`);
  }

  const d = await r.json();

  if (!d.ok) {
    throw new Error(d.error || 'Erro na API.');
  }

  return d.data as T;
}
