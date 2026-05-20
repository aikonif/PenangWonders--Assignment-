// =========================
// PENANG MAP & ATTRACTIONS 
// =========================

// Wait for page to load before running map code
document.addEventListener('DOMContentLoaded', function() {
    
    // Only initialize map if the map container exists on this page
    const mapContainer = document.getElementById('penang-map');
    if (!mapContainer) return;
    
    // ---------- LOAD DATA FROM JSON ----------
    fetch('JSON/Map.json')
        .then(response => response.json())
        .then(data => {
            initializeMap(data.attractions, data.packageOffers);
        })
        .catch(error => {
            console.error('Error loading map data:', error);
        });
    
    function initializeMap(attractions, packageOffers) {
        
        // ---------- INITIALIZE MAP (DARK MODE DEFAULT) ----------
        const map = L.map('penang-map').setView([5.4141, 100.3288], 12.5);
        
        // Use dark tiles as default
        let currentTileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19,
            minZoom: 10
        }).addTo(map);
        
        // Add scale bar
        L.control.scale({ metric: true, imperial: false }).addTo(map);
        
        // Apply dark mode to map card UI by default
        const mapCard = document.querySelector('.map-card');
        if (mapCard) {
            mapCard.classList.add('dark-mode');
        }
        
        // ---------- CUSTOM MARKER ICONS ----------
        
        // Blue marker for Penang Highlights
        const blueMarkerIcon = L.divIcon({
            className: 'custom-blue-marker',
            html: '<div style="background-color: #1877f2; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"><span style="font-size: 18px;">📍</span></div>',
            iconSize: [32, 32],
            popupAnchor: [0, -16]
        });
        
        // Gold marker for Package Offers
        const goldMarkerIcon = L.divIcon({
            className: 'custom-gold-marker',
            html: '<div style="background-color: #f0a500; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"><span style="font-size: 18px;">🏨</span></div>',
            iconSize: [32, 32],
            popupAnchor: [0, -16]
        });
        
        // Dark mode marker styles
        const style = document.createElement('style');
        style.textContent = `
            .map-card.dark-mode .custom-blue-marker div {
                background-color: #3b82f6 !important;
                border: 2px solid #1a1a2e !important;
            }
            .map-card.dark-mode .custom-gold-marker div {
                background-color: #f0a500 !important;
                border: 2px solid #1a1a2e !important;
            }
        `;
        document.head.appendChild(style);
        
        // ---------- STORE MARKERS FOR TOGGLE ----------
        let highlightMarkers = [];
        let packageMarkers = [];
        
        // Add Highlight Markers (Penang Highlights)
        attractions.forEach(attraction => {
            const marker = L.marker([attraction.lat, attraction.lng], {
                icon: blueMarkerIcon,
                riseOnHover: true
            }).addTo(map);
            
            const popupContent = `
                <div style="font-family: 'Segoe UI', Arial, sans-serif; min-width: 220px;">
                    <strong style="font-size:1.15rem; color:#1877f2;">${attraction.iconEmoji} ${attraction.name}</strong>
                    <p style="margin:8px 0; font-size:0.85rem; line-height:1.4;">${attraction.description}</p>
                    <span style="background:#1877f2; padding:3px 10px; border-radius:40px; font-size:0.7rem; font-weight:bold; display:inline-block; color:white;">${attraction.category}</span>
                </div>
            `;
            marker.bindPopup(popupContent);
            
            highlightMarkers.push({
                id: attraction.id,
                marker: marker,
                latlng: [attraction.lat, attraction.lng],
                name: attraction.name
            });
        });
        
        // Add Package Markers
        packageOffers.forEach(pkg => {
            const marker = L.marker([pkg.lat, pkg.lng], {
                icon: goldMarkerIcon,
                riseOnHover: true
            }).addTo(map);
            
            const popupContent = `
                <div style="font-family: 'Segoe UI', Arial, sans-serif; min-width: 240px;">
                    <strong style="font-size:1.15rem; color:#f0a500;">${pkg.iconEmoji} ${pkg.name}</strong>
                    <p style="margin:8px 0; font-size:0.85rem; line-height:1.4;">${pkg.description}</p>
                    <div style="margin:8px 0;">
                        <span style="background:#f0a500; padding:3px 10px; border-radius:40px; font-size:0.7rem; font-weight:bold; display:inline-block; color:black;">${pkg.price}</span>
                    </div>
                    <a href="${pkg.link}" style="display:inline-block; margin-top:8px; background:#f0a500; color:black; padding:5px 12px; border-radius:30px; text-decoration:none; font-size:0.75rem; font-weight:bold;">View Package →</a>
                </div>
            `;
            marker.bindPopup(popupContent);
            
            packageMarkers.push({
                id: pkg.id,
                marker: marker,
                latlng: [pkg.lat, pkg.lng],
                name: pkg.name,
                link: pkg.link
            });
        });
        
        // ---------- TOGGLE FUNCTIONALITY ----------
        const toggleHighlights = document.getElementById('toggleHighlights');
        const togglePackages = document.getElementById('togglePackages');
        
        function updateMarkerVisibility() {
            const showHighlights = toggleHighlights ? toggleHighlights.checked : true;
            const showPackages = togglePackages ? togglePackages.checked : true;
            
            highlightMarkers.forEach(item => {
                if (showHighlights) {
                    item.marker.addTo(map);
                } else {
                    map.removeLayer(item.marker);
                }
            });
            
            packageMarkers.forEach(item => {
                if (showPackages) {
                    item.marker.addTo(map);
                } else {
                    map.removeLayer(item.marker);
                }
            });
        }
        
        if (toggleHighlights) {
            toggleHighlights.addEventListener('change', updateMarkerVisibility);
        }
        if (togglePackages) {
            togglePackages.addEventListener('change', updateMarkerVisibility);
        }
        
        // ---------- MAP DARK MODE / LIGHT MODE TOGGLE ----------
        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = '☀️ Light Mode';
        toggleBtn.className = 'map-theme-toggle';
        toggleBtn.setAttribute('aria-label', 'Toggle map theme');
        
        const mapCardElement = document.querySelector('.map-card');
        if (mapCardElement) {
            mapCardElement.style.position = 'relative';
            mapCardElement.appendChild(toggleBtn);
        }
        
        const lightTiles = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
        const darkTiles = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
        let isDarkMode = true;
        
        function setMapTheme(isDark) {
            map.removeLayer(currentTileLayer);
            
            const tileUrl = isDark ? darkTiles : lightTiles;
            currentTileLayer = L.tileLayer(tileUrl, {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                subdomains: 'abcd',
                maxZoom: 19,
                minZoom: 10
            }).addTo(map);
            
            const mapCard = document.querySelector('.map-card');
            if (mapCard) {
                if (isDark) {
                    mapCard.classList.add('dark-mode');
                } else {
                    mapCard.classList.remove('dark-mode');
                }
            }
        }
        
        toggleBtn.addEventListener('click', function() {
            isDarkMode = !isDarkMode;
            
            if (isDarkMode) {
                setMapTheme(true);
                toggleBtn.textContent = '☀️ Light Mode';
                toggleBtn.style.background = 'rgba(0, 0, 0, 0.7)';
            } else {
                setMapTheme(false);
                toggleBtn.textContent = '🌙 Dark Mode';
                toggleBtn.style.background = 'rgba(0, 0, 0, 0.7)';
            }
        });
        
        // ---------- WELCOME POPUP ----------
        setTimeout(() => {
            const welcomePopup = L.popup()
                .setLatLng([5.4141, 100.3288])
                .setContent(`
                    <div style="text-align:center; font-weight:500; padding:5px;">
                        🌟 Welcome to Penang Wonders! 🌟<br>
                        🗺️ <strong>Penang Highlights</strong> (Blue Markers)<br>
                        🏨 <strong>Package Offers</strong> (Gold Markers)<br>
                        💡 Use checkboxes to show/hide markers
                    </div>
                `)
                .openOn(map);
            
            setTimeout(() => {
                map.closePopup(welcomePopup);
            }, 6000);
        }, 800);
        
        // ---------- RESPONSIVE FIX ----------
        window.addEventListener('resize', function() {
            setTimeout(function() {
                map.invalidateSize();
            }, 100);
        });
        
        console.log("🗺️ Penang Map Loaded! Data loaded from Map.json");
    }
});
