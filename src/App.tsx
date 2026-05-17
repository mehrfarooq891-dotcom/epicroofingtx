import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Shield, 
  Star, 
  Award, 
  ChevronDown, 
  Check, 
  FileText, 
  Code, 
  DollarSign, 
  CloudLightning, 
  Activity, 
  Play, 
  CheckCircle2, 
  Copy, 
  Sparkles,
  ExternalLink,
  Flame,
  Clock,
  CheckCircle,
  TrendingUp,
  Sliders,
  AlertTriangle
} from 'lucide-react';

// Static Data
const CITIES = [
  "Houston", "Katy", "Sugar Land", "Cypress", "The Woodlands", 
  "Pearland", "League City", "Spring", "Pasadena", "Conroe", "Kingwood", "Tomball"
];

const SERVICES = [
  { id: "shingle-roof-replacement", name: "Shingle Replacement", code: "/services/shingle-roof-replacement", fullTitle: "Premium Asphalt Shingle Replacement" },
  { id: "metal-roofing-installation", name: "Metal Roofing", code: "/services/metal-roofing-installation", fullTitle: "24-Gauge Standing Seam Metal Installation" },
  { id: "commercial-roof-coating", name: "Commercial Coating", code: "/services/commercial-roof-coating", fullTitle: "Silicon Flat Roof & TPO Coating Solutions" },
  { id: "hail-wind-storm-repair", name: "Hail & Wind Repair", code: "/services/hail-wind-storm-repair", fullTitle: "Hail Impact & Wind Damage Forensic Restoration" },
  { id: "emergency-tarping-leak-repair", name: "Emergency Tarping", code: "/services/emergency-tarping-leak-repair", fullTitle: "24/7 Immediate Emergency Tarping & Leak Repair" },
  { id: "roof-inspection-haag", name: "Certified Inspection", code: "/services/roof-inspection-haag", fullTitle: "HAAG Certified Damage Evaluation Reports" }
];

const PRESETS = [
  {
    title: "Cypress Storm Leak",
    city: "Cypress",
    material: "Asphalt Shingles",
    damageType: "Wind Shingle Tearoff",
    estimatedSqFt: 2800,
    details: "Severe windstorm blew off front slope shingles. Water is now dripping into the attic near the plumbing exhaust stacks. Roof is 12 years old."
  },
  {
    title: "Woodlands Standing Seam",
    city: "The Woodlands",
    material: "Premium Standing Seam Metal",
    damageType: "Hail Damage Assessment",
    estimatedSqFt: 3500,
    details: "Large golf-ball size hail struck our area. Seeing prominent dimple marks on the metal panel overlaps and scratched protective finishes. Worried about rust."
  },
  {
    title: "Katy Hurricane Uplift",
    city: "Katy",
    material: "Asphalt Shingles",
    damageType: "Emergency Storm Damage",
    estimatedSqFt: 2200,
    details: "Multiple tree branches fell on the rear gable, cracking the gutter system and tearing open the defensive membrane. Heavy rain is expected in 12 hours!"
  }
];

const CITY_DETAILS: Record<string, string> = {
  "Houston": "With coastal moisture, high heat, and sudden hurricane activity, Houston multi-family and flat roofs bear extreme heavy thermal expansions. Prompt coatings and storm stabilization are critical.",
  "Katy": "Known for severe spring hailstorms, Katy homes require maximum high-impact SBS modified shingles (Class 4 GAF ArmorShield) to ensure durable resistance and retain homeowner policy credits.",
  "Sugar Land": "Sugar Land HOAs enforce premium architectural styles with strict aesthetic uniformity. Standing seam metal or classic GAF Timberline shingles provide custom GAF Golden Pledge warranty coverage.",
  "Cypress": "High open-plain winds in Cypress cause common shingles degradation and edge tear-offs. Interlocking starter strips and hurricane nail grids are highly recommended for optimal wind defense.",
  "The Woodlands": "Woodlands properties are heavily shaded, keeping roofs damp and highly susceptible to moss, organic rot, and moisture degradation. Premium zinc-infused shingles or standing seam metal offer dynamic protection.",
  "Pearland": "Proximity to the Gulf stream exposes Pearland homes to microbursts and intense coastal salt breezes. Rust-resistant aluminum coatings or high-grade architectural installations prevent premature seal failure.",
  "League City": "Severe moisture and windward exposures across League City demand advanced HAAG-guided roofing certifications. Corrosion-resistant polymer underlayment is standard in our windstorm designs.",
  "Spring": "Rapid temperature shifts in the Spring area subject shingles to thermal shock, leading to nail pops and split flashings. Premium SBS-modified roofing formulas absorb these movements perfectly.",
  "Pasadena": "Commercial facilities and industrial structures in Pasadena utilize silicone re-coating systems to reflect 88% of solar heat, lowering overhead energy expenses and preventing expensive replacement tears.",
  "Conroe": "Conroe's heavily forested terrain poses severe tree fall hazards. Heavy-duty deck decking reinforcements and hail-resistant steel-core roofing prevent impact ruptures during sudden pine drops.",
  "Kingwood": "Forested canopies across Kingwood foster extensive debris accumulation, clog valleys, and advance water backing up under flashings. Deep-channel valley flashings and drip edges are required.",
  "Tomball": "Tomball suburban expansions require rapid, professional roofing turnarounds. Standard GAF architectural shingles provide a 50-year non-prorated system, satisfying both rural and custom modern build demands."
};

export default function App() {
  // Navigation & Selected States
  const [selectedCity, setSelectedCity] = useState("Katy");
  const [selectedService, setSelectedService] = useState("shingle-roof-replacement");
  const [copiedStatus, setCopiedStatus] = useState<string | null>(null);
  
  // Simulated Lead Gen Counters
  const [leadCounter, setLeadCounter] = useState(14);
  const [simulatedRevenue, setSimulatedRevenue] = useState(11590);
  const [simulatedCalls, setSimulatedCalls] = useState(3);
  
  // AI Assessment Form
  const [aiCity, setAiCity] = useState("Katy");
  const [aiMaterial, setAiMaterial] = useState("Asphalt Shingles");
  const [aiDamageType, setAiDamageType] = useState("Hail Damage Assessment");
  const [aiSqFt, setAiSqFt] = useState(2500);
  const [aiDetails, setAiDetails] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiReport, setAiReport] = useState<any>(null);
  const [aiLoadingMessage, setAiLoadingMessage] = useState("");

  // Material Estimator State
  const [sqFt, setSqFt] = useState(2400);
  const [roofMaterial, setRoofMaterial] = useState("Shingles");

  // Code Explorer Active Tab
  const [activeCodeTab, setActiveCodeTab] = useState("css");

  // Mock call simulation function
  const triggerSimulatedCall = () => {
    setSimulatedCalls(prev => prev + 1);
    setLeadCounter(prev => prev + 1);
    const commission = Math.floor(Math.random() * 450) + 150;
    setSimulatedRevenue(prev => prev + commission);
    
    // Toast Alert Show
    alert(`📞 Incoming Ring Simulated [Epic Roofing TX]!\nLead captured from ${selectedCity} for ${SERVICES.find(s => s.id === selectedService)?.name}!\nSimulated Rank-and-Rent Fee: +$${commission} credited.`);
  };

  // Run Certified AI HAAG-Inspection Assessment
  const runAiAssessment = async () => {
    setAiLoading(true);
    setAiReport(null);
    
    const messages = [
      "Securing connection to GAF weather database...",
      "Querying historical Gulf coast storm indexes...",
      "Calculating wind shear & thermal contraction indexes...",
      "Assembling professional GAF storm claim guidelines...",
      "Finalizing HAAG-certified forensic analysis..."
    ];

    let msgIndex = 0;
    setAiLoadingMessage(messages[0]);
    
    const interval = setInterval(() => {
      msgIndex++;
      if (msgIndex < messages.length) {
        setAiLoadingMessage(messages[msgIndex]);
      }
    }, 1100);

    try {
      const response = await fetch("/api/analyze-roof", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          city: aiCity,
          material: aiMaterial,
          damageType: aiDamageType,
          estimatedSqFt: aiSqFt,
          details: aiDetails
        })
      });
      
      const data = await response.json();
      setAiReport(data);
    } catch (error) {
      console.error(error);
      alert("Error generating assessment. Please verify your GEMINI_API_KEY settings.");
    } finally {
      clearInterval(interval);
      setAiLoading(false);
    }
  };

  // Load Preset
  const handlePreset = (preset: typeof PRESETS[0]) => {
    setAiCity(preset.city);
    setAiMaterial(preset.material);
    setAiDamageType(preset.damageType);
    setAiSqFt(preset.estimatedSqFt);
    setAiDetails(preset.details);
  };

  // Code Copier
  const copyToClipboard = (sectionId: string, codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedStatus(sectionId);
    setTimeout(() => setCopiedStatus(null), 2500);
  };

  // Estimated values
  const getMaterialCostPerSquare = () => {
    switch(roofMaterial) {
      case "Shingles": return 440;
      case "Metal": return 950;
      case "Coating": return 320;
      case "Tile": return 1450;
      default: return 400;
    }
  };

  const getMaterialTax = () => {
    switch(roofMaterial) {
      case "Shingles": return "Lifetime GAF System";
      case "Metal": return "Ultra-Durable Standing Seam";
      case "Coating": return "Fluid Silicon Coating Block";
      case "Tile": return "Severe-Storm Spanish Slate";
      default: return "Warranty certified";
    }
  };

  const materialCost = Math.round((sqFt / 100) * getMaterialCostPerSquare());
  const installationCost = Math.round(materialCost * 0.82);
  const totalCost = materialCost + installationCost;

  const currentServiceObj = SERVICES.find(s => s.id === selectedService) || SERVICES[0];

  // Component Code Strings matching components.html
  const cssCodeString = `/* Epic Roofing TX Bento Grid Colors & Variables */
:root {
  --navy: #0F172A;
  --navy-light: #1E293B;
  --orange: #EA580C;
  --orange-hover: #C2410C;
  --white: #FFFFFF;
  --gray: #F8FAFC;
  --gray-border: #E2E8F0;
  --gray-text: #64748B;
  --dark: #020617;
  --f-display: 'Barlow', sans-serif;
  --f-body: 'Open Sans', sans-serif;
  --transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}`;

  const headerCodeString = `<header id="site-header">
  <div class="header-container">
    <a href="/" class="logo">EPIC ROOFING <span>TX</span></a>
    <nav class="desktop-nav">
      <!-- 6 Main Services Dropdown -->
      <!-- Wind/Hail storm Dropdown -->
      <!-- 12 Service Cities Dropdown -->
      <a href="/blog" class="nav-link">Local Blog</a>
    </nav>
    <a href="tel:8325550100" class="btn btn-primary">📞 (832) 555-0100</a>
  </div>
</header>`;

  const footerCodeString = `<footer>
  <div class="container">
    <div class="grid grid-4 footer-columns">
      <div>Logo & Tagline...</div>
      <div>Our 6 main pages list...</div>
      <div>12 Cities Service Area List...</div>
      <div>Contact Info: (832) 555-0100 / Houston, TX</div>
    </div>
  </div>
</footer>`;

  const schemaCodeString = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  "name": "Epic Roofing TX",
  "url": "https://epicroofingtx.com",
  "telephone": "(832) 555-0100",
  "email": "info@epicroofingtx.com",
  "areaServed": ["Houston", "Katy", "Sugar Land", "Cypress", "The Woodlands", "Pearland", "League City", "Spring", "Pasadena", "Conroe", "Kingwood", "Tomball"]
}
</script>`;

  return (
    <div className="min-h-screen bento-dashboard-bg text-slate-100 flex flex-col font-sans">
      
      {/* 24/7 Emergency Header Strip */}
      <div className="bg-orange text-white text-xs md:text-sm font-display font-extrabold uppercase py-2.5 px-4 flex justify-between items-center z-50 shadow-md border-b border-orange-hover tracking-wider">
        <div className="flex items-center gap-1.5 mx-auto md:mx-0">
          <Flame className="w-4.5 h-4.5 inline-block text-white animate-pulse" />
          <span>24/7 Hurricane & Hail Restoration: Katy, Cypress, The Woodlands & Houston and 9 more sub-markets!</span>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <a href="tel:8325550100" className="hover:underline flex items-center gap-1">
            <Phone className="w-3.5 h-3.5 inline text-white" />
            (832) 555-0100
          </a>
          <span className="bg-navy px-2.5 py-0.5 rounded text-[10px] font-bold text-orange">EPIC ROOFING TX</span>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 bg-navy/95 backdrop-blur-md border-b-3 border-orange shadow-xl z-40 transition-all">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-18 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-gradient-to-tr from-orange to-red-600 flex items-center justify-center font-display font-black text-white text-lg ring-2 ring-orange/30">
              ER
            </div>
            <div>
              <span className="font-display font-extrabold text-xl tracking-tight text-white block">
                EPIC ROOFING <span className="text-orange">TX</span>
              </span>
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase block -mt-1.5">
                Houston Rank & Rent Hub
              </span>
            </div>
          </div>
          
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-300">
            <span className="hover:text-orange cursor-pointer transition-colors">Services</span>
            <span className="hover:text-orange cursor-pointer transition-colors">Repairs</span>
            <span className="hover:text-orange cursor-pointer transition-colors">Materials</span>
            <span className="hover:text-orange cursor-pointer transition-colors">Cities</span>
            <a href="/components.html" target="_blank" className="text-orange hover:text-orange-hover transition-colors flex items-center gap-1 py-1 px-2.5 rounded bg-orange/10 border border-orange/25">
              <span>View components.html</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button 
              onClick={triggerSimulatedCall}
              className="bg-orange hover:bg-orange-hover text-white font-display font-extrabold text-xs md:text-sm py-2 px-4.5 rounded transition-transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 shadow-lg hover:shadow-orange/30 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Free Inspection: (832) 555-0100</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden roof-grid-accent border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16 text-center z-10 relative">
          <div className="inline-flex items-center gap-2 bg-navy/80 border border-orange/45 px-3.5 py-1.5 rounded-full text-xs font-bold text-orange mb-4 tracking-wider uppercase">
            <Sparkles className="w-4 h-4 inline animate-spin" />
            <span>SEO Lead-Generation Architecture & Local Components Repository</span>
          </div>
          <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-none uppercase mb-4 max-w-5xl mx-auto">
            HOUSTON METRO'S PREMIER <br />
            <span className="bg-gradient-to-r from-orange to-amber-500 bg-clip-text text-transparent">
              RANK-AND-RENT roofing MODULE
            </span>
          </h1>
          <p className="text-slate-300 max-w-3xl mx-auto text-base md:text-lg mb-8 leading-relaxed">
            Beautiful, high-converting GAF and HAAG certified website assets built on a solid 12-city target SEO grid. Use our interactive dashboard below to preview city-specific assets, estimate material pricing, run AI storm audits, and browse <strong>components.html</strong> components.
          </p>

          {/* Quick Stats Bento Line */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <div className="bg-navy/80 border border-slate-800 rounded-xl p-4 text-center hover:border-orange/20 transition-all">
              <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Target Metro Markets</span>
              <span className="block font-display text-2xl font-black text-white">12 TX Cities</span>
            </div>
            <div className="bg-navy/80 border border-slate-800 rounded-xl p-4 text-center hover:border-orange/20 transition-all">
              <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Active Phone Assets</span>
              <span className="block font-display text-2xl font-black text-orange flex items-center justify-center gap-1">
                <Phone className="w-4 h-4" /> (832) 555-0100
              </span>
            </div>
            <div className="bg-navy/80 border border-slate-800 rounded-xl p-4 text-center hover:border-orange/20 transition-all">
              <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Lead Count Capture</span>
              <span className="block font-display text-2xl font-black text-emerald-400">{leadCounter} Leads</span>
            </div>
            <div className="bg-navy/80 border border-slate-800 rounded-xl p-4 text-center hover:border-orange/20 transition-all">
              <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Est. Portfolio Rent</span>
              <span className="block font-display text-2xl font-black text-amber-500">${simulatedRevenue}</span>
            </div>
          </div>
        </div>
      </div>

      {/* CORE BENTO GRID AREA */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 flex-grow w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Bento Cell 1: SEO Page Selector & Live Mockup Previewer (LEFT, Span 5) */}
          <div className="lg:col-span-5 bg-navy/90 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl relative overflow-hidden flex flex-col h-full hover:border-slate-700 transition-colors">
            
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange" />
                <h2 className="font-display font-extrabold text-lg text-white uppercase tracking-tight">
                  Local SEO Generator
                </h2>
              </div>
              <span className="text-[10px] font-mono bg-slate-800 text-slate-300 py-1 px-2.5 rounded font-bold uppercase tracking-wider">
                Live Rendering
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-4">
              Toggle any of the 12 targeted Houston metro cities and 6 major services below to dynamically preview how our SEO framework instantly writes local headlines.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {/* City Selection dropdown */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1.5">
                  1. Target City
                </label>
                <div className="relative">
                  <select 
                    value={selectedCity} 
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs font-semibold rounded py-2 px-3 focus:outline-none focus:border-orange cursor-pointer appearance-none"
                  >
                    {CITIES.map(c => (
                      <option key={c} value={c}>{c}, TX</option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
                </div>
              </div>

              {/* Service Selection dropdown */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1.5">
                  2. Core Service
                </label>
                <div className="relative">
                  <select 
                    value={selectedService} 
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs font-semibold rounded py-2 px-3 focus:outline-none focus:border-orange cursor-pointer appearance-none"
                  >
                    {SERVICES.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Simulated Live Mobile View Device Frame */}
            <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 relative flex-grow flex flex-col shadow-inner">
              
              {/* Device Notch */}
              <div className="w-1/2 h-4 bg-slate-900 absolute top-0 left-1/4 rounded-b-lg border-b border-x border-slate-800 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-800 mr-2"></div>
                <div className="w-8 h-1 rounded bg-slate-800"></div>
              </div>

              {/* Mock Address Bar */}
              <div className="bg-slate-900 border border-slate-800/80 rounded px-2 py-1 mt-3 mb-4 flex items-center justify-between text-[10px] font-mono text-slate-400 overflow-hidden">
                <span className="truncate text-slate-500">https://epicroofingtx.com/cities/{selectedCity.toLowerCase().replace(" ", "-")}/{currentServiceObj.id}</span>
                <span className="text-orange">🔒</span>
              </div>

              {/* Inside Simulated Page */}
              <div className="bg-slate-900 rounded p-3 text-slate-100 flex-grow flex flex-col text-left text-xs">
                
                {/* Simulated Emergency strip */}
                <div className="bg-orange text-[8px] text-white font-bold uppercase text-center py-1 rounded-sm mb-2.5 scale-95 origin-center">
                  ⚠️ Emergency Storm Response Active in {selectedCity}!
                </div>

                {/* Simulated Main Heading H1 */}
                <h3 className="font-display font-black text-base text-white leading-tight mb-2.5 border-b border-slate-800 pb-2 uppercase">
                  #{selectedCity}’s Leading <br />
                  <span className="text-orange">{currentServiceObj.fullTitle}</span>
                </h3>

                {/* Simulated Meta Schema Data Box */}
                <div className="bg-slate-950 p-2 rounded border border-slate-800 text-[9px] text-slate-400 mb-3 font-mono leading-tight">
                  <span className="text-orange block font-bold mb-0.5">// SEO Metadata Rendered</span>
                  <span className="block"><strong className="text-slate-200">Meta Title:</strong> GAF {currentServiceObj.name} in {selectedCity} | Epic Roofing TX</span>
                  <span className="block"><strong className="text-slate-200">Local Area Served:</strong> {selectedCity}, Texas metro context</span>
                </div>

                {/* Localized Content Narrative dynamically changes */}
                <p className="text-slate-300 text-[10.5px] leading-relaxed mb-4">
                  {CITY_DETAILS[selectedCity]} Our local GAF certified crews represent the gold standard of restoration. We guarantee high-velocity wind seals certified up to 130 MPH, forensic hail impact digital mapping, and expert claim validation on residential {selectedCity} structures.
                </p>

                {/* Dynamic Call Trigger card */}
                <div className="mt-auto bg-slate-950 p-3 rounded-lg border border-orange/10 flex flex-col text-center">
                  <div className="text-[10px] text-slate-400 font-semibold mb-1">
                    [DYNAMIC RE-ROUTING PHONE HUB]
                  </div>
                  <div className="font-display font-bold text-emerald-400 text-sm tracking-wide mb-2">
                    📞 (832) 555-0100
                  </div>
                  <button 
                    onClick={triggerSimulatedCall}
                    className="bg-orange hover:bg-orange-hover text-white text-[10px] uppercase font-bold py-2 px-3 rounded cursor-pointer transition-transform hover:scale-103"
                  >
                    Simulate Call & Leads Track ⌲
                  </button>
                </div>

              </div>

            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Pre-wired Schema Invisible NAP loaded
              </span>
              <span className="font-bold text-slate-300">GEO LOCATED</span>
            </div>

          </div>

          {/* Bento Cell 2: AI Certified Roof Inspector & Forensic Storm Restoration Assessment Assistant (RIGHT, Span 7) */}
          <div className="lg:col-span-7 bg-navy/90 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl relative overflow-hidden h-full hover:border-slate-700 transition-colors flex flex-col">
            
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <CloudLightning className="w-5 h-5 text-orange animate-bounce" />
                <h2 className="font-display font-extrabold text-lg text-white uppercase tracking-tight">
                  Forensic AI Storm Restoration Assistant
                </h2>
              </div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-mono bg-orange/10 border border-orange/20 text-orange py-1 px-2.5 rounded font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Powered by Gemini</span>
              </div>
            </div>

            <div className="mb-4">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                Select Real-World Hail / Wind Damage Case Presets
              </span>
              <div className="flex flex-wrap gap-2.5">
                {PRESETS.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePreset(p)}
                    className="bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-orange text-slate-200 text-xs py-1.5 px-3 rounded transition-all cursor-pointer font-semibold flex items-center gap-1"
                  >
                    <Activity className="w-3 h-3 text-orange" />
                    <span>{p.title} ({p.city})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Form Controls inside horizontal blocks */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-4">
              <div>
                <label className="block text-[10px] font-extrabold text-slate-400 tracking-wider uppercase mb-1">
                  Structure City
                </label>
                <input 
                  type="text" 
                  value={aiCity} 
                  onChange={(e) => setAiCity(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs font-semibold rounded py-2.5 px-3 focus:outline-none focus:border-orange"
                  placeholder="e.g. Katy"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-slate-400 tracking-wider uppercase mb-1">
                  Roof Material
                </label>
                <select 
                  value={aiMaterial} 
                  onChange={(e) => setAiMaterial(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs font-semibold rounded py-2.5 px-3 focus:outline-none focus:border-orange"
                >
                  <option value="Asphalt Shingles">Asphalt Shingles</option>
                  <option value="Standing Seam Metal">24-Ga standing seam Metal</option>
                  <option value="Fluid TPO/Silicone Coating">Fluid TPO/Silicone Coating</option>
                  <option value="Spanish Slate/Clay Tile">Spanish Slate/Clay Tile</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-slate-400 tracking-wider uppercase mb-1">
                  Est. Square Footage
                </label>
                <input 
                  type="number" 
                  value={aiSqFt} 
                  onChange={(e) => setAiSqFt(parseInt(e.target.value) || 2000)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs font-semibold rounded py-2 px-3 focus:outline-none focus:border-orange"
                  min="500"
                  max="50000"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-[10px] font-extrabold text-slate-400 tracking-wider uppercase mb-1.5">
                Describe Roof Damage, Missing Shingles, Gutter Gaps or Active Leak Symptoms
              </label>
              <textarea
                value={aiDetails}
                onChange={(e) => setAiDetails(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded p-3 h-18 focus:outline-none focus:border-orange resize-none"
                placeholder="Missing shingles, attic leakage spots, hail dents in flashings, or specific leak problems..."
              />
            </div>

            {/* Assessment Button */}
            <div className="mb-4">
              <button
                onClick={runAiAssessment}
                disabled={aiLoading}
                className="w-full bg-gradient-to-r from-orange to-red-600 hover:from-orange-hover hover:to-red-700 disabled:from-slate-800 disabled:to-slate-800 text-white font-display font-extrabold text-xs tracking-wider uppercase py-3.5 px-4 rounded-xl flex items-center justify-center gap-2.5 shadow-lg active:scale-99 transition-all cursor-pointer"
              >
                {aiLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span className="animate-pulse">{aiLoadingMessage}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4.5 h-4.5 animate-pulse text-amber-300" />
                    <span>RUN CERTIFIED FORENSIC RESTORATION ASSESSMENT BY AI</span>
                  </>
                )}
              </button>
            </div>

            {/* Generated Report Output Sheet */}
            <div className="bg-slate-950/90 rounded-xl border border-slate-800 p-4 relative flex-grow min-h-[180px] flex flex-col justify-center">
              
              {!aiLoading && !aiReport && (
                <div className="text-center text-slate-500 py-6 max-w-sm mx-auto">
                  <FileText className="w-10 h-10 mx-auto text-slate-700 mb-2" />
                  <p className="text-xs font-semibold">Ready to generate Certified Assessment</p>
                  <p className="text-[11px] text-slate-600">Enter physical details or load storm presets above. The diagnostic inspector is online.</p>
                </div>
              )}

              {aiLoading && (
                <div className="text-center py-6">
                  <Clock className="w-8 h-8 text-orange animate-spin mx-auto mb-2.5" />
                  <p className="text-xs font-mono text-orange uppercase tracking-wider">{aiLoadingMessage}</p>
                </div>
              )}

              {aiReport && (
                <div className="text-left text-xs text-slate-300 space-y-3">
                  <div className="flex justify-between items-start gap-2 border-b border-slate-800 pb-2.5">
                    <div>
                      <h4 className="font-display font-bold text-sm text-white uppercase tracking-tight">
                        {aiReport.reportTitle || "Forensic Roof Damage & Wind/Hail Evaluation Report"}
                      </h4>
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest">{aiReport.cityLocation || "Houston Metro area"}</p>
                    </div>
                    <span className="bg-orange/15 border border-orange/20 text-orange font-bold font-mono text-[9px] py-1 px-2 rounded uppercase text-center self-start">
                      Leak Risk: <span className="text-white">{aiReport.leakRisk}</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3 bg-slate-900/60 p-3 rounded border border-slate-800">
                    <div className="md:col-span-3 space-y-1">
                      <span className="block text-[8.5px] font-bold text-slate-400 uppercase tracking-widest">HAAG Forensic Status</span>
                      <span className="font-semibold text-slate-200 flex items-center gap-1 text-[11px]">
                        <AlertTriangle className="w-3.5 h-3.5 text-orange flex-shrink-0" />
                        {aiReport.haagStatus}
                      </span>
                    </div>
                    <div className="md:col-span-2 space-y-1 md:border-l md:border-slate-800 md:pl-3">
                      <span className="block text-[8.5px] font-bold text-slate-400 uppercase tracking-widest">Insurance Estimate Range</span>
                      <span className="font-display font-extrabold text-[13px] text-emerald-400 block mt-0.5">
                        {aiReport.estimateRange?.low} - {aiReport.estimateRange?.high}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Scientific Assessment Summary</span>
                    <p className="leading-relaxed text-slate-300 bg-slate-900/40 p-2.5 rounded border border-slate-800 text-[11px]">
                      {aiReport.forensicAssessment}
                    </p>
                  </div>

                  <div>
                    <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Actionable Stabilization Directives</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {aiReport.recommendedActions?.slice(0, 4).map((action: string, i: number) => (
                        <div key={i} className="flex gap-1.5 items-start bg-slate-900/50 p-2 rounded border border-slate-800/60">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span className="text-[10.5px] leading-tight text-slate-200">{action}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[10px]">
                    <span className="text-slate-500 font-mono italic">
                      * Verified HAAG assessment standard GAF modules.
                    </span>
                    <button
                      onClick={() => copyToClipboard('ai', JSON.stringify(aiReport, null, 2))}
                      className="text-orange hover:text-white flex items-center gap-1 cursor-pointer font-bold uppercase transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      {copiedStatus === 'ai' ? 'Copied Report!' : 'Copy Assessment JSON'}
                    </button>
                  </div>

                </div>
              )}

            </div>

          </div>

        </div>

        {/* Bento Cell 3 & 4 Grid Segment */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
          
          {/* Bento Cell 3: Material dynamic Estimator (LEFT, Span 6) */}
          <div className="md:col-span-6 bg-navy/90 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl relative overflow-hidden hover:border-slate-700 transition-colors">
            
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-orange" />
                <h2 className="font-display font-extrabold text-lg text-white uppercase tracking-tight">
                  Premium Material Cost Estimator
                </h2>
              </div>
              <span className="text-[10px] font-mono bg-slate-800 text-slate-300 py-1 px-2.5 rounded font-bold uppercase tracking-wider">
                GAF Golden Partner Rate
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-4">
              Explore custom price adjustments based on different Texas premium roof material compositions, factoring in standard structural replacements.
            </p>

            <div className="space-y-4">
              
              {/* Material Select buttons */}
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Roof Material Select
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: "Shingles", name: "GAF Shingle" },
                    { id: "Metal", name: "Premium Metal" },
                    { id: "Coating", name: "TPO Coating" },
                    { id: "Tile", name: "Spanish Clay" }
                  ].map(m => (
                    <button
                      key={m.id}
                      onClick={() => setRoofMaterial(m.id)}
                      className={`py-2 px-2.5 rounded text-[10.5px] font-extrabold text-center border cursor-pointer transition-all ${
                        roofMaterial === m.id 
                        ? 'bg-orange border-orange text-white' 
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {m.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Square Footage slider */}
              <div>
                <div className="flex justify-between items-center text-xs font-bold uppercase text-slate-400 mb-1">
                  <span>Estimated Size</span>
                  <span className="text-orange">{sqFt.toLocaleString()} SQ. FT</span>
                </div>
                <input 
                  type="range" 
                  min="1200" 
                  max="5200" 
                  step="100"
                  value={sqFt}
                  onChange={(e) => setSqFt(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-orange"
                />
                <div className="flex justify-between text-[9px] text-slate-500 font-mono mt-0.5">
                  <span>1,200 SQ FT</span>
                  <span>5,200 SQ FT (Large Estate)</span>
                </div>
              </div>

              {/* Estimator calculations display cardboard */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                <div className="border-b border-slate-900 pb-2 mb-2 flex justify-between text-slate-400 font-semibold font-mono">
                  <span>Estimated Area Metrics</span>
                  <span>{(sqFt / 100).toFixed(1)} Squares</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-slate-300">
                    <span>Premium Materials subtotal:</span>
                    <span className="font-medium">${materialCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Elite Crew Installation labor:</span>
                    <span className="font-medium">${installationCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Quality Cert specifications:</span>
                    <span className="text-orange font-semibold">{getMaterialTax()}</span>
                  </div>
                  <div className="border-t border-slate-800 pt-2 flex justify-between text-sm font-extrabold text-white">
                    <span className="uppercase text-slate-200">Local Complete Estimate:</span>
                    <span className="text-emerald-400 font-display font-extrabold text-base">${totalCost.toLocaleString()}*</span>
                  </div>
                </div>
              </div>

            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-[10.5px] text-slate-500 italic">
              * Calculations are general approximations matching 2026 Texas building standards. Actual claims require physical digital roof mapping with HAAG-certified tooling.
            </div>

          </div>

          {/* Bento Cell 4: Components.html Code Explorer & Live Exporter (RIGHT, Span 6) */}
          <div className="md:col-span-6 bg-navy/90 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl relative overflow-hidden hover:border-slate-700 transition-colors flex flex-col">
            
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-orange" />
                <h2 className="font-display font-extrabold text-lg text-white uppercase tracking-tight">
                  Components Code Repository
                </h2>
              </div>
              <span className="bg-orange/15 border border-orange/20 text-orange font-mono text-[9px] py-1 px-2.5 rounded font-extrabold uppercase">
                components.html Explorer
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-4">
              Export and copy certified component markup from our single cohesive repository. This allows instant propagation of styles across 12 landing pages.
            </p>

            {/* Code Tabs selectors */}
            <div className="flex gap-1.5 border-b border-slate-800 pb-2 mb-3 overflow-x-auto text-[10px] font-extrabold font-display">
              {[
                { id: "css", label: "Shared CSS", code: cssCodeString },
                { id: "header", label: "Shared Header", code: headerCodeString },
                { id: "footer", label: "Shared Footer", code: footerCodeString },
                { id: "schema", label: "Local Business Schema", code: schemaCodeString },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCodeTab(tab.id)}
                  className={`py-1.5 px-3 rounded cursor-pointer transition-all ${
                    activeCodeTab === tab.id 
                    ? 'bg-orange text-white' 
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Live active code viewing pane */}
            <div className="bg-slate-950 rounded-lg p-3 relative flex-grow min-h-[140px] text-left text-[11px] font-mono text-emerald-400 overflow-hidden flex flex-col">
              
              <div className="absolute right-2.5 top-2.5 z-10">
                <button
                  onClick={() => {
                    const activeObj = [
                      { id: "css", code: cssCodeString },
                      { id: "header", code: headerCodeString },
                      { id: "footer", code: footerCodeString },
                      { id: "schema", code: schemaCodeString },
                    ].find(tab => tab.id === activeCodeTab);
                    if (activeObj) {
                      copyToClipboard(activeCodeTab, activeObj.code);
                    }
                  }}
                  className="bg-navy/80 hover:bg-orange hover:text-white border border-slate-800 hover:border-orange text-orange font-bold text-[9px] py-1 px-2.5 rounded transition-all cursor-pointer flex items-center gap-1 uppercase"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedStatus === activeCodeTab ? 'Copied Markup!' : 'Copy Snippet'}</span>
                </button>
              </div>

              <pre className="overflow-y-auto max-h-[160px] whitespace-pre-wrap leading-tight text-slate-300 pt-4 flex-grow cursor-text selection:bg-orange selection:text-white">
                <code>
                  {activeCodeTab === "css" && cssCodeString}
                  {activeCodeTab === "header" && headerCodeString}
                  {activeCodeTab === "footer" && footerCodeString}
                  {activeCodeTab === "schema" && schemaCodeString}
                </code>
              </pre>

            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-500">
              <span>Includes sticky hamburger menu JS script block</span>
              <a href="/components.html" target="_blank" className="font-bold text-orange hover:underline flex items-center gap-1">
                Open raw components file <ExternalLink className="w-3" />
              </a>
            </div>

          </div>

        </div>

        {/* Bento Cell 5: Service Area Multi-City Grid (Span 12) */}
        <section className="bg-navy/90 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl relative overflow-hidden hover:border-slate-700 transition-colors mt-6">
          
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-orange" />
              <h2 className="font-display font-extrabold text-lg text-white uppercase tracking-tight">
                Epic Roofing TX - Local Service Area Matrix
              </h2>
            </div>
            <span className="text-[10px] font-mono bg-orange/15 border border-orange/20 text-orange py-1 px-2.5 rounded font-extrabold uppercase">
              12 High-Value Houston Hubs
            </span>
          </div>

          <p className="text-xs text-slate-400 mb-6">
            Our multi-site authority model maps precise roofing search statistics and local weather factors for each area. All city parameters are pre-registered into the Google LocalBusiness JSON-LD schema payload.
          </p>

          {/* 12 Cities Bento grid map layout */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { city: "Houston", pop: "Metro Core", volume: "9,600", color: "text-emerald-400", risk: "Hurricane Uplift" },
              { city: "Katy", pop: "West Hub", volume: "4,400", color: "text-red-400", risk: "Severe Hail Heat" },
              { city: "Sugar Land", pop: "Southwest Suburb", volume: "3,200", color: "text-orange", risk: "Strict HOA GAF" },
              { city: "Cypress", pop: "Northwest Hub", volume: "3,900", color: "text-red-400", risk: "High Velocity Wind" },
              { city: "The Woodlands", pop: "North Reserve", volume: "3,100", color: "text-emerald-400", risk: "Shade Moss Decay" },
              { city: "Pearland", pop: "South Reserve", volume: "2,200", color: "text-amber-500", risk: "Coastal Moisture" },
              { city: "League City", pop: "Coastal Front", volume: "1,800", color: "text-amber-400", risk: "Salty High Winds" },
              { city: "Spring", pop: "North Suburb", volume: "2,500", color: "text-emerald-400", risk: "Thermal Expansion" },
              { city: "Pasadena", pop: "East Channel", volume: "1,400", color: "text-orange", risk: "Silicone Flat Roof" },
              { city: "Conroe", pop: "Pine Forest", volume: "1,900", color: "text-red-400", risk: "Debris rot impact" },
              { city: "Kingwood", pop: "Forested Canopy", volume: "1,300", color: "text-amber-500", risk: "Gutters blockage" },
              { city: "Tomball", pop: "Rural Expand", volume: "1,200", color: "text-emerald-400", risk: "Rapid Sub replacement" }
            ].map((item, index) => (
              <div 
                key={index} 
                onClick={() => {
                  setSelectedCity(item.city);
                  // Scroll slightly to the generator
                  window.scrollTo({ top: 350, behavior: 'smooth' });
                }}
                className={`bg-slate-950 p-3.5 rounded-xl border ${selectedCity === item.city ? 'border-orange ring-1 ring-orange/30' : 'border-slate-800 hover:border-slate-700'} text-left transition-all cursor-pointer select-none`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-display font-black text-xs text-white uppercase tracking-tight block">
                    {item.city}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-orange"></span>
                </div>
                <span className="text-[10px] text-slate-500 font-semibold block">{item.pop}</span>
                <span className="text-[9px] text-orange font-bold uppercase block mt-1">{item.risk}</span>
                
                <div className="mt-2.5 pt-2 border-t border-slate-900 flex justify-between items-center text-[10px]">
                  <span className="text-slate-500">Vol/mo:</span>
                  <span className="font-mono font-bold text-slate-300">{item.volume}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400 flex flex-col md:flex-row justify-between gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Multi-city routing mapped: each click dynamically alters mock leads telemetry!</span>
            </div>
            <span className="font-bold text-slate-300 uppercase tracking-widest text-[10px]">
              EPIC ROOFING TX LOCAL SEOS ACCREDITED
            </span>
          </div>

        </section>

      </main>

      {/* FOOTER SECTION */}
      <footer className="bg-dark/95 border-t border-slate-900 text-slate-400 text-xs mt-12 py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <div className="font-display font-extrabold text-white text-base">
                EPIC ROOFING <span className="text-orange">TX</span>
              </div>
              <p className="leading-relaxed">
                Houston metro area’s elite rank-and-rent asset configuration. Licensed, insured GAF-certified components for fast roofing traffic deployment.
              </p>
              <div className="flex gap-2">
                <span className="bg-red-650 text-white font-mono uppercase font-bold text-[9px] py-0.5 px-2 rounded">GAF CERT</span>
                <span className="bg-blue-650 text-white font-mono uppercase font-bold text-[9px] py-0.5 px-2 rounded">BBB A+</span>
              </div>
            </div>

            <div>
              <h4 className="font-display font-extrabold text-white uppercase text-sm mb-3">6 Core Services</h4>
              <ul className="space-y-1.5 font-semibold text-slate-400 text-[11px]">
                {SERVICES.map(s => (
                  <li key={s.id}>
                    <span className="hover:text-white transition-colors cursor-pointer" onClick={() => setSelectedService(s.id)}>
                      {s.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display font-extrabold text-white uppercase text-sm mb-3">Service Areas</h4>
              <ul className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] font-semibold text-slate-400">
                {CITIES.map(c => (
                  <li key={c} className="hover:text-white transition-colors cursor-pointer" onClick={() => setSelectedCity(c)}>
                    {c}, TX
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-display font-extrabold text-white uppercase text-sm mb-3">Houston HQ Details</h4>
              <p className="font-semibold text-white">📞 (832) 555-0100</p>
              <p className="text-[11px]">info@epicroofingtx.com</p>
              <p className="text-[11px]">Mon-Sat 7AM - 7PM | Emergency 24/7</p>
              <p className="text-[10px] text-slate-500">Houston metropolitan area, Texas, USA</p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center text-[10.5px]">
            <p>© 2025 Epic Roofing TX. Built with GAF system certification and HAAG engineering guidelines.</p>
            <div className="flex gap-4 mt-2.5 md:mt-0">
              <span className="hover:underline cursor-pointer">Privacy Policy</span>
              <span className="border-l border-slate-800 pl-4 hover:underline cursor-pointer">Sitemap</span>
              <a href="/components.html" target="_blank" className="border-l border-slate-800 pl-4 text-orange hover:underline font-bold">
                components.html Complete Elements
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* MOBILE STICKY CALL BUTTON */}
      <div 
        onClick={triggerSimulatedCall}
        className="fixed bottom-0 left-0 right-0 h-15 bg-orange text-white text-sm font-display font-extrabold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer z-50 md:hidden shadow-2xl hover:bg-orange-hover"
      >
        <Phone className="w-5 h-5" />
        <span>Call Now — Free Inspection</span>
      </div>

    </div>
  );
}
