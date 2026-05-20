// =========================
// PENANG MAP & ATTRACTIONS 
// =========================

// Wait for page to load before running map code
document.addEventListener('DOMContentLoaded', function() {
    
    // Only initialize map if the map container exists on this page
    const mapContainer = document.getElementById('penang-map');
    if (!mapContainer) return; // Exit if no map on this page
    
    // ---------- ATTRACTIONS DATA ----------
    const attractions = [
        {
            id: 1,
            name: "Penang Hill",
            lat: 5.4242,
            lng: 100.2644,
            description: "Panoramic hill station with funicular railway, cool climate & breathtaking sunrise views over George Town.",
            iconEmoji: "🚠",
            category: "Nature & Views",
            imgColor: "linear-gradient(135deg, #2f6b47, #9eb67b)"
        },
        {
            id: 2,
            name: "Kek Lok Si Temple",
            lat: 5.3998,
            lng: 100.2736,
            description: "Magnificent Buddhist temple complex, iconic seven-story pagoda and the giant Kuan Yin statue.",
            iconEmoji: "🏯",
            category: "Cultural & Heritage",
            imgColor: "linear-gradient(135deg, #b5651e, #e9b35f)"
        },
        {
            id: 3,
            name: "George Town UNESCO Zone",
            lat: 5.4141,
            lng: 100.3288,
            description: "Historic colonial architecture, vibrant street art, clan jetties, and authentic local cafes.",
            iconEmoji: "🎨",
            category: "Heritage & Art",
            imgColor: "linear-gradient(135deg, #3b7b86, #6fb3b2)"
        },
        {
            id: 4,
            name: "Batu Ferringhi Beach",
            lat: 5.4769,
            lng: 100.2445,
            description: "Golden sandy beach, water sports, night market & stunning sunset views.",
            iconEmoji: "🏖️",
            category: "Beach & Relax",
            imgColor: "linear-gradient(135deg, #1f8a8a, #9ad0c2)"
        },
        {
            id: 5,
            name: "Pinang Peranakan Mansion",
            lat: 5.4171,
            lng: 100.3379,
            description: "Green-hued mansion museum showcasing Peranakan heritage, antiques and ornate design.",
            iconEmoji: "🏛️",
            category: "Museum",
            imgColor: "linear-gradient(135deg, #497c5c, #b3cfa0)"
        },
        {
            id: 6,
            name: "Entopia Butterfly Farm",
            lat: 5.4347,
            lng: 100.2589,
            description: "Tropical butterfly sanctuary with lush gardens & interactive nature exhibits.",
            iconEmoji: "🦋",
            category: "Nature",
            imgColor: "linear-gradient(135deg, #439a86, #b1dfcc)"
        }
    ];

    // ---------- INITIALIZE MAP ----------
    const map = L.map('penang-map').setView([5.4141, 100.3288], 12.5);

    // Add OpenStreetMap tiles (free, no API key)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
        minZoom: 10
    }).addTo(map);

    // Add scale bar
    L.control.scale({ metric: true, imperial: false }).addTo(map);

    // ---------- ADD MARKERS ----------
    const markers = [];

    attractions.forEach(attraction => {
        const marker = L.marker([attraction.lat, attraction.lng], {
            riseOnHover: true
        }).addTo(map);
        
        const popupContent = `
            <div style="font-family: 'Segoe UI', Arial, sans-serif; min-width: 220px;">
                <strong style="font-size:1.15rem; color:#1e5a3a;">${attraction.iconEmoji} ${attraction.name}</strong>
                <p style="margin:8px 0; font-size:0.85rem; line-height:1.4;">${attraction.description}</p>
                <span style="background:#f5c542; padding:3px 10px; border-radius:40px; font-size:0.7rem; font-weight:bold; display:inline-block;">${attraction.category}</span>
            </div>
        `;
        marker.bindPopup(popupContent);
        
        markers.push({
            id: attraction.id,
            marker: marker,
            latlng: [attraction.lat, attraction.lng],
            name: attraction.name
        });
    });

    // ---------- BUILD ATTRACTION CARDS ----------
    const gridContainer = document.getElementById('attractions-grid');
    
    if (gridContainer) {
        attractions.forEach(att => {
            const card = document.createElement('div');
            card.className = 'attraction-card';
            
            card.innerHTML = `
                <div class="card-img" style="background: ${att.imgColor}; background-size: cover; background-position: center;">
                    <div class="emoji-overlay">${att.iconEmoji}</div>
                </div>
                <div class="card-content">
                    <h4>${att.name}</h4>
                    <p>${att.description}</p>
                    <div class="badge">📌 ${att.category}</div>
                    <div class="click-hint">
                        <span>📍</span> Click to view on map
                    </div>
                </div>
            `;
            
            card.addEventListener('click', function() {
                const markerObj = markers.find(m => m.id === att.id);
                if (markerObj) {
                    map.flyTo(markerObj.latlng, 15, {
                        duration: 1.2,
                        easeLinearity: 0.5
                    });
                    setTimeout(() => {
                        markerObj.marker.openPopup();
                    }, 300);
                }
            });
            
            gridContainer.appendChild(card);
        });
    }

    // ---------- WELCOME POPUP ----------
    setTimeout(() => {
        const welcomePopup = L.popup()
            .setLatLng([5.4141, 100.3288])
            .setContent(`
                <div style="text-align:center; font-weight:500; padding:5px;">
                    🌟 Welcome to Penang Wonders! 🌟<br>
                    Click any marker or attraction card to explore.
                </div>
            `)
            .openOn(map);
        
        setTimeout(() => {
            map.closePopup(welcomePopup);
        }, 4500);
    }, 800);

    // ---------- RESPONSIVE FIX ----------
    window.addEventListener('resize', function() {
        setTimeout(function() {
            map.invalidateSize();
        }, 100);
    });

    console.log("🗺️ Penang Map Loaded!");
});