// Property Index JavaScript - Comprehensive Functionality
// Handles view switching, filtering, sorting, search, and navigation

// Global state
let currentView = 'grid'; // 'grid' or 'list'
let currentFilters = {
    search: '',
    location: '',
    type: '',
    availability: '',
    size: ''
};
let currentSort = 'name-asc';
let filteredProperties = [];
let isInitialized = false;

// Initialize when DOM is loaded OR when page becomes visible
document.addEventListener('DOMContentLoaded', function() {
    if (typeof propertiesData !== 'undefined') {
        // Check if property index page is already visible
        const propertyIndexPage = document.getElementById('property-index-page');
        if (propertyIndexPage && !propertyIndexPage.classList.contains('hidden')) {
            initializePropertyIndex();
        }
    }
});

// Also try to initialize after a short delay (for router navigation)
setTimeout(function() {
    if (typeof propertiesData !== 'undefined') {
        const propertyIndexPage = document.getElementById('property-index-page');
        if (propertyIndexPage && !propertyIndexPage.classList.contains('hidden')) {
            console.log('Initializing property index from timeout');
            initializePropertyIndex();
        }
    }
}, 100);

// Global function to manually initialize (for debugging)
window.initPropertyIndex = function() {
    console.log('Manual initialization called');
    if (typeof propertiesData !== 'undefined') {
        initializePropertyIndex();
    } else {
        console.error('propertiesData is not defined');
    }
};

// Also initialize when the property index page becomes visible (for router navigation)
const propertyIndexObserver = new MutationObserver(function(mutations) {
    const propertyIndexPage = document.getElementById('property-index-page');
    if (propertyIndexPage && !propertyIndexPage.classList.contains('hidden')) {
        // Page is now visible, initialize if not already initialized
        if (filteredProperties.length === 0 && typeof propertiesData !== 'undefined') {
            initializePropertyIndex();
        }
    }
});

// Start observing after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        const propertyIndexPage = document.getElementById('property-index-page');
        if (propertyIndexPage) {
            propertyIndexObserver.observe(propertyIndexPage, { attributes: true, attributeFilter: ['class'] });
        }
    });
} else {
    const propertyIndexPage = document.getElementById('property-index-page');
    if (propertyIndexPage) {
        propertyIndexObserver.observe(propertyIndexPage, { attributes: true, attributeFilter: ['class'] });
    }
}

function initializePropertyIndex() {
    console.log('initializePropertyIndex called');
    
    // Check if page is visible
    const propertyIndexPage = document.getElementById('property-index-page');
    if (!propertyIndexPage || propertyIndexPage.classList.contains('hidden')) {
        console.log('Property Index page is not visible, skipping initialization');
        return;
    }
    
    if (typeof propertiesData === 'undefined' || !propertiesData) {
        console.error('propertiesData is not defined! Cannot initialize Property Index.');
        console.log('Available global variables:', Object.keys(window).filter(k => k.toLowerCase().includes('prop')));
        // Retry after a short delay in case data is still loading
        setTimeout(() => {
            if (typeof propertiesData !== 'undefined' && propertiesData) {
                console.log('Retrying initialization after data loaded...');
                initializePropertyIndex();
            }
        }, 100);
        return;
    }
    
    // Prevent double initialization
    if (isInitialized) {
        console.log('Property Index already initialized, skipping...');
        return;
    }
    
    console.log('Initializing Property Index with', propertiesData.length, 'properties');
    
    // Set initial filtered properties
    filteredProperties = [...propertiesData];
    
    // Add event listeners
    setupEventListeners();
    
    // Initial render
    renderProperties();
    
    // Attach click handlers to all property cards (static and dynamic)
    setTimeout(() => attachPropertyCardClickHandlers(), 100);
    
    // Mark as initialized
    isInitialized = true;
    console.log('Property Index initialization complete');
}

function setupEventListeners() {
    // View toggle buttons
    const gridBtn = document.getElementById('view-grid-btn');
    const tableBtn = document.getElementById('view-table-btn');
    
    if (gridBtn) {
        gridBtn.addEventListener('click', () => switchView('grid'));
    }
    if (tableBtn) {
        tableBtn.addEventListener('click', () => switchView('list'));
    }
    
    // Search input
    const searchInput = document.getElementById('property-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentFilters.search = e.target.value.toLowerCase();
            applyFiltersAndSort();
        });
    }
    
    // Filter dropdowns
    const locationFilter = document.getElementById('filter-location');
    const typeFilter = document.getElementById('filter-sector');
    const availabilityFilter = document.getElementById('filter-availability');
    const sizeFilter = document.getElementById('filter-size');
    
    if (locationFilter) {
        locationFilter.addEventListener('change', (e) => {
            currentFilters.location = e.target.value;
            applyFiltersAndSort();
        });
    }
    
    if (typeFilter) {
        typeFilter.addEventListener('change', (e) => {
            currentFilters.type = e.target.value;
            applyFiltersAndSort();
        });
    }
    
    if (availabilityFilter) {
        availabilityFilter.addEventListener('change', (e) => {
            currentFilters.availability = e.target.value;
            applyFiltersAndSort();
        });
    }
    
    if (sizeFilter) {
        sizeFilter.addEventListener('change', (e) => {
            currentFilters.size = e.target.value;
            applyFiltersAndSort();
        });
    }
    
    // Sort dropdown
    const sortSelect = document.getElementById('property-sort');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            applyFiltersAndSort();
        });
    }
}

// View switching
function switchView(view) {
    currentView = view;
    
    const gridBtn = document.getElementById('view-grid-btn');
    const tableBtn = document.getElementById('view-table-btn');
    const gridContainer = document.getElementById('properties-grid');
    const listContainer = document.getElementById('properties-list');
    
    if (view === 'grid') {
        // Update button states
        gridBtn.classList.add('bg-slate', 'text-white');
        gridBtn.classList.remove('text-concrete', 'hover:bg-stone');
        tableBtn.classList.remove('bg-slate', 'text-white');
        tableBtn.classList.add('text-concrete', 'hover:bg-stone');
        
        // Show/hide containers
        gridContainer.classList.remove('hidden');
        listContainer.classList.add('hidden');
    } else {
        // Update button states
        tableBtn.classList.add('bg-slate', 'text-white');
        tableBtn.classList.remove('text-concrete', 'hover:bg-stone');
        gridBtn.classList.remove('bg-slate', 'text-white');
        gridBtn.classList.add('text-concrete', 'hover:bg-stone');
        
        // Show/hide containers
        gridContainer.classList.add('hidden');
        listContainer.classList.remove('hidden');
        
        // Render list view
        renderListView();
    }
}

// Apply filters and sorting
function applyFiltersAndSort() {
    // Start with all properties
    let filtered = [...propertiesData];
    
    // Apply search filter
    if (currentFilters.search) {
        filtered = filtered.filter(property => {
            const searchText = (
                property.name + ' ' +
                property.address + ' ' +
                property.location + ' ' +
                property.type
            ).toLowerCase();
            return searchText.includes(currentFilters.search);
        });
    }
    
    // Apply location filter
    if (currentFilters.location) {
        filtered = filtered.filter(property => 
            property.location === currentFilters.location
        );
    }
    
    // Apply type filter
    if (currentFilters.type) {
        filtered = filtered.filter(property => 
            property.type === currentFilters.type
        );
    }
    
    // Apply availability filter
    if (currentFilters.availability) {
        filtered = filtered.filter(property => 
            property.status === currentFilters.availability
        );
    }
    
    // Apply size filter
    if (currentFilters.size) {
        filtered = filtered.filter(property => {
            const size = property.totalArea;
            if (currentFilters.size === 'small') return size < 5000;
            if (currentFilters.size === 'medium') return size >= 5000 && size <= 20000;
            if (currentFilters.size === 'large') return size > 20000;
            return true;
        });
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
        switch(currentSort) {
            case 'name-asc':
                return a.name.localeCompare(b.name);
            case 'name-desc':
                return b.name.localeCompare(a.name);
            case 'occupancy-desc':
                return b.occupancyRate - a.occupancyRate;
            case 'occupancy-asc':
                return a.occupancyRate - b.occupancyRate;
            case 'revenue-desc':
                return b.annualRevenue - a.annualRevenue;
            case 'revenue-asc':
                return a.annualRevenue - b.annualRevenue;
            case 'recent':
                // Assuming properties are already in order by ID (most recent first)
                return 0;
            default:
                return 0;
        }
    });
    
    filteredProperties = filtered;
    renderProperties();
}

// Render properties in current view
function renderProperties() {
    if (currentView === 'grid') {
        renderGridView();
    } else {
        renderListView();
    }
    updatePropertyCount();
}

// Update property count display
function updatePropertyCount() {
    const showingElement = document.getElementById('properties-showing');
    const totalElement = document.getElementById('properties-total');
    const showingBottomElement = document.getElementById('properties-showing-bottom');
    const totalBottomElement = document.getElementById('properties-total-bottom');
    
    if (showingElement) {
        showingElement.textContent = filteredProperties.length;
    }
    if (totalElement) {
        totalElement.textContent = propertiesData.length;
    }
    if (showingBottomElement) {
        showingBottomElement.textContent = filteredProperties.length;
    }
    if (totalBottomElement) {
        totalBottomElement.textContent = propertiesData.length;
    }
}

// Render grid view
function renderGridView() {
    const gridContainer = document.getElementById('properties-grid');
    if (!gridContainer) {
        console.error('Grid container not found!');
        return;
    }
    
    console.log('Rendering grid view with', filteredProperties.length, 'properties');
    
    if (filteredProperties.length === 0) {
        gridContainer.innerHTML = `
            <div class="col-span-3 text-center py-12">
                <i class="fa-solid fa-building text-6xl text-stone mb-4"></i>
                <p class="text-lg text-concrete">No properties found matching your criteria</p>
                <button onclick="resetFilters()" class="mt-4 px-4 py-2 bg-slate text-white rounded-lg hover:bg-opacity-90">
                    Reset Filters
                </button>
            </div>
        `;
        return;
    }
    
    gridContainer.innerHTML = filteredProperties.map(property => {
        // Map status to Tailwind color classes
        let statusBgClass, statusTextClass, occupancyBgClass;
        
        if (property.status === 'Fully Let') {
            statusBgClass = 'bg-green-500';
            statusTextClass = 'text-green-600';
        } else if (property.occupancyRate >= 85) {
            statusBgClass = 'bg-blue-500';
            statusTextClass = 'text-blue-600';
        } else {
            statusBgClass = 'bg-amber-500';
            statusTextClass = 'text-amber-600';
        }
        
        occupancyBgClass = property.occupancyRate >= 85 ? 'bg-green-500' : 'bg-amber-500';
        
        return `
            <div class="property-card bg-white rounded-lg shadow-sm border border-stone overflow-hidden hover:shadow-md transition-shadow cursor-pointer" 
                 data-property-id="${property.id}" 
                 data-location="${property.location}" 
                 data-type="${property.type}" 
                 data-status="${property.status}" 
                 data-occupancy="${property.occupancyRate}">
                <div class="relative h-48">
                    <img src="${property.images[0]}" alt="${property.name}" class="w-full h-full object-cover">
                    <span class="absolute top-3 right-3 px-3 py-1 ${statusBgClass} bg-opacity-90 text-white text-xs font-medium rounded-full">${property.status}</span>
                </div>
                <div class="p-5">
                    <h3 class="text-lg font-semibold text-slate mb-1">${property.name}</h3>
                    <p class="text-sm text-concrete mb-3 flex items-center">
                        <i class="fa-solid fa-location-dot mr-1"></i>
                        ${property.address.split(',').slice(0, 2).join(',')}
                    </p>
                    <div class="grid grid-cols-2 gap-2 mb-3 text-sm">
                        <div class="flex items-center text-concrete">
                            <i class="fa-solid fa-expand mr-1.5"></i>
                            <span>${property.totalArea.toLocaleString()} sqft</span>
                        </div>
                        <div class="flex items-center text-concrete">
                            <i class="fa-solid fa-door-open mr-1.5"></i>
                            <span>${property.totalUnits} units</span>
                        </div>
                        <div class="flex items-center text-concrete">
                            <i class="fa-solid fa-sterling-sign mr-1.5"></i>
                            <span>£${property.pricePerSqFt}/sqft/yr</span>
                        </div>
                        <div class="flex items-center text-concrete">
                            <i class="fa-solid fa-chart-line mr-1.5"></i>
                            <span>£${property.annualRevenue.toLocaleString()}k/yr</span>
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="flex items-center justify-between text-xs text-concrete mb-1">
                            <span>Occupancy</span>
                            <span class="font-semibold">${property.occupancyRate}%</span>
                        </div>
                        <div class="w-full bg-stone rounded-full h-2">
                            <div class="${occupancyBgClass} h-2 rounded-full" style="width: ${property.occupancyRate}%"></div>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2">
                        <button onclick="viewPropertyDetail('${property.id}')" class="flex-1 px-3 py-2 bg-slate text-white rounded-lg text-xs hover:bg-opacity-90 transition-colors">
                            <i class="fa-solid fa-eye mr-1"></i> View Details
                        </button>
                        <button onclick="editProperty('${property.id}')" class="px-3 py-2 border border-stone text-slate rounded-lg text-xs hover:bg-stone transition-colors">
                            <i class="fa-solid fa-edit"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    // Attach click handlers to property cards
    attachPropertyCardClickHandlers();
}

// Render list view
function renderListView() {
    const listContainer = document.getElementById('properties-list');
    if (!listContainer) return;
    
    if (filteredProperties.length === 0) {
        listContainer.innerHTML = `
            <div class="bg-white rounded-lg p-12 text-center">
                <i class="fa-solid fa-building text-6xl text-stone mb-4"></i>
                <p class="text-lg text-concrete">No properties found matching your criteria</p>
                <button onclick="resetFilters()" class="mt-4 px-4 py-2 bg-slate text-white rounded-lg hover:bg-opacity-90">
                    Reset Filters
                </button>
            </div>
        `;
        return;
    }
    
    listContainer.innerHTML = filteredProperties.map(property => {
        // Map status to Tailwind color classes
        let statusBgClass, statusTextClass, occupancyBgClass;
        
        if (property.status === 'Fully Let') {
            statusBgClass = 'bg-green-100';
            statusTextClass = 'text-green-600';
        } else if (property.occupancyRate >= 85) {
            statusBgClass = 'bg-blue-100';
            statusTextClass = 'text-blue-600';
        } else {
            statusBgClass = 'bg-amber-100';
            statusTextClass = 'text-amber-600';
        }
        
        occupancyBgClass = property.occupancyRate >= 85 ? 'bg-green-500' : 'bg-amber-500';
        
        return `
            <div class="bg-white rounded-lg shadow-sm border border-stone overflow-hidden hover:shadow-md transition-shadow">
                <div class="flex">
                    <div class="w-64 h-48 flex-shrink-0">
                        <img src="${property.images[0]}" alt="${property.name}" class="w-full h-full object-cover">
                    </div>
                    <div class="flex-1 p-6">
                        <div class="flex items-start justify-between mb-3">
                            <div>
                                <h3 class="text-xl font-semibold text-slate mb-1">${property.name}</h3>
                                <p class="text-sm text-concrete flex items-center">
                                    <i class="fa-solid fa-location-dot mr-1"></i>
                                    ${property.address}
                                </p>
                            </div>
                            <span class="px-3 py-1 ${statusBgClass} ${statusTextClass} text-xs font-medium rounded-full">${property.status}</span>
                        </div>
                        
                        <div class="grid grid-cols-4 gap-4 mb-4">
                            <div>
                                <p class="text-xs text-concrete mb-1">Total Area</p>
                                <p class="text-sm font-semibold text-slate">${property.totalArea.toLocaleString()} sqft</p>
                            </div>
                            <div>
                                <p class="text-xs text-concrete mb-1">Units</p>
                                <p class="text-sm font-semibold text-slate">${property.occupiedUnits}/${property.totalUnits} occupied</p>
                            </div>
                            <div>
                                <p class="text-xs text-concrete mb-1">Price</p>
                                <p class="text-sm font-semibold text-slate">£${property.pricePerSqFt}/sqft/yr</p>
                            </div>
                            <div>
                                <p class="text-xs text-concrete mb-1">Annual Revenue</p>
                                <p class="text-sm font-semibold text-slate">£${property.annualRevenue.toLocaleString()}k</p>
                            </div>
                        </div>
                        
                        <div class="mb-4">
                            <div class="flex items-center justify-between text-xs text-concrete mb-1">
                                <span>Occupancy Rate</span>
                                <span class="font-semibold">${property.occupancyRate}%</span>
                            </div>
                            <div class="w-full bg-stone rounded-full h-2">
                                <div class="${occupancyBgClass} h-2 rounded-full" style="width: ${property.occupancyRate}%"></div>
                            </div>
                        </div>
                        
                        <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-4 text-xs text-concrete">
                                <span><i class="fa-solid fa-building mr-1"></i>${property.type}</span>
                                <span><i class="fa-solid fa-layer-group mr-1"></i>${property.floors} floors</span>
                                <span><i class="fa-solid fa-calendar mr-1"></i>Built ${property.builtYear}</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <button onclick="viewPropertyDetail('${property.id}')" class="px-4 py-2 bg-slate text-white rounded-lg text-xs hover:bg-opacity-90 transition-colors">
                                    <i class="fa-solid fa-eye mr-1"></i> View Details
                                </button>
                                <button onclick="editProperty('${property.id}')" class="px-4 py-2 border border-stone text-slate rounded-lg text-xs hover:bg-stone transition-colors">
                                    <i class="fa-solid fa-edit mr-1"></i> Edit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    // Attach click handlers to property cards
    attachPropertyCardClickHandlers();
}

// Navigate to property detail page
function viewPropertyDetail(propertyId) {
    console.log('Viewing property detail:', propertyId);
    
    // Store the property ID for the detail page
    sessionStorage.setItem('currentPropertyId', propertyId);
    
    // Navigate to property detail page
    if (typeof navigateToPage === 'function') {
        navigateToPage('property-detail');
    } else {
        console.error('navigateToPage function not found');
    }
}

// Edit property (placeholder)
function editProperty(propertyId) {
    console.log('Editing property:', propertyId);
    // TODO: Open edit property modal
    alert('Edit property functionality coming soon!');
}

// Reset all filters
function resetFilters() {
    currentFilters = {
        search: '',
        location: '',
        type: '',
        availability: '',
        size: ''
    };
    currentSort = 'name-asc';
    
    // Reset form inputs
    const searchInput = document.getElementById('property-search');
    const locationFilter = document.getElementById('filter-location');
    const typeFilter = document.getElementById('filter-sector');
    const availabilityFilter = document.getElementById('filter-availability');
    const sizeFilter = document.getElementById('filter-size');
    const sortSelect = document.getElementById('property-sort');
    
    if (searchInput) searchInput.value = '';
    if (locationFilter) locationFilter.value = '';
    if (typeFilter) typeFilter.value = '';
    if (availabilityFilter) availabilityFilter.value = '';
    if (sizeFilter) sizeFilter.value = '';
    if (sortSelect) sortSelect.value = 'name-asc';
    
    applyFiltersAndSort();
}

// Attach click handlers to property cards
function attachPropertyCardClickHandlers() {
    const propertyCards = document.querySelectorAll('.property-card');
    propertyCards.forEach(card => {
        // Remove existing click handler to avoid duplicates
        card.replaceWith(card.cloneNode(true));
    });
    
    // Re-select cards after cloning
    const freshCards = document.querySelectorAll('.property-card');
    freshCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on a button
            if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
                return;
            }
            
            const propertyId = this.dataset.propertyId;
            if (propertyId && typeof viewPropertyDetail === 'function') {
                viewPropertyDetail(propertyId);
            }
        });
    });
}

// Function to reset initialization state (called when navigating away)
function resetPropertyIndex() {
    isInitialized = false;
    filteredProperties = [];
    console.log('Property Index reset');
}

// Export functions for global access
window.initializePropertyIndex = initializePropertyIndex;
window.resetPropertyIndex = resetPropertyIndex;
window.viewPropertyDetail = viewPropertyDetail;
window.editProperty = editProperty;
window.resetFilters = resetFilters;
window.switchView = switchView;
window.attachPropertyCardClickHandlers = attachPropertyCardClickHandlers;

console.log('Property Index JavaScript loaded');
