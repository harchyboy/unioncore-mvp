// Add/Edit Property Modal JavaScript

let editingPropertyId = null;
let uploadedImages = []; // Array of {url, filename} objects
let isUploading = false;

// Open modal for adding new property
function openAddPropertyModal() {
  editingPropertyId = null;
  document.getElementById("property-modal-title").textContent =
    "Add New Property";
  document.getElementById("add-property-form").reset();
  document.getElementById("image-preview-container").classList.add("hidden");
  document.getElementById("image-preview-container").innerHTML = "";
  uploadedImages = [];

  // Uncheck all amenities
  document
    .querySelectorAll(".amenity-checkbox")
    .forEach(cb => (cb.checked = false));

  document.getElementById("add-property-modal").classList.remove("hidden");
}

// Open modal for editing existing property
function editProperty(propertyId) {
  editingPropertyId = propertyId;
  document.getElementById("property-modal-title").textContent = "Edit Property";

  // Find property data
  const property = propertiesData.find(p => p.id === propertyId);
  if (!property) {
    console.error("Property not found:", propertyId);
    return;
  }

  // Populate form with property data
  document.getElementById("property-name").value = property.name;
  document.getElementById("property-type").value = property.type;
  document.getElementById("property-address").value = property.address;
  document.getElementById("property-location").value = property.location;
  document.getElementById("property-status").value = property.status;
  document.getElementById("property-area").value = property.totalArea;
  document.getElementById("property-floors").value = property.floors;
  document.getElementById("property-built-year").value = property.builtYear;
  document.getElementById("property-total-units").value = property.totalUnits;
  document.getElementById("property-occupied-units").value =
    property.occupiedUnits;
  document.getElementById("property-price-sqft").value = property.pricePerSqFt;
  document.getElementById("property-description").value =
    property.description || "";

  // Check amenities
  document.querySelectorAll(".amenity-checkbox").forEach(cb => {
    cb.checked = property.amenities && property.amenities.includes(cb.value);
  });

  // Show existing images
  if (property.images && property.images.length > 0) {
    uploadedImages = property.images.map(url => ({
      url: url,
      filename: url.split("/").pop() || "",
    }));
    renderImagePreviews();
  }

  document.getElementById("add-property-modal").classList.remove("hidden");
}

// Close modal
function closeAddPropertyModal() {
  document.getElementById("add-property-modal").classList.add("hidden");
  editingPropertyId = null;
  uploadedImages = [];
}

// Save property
function saveProperty() {
  const form = document.getElementById("add-property-form");

  // Validate form
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  // Collect form data
  const propertyData = {
    name: document.getElementById("property-name").value,
    type: document.getElementById("property-type").value,
    address: document.getElementById("property-address").value,
    location: document.getElementById("property-location").value,
    status: document.getElementById("property-status").value,
    totalArea: parseInt(document.getElementById("property-area").value),
    floors: parseInt(document.getElementById("property-floors").value),
    builtYear:
      parseInt(document.getElementById("property-built-year").value) ||
      new Date().getFullYear(),
    totalUnits: parseInt(document.getElementById("property-total-units").value),
    occupiedUnits: parseInt(
      document.getElementById("property-occupied-units").value
    ),
    pricePerSqFt: parseFloat(
      document.getElementById("property-price-sqft").value
    ),
    description: document.getElementById("property-description").value,
    amenities: Array.from(
      document.querySelectorAll(".amenity-checkbox:checked")
    ).map(cb => cb.value),
    images: uploadedImages.map(img => img.url),
  };

  // Check if images are still uploading
  if (isUploading) {
    showErrorToast("Please wait for images to finish uploading");
    return;
  }

  // Calculate derived values
  propertyData.occupancyRate = Math.round(
    (propertyData.occupiedUnits / propertyData.totalUnits) * 100
  );
  propertyData.annualRevenue = Math.round(
    propertyData.totalArea * propertyData.pricePerSqFt
  );

  if (editingPropertyId) {
    // Update existing property
    const index = propertiesData.findIndex(p => p.id === editingPropertyId);
    if (index !== -1) {
      propertiesData[index] = { ...propertiesData[index], ...propertyData };
      showSuccessToast("Property updated successfully!");
    }
  } else {
    // Add new property
    const newId = "PROP-" + String(propertiesData.length + 1).padStart(3, "0");
    const newProperty = {
      id: newId,
      ...propertyData,
      units: [],
      documents: [],
    };
    propertiesData.push(newProperty);
    showSuccessToast("Property added successfully!");
  }

  // Close modal
  closeAddPropertyModal();

  // Refresh property index if on that page
  const propertyIndexPage = document.getElementById("property-index-page");
  if (propertyIndexPage && !propertyIndexPage.classList.contains("hidden")) {
    renderProperties();
  }

  // Refresh space allocation if on that page
  const spaceAllocationPage = document.getElementById("space-allocation-page");
  if (
    spaceAllocationPage &&
    !spaceAllocationPage.classList.contains("hidden")
  ) {
    initializeSpaceAllocation();
  }
}

// Image upload handling
document.addEventListener("DOMContentLoaded", function () {
  const uploadArea = document.getElementById("image-upload-area");
  const fileInput = document.getElementById("property-images");
  const previewContainer = document.getElementById("image-preview-container");

  if (!uploadArea || !fileInput) return;

  // Click to browse
  uploadArea.addEventListener("click", () => fileInput.click());

  // Drag and drop
  uploadArea.addEventListener("dragover", e => {
    e.preventDefault();
    uploadArea.classList.add("border-slate", "bg-stone", "bg-opacity-10");
  });

  uploadArea.addEventListener("dragleave", () => {
    uploadArea.classList.remove("border-slate", "bg-stone", "bg-opacity-10");
  });

  uploadArea.addEventListener("drop", e => {
    e.preventDefault();
    uploadArea.classList.remove("border-slate", "bg-stone", "bg-opacity-10");

    const files = Array.from(e.dataTransfer.files).filter(file =>
      file.type.startsWith("image/")
    );
    handleImageFiles(files);
  });

  // File input change
  fileInput.addEventListener("change", e => {
    const files = Array.from(e.target.files);
    handleImageFiles(files);
  });
});

// Handle image files with real upload
async function handleImageFiles(files) {
  if (files.length === 0) return;

  // Check file sizes
  for (const file of files) {
    if (file.size > 5 * 1024 * 1024) {
      showErrorToast(`Image too large: ${file.name} (max 5MB)`);
      return;
    }
  }

  // Show loading state
  isUploading = true;
  showLoadingSpinner();

  try {
    // Upload each file
    for (const file of files) {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/properties/upload-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Upload failed");
      }

      const data = await response.json();

      // Add to uploaded images array
      uploadedImages.push({
        url: data.imageUrl,
        filename: data.filename,
      });
    }

    // Render previews
    renderImagePreviews();
    showSuccessToast(`${files.length} image(s) uploaded successfully`);
  } catch (error) {
    console.error("Upload error:", error);
    showErrorToast(error.message || "Failed to upload images");
  } finally {
    isUploading = false;
    hideLoadingSpinner();
  }
}

// Render image previews
function renderImagePreviews() {
  const previewContainer = document.getElementById("image-preview-container");

  if (uploadedImages.length === 0) {
    previewContainer.classList.add("hidden");
    previewContainer.innerHTML = "";
    return;
  }

  previewContainer.classList.remove("hidden");
  previewContainer.innerHTML = uploadedImages
    .map(
      (img, index) => `
        <div class="relative group">
            <img src="${img.url}" alt="Property image ${index + 1}" class="w-full h-24 object-cover rounded-lg">
            <div class="absolute inset-0 bg-slate bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-lg flex items-center justify-center">
                <button type="button" onclick="removeImage(${index})" class="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <i class="fa-solid fa-times text-xl"></i>
                </button>
            </div>
        </div>
    `
    )
    .join("");
}

// Remove image with backend deletion
async function removeImage(index) {
  const image = uploadedImages[index];

  // Only delete from backend if it's an uploaded file (not a placeholder URL)
  if (image.url.startsWith("/uploads/")) {
    try {
      const response = await fetch(
        `/api/properties/delete-image/${image.filename}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Delete failed");
      }

      showSuccessToast("Image deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      showErrorToast(error.message || "Failed to delete image");
      return; // Don't remove from array if backend deletion failed
    }
  }

  // Remove from array
  uploadedImages.splice(index, 1);
  renderImagePreviews();
}

// Show loading spinner
function showLoadingSpinner() {
  const uploadArea = document.getElementById("image-upload-area");
  if (!uploadArea) return;

  const spinner = document.createElement("div");
  spinner.id = "upload-spinner";
  spinner.className =
    "absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center rounded-lg";
  spinner.innerHTML = `
        <div class="text-center">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-slate"></div>
            <p class="text-sm text-slate mt-2">Uploading...</p>
        </div>
    `;

  uploadArea.style.position = "relative";
  uploadArea.appendChild(spinner);
}

// Hide loading spinner
function hideLoadingSpinner() {
  const spinner = document.getElementById("upload-spinner");
  if (spinner) {
    spinner.remove();
  }
}

// Success toast
function showSuccessToast(message) {
  // Check if toast container exists
  let toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.className = "fixed top-4 right-4 z-50 space-y-2";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className =
    "bg-success text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 animate-slide-in";
  toast.innerHTML = `
        <i class="fa-solid fa-check-circle"></i>
        <span>${message}</span>
    `;

  toastContainer.appendChild(toast);

  // Remove after 3 seconds
  setTimeout(() => {
    toast.classList.add("animate-slide-out");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Error toast
function showErrorToast(message) {
  let toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.className = "fixed top-4 right-4 z-50 space-y-2";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className =
    "bg-danger text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 animate-slide-in";
  toast.innerHTML = `
        <i class="fa-solid fa-exclamation-circle"></i>
        <span>${message}</span>
    `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("animate-slide-out");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Close modal on outside click
document.addEventListener("click", function (e) {
  const modal = document.getElementById("add-property-modal");
  if (modal && e.target === modal) {
    closeAddPropertyModal();
  }
});

// Close modal on Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    const modal = document.getElementById("add-property-modal");
    if (modal && !modal.classList.contains("hidden")) {
      closeAddPropertyModal();
    }
  }
});

console.log("Add/Edit Property Modal JavaScript with Real Image Upload loaded");
