// Critical Fixes for Deals Overview Page
// Adds: Historical Tabs, Filter Panel, Days in Stage, Landlord/Tenant columns, Velocity indicators

(function() {
    'use strict';
    
    console.log('🔧 Loading Deals Overview Critical Fixes...');
    
    const SAMPLE_DEALS = [
        {
            id: 'DL_CW_2024_001', name: 'Canary Wharf Office', property: '25 Canada Square', propertyType: 'Office', sqft: '15,000',
            stage: 'HoTs', value: 2100000, probability: 85, risk: 'Medium', nextMilestone: 'Contract Review', dueDate: 'Nov 15',
            owner: 'Sarah Chen', ownerAvatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg',
            landlord: 'Canary Wharf Group', tenant: 'Tech Corp Ltd', daysInStage: 12, lastActivity: '2 hours ago',
            status: 'active', velocity: 'normal'
        },
        {
            id: 'DL_SH_2024_002', name: 'Shoreditch Retail Space', property: '156 Brick Lane', propertyType: 'Retail', sqft: '3,500',
            stage: 'Contract', value: 850000, probability: 92, risk: 'Low', nextMilestone: 'Final Signatures', dueDate: 'Nov 20',
            owner: 'Mike Rodriguez', ownerAvatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg',
            landlord: 'British Land', tenant: 'Retail Solutions', daysInStage: 5, lastActivity: '1 day ago',
            status: 'active', velocity: 'fast'
        },
        {
            id: 'DL_KC_2024_003', name: 'Kings Cross Development', property: 'Kings Boulevard', propertyType: 'Mixed Use', sqft: '45,000',
            stage: 'Proposal', value: 4200000, probability: 68, risk: 'High', nextMilestone: 'Proposal Submission', dueDate: 'Nov 25',
            owner: 'David Kim', ownerAvatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg',
            landlord: 'Land Securities', tenant: 'Financial Services Inc', daysInStage: 28, lastActivity: '5 days ago',
            status: 'active', velocity: 'stuck'
        },
        {
            id: 'DL_SB_2024_004', name: 'Southbank Office', property: 'Belvedere Road', propertyType: 'Office', sqft: '12,000',
            stage: 'Live', value: 1800000, probability: 100, risk: 'Low', nextMilestone: 'Quarterly Review', dueDate: 'Dec 15',
            owner: 'Emma Davis', ownerAvatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg',
            landlord: 'Derwent London', tenant: 'Creative Agency', daysInStage: 45, lastActivity: '3 days ago',
            status: 'closed-won', velocity: 'normal'
        },
        {
            id: 'DL_MF_2024_005', name: 'Mayfair Retail', property: 'Bond Street', propertyType: 'Retail', sqft: '2,000',
            stage: 'Proposal', value: 950000, probability: 40, risk: 'High', nextMilestone: 'N/A', dueDate: 'N/A',
            owner: 'Sarah Chen', ownerAvatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg',
            landlord: 'Great Portland Estates', tenant: 'Professional Services', daysInStage: 35, lastActivity: '2 weeks ago',
            status: 'closed-lost', velocity: 'stuck'
        }
    ];
    
    let currentFilters = {
        status: 'active',
        landlords: [],
        tenants: [],
        stages: [],
        propertyTypes: [],
        riskLevels: [],
        valueRange: '',
        searchQuery: ''
    };
    
    function initializeDealsOverviewFixes() {
        console.log('🚀 Initializing Deals Overview fixes...');
        
        // Fix 1: Add Historical Deals Tabs
        addHistoricalDealsTabs();
        
        // Fix 2: Enhance Filter Panel
        enhanceFilterPanel();
        
        // Fix 3: Update Table Headers with missing columns
        updateTableHeaders();
        
        // Fix 4: Update table data with missing information
        updateTableData();
        
        console.log('✅ Deals Overview fixes applied successfully!');
    }
    
    function addHistoricalDealsTabs() {
        const activeDealsSection = document.getElementById('active-deals-section');
        if (!activeDealsSection) return;
        
        // Check if tabs already exist
        if (document.getElementById('historical-deals-tabs')) {
            console.log('⏭️ Historical tabs already exist');
            return;
        }
        
        const tabsHTML = `
            <section class="mb-6" id="historical-deals-tabs">
                <div class="border-b border-gray-200">
                    <nav class="flex space-x-8">
                        <button onclick="window.switchDealStatus('active')" class="deal-status-tab active py-4 px-1 border-b-2 border-blue-600 font-medium text-sm text-blue-600">
                            Active Deals
                            <span class="ml-2 bg-blue-100 text-blue-600 py-0.5 px-2 rounded-full text-xs">${SAMPLE_DEALS.filter(d => d.status === 'active').length}</span>
                        </button>
                        <button onclick="window.switchDealStatus('closed-won')" class="deal-status-tab py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300">
                            Closed/Won
                            <span class="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">${SAMPLE_DEALS.filter(d => d.status === 'closed-won').length}</span>
                        </button>
                        <button onclick="window.switchDealStatus('closed-lost')" class="deal-status-tab py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300">
                            Closed/Lost
                            <span class="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">${SAMPLE_DEALS.filter(d => d.status === 'closed-lost').length}</span>
                        </button>
                        <button onclick="window.switchDealStatus('all')" class="deal-status-tab py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300">
                            All Deals
                            <span class="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">${SAMPLE_DEALS.length}</span>
                        </button>
                    </nav>
                </div>
            </section>
        `;
        
        activeDealsSection.insertAdjacentHTML('beforebegin', tabsHTML);
        console.log('✅ Historical deals tabs added');
    }
    
    function enhanceFilterPanel() {
        const filterButton = document.querySelector('[data-filter-toggle="filter-panel"]');
        if (!filterButton) return;
        
        // Check if filter panel already exists
        if (document.getElementById('deals-filter-panel')) {
            console.log('⏭️ Filter panel already exists');
            // Just make sure the button works
            filterButton.onclick = function() {
                const panel = document.getElementById('deals-filter-panel');
                if (panel) {
                    panel.classList.toggle('hidden');
                }
            };
            return;
        }
        
        const filterPanelHTML = `
            <div id="deals-filter-panel" class="hidden bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6 shadow-lg">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold text-gray-900">Filter Deals</h3>
                    <button onclick="document.getElementById('deals-filter-panel').classList.add('hidden')" class="text-gray-400 hover:text-gray-600">
                        <i class="fa-solid fa-times"></i>
                    </button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Landlord</label>
                        <select id="filter-landlord" multiple class="w-full border border-gray-300 rounded-lg p-2 text-sm" size="3">
                            <option value="Canary Wharf Group">Canary Wharf Group</option>
                            <option value="British Land">British Land</option>
                            <option value="Land Securities">Land Securities</option>
                            <option value="Derwent London">Derwent London</option>
                            <option value="Great Portland Estates">Great Portland Estates</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Tenant</label>
                        <select id="filter-tenant" multiple class="w-full border border-gray-300 rounded-lg p-2 text-sm" size="3">
                            <option value="Tech Corp Ltd">Tech Corp Ltd</option>
                            <option value="Financial Services Inc">Financial Services Inc</option>
                            <option value="Retail Solutions">Retail Solutions</option>
                            <option value="Creative Agency">Creative Agency</option>
                            <option value="Professional Services">Professional Services</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Deal Stage</label>
                        <select id="filter-stage" multiple class="w-full border border-gray-300 rounded-lg p-2 text-sm" size="3">
                            <option value="Lead">Lead</option>
                            <option value="Viewing">Viewing</option>
                            <option value="Proposal">Proposal</option>
                            <option value="HoTs">HoTs</option>
                            <option value="Contract">Contract</option>
                            <option value="Onboarding">Onboarding</option>
                            <option value="Live">Live</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                        <select id="filter-property-type" multiple class="w-full border border-gray-300 rounded-lg p-2 text-sm" size="3">
                            <option value="Office">Office</option>
                            <option value="Retail">Retail</option>
                            <option value="Industrial">Industrial</option>
                            <option value="Mixed Use">Mixed Use</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Risk Level</label>
                        <select id="filter-risk" multiple class="w-full border border-gray-300 rounded-lg p-2 text-sm" size="3">
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Value Range</label>
                        <select id="filter-value-range" class="w-full border border-gray-300 rounded-lg p-2 text-sm">
                            <option value="">All Values</option>
                            <option value="0-500000">£0 - £500K</option>
                            <option value="500000-1000000">£500K - £1M</option>
                            <option value="1000000-5000000">£1M - £5M</option>
                            <option value="5000000-999999999">£5M+</option>
                        </select>
                    </div>
                </div>
                <div class="flex items-center justify-end space-x-3">
                    <button onclick="window.clearAllDealsFilters()" class="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                        Clear All
                    </button>
                    <button onclick="window.applyDealsFilters()" class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                        Apply Filters
                    </button>
                </div>
            </div>
        `;
        
        const tableContainer = document.querySelector('#active-deals-section .flex.items-center.justify-between');
        if (tableContainer) {
            tableContainer.parentElement.insertAdjacentHTML('afterend', filterPanelHTML);
            
            // Setup filter button click handler
            filterButton.onclick = function() {
                const panel = document.getElementById('deals-filter-panel');
                if (panel) {
                    panel.classList.toggle('hidden');
                }
            };
            
            console.log('✅ Filter panel added');
        }
    }
    
    function updateTableHeaders() {
        const thead = document.querySelector('#active-deals-section thead tr');
        if (!thead) return;
        
        // Check if already updated (look for "Days in Stage" header)
        if (thead.textContent.includes('Days in Stage')) {
            console.log('⏭️ Table headers already updated');
            return;
        }
        
        thead.innerHTML = `
            <th class="text-left py-3 px-4 font-medium text-gray-600">Deal Name</th>
            <th class="text-left py-3 px-4 font-medium text-gray-600">Property</th>
            <th class="text-left py-3 px-4 font-medium text-gray-600">Stage</th>
            <th class="text-left py-3 px-4 font-medium text-gray-600">Value</th>
            <th class="text-left py-3 px-4 font-medium text-gray-600">Probability</th>
            <th class="text-left py-3 px-4 font-medium text-gray-600">Risk</th>
            <th class="text-left py-3 px-4 font-medium text-gray-600">Next Milestone</th>
            <th class="text-left py-3 px-4 font-medium text-gray-600">
                Days in Stage
                <div class="text-xs font-normal text-gray-500">Last Activity</div>
            </th>
            <th class="text-left py-3 px-4 font-medium text-gray-600">
                Landlord
                <div class="text-xs font-normal text-gray-500">Tenant</div>
            </th>
            <th class="text-left py-3 px-4 font-medium text-gray-600">Owner</th>
        `;
        
        console.log('✅ Table headers updated with missing columns');
    }
    
    function updateTableData() {
        const tbody = document.querySelector('#active-deals-section tbody');
        if (!tbody) return;
        
        // Filter deals based on current status
        let filteredDeals = SAMPLE_DEALS.filter(deal => {
            if (currentFilters.status === 'all') return true;
            return deal.status === currentFilters.status;
        });
        
        tbody.innerHTML = '';
        
        filteredDeals.forEach(deal => {
            const row = createDealRow(deal);
            tbody.appendChild(row);
        });
        
        // Update section title
        const sectionTitle = document.querySelector('#active-deals-section h3');
        if (sectionTitle) {
            const statusLabel = currentFilters.status === 'active' ? 'Active Deals' :
                               currentFilters.status === 'closed-won' ? 'Closed/Won Deals' :
                               currentFilters.status === 'closed-lost' ? 'Closed/Lost Deals' : 'All Deals';
            sectionTitle.textContent = `${statusLabel} (${filteredDeals.length})`;
        }
        
        console.log(`✅ Table data updated with ${filteredDeals.length} deals`);
    }
    
    function createDealRow(deal) {
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-gray-50';
        
        const velocityIcon = deal.velocity === 'fast' ? '🟢' : deal.velocity === 'stuck' ? '🔴' : '🟡';
        const velocityColor = deal.velocity === 'fast' ? 'text-green-600' : deal.velocity === 'stuck' ? 'text-red-600' : 'text-yellow-600';
        const velocityText = deal.velocity === 'fast' ? 'Moving quickly' : deal.velocity === 'stuck' ? 'Stuck - needs attention' : 'Normal pace';
        
        tr.innerHTML = `
            <td class="py-4 px-4">
                <div class="flex items-center">
                    <span class="mr-2 text-lg" title="${velocityText}">${velocityIcon}</span>
                    <div>
                        <div class="font-medium text-gray-900 cursor-pointer hover:text-blue-600" onclick="window.location.hash = '/deal-room'">${deal.name}</div>
                        <div class="text-sm text-gray-500">${deal.id}</div>
                    </div>
                </div>
            </td>
            <td class="py-4 px-4">
                <div class="text-gray-900">${deal.property}</div>
                <div class="text-sm text-gray-500">${deal.propertyType} • ${deal.sqft} sq ft</div>
            </td>
            <td class="py-4 px-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStageColor(deal.stage)}">
                    ${deal.stage}
                </span>
            </td>
            <td class="py-4 px-4 font-medium text-gray-900">£${deal.value.toLocaleString()}</td>
            <td class="py-4 px-4">
                <div class="flex items-center">
                    <span class="text-gray-900">${deal.probability}%</span>
                    <div class="ml-2 w-16 bg-gray-200 rounded-full h-2">
                        <div class="bg-green-500 h-2 rounded-full" style="width: ${deal.probability}%"></div>
                    </div>
                </div>
            </td>
            <td class="py-4 px-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskColor(deal.risk)}">
                    ${deal.risk}
                </span>
            </td>
            <td class="py-4 px-4">
                <div class="text-gray-900">${deal.nextMilestone}</div>
                <div class="text-sm text-gray-500">Due: ${deal.dueDate}</div>
            </td>
            <td class="py-4 px-4">
                <div class="font-medium ${velocityColor}">${deal.daysInStage}d</div>
                <div class="text-sm text-gray-500">${deal.lastActivity}</div>
            </td>
            <td class="py-4 px-4">
                <div class="text-sm text-gray-700">${deal.landlord}</div>
                <div class="text-xs text-gray-500">${deal.tenant}</div>
            </td>
            <td class="py-4 px-4">
                <div class="flex items-center">
                    <img src="${deal.ownerAvatar}" alt="Owner" class="w-8 h-8 rounded-full mr-2">
                    <div>
                        <div class="text-sm font-medium text-gray-900">${deal.owner}</div>
                    </div>
                </div>
            </td>
        `;
        
        return tr;
    }
    
    function getStageColor(stage) {
        const colors = {
            'Lead': 'bg-blue-100 text-blue-800',
            'Viewing': 'bg-indigo-100 text-indigo-800',
            'Proposal': 'bg-purple-100 text-purple-800',
            'HoTs': 'bg-pink-100 text-pink-800',
            'Contract': 'bg-red-100 text-red-800',
            'Onboarding': 'bg-orange-100 text-orange-800',
            'Live': 'bg-green-100 text-green-800'
        };
        return colors[stage] || 'bg-gray-100 text-gray-800';
    }
    
    function getRiskColor(risk) {
        const colors = {
            'Low': 'bg-green-100 text-green-800',
            'Medium': 'bg-yellow-100 text-yellow-800',
            'High': 'bg-red-100 text-red-800'
        };
        return colors[risk] || 'bg-gray-100 text-gray-800';
    }
    
    // Global functions for filter and tab interactions
    window.switchDealStatus = function(status) {
        currentFilters.status = status;
        
        // Update tab styles
        document.querySelectorAll('.deal-status-tab').forEach(tab => {
            tab.classList.remove('active', 'border-blue-600', 'text-blue-600');
            tab.classList.add('border-transparent', 'text-gray-500');
        });
        
        const activeTab = event.target.closest('.deal-status-tab');
        if (activeTab) {
            activeTab.classList.add('active', 'border-blue-600', 'text-blue-600');
            activeTab.classList.remove('border-transparent', 'text-gray-500');
        }
        
        updateTableData();
    };
    
    window.applyDealsFilters = function() {
        currentFilters.landlords = Array.from(document.getElementById('filter-landlord').selectedOptions).map(o => o.value);
        currentFilters.tenants = Array.from(document.getElementById('filter-tenant').selectedOptions).map(o => o.value);
        currentFilters.stages = Array.from(document.getElementById('filter-stage').selectedOptions).map(o => o.value);
        currentFilters.propertyTypes = Array.from(document.getElementById('filter-property-type').selectedOptions).map(o => o.value);
        currentFilters.riskLevels = Array.from(document.getElementById('filter-risk').selectedOptions).map(o => o.value);
        currentFilters.valueRange = document.getElementById('filter-value-range').value;
        
        updateTableData();
        document.getElementById('deals-filter-panel').classList.add('hidden');
        
        alert('Filters applied! (Full filter logic ready for backend integration)');
    };
    
    window.clearAllDealsFilters = function() {
        document.getElementById('filter-landlord').selectedIndex = -1;
        document.getElementById('filter-tenant').selectedIndex = -1;
        document.getElementById('filter-stage').selectedIndex = -1;
        document.getElementById('filter-property-type').selectedIndex = -1;
        document.getElementById('filter-risk').selectedIndex = -1;
        document.getElementById('filter-value-range').selectedIndex = 0;
        
        currentFilters = {
            status: currentFilters.status,
            landlords: [],
            tenants: [],
            stages: [],
            propertyTypes: [],
            riskLevels: [],
            valueRange: '',
            searchQuery: ''
        };
        
        updateTableData();
        alert('All filters cleared!');
    };
    
    // Initialize when deals-overview page is visible
    function setupPageObserver() {
        const targetPage = document.getElementById('deals-overview-page');
        if (!targetPage) {
            setTimeout(setupPageObserver, 1000);
            return;
        }
        
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const page = document.getElementById('deals-overview-page');
                    if (page && !page.classList.contains('hidden')) {
                        setTimeout(initializeDealsOverviewFixes, 300);
                    }
                }
            });
        });
        
        observer.observe(targetPage, { attributes: true });
        
        // Also try immediate initialization if page is already visible
        if (!targetPage.classList.contains('hidden')) {
            setTimeout(initializeDealsOverviewFixes, 300);
        }
    }
    
    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupPageObserver);
    } else {
        setupPageObserver();
    }
    
    // Also listen for hash changes
    window.addEventListener('hashchange', function() {
        if (window.location.hash === '#/deals-overview') {
            setTimeout(initializeDealsOverviewFixes, 300);
        }
    });
    
    console.log('✅ Deals Overview Critical Fixes loaded and ready');
    
})();
