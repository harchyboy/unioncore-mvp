// UNION Contacts/CRM Management System

let currentContactView = 'grid';
let filteredContacts = [];
let currentContact = null;
let currentCompany = null;

// Initialize Contacts/CRM page
function initContactsCRM() {
  if (typeof contactsData === 'undefined' || typeof companiesData === 'undefined') {
    console.error('Contacts or companies data not loaded');
    return;
  }
  
  populateCompanyFilters();
  filteredContacts = [...contactsData];
  renderContacts();
  updateContactKPIs();
}

// Populate company filter dropdown
function populateCompanyFilters() {
  const companyFilter = document.getElementById('contactCompanyFilter');
  const addContactCompanySelect = document.querySelector('#addContactForm select[name="companyId"]');
  
  if (companyFilter) {
    companiesData.forEach(company => {
      const option = document.createElement('option');
      option.value = company.id;
      option.textContent = company.name;
      companyFilter.appendChild(option);
    });
  }
  
  if (addContactCompanySelect) {
    companiesData.forEach(company => {
      const option = document.createElement('option');
      option.value = company.id;
      option.textContent = company.name;
      addContactCompanySelect.appendChild(option);
    });
  }
}

// Filter contacts
function filterContacts() {
  const searchTerm = document.getElementById('contactSearch').value.toLowerCase();
  const typeFilter = document.getElementById('contactTypeFilter').value;
  const companyFilter = document.getElementById('contactCompanyFilter').value;
  const tagsFilter = document.getElementById('contactTagsFilter').value;
  
  filteredContacts = contactsData.filter(contact => {
    // Search filter
    const matchesSearch = !searchTerm || 
      contact.firstName.toLowerCase().includes(searchTerm) ||
      contact.lastName.toLowerCase().includes(searchTerm) ||
      contact.email.toLowerCase().includes(searchTerm) ||
      contact.phone.includes(searchTerm) ||
      getCompanyName(contact.companyId).toLowerCase().includes(searchTerm);
    
    // Type filter
    const matchesType = typeFilter === 'all' || contact.type === typeFilter;
    
    // Company filter
    const matchesCompany = companyFilter === 'all' || contact.companyId === companyFilter;
    
    // Tags filter
    const matchesTags = tagsFilter === 'all' || contact.tags.includes(tagsFilter);
    
    return matchesSearch && matchesType && matchesCompany && matchesTags;
  });
  
  renderContacts();
  updateContactKPIs();
}

// Sort contacts
function sortContacts() {
  const sortBy = document.getElementById('contactSortBy').value;
  
  filteredContacts.sort((a, b) => {
    switch(sortBy) {
      case 'nameAsc':
        return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
      case 'nameDesc':
        return `${b.firstName} ${b.lastName}`.localeCompare(`${a.firstName} ${a.lastName}`);
      case 'company':
        return getCompanyName(a.companyId).localeCompare(getCompanyName(b.companyId));
      case 'lastContact':
        return new Date(b.lastContact) - new Date(a.lastContact);
      case 'dateAdded':
        return b.id.localeCompare(a.id);
      default:
        return 0;
    }
  });
  
  renderContacts();
}

// Switch contact view
function switchContactView(view) {
  currentContactView = view;
  
  // Update button states
  document.getElementById('gridViewBtn').classList.toggle('bg-white', view === 'grid');
  document.getElementById('gridViewBtn').classList.toggle('shadow-sm', view === 'grid');
  document.getElementById('gridViewBtn').classList.toggle('text-stone-700', view === 'grid');
  document.getElementById('gridViewBtn').classList.toggle('text-stone-600', view !== 'grid');
  
  document.getElementById('listViewBtn').classList.toggle('bg-white', view === 'list');
  document.getElementById('listViewBtn').classList.toggle('shadow-sm', view === 'list');
  document.getElementById('listViewBtn').classList.toggle('text-stone-700', view === 'list');
  document.getElementById('listViewBtn').classList.toggle('text-stone-600', view !== 'list');
  
  document.getElementById('tableViewBtn').classList.toggle('bg-white', view === 'table');
  document.getElementById('tableViewBtn').classList.toggle('shadow-sm', view === 'table');
  document.getElementById('tableViewBtn').classList.toggle('text-stone-700', view === 'table');
  document.getElementById('tableViewBtn').classList.toggle('text-stone-600', view !== 'table');
  
  // Show/hide views
  document.getElementById('contactsGridView').classList.toggle('hidden', view !== 'grid');
  document.getElementById('contactsListView').classList.toggle('hidden', view !== 'list');
  document.getElementById('contactsTableView').classList.toggle('hidden', view !== 'table');
  
  renderContacts();
}

// Render contacts based on current view
function renderContacts() {
  if (filteredContacts.length === 0) {
    document.getElementById('contactsEmptyState').classList.remove('hidden');
    document.getElementById('contactsGridView').classList.add('hidden');
    document.getElementById('contactsListView').classList.add('hidden');
    document.getElementById('contactsTableView').classList.add('hidden');
    return;
  }
  
  document.getElementById('contactsEmptyState').classList.add('hidden');
  
  if (currentContactView === 'grid') {
    renderGridView();
  } else if (currentContactView === 'list') {
    renderListView();
  } else if (currentContactView === 'table') {
    renderTableView();
  }
}

// Render grid view
function renderGridView() {
  const gridView = document.getElementById('contactsGridView');
  gridView.innerHTML = '';
  
  filteredContacts.forEach(contact => {
    const company = companiesData.find(c => c.id === contact.companyId);
    const initials = `${contact.firstName[0]}${contact.lastName[0]}`;
    const avatarColor = getAvatarColor(contact.id);
    
    const card = document.createElement('div');
    card.className = 'bg-white rounded-xl shadow-sm p-6 border border-stone-200 hover:shadow-md transition-shadow cursor-pointer';
    card.onclick = () => openContactDetail(contact.id);
    
    card.innerHTML = `
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 rounded-full ${avatarColor} flex items-center justify-center text-white font-bold flex-shrink-0">
          ${initials}
        </div>
        <div class="flex-1 min-w-0">
          <h3 class="text-lg font-semibold text-stone-900 truncate">${contact.firstName} ${contact.lastName}</h3>
          <p class="text-sm text-stone-600 truncate">${contact.jobTitle}</p>
          <p class="text-sm text-blue-600 hover:underline truncate mt-1" onclick="event.stopPropagation(); openCompanyProfile('${contact.companyId}')">${company ? company.name : 'Unknown Company'}</p>
        </div>
      </div>
      
      <div class="mt-4 space-y-2">
        <div class="flex items-center gap-2 text-sm text-stone-600">
          <i class="fas fa-envelope w-4"></i>
          <span class="truncate">${contact.email}</span>
        </div>
        <div class="flex items-center gap-2 text-sm text-stone-600">
          <i class="fas fa-phone w-4"></i>
          <span>${contact.phone}</span>
        </div>
      </div>
      
      <div class="mt-4 flex items-center justify-between">
        <span class="${getContactTypeBadgeClass(contact.type)} px-2 py-1 rounded text-xs font-medium">
          ${contact.type}
        </span>
        <span class="text-xs text-stone-500">${formatDate(contact.lastContact)}</span>
      </div>
      
      ${contact.tags.length > 0 ? `
        <div class="mt-3 flex flex-wrap gap-1">
          ${contact.tags.slice(0, 2).map(tag => `
            <span class="px-2 py-0.5 bg-stone-100 text-stone-600 rounded text-xs">${tag}</span>
          `).join('')}
          ${contact.tags.length > 2 ? `<span class="px-2 py-0.5 bg-stone-100 text-stone-600 rounded text-xs">+${contact.tags.length - 2}</span>` : ''}
        </div>
      ` : ''}
      
      <div class="mt-4 flex gap-2">
        <button onclick="event.stopPropagation();" class="flex-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 text-sm">
          <i class="fas fa-envelope"></i>
        </button>
        <button onclick="event.stopPropagation();" class="flex-1 px-3 py-1.5 bg-green-50 text-green-600 rounded hover:bg-green-100 text-sm">
          <i class="fas fa-phone"></i>
        </button>
        <button onclick="event.stopPropagation(); openContactDetail('${contact.id}')" class="flex-1 px-3 py-1.5 bg-stone-50 text-stone-600 rounded hover:bg-stone-100 text-sm">
          <i class="fas fa-eye"></i>
        </button>
      </div>
    `;
    
    gridView.appendChild(card);
  });
}

// Render list view
function renderListView() {
  const listView = document.getElementById('contactsListView');
  listView.innerHTML = '';
  
  filteredContacts.forEach(contact => {
    const company = companiesData.find(c => c.id === contact.companyId);
    const initials = `${contact.firstName[0]}${contact.lastName[0]}`;
    const avatarColor = getAvatarColor(contact.id);
    
    const card = document.createElement('div');
    card.className = 'bg-white rounded-xl shadow-sm p-4 border border-stone-200 hover:shadow-md transition-shadow cursor-pointer';
    card.onclick = () => openContactDetail(contact.id);
    
    card.innerHTML = `
      <div class="flex items-center gap-4">
        <div class="w-16 h-16 rounded-full ${avatarColor} flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
          ${initials}
        </div>
        <div class="flex-1 grid grid-cols-4 gap-4">
          <div>
            <h3 class="font-semibold text-stone-900">${contact.firstName} ${contact.lastName}</h3>
            <p class="text-sm text-stone-600">${contact.jobTitle}</p>
            <p class="text-sm text-blue-600 hover:underline mt-1" onclick="event.stopPropagation(); openCompanyProfile('${contact.companyId}')">${company ? company.name : 'Unknown'}</p>
          </div>
          <div>
            <p class="text-sm text-stone-600">Email</p>
            <p class="text-sm text-stone-900">${contact.email}</p>
            <p class="text-sm text-stone-600 mt-1">Phone</p>
            <p class="text-sm text-stone-900">${contact.phone}</p>
          </div>
          <div>
            <p class="text-sm text-stone-600">Type</p>
            <span class="${getContactTypeBadgeClass(contact.type)} px-2 py-1 rounded text-xs font-medium inline-block mt-1">
              ${contact.type}
            </span>
            <p class="text-sm text-stone-600 mt-2">Last Contact</p>
            <p class="text-sm text-stone-900">${formatDate(contact.lastContact)}</p>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="event.stopPropagation();" class="px-4 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100">
              <i class="fas fa-envelope"></i>
            </button>
            <button onclick="event.stopPropagation();" class="px-4 py-2 bg-green-50 text-green-600 rounded hover:bg-green-100">
              <i class="fas fa-phone"></i>
            </button>
            <button onclick="event.stopPropagation(); openContactDetail('${contact.id}')" class="px-4 py-2 bg-stone-600 text-white rounded hover:bg-stone-700">
              View
            </button>
          </div>
        </div>
      </div>
    `;
    
    listView.appendChild(card);
  });
}

// Render table view
function renderTableView() {
  const tableBody = document.getElementById('contactsTableBody');
  tableBody.innerHTML = '';
  
  filteredContacts.forEach(contact => {
    const company = companiesData.find(c => c.id === contact.companyId);
    const initials = `${contact.firstName[0]}${contact.lastName[0]}`;
    const avatarColor = getAvatarColor(contact.id);
    
    const row = document.createElement('tr');
    row.className = 'hover:bg-stone-50 cursor-pointer';
    row.onclick = () => openContactDetail(contact.id);
    
    row.innerHTML = `
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full ${avatarColor} flex items-center justify-center text-white font-bold flex-shrink-0">
            ${initials}
          </div>
          <div>
            <div class="font-medium text-stone-900">${contact.firstName} ${contact.lastName}</div>
            <div class="text-sm text-stone-600">${contact.jobTitle}</div>
          </div>
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <span class="text-blue-600 hover:underline" onclick="event.stopPropagation(); openCompanyProfile('${contact.companyId}')">
          ${company ? company.name : 'Unknown'}
        </span>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <span class="${getContactTypeBadgeClass(contact.type)} px-2 py-1 rounded text-xs font-medium">
          ${contact.type}
        </span>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-stone-900">${contact.email}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-stone-900">${contact.phone}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-stone-600">${formatDate(contact.lastContact)}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm">
        <div class="flex gap-2">
          <button onclick="event.stopPropagation();" class="text-blue-600 hover:text-blue-800">
            <i class="fas fa-envelope"></i>
          </button>
          <button onclick="event.stopPropagation();" class="text-green-600 hover:text-green-800">
            <i class="fas fa-phone"></i>
          </button>
          <button onclick="event.stopPropagation(); openContactDetail('${contact.id}')" class="text-stone-600 hover:text-stone-800">
            <i class="fas fa-eye"></i>
          </button>
        </div>
      </td>
    `;
    
    tableBody.appendChild(row);
  });
}

// Update contact KPIs
function updateContactKPIs() {
  const totalContacts = filteredContacts.length;
  const activeTenants = filteredContacts.filter(c => c.type === 'Tenant').length;
  const prospects = filteredContacts.filter(c => c.type === 'Prospect').length;
  const companies = new Set(filteredContacts.map(c => c.companyId)).size;
  
  document.getElementById('totalContactsKPI').textContent = totalContacts;
  document.getElementById('activeTenantsKPI').textContent = activeTenants;
  document.getElementById('prospectsKPI').textContent = prospects;
  document.getElementById('companiesKPI').textContent = companies;
}

// Reset contact filters
function resetContactFilters() {
  document.getElementById('contactSearch').value = '';
  document.getElementById('contactTypeFilter').value = 'all';
  document.getElementById('contactCompanyFilter').value = 'all';
  document.getElementById('contactTagsFilter').value = 'all';
  document.getElementById('contactSortBy').value = 'nameAsc';
  filterContacts();
}

// Open contact detail modal
function openContactDetail(contactId) {
  currentContact = contactsData.find(c => c.id === contactId);
  if (!currentContact) return;
  
  const company = companiesData.find(c => c.id === currentContact.companyId);
  const initials = `${currentContact.firstName[0]}${currentContact.lastName[0]}`;
  const avatarColor = getAvatarColor(currentContact.id);
  
  // Set header
  document.getElementById('contactDetailAvatar').className = `w-16 h-16 rounded-full ${avatarColor} flex items-center justify-center text-white text-2xl font-bold`;
  document.getElementById('contactDetailAvatar').textContent = initials;
  document.getElementById('contactDetailName').textContent = `${currentContact.firstName} ${currentContact.lastName}`;
  document.getElementById('contactDetailTitle').textContent = currentContact.jobTitle;
  
  // Set overview tab
  document.getElementById('contactDetailEmail').textContent = currentContact.email;
  document.getElementById('contactDetailPhone').textContent = currentContact.phone;
  document.getElementById('contactDetailMobile').textContent = currentContact.mobile || 'N/A';
  document.getElementById('contactDetailLinkedin').textContent = currentContact.linkedin || 'N/A';
  document.getElementById('contactDetailLinkedin').href = currentContact.linkedin ? `https://${currentContact.linkedin}` : '#';
  document.getElementById('contactDetailAddress').textContent = currentContact.address ? `${currentContact.address.street}, ${currentContact.address.city}, ${currentContact.address.postcode}` : 'N/A';
  
  document.getElementById('contactDetailCompany').textContent = company ? company.name : 'Unknown';
  document.getElementById('contactDetailCompany').onclick = () => openCompanyProfile(currentContact.companyId);
  document.getElementById('contactDetailDepartment').textContent = currentContact.department || 'N/A';
  
  const typeElement = document.getElementById('contactDetailType');
  typeElement.className = `${getContactTypeBadgeClass(currentContact.type)} px-2 py-1 rounded text-xs font-medium`;
  typeElement.textContent = currentContact.type;
  
  const tagsContainer = document.getElementById('contactDetailTags');
  tagsContainer.innerHTML = currentContact.tags.map(tag => 
    `<span class="px-2 py-0.5 bg-stone-100 text-stone-600 rounded text-xs">${tag}</span>`
  ).join('');
  
  document.getElementById('contactDetailPreferred').textContent = currentContact.preferredContact || 'Email';
  document.getElementById('contactDetailLastContact').textContent = formatDate(currentContact.lastContact);
  document.getElementById('contactDetailNotes').textContent = currentContact.notes || 'No notes available.';
  
  // Populate timeline
  populateContactTimeline();
  
  // Populate communications
  populateContactCommunications();
  
  // Populate properties
  populateContactProperties();
  
  // Populate documents
  populateContactDocuments();
  
  // Show modal
  document.getElementById('contactDetailModal').classList.remove('hidden');
  document.getElementById('contactDetailModal').classList.add('flex');
  
  // Reset to overview tab
  switchContactDetailTab('overview');
}

// Close contact detail modal
function closeContactDetailModal() {
  document.getElementById('contactDetailModal').classList.add('hidden');
  document.getElementById('contactDetailModal').classList.remove('flex');
  currentContact = null;
}

// Switch contact detail tab
function switchContactDetailTab(tab) {
  // Update tab buttons
  document.querySelectorAll('.contact-detail-tab').forEach(btn => {
    btn.classList.remove('border-blue-600', 'text-blue-600');
    btn.classList.add('border-transparent', 'text-stone-600');
  });
  event.target.classList.remove('border-transparent', 'text-stone-600');
  event.target.classList.add('border-blue-600', 'text-blue-600');
  
  // Show/hide tab content
  document.querySelectorAll('.contact-detail-tab-content').forEach(content => {
    content.classList.add('hidden');
  });
  document.getElementById(`contactDetail${tab.charAt(0).toUpperCase() + tab.slice(1)}`).classList.remove('hidden');
}

// Populate contact timeline
function populateContactTimeline() {
  const timelineContent = document.getElementById('contactTimelineContent');
  if (!currentContact || !currentContact.timeline) {
    timelineContent.innerHTML = '<p class="text-stone-600">No timeline activity.</p>';
    return;
  }
  
  timelineContent.innerHTML = currentContact.timeline.map((item, index) => `
    <div class="flex gap-4">
      <div class="flex flex-col items-center">
        <div class="w-10 h-10 rounded-full ${getTimelineIconBg(item.type)} flex items-center justify-center">
          <i class="fas ${getTimelineIcon(item.type)} ${getTimelineIconColor(item.type)}"></i>
        </div>
        ${index < currentContact.timeline.length - 1 ? '<div class="w-0.5 h-full bg-stone-200 mt-2"></div>' : ''}
      </div>
      <div class="flex-1 pb-6">
        <div class="flex items-center justify-between mb-1">
          <h4 class="font-medium text-stone-900">${item.action}</h4>
          <span class="text-sm text-stone-500">${formatDate(item.date)}</span>
        </div>
        <p class="text-sm text-stone-600">${item.details}</p>
      </div>
    </div>
  `).join('');
}

// Populate contact communications
function populateContactCommunications() {
  const commsContent = document.getElementById('contactCommunicationsContent');
  if (!currentContact || !currentContact.communications) {
    commsContent.innerHTML = '<p class="text-stone-600">No communications logged.</p>';
    return;
  }
  
  commsContent.innerHTML = currentContact.communications.map(comm => `
    <div class="bg-stone-50 rounded-lg p-4">
      <div class="flex items-start justify-between mb-2">
        <div class="flex items-center gap-2">
          <i class="fas ${getCommunicationIcon(comm.type)} text-stone-600"></i>
          <span class="font-medium text-stone-900">${comm.subject || comm.type}</span>
          <span class="px-2 py-0.5 rounded text-xs ${comm.direction === 'sent' || comm.direction === 'outbound' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}">
            ${comm.direction}
          </span>
        </div>
        <span class="text-sm text-stone-500">${formatDate(comm.date)}</span>
      </div>
      ${comm.preview ? `<p class="text-sm text-stone-600">${comm.preview}</p>` : ''}
      ${comm.duration ? `<p class="text-sm text-stone-600 mt-1">Duration: ${comm.duration}</p>` : ''}
      ${comm.notes ? `<p class="text-sm text-stone-600 mt-1">${comm.notes}</p>` : ''}
    </div>
  `).join('');
}

// Populate contact properties
function populateContactProperties() {
  const propsContent = document.getElementById('contactPropertiesContent');
  if (!currentContact || !currentContact.properties || currentContact.properties.length === 0) {
    propsContent.innerHTML = '<p class="text-stone-600">No associated properties.</p>';
    return;
  }
  
  propsContent.innerHTML = currentContact.properties.map(prop => `
    <div class="bg-stone-50 rounded-lg p-4">
      <div class="flex items-start justify-between">
        <div>
          <h4 class="font-medium text-stone-900">${prop.propertyName}</h4>
          <p class="text-sm text-stone-600">${prop.unit}</p>
          <div class="flex items-center gap-2 mt-2">
            <span class="px-2 py-1 rounded text-xs font-medium ${getPropertyStatusBadge(prop.status)}">
              ${prop.status}
            </span>
            ${prop.moveInDate ? `<span class="text-xs text-stone-600">Move-in: ${formatDate(prop.moveInDate)}</span>` : ''}
            ${prop.leaseEnd ? `<span class="text-xs text-stone-600">Lease end: ${formatDate(prop.leaseEnd)}</span>` : ''}
          </div>
        </div>
        <button onclick="viewPropertyDetail('${prop.propertyId}')" class="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
          View Property
        </button>
      </div>
    </div>
  `).join('');
}

// Populate contact documents
function populateContactDocuments() {
  const docsContent = document.getElementById('contactDocumentsContent');
  if (!currentContact || !currentContact.documents || currentContact.documents.length === 0) {
    docsContent.innerHTML = '<p class="text-stone-600">No documents uploaded.</p>';
    return;
  }
  
  docsContent.innerHTML = currentContact.documents.map(doc => `
    <div class="flex items-center justify-between p-3 bg-stone-50 rounded-lg">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-red-100 rounded flex items-center justify-center">
          <i class="fas fa-file-pdf text-red-600"></i>
        </div>
        <div>
          <p class="font-medium text-stone-900">${doc.name}</p>
          <p class="text-sm text-stone-600">${doc.type} • ${doc.size} • ${formatDate(doc.uploadDate)}</p>
        </div>
      </div>
      <button class="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
        <i class="fas fa-download"></i>
      </button>
    </div>
  `).join('');
}

// Open company profile modal
function openCompanyProfile(companyId) {
  currentCompany = companiesData.find(c => c.id === companyId);
  if (!currentCompany) return;
  
  // Set header
  document.getElementById('companyProfileName').textContent = currentCompany.name;
  document.getElementById('companyProfileIndustry').textContent = currentCompany.industry;
  
  // Set overview tab
  document.getElementById('companyLegalName').textContent = currentCompany.legalName;
  document.getElementById('companyRegNumber').textContent = currentCompany.registrationNumber;
  document.getElementById('companyVatNumber').textContent = currentCompany.vatNumber;
  document.getElementById('companyIndustryDetail').textContent = currentCompany.industry;
  document.getElementById('companySize').textContent = `${currentCompany.size} employees`;
  document.getElementById('companyFounded').textContent = currentCompany.founded;
  
  document.getElementById('companyAddress').textContent = `${currentCompany.address.street}, ${currentCompany.address.city}, ${currentCompany.address.postcode}, ${currentCompany.address.country}`;
  document.getElementById('companyWebsite').textContent = currentCompany.website;
  document.getElementById('companyWebsite').href = `https://${currentCompany.website}`;
  document.getElementById('companyLinkedin').textContent = currentCompany.linkedin;
  document.getElementById('companyLinkedin').href = `https://${currentCompany.linkedin}`;
  
  document.getElementById('companyPrimaryContact').textContent = currentCompany.primaryContact.name;
  document.getElementById('companyPrimaryEmail').textContent = currentCompany.primaryContact.email;
  document.getElementById('companyPrimaryPhone').textContent = currentCompany.primaryContact.phone;
  
  // Populate contacts tab
  populateCompanyContacts();
  
  // Populate properties tab
  populateCompanyProperties();
  
  // Populate metrics tab
  populateCompanyMetrics();
  
  // Show modal
  document.getElementById('companyProfileModal').classList.remove('hidden');
  document.getElementById('companyProfileModal').classList.add('flex');
  
  // Reset to overview tab
  switchCompanyTab('overview');
}

// Close company profile modal
function closeCompanyProfileModal() {
  document.getElementById('companyProfileModal').classList.add('hidden');
  document.getElementById('companyProfileModal').classList.remove('flex');
  currentCompany = null;
}

// Switch company tab
function switchCompanyTab(tab) {
  // Update tab buttons
  document.querySelectorAll('.company-tab').forEach(btn => {
    btn.classList.remove('border-stone-700', 'text-stone-700');
    btn.classList.add('border-transparent', 'text-stone-600');
  });
  event.target.classList.remove('border-transparent', 'text-stone-600');
  event.target.classList.add('border-stone-700', 'text-stone-700');
  
  // Show/hide tab content
  document.querySelectorAll('.company-tab-content').forEach(content => {
    content.classList.add('hidden');
  });
  document.getElementById(`company${tab.charAt(0).toUpperCase() + tab.slice(1)}`).classList.remove('hidden');
}

// Populate company contacts
function populateCompanyContacts() {
  const contactsList = document.getElementById('companyContactsList');
  const companyContacts = contactsData.filter(c => c.companyId === currentCompany.id);
  
  if (companyContacts.length === 0) {
    contactsList.innerHTML = '<p class="text-stone-600">No contacts for this company.</p>';
    return;
  }
  
  contactsList.innerHTML = companyContacts.map(contact => {
    const initials = `${contact.firstName[0]}${contact.lastName[0]}`;
    const avatarColor = getAvatarColor(contact.id);
    
    return `
      <div class="flex items-center justify-between p-3 bg-stone-50 rounded-lg cursor-pointer hover:bg-stone-100" onclick="closeCompanyProfileModal(); openContactDetail('${contact.id}')">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full ${avatarColor} flex items-center justify-center text-white font-bold">
            ${initials}
          </div>
          <div>
            <p class="font-medium text-stone-900">${contact.firstName} ${contact.lastName}</p>
            <p class="text-sm text-stone-600">${contact.jobTitle}</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="${getContactTypeBadgeClass(contact.type)} px-2 py-1 rounded text-xs font-medium">
            ${contact.type}
          </span>
          <button class="text-blue-600 hover:text-blue-800">
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Populate company properties
function populateCompanyProperties() {
  const propertiesList = document.getElementById('companyPropertiesList');
  
  if (currentCompany.metrics.propertiesOccupied === 0) {
    propertiesList.innerHTML = '<p class="text-stone-600">No properties occupied by this company.</p>';
    return;
  }
  
  propertiesList.innerHTML = '<p class="text-stone-600">Property details would be populated from property data integration.</p>';
}

// Populate company metrics
function populateCompanyMetrics() {
  document.getElementById('companyPropertiesCount').textContent = currentCompany.metrics.propertiesOccupied;
  document.getElementById('companyUnitsCount').textContent = currentCompany.metrics.totalUnits;
  document.getElementById('companyAnnualRent').textContent = `£${(currentCompany.metrics.annualRent / 1000).toFixed(0)}k`;
  document.getElementById('companyContractValue').textContent = `£${(currentCompany.metrics.contractValue / 1000).toFixed(0)}k`;
  document.getElementById('companyTenantSince').textContent = currentCompany.metrics.tenantSince ? 
    `Tenant since ${formatDate(currentCompany.metrics.tenantSince)}` : 'Prospect - not yet a tenant';
}

// Open add contact modal
function openAddContactModal() {
  document.getElementById('addContactModal').classList.remove('hidden');
  document.getElementById('addContactModal').classList.add('flex');
  document.getElementById('addContactForm').reset();
}

// Close add contact modal
function closeAddContactModal() {
  document.getElementById('addContactModal').classList.add('hidden');
  document.getElementById('addContactModal').classList.remove('flex');
}

// Open add company modal
function openAddCompanyModal() {
  document.getElementById('addCompanyModal').classList.remove('hidden');
  document.getElementById('addCompanyModal').classList.add('flex');
  document.getElementById('addCompanyForm').reset();
}

// Close add company modal
function closeAddCompanyModal() {
  document.getElementById('addCompanyModal').classList.add('hidden');
  document.getElementById('addCompanyModal').classList.remove('flex');
}

// Handle add contact form submission
document.addEventListener('DOMContentLoaded', () => {
  const addContactForm = document.getElementById('addContactForm');
  if (addContactForm) {
    addContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // In production, this would send data to backend
      showToast('Contact added successfully!', 'success');
      closeAddContactModal();
      // Refresh contacts list
      filterContacts();
    });
  }
  
  const addCompanyForm = document.getElementById('addCompanyForm');
  if (addCompanyForm) {
    addCompanyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // In production, this would send data to backend
      showToast('Company added successfully!', 'success');
      closeAddCompanyModal();
    });
  }
});

// Export contacts to CSV
function exportContactsCSV() {
  const headers = ['ID', 'First Name', 'Last Name', 'Job Title', 'Company', 'Email', 'Phone', 'Type', 'Last Contact'];
  const rows = filteredContacts.map(contact => [
    contact.id,
    contact.firstName,
    contact.lastName,
    contact.jobTitle,
    getCompanyName(contact.companyId),
    contact.email,
    contact.phone,
    contact.type,
    formatDate(contact.lastContact)
  ]);
  
  let csvContent = headers.join(',') + '\n';
  rows.forEach(row => {
    csvContent += row.map(cell => `"${cell}"`).join(',') + '\n';
  });
  
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `contacts_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
  
  showToast('Contacts exported successfully!', 'success');
}

// Utility functions
function getCompanyName(companyId) {
  const company = companiesData.find(c => c.id === companyId);
  return company ? company.name : 'Unknown Company';
}

function getContactTypeBadgeClass(type) {
  const classes = {
    'Tenant': 'bg-green-100 text-green-700',
    'Prospect': 'bg-blue-100 text-blue-700',
    'Broker': 'bg-purple-100 text-purple-700',
    'Vendor': 'bg-orange-100 text-orange-700'
  };
  return classes[type] || 'bg-stone-100 text-stone-700';
}

function getAvatarColor(id) {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-orange-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
    'bg-red-500'
  ];
  const index = parseInt(id.split('-')[1]) % colors.length;
  return colors[index];
}

function getTimelineIcon(type) {
  const icons = {
    'email': 'fa-envelope',
    'call': 'fa-phone',
    'meeting': 'fa-calendar',
    'note': 'fa-sticky-note'
  };
  return icons[type] || 'fa-circle';
}

function getTimelineIconBg(type) {
  const bgs = {
    'email': 'bg-blue-100',
    'call': 'bg-green-100',
    'meeting': 'bg-purple-100',
    'note': 'bg-orange-100'
  };
  return bgs[type] || 'bg-stone-100';
}

function getTimelineIconColor(type) {
  const colors = {
    'email': 'text-blue-600',
    'call': 'text-green-600',
    'meeting': 'text-purple-600',
    'note': 'text-orange-600'
  };
  return colors[type] || 'text-stone-600';
}

function getCommunicationIcon(type) {
  const icons = {
    'email': 'fa-envelope',
    'call': 'fa-phone',
    'meeting': 'fa-calendar'
  };
  return icons[type] || 'fa-comment';
}

function getPropertyStatusBadge(status) {
  const classes = {
    'Occupied': 'bg-green-100 text-green-700',
    'Interested': 'bg-blue-100 text-blue-700',
    'Viewing Scheduled': 'bg-orange-100 text-orange-700'
  };
  return classes[status] || 'bg-stone-100 text-stone-700';
}

function formatDate(date) {
  if (!date) return 'N/A';
  const d = new Date(date);
  const now = new Date();
  const diffDays = Math.floor((now - d) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

// Initialize when page is loaded
if (document.getElementById('contacts-crm')) {
  initContactsCRM();
}
