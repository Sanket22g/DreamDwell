import React from 'react';
import { Users, Briefcase, IndianRupee, Activity, CheckCircle, XCircle } from 'lucide-react';

export default function AdminDashboard() {
  const pendingVendors = [
    { name: "Sinha Woodworks", type: "Carpenter Fixes", rating: "New", action: "Review" },
    { name: "Royale Designers", type: "Interior Designer", rating: "New", action: "Review" }
  ];

  return (
    <div className="container py-12 animate-fade-in" style={{ padding: '48px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 className="heading-lg">Platform Admin</h1>
          <p className="text-lg mt-2">Monitor DreamDwell activity and approve vendors.</p>
        </div>
        <button className="btn btn-primary bg-main">Download Report</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '48px' }}>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-muted)' }}>
            <Users size={20} /> Total Users
          </div>
          <p className="heading-md mt-4 text-main">1,204</p>
        </div>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-muted)' }}>
            <Briefcase size={20} /> Active Vendors
          </div>
          <p className="heading-md mt-4 text-main">48</p>
        </div>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-muted)' }}>
            <Activity size={20} /> Designs Generated
          </div>
          <p className="heading-md mt-4 text-main">342</p>
        </div>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-muted)' }}>
            <IndianRupee size={20} /> E-com Sales Value
          </div>
          <p className="heading-md mt-4 text-main">₹4.2L</p>
        </div>
      </div>

      <h2 className="heading-md" style={{ marginBottom: '24px' }}>Pending Vendor Approvals</h2>
      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'rgba(255, 255, 255, 0.5)' }}>
              <th style={{ padding: '16px 24px', fontWeight: 600 }}>Vendor Name</th>
              <th style={{ padding: '16px 24px', fontWeight: 600 }}>Category</th>
              <th style={{ padding: '16px 24px', fontWeight: 600 }}>Status</th>
              <th style={{ padding: '16px 24px', fontWeight: 600 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingVendors.map((v, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '16px 24px', fontWeight: 500 }}>{v.name}</td>
                <td style={{ padding: '16px 24px' }}>{v.type}</td>
                <td style={{ padding: '16px 24px', color: '#F59E0B' }}>Pending Review</td>
                <td style={{ padding: '16px 24px', display: 'flex', gap: '8px' }}>
                  <button className="btn btn-secondary" style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '4px', borderColor: 'green', color: 'green' }}>
                    <CheckCircle size={14}/> Approve
                  </button>
                  <button className="btn btn-secondary" style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '4px', borderColor: 'red', color: 'red' }}>
                    <XCircle size={14}/> Reject
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
