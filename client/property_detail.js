// Property Detail JavaScript - Comprehensive Functionality
// Handles tab switching, data loading, and dynamic content population

// Global state - using window object to avoid redeclaration errors
window.propertyDetailState = window.propertyDetailState || {
    currentProperty: null,
    currentCalendarDate: new Date()
};

// Shorthand references for easier access
let currentProperty = window.propertyDetailState.currentProperty;
let currentCalendarDate = window.propertyDetailState.currentCalendarDate;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the property detail page
    const propertyDetailPage = document.getElementById('property-detail-page');
    if (propertyDetailPage && !propertyDetailPage.classList.contains('hidden')) {
        initializePropertyDetail();
    }
});

// Also initialize when navigating to property detail page
document.addEventListener('pageNavigated', function(e) {
    if (e.detail && e.detail.pageId === 'property-detail') {
        initializePropertyDetail();
    }
});

function initializePropertyDetail() {
    console.log('Initializing Property Detail page');
    
    // Load property data
    loadPropertyData();
    
    // Setup tab switching
    setupTabSwitching();
    
    // Setup event listeners
    setupEventListeners();
}

function loadPropertyData() {
    // Get property ID from sessionStorage
    const propertyId = sessionStorage.getItem('currentPropertyId');
    
    if (!propertyId) {
        console.error('No property ID found in sessionStorage');
        return;
    }
    
    // Find property in propertiesData
    if (typeof propertiesData === 'undefined') {
        console.error('propertiesData not loaded');
        return;
    }
    
    currentProperty = propertiesData.find(p => p.id === propertyId);
    
    if (!currentProperty) {
        console.error('Property not found:', propertyId);
        return;
    }
    
    console.log('Loaded property:', currentProperty);
    
    // Populate all sections
    populateHeader();
    populateMetrics();
    populateOverviewTab();
    populateUnitsTab();
    populateAvailabilityTab();
    populatePerformanceTab();
    populateDocumentsTab();
    populateMarketingTab();
}

function populateHeader() {
    if (!currentProperty) return;
    
    // Update header
    document.getElementById('property-detail-name').textContent = currentProperty.name;
    document.getElementById('property-detail-address').textContent = currentProperty.address;
    document.getElementById('property-detail-sector').textContent = currentProperty.type;
    document.getElementById('property-detail-size').textContent = currentProperty.totalArea.toLocaleString();
    document.getElementById('property-detail-rent').textContent = currentProperty.pricePerSqFt;
    
    // Update status badge
    const statusBadge = document.getElementById('property-detail-status-badge');
    statusBadge.textContent = currentProperty.status;
    statusBadge.className = 'px-3 py-1 rounded-full text-xs font-medium';
    
    if (currentProperty.status === 'Fully Let') {
        statusBadge.classList.add('bg-success', 'bg-opacity-10', 'text-success');
    } else {
        statusBadge.classList.add('bg-info', 'bg-opacity-10', 'text-info');
    }
    
    // Update breadcrumb
    document.getElementById('property-detail-breadcrumb').textContent = currentProperty.name;
}

function populateMetrics() {
    if (!currentProperty) return;
    
    document.getElementById('property-detail-id').textContent = currentProperty.id;
    document.getElementById('property-detail-occupancy').textContent = currentProperty.occupancyRate;
    document.getElementById('property-detail-revenue').textContent = currentProperty.annualRevenue.toLocaleString();
    document.getElementById('property-detail-units-count').textContent = currentProperty.totalUnits;
}

function populateOverviewTab() {
    if (!currentProperty) return;
    
    // Image Gallery
    const gallery = document.getElementById('property-image-gallery');
    gallery.innerHTML = currentProperty.images.map((img, index) => `
        <div class="relative group cursor-pointer overflow-hidden rounded-lg" onclick="openLightbox(${index})">
            <img src="${img}" alt="${currentProperty.name}" class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300">
            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity"></div>
        </div>
    `).join('');
    
    // Description
    document.getElementById('property-detail-description').textContent = currentProperty.description;
    
    // Specifications
    document.getElementById('property-spec-address').textContent = currentProperty.address;
    document.getElementById('property-spec-type').textContent = currentProperty.type;
    document.getElementById('property-spec-area').textContent = `${currentProperty.totalArea.toLocaleString()} sqft`;
    document.getElementById('property-spec-floors').textContent = currentProperty.floors;
    document.getElementById('property-spec-built').textContent = currentProperty.builtYear;
    document.getElementById('property-spec-location').textContent = currentProperty.location;
    
    // Amenities
    const amenitiesList = document.getElementById('property-amenities-list');
    amenitiesList.innerHTML = currentProperty.amenities.map(amenity => `
        <div class="flex items-center text-sm">
            <i class="fa-solid fa-check-circle text-success mr-2"></i>
            <span class="text-slate">${amenity}</span>
        </div>
    `).join('');
    
    // Map address
    document.getElementById('property-map-address').textContent = currentProperty.address;
}

function populateUnitsTab() {
    if (!currentProperty) return;
    
    // Occupancy summary
    document.getElementById('units-occupied-count').textContent = currentProperty.occupiedUnits;
    document.getElementById('units-total-count').textContent = currentProperty.totalUnits;
    document.getElementById('units-occupancy-rate').textContent = currentProperty.occupancyRate;
    
    // Units table
    const tableBody = document.getElementById('units-table-body');
    tableBody.innerHTML = currentProperty.units.map(unit => {
        const statusColors = {
            'Occupied': 'bg-success bg-opacity-10 text-success',
            'Available': 'bg-info bg-opacity-10 text-info',
            'Reserved': 'bg-warning bg-opacity-10 text-warning',
            'Maintenance': 'bg-danger bg-opacity-10 text-danger'
        };
        
        return `
            <tr class="hover:bg-stone transition-colors">
                <td class="px-4 py-3 text-sm font-medium text-slate">${unit.unitId}</td>
                <td class="px-4 py-3 text-sm text-concrete">${unit.floor}</td>
                <td class="px-4 py-3 text-sm text-concrete">${unit.size.toLocaleString()}</td>
                <td class="px-4 py-3">
                    <span class="px-2 py-1 rounded-full text-xs font-medium ${statusColors[unit.status] || 'bg-stone text-concrete'}">
                        ${unit.status}
                    </span>
                </td>
                <td class="px-4 py-3 text-sm text-concrete">${unit.tenant || '-'}</td>
                <td class="px-4 py-3 text-sm text-concrete">${unit.annualRent ? '£' + unit.annualRent.toLocaleString() + 'k' : '-'}</td>
                <td class="px-4 py-3 text-sm text-concrete">${unit.leaseEnd || '-'}</td>
                <td class="px-4 py-3">
                    <button class="text-slate hover:text-info text-sm">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function populateAvailabilityTab() {
    if (!currentProperty) return;
    
    // Generate calendar
    generateCalendar();
    
    // Upcoming availability
    const upcomingList = document.getElementById('upcoming-availability-list');
    const upcomingUnits = currentProperty.units.filter(u => u.status === 'Occupied' && u.leaseEnd);
    
    if (upcomingUnits.length === 0) {
        upcomingList.innerHTML = '<p class="text-sm text-concrete">No upcoming availability</p>';
    } else {
        upcomingList.innerHTML = upcomingUnits.slice(0, 5).map(unit => `
            <div class="p-3 border border-stone rounded-lg">
                <div class="flex items-center justify-between mb-1">
                    <span class="text-sm font-medium text-slate">${unit.unitId}</span>
                    <span class="text-xs text-concrete">${unit.size.toLocaleString()} sqft</span>
                </div>
                <p class="text-xs text-concrete mb-1">${unit.tenant}</p>
                <p class="text-xs text-warning">Lease ends: ${unit.leaseEnd}</p>
            </div>
        `).join('');
    }
}

function generateCalendar() {
    const monthYear = document.getElementById('calendar-month-year');
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                        'July', 'August', 'September', 'October', 'November', 'December'];
    
    monthYear.textContent = `${monthNames[currentCalendarDate.getMonth()]} ${currentCalendarDate.getFullYear()}`;
    
    // Generate calendar days (simplified placeholder)
    const daysGrid = document.getElementById('calendar-days-grid');
    const firstDay = new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth(), 1);
    const lastDay = new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth() + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    let daysHTML = '';
    
    // Empty cells before first day
    for (let i = 0; i < startingDayOfWeek; i++) {
        daysHTML += '<div class="h-12"></div>';
    }
    
    // Calendar days
    for (let day = 1; day <= daysInMonth; day++) {
        // Random status for demo (in real app, would be based on unit availability)
        const statuses = ['bg-success', 'bg-info', 'bg-warning'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        daysHTML += `
            <div class="h-12 border border-stone rounded-lg flex items-center justify-center ${randomStatus} bg-opacity-20 hover:bg-opacity-40 cursor-pointer transition-colors">
                <span class="text-sm font-medium text-slate">${day}</span>
            </div>
        `;
    }
    
    daysGrid.innerHTML = daysHTML;
}

function populatePerformanceTab() {
    if (!currentProperty) return;
    
    // KPIs
    document.getElementById('perf-total-revenue').textContent = currentProperty.annualRevenue.toLocaleString();
    document.getElementById('perf-occupancy-rate').textContent = currentProperty.occupancyRate;
    document.getElementById('perf-avg-rent').textContent = currentProperty.pricePerSqFt;
    
    // Tenant satisfaction (placeholder)
    document.getElementById('perf-satisfaction').textContent = '4.5';
    
    // Generate charts
    createRevenueTrendChart();
    createOccupancyTrendChart();
}

function populateDocumentsTab() {
    if (!currentProperty) return;
    
    const documentsList = document.getElementById('property-documents-list');
    
    if (!currentProperty.documents || currentProperty.documents.length === 0) {
        documentsList.innerHTML = '<p class="text-sm text-concrete">No documents available</p>';
        return;
    }
    
    const iconMap = {
        'Floor Plans': 'fa-file-image',
        'EPC Certificate': 'fa-file-pdf',
        'Insurance': 'fa-file-pdf',
        'Photos': 'fa-images',
        'Marketing Materials': 'fa-file-powerpoint'
    };
    
    documentsList.innerHTML = currentProperty.documents.map(doc => `
        <div class="flex items-center justify-between p-4 border border-stone rounded-lg hover:bg-stone transition-colors cursor-pointer">
            <div class="flex items-center">
                <i class="fa-solid ${iconMap[doc.name] || 'fa-file'} text-info text-2xl mr-4"></i>
                <div>
                    <p class="text-slate font-medium">${doc.name}</p>
                    <p class="text-sm text-concrete">${doc.size} • ${doc.date}</p>
                </div>
            </div>
            <button class="text-concrete hover:text-slate">
                <i class="fa-solid fa-download"></i>
            </button>
        </div>
    `).join('');
}

function populateMarketingTab() {
    if (!currentProperty) return;
    
    // Marketing status
    const toggle = document.getElementById('marketing-active-toggle');
    const statusText = document.getElementById('marketing-status-text');
    
    if (currentProperty.marketing && currentProperty.marketing.active) {
        toggle.checked = true;
        statusText.textContent = 'Active';
    } else {
        toggle.checked = false;
        statusText.textContent = 'Inactive';
    }
    
    // Platforms
    const platformsList = document.getElementById('marketing-platforms-list');
    if (currentProperty.marketing && currentProperty.marketing.platforms) {
        platformsList.innerHTML = currentProperty.marketing.platforms.map(platform => `
            <label class="flex items-center p-3 border border-stone rounded-lg hover:bg-stone cursor-pointer">
                <input type="checkbox" checked class="mr-3 w-4 h-4 text-slate rounded">
                <span class="text-sm text-slate">${platform}</span>
            </label>
        `).join('');
    }
    
    // Preview
    document.getElementById('marketing-preview-image').src = currentProperty.images[0];
    document.getElementById('marketing-preview-name').textContent = currentProperty.name;
    document.getElementById('marketing-preview-address').textContent = currentProperty.address;
    document.getElementById('marketing-preview-description').textContent = currentProperty.description.substring(0, 100) + '...';
    document.getElementById('marketing-preview-size').textContent = currentProperty.totalArea.toLocaleString();
    document.getElementById('marketing-preview-price').textContent = currentProperty.pricePerSqFt;
    
    // Performance metrics
    if (currentProperty.marketing) {
        document.getElementById('marketing-views').textContent = currentProperty.marketing.views || 0;
        document.getElementById('marketing-enquiries').textContent = currentProperty.marketing.enquiries || 0;
        const conversionRate = currentProperty.marketing.enquiries && currentProperty.marketing.views 
            ? ((currentProperty.marketing.enquiries / currentProperty.marketing.views) * 100).toFixed(1)
            : 0;
        document.getElementById('marketing-conversion').textContent = conversionRate;
    }
}

function setupTabSwitching() {
    const tabs = document.querySelectorAll('.property-detail-tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });
}

function switchTab(tabName) {
    // Update tab buttons
    const tabs = document.querySelectorAll('.property-detail-tab');
    tabs.forEach(tab => {
        if (tab.getAttribute('data-tab') === tabName) {
            tab.classList.remove('border-transparent', 'text-concrete');
            tab.classList.add('border-slate', 'text-slate');
        } else {
            tab.classList.remove('border-slate', 'text-slate');
            tab.classList.add('border-transparent', 'text-concrete');
        }
    });
    
    // Update tab panels
    const panels = document.querySelectorAll('.property-tab-panel');
    panels.forEach(panel => {
        if (panel.getAttribute('data-tab-panel') === tabName) {
            panel.classList.remove('hidden');
        } else {
            panel.classList.add('hidden');
        }
    });
}

function setupEventListeners() {
    // Calendar navigation
    const prevBtn = document.getElementById('calendar-prev-month');
    const nextBtn = document.getElementById('calendar-next-month');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
            generateCalendar();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
            generateCalendar();
        });
    }
    
    // Marketing toggle
    const marketingToggle = document.getElementById('marketing-active-toggle');
    if (marketingToggle) {
        marketingToggle.addEventListener('change', function() {
            const statusText = document.getElementById('marketing-status-text');
            statusText.textContent = this.checked ? 'Active' : 'Inactive';
        });
    }
}

// Lightbox functionality (placeholder)
function openLightbox(imageIndex) {
    console.log('Opening lightbox for image:', imageIndex);
    // TODO: Implement lightbox functionality
}

// Export functions
window.initializePropertyDetail = initializePropertyDetail;
window.switchTab = switchTab;

console.log('Property Detail JavaScript loaded');

// Chart.js instances (for cleanup)
let revenueChart = null;
let occupancyChart = null;

// Generate monthly revenue data with realistic variations
function generateRevenueData(annualRevenue) {
    const monthlyBase = annualRevenue / 12;
    const labels = [];
    const data = [];
    
    // Get last 12 months
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        labels.push(date.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' }));
        
        // Add ±5-10% variation for realism
        const variation = (Math.random() * 0.15 - 0.05); // -5% to +10%
        const monthlyRevenue = monthlyBase * (1 + variation);
        data.push(Math.round(monthlyRevenue / 1000)); // Convert to thousands
    }
    
    return { labels, data };
}

// Generate monthly occupancy data with realistic variations
function generateOccupancyData(currentOccupancy) {
    const labels = [];
    const data = [];
    
    // Get last 12 months
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        labels.push(date.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' }));
        
        // Add ±2-5% variation for realism
        const variation = (Math.random() * 0.07 - 0.02); // -2% to +5%
        let occupancy = currentOccupancy + variation;
        
        // Keep within realistic bounds (70-100%)
        occupancy = Math.max(70, Math.min(100, occupancy));
        data.push(Math.round(occupancy * 10) / 10); // Round to 1 decimal
    }
    
    return { labels, data };
}

// Create Revenue Trend Chart
function createRevenueTrendChart() {
    if (!currentProperty) return;
    
    // Destroy existing chart if it exists
    if (revenueChart) {
        revenueChart.destroy();
    }
    
    const ctx = document.getElementById('revenue-trend-chart');
    if (!ctx) return;
    
    const { labels, data } = generateRevenueData(currentProperty.annualRevenue);
    
    revenueChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Revenue (£k)',
                data: data,
                borderColor: '#10b981', // Green (success color)
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: '#10b981',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        font: {
                            family: 'Haltung, sans-serif',
                            size: 12
                        },
                        color: '#475569', // slate color
                        usePointStyle: true,
                        padding: 15
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)', // slate-900
                    titleFont: {
                        family: 'Haltung, sans-serif',
                        size: 13,
                        weight: 'bold'
                    },
                    bodyFont: {
                        family: 'Haltung, sans-serif',
                        size: 12
                    },
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return 'Revenue: £' + context.parsed.y.toLocaleString() + 'k';
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            family: 'Haltung, sans-serif',
                            size: 11
                        },
                        color: '#94a3b8' // concrete color
                    },
                    border: {
                        color: '#e2e8f0' // stone color
                    }
                },
                y: {
                    beginAtZero: false,
                    grid: {
                        color: '#f1f5f9', // stone-100
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            family: 'Haltung, sans-serif',
                            size: 11
                        },
                        color: '#94a3b8', // concrete color
                        callback: function(value) {
                            return '£' + value + 'k';
                        }
                    },
                    border: {
                        display: false
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

// Create Occupancy Trend Chart
function createOccupancyTrendChart() {
    if (!currentProperty) return;
    
    // Destroy existing chart if it exists
    if (occupancyChart) {
        occupancyChart.destroy();
    }
    
    const ctx = document.getElementById('occupancy-trend-chart');
    if (!ctx) return;
    
    const { labels, data } = generateOccupancyData(currentProperty.occupancyRate);
    
    occupancyChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Occupancy Rate (%)',
                data: data,
                borderColor: '#3b82f6', // Blue (info color)
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: '#3b82f6',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        font: {
                            family: 'Haltung, sans-serif',
                            size: 12
                        },
                        color: '#475569', // slate color
                        usePointStyle: true,
                        padding: 15
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)', // slate-900
                    titleFont: {
                        family: 'Haltung, sans-serif',
                        size: 13,
                        weight: 'bold'
                    },
                    bodyFont: {
                        family: 'Haltung, sans-serif',
                        size: 12
                    },
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return 'Occupancy: ' + context.parsed.y.toFixed(1) + '%';
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            family: 'Haltung, sans-serif',
                            size: 11
                        },
                        color: '#94a3b8' // concrete color
                    },
                    border: {
                        color: '#e2e8f0' // stone color
                    }
                },
                y: {
                    min: 70,
                    max: 100,
                    grid: {
                        color: '#f1f5f9', // stone-100
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            family: 'Haltung, sans-serif',
                            size: 11
                        },
                        color: '#94a3b8', // concrete color
                        callback: function(value) {
                            return value + '%';
                        },
                        stepSize: 5
                    },
                    border: {
                        display: false
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

console.log('Property Detail JavaScript with Chart.js loaded');
