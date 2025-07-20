// src/App.tsx
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import PrivateLayout from './components/PrivateLayout';
import Settings from './pages/Configurations';
import AuthPage from './components/RedirectWithToken';
import RedirectWithToken from './components/RedirectWithToken';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RedirectWithToken />} />
      <Route path="/login" element={<Login />} />
      <Route path="/auth" element={<AuthPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <PrivateLayout>
              <Dashboard />
            </PrivateLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <PrivateLayout>
              <Profile />
            </PrivateLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <PrivateLayout>
              <Settings />
            </PrivateLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
