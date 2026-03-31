import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, User, LogOut, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{ 
      padding: '20px 40px', 
      borderBottom: '1px solid var(--border-color)', 
      background: 'rgba(250, 247, 242, 0.8)',
      backdropFilter: 'blur(12px)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Sparkles size={28} color="var(--primary)" />
        <span style={{ 
          fontFamily: "'Playfair Display', serif", 
          fontSize: '24px', 
          fontWeight: 700, 
          letterSpacing: '-0.5px' 
        }}>Dream<span style={{ color: 'var(--primary)' }}>Dwell</span></span>
      </Link>
      
      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        <Link to="/" className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>Home</Link>
        {user?.role === 'customer' && <Link to="/dashboard" className="text-sm font-medium">My Dashboard</Link>}
        {user?.role === 'vendor' && <Link to="/vendors" className="text-sm font-medium">Vendor Portal</Link>}
        {user?.role === 'admin' && <Link to="/admin" className="text-sm font-medium">Admin Panel</Link>}
      </div>

      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        {user ? (
          <>
            <span className="text-sm" style={{ fontWeight: 600 }}>Hi, {user.name}</span>
            <button className="btn btn-secondary" onClick={handleLogout} style={{ padding: '8px 16px' }}>
              <LogOut size={16} /> Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="btn btn-primary" style={{ padding: '8px 24px' }}>
            <LogIn size={18} /> Prototype Login
          </Link>
        )}
      </div>
    </nav>
  );
}
