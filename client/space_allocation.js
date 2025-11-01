// Space Allocation Dashboard JavaScript
// Calculates portfolio-wide metrics and visualizations

let sharedCalendarDate = new Date();
let selectedProperty = 'all';

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const spaceAllocationPage = document.getElementById('space-allocation-page');
    if (spaceAllocationPage && !spaceAllocationPage.classList.contains('hidden')) {
        initializeSpaceAllocation();
    }
});

// Also initialize when navigating to page
document.addEventListener('pageNavigated', function(e) {
    if (e.detail && e.detail.pageId === 'space-allocation') {
        initializeSpaceAllocation();
    }
});

function initializeSpaceAllocation() {
    console.log('Initializing Space Allocation Dashboard');
    
    if (typeof propertiesData === 'undefined') {
        console.error('propertiesData not loaded');
        return;
    }
    
    // Calculate portfolio metrics
    calculatePortfolioMetrics();
    
    // Populate all sections
    populateBuildingSelector();
    populateBuildingVisualization();
    populateCapacityAlerts();
    populateCapacityChart();
    populateTenantTypeChart();
    populateSharedSpaceBooking();
    populateFuturePlanning();
    populateSpaceBreakdownTable();
    
    // Setup event listeners
    setupEventListeners();
}

function calculatePortfolioMetrics() {
    // Calculate totals across all properties
    const totalSpace = propertiesData.reduce((sum, prop) => sum + prop.totalArea, 0);
    const totalUnits = propertiesData.reduce((sum, prop) => sum + prop.totalUnits, 0);
    const occupiedUnits = propertiesData.reduce((sum, prop) => sum + prop.occupiedUnits, 0);
    const availableUnits = totalUnits - occupiedUnits;
    
    // Calculate occupied space (approximate based on occupancy rate)
    const occupiedSpace = propertiesData.reduce((sum, prop) => {
        return sum + (prop.totalArea * (prop.occupancyRate / 100));
    }, 0);
    
    const availableSpace = totalSpace - occupiedSpace;
    const occupancyPercentage = ((occupiedSpace / totalSpace) * 100).toFixed(1);
    
    // Count unique tenants
    const allTenants = new Set();
    propertiesData.forEach(prop => {
        prop.units.forEach(unit => {
            if (unit.tenant && unit.tenant !== '-') {
                allTenants.add(unit.tenant);
            }
        });
    });
    
    // Update KPIs
    document.getElementById('total-space').textContent = totalSpace.toLocaleString();
    document.getElementById('total-properties').textContent = propertiesData.length;
    document.getElementById('occupied-space').textContent = Math.round(occupiedSpace).toLocaleString();
    document.getElementById('occupancy-percentage').textContent = occupancyPercentage;
    document.getElementById('available-space').textContent = Math.round(availableSpace).toLocaleString();
    document.getElementById('available-units').textContent = availableUnits;
    document.getElementById('total-tenants').textContent = allTenants.size;
    document.getElementById('utilization-rate').textContent = occupancyPercentage;
}

function populateBuildingSelector() {
    const selector = document.getElementById('building-selector');
    
    // Add all properties to selector
    propertiesData.forEach(prop => {
        const option = document.createElement('option');
        option.value = prop.id;
        option.textContent = prop.name;
        selector.appendChild(option);
    });
}

function populateBuildingVisualization() {
    const container = document.getElementById('building-floors');
    
    if (selectedProperty === 'all') {
        // Show summary for all properties
        container.innerHTML = propertiesData.slice(0, 5).map(prop => {
            const occupiedPercentage = prop.occupancyRate;
            const availablePercentage = 100 - occupiedPercentage;
            
            return `
                <div class="border border-stone rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow" onclick="viewPropertyDetail('${prop.id}')">
                    <div class="flex items-center justify-between mb-3">
                        <div>
                            <p class="font-medium text-slate">${prop.name}</p>
                            <p class="text-xs text-concrete">${prop.location} • ${prop.floors} floors</p>
                        </div>
                        <span class="text-sm font-medium text-slate">${prop.occupancyRate}%</span>
                    </div>
                    <div class="flex gap-1 h-6 rounded overflow-hidden">
                        <div class="bg-success" style="width: ${occupiedPercentage}%" title="Occupied: ${occupiedPercentage}%"></div>
                        <div class="bg-stone" style="width: ${availablePercentage}%" title="Available: ${availablePercentage}%"></div>
                    </div>
                    <div class="flex items-center justify-between mt-2 text-xs">
                        <span class="text-concrete">
                            <i class="fa-solid fa-circle text-success mr-1"></i>
                            ${prop.occupiedUnits} occupied
                        </span>
                        <span class="text-concrete">
                            <i class="fa-solid fa-circle text-stone mr-1"></i>
                            ${prop.totalUnits - prop.occupiedUnits} available
                        </span>
                    </div>
                </div>
            `;
        }).join('');
        
        if (propertiesData.length > 5) {
            container.innerHTML += `
                <div class="text-center py-4">
                    <button class="text-sm text-slate hover:underline">
                        View all ${propertiesData.length} properties
                    </button>
                </div>
            `;
        }
    } else {
        // Show detailed floor breakdown for selected property
        const property = propertiesData.find(p => p.id === selectedProperty);
        if (property) {
            // Generate floor visualization
            const floorsHTML = [];
            for (let floor = property.floors; floor >= 1; floor--) {
                const floorUnits = property.units.filter(u => u.floor.includes(floor.toString()));
                const occupiedUnits = floorUnits.filter(u => u.status === 'Occupied').length;
                const totalFloorUnits = floorUnits.length || 1;
                const occupancyRate = ((occupiedUnits / totalFloorUnits) * 100).toFixed(0);
                
                floorsHTML.push(`
                    <div class="border border-stone rounded-lg p-3">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-sm font-medium text-slate">Floor ${floor}</span>
                            <span class="text-xs text-concrete">${occupiedUnits}/${totalFloorUnits} units</span>
                        </div>
                        <div class="flex gap-1 h-4 rounded overflow-hidden">
                            <div class="bg-success" style="width: ${occupancyRate}%"></div>
                            <div class="bg-stone" style="width: ${100 - occupancyRate}%"></div>
                        </div>
                    </div>
                `);
            }
            container.innerHTML = floorsHTML.join('');
        }
    }
}

function populateCapacityAlerts() {
    const container = document.getElementById('capacity-alerts');
    const alerts = [];
    
    // Check for high occupancy (>95%)
    propertiesData.forEach(prop => {
        if (prop.occupancyRate > 95) {
            alerts.push({
                type: 'danger',
                icon: 'fa-exclamation-triangle',
                title: 'Near Capacity',
                message: `${prop.name} is at ${prop.occupancyRate}% occupancy`,
                property: prop.name
            });
        } else if (prop.occupancyRate > 90) {
            alerts.push({
                type: 'warning',
                icon: 'fa-exclamation-circle',
                title: 'High Occupancy',
                message: `${prop.name} is at ${prop.occupancyRate}% occupancy`,
                property: prop.name
            });
        }
    });
    
    // Check for low occupancy (<75%)
    propertiesData.forEach(prop => {
        if (prop.occupancyRate < 75) {
            alerts.push({
                type: 'info',
                icon: 'fa-info-circle',
                title: 'Low Occupancy',
                message: `${prop.name} has ${prop.totalUnits - prop.occupiedUnits} vacant units`,
                property: prop.name
            });
        }
    });
    
    // Check for upcoming lease expirations
    const upcomingExpirations = [];
    propertiesData.forEach(prop => {
        prop.units.forEach(unit => {
            if (unit.leaseEnd && unit.status === 'Occupied') {
                upcomingExpirations.push({
                    property: prop.name,
                    unit: unit.unitId,
                    tenant: unit.tenant,
                    date: unit.leaseEnd
                });
            }
        });
    });
    
    if (upcomingExpirations.length > 0) {
        alerts.push({
            type: 'warning',
            icon: 'fa-calendar-times',
            title: 'Upcoming Expirations',
            message: `${upcomingExpirations.length} leases expiring in next 6 months`,
            property: 'Multiple properties'
        });
    }
    
    // Render alerts
    if (alerts.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8">
                <i class="fa-solid fa-check-circle text-success text-3xl mb-2"></i>
                <p class="text-sm text-concrete">No capacity alerts</p>
                <p class="text-xs text-concrete mt-1">All properties within optimal range</p>
            </div>
        `;
    } else {
        const colorMap = {
            'danger': 'bg-danger bg-opacity-10 text-danger border-danger',
            'warning': 'bg-warning bg-opacity-10 text-warning border-warning',
            'info': 'bg-info bg-opacity-10 text-info border-info'
        };
        
        container.innerHTML = alerts.map(alert => `
            <div class="border-l-4 ${colorMap[alert.type]} p-3 rounded">
                <div class="flex items-start">
                    <i class="fa-solid ${alert.icon} mt-1 mr-2"></i>
                    <div class="flex-1">
                        <p class="text-sm font-medium">${alert.title}</p>
                        <p class="text-xs mt-1">${alert.message}</p>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function populateCapacityChart() {
    const container = document.getElementById('capacity-chart');
    
    // Sort properties by occupancy rate
    const sortedProperties = [...propertiesData].sort((a, b) => b.occupancyRate - a.occupancyRate);
    
    container.innerHTML = sortedProperties.map(prop => {
        const color = prop.occupancyRate > 90 ? 'bg-success' : 
                     prop.occupancyRate > 75 ? 'bg-info' : 'bg-warning';
        
        return `
            <div class="mb-3">
                <div class="flex items-center justify-between mb-1">
                    <span class="text-sm text-slate">${prop.name}</span>
                    <span class="text-sm font-medium text-slate">${prop.occupancyRate}%</span>
                </div>
                <div class="w-full bg-stone rounded-full h-3">
                    <div class="${color} h-3 rounded-full transition-all" style="width: ${prop.occupancyRate}%"></div>
                </div>
                <div class="flex items-center justify-between mt-1 text-xs text-concrete">
                    <span>${prop.occupiedUnits} / ${prop.totalUnits} units</span>
                    <span>${Math.round(prop.totalArea * (prop.occupancyRate / 100)).toLocaleString()} sqft</span>
                </div>
            </div>
        `;
    }).join('');
}

function populateTenantTypeChart() {
    const container = document.getElementById('tenant-type-chart');
    
    // Categorize tenants by industry (simplified)
    const tenantTypes = {
        'Tech': 0,
        'Finance': 0,
        'Professional Services': 0,
        'Creative': 0,
        'Other': 0
    };
    
    // Categorize based on tenant names (simplified logic)
    propertiesData.forEach(prop => {
        prop.units.forEach(unit => {
            if (unit.tenant && unit.tenant !== '-') {
                const tenant = unit.tenant.toLowerCase();
                if (tenant.includes('tech') || tenant.includes('digital') || tenant.includes('software')) {
                    tenantTypes['Tech'] += unit.size;
                } else if (tenant.includes('capital') || tenant.includes('finance') || tenant.includes('investment')) {
                    tenantTypes['Finance'] += unit.size;
                } else if (tenant.includes('consulting') || tenant.includes('law') || tenant.includes('advisory')) {
                    tenantTypes['Professional Services'] += unit.size;
                } else if (tenant.includes('media') || tenant.includes('design') || tenant.includes('creative')) {
                    tenantTypes['Creative'] += unit.size;
                } else {
                    tenantTypes['Other'] += unit.size;
                }
            }
        });
    });
    
    const total = Object.values(tenantTypes).reduce((sum, val) => sum + val, 0);
    const colors = ['bg-success', 'bg-info', 'bg-warning', 'bg-danger', 'bg-concrete'];
    
    // Create horizontal bar chart representation
    container.innerHTML = `
        <div class="space-y-3">
            ${Object.entries(tenantTypes).map(([type, space], index) => {
                const percentage = total > 0 ? ((space / total) * 100).toFixed(1) : 0;
                return `
                    <div>
                        <div class="flex items-center justify-between mb-1">
                            <span class="text-sm text-slate">${type}</span>
                            <span class="text-sm font-medium text-slate">${percentage}%</span>
                        </div>
                        <div class="w-full bg-stone rounded-full h-3">
                            <div class="${colors[index]} h-3 rounded-full" style="width: ${percentage}%"></div>
                        </div>
                        <p class="text-xs text-concrete mt-1">${space.toLocaleString()} sqft</p>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function populateSharedSpaceBooking() {
    // Generate calendar
    generateSharedCalendar();
    
    // Generate sample bookings
    const bookingsContainer = document.getElementById('upcoming-bookings');
    const sampleBookings = [
        { space: 'Conference Room A', property: 'Canary Wharf Tower', date: 'Today, 2:00 PM', duration: '2 hours' },
        { space: 'Meeting Room 3', property: 'Shoreditch Studios', date: 'Tomorrow, 10:00 AM', duration: '1 hour' },
        { space: 'Event Space', property: 'King\'s Cross Hub', date: 'Friday, 3:00 PM', duration: '3 hours' }
    ];
    
    bookingsContainer.innerHTML = sampleBookings.map(booking => `
        <div class="flex items-start text-xs border-l-2 border-info pl-2">
            <div class="flex-1">
                <p class="font-medium text-slate">${booking.space}</p>
                <p class="text-concrete">${booking.property}</p>
                <p class="text-concrete mt-1">${booking.date} • ${booking.duration}</p>
            </div>
        </div>
    `).join('');
}

function generateSharedCalendar() {
    const monthYear = document.getElementById('shared-calendar-month');
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                        'July', 'August', 'September', 'October', 'November', 'December'];
    
    monthYear.textContent = `${monthNames[sharedCalendarDate.getMonth()]} ${sharedCalendarDate.getFullYear()}`;
    
    const grid = document.getElementById('shared-calendar-grid');
    const firstDay = new Date(sharedCalendarDate.getFullYear(), sharedCalendarDate.getMonth(), 1);
    const lastDay = new Date(sharedCalendarDate.getFullYear(), sharedCalendarDate.getMonth() + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    let daysHTML = '';
    
    // Empty cells before first day
    for (let i = 0; i < startingDayOfWeek; i++) {
        daysHTML += '<div class="h-8"></div>';
    }
    
    // Calendar days
    for (let day = 1; day <= daysInMonth; day++) {
        const hasBooking = Math.random() > 0.7; // Random bookings for demo
        const bgColor = hasBooking ? 'bg-info bg-opacity-20' : 'hover:bg-stone';
        
        daysHTML += `
            <div class="h-8 rounded flex items-center justify-center ${bgColor} cursor-pointer transition-colors">
                <span class="text-xs text-slate">${day}</span>
            </div>
        `;
    }
    
    grid.innerHTML = daysHTML;
}

function populateFuturePlanning() {
    // Calculate pipeline impact (simulated)
    const pipelineDeals = 8; // Simulated number of deals
    const avgDealSize = 2500; // Average sqft per deal
    const pipelineSpaceNeeded = pipelineDeals * avgDealSize;
    
    const totalSpace = propertiesData.reduce((sum, prop) => sum + prop.totalArea, 0);
    const occupiedSpace = propertiesData.reduce((sum, prop) => {
        return sum + (prop.totalArea * (prop.occupancyRate / 100));
    }, 0);
    const availableSpace = totalSpace - occupiedSpace;
    
    const pipelinePercentage = ((pipelineSpaceNeeded / availableSpace) * 100).toFixed(1);
    
    document.getElementById('pipeline-space-needed').textContent = pipelineSpaceNeeded.toLocaleString();
    document.getElementById('pipeline-deals-count').textContent = pipelineDeals;
    document.getElementById('pipeline-capacity-bar').style.width = Math.min(pipelinePercentage, 100) + '%';
    
    // Generate 6-month forecast
    const forecastContainer = document.getElementById('capacity-forecast');
    const months = ['Feb 2024', 'Mar 2024', 'Apr 2024', 'May 2024', 'Jun 2024', 'Jul 2024'];
    const currentOccupancy = ((occupiedSpace / totalSpace) * 100).toFixed(1);
    
    forecastContainer.innerHTML = months.map((month, index) => {
        const projectedOccupancy = Math.min(parseFloat(currentOccupancy) + (index * 2), 95);
        const color = projectedOccupancy > 90 ? 'text-warning' : 'text-success';
        
        return `
            <div class="flex items-center justify-between text-xs">
                <span class="text-concrete">${month}</span>
                <span class="font-medium ${color}">${projectedOccupancy.toFixed(1)}%</span>
            </div>
        `;
    }).join('');
    
    // Generate recommendations
    const recommendationsContainer = document.getElementById('capacity-recommendations');
    const recommendations = [];
    
    if (pipelinePercentage > 80) {
        recommendations.push('Consider acquiring additional properties to meet pipeline demand');
    }
    
    const lowOccupancyProps = propertiesData.filter(p => p.occupancyRate < 75);
    if (lowOccupancyProps.length > 0) {
        recommendations.push(`Focus marketing efforts on ${lowOccupancyProps.length} properties with low occupancy`);
    }
    
    const highOccupancyProps = propertiesData.filter(p => p.occupancyRate > 95);
    if (highOccupancyProps.length > 0) {
        recommendations.push(`${highOccupancyProps.length} properties near capacity - prepare expansion plans`);
    }
    
    recommendations.push('Maintain 10-15% buffer capacity for flexibility');
    
    recommendationsContainer.innerHTML = recommendations.map(rec => `<li>${rec}</li>`).join('');
}

function populateSpaceBreakdownTable() {
    const tableBody = document.getElementById('space-breakdown-table');
    
    tableBody.innerHTML = propertiesData.map(prop => {
        const occupiedSpace = Math.round(prop.totalArea * (prop.occupancyRate / 100));
        const availableSpace = prop.totalArea - occupiedSpace;
        const tenantCount = prop.units.filter(u => u.tenant && u.tenant !== '-').length;
        
        const statusColor = prop.occupancyRate > 90 ? 'bg-success bg-opacity-10 text-success' :
                           prop.occupancyRate > 75 ? 'bg-info bg-opacity-10 text-info' :
                           'bg-warning bg-opacity-10 text-warning';
        
        return `
            <tr class="hover:bg-stone transition-colors cursor-pointer" onclick="viewPropertyDetail('${prop.id}')">
                <td class="px-4 py-3 text-sm font-medium text-slate">${prop.name}</td>
                <td class="px-4 py-3 text-sm text-concrete">${prop.location}</td>
                <td class="px-4 py-3 text-sm text-concrete">${prop.totalArea.toLocaleString()} sqft</td>
                <td class="px-4 py-3 text-sm text-concrete">${occupiedSpace.toLocaleString()} sqft</td>
                <td class="px-4 py-3 text-sm text-concrete">${availableSpace.toLocaleString()} sqft</td>
                <td class="px-4 py-3">
                    <span class="px-2 py-1 rounded-full text-xs font-medium ${statusColor}">
                        ${prop.occupancyRate}%
                    </span>
                </td>
                <td class="px-4 py-3 text-sm text-concrete">${tenantCount}</td>
                <td class="px-4 py-3 text-sm text-concrete">${prop.status}</td>
            </tr>
        `;
    }).join('');
}

function setupEventListeners() {
    // Building selector
    const buildingSelector = document.getElementById('building-selector');
    if (buildingSelector) {
        buildingSelector.addEventListener('change', function() {
            selectedProperty = this.value;
            populateBuildingVisualization();
        });
    }
    
    // Shared calendar navigation
    const prevBtn = document.getElementById('shared-calendar-prev');
    const nextBtn = document.getElementById('shared-calendar-next');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            sharedCalendarDate.setMonth(sharedCalendarDate.getMonth() - 1);
            generateSharedCalendar();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            sharedCalendarDate.setMonth(sharedCalendarDate.getMonth() + 1);
            generateSharedCalendar();
        });
    }
}

// Export functions
window.initializeSpaceAllocation = initializeSpaceAllocation;

console.log('Space Allocation Dashboard JavaScript loaded');
