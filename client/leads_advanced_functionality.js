// Advanced Lead Management JavaScript Functions

// Global variables
let selectedLeads = new Set();
let currentLeadId = null;

// Search functionality
function searchLeads() {
    const searchInput = document.getElementById('leadSearchInput').value.toLowerCase();
    const leadCards = document.querySelectorAll('.lead-card');
    
    leadCards.forEach(card => {
        const company = card.querySelector('h3').textContent.toLowerCase();
        const contact = card.querySelectorAll('p')[0].textContent.toLowerCase();
        const industry = card.querySelector('.flex.items-center.space-x-4 span').textContent.toLowerCase();
        
        const searchText = company + ' ' + contact + ' ' + industry;
        
        if (searchText.includes(searchInput)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// Sort functionality
function sortLeads() {
    const sortValue = document.getElementById('leadSortSelect').value;
    const leadsList = document.getElementById('leads-list');
    const leadCards = Array.from(document.querySelectorAll('.lead-card'));
    
    leadCards.sort((a, b) => {
        switch(sortValue) {
            case 'score-desc':
                return parseInt(b.querySelector('.text-2xl.font-bold').textContent) - 
                       parseInt(a.querySelector('.text-2xl.font-bold').textContent);
            case 'score-asc':
                return parseInt(a.querySelector('.text-2xl.font-bold').textContent) - 
                       parseInt(b.querySelector('.text-2xl.font-bold').textContent);
            case 'company-asc':
                return a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent);
            case 'company-desc':
                return b.querySelector('h3').textContent.localeCompare(a.querySelector('h3').textContent);
            case 'date-desc':
                // Newest first (assuming cards are already in this order)
                return 0;
            case 'date-asc':
                // Oldest first (reverse current order)
                return 0;
            default:
                return 0;
        }
    });
    
    // Re-append sorted cards
    leadCards.forEach(card => leadsList.appendChild(card));
}

// Bulk selection functionality
function updateBulkActions() {
    const checkboxes = document.querySelectorAll('.lead-checkbox');
    selectedLeads.clear();
    
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedLeads.add(checkbox.getAttribute('data-lead-id'));
        }
    });
    
    const selectedCount = document.getElementById('selectedCount');
    const bulkActionsBtn = document.getElementById('bulkActionsBtn');
    
    selectedCount.textContent = selectedLeads.size;
    
    if (selectedLeads.size > 0) {
        bulkActionsBtn.disabled = false;
    } else {
        bulkActionsBtn.disabled = true;
    }
}

function toggleSelectAll() {
    const checkboxes = document.querySelectorAll('.lead-checkbox:not(.hidden)');
    const selectAllBtn = document.getElementById('selectAllBtn');
    const allChecked = Array.from(checkboxes).every(cb => cb.checked);
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = !allChecked;
    });
    
    if (!allChecked) {
        selectAllBtn.innerHTML = '<i class="fa-solid fa-square mr-1"></i> Deselect All';
    } else {
        selectAllBtn.innerHTML = '<i class="fa-solid fa-check-square mr-1"></i> Select All';
    }
    
    updateBulkActions();
}

function showBulkActionsMenu() {
    const menu = document.getElementById('bulkActionsMenu');
    const btn = document.getElementById('bulkActionsBtn');
    const rect = btn.getBoundingClientRect();
    
    menu.style.left = rect.left + 'px';
    menu.style.top = (rect.bottom + 5) + 'px';
    menu.classList.toggle('hidden');
}

// Close bulk actions menu when clicking outside
document.addEventListener('click', function(event) {
    const menu = document.getElementById('bulkActionsMenu');
    const btn = document.getElementById('bulkActionsBtn');
    
    if (menu && !menu.contains(event.target) && event.target !== btn && !btn.contains(event.target)) {
        menu.classList.add('hidden');
    }
});

function bulkAssign() {
    if (selectedLeads.size === 0) return;
    
    showToast(`Assigning ${selectedLeads.size} leads...`);
    document.getElementById('bulkActionsMenu').classList.add('hidden');
    
    // Show assign modal for bulk assignment
    showAssignModal();
}

function bulkQualify() {
    if (selectedLeads.size === 0) return;
    
    showToast(`${selectedLeads.size} leads qualified successfully!`, 'success');
    document.getElementById('bulkActionsMenu').classList.add('hidden');
    
    // Clear selections
    selectedLeads.clear();
    document.querySelectorAll('.lead-checkbox').forEach(cb => cb.checked = false);
    updateBulkActions();
}

function bulkDisqualify() {
    if (selectedLeads.size === 0) return;
    
    if (confirm(`Are you sure you want to disqualify ${selectedLeads.size} leads?`)) {
        showToast(`${selectedLeads.size} leads disqualified`, 'warning');
        document.getElementById('bulkActionsMenu').classList.add('hidden');
        
        // Clear selections
        selectedLeads.clear();
        document.querySelectorAll('.lead-checkbox').forEach(cb => cb.checked = false);
        updateBulkActions();
    }
}

function bulkExport() {
    if (selectedLeads.size === 0) return;
    
    exportLeads(true);
    document.getElementById('bulkActionsMenu').classList.add('hidden');
}

// Export functionality
function exportLeads(selectedOnly = false) {
    const leadCards = selectedOnly ? 
        Array.from(document.querySelectorAll('.lead-card')).filter(card => 
            selectedLeads.has(card.getAttribute('data-lead-id'))
        ) : 
        Array.from(document.querySelectorAll('.lead-card:not(.hidden)'));
    
    // Create CSV content
    let csv = 'Lead ID,Company,Contact,Grade,BANT Score,Budget,Authority,Need,Timeline,Industry,Location,Desks,Date Added\n';
    
    leadCards.forEach(card => {
        const leadId = card.getAttribute('data-lead-id');
        const grade = card.getAttribute('data-grade');
        const company = card.querySelector('h3').textContent;
        const contact = card.querySelectorAll('p')[0].textContent.replace('Contact: ', '');
        const score = card.querySelector('.text-2xl.font-bold').textContent;
        
        const bantScores = card.querySelectorAll('.text-sm.font-semibold.text-slate');
        const budget = bantScores[0]?.textContent || 'N/A';
        const authority = bantScores[1]?.textContent || 'N/A';
        const need = bantScores[2]?.textContent || 'N/A';
        const timeline = bantScores[3]?.textContent || 'N/A';
        
        const details = card.querySelectorAll('.flex.items-center.space-x-4 span');
        const industry = details[0]?.textContent.trim().replace(/\s+/g, ' ') || 'N/A';
        const location = details[1]?.textContent.trim().replace(/\s+/g, ' ') || 'N/A';
        const desks = details[2]?.textContent.trim().replace(/\s+/g, ' ') || 'N/A';
        const dateAdded = details[3]?.textContent.trim().replace(/\s+/g, ' ') || 'N/A';
        
        csv += `"${leadId}","${company}","${contact}","${grade}","${score}","${budget}","${authority}","${need}","${timeline}","${industry}","${location}","${desks}","${dateAdded}"\n`;
    });
    
    // Download CSV
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads_export_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showToast(`Exported ${leadCards.length} leads to CSV`, 'success');
}

// Assignment modal functions
function showAssignModal(leadId = null) {
    currentLeadId = leadId;
    const modal = document.getElementById('assignLeadModal');
    modal.classList.remove('hidden');
}

function closeAssignModal() {
    const modal = document.getElementById('assignLeadModal');
    modal.classList.add('hidden');
    currentLeadId = null;
}

function confirmAssignment() {
    const userSelect = document.getElementById('assignUserSelect');
    const notes = document.getElementById('assignNotes').value;
    const priority = document.querySelector('input[name="assignPriority"]:checked')?.value || 'medium';
    
    if (!userSelect.value) {
        alert('Please select a team member to assign to');
        return;
    }
    
    const userName = userSelect.options[userSelect.selectedIndex].text;
    
    if (selectedLeads.size > 0) {
        showToast(`${selectedLeads.size} leads assigned to ${userName}`, 'success');
        selectedLeads.clear();
        document.querySelectorAll('.lead-checkbox').forEach(cb => cb.checked = false);
        updateBulkActions();
    } else if (currentLeadId) {
        showToast(`Lead assigned to ${userName}`, 'success');
    }
    
    closeAssignModal();
    
    // Reset form
    userSelect.value = '';
    document.getElementById('assignNotes').value = '';
}

// Schedule viewing modal functions
function showScheduleModal(leadId = null) {
    currentLeadId = leadId;
    const modal = document.getElementById('scheduleViewingModal');
    
    if (leadId) {
        const leadCard = document.querySelector(`[data-lead-id="${leadId}"]`);
        if (leadCard) {
            const company = leadCard.querySelector('h3').textContent;
            const contact = leadCard.querySelectorAll('p')[0].textContent;
            const grade = leadCard.getAttribute('data-grade');
            
            document.getElementById('scheduleLeadName').textContent = company;
            document.getElementById('scheduleLeadContact').textContent = contact;
            document.getElementById('scheduleLeadGrade').textContent = `Grade ${grade} Lead`;
        }
    }
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('scheduleDate').min = today;
    
    modal.classList.remove('hidden');
}

function closeScheduleModal() {
    const modal = document.getElementById('scheduleViewingModal');
    modal.classList.add('hidden');
    currentLeadId = null;
}

function confirmSchedule() {
    const property = document.getElementById('schedulePropertySelect').value;
    const date = document.getElementById('scheduleDate').value;
    const time = document.getElementById('scheduleTime').value;
    
    if (!property || !date || !time) {
        alert('Please fill in all required fields');
        return;
    }
    
    const propertyName = document.getElementById('schedulePropertySelect').options[
        document.getElementById('schedulePropertySelect').selectedIndex
    ].text;
    
    showToast(`Viewing scheduled for ${propertyName} on ${date} at ${time}`, 'success');
    closeScheduleModal();
    
    // Reset form
    document.getElementById('schedulePropertySelect').value = '';
    document.getElementById('scheduleDate').value = '';
    document.getElementById('scheduleTime').value = '';
    document.getElementById('scheduleNotes').value = '';
}

// Update existing functions to use new modals
// Override the buttons in lead detail modal
document.addEventListener('DOMContentLoaded', function() {
    // Update assign buttons in lead detail modal
    const leadDetailModal = document.getElementById('leadDetailModal');
    if (leadDetailModal) {
        const assignBtn = leadDetailModal.querySelector('.bg-info');
        if (assignBtn) {
            assignBtn.onclick = function() {
                closeLeadDetailModal();
                showAssignModal(currentLeadId);
            };
        }
        
        const scheduleBtn = leadDetailModal.querySelector('.bg-warning');
        if (scheduleBtn) {
            scheduleBtn.onclick = function() {
                closeLeadDetailModal();
                showScheduleModal(currentLeadId);
            };
        }
    }
});

// Toast notification helper
function showToast(message, type = 'success') {
    const toast = document.getElementById('successToast');
    const icon = toast.querySelector('i');
    const text = toast.querySelector('span');
    
    // Update icon based on type
    icon.className = type === 'success' ? 'fa-solid fa-check-circle' : 
                     type === 'warning' ? 'fa-solid fa-exclamation-circle' : 
                     'fa-solid fa-info-circle';
    
    // Update background color based on type
    toast.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2 ${
        type === 'success' ? 'bg-success' : 
        type === 'warning' ? 'bg-warning' : 
        'bg-info'
    } text-white`;
    
    text.textContent = message;
    toast.classList.remove('hidden');
    
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// Update the existing showLeadDetail function to store current lead ID
const originalShowLeadDetail = window.showLeadDetail;
window.showLeadDetail = function(leadId) {
    currentLeadId = leadId;
    if (originalShowLeadDetail) {
        originalShowLeadDetail(leadId);
    }
};

console.log('Advanced lead management functions loaded successfully');
