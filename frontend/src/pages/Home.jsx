import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Image as ImageIcon, MapPin } from 'lucide-react';

export default function Home() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="container gap-12" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '80vh', alignItems: 'center', padding: '64px 24px' }}>
        <div className="flex flex-col gap-6">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(196, 101, 42, 0.1)', borderRadius: '999px', color: 'var(--primary)', fontWeight: 600, fontSize: '0.875rem', width: 'max-content' }}>
            <Sparkles size={16} /> AI-Powered Interior Design
          </div>
          <h1 className="heading-xl">DreamDwell: <span style={{ fontStyle: 'italic', color: 'var(--primary)' }}>Live the Space You Imagine</span></h1>
          <p className="text-lg mt-4" style={{ maxWidth: '480px' }}>
            Upload a photo of your room and let our AI generate stunning interior concepts. Connect with local vendors and buy decor right away.
          </p>
          <div className="flex gap-4 mt-8">
            <Link to="/dashboard" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.125rem' }}>
              Start Designing <ArrowRight size={20} />
            </Link>
            <button className="btn btn-secondary" style={{ padding: '16px 32px', fontSize: '1.125rem' }}>
              Explore Templates
            </button>
          </div>
        </div>
        
        {/* Placeholder for Her Image / 3D element */}
        <div className="glass-panel animate-float" style={{ height: '600px', width: '100%', position: 'relative', overflow: 'hidden', background: "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80') center/cover" }}>
          <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px' }} className="glass-panel">
            <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div>
                 <p style={{ fontWeight: 600, color: '#fff' }}>Modern Minimalist Living Room</p>
                 <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)' }}>AI Generated Concept</p>
               </div>
               <button className="btn btn-accent" style={{ padding: '8px 16px', borderRadius: '8px' }}>View Items</button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section style={{ background: 'var(--surface)', padding: '96px 0', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-lg">How DreamDwell Works</h2>
            <p className="text-lg mt-4 w-full">From empty room to move-in ready in days, not months.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
            <div className="card text-center flex-col items-center">
              <div style={{ background: 'var(--bg-color)', padding: '20px', borderRadius: '50%', color: 'var(--primary)', marginBottom: '24px' }}>
                <ImageIcon size={32} />
              </div>
              <h3 className="heading-md">1. Upload Room</h3>
              <p className="text-sm mt-4">Snap a picture of your space. Our AI analyzes the dimensions, lighting, and layout possibilities.</p>
            </div>
            
            <div className="card text-center flex-col items-center">
              <div style={{ background: 'var(--bg-color)', padding: '20px', borderRadius: '50%', color: 'var(--primary)', marginBottom: '24px' }}>
                <Sparkles size={32} />
              </div>
              <h3 className="heading-md">2. AI Design</h3>
              <p className="text-sm mt-4">Choose a style preference (Modern, Boho, Luxury) and receive tailored 3D renders of your future room.</p>
            </div>
            
            <div className="card text-center flex-col items-center">
              <div style={{ background: 'var(--bg-color)', padding: '20px', borderRadius: '50%', color: 'var(--primary)', marginBottom: '24px' }}>
                <MapPin size={32} />
              </div>
              <h3 className="heading-md">3. Connect & Build</h3>
              <p className="text-sm mt-4">Buy the exact furniture pieces from Amazon, and hire matched local carpenters and painters.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
