// UNION Issue Tracking - Ticket Management JavaScript

let currentTicketFilters = {
    search: '',
    status: 'all',
    priority: 'all',
    category: 'all',
    assigned: 'all',
    dateRange: '30'
};

let currentTicket = null;
let filteredTickets = [];

// Initialize ticket management when page loads
document.addEventListener('DOMContentLoaded', function() {
    if (typeof allTicketsData !== 'undefined') {
        filteredTickets = [...allTicketsData];
        renderTicketList();
        updateKPIs();
    }
});

// Render ticket list in table
function renderTicketList() {
    const tbody = document.getElementById('tickets-table-body');
    const emptyState = document.getElementById('tickets-empty-state');
    
    if (!tbody) return;
    
    if (filteredTickets.length === 0) {
        tbody.innerHTML = '';
        if (emptyState) emptyState.classList.remove('hidden');
        return;
    }
    
    if (emptyState) emptyState.classList.add('hidden');
    
    tbody.innerHTML = filteredTickets.map(ticket => {
        const statusColor = getStatusColor(ticket.status);
        const priorityColor = getPriorityColor(ticket.priority);
        const timeAgo = getTimeAgo(ticket.created);
        
        return `
            <tr class="hover:bg-stone/30 transition-colors cursor-pointer" onclick="openTicketDetail('${ticket.id}')">
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="font-mono text-sm font-semibold text-slate">${ticket.id}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-3 py-1 rounded-full text-xs font-semibold ${statusColor}">
                        ${ticket.status}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-3 py-1 rounded-full text-xs font-semibold ${priorityColor}">
                        ${ticket.priority}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="text-sm text-slate">${ticket.category}</span>
                </td>
                <td class="px-6 py-4">
                    <p class="text-sm font-medium text-slate truncate max-w-xs">${ticket.subject}</p>
                </td>
                <td class="px-6 py-4">
                    <p class="text-sm font-medium text-slate">${ticket.reporter.company}</p>
                    <p class="text-xs text-concrete">${ticket.reporter.name}</p>
                </td>
                <td class="px-6 py-4">
                    <p class="text-sm font-medium text-slate">${ticket.property}</p>
                    <p class="text-xs text-concrete">${ticket.unit}</p>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded-full bg-slate flex items-center justify-center text-white text-xs font-semibold">
                            ${ticket.assignedTo.charAt(0)}
                        </div>
                        <span class="text-sm text-slate">${ticket.assignedTo}</span>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <p class="text-sm text-slate">${timeAgo}</p>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <button onclick="event.stopPropagation(); openTicketDetail('${ticket.id}')" 
                            class="px-4 py-2 bg-slate text-white text-sm rounded-lg hover:bg-slate/90 transition-colors">
                        View Details
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// Filter tickets based on current filters
function filterTickets() {
    // Get filter values
    const searchInput = document.getElementById('ticket-search');
    const statusFilter = document.getElementById('filter-status');
    const priorityFilter = document.getElementById('filter-priority');
    const categoryFilter = document.getElementById('filter-category');
    const assignedFilter = document.getElementById('filter-assigned');
    
    if (searchInput) currentTicketFilters.search = searchInput.value.toLowerCase();
    if (statusFilter) currentTicketFilters.status = statusFilter.value;
    if (priorityFilter) currentTicketFilters.priority = priorityFilter.value;
    if (categoryFilter) currentTicketFilters.category = categoryFilter.value;
    if (assignedFilter) currentTicketFilters.assigned = assignedFilter.value;
    
    // Apply filters
    filteredTickets = allTicketsData.filter(ticket => {
        // Search filter
        if (currentTicketFilters.search) {
            const searchTerm = currentTicketFilters.search;
            const matchesSearch = 
                ticket.id.toLowerCase().includes(searchTerm) ||
                ticket.subject.toLowerCase().includes(searchTerm) ||
                ticket.reporter.company.toLowerCase().includes(searchTerm) ||
                ticket.reporter.name.toLowerCase().includes(searchTerm) ||
                ticket.description.toLowerCase().includes(searchTerm);
            
            if (!matchesSearch) return false;
        }
        
        // Status filter
        if (currentTicketFilters.status !== 'all' && ticket.status !== currentTicketFilters.status) {
            return false;
        }
        
        // Priority filter
        if (currentTicketFilters.priority !== 'all' && ticket.priority !== currentTicketFilters.priority) {
            return false;
        }
        
        // Category filter
        if (currentTicketFilters.category !== 'all' && ticket.category !== currentTicketFilters.category) {
            return false;
        }
        
        // Assigned filter
        if (currentTicketFilters.assigned !== 'all' && ticket.assignedTo !== currentTicketFilters.assigned) {
            return false;
        }
        
        // Date range filter
        if (currentTicketFilters.dateRange !== 'all') {
            const days = parseInt(currentTicketFilters.dateRange);
            const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
            if (ticket.created < cutoffDate) return false;
        }
        
        return true;
    });
    
    renderTicketList();
    updateKPIs();
}

// Filter by date range
function filterByDateRange(range) {
    currentTicketFilters.dateRange = range;
    
    // Update active button
    document.querySelectorAll('.date-range-btn').forEach(btn => {
        if (btn.dataset.range === range) {
            btn.classList.add('active', 'bg-slate', 'text-white', 'border-slate');
            btn.classList.remove('border-stone');
        } else {
            btn.classList.remove('active', 'bg-slate', 'text-white', 'border-slate');
            btn.classList.add('border-stone');
        }
    });
    
    filterTickets();
}

// Reset all filters
function resetFilters() {
    currentTicketFilters = {
        search: '',
        status: 'all',
        priority: 'all',
        category: 'all',
        assigned: 'all',
        dateRange: '30'
    };
    
    // Reset form elements
    const searchInput = document.getElementById('ticket-search');
    const statusFilter = document.getElementById('filter-status');
    const priorityFilter = document.getElementById('filter-priority');
    const categoryFilter = document.getElementById('filter-category');
    const assignedFilter = document.getElementById('filter-assigned');
    
    if (searchInput) searchInput.value = '';
    if (statusFilter) statusFilter.value = 'all';
    if (priorityFilter) priorityFilter.value = 'all';
    if (categoryFilter) categoryFilter.value = 'all';
    if (assignedFilter) assignedFilter.value = 'all';
    
    // Reset date range buttons
    filterByDateRange('30');
    
    filterTickets();
}

// Update KPI cards
function updateKPIs() {
    const totalTickets = filteredTickets.length;
    const openTickets = filteredTickets.filter(t => t.status === 'Open').length;
    const inProgressTickets = filteredTickets.filter(t => t.status === 'In Progress').length;
    const resolvedTickets = filteredTickets.filter(t => t.status === 'Resolved').length;
    
    const kpiTotal = document.getElementById('kpi-total-tickets');
    const kpiOpen = document.getElementById('kpi-open-tickets');
    const kpiProgress = document.getElementById('kpi-progress-tickets');
    const kpiResolved = document.getElementById('kpi-resolved-tickets');
    
    if (kpiTotal) kpiTotal.textContent = totalTickets;
    if (kpiOpen) kpiOpen.textContent = openTickets;
    if (kpiProgress) kpiProgress.textContent = inProgressTickets;
    if (kpiResolved) kpiResolved.textContent = resolvedTickets;
}

// Open ticket detail modal
function openTicketDetail(ticketId) {
    currentTicket = allTicketsData.find(t => t.id === ticketId);
    if (!currentTicket) return;
    
    const modal = document.getElementById('ticketDetailModal');
    if (!modal) return;
    
    // Populate modal with ticket data
    populateTicketDetail(currentTicket);
    
    // Show modal
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    // Switch to overview tab
    switchTicketTab('overview');
}

// Close ticket detail modal
function closeTicketDetailModal() {
    const modal = document.getElementById('ticketDetailModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
    currentTicket = null;
}

// Populate ticket detail modal
function populateTicketDetail(ticket) {
    // Header
    document.getElementById('ticketDetailId').textContent = ticket.id;
    
    const statusBadge = document.getElementById('ticketDetailStatusBadge');
    statusBadge.textContent = ticket.status;
    statusBadge.className = `px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(ticket.status)}`;
    
    const priorityBadge = document.getElementById('ticketDetailPriorityBadge');
    priorityBadge.textContent = ticket.priority;
    priorityBadge.className = `px-3 py-1 rounded-full text-sm font-semibold ${getPriorityColor(ticket.priority)}`;
    
    // Overview tab
    document.getElementById('ticketDetailSubject').textContent = ticket.subject;
    document.getElementById('ticketDetailCategory').textContent = ticket.category;
    document.getElementById('ticketDetailDescription').textContent = ticket.description;
    
    // Reporter info
    document.getElementById('ticketDetailReporterName').textContent = ticket.reporter.name;
    document.getElementById('ticketDetailReporterCompany').textContent = ticket.reporter.company;
    document.getElementById('ticketDetailReporterEmail').textContent = ticket.reporter.email;
    document.getElementById('ticketDetailReporterPhone').textContent = ticket.reporter.phone;
    
    // Ticket details
    document.getElementById('ticketDetailProperty').textContent = ticket.property;
    document.getElementById('ticketDetailUnit').textContent = ticket.unit;
    document.getElementById('ticketDetailAssigned').textContent = ticket.assignedTo;
    document.getElementById('ticketDetailAssignedAvatar').textContent = ticket.assignedTo.charAt(0);
    document.getElementById('ticketDetailCreated').textContent = formatDate(ticket.created);
    document.getElementById('ticketDetailUpdated').textContent = formatDate(ticket.lastUpdated);
    
    // SLA deadline
    if (ticket.slaDeadline && ticket.status !== 'Resolved') {
        document.getElementById('ticketDetailSLA').textContent = formatDate(ticket.slaDeadline);
        document.getElementById('ticketDetailSLASection').classList.remove('hidden');
    } else {
        document.getElementById('ticketDetailSLASection').classList.add('hidden');
    }
    
    // Attachments
    const attachmentsContainer = document.getElementById('ticketDetailAttachments');
    if (ticket.attachments && ticket.attachments.length > 0) {
        attachmentsContainer.innerHTML = ticket.attachments.map(att => `
            <div class="flex items-center gap-3 p-3 bg-stone/30 rounded-lg">
                <i class="fa-solid fa-${getFileIcon(att.type)} text-slate text-xl"></i>
                <div class="flex-1">
                    <p class="text-sm font-medium text-slate">${att.name}</p>
                    <p class="text-xs text-concrete">${att.size}</p>
                </div>
                <button class="px-3 py-1 bg-white border border-stone text-slate text-sm rounded hover:bg-stone transition-colors">
                    <i class="fa-solid fa-download mr-1"></i>Download
                </button>
            </div>
        `).join('');
        document.getElementById('ticketDetailAttachmentsSection').classList.remove('hidden');
    } else {
        document.getElementById('ticketDetailAttachmentsSection').classList.add('hidden');
    }
    
    // Timeline tab
    populateTimeline(ticket);
    
    // Communications tab
    populateCommunications(ticket);
    
    // Resolution tab
    populateResolution(ticket);
}

// Populate timeline
function populateTimeline(ticket) {
    const timelineContainer = document.getElementById('ticketDetailTimeline');
    if (!timelineContainer || !ticket.timeline) return;
    
    timelineContainer.innerHTML = ticket.timeline.map((entry, index) => {
        const isLast = index === ticket.timeline.length - 1;
        const iconClass = getTimelineIcon(entry.type);
        
        return `
            <div class="flex gap-4">
                <div class="flex flex-col items-center">
                    <div class="w-10 h-10 rounded-full bg-slate flex items-center justify-center text-white">
                        <i class="fa-solid fa-${iconClass}"></i>
                    </div>
                    ${!isLast ? '<div class="w-0.5 h-full bg-stone mt-2"></div>' : ''}
                </div>
                <div class="flex-1 pb-8">
                    <p class="text-sm font-semibold text-slate">${entry.action}</p>
                    <p class="text-xs text-concrete mt-1">by ${entry.user} • ${formatDate(entry.timestamp)}</p>
                    ${entry.content ? `<p class="text-sm text-concrete mt-2 bg-stone/30 p-3 rounded-lg">${entry.content}</p>` : ''}
                </div>
            </div>
        `;
    }).join('');
}

// Populate communications
function populateCommunications(ticket) {
    const commsContainer = document.getElementById('ticketDetailCommunications');
    if (!commsContainer || !ticket.communications) return;
    
    commsContainer.innerHTML = ticket.communications.map(comm => {
        const isInternal = comm.internal;
        
        return `
            <div class="flex gap-4 ${isInternal ? 'bg-yellow-50 border border-yellow-200 rounded-lg p-4' : ''}">
                <div class="w-10 h-10 rounded-full bg-slate flex items-center justify-center text-white font-semibold flex-shrink-0">
                    ${comm.user.charAt(0)}
                </div>
                <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                        <p class="text-sm font-semibold text-slate">${comm.user}</p>
                        <span class="text-xs text-concrete">${formatDate(comm.timestamp)}</span>
                        ${isInternal ? '<span class="px-2 py-0.5 bg-yellow-500 text-white text-xs rounded-full">Internal</span>' : ''}
                    </div>
                    <p class="text-sm text-concrete leading-relaxed">${comm.message}</p>
                </div>
            </div>
        `;
    }).join('');
}

// Populate resolution
function populateResolution(ticket) {
    const notResolved = document.getElementById('ticketNotResolved');
    const resolved = document.getElementById('ticketResolved');
    
    if (ticket.status === 'Resolved' && ticket.resolvedDate) {
        notResolved.classList.add('hidden');
        resolved.classList.remove('hidden');
        
        document.getElementById('ticketResolvedDate').textContent = formatDate(ticket.resolvedDate);
        document.getElementById('ticketResolvedBy').textContent = ticket.resolvedBy;
        document.getElementById('ticketResolutionTime').textContent = `${ticket.resolutionTime} days`;
        
        // Satisfaction rating
        const ratingContainer = document.getElementById('ticketSatisfactionRating');
        if (ticket.satisfactionRating) {
            const stars = [];
            for (let i = 1; i <= 5; i++) {
                if (i <= ticket.satisfactionRating) {
                    stars.push('<i class="fa-solid fa-star text-yellow-500"></i>');
                } else {
                    stars.push('<i class="fa-regular fa-star text-concrete"></i>');
                }
            }
            ratingContainer.innerHTML = stars.join('');
        }
        
        document.getElementById('ticketTenantFeedback').textContent = ticket.tenantFeedback || 'No feedback provided';
        document.getElementById('ticketResolutionNotes').textContent = ticket.resolutionNotes || 'No notes provided';
        document.getElementById('ticketRootCause').textContent = ticket.rootCause || 'Not specified';
        
        // Actions taken
        const actionsContainer = document.getElementById('ticketActionsTaken');
        if (ticket.actionsTaken && ticket.actionsTaken.length > 0) {
            actionsContainer.innerHTML = ticket.actionsTaken.map(action => `
                <li class="flex items-start gap-2">
                    <i class="fa-solid fa-check text-green-500 mt-1"></i>
                    <span class="text-sm text-slate">${action}</span>
                </li>
            `).join('');
        }
    } else {
        notResolved.classList.remove('hidden');
        resolved.classList.add('hidden');
    }
}

// Switch ticket tab
function switchTicketTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.ticket-tab').forEach(tab => {
        if (tab.dataset.tab === tabName) {
            tab.classList.add('border-slate', 'text-slate', 'font-semibold');
            tab.classList.remove('border-transparent', 'text-concrete');
        } else {
            tab.classList.remove('border-slate', 'text-slate', 'font-semibold');
            tab.classList.add('border-transparent', 'text-concrete');
        }
    });
    
    // Show/hide tab content
    document.querySelectorAll('.ticket-tab-content').forEach(content => {
        if (content.id === `ticket-tab-${tabName}`) {
            content.classList.remove('hidden');
        } else {
            content.classList.add('hidden');
        }
    });
}

// Update ticket status
function updateTicketStatus(newStatus) {
    if (!currentTicket) return;
    
    currentTicket.status = newStatus;
    currentTicket.lastUpdated = new Date();
    
    // Add timeline entry
    if (!currentTicket.timeline) currentTicket.timeline = [];
    currentTicket.timeline.push({
        action: `Status changed to ${newStatus}`,
        user: 'System',
        timestamp: new Date(),
        type: 'status'
    });
    
    // If resolved, set resolution data
    if (newStatus === 'Resolved') {
        currentTicket.resolvedDate = new Date();
        currentTicket.resolvedBy = 'Current User';
        const timeDiff = currentTicket.resolvedDate - currentTicket.created;
        currentTicket.resolutionTime = (timeDiff / (1000 * 60 * 60 * 24)).toFixed(1);
    }
    
    // Refresh display
    populateTicketDetail(currentTicket);
    renderTicketList();
    updateKPIs();
    
    showToast(`Ticket ${currentTicket.id} status updated to ${newStatus}`);
}

// Add comment to ticket
function addTicketComment() {
    if (!currentTicket) return;
    
    const commentText = document.getElementById('newCommentText');
    const isInternal = document.getElementById('internalNoteCheckbox');
    
    if (!commentText || !commentText.value.trim()) {
        alert('Please enter a comment');
        return;
    }
    
    const newComment = {
        user: 'Current User',
        timestamp: new Date(),
        message: commentText.value.trim(),
        internal: isInternal ? isInternal.checked : false
    };
    
    if (!currentTicket.communications) currentTicket.communications = [];
    currentTicket.communications.push(newComment);
    
    // Add timeline entry
    if (!currentTicket.timeline) currentTicket.timeline = [];
    currentTicket.timeline.push({
        action: 'Comment added',
        user: 'Current User',
        timestamp: new Date(),
        type: 'comment',
        content: commentText.value.trim()
    });
    
    // Clear form
    commentText.value = '';
    if (isInternal) isInternal.checked = false;
    
    // Refresh display
    populateCommunications(currentTicket);
    populateTimeline(currentTicket);
    
    showToast('Comment added successfully');
}

// Open create ticket modal
function openCreateTicketModal() {
    const modal = document.getElementById('createTicketModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        
        // Reset form
        const form = document.getElementById('createTicketForm');
        if (form) form.reset();
    }
}

// Close create ticket modal
function closeCreateTicketModal() {
    const modal = document.getElementById('createTicketModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

// Submit new ticket
function submitNewTicket() {
    const form = document.getElementById('createTicketForm');
    if (!form || !form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    // Get form values
    const newTicket = {
        id: `TICK-${String(allTicketsData.length + 1).padStart(3, '0')}`,
        status: document.getElementById('newTicketStatus').value,
        priority: document.getElementById('newTicketPriority').value,
        category: document.getElementById('newTicketCategory').value,
        subject: document.getElementById('newTicketSubject').value,
        description: document.getElementById('newTicketDescription').value,
        reporter: {
            name: document.getElementById('newTicketReporterName').value,
            company: document.getElementById('newTicketCompany').value,
            email: document.getElementById('newTicketEmail').value,
            phone: document.getElementById('newTicketPhone').value || 'Not provided'
        },
        property: document.getElementById('newTicketProperty').value,
        propertyId: 'PROP-001',
        unit: document.getElementById('newTicketUnit').value,
        assignedTo: document.getElementById('newTicketAssignedTo').value,
        created: new Date(),
        lastUpdated: new Date(),
        slaDeadline: calculateSLADeadline(document.getElementById('newTicketPriority').value),
        attachments: [],
        timeline: [
            {
                action: 'Ticket created',
                user: document.getElementById('newTicketReporterName').value,
                timestamp: new Date(),
                type: 'created'
            },
            {
                action: `Assigned to ${document.getElementById('newTicketAssignedTo').value}`,
                user: 'System',
                timestamp: new Date(),
                type: 'assigned'
            }
        ],
        communications: [
            {
                user: document.getElementById('newTicketReporterName').value,
                timestamp: new Date(),
                message: document.getElementById('newTicketDescription').value,
                internal: false
            }
        ]
    };
    
    // Add to tickets array
    allTicketsData.unshift(newTicket);
    
    // Close modal
    closeCreateTicketModal();
    
    // Refresh display
    filterTickets();
    
    // Show success message
    showToast(`Ticket ${newTicket.id} created successfully`);
}

// Calculate SLA deadline based on priority
function calculateSLADeadline(priority) {
    const now = new Date();
    let hours = 24;
    
    switch (priority) {
        case 'Critical':
            hours = 4;
            break;
        case 'High':
            hours = 24;
            break;
        case 'Medium':
            hours = 72;
            break;
        case 'Low':
            hours = 168;
            break;
    }
    
    return new Date(now.getTime() + hours * 60 * 60 * 1000);
}

// Export tickets to CSV
function exportTickets() {
    const headers = ['Ticket ID', 'Status', 'Priority', 'Category', 'Subject', 'Reporter', 'Company', 'Property', 'Unit', 'Assigned To', 'Created', 'Last Updated'];
    
    const rows = filteredTickets.map(ticket => [
        ticket.id,
        ticket.status,
        ticket.priority,
        ticket.category,
        ticket.subject,
        ticket.reporter.name,
        ticket.reporter.company,
        ticket.property,
        ticket.unit,
        ticket.assignedTo,
        formatDate(ticket.created),
        formatDate(ticket.lastUpdated)
    ]);
    
    let csvContent = headers.join(',') + '\n';
    rows.forEach(row => {
        csvContent += row.map(cell => `"${cell}"`).join(',') + '\n';
    });
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `union-tickets-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showToast(`Exported ${filteredTickets.length} tickets to CSV`);
}

// Utility functions
function getStatusColor(status) {
    switch (status) {
        case 'Open':
            return 'bg-red-100 text-red-700';
        case 'In Progress':
            return 'bg-blue-100 text-blue-700';
        case 'Resolved':
            return 'bg-green-100 text-green-700';
        case 'Closed':
            return 'bg-gray-100 text-gray-700';
        default:
            return 'bg-gray-100 text-gray-700';
    }
}

function getPriorityColor(priority) {
    switch (priority) {
        case 'Critical':
            return 'bg-red-500 text-white';
        case 'High':
            return 'bg-orange-500 text-white';
        case 'Medium':
            return 'bg-yellow-500 text-white';
        case 'Low':
            return 'bg-blue-500 text-white';
        default:
            return 'bg-gray-500 text-white';
    }
}

function getTimeAgo(date) {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hours ago`;
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    
    return formatDate(date);
}

function formatDate(date) {
    if (!date) return 'N/A';
    const d = new Date(date);
    return d.toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function getFileIcon(type) {
    switch (type) {
        case 'image':
            return 'file-image';
        case 'pdf':
            return 'file-pdf';
        default:
            return 'file';
    }
}

function getTimelineIcon(type) {
    switch (type) {
        case 'created':
            return 'plus';
        case 'assigned':
            return 'user';
        case 'status':
            return 'exchange-alt';
        case 'comment':
            return 'comment';
        case 'resolution':
            return 'check';
        default:
            return 'circle';
    }
}

function showToast(message) {
    const toast = document.getElementById('ticketSuccessToast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (toast && toastMessage) {
        toastMessage.textContent = message;
        toast.classList.remove('hidden');
        toast.classList.add('flex');
        
        setTimeout(() => {
            toast.classList.add('hidden');
            toast.classList.remove('flex');
        }, 3000);
    }
}

console.log('Ticket management JavaScript loaded');
