// ============================================================
// package_detail.js - Dynamic package detail page
// Uses URL parameter to load the correct package
// Updated paths: JSON folder, PHOTO folder
// ============================================================

// Package configuration with correct PHOTO paths
const packageConfig = {
    'SEA-PKG-001': {
        packageCode: 'SEA-PKG-001',
        slideId: 'slide1',
        images: ['PHOTO/package1.jpg', 'PHOTO/package1_2.jpg', 'PHOTO/package1_3.jpg'],
        mapUrl: 'https://maps.app.goo.gl/sDoNDFF3LNKE97TL8',
        extraTitle: 'Experience the Ocean'
    },
    'SNK-PKG-002': {
        packageCode: 'SNK-PKG-002',
        slideId: 'slide2',
        images: ['PHOTO/package2.jpg', 'PHOTO/package2_2.jpg', 'PHOTO/package2_3.jpg'],
        mapUrl: 'https://maps.app.goo.gl/Why3iNqdHR5KkgcM8',
        extraTitle: 'Experience the Ocean'
    },
    'HIL-PKG-003': {
        packageCode: 'HIL-PKG-003',
        slideId: 'slide3',
        images: ['PHOTO/package3.jpg', 'PHOTO/package3_2.jpg', 'PHOTO/package3_3.jpg'],
        mapUrl: 'https://maps.app.goo.gl/dskHWKUshHr8JN3s6',
        extraTitle: 'Experience the Hills'
    },
    'BEA-PKG-004': {
        packageCode: 'BEA-PKG-004',
        slideId: 'slide4',
        images: ['PHOTO/package4.jpg', 'PHOTO/package4_2.jpg', 'PHOTO/package4_3.jpg'],
        mapUrl: 'https://maps.app.goo.gl/yXa6TrZdRvjfacj88',
        extraTitle: 'Experience the Beach'
    },
    'JNG-PKG-005': {
        packageCode: 'JNG-PKG-005',
        slideId: 'slide5',
        images: ['PHOTO/package5.jpg', 'PHOTO/package5_2.jpg', 'PHOTO/package5_3.jpg'],
        mapUrl: 'https://maps.app.goo.gl/h49tSz3Dh1j1Fjew6',
        extraTitle: 'Experience the Jungle'
    }
};

// Get package ID from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const packageId = urlParams.get('id');

// Validate package ID - redirect if invalid
if (!packageId || !packageConfig[packageId]) {
    window.location.href = 'package_main.html';
}

const config = packageConfig[packageId];
let currentImageIndex = 0;
let slideInterval;

// Set data attribute on body
document.body.dataset.package = packageId;

// Update all dynamic elements
function updatePageContent() {
    // Set main image
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.src = config.images[0];
        mainImage.alt = config.packageCode;
    }
    
    // Set links
    const mapLink = document.getElementById('mapLink');
    const bookLink = document.getElementById('bookLink');
    if (mapLink) mapLink.href = config.mapUrl;
    if (bookLink) bookLink.href = `booking.html?package=${packageId}`;
    
    // Set extra section title
    const extraTitle = document.getElementById('extraTitle');
    if (extraTitle) extraTitle.textContent = config.extraTitle;
}

// Slideshow functions
window.prevSlide = function() {
    const img = document.getElementById('mainImage');
    if (!img) return;
    
    img.style.opacity = '0';
    setTimeout(() => {
        currentImageIndex = (currentImageIndex - 1 + config.images.length) % config.images.length;
        img.src = config.images[currentImageIndex];
        img.style.opacity = '1';
    }, 250);
};

window.nextSlide = function() {
    const img = document.getElementById('mainImage');
    if (!img) return;
    
    img.style.opacity = '0';
    setTimeout(() => {
        currentImageIndex = (currentImageIndex + 1) % config.images.length;
        img.src = config.images[currentImageIndex];
        img.style.opacity = '1';
    }, 250);
};

// Auto-slide every 4 seconds
function startAutoSlide() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        if (document.getElementById('mainImage')) {
            window.nextSlide();
        }
    }, 4000);
}

// Load package data from JSON file (updated path to JSON folder)
fetch('JSON/package_detail.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load package data');
        }
        return response.json();
    })
    .then(data => {
        const pkg = data[packageId];
        if (!pkg) return;
        
        const titleEl = document.getElementById('title');
        const priceEl = document.getElementById('price');
        const descEl = document.getElementById('desc');
        const includesEl = document.getElementById('includes');
        const guideEl = document.getElementById('guide');
        
        if (titleEl) titleEl.textContent = pkg.title;
        if (priceEl) priceEl.textContent = 'RM ' + pkg.price;
        if (descEl) descEl.innerHTML = `<p>${pkg.description}</p>`;
        
        if (includesEl) {
            let includesHTML = '<p>→ Includes:<br><br>';
            if (pkg.includes && pkg.includes.length) {
                pkg.includes.forEach(item => {
                    includesHTML += `- ${item}<br>`;
                });
            }
            includesHTML += '</p>';
            includesEl.innerHTML = includesHTML;
        }
        
        if (guideEl) {
            guideEl.innerHTML = `
                <p>Tour Guide:<br><br>
                ${pkg.guide?.name || 'N/A'}<br>
                ${pkg.guide?.phone || 'N/A'}<br><br>
                ${pkg.guide?.info || 'No guide information available.'}</p>
            `;
        }
    })
    .catch(error => {
        console.error('Error loading package data:', error);
        const descEl = document.getElementById('desc');
        if (descEl) descEl.innerHTML = '<p>Unable to load package details. Please try again later.</p>';
    });

// Lightbox functions
window.openLightbox = function(img) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    if (lightbox && lightboxImg) {
        lightbox.style.display = 'flex';
        lightboxImg.src = img.src;
    }
};

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) lightbox.style.display = 'none';
}

window.toggleText = function() {
    const text = document.getElementById('text');
    const btn = document.querySelector('.showdesc');
    if (!text || !btn) return;
    
    if (text.style.display === 'none') {
        text.style.display = 'block';
        btn.textContent = 'Hide Description';
    } else {
        text.style.display = 'none';
        btn.textContent = 'Show Description';
    }
};

// Initialize page
function init() {
    updatePageContent();
    startAutoSlide();
    
    // Lightbox close events
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.onclick = closeLightbox;
    }
    
    if (lightbox) {
        lightbox.onclick = function(e) {
            if (e.target === lightbox) closeLightbox();
        };
    }
    
    // Navbar scroll effect (if navbar exists)
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// Start everything when page loads
document.addEventListener('DOMContentLoaded', init);

// Cleanup interval on page unload
window.addEventListener('beforeunload', function() {
    if (slideInterval) clearInterval(slideInterval);
});