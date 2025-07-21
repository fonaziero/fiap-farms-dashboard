// Login.tsx
import { useEffect, useRef, useState } from 'react';


export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [localEmail, setLocalEmail] = useState('');
  const [localPassword, setLocalPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const bird1 = useRef<HTMLImageElement>(null);
  const bird2 = useRef<HTMLImageElement>(null);
  const bird3 = useRef<HTMLImageElement>(null);
  const cloud1 = useRef<HTMLImageElement>(null);
  const cloud2 = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const animate = (element: HTMLImageElement | null, distance: number, duration: number, reverse = false) => {
      if (!element) return;
      const keyframes = reverse
        ? [{ transform: `translateX(${distance}px) rotateY(180deg)` }, { transform: `translateX(-200px) rotateY(180deg)` }]
        : [{ transform: `translateX(-200px) ` }, { transform: `translateX(${distance}px)` }];
      element.animate(keyframes, {
        duration,
        iterations: Infinity,
        easing: 'linear',
      });
    };

    animate(bird1.current, window.innerWidth, 20000, true);
    animate(bird2.current, window.innerWidth, 20000, true);
    animate(bird3.current, window.innerWidth, 15000, false);
    animate(cloud1.current, window.innerWidth, 25000, true);
    animate(cloud2.current, window.innerWidth * 1.2, 30000, true);
  }, []);

  const handleInternalAuth = async () => {
    setLoading(true);
    setMessage('');

    try {
      const { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } = await import('firebase/auth');
      const { auth } = await import('../firebase');
      let userCredential;

      if (isRegister) {
        userCredential = await createUserWithEmailAndPassword(auth, localEmail, localPassword);
        if (userCredential.user && name) {
          await updateProfile(userCredential.user, { displayName: name });
        }
        setMessage('Cadastro realizado com sucesso!');
      } else {
        userCredential = await signInWithEmailAndPassword(auth, localEmail, localPassword);
        setMessage('Login realizado com sucesso!');
      }

      if (userCredential?.user) {
        sessionStorage.setItem('userCredentials', JSON.stringify({ email: localEmail, password: localPassword }));
        window.location.href = '/dashboard';
      }
    } catch (error: any) {
      console.error(error.code);
      switch (error.code) {
        case 'auth/invalid-email': setMessage('E-mail inválido.'); break;
        case 'auth/user-not-found': setMessage('Usuário não encontrado.'); break;
        case 'auth/wrong-password': setMessage('Senha incorreta.'); break;
        case 'auth/email-already-in-use': setMessage('Este e-mail já está em uso.'); break;
        case 'auth/weak-password': setMessage('A senha deve conter pelo menos 6 caracteres.'); break;
        default: setMessage('Erro inesperado: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat overflow-hidden" style={{ backgroundImage: "url('/images/bg-farm.png')" }}>
      <img ref={cloud1} src="/images/cloud.png" alt="Cloud 1" className="absolute top-24 left-[00vw] w-32 opacity-50 z-10" />
      <img ref={cloud2} src="/images/cloud.png" alt="Cloud 2" className="absolute top-40 left-[00vw] w-32 opacity-50 z-10" />

      <img ref={bird1} src="/images/bird.png" alt="Bird 1" className="absolute top-10 left-[0vw] w-12 z-20" />
      <img ref={bird2} src="/images/bird.png" alt="Bird 2" className="absolute top-20 left-[5vw] w-12 z-20" />
      <img ref={bird3} src="/images/bird.png" alt="Bird 3" className="absolute top-16 left-[-200px] w-12 z-20" />


      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md z-30">
        <h2 className="text-center text-3xl font-bold text-green-700 mb-6">🌾 FIAP Farms</h2>

        {isRegister && (
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded mb-3"
          />
        )}
        <input
          type="email"
          placeholder="E-mail"
          value={localEmail}
          onChange={(e) => setLocalEmail(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />
        <input
          type="password"
          placeholder="Senha"
          value={localPassword}
          onChange={(e) => setLocalPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <button
          onClick={handleInternalAuth}
          disabled={loading}
          className="bg-green-700 text-white py-2 px-4 rounded w-full hover:bg-green-800"
        >
          {isRegister ? 'Cadastrar' : 'Entrar'}
        </button>

        {message && <p className="text-red-600 text-center mt-2">{message}</p>}

        <div className="flex justify-center items-center mt-4 gap-2">
          <span className="text-sm">
            {isRegister ? 'Já tem conta?' : 'Novo aqui?'}
          </span>
          <button
            className="text-blue-500 underline text-sm"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? 'Entrar' : 'Cadastre-se'}
          </button>
        </div>
      </div>
    </div>
  );
}
