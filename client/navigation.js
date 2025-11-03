// ========================================
// NAVIGATION & ROUTING SYSTEM
// ========================================

let currentPage = "dashboard";

/**
 * Navigate to a specific page by name
 * @param {string} pageName - The name of the page to navigate to (e.g., 'dashboard', 'property-index')
 */
function navigateToPage(pageName) {
  console.log("Navigating to:", pageName);

  // Update URL hash (without triggering hashchange event)
  if (window.location.hash !== "#" + pageName) {
    history.pushState(null, null, "#" + pageName);
  }

  // Reset Property Index if leaving that page
  if (currentPage === "property-index" && pageName !== "property-index") {
    if (typeof resetPropertyIndex === "function") {
      resetPropertyIndex();
    }
  }

  // Hide all pages
  document.querySelectorAll(".page-content").forEach(page => {
    page.classList.add("hidden");
  });

  // Show requested page
  const targetPage = document.getElementById(`${pageName}-page`);
  if (targetPage) {
    targetPage.classList.remove("hidden");
    currentPage = pageName;

    // Update navigation active states
    updateNavActiveStates(pageName);

    // Page-specific actions
    if (pageName === "interventions") {
      renderInterventionsTable();
    }

    // Initialize Property Index if navigating to that page
    if (pageName === "property-index") {
      console.log("Property Index page loaded - initializing...");
      // Small delay to ensure DOM is ready and scripts are loaded
      setTimeout(() => {
        if (typeof initializePropertyIndex === "function") {
          initializePropertyIndex();
        } else {
          console.error("initializePropertyIndex function not found!");
          // Try again after a longer delay
          setTimeout(() => {
            if (typeof initializePropertyIndex === "function") {
              console.log("Retrying Property Index initialization...");
              initializePropertyIndex();
            }
          }, 500);
        }
      }, 50);
    }

    // Sync content between expanded and collapsed sidebars
    syncMainContent();
  } else {
    console.error(`Page not found: ${pageName}-page`);
  }
}

/**
 * Update the active state of navigation items
 * @param {string} pageName - The name of the active page
 */
function updateNavActiveStates(pageName) {
  // Remove active class from all nav items
  document.querySelectorAll('[id^="nav-"]').forEach(nav => {
    nav.classList.remove("bg-slate-800");
    nav.classList.add("hover:bg-slate-800/50");
  });

  // Add active class to current nav items
  const currentNav = document.getElementById(`nav-${pageName}`);
  const currentNavCollapsed = document.getElementById(
    `nav-${pageName}-collapsed`
  );

  if (currentNav) {
    currentNav.classList.add("bg-slate-800");
    currentNav.classList.remove("hover:bg-slate-800/50");
  }

  if (currentNavCollapsed) {
    currentNavCollapsed.classList.add("bg-slate-800");
    currentNavCollapsed.classList.remove("hover:bg-slate-800/50");
  }
}

/**
 * Sync content between expanded and collapsed sidebars
 */
function syncMainContent() {
  const expandedContent = document.getElementById("main-content-expanded");
  const collapsedContent = document.getElementById("main-content-collapsed");

  if (expandedContent && collapsedContent) {
    collapsedContent.innerHTML = expandedContent.innerHTML;
  }
}

/**
 * Initialize navigation system
 */
function initializeNavigation() {
  console.log("Initializing navigation system...");

  // Set up navigation click handlers
  const navItems = [
    { id: "nav-dashboard", page: "dashboard" },
    { id: "nav-dashboard-collapsed", page: "dashboard" },
    { id: "nav-leads", page: "leads" },
    { id: "nav-property-index", page: "property-index" },
    { id: "nav-interventions", page: "interventions" },
    { id: "nav-interventions-collapsed", page: "interventions" },
    { id: "nav-notifications", page: "notifications" },
    { id: "nav-notifications-collapsed", page: "notifications" },
  ];

  navItems.forEach(item => {
    const element = document.getElementById(item.id);
    if (element) {
      element.addEventListener("click", () => {
        console.log(`Nav item clicked: ${item.id} -> ${item.page}`);
        navigateToPage(item.page);
      });
    } else {
      console.warn(`Navigation element not found: ${item.id}`);
    }
  });

  // Handle hash change events (back/forward browser buttons)
  window.addEventListener("hashchange", function () {
    console.log("Hash changed to:", window.location.hash);
    const hash = window.location.hash.slice(1); // Remove the # symbol
    if (hash) {
      navigateToPage(hash);
    } else {
      navigateToPage("dashboard");
    }
  });

  console.log("Navigation system initialized");
}

/**
 * Load initial page based on URL hash
 */
function loadInitialPage() {
  console.log("Loading initial page...");
  const hash = window.location.hash.slice(1); // Remove the # symbol
  if (hash) {
    console.log("Hash found:", hash);
    navigateToPage(hash);
  } else {
    console.log("No hash found, loading dashboard");
    navigateToPage("dashboard");
  }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    initializeNavigation();
    loadInitialPage();
  });
} else {
  // DOM already loaded
  initializeNavigation();
  loadInitialPage();
}

// Export functions for global access
window.navigateToPage = navigateToPage;
window.updateNavActiveStates = updateNavActiveStates;
window.syncMainContent = syncMainContent;
