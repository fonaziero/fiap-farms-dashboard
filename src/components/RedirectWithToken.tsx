// src/components/RedirectWithCredentials.tsx
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function RedirectWithCredentials() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const email = searchParams.get('email');
    const password = searchParams.get('password');

    if (email && password) {
      navigate(`/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
    } else {
      navigate('/login');
    }
  }, [navigate, searchParams]);

  return (
    <span>{window.location.href}</span>
  );
}
