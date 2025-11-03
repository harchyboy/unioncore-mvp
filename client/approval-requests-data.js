// Approval Requests Page - Dummy Data Population
// Populates the Pending Approvals page with realistic sample data

(function () {
  "use strict";

  console.log("🔧 Loading Approval Requests Data...");

  // Sample Approvals Data
  const APPROVALS_DATA = [
    {
      id: "APR-2024-001",
      priority: "Critical",
      type: "HoT Version",
      icon: "fa-file-contract",
      iconColor: "blue",
      dealName: "Canary Wharf Office",
      documentRef: "HoT_v3.2_Legal_Review",
      role: "Legal",
      approver: {
        name: "Sarah Mitchell",
        title: "Legal Counsel",
        avatar:
          "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg",
      },
      value: 2100000,
      dueDate: new Date("2024-11-10"),
      status: "overdue",
      daysOverdue: 3,
      slaProgress: 100,
      slaStatus: "Breached",
    },
    {
      id: "APR-2024-002",
      priority: "High",
      type: "Contract",
      icon: "fa-file-signature",
      iconColor: "purple",
      dealName: "Shoreditch Retail Space",
      documentRef: "Lease_Agreement_v2.0",
      role: "Executive",
      approver: {
        name: "Michael Chen",
        title: "Managing Director",
        avatar:
          "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
      },
      value: 850000,
      dueDate: new Date("2024-11-12"),
      status: "overdue",
      daysOverdue: 1,
      slaProgress: 100,
      slaStatus: "Breached",
    },
    {
      id: "APR-2024-003",
      priority: "High",
      type: "Budget Approval",
      icon: "fa-calculator",
      iconColor: "green",
      dealName: "Kings Cross Development",
      documentRef: "Budget_Q4_2024",
      role: "Finance",
      approver: {
        name: "Emma Davis",
        title: "Finance Director",
        avatar:
          "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
      },
      value: 4200000,
      dueDate: new Date("2024-11-13"),
      status: "overdue",
      daysOverdue: 0,
      slaProgress: 95,
      slaStatus: "At Risk",
    },
    {
      id: "APR-2024-004",
      priority: "Critical",
      type: "Risk Assessment",
      icon: "fa-exclamation-triangle",
      iconColor: "yellow",
      dealName: "Westminster Office Space",
      documentRef: "Risk_Analysis_Report",
      role: "Risk",
      approver: {
        name: "David Kim",
        title: "Risk Manager",
        avatar:
          "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg",
      },
      value: 1350000,
      dueDate: new Date("2024-11-13"),
      status: "due_today",
      daysOverdue: 0,
      slaProgress: 85,
      slaStatus: "On Track",
    },
    {
      id: "APR-2024-005",
      priority: "Medium",
      type: "Tenant Agreement",
      icon: "fa-handshake",
      iconColor: "yellow",
      dealName: "Southbank Office",
      documentRef: "Tenant_Terms_Modification",
      role: "Legal",
      approver: {
        name: "Sarah Mitchell",
        title: "Legal Counsel",
        avatar:
          "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg",
      },
      value: 1800000,
      dueDate: new Date("2024-11-13"),
      status: "due_today",
      daysOverdue: 0,
      slaProgress: 70,
      slaStatus: "On Track",
    },
    {
      id: "APR-2024-006",
      priority: "High",
      type: "Pricing Exception",
      icon: "fa-tags",
      iconColor: "orange",
      dealName: "Mayfair Retail",
      documentRef: "Pricing_Exception_Request",
      role: "Executive",
      approver: {
        name: "Michael Chen",
        title: "Managing Director",
        avatar:
          "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
      },
      value: 950000,
      dueDate: new Date("2024-11-14"),
      status: "due_soon",
      daysOverdue: 0,
      slaProgress: 60,
      slaStatus: "On Track",
    },
    {
      id: "APR-2024-007",
      priority: "Medium",
      type: "Legal Review",
      icon: "fa-gavel",
      iconColor: "blue",
      dealName: "City of London Tower",
      documentRef: "Legal_Due_Diligence",
      role: "Legal",
      approver: {
        name: "Sarah Mitchell",
        title: "Legal Counsel",
        avatar:
          "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg",
      },
      value: 3200000,
      dueDate: new Date("2024-11-15"),
      status: "pending",
      daysOverdue: 0,
      slaProgress: 45,
      slaStatus: "On Track",
    },
    {
      id: "APR-2024-008",
      priority: "Low",
      type: "Document Sign-off",
      icon: "fa-pen",
      iconColor: "gray",
      dealName: "Greenwich Warehouse",
      documentRef: "Final_Documentation",
      role: "Operations",
      approver: {
        name: "Tom Harrison",
        title: "Operations Manager",
        avatar:
          "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
      },
      value: 725000,
      dueDate: new Date("2024-11-16"),
      status: "pending",
      daysOverdue: 0,
      slaProgress: 35,
      slaStatus: "On Track",
    },
    {
      id: "APR-2024-009",
      priority: "High",
      type: "Compliance Check",
      icon: "fa-shield-alt",
      iconColor: "purple",
      dealName: "Docklands Office Park",
      documentRef: "Compliance_Verification",
      role: "Compliance",
      approver: {
        name: "Rachel Brown",
        title: "Compliance Officer",
        avatar:
          "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg",
      },
      value: 2800000,
      dueDate: new Date("2024-11-17"),
      status: "pending",
      daysOverdue: 0,
      slaProgress: 50,
      slaStatus: "On Track",
    },
    {
      id: "APR-2024-010",
      priority: "Medium",
      type: "Budget Adjustment",
      icon: "fa-coins",
      iconColor: "green",
      dealName: "Hammersmith Business Center",
      documentRef: "Budget_Revision_Q1_2025",
      role: "Finance",
      approver: {
        name: "Emma Davis",
        title: "Finance Director",
        avatar:
          "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
      },
      value: 1650000,
      dueDate: new Date("2024-11-18"),
      status: "pending",
      daysOverdue: 0,
      slaProgress: 40,
      slaStatus: "On Track",
    },
    {
      id: "APR-2024-011",
      priority: "Low",
      type: "Vendor Approval",
      icon: "fa-users",
      iconColor: "blue",
      dealName: "Stratford Retail Hub",
      documentRef: "Vendor_Contract_Approval",
      role: "Procurement",
      approver: {
        name: "James Wilson",
        title: "Procurement Lead",
        avatar:
          "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg",
      },
      value: 450000,
      dueDate: new Date("2024-11-19"),
      status: "pending",
      daysOverdue: 0,
      slaProgress: 30,
      slaStatus: "On Track",
    },
    {
      id: "APR-2024-012",
      priority: "High",
      type: "Contract Extension",
      icon: "fa-file-contract",
      iconColor: "orange",
      dealName: "Camden Market Space",
      documentRef: "Extension_Agreement_v1.0",
      role: "Legal",
      approver: {
        name: "Sarah Mitchell",
        title: "Legal Counsel",
        avatar:
          "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg",
      },
      value: 1125000,
      dueDate: new Date("2024-11-20"),
      status: "pending",
      daysOverdue: 0,
      slaProgress: 25,
      slaStatus: "On Track",
    },
    {
      id: "APR-2024-013",
      priority: "Medium",
      type: "Insurance Review",
      icon: "fa-umbrella",
      iconColor: "blue",
      dealName: "Kensington Office Suite",
      documentRef: "Insurance_Policy_Review",
      role: "Risk",
      approver: {
        name: "David Kim",
        title: "Risk Manager",
        avatar:
          "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg",
      },
      value: 1950000,
      dueDate: new Date("2024-11-21"),
      status: "pending",
      daysOverdue: 0,
      slaProgress: 20,
      slaStatus: "On Track",
    },
    {
      id: "APR-2024-014",
      priority: "Low",
      type: "Marketing Approval",
      icon: "fa-bullhorn",
      iconColor: "pink",
      dealName: "Notting Hill Boutique",
      documentRef: "Marketing_Materials_Approval",
      role: "Marketing",
      approver: {
        name: "Sophie Turner",
        title: "Marketing Director",
        avatar:
          "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg",
      },
      value: 325000,
      dueDate: new Date("2024-11-22"),
      status: "pending",
      daysOverdue: 0,
      slaProgress: 15,
      slaStatus: "On Track",
    },
    {
      id: "APR-2024-015",
      priority: "High",
      type: "Final Sign-off",
      icon: "fa-check-circle",
      iconColor: "green",
      dealName: "Battersea Power Station",
      documentRef: "Final_Approval_Package",
      role: "Executive",
      approver: {
        name: "Michael Chen",
        title: "Managing Director",
        avatar:
          "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
      },
      value: 5200000,
      dueDate: new Date("2024-11-23"),
      status: "pending",
      daysOverdue: 0,
      slaProgress: 10,
      slaStatus: "On Track",
    },
    {
      id: "APR-2024-016",
      priority: "Medium",
      type: "Environmental Check",
      icon: "fa-leaf",
      iconColor: "green",
      dealName: "Richmond Park Office",
      documentRef: "Environmental_Assessment",
      role: "Compliance",
      approver: {
        name: "Rachel Brown",
        title: "Compliance Officer",
        avatar:
          "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg",
      },
      value: 875000,
      dueDate: new Date("2024-11-24"),
      status: "pending",
      daysOverdue: 0,
      slaProgress: 5,
      slaStatus: "On Track",
    },
    {
      id: "APR-2024-017",
      priority: "Low",
      type: "IT Security Review",
      icon: "fa-lock",
      iconColor: "red",
      dealName: "Finsbury Square Tech Hub",
      documentRef: "Security_Audit_Report",
      role: "IT",
      approver: {
        name: "Alex Chen",
        title: "IT Security Manager",
        avatar:
          "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg",
      },
      value: 1425000,
      dueDate: new Date("2024-11-25"),
      status: "pending",
      daysOverdue: 0,
      slaProgress: 0,
      slaStatus: "On Track",
    },
  ];

  // Helper function to format currency
  function formatCurrency(value) {
    return "£" + (value / 1000000).toFixed(2) + "M";
  }

  // Helper function to format date
  function formatDate(date) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  }

  // Helper function to get priority badge
  function getPriorityBadge(priority) {
    const badges = {
      Critical:
        '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"><i class="fa-solid fa-exclamation-triangle mr-1"></i>Critical</span>',
      High: '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800"><i class="fa-solid fa-arrow-up mr-1"></i>High</span>',
      Medium:
        '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><i class="fa-solid fa-minus mr-1"></i>Medium</span>',
      Low: '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"><i class="fa-solid fa-arrow-down mr-1"></i>Low</span>',
    };
    return badges[priority] || badges["Medium"];
  }

  // Helper function to get role badge
  function getRoleBadge(role) {
    const colors = {
      Legal: "blue",
      Finance: "green",
      Executive: "purple",
      Risk: "red",
      Operations: "gray",
      Compliance: "indigo",
      Procurement: "teal",
      Marketing: "pink",
      IT: "cyan",
    };
    const color = colors[role] || "gray";
    return `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${color}-100 text-${color}-800">${role}</span>`;
  }

  // Update overview metrics
  function updateOverviewMetrics() {
    const overdue = APPROVALS_DATA.filter(a => a.status === "overdue").length;
    const dueToday = APPROVALS_DATA.filter(
      a => a.status === "due_today"
    ).length;
    const thisWeek = APPROVALS_DATA.filter(a => {
      const daysUntilDue = Math.ceil(
        (a.dueDate - new Date()) / (1000 * 60 * 60 * 24)
      );
      return daysUntilDue <= 7 && daysUntilDue >= 0;
    }).length;

    const metricsHTML = `
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-600">Total Pending</p>
                        <p class="text-3xl font-bold text-gray-900 mt-2">${APPROVALS_DATA.length}</p>
                        <div class="flex items-center mt-2">
                            <span class="text-blue-600 text-sm font-medium">+4</span>
                            <span class="text-gray-500 text-sm ml-2">this week</span>
                        </div>
                    </div>
                    <div class="bg-orange-100 p-3 rounded-full">
                        <i class="fa-solid fa-clock text-orange-600 text-xl"></i>
                    </div>
                </div>
            </div>
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-600">Overdue</p>
                        <p class="text-3xl font-bold text-red-600 mt-2">${overdue}</p>
                        <div class="flex items-center mt-2">
                            <span class="text-red-600 text-sm font-medium">URGENT</span>
                        </div>
                    </div>
                    <div class="bg-red-100 p-3 rounded-full">
                        <i class="fa-solid fa-exclamation-triangle text-red-600 text-xl"></i>
                    </div>
                </div>
            </div>
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-600">Due Today</p>
                        <p class="text-3xl font-bold text-yellow-600 mt-2">${dueToday}</p>
                        <div class="flex items-center mt-2">
                            <span class="text-yellow-600 text-sm font-medium">PRIORITY</span>
                        </div>
                    </div>
                    <div class="bg-yellow-100 p-3 rounded-full">
                        <i class="fa-solid fa-calendar-day text-yellow-600 text-xl"></i>
                    </div>
                </div>
            </div>
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-600">This Week</p>
                        <p class="text-3xl font-bold text-blue-600 mt-2">${thisWeek}</p>
                        <div class="flex items-center mt-2">
                            <span class="text-blue-600 text-sm font-medium">UPCOMING</span>
                        </div>
                    </div>
                    <div class="bg-blue-100 p-3 rounded-full">
                        <i class="fa-solid fa-calendar-week text-blue-600 text-xl"></i>
                    </div>
                </div>
            </div>
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-600">Avg Response</p>
                        <p class="text-3xl font-bold text-green-600 mt-2">2.3</p>
                        <div class="flex items-center mt-2">
                            <span class="text-gray-500 text-sm">days</span>
                        </div>
                    </div>
                    <div class="bg-green-100 p-3 rounded-full">
                        <i class="fa-solid fa-chart-line text-green-600 text-xl"></i>
                    </div>
                </div>
            </div>
        `;

    const overviewSection = document.querySelector(
      "#approval-overview-section .grid"
    );
    if (overviewSection) {
      overviewSection.innerHTML = metricsHTML;
    }
  }

  // Populate critical approvals section
  function populateCriticalApprovals() {
    const criticalApprovals = APPROVALS_DATA.filter(
      a => a.status === "overdue" || a.priority === "Critical"
    );
    const section = document.querySelector(
      "#critical-approvals-section .space-y-4"
    );

    if (!section) return;

    let html = "";
    criticalApprovals.slice(0, 5).forEach(approval => {
      const bgColor = approval.status === "overdue" ? "red" : "orange";
      const dueText =
        approval.status === "overdue"
          ? `<span class="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium">${approval.daysOverdue} DAYS OVERDUE</span>`
          : `<span class="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-medium">DUE ${formatDate(approval.dueDate).toUpperCase()}</span>`;

      html += `
                <div class="p-5 bg-${bgColor}-50 border border-${bgColor}-200 rounded-lg" data-approval-card="${approval.id}">
                    <div class="flex items-start space-x-4">
                        <div class="bg-${bgColor}-100 p-2 rounded-full">
                            <i class="fa-solid ${approval.icon} text-${bgColor}-600"></i>
                        </div>
                        <div class="flex-1">
                            <div class="flex items-center justify-between mb-2">
                                <h4 class="font-semibold text-gray-900">${approval.type}</h4>
                                ${dueText}
                            </div>
                            <p class="text-gray-700 mb-3">${approval.dealName} - ${approval.documentRef}</p>
                            <div class="grid grid-cols-2 gap-3 text-sm mb-4">
                                <div>
                                    <span class="text-gray-500">Value:</span>
                                    <span class="font-medium text-gray-900 ml-1">${formatCurrency(approval.value)}</span>
                                </div>
                                <div>
                                    <span class="text-gray-500">Approver:</span>
                                    <span class="font-medium text-gray-900 ml-1">${approval.approver.name}</span>
                                </div>
                            </div>
                            <div class="flex space-x-2">
                                <button class="px-3 py-1.5 bg-white border border-${bgColor}-300 text-${bgColor}-700 rounded text-sm hover:bg-${bgColor}-50 btn-view-details" data-approval-id="${approval.id}">
                                    View Details
                                </button>
                                <button class="px-3 py-1.5 bg-${bgColor}-600 text-white rounded text-sm hover:bg-${bgColor}-700 ${approval.status === "overdue" ? "btn-escalate-approval" : "btn-approve-critical"}" data-approval-id="${approval.id}">
                                    ${approval.status === "overdue" ? "Escalate" : "Approve"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
    });

    section.innerHTML = html;
    attachCriticalEventListeners();
  }

  // Attach event listeners to critical approval buttons
  function attachCriticalEventListeners() {
    // View Details buttons
    document.querySelectorAll(".btn-view-details").forEach(btn => {
      btn.addEventListener("click", handleViewDetails);
    });

    // Approve buttons in critical section
    document.querySelectorAll(".btn-approve-critical").forEach(btn => {
      btn.addEventListener("click", handleApproveApproval);
    });

    // Escalate buttons in critical section
    document
      .querySelectorAll("#critical-approvals-section .btn-escalate-approval")
      .forEach(btn => {
        btn.addEventListener("click", handleEscalateApproval);
      });
  }

  // Populate approvals table
  function populateApprovalsTable() {
    const tbody = document.querySelector("#all-approvals-table-section tbody");
    if (!tbody) return;

    let html = "";
    APPROVALS_DATA.forEach(approval => {
      const rowBgClass = approval.status === "overdue" ? "bg-red-50" : "";
      const dateColor =
        approval.status === "overdue"
          ? "text-red-600"
          : approval.status === "due_today"
            ? "text-yellow-600"
            : "text-gray-900";
      const dueText =
        approval.status === "overdue"
          ? `<div class="text-xs text-red-600">${approval.daysOverdue} days overdue</div>`
          : "";

      const slaColor =
        approval.slaProgress >= 90
          ? "red"
          : approval.slaProgress >= 70
            ? "yellow"
            : "green";

      html += `
                <tr class="hover:bg-gray-50 ${rowBgClass}" data-approval-id="${approval.id}">
                    <td class="py-4 px-4">
                        <input class="rounded border-gray-300 focus:ring-blue-500" type="checkbox"/>
                    </td>
                    <td class="py-4 px-4">
                        ${getPriorityBadge(approval.priority)}
                    </td>
                    <td class="py-4 px-4">
                        <div class="flex items-center space-x-2">
                            <i class="fa-solid ${approval.icon} text-${approval.iconColor}-600"></i>
                            <span class="font-medium text-gray-900">${approval.type}</span>
                        </div>
                    </td>
                    <td class="py-4 px-4">
                        <div>
                            <div class="font-medium text-gray-900">${approval.dealName}</div>
                            <div class="text-sm text-gray-500">${approval.documentRef}</div>
                        </div>
                    </td>
                    <td class="py-4 px-4">
                        ${getRoleBadge(approval.role)}
                    </td>
                    <td class="py-4 px-4">
                        <div class="flex items-center">
                            <img alt="${approval.approver.name}" class="w-8 h-8 rounded-full mr-2" src="${approval.approver.avatar}"/>
                            <div>
                                <div class="text-sm font-medium text-gray-900">${approval.approver.name}</div>
                                <div class="text-xs text-gray-500">${approval.approver.title}</div>
                            </div>
                        </div>
                    </td>
                    <td class="py-4 px-4 font-medium text-gray-900">${formatCurrency(approval.value)}</td>
                    <td class="py-4 px-4">
                        <div class="${dateColor} font-medium">${formatDate(approval.dueDate)}</div>
                        ${dueText}
                    </td>
                    <td class="py-4 px-4">
                        <div class="flex items-center">
                            <div class="w-16 bg-${slaColor}-200 rounded-full h-2 mr-2">
                                <div class="bg-${slaColor}-500 h-2 rounded-full" style="width: ${approval.slaProgress}%"></div>
                            </div>
                            <span class="text-xs text-${slaColor}-600 font-medium">${approval.slaStatus}</span>
                        </div>
                    </td>
                    <td class="py-4 px-4">
                        <div class="flex space-x-2">
                            <button class="text-blue-600 hover:text-blue-800 text-sm btn-review-approval" data-approval-id="${approval.id}">Review</button>
                            <button class="text-red-600 hover:text-red-800 text-sm btn-escalate-approval" data-approval-id="${approval.id}">Escalate</button>
                        </div>
                    </td>
                </tr>
            `;
    });

    tbody.innerHTML = html;
    attachTableEventListeners();
  }

  // Attach event listeners to table buttons
  function attachTableEventListeners() {
    // Review buttons
    document.querySelectorAll(".btn-review-approval").forEach(btn => {
      btn.addEventListener("click", handleReviewApproval);
    });

    // Escalate buttons
    document.querySelectorAll(".btn-escalate-approval").forEach(btn => {
      btn.addEventListener("click", handleEscalateApproval);
    });
  }

  // Event Handlers
  function handleApproveApproval(e) {
    e.preventDefault();
    const approvalId = e.target.getAttribute("data-approval-id");
    const approval = APPROVALS_DATA.find(a => a.id === approvalId);

    if (!approval) return;

    // Show confirmation
    if (
      confirm(
        `Approve ${approval.type} for ${approval.dealName}?\n\nValue: ${formatCurrency(approval.value)}\nApprover: ${approval.approver.name}`
      )
    ) {
      // Simulate approval process
      console.log(`✅ Approved: ${approval.id} - ${approval.dealName}`);

      // Remove from data array
      const index = APPROVALS_DATA.findIndex(a => a.id === approvalId);
      if (index > -1) {
        APPROVALS_DATA.splice(index, 1);
      }

      // Show success notification
      showNotification(
        "Approval Successful",
        `${approval.type} for ${approval.dealName} has been approved.`,
        "success"
      );

      // Refresh the page sections
      updateOverviewMetrics();
      populateCriticalApprovals();
      populateApprovalsTable();
    }
  }

  function handleReviewApproval(e) {
    e.preventDefault();
    const approvalId = e.target.getAttribute("data-approval-id");
    const approval = APPROVALS_DATA.find(a => a.id === approvalId);

    if (!approval) return;

    // Show detailed review modal
    alert(
      `REVIEW APPROVAL\n\n` +
        `ID: ${approval.id}\n` +
        `Type: ${approval.type}\n` +
        `Deal: ${approval.dealName}\n` +
        `Document: ${approval.documentRef}\n` +
        `Value: ${formatCurrency(approval.value)}\n` +
        `Priority: ${approval.priority}\n` +
        `Approver: ${approval.approver.name} (${approval.approver.title})\n` +
        `Role: ${approval.role}\n` +
        `Due Date: ${formatDate(approval.dueDate)}\n` +
        `Status: ${approval.status}\n` +
        `SLA: ${approval.slaStatus} (${approval.slaProgress}%)\n\n` +
        `Click OK to continue reviewing...`
    );

    console.log("📋 Reviewing approval:", approval);
  }

  function handleEscalateApproval(e) {
    e.preventDefault();
    const approvalId = e.target.getAttribute("data-approval-id");
    const approval = APPROVALS_DATA.find(a => a.id === approvalId);

    if (!approval) return;

    // Show escalation confirmation
    if (
      confirm(
        `Escalate ${approval.type} for ${approval.dealName}?\n\nThis will notify management and flag as urgent.\n\nValue: ${formatCurrency(approval.value)}`
      )
    ) {
      // Simulate escalation
      console.log(`🚨 Escalated: ${approval.id} - ${approval.dealName}`);

      // Update approval priority
      approval.priority = "Critical";
      approval.slaStatus = "Escalated";

      // Show success notification
      showNotification(
        "Approval Escalated",
        `${approval.type} for ${approval.dealName} has been escalated to management.`,
        "warning"
      );

      // Refresh the page sections
      populateCriticalApprovals();
      populateApprovalsTable();
    }
  }

  function handleViewDetails(e) {
    e.preventDefault();
    const approvalId = e.target.getAttribute("data-approval-id");
    const approval = APPROVALS_DATA.find(a => a.id === approvalId);

    if (!approval) return;

    // Show detailed view
    alert(
      `APPROVAL DETAILS\n\n` +
        `ID: ${approval.id}\n` +
        `Type: ${approval.type}\n` +
        `Deal: ${approval.dealName}\n` +
        `Document: ${approval.documentRef}\n` +
        `Value: ${formatCurrency(approval.value)}\n` +
        `Priority: ${approval.priority}\n` +
        `Approver: ${approval.approver.name}\n` +
        `Title: ${approval.approver.title}\n` +
        `Department: ${approval.role}\n` +
        `Due Date: ${formatDate(approval.dueDate)}\n` +
        `Status: ${approval.status.toUpperCase()}\n` +
        `SLA Progress: ${approval.slaProgress}%\n` +
        `SLA Status: ${approval.slaStatus}\n\n` +
        (approval.status === "overdue"
          ? `⚠️ OVERDUE BY ${approval.daysOverdue} DAYS\n\n`
          : "") +
        `Would you like to approve this now?`
    );

    console.log("👁️ Viewing approval details:", approval);
  }

  // Notification helper
  function showNotification(title, message, type = "info") {
    const colors = {
      success: {
        bg: "bg-green-100",
        border: "border-green-500",
        text: "text-green-800",
        icon: "fa-check-circle",
      },
      warning: {
        bg: "bg-yellow-100",
        border: "border-yellow-500",
        text: "text-yellow-800",
        icon: "fa-exclamation-triangle",
      },
      error: {
        bg: "bg-red-100",
        border: "border-red-500",
        text: "text-red-800",
        icon: "fa-times-circle",
      },
      info: {
        bg: "bg-blue-100",
        border: "border-blue-500",
        text: "text-blue-800",
        icon: "fa-info-circle",
      },
    };

    const style = colors[type] || colors["info"];

    // Create notification element
    const notification = document.createElement("div");
    notification.className = `fixed top-4 right-4 ${style.bg} border-l-4 ${style.border} ${style.text} p-4 rounded-lg shadow-lg z-50 max-w-md animate-slide-in`;
    notification.innerHTML = `
            <div class="flex items-start">
                <div class="flex-shrink-0">
                    <i class="fa-solid ${style.icon} text-xl"></i>
                </div>
                <div class="ml-3 flex-1">
                    <h3 class="text-sm font-bold">${title}</h3>
                    <p class="text-sm mt-1">${message}</p>
                </div>
                <button class="ml-3 flex-shrink-0 inline-flex text-gray-400 hover:text-gray-600" onclick="this.parentElement.parentElement.remove()">
                    <i class="fa-solid fa-times"></i>
                </button>
            </div>
        `;

    document.body.appendChild(notification);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 5000);

    console.log(`📢 Notification: ${title} - ${message}`);
  }

  // Attach event listeners to existing static buttons in HTML
  function attachStaticButtonListeners() {
    console.log("🔌 Attaching event listeners to existing static buttons...");

    // Find all "Approve" buttons in the page
    const approveButtons = document.querySelectorAll(
      "#approval-requests-page button"
    );

    approveButtons.forEach(button => {
      const buttonText = button.textContent.trim();

      if (buttonText === "Approve") {
        // Add data attributes if they don't exist
        if (!button.hasAttribute("data-has-listener")) {
          button.setAttribute("data-has-listener", "true");
          button.addEventListener("click", handleStaticApprove);
          console.log("✅ Attached approve listener to button");
        }
      } else if (buttonText === "View Details") {
        if (!button.hasAttribute("data-has-listener")) {
          button.setAttribute("data-has-listener", "true");
          button.addEventListener("click", handleStaticViewDetails);
          console.log("✅ Attached view details listener to button");
        }
      } else if (buttonText === "Escalate") {
        if (!button.hasAttribute("data-has-listener")) {
          button.setAttribute("data-has-listener", "true");
          button.addEventListener("click", handleStaticEscalate);
          console.log("✅ Attached escalate listener to button");
        }
      } else if (buttonText === "Review") {
        if (!button.hasAttribute("data-has-listener")) {
          button.setAttribute("data-has-listener", "true");
          button.addEventListener("click", handleStaticReview);
          console.log("✅ Attached review listener to button");
        }
      }
    });

    console.log("✅ Static button listeners attached");
  }

  // Handler for static approve buttons
  function handleStaticApprove(e) {
    e.preventDefault();

    // Find the card containing this button
    const card = e.target.closest(".p-5");
    if (!card) return;

    // Extract information from the card
    const titleElement = card.querySelector("h4");
    const dealName = titleElement
      ? titleElement.textContent.trim()
      : "Unknown Deal";
    const descElement = card.querySelector(".text-gray-700");
    const description = descElement ? descElement.textContent.trim() : "";
    const valueElement = card.querySelector(".font-medium.text-gray-900.ml-1");
    const value = valueElement ? valueElement.textContent.trim() : "Unknown";

    // Show confirmation
    if (
      confirm(
        `Approve: ${dealName}?\n\nDescription: ${description}\nValue: ${value}\n\nClick OK to approve.`
      )
    ) {
      console.log(`✅ Approved: ${dealName}`);

      // Show success notification
      showNotification(
        "Approval Successful",
        `${dealName} has been approved.`,
        "success"
      );

      // Remove the card with animation
      card.style.transition = "all 0.3s ease-out";
      card.style.opacity = "0";
      card.style.transform = "scale(0.95)";

      setTimeout(() => {
        card.remove();
        console.log("Card removed from DOM");
      }, 300);
    }
  }

  // Handler for static view details buttons
  function handleStaticViewDetails(e) {
    e.preventDefault();

    const card = e.target.closest(".p-5");
    if (!card) return;

    const titleElement = card.querySelector("h4");
    const dealName = titleElement ? titleElement.textContent.trim() : "Unknown";
    const descElement = card.querySelector(".text-gray-700");
    const description = descElement ? descElement.textContent.trim() : "";
    const valueElements = card.querySelectorAll(
      ".font-medium.text-gray-900.ml-1"
    );
    const value = valueElements[0]
      ? valueElements[0].textContent.trim()
      : "Unknown";
    const approver = valueElements[1]
      ? valueElements[1].textContent.trim()
      : "Unknown";

    alert(
      `APPROVAL DETAILS\n\n` +
        `Deal: ${dealName}\n` +
        `Description: ${description}\n` +
        `Value: ${value}\n` +
        `Approver: ${approver}\n\n` +
        `Click OK to continue...`
    );

    console.log("👁️ Viewing details:", dealName);
  }

  // Handler for static escalate buttons
  function handleStaticEscalate(e) {
    e.preventDefault();

    const card = e.target.closest(".p-5");
    if (!card) return;

    const titleElement = card.querySelector("h4");
    const dealName = titleElement ? titleElement.textContent.trim() : "Unknown";
    const descElement = card.querySelector(".text-gray-700");
    const description = descElement ? descElement.textContent.trim() : "";

    if (
      confirm(
        `Escalate: ${dealName}?\n\nDescription: ${description}\n\nThis will notify management and flag as urgent.\n\nClick OK to escalate.`
      )
    ) {
      console.log(`🚨 Escalated: ${dealName}`);

      // Show warning notification
      showNotification(
        "Approval Escalated",
        `${dealName} has been escalated to management.`,
        "warning"
      );

      // Change card styling to show it's escalated
      card.classList.add("border-red-500", "bg-red-50");

      // Update the button
      e.target.textContent = "Escalated";
      e.target.disabled = true;
      e.target.classList.add("opacity-50", "cursor-not-allowed");
    }
  }

  // Handler for static review buttons
  function handleStaticReview(e) {
    e.preventDefault();

    const row = e.target.closest("tr");
    if (!row) return;

    const cells = row.querySelectorAll("td");
    const dealName = cells[3] ? cells[3].textContent.trim() : "Unknown";

    alert(
      `REVIEW APPROVAL\n\nDeal: ${dealName}\n\nClick OK to continue reviewing...`
    );

    console.log("📋 Reviewing:", dealName);
  }

  // Initialize when page becomes visible
  function initializeApprovalsPage() {
    const approvalsPage = document.getElementById("approval-requests-page");
    if (!approvalsPage) {
      setTimeout(initializeApprovalsPage, 500);
      return;
    }

    // Check if page is visible
    if (approvalsPage.classList.contains("hidden")) {
      setTimeout(initializeApprovalsPage, 500);
      return;
    }

    console.log("📊 Initializing Approval Requests page...");

    // First, attach listeners to existing static buttons
    attachStaticButtonListeners();

    // Then populate dynamic content
    updateOverviewMetrics();
    populateCriticalApprovals();
    populateApprovalsTable();

    console.log(
      "✅ Approval Requests page initialized with dummy data and event listeners"
    );
  }

  // Watch for page visibility changes
  function setupPageObserver() {
    const targetPage = document.getElementById("approval-requests-page");
    if (!targetPage) {
      setTimeout(setupPageObserver, 1000);
      return;
    }

    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          const page = document.getElementById("approval-requests-page");
          if (page && !page.classList.contains("hidden")) {
            setTimeout(initializeApprovalsPage, 300);
          }
        }
      });
    });

    observer.observe(targetPage, { attributes: true });

    // Also try immediate initialization if page is already visible
    if (!targetPage.classList.contains("hidden")) {
      setTimeout(initializeApprovalsPage, 300);
    }
  }

  // Start when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      setupPageObserver();
      // Try immediate initialization
      setTimeout(function () {
        const page = document.getElementById("approval-requests-page");
        if (page && !page.classList.contains("hidden")) {
          attachStaticButtonListeners();
        }
      }, 1000);
    });
  } else {
    setupPageObserver();
    // Try immediate initialization
    setTimeout(function () {
      const page = document.getElementById("approval-requests-page");
      if (page && !page.classList.contains("hidden")) {
        attachStaticButtonListeners();
      }
    }, 1000);
  }

  // Also listen for hash changes
  window.addEventListener("hashchange", function () {
    if (window.location.hash === "#/approval-requests") {
      setTimeout(function () {
        initializeApprovalsPage();
        attachStaticButtonListeners();
      }, 300);
    }
  });

  // Try initialization every 2 seconds for the first 10 seconds (in case page loads slowly)
  let attemptCount = 0;
  const maxAttempts = 5;
  const initInterval = setInterval(function () {
    attemptCount++;
    const page = document.getElementById("approval-requests-page");
    if (page && !page.classList.contains("hidden")) {
      if (!page.hasAttribute("data-buttons-attached")) {
        page.setAttribute("data-buttons-attached", "true");
        attachStaticButtonListeners();
        console.log("✅ Buttons attached via interval check");
      }
    }
    if (attemptCount >= maxAttempts) {
      clearInterval(initInterval);
    }
  }, 2000);

  console.log("✅ Approval Requests Data Script loaded and ready");
})();
