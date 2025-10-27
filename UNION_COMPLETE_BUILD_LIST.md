# UNION Core Plus - Complete Function Build List

**Generated:** October 27, 2025  
**Source:** UNION_Knowledge_Base_Full.pdf (287 pages, 25 Functional Requirements)  
**Current Site:** https://union.hartz.ai/  
**GitHub:** https://github.com/harchyboy/unioncore-mvp

---

## 📊 Executive Summary

After analyzing the complete UNION Knowledge Base against the current prototype, here's what needs to be built:

### Current Completion: ~15-20%

| What's Built | What's Missing |
|--------------|----------------|
| UI shell & navigation | 22 complete functional requirements |
| Basic dashboard (static) | Real-time data & backend |
| Pipeline table + Kanban (in PR) | Deal CRUD operations |
| Modal placeholders | All business logic & workflows |

### **Total Remaining: 25 Functional Requirements**

**Estimated Time:** 23-29 weeks for complete platform

---

## 🎯 The 25 Functional Requirements

### 🔴 LEAD & ORIGINATION (3 Requirements)

#### 1. FR-001: Multi-Channel Lead Capture
- Lead capture forms (web, phone, email, broker)
- Auto-record creation with source attribution
- Lead deduplication
- Assignment rules
- **Time:** 2-3 days

#### 2. FR-002: Lead Qualification & Scoring
- Automated scoring algorithm
- BANT qualification (Budget, Authority, Need, Timeline)
- Hot/Warm/Cold classification
- Score updating on new info
- **Time:** 3-4 days

#### 3. FR-003: Intelligent Property Matching
- Matching engine (size, location, budget, amenities)
- Suitability scoring
- Match ranking & explanations
- Alternative suggestions
- **Time:** 4-5 days

**Total:** 9-12 days

---

### 🟠 DEAL & CONTRACT MANAGEMENT (3 Requirements)

#### 4. FR-004: Deal Pipeline Management *(Partially Built)*
**What exists:** Table view, Kanban (in PR), filters

**Still needed:**
- Deal creation/editing forms
- Stage automation rules
- SLA tracking & escalations
- Risk indicators
- Win probability calculation
- **Time:** 5-7 days

#### 5. FR-005: Proposal Generation & Management
- Proposal template library
- Builder with auto-population
- Pricing calculator
- Version control
- E-signature integration
- Proposal tracking (viewed, accepted)
- **Time:** 6-8 days

#### 6. FR-006: Contract Generation & Management
- Contract templates
- Legal clause library
- Redline management
- Approval workflows
- E-signature
- Contract repository
- Renewal tracking
- **Time:** 7-9 days

**Total:** 18-24 days

---

### 🟢 PROPERTY & SPACE MANAGEMENT (3 Requirements)

#### 7. FR-007: Property Portfolio Management
- **Property Index page** (grid + list views)
- **Property Detail pages** with tabs
- Property creation/editing
- Unit/space breakdown
- Amenities tracking
- Image gallery & floor plans
- Availability status
- Performance metrics
- **Time:** 6-8 days

#### 8. FR-008: Space Allocation & Capacity Management
- Unit tracking & tenant assignment
- Shared space management
- Capacity limits & alerts
- Utilization reporting
- Occupancy heatmap
- Booking system (shared spaces)
- **Time:** 5-7 days

#### 9. FR-009: Property Maintenance Scheduling
- Maintenance calendar
- Preventive maintenance templates
- Work order creation
- Vendor assignment
- Asset tracking
- Compliance certificates
- Cost tracking
- **Time:** 5-6 days

**Total:** 16-21 days

---

### 🔵 BROKER & PARTNER MANAGEMENT (3 Requirements)

#### 10. FR-010: Broker Onboarding & Management
- Broker directory
- Profile pages
- Onboarding workflow
- Specialization & territory tracking
- Performance metrics
- Commission structure setup
- Broker portal
- **Time:** 4-5 days

#### 11. FR-011: Commission Calculation & Tracking
- Commission structure builder
- Automatic calculation on deal closure
- Approval workflow
- Payment tracking
- Broker commission portal
- Dispute management
- **Time:** 4-5 days

#### 12. FR-012: Broker Performance Analytics
- Performance dashboard
- Conversion rate tracking
- Revenue attribution
- Quality scoring
- Leaderboard
- Comparative analytics
- **Time:** 3-4 days

**Total:** 11-14 days

---

### 🟣 TENANT ONBOARDING & ACCESS (3 Requirements)

#### 13. FR-013: Tenant Onboarding Workflow
- **Onboarding Board** (Kanban-style)
- Checklist system with role-based tasks
- Document collection workflow
- Service setup coordination
- Compliance verification
- Welcome sequence automation
- Feedback collection
- **Time:** 6-7 days

#### 14. FR-014: Access Control & Security Management
- Access card management
- Access level assignment
- Entry log tracking
- Visitor management
- Emergency access procedures
- Audit trail
- Building system integration
- **Time:** 4-5 days

#### 15. FR-015: Service Setup Coordination
- Service setup checklist
- IT setup coordination
- Furniture/equipment ordering
- Utilities activation
- Cleaning scheduling
- Vendor coordination
- **Time:** 4-5 days

**Total:** 14-17 days

---

### 🟡 SERVICE & OPERATIONS (3 Requirements)

#### 16. FR-016: Service Provider Management
- **Vendor Directory**
- Provider onboarding
- Performance tracking & SLA monitoring
- Work assignment optimization
- Cost management
- Contract management
- Provider portal
- **Time:** 5-6 days

#### 17. FR-017: Task Management & Coordination
- Task creation & assignment
- Priority & due date tracking
- Task dependencies
- Recurring tasks & templates
- Team workload view
- Completion notifications
- **Time:** 5-6 days

#### 18. FR-018: Issue Tracking & Resolution
- **Ticket Desk** system
- Issue creation (tenant portal)
- Categorization & priority
- SLA-based escalation
- Vendor assignment
- Resolution tracking
- Root cause analysis
- Satisfaction surveys
- **Time:** 6-7 days

**Total:** 16-19 days

---

### 🔷 COMMUNICATION & REPORTING (4 Requirements)

#### 19. FR-019: Centralized Communication Management
- Email integration & logging
- SMS integration
- Call logging
- Communication history by contact
- Conversation threading
- Search & templates
- **Time:** 5-6 days

#### 20. FR-020: Contact & Relationship Management
- Contact directory
- Profile pages
- Relationship tracking
- Interaction history
- Segmentation
- Import/export
- Duplicate detection
- **Time:** 4-5 days

#### 21. FR-021: Operational Dashboard & KPIs *(Partially Built)*
**What exists:** Static dashboard, basic charts

**Still needed:**
- Real-time data updates
- Role-based views
- Interactive drill-down
- Alert notifications
- Mobile optimization
- **Time:** 4-5 days

#### 22. FR-022: Financial Reporting & Analysis
- Financial dashboard
- Revenue & cost tracking
- Profitability analysis
- Budget vs. actual
- Cash flow projections
- Property-level P&L
- Commission expense tracking
- **Time:** 5-6 days

**Total:** 18-22 days

---

### 🔶 SYSTEM INTEGRATIONS (3 Requirements)

#### 23. FR-023: Email System Integration
- Gmail & Outlook integration
- Email sync
- Send from platform
- Templates & automation
- Email tracking (opens, clicks)
- **Time:** 4-5 days

#### 24. FR-024: Calendar & Scheduling Integration
- Google Calendar & Outlook integration
- Meeting scheduling
- Viewing booking
- Availability checking
- Reminder notifications
- **Time:** 4-5 days

#### 25. FR-025: Document Management Integration
- **Document Library** system
- File upload & storage
- Folder structure
- Version control
- Access permissions
- Document search & preview
- Sharing & e-signature
- **Time:** 6-7 days

**Total:** 14-16 days

---

## ⏱️ Total Development Time

### Summary by Category

| Category | Requirements | Days | Weeks |
|----------|--------------|------|-------|
| Lead & Origination | 3 | 9-12 | 2-2.5 |
| Deal & Contract | 3 | 18-24 | 4-5 |
| Property & Space | 3 | 16-21 | 3-4 |
| Broker & Partner | 3 | 11-14 | 2-3 |
| Tenant Onboarding | 3 | 14-17 | 3-3.5 |
| Service & Operations | 3 | 16-19 | 3-4 |
| Communication & Reporting | 4 | 18-22 | 4-4.5 |
| System Integrations | 3 | 14-16 | 3 |
| **TOTAL** | **25** | **116-145** | **23-29** |

---

## 🚀 Recommended Build Order

### Phase 1: Core Origination (Weeks 1-4)
**Goal:** Capture leads, score them, match with properties

1. Property Portfolio Management (FR-007) - 6-8 days
2. Multi-Channel Lead Capture (FR-001) - 2-3 days
3. Lead Qualification (FR-002) - 3-4 days
4. Property Matching (FR-003) - 4-5 days

✅ **Milestone:** Can capture & qualify leads, match with properties

---

### Phase 2: Deal Management (Weeks 5-9)
**Goal:** Manage full deal cycle from lead to signed contract

5. Complete Pipeline Management (FR-004) - 5-7 days
6. Proposal Generation (FR-005) - 6-8 days
7. Contract Management (FR-006) - 7-9 days

✅ **Milestone:** Can create deals, generate proposals, execute contracts

---

### Phase 3: Operations (Weeks 10-15)
**Goal:** Onboard tenants and manage ongoing operations

8. Tenant Onboarding (FR-013) - 6-7 days
9. Service Provider Management (FR-016) - 5-6 days
10. Task Management (FR-017) - 5-6 days
11. Ticket Desk (FR-018) - 6-7 days
12. Document Library (FR-025) - 6-7 days

✅ **Milestone:** Can onboard tenants, manage services, track issues

---

### Phase 4: Analytics & Partners (Weeks 16-20)
**Goal:** Track performance and optimize partnerships

13-15. Broker Management (FR-010, 011, 012) - 11-14 days
16. Financial Reporting (FR-022) - 5-6 days
17. Enhanced Dashboards (FR-021) - 4-5 days

✅ **Milestone:** Can track partner & financial performance

---

### Phase 5: Advanced Features (Weeks 21-29)
**Goal:** Complete all remaining features

18. Space Allocation (FR-008) - 5-7 days
19. Maintenance Scheduling (FR-009) - 5-6 days
20. Service Setup (FR-015) - 4-5 days
21. Access Control (FR-014) - 4-5 days
22. Communication Center (FR-019) - 5-6 days
23. Contact Management (FR-020) - 4-5 days
24. Email Integration (FR-023) - 4-5 days
25. Calendar Integration (FR-024) - 4-5 days

✅ **Milestone:** Full-featured platform with all integrations

---

## 📋 Top 10 Priority Functions

If you need to prioritize, build these first:

1. **Property Index & Detail Pages** (FR-007) - Foundation for everything
2. **Lead Capture Form** (FR-001) - Start of pipeline
3. **Deal Creation/Editing** (FR-004 completion) - Core functionality
4. **Property Matching Engine** (FR-003) - Key value proposition
5. **Proposal Generator** (FR-005) - Accelerate sales cycle
6. **Contract Generator** (FR-006) - Close deals faster
7. **Tenant Onboarding Board** (FR-013) - Post-sale operations
8. **Task Management** (FR-017) - Team coordination
9. **Ticket Desk** (FR-018) - Tenant support
10. **Document Library** (FR-025) - Central file management

---

## ⚠️ Critical Issues on Live Site

### Issue: Kanban Board Shows No Data
**Problem:** https://union.hartz.ai/ shows Kanban stage headers but no deal cards

**Root Cause:**
- PR #2 with Kanban functionality NOT merged to `main` branch
- Live site is using old code
- Kanban HTML structure exists but JavaScript to populate cards is missing

**Solution:**
1. Merge PR #2: https://github.com/harchyboy/unioncore-mvp/pull/2
2. Deploy to production
3. Verify Kanban loads with dummy data

**Alternative:** The screenshots you sent may have been from before your latest deployment. The live site shows data when I visit it.

---

## 🛠️ Technical Requirements

### Backend Needed
Currently there's **NO backend** - everything is static HTML/JS. You'll need:

- **API Server:** Node.js/Express or Python/Django
- **Database:** PostgreSQL
- **Cache:** Redis
- **File Storage:** AWS S3 or similar
- **Authentication:** JWT tokens
- **Authorization:** Role-based access control

### Key Integrations
- Gmail & Outlook APIs (email)
- Google Calendar & Outlook APIs (scheduling)
- DocuSign or HelloSign (e-signature)
- Stripe Connect (commission payments)
- Twilio (SMS)
- Building access control systems

---

## 💰 Rough Cost Estimates

### Development Time
- **1 Developer:** 23-29 weeks (5.5-7 months)
- **2 Developers:** 12-15 weeks (3-4 months)
- **3 Developers:** 8-10 weeks (2-2.5 months)

### External Services (Monthly)
- Hosting (AWS/GCP): $200-500
- Database: $50-200
- File Storage: $50-150
- Email (SendGrid): $50-100
- SMS (Twilio): $50-150
- E-signature: $100-300
- **Total:** ~$500-1,400/month

---

## 📞 Next Steps

### Immediate Actions

1. ✅ **Review this document**
   - Confirm priorities
   - Adjust estimates if needed

2. 🔄 **Merge Kanban PR**
   - PR #2: https://github.com/harchyboy/unioncore-mvp/pull/2
   - Test on live site
   - Verify data loads

3. 📋 **Create Project Plan**
   - Choose build phases
   - Set deadlines
   - Assign resources

4. 💻 **Set Up Backend**
   - Choose tech stack
   - Set up database
   - Create API structure

### Questions for You

1. **Timeline:** When do you need the full system complete?
2. **Team:** How many developers do you have?
3. **Budget:** What can you spend on services/hosting?
4. **Priorities:** Which phases are most important?
5. **MVP:** What's the minimum you need to launch?

---

## 📚 Related Documents

- `UNION_PROTOTYPE_STATUS.md` - Current prototype status (in repo)
- `KANBAN_VIEW_SETUP.md` - Kanban implementation guide (in repo)
- `DEPLOYMENT_SUMMARY.md` - Deployment instructions (in workspace)
- `UNION_Knowledge_Base_Full.pdf` - Source requirements document

---

## ✅ Quick Checklist: MVP Requirements

To get to a **Minimum Viable Product**, you need:

### Must Have (Weeks 1-12)
- [ ] Property Index page
- [ ] Property Detail pages
- [ ] Lead capture form
- [ ] Lead scoring
- [ ] Property matching
- [ ] Deal creation/editing
- [ ] Pipeline management (complete)
- [ ] Proposal generator
- [ ] Contract generator
- [ ] Basic backend & database

### Should Have (Weeks 13-16)
- [ ] Tenant onboarding board
- [ ] Task management
- [ ] Ticket desk
- [ ] Document library
- [ ] Service provider management

### Nice to Have (Weeks 17-29)
- [ ] Broker management
- [ ] Financial reporting
- [ ] All integrations
- [ ] Advanced analytics

---

**Ready to start building!** 🚀

Let me know which phase you want to tackle first, and I'll help you build it.

---

**Document Version:** 1.0  
**Created:** October 27, 2025  
**Last Updated:** October 27, 2025  
**Next Review:** After Phase 1 completion
