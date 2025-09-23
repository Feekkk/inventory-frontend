import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import Categories from './pages/Categories';
import Disposal from './pages/Disposal';
import DisposalForm from './pages/DisposalForm';
import ReturnItem from './pages/ReturnItem';
import History from './pages/History';
import Settings from './pages/Settings';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return children;
};

const AuthPage = () => {
  const { login } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = () => {
    login();
  };

  const handleRegister = () => {
    setShowRegister(false);
  };

  const switchToRegister = () => {
    setShowRegister(true);
  };

  const switchToLogin = () => {
    setShowRegister(false);
  };

  if (showRegister) {
    return (
      <Register 
        onRegister={handleRegister} 
        onSwitchToLogin={switchToLogin}
      />
    );
  }

  return (
    <Login 
      onLogin={handleLogin} 
      onSwitchToRegister={switchToRegister}
    />
  );
};

const AppContent = () => {
  return (
    <Router>
      <ProtectedRoute>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/add" element={<AddProduct />} />
            <Route path="/products/edit/:id" element={<EditProduct />} />
            <Route path="/disposal" element={<Disposal />} />
            <Route path="/disposal/form/:itemId" element={<DisposalForm />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/return" element={<ReturnItem />} />
            <Route path="/history" element={<History />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </ProtectedRoute>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
