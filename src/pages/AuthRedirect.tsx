import { signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Login from './Login';

export default function AuthRedirect() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isFromMobile, setisFromMobile] = useState(sessionStorage.getItem('fromMobile'));


  useEffect(() => {
    setLoading(true);
    const rawEmail = searchParams.get('email');
    const rawPassword = searchParams.get('password');
    const fromMobile = searchParams.get('fromMobile') === 'true';
    const decodedEmail = rawEmail ? decodeURIComponent(rawEmail) : null;
    const decodedPassword = rawPassword ? decodeURIComponent(rawPassword) : null;
    const isFromMobile = sessionStorage.getItem('fromMobile');
    setisFromMobile(sessionStorage.getItem('fromMobile'));
    const rnWebView = (window as any).ReactNativeWebView;

    if (fromMobile) {
      sessionStorage.setItem('fromMobile', 'true');
    }


    const authenticateWithEmailPassword = async () => {
      if (!decodedEmail || !decodedPassword) {
        if (isFromMobile && rnWebView?.postMessage) {
          rnWebView.postMessage("erro-login");
        }
        setLoading(false);
        return;
      }

      try {
        console.log('🔐 Tentando autenticar com email e senha...');
        await signInWithEmailAndPassword(auth, decodedEmail, decodedPassword);
        console.log('✅ Autenticado com sucesso, redirecionando...');
        setTimeout(() => navigate('/dashboard'), 3000);


      } catch (err: any) {
        console.error('❌ Erro ao autenticar:', err);
      } finally {
        setTimeout(() => setLoading(false), 3000);
      }
    };

    authenticateWithEmailPassword();
  }, [searchParams, isFromMobile, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 text-green-900 animate-fade-in">
        <div className="text-6xl mb-4 animate-bounce">🌾</div>
        <p className="text-xl font-bold mb-2">FIAP Farms</p>
        <p className="text-md">Carregando<span className="animate-pulse">...</span></p>
        <style>{`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-bounce {
            animation: bounce 2s infinite;
          }
          .animate-pulse {
            animation: pulse 1.5s infinite;
          }
          @keyframes pulse {
            0%, 100% { opacity: 1 }
            50% { opacity: 0.3 }
          }
          .animate-fade-in {
            animation: fade-in 0.8s ease-in-out;
          }
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}</style>
      </div>
    );
  }
  if (!isFromMobile) {
    return (
      <Login />
    );
  } else {
    null
  }

}
