# Quiz Sheets Vercel

Aplicação de perguntas e respostas com Next.js, Google Sheets e Google Apps Script.

## Recursos
- Quiz sem login
- Cadastro/login opcional
- Painel administrativo
- CRUD de perguntas
- Resultados
- Google Sheets como banco simples

## Configuração
1. Crie uma planilha Google com abas `PERGUNTAS`, `USUARIOS` e `RESULTADOS`.
2. Abra Extensões > Apps Script e copie `apps-script/Code.gs`.
3. Informe o ID da planilha e um segredo administrativo no `CONFIG`.
4. Publique como Web App, executando como você e permitindo acesso a qualquer pessoa.
5. Na Vercel, configure `GOOGLE_APPS_SCRIPT_URL` e `ADMIN_SECRET`.
6. Rode `npm install` e `npm run dev`.

> Para produção com muitos usuários, use um provedor de autenticação dedicado em vez de Sheets para autenticação.
