// Lead Management JavaScript Functions

// Filter leads by grade
function filterLeads(grade) {
  const leadCards = document.querySelectorAll(".lead-card");
  const filterButtons = document.querySelectorAll('[onclick^="filterLeads"]');

  // Update active button state
  filterButtons.forEach(btn => {
    btn.classList.remove("bg-slate", "text-white");
    btn.classList.add("text-slate", "hover:bg-stone");
  });
  event.target.classList.add("bg-slate", "text-white");
  event.target.classList.remove("hover:bg-stone");

  // Filter cards
  leadCards.forEach(card => {
    const cardGrade = card.getAttribute("data-grade");
    if (grade === "all") {
      card.classList.remove("hidden");
    } else {
      if (cardGrade === grade) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    }
  });
}

// Show lead detail modal
function showLeadDetail(leadId) {
  const modal = document.getElementById("leadDetailModal");
  const leadCard = document.querySelector(`[data-lead-id="${leadId}"]`);

  if (!leadCard) return;

  // Extract lead data from card
  const grade = leadCard.getAttribute("data-grade");
  const company = leadCard.querySelector("h3").textContent;
  const contact = leadCard.querySelectorAll("p")[0].textContent;
  const score = leadCard.querySelector(".text-2xl.font-bold").textContent;

  // Get BANT scores
  const bantScores = leadCard.querySelectorAll(
    ".text-sm.font-semibold.text-slate"
  );
  const budgetScore = bantScores[0].textContent;
  const authorityScore = bantScores[1].textContent;
  const needScore = bantScores[2].textContent;
  const timelineScore = bantScores[3].textContent;

  // Get details
  const details = leadCard.querySelectorAll(
    ".flex.items-center.space-x-4 span"
  );
  const industry = details[0].textContent.trim();
  const location = details[1].textContent.trim();
  const desks = details[2].textContent.trim();

  // Get budget, authority, need, timeline values
  const bantDetails = leadCard.querySelectorAll(".text-xs.text-slate.mt-1");
  const budgetValue = bantDetails[0].textContent;
  const authorityLevel = bantDetails[1].textContent;
  const needLevel = bantDetails[2].textContent;
  const timelineValue = bantDetails[3].textContent;

  // Update modal content
  document.getElementById("leadDetailCompany").textContent = company;
  document.getElementById("leadDetailContact").textContent = contact;
  document.getElementById("leadDetailScore").textContent = score;
  document.getElementById("leadDetailIndustry").innerHTML = industry;
  document.getElementById("leadDetailLocation").innerHTML = location;
  document.getElementById("leadDetailDesks").innerHTML = desks;

  // Update BANT breakdown
  document.getElementById("leadDetailBudgetScore").textContent = budgetScore;
  document.getElementById("leadDetailAuthorityScore").textContent =
    authorityScore;
  document.getElementById("leadDetailNeedScore").textContent = needScore;
  document.getElementById("leadDetailTimelineScore").textContent =
    timelineScore;

  document.getElementById("leadDetailBudgetValue").textContent =
    budgetValue + " confirmed";
  document.getElementById("leadDetailAuthorityLevel").textContent =
    authorityLevel;
  document.getElementById("leadDetailNeedLevel").textContent =
    needLevel + " need";
  document.getElementById("leadDetailTimelineValue").textContent =
    timelineValue;

  // Update grade badge
  const gradeBadge = document.getElementById("leadDetailGrade");
  gradeBadge.textContent = grade === "unqualified" ? "U" : grade;

  // Update colors based on grade
  const gradeColors = {
    A: { bg: "bg-success", text: "text-success" },
    B: { bg: "bg-info", text: "text-info" },
    C: { bg: "bg-warning", text: "text-warning" },
    D: { bg: "bg-danger", text: "text-danger" },
    unqualified: { bg: "bg-gray-200", text: "text-gray-600" },
  };

  const colors = gradeColors[grade] || gradeColors["unqualified"];
  gradeBadge.className = `inline-flex items-center justify-center w-12 h-12 ${colors.bg} bg-opacity-20 ${colors.text} font-bold text-xl rounded-lg`;
  document.getElementById("leadDetailScore").className =
    `text-4xl font-bold ${colors.text}`;

  // Show modal
  modal.classList.remove("hidden");
}

// Close lead detail modal
function closeLeadDetailModal() {
  const modal = document.getElementById("leadDetailModal");
  modal.classList.add("hidden");
}

// Show add lead modal
function showAddLeadModal() {
  const modal = document.getElementById("addLeadModal");
  modal.classList.remove("hidden");
}

// Close add lead modal
function closeAddLeadModal() {
  const modal = document.getElementById("addLeadModal");
  modal.classList.add("hidden");
}

// Submit new lead form
function submitNewLead(event) {
  event.preventDefault();

  // Show success toast
  const toast = document.getElementById("successToast");
  toast.classList.remove("hidden");

  // Close modal
  closeAddLeadModal();

  // Hide toast after 3 seconds
  setTimeout(() => {
    toast.classList.add("hidden");
  }, 3000);

  // Reset form
  event.target.reset();
}

// Qualify lead
function qualifyLead(leadId) {
  // Show success toast
  const toast = document.getElementById("successToast");
  toast.querySelector("span").textContent = "Lead qualified successfully!";
  toast.classList.remove("hidden");

  // Hide toast after 3 seconds
  setTimeout(() => {
    toast.classList.add("hidden");
  }, 3000);
}

// Close modals when clicking outside
document.addEventListener("click", function (event) {
  const leadDetailModal = document.getElementById("leadDetailModal");
  const addLeadModal = document.getElementById("addLeadModal");

  if (event.target === leadDetailModal) {
    closeLeadDetailModal();
  }

  if (event.target === addLeadModal) {
    closeAddLeadModal();
  }
});

// Close modals with Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeLeadDetailModal();
    closeAddLeadModal();
  }
});

console.log("Lead management functions loaded successfully");

// Disqualify lead
function disqualifyLead() {
  if (confirm("Are you sure you want to disqualify this lead?")) {
    // Show success toast
    const toast = document.getElementById("successToast");
    toast.querySelector("span").textContent = "Lead disqualified successfully!";
    toast.classList.remove("hidden");

    // Close modal
    closeLeadDetailModal();

    // Hide toast after 3 seconds
    setTimeout(() => {
      toast.classList.add("hidden");
    }, 3000);
  }
}
