import { signInWithEmailAndPassword } from 'firebase/auth';
import { type FormEvent, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function Login() {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError('Credenciais inválidas');
    }
  };

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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form onSubmit={handleSubmit} className="bg-background p-6 rounded shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full p-2 border rounded mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  } else {
    null
  }

}
