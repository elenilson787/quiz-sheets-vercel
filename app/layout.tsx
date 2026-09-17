import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata={title:'Quiz Sheets',description:'Perguntas e respostas'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body>{children}</body></html>}