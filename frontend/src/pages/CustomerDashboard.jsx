import React, { useState } from 'react';
import { Upload, Wand2, ShoppingCart, Star, MapPin, CheckCircle2, Loader2, Info } from 'lucide-react';

export default function CustomerDashboard() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [base64Data, setBase64Data] = useState(null);
  const [mimeType, setMimeType] = useState('image/jpeg');
  
  // Customization State
  const [selectedAdditions, setSelectedAdditions] = useState({
    Fan: false,
    Lighting: false,
    Sofa: false,
    Rug: false,
    WallArt: false,
    Plants: false
  });
  const [customRequest, setCustomRequest] = useState('');
  
  // Result State
  const [aiResult, setAiResult] = useState(null);

  const vendors = [
    { name: "Urban Edge Interiors", rating: 4.8, type: "Interior Designer", distance: "2 km away" },
    { name: "Sharma Carpentry Services", rating: 4.5, type: "Carpenter Fixes", distance: "5 km away" }
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMimeType(file.type);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        const base64 = reader.result.split(',')[1];
        setBase64Data(base64);
        setStep(2); // Move to customization step
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleAddition = (item) => {
    setSelectedAdditions(prev => ({ ...prev, [item]: !prev[item] }));
  };

  const handleAnalyze = async () => {
    setIsLoading(true);
    setStep(3); // Loading screen step
    
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const additions = Object.entries(selectedAdditions).filter(([_, v]) => v).map(([k]) => k).join(', ');
      
      const prompt = `You are a professional interior designer AI. 
      Analyze the provided room photo. 
      The user explicitly wants to add: ${additions || 'Basic decor'}. 
      ${customRequest ? 'User specifically requests: ' + customRequest : ''}
      
      Please return a pure JSON string (DO NOT wrap in markdown \`\`\`json) with exactly this structure:
      {
        "design_analysis": "A detailed 2-3 sentence analysis of current room and how to improve it incorporating the user's requested items.",
        "recommended_style": "Modern / Classic / Boho etc",
        "products": [
          { "name": "Item (e.g., Sleek Ceiling Fan)", "price": "₹4500", "reason": "Why it fits the room", "vendor": "Amazon" }
        ]
      }`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: prompt },
              { inlineData: { mimeType, data: base64Data } }
            ]
          }]
        })
      });

      const data = await response.json();
      const textResponse = data.candidates[0].content.parts[0].text;
      
      // Clean potential markdown from Gemini response
      let cleanJson = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      
      setAiResult(parsed);
      setStep(4); // Results step
    } catch (error) {
      console.error("Gemini API Error:", error);
      alert("Failed to analyze image. Please ensure your API key is correct and valid.");
      setStep(2);
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-12 animate-fade-in" style={{ padding: '48px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 className="heading-lg">Welcome Back, Rohan!</h1>
          <p className="text-lg mt-2">Let's design your next dream space.</p>
        </div>
      </div>

      {/* STEP 1: UPLOAD */}
      {step === 1 && (
        <div className="card text-center" style={{ padding: '64px 24px', borderStyle: 'dashed', borderWidth: '2px' }}>
          <label style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
            <div style={{ margin: '0 auto', background: 'rgba(196, 101, 42, 0.1)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: '24px' }}>
              <Upload size={32} />
            </div>
            <h2 className="heading-md">Upload Room Photo</h2>
            <p className="text-sm mt-4" style={{ maxWidth: '400px', margin: '16px auto' }}>
              Select an image of your empty or current room. Our AI will analyze the dimensions.
            </p>
            <div className="btn btn-primary mt-8">Browse Files</div>
          </label>
        </div>
      )}

      {/* STEP 2: CUSTOMIZE & PREVIEW */}
      {step === 2 && uploadedImage && (
        <div className="animate-fade-in">
          <h2 className="heading-md mb-6">Customize Your Design</h2>
          <div className="glass-panel" style={{ padding: '32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <img src={uploadedImage} alt="Uploaded Room" style={{ width: '100%', borderRadius: 'var(--radius-md)', objectFit: 'cover', maxHeight: '500px' }} />
              <button className="btn btn-secondary mt-4" onClick={() => { setUploadedImage(null); setStep(1); }} style={{ width: '100%' }}>Replace Image</button>
            </div>
            
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
               <h3 className="heading-md" style={{ fontSize: '1.25rem' }}>What do you want to add?</h3>
               <p className="text-sm">Select items you need suggestions for, such as a fan or lighting.</p>
               
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                 {Object.keys(selectedAdditions).map((item) => (
                   <div 
                    key={item}
                    onClick={() => toggleAddition(item)}
                    style={{ 
                      padding: '12px 16px', 
                      borderRadius: '8px', 
                      border: `1px solid ${selectedAdditions[item] ? 'var(--primary)' : 'var(--border-color)'}`,
                      background: selectedAdditions[item] ? 'rgba(196, 101, 42, 0.05)' : 'transparent',
                      cursor: 'pointer',
                      display: 'flex', justifyContent: 'space-between',
                      fontWeight: 500
                    }}>
                     <span>{item.replace(/([A-Z])/g, ' $1').trim()}</span>
                     {selectedAdditions[item] && <CheckCircle2 color="var(--primary)" size={18} />}
                   </div>
                 ))}
               </div>

               <div className="input-group mt-2">
                 <label>Any custom requests?</label>
                 <input type="text" className="input-field" placeholder="e.g. Please use a minimalistic blue theme" value={customRequest} onChange={(e) => setCustomRequest(e.target.value)} />
               </div>

               <button className="btn btn-accent mt-4" onClick={handleAnalyze} style={{ width: '100%', padding: '16px' }}>
                 <Wand2 size={20} /> Generate Designs with Gemini
               </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: LOADING SPINNER */}
      {step === 3 && (
        <div className="card text-center" style={{ padding: '64px 24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <Loader2 size={48} color="var(--primary)" className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
            <h2 className="heading-md mt-4">Gemini API Analyzing Your Room...</h2>
            <p className="text-sm">Calculating dimensions, styling, and fetching real product prices for your selections.</p>
          </div>
        </div>
      )}

      {/* STEP 4: AI RESULTS & SHOP */}
      {step === 4 && aiResult && (
        <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
          
          <div className="flex flex-col gap-8">
            <div className="glass-panel" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--primary)' }}>
                <Sparkles size={24} /> <h2 className="heading-md m-0">AI Design Analysis</h2>
              </div>
              <p className="text-md" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>{aiResult.design_analysis}</p>
              <div style={{ marginTop: '16px', display: 'inline-block', padding: '8px 16px', background: 'var(--text-main)', color: 'var(--bg-color)', borderRadius: '99px', fontSize: '0.875rem', fontWeight: 600 }}>
                Recommended Style: {aiResult.recommended_style}
              </div>
            </div>

            <h2 className="heading-md">Shop The Look - Your Handpicked Items</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
              {aiResult.products.map((p, i) => (
                <div key={i} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px' }}>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontWeight: 700, fontSize: '1.1rem' }}>{p.name}</h4>
                    <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{p.reason}</p>
                    <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>Found on: {p.vendor}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p className="heading-md" style={{ color: 'var(--primary)', marginBottom: '12px' }}>{p.price}</p>
                    <button className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '14px' }}>
                      <ShoppingCart size={16}/> View Product
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <img src={uploadedImage} alt="Reference" style={{ width: '100%', borderRadius: 'var(--radius-md)', objectFit: 'cover' }} />
            
            <div className="glass-panel" style={{ padding: '24px' }}>
              <h2 className="heading-md" style={{ fontSize: '1.25rem', marginBottom: '24px' }}>Local Vendor Matches</h2>
              <p className="text-sm" style={{ marginBottom: '24px' }}>Based on your pin code, here are professionals ready to execute this design setup.</p>
              
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

const Sparkles = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
);
