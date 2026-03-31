import React from 'react';
import { Users, Briefcase, Star, MessageSquare } from 'lucide-react';

export default function VendorDashboard() {
  const leads = [
    { name: "Sanket's Living Room", style: "Modern Minimalist", budget: "₹50,000", match: "98%", status: "New" },
    { name: "Priya's Bedroom", style: "Bohemian Chic", budget: "₹25,000", match: "85%", status: "Contacted" }
  ];

  return (
    <div className="container py-12 animate-fade-in" style={{ padding: '48px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 className="heading-lg">Vendor Portal</h1>
          <p className="text-lg mt-2">Manage your leads and interior design projects.</p>
        </div>
        <button className="btn btn-primary">Edit Profile</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '48px' }}>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-muted)' }}>
            <Users size={20} /> Total Leads
          </div>
          <p className="heading-md mt-4 text-main">14</p>
        </div>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-muted)' }}>
            <Briefcase size={20} /> Active Projects
          </div>
          <p className="heading-md mt-4 text-main">3</p>
        </div>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-muted)' }}>
            <Star size={20} /> Average Rating
          </div>
          <p className="heading-md mt-4 text-main">4.8</p>
        </div>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-muted)' }}>
            <MessageSquare size={20} /> Messages
          </div>
          <p className="heading-md mt-4 text-main">5 New</p>
        </div>
      </div>

      <h2 className="heading-md" style={{ marginBottom: '24px' }}>New Design Leads in your Area</h2>
      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'rgba(255, 255, 255, 0.5)' }}>
              <th style={{ padding: '16px 24px', fontWeight: 600 }}>Project Name</th>
              <th style={{ padding: '16px 24px', fontWeight: 600 }}>Design Style</th>
              <th style={{ padding: '16px 24px', fontWeight: 600 }}>Budget (Est.)</th>
              <th style={{ padding: '16px 24px', fontWeight: 600 }}>Match Score</th>
              <th style={{ padding: '16px 24px', fontWeight: 600 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '16px 24px' }}>{l.name}</td>
                <td style={{ padding: '16px 24px' }}>{l.style}</td>
                <td style={{ padding: '16px 24px' }}>{l.budget}</td>
                <td style={{ padding: '16px 24px', color: 'var(--primary)', fontWeight: 600 }}>{l.match}</td>
                <td style={{ padding: '16px 24px' }}>
                  <button className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>
                    Send Quote
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
