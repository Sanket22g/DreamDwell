import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Briefcase, ShieldAlert } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role) => {
    login(role);
    if (role === 'customer') navigate('/dashboard');
    if (role === 'vendor') navigate('/vendors');
    if (role === 'admin') navigate('/admin');
  };

  return (
    <div className="container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card text-center" style={{ maxWidth: '400px', width: '100%', padding: '48px 32px' }}>
        <h2 className="heading-md" style={{ marginBottom: '16px' }}>Prototype Login</h2>
        <p className="text-sm" style={{ marginBottom: '32px' }}>Select a role below to simulate the app experience with mock data.</p>
        
        <div className="flex flex-col gap-4">
          <button className="btn btn-secondary" onClick={() => handleLogin('customer')} style={{ display: 'flex', justifyContent: 'flex-start', padding: '16px' }}>
            <User style={{ color: 'var(--primary)' }}/> Login as Customer
          </button>
          <button className="btn btn-secondary" onClick={() => handleLogin('vendor')} style={{ display: 'flex', justifyContent: 'flex-start', padding: '16px' }}>
            <Briefcase style={{ color: 'var(--primary)' }}/> Login as Vendor
          </button>
          <button className="btn btn-secondary" onClick={() => handleLogin('admin')} style={{ display: 'flex', justifyContent: 'flex-start', padding: '16px' }}>
            <ShieldAlert style={{ color: 'var(--primary)' }}/> Login as Admin
          </button>
        </div>
      </div>
    </div>
  );
}
