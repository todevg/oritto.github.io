// ORITTO LED LIGHTS - Interactive Web Application Logic

// Product Data Store matching Sitemap Categories & Products (Slide 7/8 expanded specs)
const productsData = [
  // Ceiling & Surface
  { id: 1, name: 'AeroSlim Prime Ceiling LED', category: 'category', sub: 'Ceiling Luminaires', wattage: '15W / 22W', lumens: '2200 lm', cri: 'CRI>80', ip: 'IP20', surge: '2.5kV', colorTemp: '3000-6500K', warranty: '3 Years', img: 'assets/image1.png', desc: 'Ultra-thin architectural recessed ceiling light with edge-lit LED technology.' },
  { id: 2, name: 'Crown Surface Master LED', category: 'category', sub: 'Surface Luminaires', wattage: '18W', lumens: '1800 lm', cri: 'CRI>80', ip: 'IP40', surge: '2.5kV', colorTemp: '4000K', warranty: '3 Years', img: 'assets/image2.png', desc: 'Sleek cylindrical surface mounted luminaire ideal for low ceilings and corridors.' },
  { id: 3, name: 'Matrix Soft Panel 60x60', category: 'category', sub: 'Panel Luminaires', wattage: '36W / 48W', lumens: '4800 lm', cri: 'CRI>90', ip: 'IP20', surge: '4kV', colorTemp: '4000-5700K', warranty: '5 Years', img: 'assets/image3.png', desc: 'High efficiency glare-free office LED panel with micro-prismatic diffuser.' },
  
  // Bulbs & Battens
  { id: 4, name: 'EcoGlow High Wattage Bulb', category: 'category', sub: 'Bulbs', wattage: '9W - 50W', lumens: '5000 lm', cri: 'CRI>80', ip: 'IP20', surge: '2.5kV', colorTemp: '6500K', warranty: '2 Years', img: 'assets/image4.png', desc: 'Surge protected heavy-duty LED bulb engineered for high voltage fluctuations.' },
  { id: 5, name: 'Stellar Linear Batten', category: 'category', sub: 'Battens', wattage: '20W / 40W', lumens: '4200 lm', cri: 'CRI>80', ip: 'IP20', surge: '2.5kV', colorTemp: '6500K', warranty: '3 Years', img: 'assets/image5.png', desc: 'Seamless linear lighting batten with polycarbonate body and uniform glow.' },
  
  // Wall & Bulkhead
  { id: 11, name: 'Aura Wall Washer LED', category: 'category', sub: 'Wall Luminaires', wattage: '12W / 18W', lumens: '1600 lm', cri: 'CRI>80', ip: 'IP44', surge: '2.5kV', colorTemp: '3000-4000K', warranty: '3 Years', img: 'assets/image1.png', desc: 'Sleek wall-mounted up-down luminaire for corridors, lobbies, and accent lighting.' },
  { id: 12, name: 'FortGuard Bulkhead LED', category: 'category', sub: 'Bulkheads', wattage: '15W / 20W', lumens: '1800 lm', cri: 'CRI>80', ip: 'IP65', surge: '4kV', colorTemp: '6500K', warranty: '5 Years', img: 'assets/image2.png', desc: 'Heavy-duty weatherproof bulkhead for staircases, parking garages, and utilities.' },

  // CoB & Architectural
  { id: 6, name: 'Precision CoB Focus Light', category: 'models', sub: 'CoB Luminaires', wattage: '12W / 24W', lumens: '2600 lm', cri: 'CRI>95', ip: 'IP20', surge: '2.5kV', colorTemp: '3000K', warranty: '3 Years', img: 'assets/image6.png', desc: 'Adjustable spot directional CoB luminaire for luxury retail and accent walls.' },
  { id: 7, name: 'Vogue Mirror & Cabinet LED', category: 'models', sub: 'Mirror Luminaires', wattage: '10W', lumens: '1000 lm', cri: 'CRI>90', ip: 'IP44', surge: '1kV', colorTemp: '4000K', warranty: '2 Years', img: 'assets/image7.png', desc: 'IP44 splash-proof vanity lighting bar with natural color rendering index CRI>90.' },
  { id: 13, name: 'SmartGlow RGBW Tunable', category: 'models', sub: 'Smart Luminaires', wattage: '15W', lumens: '1500 lm', cri: 'CRI>80', ip: 'IP20', surge: '1kV', colorTemp: '2700-6500K', warranty: '2 Years', img: 'assets/image3.png', desc: 'Wi-Fi and BLE enabled smart luminaire with app control, scene scheduling, and voice assistant support.' },
  { id: 14, name: 'EmergoPower Inverter LED', category: 'models', sub: 'Emergency Inverter LED', wattage: '10W / 18W', lumens: '1800 lm', cri: 'CRI>80', ip: 'IP20', surge: '2.5kV', colorTemp: '6500K', warranty: '2 Years', img: 'assets/image4.png', desc: 'Built-in lithium battery backup providing 3 hours of emergency illumination during power outages.' },
  
  // Solar & Outdoor
  { id: 8, name: 'Solaria All-in-One Solar Street', category: 'application', sub: 'Solar Street Lights', wattage: '30W Solar', lumens: '3600 lm', cri: 'CRI>70', ip: 'IP66', surge: '6kV', colorTemp: '5700K', warranty: '5 Years', img: 'assets/image8.png', desc: 'Integrated solar street luminaire with LiFePO4 battery and PIR motion sensors.' },
  { id: 9, name: 'Titan Flood & High Mast LED', category: 'application', sub: 'Flood & High Mast', wattage: '100W - 400W', lumens: '48000 lm', cri: 'CRI>80', ip: 'IP66', surge: '10kV', colorTemp: '5700K', warranty: '5 Years', img: 'assets/image9.png', desc: 'Industrial grade IP66 floodlight for sports arenas, ports, and logistics parks.' },
  { id: 10, name: 'PyroGuard Flame Proof Luminaire', category: 'application', sub: 'Flame Proof Luminaires', wattage: '60W', lumens: '7200 lm', cri: 'CRI>80', ip: 'IP66', surge: '6kV', colorTemp: '5700K', warranty: '5 Years', img: 'assets/image10.png', desc: 'Ex-d certified explosion proof lighting fixture for chemical plants & oil refineries.' },
  { id: 15, name: 'StreetMaster Road Luminaire', category: 'application', sub: 'Road Luminaires', wattage: '50W - 200W', lumens: '26000 lm', cri: 'CRI>70', ip: 'IP66', surge: '10kV', colorTemp: '5700K', warranty: '7 Years', img: 'assets/image8.png', desc: 'Asymmetric optics road luminaire with IESNA Type II/III distribution for highways and urban roads.' },
  { id: 16, name: 'HighBay Pro Industrial', category: 'application', sub: 'High Bay Luminaires', wattage: '100W - 250W', lumens: '35000 lm', cri: 'CRI>80', ip: 'IP65', surge: '6kV', colorTemp: '5700K', warranty: '5 Years', img: 'assets/image9.png', desc: 'Die-cast aluminium high bay luminaire withstanding 55°C ambient for warehouses and factories.' }
];

document.addEventListener('DOMContentLoaded', () => {
  initProductGrid('category');
  initTabListeners();
  initSearchListener();
  initModalListeners();
  initFormListeners();
  initMobileNav();
});

// Render Products into DOM based on active filter
function initProductGrid(filterType, searchQuery = '') {
  const container = document.getElementById('productsContainer');
  if (!container) return;
  
  container.innerHTML = '';
  
  let filtered = productsData;
  if (filterType && filterType !== 'all') {
    filtered = filtered.filter(p => p.category === filterType);
  }
  
  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.sub.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
  }
  
  if (filtered.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 50px; color: var(--text-muted);">
      <i class="fa-solid fa-lightbulb-slash" style="font-size: 3rem; margin-bottom: 15px; display:block;"></i>
      <h3>No matching luminaires found</h3>
      <p>Try searching for another product category or keyword.</p>
    </div>`;
    return;
  }
  
  filtered.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <span class="product-tag">${p.sub}</span>
      <div class="product-img">
        <img src="${p.img}" alt="${p.name}" onerror="this.src='https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=400&q=80'">
      </div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="product-specs">
          <span class="spec-badge"><i class="fa-solid fa-bolt"></i> ${p.wattage}</span>
          <span class="spec-badge"><i class="fa-solid fa-sun"></i> ${p.lumens}</span>
          <span class="spec-badge">${p.cri}</span>
          <span class="spec-badge">${p.ip}</span>
          <span class="spec-badge"><i class="fa-solid fa-shield-halved"></i> ${p.surge}</span>
          <span class="spec-badge"><i class="fa-solid fa-temperature-half"></i> ${p.colorTemp}</span>
          <span class="spec-badge"><i class="fa-solid fa-certificate"></i> ${p.warranty}</span>
        </div>
      </div>
      <div class="product-footer">
        <button class="btn-card-enquiry" onclick="openEnquiryModal('${p.name}')">
          Request Quote <i class="fa-solid fa-arrow-right"></i>
        </button>
        <button class="btn-catalog" onclick="alert('Downloading ${p.sub} catalog PDF...')">
          <i class="fa-solid fa-file-pdf"></i> Catalog
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

// Navigation Tabs Listener (Slide 9 requirement)
function initTabListeners() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      tabs.forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      const filter = e.target.getAttribute('data-tab');
      initProductGrid(filter);
    });
  });
}

// Global Header Search Listener
function initSearchListener() {
  const searchInput = document.getElementById('headerSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const activeTab = document.querySelector('.tab-btn.active');
      const filter = activeTab ? activeTab.getAttribute('data-tab') : 'all';
      initProductGrid(filter, e.target.value);
    });
  }
}

// Floating Quick Enquiry & Chat Modals
function initModalListeners() {
  const modal = document.getElementById('enquiryModal');
  const closeBtn = document.getElementById('closeModalBtn');
  const floatEnquiryBtn = document.getElementById('floatEnquiryBtn');
  
  if (floatEnquiryBtn) {
    floatEnquiryBtn.addEventListener('click', () => openEnquiryModal());
  }
  
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }
  
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}

function openEnquiryModal(productName = '') {
  const modal = document.getElementById('enquiryModal');
  const msgInput = document.getElementById('modalMessage');
  if (productName && msgInput) {
    msgInput.value = `Hello ORITTO Team, I am interested in getting technical details and a commercial price quote for: ${productName}.`;
  }
  if (modal) {
    modal.classList.add('active');
  }
}

// Form Submission & Complaint Tracker Logic (Slide 11 & 12)
function initFormListeners() {
  // Complaint Tracker Form
  const complaintForm = document.getElementById('complaintTrackerForm');
  if (complaintForm) {
    complaintForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const queryVal = document.getElementById('ticketOrMobile').value.trim();
      const resultBox = document.getElementById('trackerResult');
      
      if (!queryVal) {
        alert('Please enter a valid Ticket Number or Registered Mobile Number.');
        return;
      }
      
      resultBox.style.display = 'block';
      resultBox.innerHTML = `
        <div style="background: rgba(0, 229, 255, 0.1); border: 1px solid var(--accent-cyan); padding: 16px; border-radius: var(--radius-sm); margin-top: 15px;">
          <h4 style="color: var(--accent-cyan); margin-bottom: 6px;"><i class="fa-solid fa-circle-check"></i> Ticket Status: IN PROGRESS</h4>
          <p style="font-size: 0.88rem;">Complaint Ref: <strong>ORD-${Math.floor(100000 + Math.random() * 900000)}</strong> (${queryVal})</p>
          <p style="font-size: 0.82rem; color: var(--text-muted); margin-top: 4px;">Assigned Field Engineer: Tech Operations Mandideep. Resolution ETA: 24 Hours.</p>
        </div>
      `;
    });
  }
  
  // Quick Modal Enquiry Form
  const modalForm = document.getElementById('quickEnquiryForm');
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for your enquiry! Our ORITTO Technical Sales team will reach out to you within 2 business hours.');
      document.getElementById('enquiryModal').classList.remove('active');
      modalForm.reset();
    });
  }
  
  // Distribution Form
  const distForm = document.getElementById('distributionForm');
  if (distForm) {
    distForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Your Dealership / Distribution application has been submitted successfully to info@oritto.com. Our Business Development head will contact you shortly.');
      distForm.reset();
    });
  }
}

// Mobile Drawer Navigation Toggle
function initMobileNav() {
  const toggle = document.getElementById('mobileNavToggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'var(--bg-card)';
        navLinks.style.padding = '20px';
      }
    });
  }
}
