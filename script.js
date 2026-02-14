// Area data for each state
const areaData = {
    'Lagos': ['Lekki', 'VI', 'Ikoyi', 'Yaba', 'Ajah', 'Ikeja', 'Surulere'],
    'FCT': ['Maitama', 'Wuse', 'Asokoro', 'Garki', 'Jabi'],
    'Enugu': ['Independence Layout', 'Ogui', 'Achara Layout', 'New Haven'],
    'Abuja': ['Maitama', 'Wuse', 'Asokoro', 'Central Area'],
    'Rivers': ['Port Harcourt', 'Obio-Akpor', 'Ikwerre'],
    'Kano': ['Kano Central', 'Nassarawa'],
    'Kaduna': ['Kaduna North', 'Kaduna South'],
    'Oyo': ['Ibadan', 'Lagelu'],
    'Osun': ['Osogbo', 'Ife']
};

// Sample Properties Data
const properties = [
    {
        id: 1,
        title: '4-Bedroom Detached House',
        area: 'Lekki',
        state: 'Lagos',
        price: 85000000,
        type: 'House',
        beds: 4,
        baths: 3,
        sqft: 5200,
        landlord: 'Yusuf Ibrahim',
        landlordPhone: '08012345678',
        rating: 4.8,
        featured: true,
        description: 'Newly renovated luxury detached house in secure gated community',
        image: 'IMG/img1.jpg'
    },
    {
        id: 2,
        title: 'Modern 3-Bedroom Apartment',
        area: 'Ikoyi',
        state: 'Lagos',
        price: 45000000,
        type: 'Apartment',
        beds: 3,
        baths: 2,
        sqft: 2800,
        landlord: 'Chioma Okonkwo',
        landlordPhone: '08098765432',
        rating: 4.6,
        featured: false,
        description: 'Spacious modern apartment with excellent finishes',
        image: 'IMG/img2.jpg'
    },
    {
        id: 3,
        title: '2-Bedroom Apartment',
        area: 'VI',
        state: 'Lagos',
        price: 35000000,
        type: 'Apartment',
        beds: 2,
        baths: 2,
        sqft: 2100,
        landlord: 'Ahmed Hassan',
        landlordPhone: '07087654321',
        rating: 4.4,
        featured: true,
        description: 'Well-located apartment with high-speed internet and 24/7 power',
        image: 'IMG/img3.jpg'
    },
    {
        id: 4,
        title: '5-Bedroom Semi-Detached',
        area: 'Maitama',
        state: 'FCT',
        price: 120000000,
        type: 'House',
        beds: 5,
        baths: 4,
        sqft: 6500,
        landlord: 'Hajiya Aisha',
        landlordPhone: '09012345678',
        rating: 4.9,
        featured: true,
        description: 'Upscale semi-detached home with swimming pool',
        image: 'IMG/img4.jpg'
    },
    {
        id: 5,
        title: '3-Bedroom Townhouse',
        area: 'Independence Layout',
        state: 'Enugu',
        price: 28000000,
        type: 'Townhouse',
        beds: 3,
        baths: 2,
        sqft: 2400,
        landlord: 'Obinna Njoku',
        landlordPhone: '08145678901',
        rating: 4.5,
        featured: false,
        description: 'Beautiful townhouse in established residential area',
        image: 'IMG/luxury.jfif'
    },
    {
        id: 6,
        title: 'Luxury Studio',
        area: 'Yaba',
        state: 'Lagos',
        price: 12000000,
        type: 'Studio',
        beds: 1,
        baths: 1,
        sqft: 850,
        landlord: 'Tunde Adebayo',
        landlordPhone: '08134567890',
        rating: 4.3,
        featured: false,
        description: 'Modern studio apartment perfect for young professionals',
        image: 'IMG/img6.jpg'
    }
];

// Favorites storage
let favorites = new Set();

// Get elements
const stateSelect = document.getElementById('state');
const areaSelect = document.getElementById('area');
const typeSelect = document.getElementById('type');
const minPriceInput = document.getElementById('minPrice');
const maxPriceInput = document.getElementById('maxPrice');
const searchBtn = document.querySelector('.search-btn');
const propertiesContainer = document.getElementById('propertiesContainer');
const noResults = document.getElementById('noResults');
const propertyCount = document.getElementById('propertyCount');

// Update areas when state changes
stateSelect.addEventListener('change', function() {
    const selectedState = this.value;
    areaSelect.innerHTML = '<option value="">All Areas</option>';
    
    if (selectedState && areaData[selectedState]) {
        areaData[selectedState].forEach(area => {
            const option = document.createElement('option');
            option.value = area;
            option.textContent = area;
            areaSelect.appendChild(option);
        });
    }
    displayProperties();
});

// Add event listeners to filter inputs
areaSelect.addEventListener('change', displayProperties);
typeSelect.addEventListener('change', displayProperties);
minPriceInput.addEventListener('input', displayProperties);
maxPriceInput.addEventListener('input', displayProperties);

// Format price in Naira
function formatPrice(price) {
    return '₦' + (price / 1000000).toFixed(1) + 'M';
}

// Filter and display properties
function displayProperties() {
    const state = stateSelect.value;
    const area = areaSelect.value;
    const type = typeSelect.value;
    const minPrice = minPriceInput.value ? parseInt(minPriceInput.value) : 0;
    const maxPrice = maxPriceInput.value ? parseInt(maxPriceInput.value) : Infinity;

    // Filter properties
    const filtered = properties.filter(prop => {
        if (state && prop.state !== state) return false;
        if (area && prop.area !== area) return false;
        if (type && prop.type !== type) return false;
        if (prop.price < minPrice || prop.price > maxPrice) return false;
        return true;
    });

    // Display results
    if (filtered.length === 0) {
        propertiesContainer.innerHTML = '';
        noResults.style.display = 'block';
        propertyCount.textContent = '0 Properties Available';
    } else {
        noResults.style.display = 'none';
        propertyCount.textContent = `${filtered.length} Properties Available`;
        renderCards(filtered);
    }
}

// Render property cards
function renderCards(props) {
    propertiesContainer.innerHTML = props.map(prop => `
        <div class="property-card">
            <div class="property-image" style="background-image: url('${prop.image}');">
                <div class="property-overlay"></div>
                ${prop.featured ? '<div class="featured-badge">⭐ Featured</div>' : ''}
                <button class="favorite-btn ${favorites.has(prop.id) ? 'active' : ''}" onclick="toggleFavorite(event, ${prop.id})"></button>
            </div>

            <div class="property-content">
                <div class="property-header">
                    <h4 class="property-title">${prop.title}</h4>
                    <div class="property-rating">⭐ ${prop.rating}</div>
                </div>

                <div class="property-location">${prop.area}, ${prop.state}</div>

                <div class="property-price-specs">
                    <div class="property-price">
                        <span class="property-price-value">${formatPrice(prop.price)}</span>
                        <span class="property-price-label">${prop.sqft.toLocaleString()} sqft</span>
                    </div>
                    <div class="property-specs">
                        <div class="property-spec">
                            <span class="property-spec-value">${prop.beds}</span>
                            <span class="property-spec-label">Beds</span>
                        </div>
                        <div class="property-spec">
                            <span class="property-spec-value">${prop.baths}</span>
                            <span class="property-spec-label">Baths</span>
                        </div>
                    </div>
                </div>

                <p class="property-description">${prop.description}</p>

                <button class="view-details-btn" onclick="viewDetails(${prop.id})">View Details →</button>
            </div>
        </div>
    `).join('');
}

// Toggle favorite
function toggleFavorite(event, id) {
    event.stopPropagation();
    if (favorites.has(id)) {
        favorites.delete(id);
    } else {
        favorites.add(id);
    }
    displayProperties();
}

// View details (we'll connect this to the next section)
function viewDetails(id) {
    const property = properties.find(p => p.id === id);
    console.log('Viewing property:', property);
    alert(`You clicked on: ${property.title}\n\nNext section will show full details!`);
}

// Search button
searchBtn.addEventListener('click', function() {
    displayProperties();
    console.log('Search triggered');
});

// Initial display
displayProperties();

let currentProperty = null;

// Open details page
function viewDetails(id) {
    const property = properties.find(p => p.id === id);
    if (!property) return;

    currentProperty = property;

    // Populate details
    document.getElementById('detailsImage').style.backgroundImage = `url('${property.image}')`;
    document.getElementById('detailsTitle').textContent = property.title;
    document.getElementById('detailsArea').textContent = property.area;
    document.getElementById('detailsState').textContent = property.state;
    document.getElementById('detailsPrice').textContent = formatPrice(property.price);
    document.getElementById('detailsBeds').textContent = property.beds;
    document.getElementById('detailsBaths').textContent = property.baths;
    document.getElementById('detailsSqft').textContent = property.sqft.toLocaleString();
    document.getElementById('detailsType').textContent = property.type;
    document.getElementById('detailsDescription').textContent = property.description;
    document.getElementById('detailsLandlord').textContent = property.landlord;
    document.getElementById('detailsPhone').textContent = property.landlordPhone;
    document.getElementById('formLandlord').textContent = property.landlord;

    // Update favorite button
    const favBtn = document.querySelector('.details-favorite-btn');
    if (favorites.has(id)) {
        favBtn.classList.add('active');
    } else {
        favBtn.classList.remove('active');
    }

    // Show details section
    document.getElementById('detailsSection').style.display = 'block';
    window.scrollTo(0, 0);
}

// Close details page
function closeDetails() {
    document.getElementById('detailsSection').style.display = 'none';
    currentProperty = null;
    // Clear form
    document.getElementById('contactForm').reset();
}

// Toggle favorite on details page
function toggleDetailsFavorite() {
    if (!currentProperty) return;

    const id = currentProperty.id;
    if (favorites.has(id)) {
        favorites.delete(id);
    } else {
        favorites.add(id);
    }

    // Update button
    const favBtn = document.querySelector('.details-favorite-btn');
    if (favorites.has(id)) {
        favBtn.classList.add('active');
    } else {
        favBtn.classList.remove('active');
    }

    // Update main listing
    displayProperties();
}

// Call landlord
function callLandlord() {
    if (!currentProperty) return;
    const phone = currentProperty.landlordPhone;
    alert(`📱 Calling ${currentProperty.landlord} at ${phone}\n\n(In a real app, this would dial the phone)`);
}

// Submit contact form
function submitContactForm(event) {
    event.preventDefault();

    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const phone = document.getElementById('contactPhone').value;
    const message = document.getElementById('contactMessage').value;

    // Validate phone number (11 digits for Nigeria)
    if (phone.length !== 11 || isNaN(phone)) {
        alert('❌ Please enter a valid 11-digit Nigerian phone number');
        return;
    }

    // Show success message
    alert(`✅ Message sent successfully!\n\nYour message has been sent to ${currentProperty.landlord}.\n\nThey will contact you soon at:\n${email}\n${phone}`);

    // Clear form
    document.getElementById('contactForm').reset();

    // Close details page
    closeDetails();
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    closeDetails();
}

// Add scroll event for smooth scrolling
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});