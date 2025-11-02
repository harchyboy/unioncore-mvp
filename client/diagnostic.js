// Property Index Diagnostic Script
// Run this in browser console to diagnose issues

function runPropertyIndexDiagnostic() {
    console.log('=== PROPERTY INDEX DIAGNOSTIC ===');
    
    // Check if we're on the right page
    const propertyIndexPage = document.getElementById('property-index-page');
    console.log('1. Property Index page found:', !!propertyIndexPage);
    console.log('   Page visible:', propertyIndexPage && !propertyIndexPage.classList.contains('hidden'));
    
    // Check data availability
    console.log('2. Properties data available:', typeof propertiesData !== 'undefined');
    console.log('   Properties count:', typeof propertiesData !== 'undefined' ? propertiesData.length : 'N/A');
    
    // Check functions
    console.log('3. Functions available:');
    console.log('   initializePropertyIndex:', typeof initializePropertyIndex === 'function');
    console.log('   debugInitialization:', typeof debugInitialization === 'function');
    console.log('   resetPropertyIndex:', typeof resetPropertyIndex === 'function');
    
    // Check DOM elements
    console.log('4. Key DOM elements:');
    const elements = {
        'properties-grid': document.getElementById('properties-grid'),
        'property-search': document.getElementById('property-search'),
        'reset-filters-btn': document.getElementById('reset-filters-btn'),
        'view-toggle-grid': document.getElementById('view-toggle-grid'),
        'view-toggle-list': document.getElementById('view-toggle-list'),
        'property-sort': document.getElementById('property-sort')
    };
    
    Object.entries(elements).forEach(([id, element]) => {
        console.log(`   ${id}:`, !!element);
    });
    
    // Check state
    console.log('5. Current state:');
    if (typeof window.propertyIndexState !== 'undefined') {
        console.log('   State object:', window.propertyIndexState);
    } else {
        console.log('   State object: Not found');
    }
    
    // Check for errors
    console.log('6. Running test initialization...');
    try {
        if (typeof initializePropertyIndex === 'function') {
            initializePropertyIndex();
            console.log('   Test initialization: SUCCESS');
        } else {
            console.log('   Test initialization: FAILED - Function not available');
        }
    } catch (error) {
        console.log('   Test initialization: ERROR -', error.message);
        console.error('   Full error:', error);
    }
    
    console.log('=== DIAGNOSTIC COMPLETE ===');
}

// Export to global scope
window.runPropertyIndexDiagnostic = runPropertyIndexDiagnostic;

console.log('🔧 Property Index Diagnostic loaded. Run runPropertyIndexDiagnostic() in console.');