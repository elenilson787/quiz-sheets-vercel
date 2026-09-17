import { NextResponse } from 'next/server';
import { appsScript } from '@/lib/api';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body?.email || !body?.senha) {
      return NextResponse.json(
        { ok: false, error: 'Informe e-mail e senha.' },
        { status: 400 }
      );
    }

    const data = await appsScript<{
      user?: { id: string; nome: string; email: string };
    }>('login', {
      email: String(body.email).trim().toLowerCase(),
      senha: String(body.senha),
    });

    if (!data || !data.user) {
      return NextResponse.json(
        {
          ok: false,
          error:
            'O Apps Script respondeu sem os dados do usuário. Verifique a implantação do Web App no Apps Script.',
          debug: { receivedData: data ?? null },
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, data });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);

    return NextResponse.json(
      { ok: false, error: message },
      { status: 400 }
    );
  }
}
