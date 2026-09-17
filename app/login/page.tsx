'use client';

import {FormEvent,useState} from 'react';

export default function Login(){
  const [m,setM]=useState('');
  const [loading,setLoading]=useState(false);

  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    setM('');
    setLoading(true);
    try{
      const f=new FormData(e.currentTarget);
      const r=await fetch('/api/auth/login',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({email:String(f.get('email')||''),senha:String(f.get('senha')||'')})
      });
      const d=await r.json().catch(()=>({ok:false,error:'Resposta inválida do servidor.'}));
      if(!r.ok||!d.ok){
        setM(d.error||'E-mail ou senha incorretos.');
        return;
      }
      localStorage.setItem('quiz_user',JSON.stringify(d.data.user));
      window.location.href='/quiz';
    }catch(err){
      setM(err instanceof Error?err.message:'Não foi possível entrar. Tente novamente.');
    }finally{
      setLoading(false);
    }
  }

  return <main className="min-h-screen grid place-items-center p-6">
    <form onSubmit={submit} className="bg-white shadow rounded-2xl p-6 w-full max-w-md space-y-4">
      <h1 className="text-2xl font-bold">Entrar</h1>
      <input name="email" type="email" required placeholder="E-mail" className="w-full border rounded-xl p-3"/>
      <input name="senha" type="password" required placeholder="Senha (mín. 6)" className="w-full border rounded-xl p-3"/>
      <button disabled={loading} className="w-full bg-blue-700 disabled:bg-slate-400 text-white rounded-xl p-3 font-semibold">
        {loading?'Entrando...':'Entrar'}
      </button>
      {m&&<p className="text-red-600 text-sm">{m}</p>}
      <a href="/quiz" className="block text-center text-sm text-slate-500">Continuar sem conta</a>
    </form>
  </main>
}