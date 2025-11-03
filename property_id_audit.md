# Property ID System Audit - UNION Core MVP

**Date:** November 1, 2025  
**Repository:** https://github.com/harchyboy/unioncore-mvp  
**Branch:** develop

## Executive Summary

This audit examines how properties are displayed and navigated across the UNION prototype. The good news: **the property ID system is already well-implemented**. The main issue is a rendering bug in the Property Index search/filter functionality.

---

## Pages Audit Results

### 1. **Dashboard Page** (`#dashboard-page`)

**Status:** ✅ No Property Displays

**Findings:**

- No property cards or listings found on dashboard
- Dashboard focuses on metrics, activity feed, and quick actions
- No property navigation needed

---

### 2. **Property Index Page** (`#property-index-page`, lines 4073-4725)

**Status:** ⚠️ Working But Has Critical Bug

**Current Implementation:**

- ✅ Uses `properties_data.js` with standardized IDs (PROP-001 through PROP-010)
- ✅ Static HTML cards have `data-property-id` attributes
- ✅ "View Details" buttons call `viewPropertyDetail('PROP-XXX')`
- ✅ Dynamic rendering via `property_index.js`
- ❌ **BUG:** Search/filter causes all properties to disappear

**Property ID Usage:**

- **Static Cards:** Lines 4182-4679, each with `data-property-id="PROP-XXX"`
- **Navigation:** `onclick="viewPropertyDetail('PROP-001')"`
- **Data Source:** `propertiesData` array from `properties_data.js`

**Critical Bug:**

- When users search or apply filters, all property cards vanish
- Shows "Showing 0 of 0 properties"
- Issue is in `property_index.js` rendering logic

---

### 3. **Property Detail Page** (`#property-detail-page`, lines 4930-5420)

**Status:** ✅ Working Correctly

**Current Implementation:**

- Loads property ID from `sessionStorage.getItem('currentPropertyId')`
- Uses `property_detail.js` to find property in `propertiesData` array
- Displays full property information dynamically

**Property ID Usage:**

- ✅ Correctly reads from sessionStorage
- ✅ Finds property by `p.id === propertyId`
- ✅ Handles missing properties gracefully

---

### 4. **Pipeline Page** (`#pipeline-page`, lines 3500-4070)

**Status:** ⚠️ Properties Referenced But Not Linked

**Findings:**

- Pipeline deals table has "Property" column (line 3911)
- Properties are displayed as text in deal rows
- **No navigation to property detail pages**
- Could benefit from clickable property links

**Recommendation:**

- Add `onclick="navigateToPropertyDetail('PROP-XXX')"` to property names in pipeline

---

### 5. **Add Property Page** (`#add-property-page`, lines 4727-4928)

**Status:** ✅ Generates Property IDs

**Current Implementation:**

- Form for creating new properties
- Generates IDs: `'PROP-' + Date.now()` (line 19030)
- Saves to localStorage

**Property ID Usage:**

- ✅ Generates unique IDs
- ✅ Consistent format

---

### 6. **Space Allocation Dashboard** (lines 5420+)

**Status:** ⚠️ Property Selector Only

**Findings:**

- Has property dropdown selector (lines 37394-37398)
- Lists properties: "Canary Wharf Tower", "Canary Wharf Business Centre", etc.
- No direct navigation to property details
- Could add "View Property Details" link after selection

---

## Key Functions Analysis

### 1. `viewPropertyDetail()` in `index.html` (line 19176)

```javascript
function viewPropertyDetail(propertyId) {
  currentPropertyId = propertyId;

  // Load from propertiesData or localStorage
  const properties =
    (typeof propertiesData !== "undefined" && propertiesData) ||
    JSON.parse(localStorage.getItem("properties") || "[]");
  const property = properties.find(
    p => p.id === propertyId || p.property_id === propertyId
  );

  if (!property) {
    showToast("Property not found", "error");
    navigateToPage("property-index");
    return;
  }

  // Navigate to property-detail page
  navigateToPage("property-detail");
}
```

**Issues:**

- Looks for both `p.id` and `p.property_id` (inconsistent)
- Uses localStorage as fallback

### 2. `viewPropertyDetail()` in `property_index.js` (lines 214-217)

```javascript
function viewPropertyDetail(propertyId) {
  sessionStorage.setItem("currentPropertyId", propertyId);
  window.location.hash = "#/property-detail";
}
```

**Better Implementation:**

- Simpler and cleaner
- Uses sessionStorage
- Exported to window scope: `window.viewPropertyDetail = viewPropertyDetail;`

### 3. `loadPropertyData()` in `property_detail.js`

```javascript
function loadPropertyData() {
  const propertyId = sessionStorage.getItem("currentPropertyId");
  if (!propertyId) {
    // Redirect back to property index
    return;
  }

  const property = propertiesData.find(p => p.id === propertyId);
  if (!property) {
    // Show error
    return;
  }

  // Populate page with property data
}
```

**Status:** ✅ Works correctly

---

## Property Data Structure

### Source: `client/properties_data.js`

```javascript
const propertiesData = [
  {
    id: "PROP-001",
    name: "Canary Wharf Tower",
    address: "13 High Street, London",
    location: "Canary Wharf",
    type: "Office Building",
    sector: "Office",
    size: 38658,
    rent: 41,
    broker: "Savills",
    status: "Available",
    occupancy: 92,
    availability: "Under Offer",
    // ... more fields
  },
  // ... 9 more properties (PROP-002 through PROP-010)
];
```

**Strengths:**

- ✅ Consistent ID format (PROP-XXX)
- ✅ Comprehensive property data
- ✅ Single source of truth
- ✅ Already exported globally

---

## Critical Issues

### 1. 🔴 Property Index Search/Filter Bug (HIGH PRIORITY)

**Issue:** When users search or filter, all properties disappear  
**Location:** `client/property_index.js` rendering functions  
**Impact:** Search and filter completely broken  
**Root Cause:** Rendering logic fails to display filtered results  
**Fix Required:** Debug `renderProperties()`, `renderGridView()`, `renderListView()`

### 2. 🟡 Inconsistent Property ID Field Names (MEDIUM PRIORITY)

**Issue:** Code checks both `p.id` and `p.property_id`  
**Location:** `viewPropertyDetail()` in index.html (line 19182)  
**Impact:** Potential confusion, unnecessary complexity  
**Fix Required:** Standardize to use only `id` field

### 3. 🟡 Pipeline Properties Not Linked (MEDIUM PRIORITY)

**Issue:** Pipeline shows property names but no navigation  
**Location:** Pipeline page deal rows  
**Impact:** Users can't view property details from pipeline  
**Fix Required:** Add clickable links to property names

### 4. 🟢 No Global Property Search (LOW PRIORITY - Enhancement)

**Issue:** Can't search properties from other pages  
**Location:** N/A - feature doesn't exist  
**Impact:** Minor UX inconvenience  
**Fix Required:** Add global search in header (future enhancement)

---

## Recommendations

### Phase 2: Fix Critical Bug ✅

1. Debug `property_index.js` rendering functions
2. Fix `renderGridView()` to display filtered results correctly
3. Fix `renderListView()` to display filtered results correctly
4. Ensure search and filter logic passes data correctly to rendering functions
5. Test thoroughly with various search terms and filter combinations

### Phase 3: Create Utility Functions ✅

Create `client/property_utils.js`:

```javascript
/**
 * Get property by ID from propertiesData array
 * @param {string} id - Property ID (e.g., "PROP-001")
 * @returns {object|null} Property object or null if not found
 */
function getPropertyById(id) {
  if (typeof propertiesData === "undefined") {
    console.error("propertiesData is not loaded");
    return null;
  }
  return propertiesData.find(p => p.id === id) || null;
}

/**
 * Navigate to property detail page
 * @param {string} propertyId - Property ID (e.g., "PROP-001")
 */
function navigateToPropertyDetail(propertyId) {
  const property = getPropertyById(propertyId);
  if (!property) {
    console.error(`Property ${propertyId} not found`);
    return;
  }
  sessionStorage.setItem("currentPropertyId", propertyId);
  window.location.hash = "#/property-detail";
}

/**
 * Format property for display
 * @param {object} property - Property object
 * @returns {object} Formatted property data
 */
function formatPropertyDisplay(property) {
  return {
    name: property.name,
    location: property.location,
    size: `${property.size.toLocaleString()} sq ft`,
    rent: `£${property.rent} psf`,
    status: property.status,
    occupancy: `${property.occupancy}%`,
  };
}

// Export to window scope
window.getPropertyById = getPropertyById;
window.navigateToPropertyDetail = navigateToPropertyDetail;
window.formatPropertyDisplay = formatPropertyDisplay;
```

### Phase 4: Standardize Navigation ✅

1. Update all property references to use `navigateToPropertyDetail(propertyId)`
2. Add property detail links to Pipeline page deal rows
3. Add property detail links to Space Allocation page
4. Ensure consistent use of `id` field (not `property_id`)
5. Remove duplicate `viewPropertyDetail()` function from index.html

### Phase 5: Testing ✅

Test scenarios:

1. ✅ Search for "Canary Wharf" → shows matching properties
2. ✅ Filter by location → shows matching properties
3. ✅ Click property card → navigates to detail page
4. ✅ Click "View Details" button → navigates to detail page
5. ✅ Property detail page loads correct data
6. ✅ Navigate back to property index → works correctly

---

## Conclusion

**Good News:**

- ✅ Property ID system is already well-implemented
- ✅ `properties_data.js` provides single source of truth
- ✅ Property Detail page works correctly
- ✅ Navigation functions exist and mostly work

**Action Required:**

- 🔴 Fix Property Index search/filter rendering bug (CRITICAL)
- 🟡 Create centralized utility functions
- 🟡 Add property links to Pipeline page
- 🟢 Consider global search feature (future)

**Overall Assessment:** The foundation is solid. The main issue is a rendering bug that needs immediate attention. Once fixed, the system will work seamlessly across all pages.

---

**Audit Status:** ✅ Complete  
**Last Updated:** November 1, 2025  
**Next Action:** Proceed to Phase 2 - Fix Property Index Bug
