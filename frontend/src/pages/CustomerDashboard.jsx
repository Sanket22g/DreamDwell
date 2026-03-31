import React, { useState } from 'react';
import { Upload, Wand2, ShoppingCart, Star, MapPin, CheckCircle2, Loader2 } from 'lucide-react';

export default function CustomerDashboard() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState('Modern Minimalist');

  const products = [
    { name: "Bouclé Lounge Chair", price: "₹24,999", img: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500", vendor: "Amazon" },
    { name: "Brass Floor Lamp", price: "₹5,499", img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500", vendor: "Flipkart" },
    { name: "Jute Area Rug", price: "₹8,999", img: "https://images.unsplash.com/photo-1620390169123-a5c8fc5eb82e?w=500", vendor: "Amazon" }
  ];

  const vendors = [
    { name: "Urban Edge Interiors", rating: 4.8, type: "Interior Designer", distance: "2 km away" },
    { name: "Sharma Carpentry Services", rating: 4.5, type: "Carpenter Fixes", distance: "5 km away" }
  ];

  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    setIsLoading(true);
    // If we had the real Gemini API key, we'd make the fetch call here!
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 2500);
  };

  return (
    <div className="container py-12 animate-fade-in" style={{ padding: '48px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 className="heading-lg">Welcome Back, Rohan!</h1>
          <p className="text-lg mt-2">Let's design your next dream space.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ width: '40px', height: '4px', background: step >= 1 ? 'var(--primary)' : 'var(--border-color)', borderRadius: '2px' }} />
          <div style={{ width: '40px', height: '4px', background: step >= 2 ? 'var(--primary)' : 'var(--border-color)', borderRadius: '2px' }} />
          <div style={{ width: '40px', height: '4px', background: step >= 3 ? 'var(--primary)' : 'var(--border-color)', borderRadius: '2px' }} />
        </div>
      </div>

      {step === 1 && (
        <div className="card text-center" style={{ padding: '64px 24px', borderStyle: uploadedImage ? 'solid' : 'dashed', borderWidth: '2px' }}>
          {isLoading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <Loader2 size={48} color="var(--primary)" className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
              <h2 className="heading-md mt-4">Gemini AI Analyzing Room...</h2>
              <p className="text-sm">Detecting dimensions, lighting, and layout possibilities.</p>
            </div>
          ) : uploadedImage ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
               <img src={uploadedImage} alt="Uploaded Room" style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '12px', objectFit: 'cover' }} />
               <div style={{ display: 'flex', gap: '16px' }}>
                 <button className="btn btn-secondary" onClick={() => setUploadedImage(null)}>Replace Image</button>
                 <button className="btn btn-primary" onClick={handleAnalyze}>
                   <Wand2 size={18} /> Generate Designs with Gemini
                 </button>
               </div>
            </div>
          ) : (
            <label style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
              <div style={{ margin: '0 auto', background: 'rgba(196, 101, 42, 0.1)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: '24px' }}>
                <Upload size={32} />
              </div>
              <h2 className="heading-md">Upload Room Photo</h2>
              <p className="text-sm mt-4" style={{ maxWidth: '400px', margin: '16px auto' }}>
                Select an image of your empty or current room. Gemini AI will analyze the dimensions and suggest the perfect fit.
              </p>
              <div className="btn btn-primary mt-8">Browse Files</div>
            </label>
          )}
        </div>
      )}

      {step === 2 && (
        <div className="animate-fade-in">
          <div className="glass-panel" style={{ padding: '32px', display: 'flex', gap: '48px', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80" alt="Generated Room" style={{ width: '100%', borderRadius: 'var(--radius-md)' }} />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'col', gap: '24px' }}>
               <h2 className="heading-md flex items-center gap-2"><Wand2 color="var(--primary)"/> AI Design Ready!</h2>
               <p className="text-lg">We detected a 12x14 ft space with good natural lighting. Here are 3 styles that fit your budget.</p>
               
               <div style={{ display: 'flex', gap: '16px', flexDirection: 'column', marginTop: '16px' }}>
                 {['Modern Minimalist', 'Bohemian Chic', 'Classic Luxury'].map(style => (
                   <div 
                    key={style}
                    onClick={() => setSelectedStyle(style)}
                    style={{ 
                      padding: '16px 24px', 
                      borderRadius: '8px', 
                      border: `1px solid ${selectedStyle === style ? 'var(--primary)' : 'var(--border-color)'}`,
                      background: selectedStyle === style ? 'rgba(196, 101, 42, 0.05)' : 'transparent',
                      cursor: 'pointer',
                      display: 'flex', justifyContent: 'space-between'
                    }}>
                     <span style={{ fontWeight: 600 }}>{style}</span>
                     {selectedStyle === style && <CheckCircle2 color="var(--primary)" size={20} />}
                   </div>
                 ))}
               </div>

               <button className="btn btn-primary mt-8" onClick={() => setStep(3)} style={{ width: '100%' }}>
                 View Products & Vendors
               </button>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
          
          <div className="flex flex-col gap-8">
            <h2 className="heading-md">Shop The Look - {selectedStyle}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              {products.map((p, i) => (
                <div key={i} className="card">
                  <img src={p.img} alt={p.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '16px' }}/>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ fontWeight: 600 }}>{p.name}</h4>
                      <p className="text-sm" style={{ color: 'var(--primary)', fontWeight: 600 }}>{p.price}</p>
                    </div>
                    <button className="btn btn-secondary" style={{ padding: '8px 12px', fontSize: '14px' }}>
                      <ShoppingCart size={16}/> Buy
                    </button>
                  </div>
                  <p className="text-sm mt-2">via {p.vendor}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="glass-panel" style={{ padding: '24px' }}>
              <h2 className="heading-md" style={{ fontSize: '1.25rem', marginBottom: '24px' }}>Local Vendor Matches</h2>
              <p className="text-sm" style={{ marginBottom: '24px' }}>Based on your pin code (110001), here are the best professionals to execute this design.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {vendors.map((v, i) => (
                  <div key={i} style={{ padding: '16px', background: 'var(--bg-color)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <h4 style={{ fontWeight: 600 }}>{v.name}</h4>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#F59E0B', fontSize: '14px', fontWeight: 600 }}>
                        <Star size={14} fill="#F59E0B"/> {v.rating}
                      </span>
                    </div>
                    <p className="text-sm mt-1">{v.type}</p>
                    <p className="text-sm mt-2 flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                      <MapPin size={14}/> {v.distance}
                    </p>
                    <button className="btn btn-secondary mt-4" style={{ width: '100%', padding: '8px' }}>Request Quote</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
