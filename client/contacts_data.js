// UNION Contacts & CRM Data
// 28 contacts across 15 companies

const companiesData = [
  {
    id: "COMP-001",
    name: "TechVision Solutions Ltd",
    legalName: "TechVision Solutions Limited",
    registrationNumber: "12345678",
    vatNumber: "GB123456789",
    industry: "Technology",
    size: "51-200",
    founded: 2018,
    website: "www.techvision.co.uk",
    linkedin: "linkedin.com/company/techvision",
    address: {
      street: "25 Old Broad Street",
      city: "London",
      postcode: "EC2N 1HQ",
      country: "United Kingdom"
    },
    primaryContact: {
      name: "Sarah Mitchell",
      email: "sarah.mitchell@techvision.co.uk",
      phone: "+44 20 7946 0958"
    },
    metrics: {
      propertiesOccupied: 2,
      totalUnits: 8,
      annualRent: 320000,
      contractValue: 960000,
      tenantSince: new Date('2022-03-15')
    },
    logo: null
  },
  {
    id: "COMP-002",
    name: "Sterling Financial Partners",
    legalName: "Sterling Financial Partners LLP",
    registrationNumber: "23456789",
    vatNumber: "GB234567890",
    industry: "Financial Services",
    size: "11-50",
    founded: 2015,
    website: "www.sterlingfp.co.uk",
    linkedin: "linkedin.com/company/sterlingfp",
    address: {
      street: "1 Poultry",
      city: "London",
      postcode: "EC2R 8EJ",
      country: "United Kingdom"
    },
    primaryContact: {
      name: "James Patterson",
      email: "james.patterson@sterlingfp.co.uk",
      phone: "+44 20 7946 0959"
    },
    metrics: {
      propertiesOccupied: 1,
      totalUnits: 4,
      annualRent: 180000,
      contractValue: 540000,
      tenantSince: new Date('2023-01-10')
    },
    logo: null
  },
  {
    id: "COMP-003",
    name: "HealthTech Innovations",
    legalName: "HealthTech Innovations Limited",
    registrationNumber: "34567890",
    vatNumber: "GB345678901",
    industry: "Healthcare",
    size: "201-500",
    founded: 2016,
    website: "www.healthtechinnovations.co.uk",
    linkedin: "linkedin.com/company/healthtechinnovations",
    address: {
      street: "10 King's Cross Boulevard",
      city: "London",
      postcode: "N1C 4AX",
      country: "United Kingdom"
    },
    primaryContact: {
      name: "Dr. Emily Chen",
      email: "emily.chen@healthtechinnovations.co.uk",
      phone: "+44 20 7946 0960"
    },
    metrics: {
      propertiesOccupied: 3,
      totalUnits: 15,
      annualRent: 580000,
      contractValue: 1740000,
      tenantSince: new Date('2021-06-01')
    },
    logo: null
  },
  {
    id: "COMP-004",
    name: "Creative Digital Agency",
    legalName: "Creative Digital Agency Ltd",
    registrationNumber: "45678901",
    vatNumber: "GB456789012",
    industry: "Marketing & Advertising",
    size: "11-50",
    founded: 2019,
    website: "www.creativedigital.co.uk",
    linkedin: "linkedin.com/company/creativedigital",
    address: {
      street: "15 Shoreditch High Street",
      city: "London",
      postcode: "E1 6JE",
      country: "United Kingdom"
    },
    primaryContact: {
      name: "Marcus Thompson",
      email: "marcus.thompson@creativedigital.co.uk",
      phone: "+44 20 7946 0961"
    },
    metrics: {
      propertiesOccupied: 1,
      totalUnits: 3,
      annualRent: 120000,
      contractValue: 360000,
      tenantSince: new Date('2023-09-01')
    },
    logo: null
  },
  {
    id: "COMP-005",
    name: "DataStream Analytics",
    legalName: "DataStream Analytics Limited",
    registrationNumber: "56789012",
    vatNumber: "GB567890123",
    industry: "Technology",
    size: "51-200",
    founded: 2017,
    website: "www.datastream.co.uk",
    linkedin: "linkedin.com/company/datastream",
    address: {
      street: "40 Bank Street",
      city: "London",
      postcode: "E14 5NR",
      country: "United Kingdom"
    },
    primaryContact: {
      name: "Priya Sharma",
      email: "priya.sharma@datastream.co.uk",
      phone: "+44 20 7946 0962"
    },
    metrics: {
      propertiesOccupied: 2,
      totalUnits: 10,
      annualRent: 420000,
      contractValue: 1260000,
      tenantSince: new Date('2022-11-15')
    },
    logo: null
  },
  {
    id: "COMP-006",
    name: "Legal Partners LLP",
    legalName: "Legal Partners LLP",
    registrationNumber: "67890123",
    vatNumber: "GB678901234",
    industry: "Legal Services",
    size: "11-50",
    founded: 2014,
    website: "www.legalpartners.co.uk",
    linkedin: "linkedin.com/company/legalpartners",
    address: {
      street: "5 Fleet Street",
      city: "London",
      postcode: "EC4Y 1AA",
      country: "United Kingdom"
    },
    primaryContact: {
      name: "Richard Blackwood",
      email: "richard.blackwood@legalpartners.co.uk",
      phone: "+44 20 7946 0963"
    },
    metrics: {
      propertiesOccupied: 1,
      totalUnits: 6,
      annualRent: 240000,
      contractValue: 720000,
      tenantSince: new Date('2021-03-01')
    },
    logo: null
  },
  {
    id: "COMP-007",
    name: "GreenEnergy Solutions",
    legalName: "GreenEnergy Solutions Limited",
    registrationNumber: "78901234",
    vatNumber: "GB789012345",
    industry: "Energy & Sustainability",
    size: "51-200",
    founded: 2020,
    website: "www.greenenergy.co.uk",
    linkedin: "linkedin.com/company/greenenergy",
    address: {
      street: "20 Fenchurch Street",
      city: "London",
      postcode: "EC3M 3BY",
      country: "United Kingdom"
    },
    primaryContact: {
      name: "Sophie Williams",
      email: "sophie.williams@greenenergy.co.uk",
      phone: "+44 20 7946 0964"
    },
    metrics: {
      propertiesOccupied: 2,
      totalUnits: 7,
      annualRent: 280000,
      contractValue: 840000,
      tenantSince: new Date('2023-02-01')
    },
    logo: null
  },
  {
    id: "COMP-008",
    name: "Quantum Consulting Group",
    legalName: "Quantum Consulting Group Limited",
    registrationNumber: "89012345",
    vatNumber: "GB890123456",
    industry: "Professional Services",
    size: "11-50",
    founded: 2018,
    website: "www.quantumconsulting.co.uk",
    linkedin: "linkedin.com/company/quantumconsulting",
    address: {
      street: "12 Gresham Street",
      city: "London",
      postcode: "EC2V 7JE",
      country: "United Kingdom"
    },
    primaryContact: {
      name: "David Foster",
      email: "david.foster@quantumconsulting.co.uk",
      phone: "+44 20 7946 0965"
    },
    metrics: {
      propertiesOccupied: 1,
      totalUnits: 5,
      annualRent: 200000,
      contractValue: 600000,
      tenantSince: new Date('2022-08-01')
    },
    logo: null
  },
  {
    id: "COMP-009",
    name: "Urban Property Developers",
    legalName: "Urban Property Developers PLC",
    registrationNumber: "90123456",
    vatNumber: "GB901234567",
    industry: "Real Estate",
    size: "201-500",
    founded: 2012,
    website: "www.urbanproperty.co.uk",
    linkedin: "linkedin.com/company/urbanproperty",
    address: {
      street: "30 St Mary Axe",
      city: "London",
      postcode: "EC3A 8BF",
      country: "United Kingdom"
    },
    primaryContact: {
      name: "Amanda Clarke",
      email: "amanda.clarke@urbanproperty.co.uk",
      phone: "+44 20 7946 0966"
    },
    metrics: {
      propertiesOccupied: 2,
      totalUnits: 9,
      annualRent: 360000,
      contractValue: 1080000,
      tenantSince: new Date('2021-10-01')
    },
    logo: null
  },
  {
    id: "COMP-010",
    name: "Nexus Retail Group",
    legalName: "Nexus Retail Group Limited",
    registrationNumber: "01234567",
    vatNumber: "GB012345678",
    industry: "Retail",
    size: "51-200",
    founded: 2016,
    website: "www.nexusretail.co.uk",
    linkedin: "linkedin.com/company/nexusretail",
    address: {
      street: "8 Bishopsgate",
      city: "London",
      postcode: "EC2N 4BQ",
      country: "United Kingdom"
    },
    primaryContact: {
      name: "Oliver Martinez",
      email: "oliver.martinez@nexusretail.co.uk",
      phone: "+44 20 7946 0967"
    },
    metrics: {
      propertiesOccupied: 1,
      totalUnits: 6,
      annualRent: 220000,
      contractValue: 660000,
      tenantSince: new Date('2023-05-01')
    },
    logo: null
  },
  {
    id: "COMP-011",
    name: "FutureSpace Ventures",
    legalName: "FutureSpace Ventures Limited",
    registrationNumber: "11223344",
    vatNumber: "GB112233445",
    industry: "Technology",
    size: "11-50",
    founded: 2024,
    website: "www.futurespace.co.uk",
    linkedin: "linkedin.com/company/futurespace",
    address: {
      street: "45 Moorgate",
      city: "London",
      postcode: "EC2R 6BL",
      country: "United Kingdom"
    },
    primaryContact: {
      name: "Jessica Taylor",
      email: "jessica.taylor@futurespace.co.uk",
      phone: "+44 20 7946 0968"
    },
    metrics: {
      propertiesOccupied: 0,
      totalUnits: 0,
      annualRent: 0,
      contractValue: 0,
      tenantSince: null
    },
    logo: null
  },
  {
    id: "COMP-012",
    name: "Horizon Biotech",
    legalName: "Horizon Biotech Limited",
    registrationNumber: "22334455",
    vatNumber: "GB223344556",
    industry: "Healthcare",
    size: "51-200",
    founded: 2023,
    website: "www.horizonbiotech.co.uk",
    linkedin: "linkedin.com/company/horizonbiotech",
    address: {
      street: "18 Monument Street",
      city: "London",
      postcode: "EC3R 8AJ",
      country: "United Kingdom"
    },
    primaryContact: {
      name: "Dr. Michael Roberts",
      email: "michael.roberts@horizonbiotech.co.uk",
      phone: "+44 20 7946 0969"
    },
    metrics: {
      propertiesOccupied: 0,
      totalUnits: 0,
      annualRent: 0,
      contractValue: 0,
      tenantSince: null
    },
    logo: null
  },
  {
    id: "COMP-013",
    name: "Apex Manufacturing",
    legalName: "Apex Manufacturing Limited",
    registrationNumber: "33445566",
    vatNumber: "GB334455667",
    industry: "Manufacturing",
    size: "201-500",
    founded: 2024,
    website: "www.apexmanufacturing.co.uk",
    linkedin: "linkedin.com/company/apexmanufacturing",
    address: {
      street: "22 Cannon Street",
      city: "London",
      postcode: "EC4M 6XH",
      country: "United Kingdom"
    },
    primaryContact: {
      name: "Thomas Anderson",
      email: "thomas.anderson@apexmanufacturing.co.uk",
      phone: "+44 20 7946 0970"
    },
    metrics: {
      propertiesOccupied: 0,
      totalUnits: 0,
      annualRent: 0,
      contractValue: 0,
      tenantSince: null
    },
    logo: null
  },
  {
    id: "COMP-014",
    name: "Prime Property Advisors",
    legalName: "Prime Property Advisors LLP",
    registrationNumber: "44556677",
    vatNumber: "GB445566778",
    industry: "Real Estate Brokerage",
    size: "11-50",
    founded: 2010,
    website: "www.primepropertyadvisors.co.uk",
    linkedin: "linkedin.com/company/primepropertyadvisors",
    address: {
      street: "50 Liverpool Street",
      city: "London",
      postcode: "EC2M 7PY",
      country: "United Kingdom"
    },
    primaryContact: {
      name: "Victoria Hughes",
      email: "victoria.hughes@primepropertyadvisors.co.uk",
      phone: "+44 20 7946 0971"
    },
    metrics: {
      propertiesOccupied: 0,
      totalUnits: 0,
      annualRent: 0,
      contractValue: 0,
      tenantSince: null
    },
    logo: null
  },
  {
    id: "COMP-015",
    name: "Elite Facilities Management",
    legalName: "Elite Facilities Management Limited",
    registrationNumber: "55667788",
    vatNumber: "GB556677889",
    industry: "Facilities Management",
    size: "51-200",
    founded: 2015,
    website: "www.elitefm.co.uk",
    linkedin: "linkedin.com/company/elitefm",
    address: {
      street: "35 Leadenhall Street",
      city: "London",
      postcode: "EC3A 1AR",
      country: "United Kingdom"
    },
    primaryContact: {
      name: "Robert Davies",
      email: "robert.davies@elitefm.co.uk",
      phone: "+44 20 7946 0972"
    },
    metrics: {
      propertiesOccupied: 0,
      totalUnits: 0,
      annualRent: 0,
      contractValue: 0,
      tenantSince: null
    },
    logo: null
  }
];

const contactsData = [
  // TechVision Solutions Ltd - 2 contacts
  {
    id: "CONT-001",
    firstName: "Sarah",
    lastName: "Mitchell",
    jobTitle: "Chief Executive Officer",
    department: "Executive",
    email: "sarah.mitchell@techvision.co.uk",
    phone: "+44 20 7946 0958",
    mobile: "+44 7700 900123",
    linkedin: "linkedin.com/in/sarahmitchell",
    companyId: "COMP-001",
    type: "Tenant",
    tags: ["VIP", "Key Decision Maker", "Budget Holder"],
    address: {
      street: "25 Old Broad Street",
      city: "London",
      postcode: "EC2N 1HQ"
    },
    photo: null,
    lastContact: new Date('2025-01-20'),
    preferredContact: "Email",
    notes: "Prefers morning meetings. Very responsive to emails. Interested in expanding to additional floors.",
    timeline: [
      {
        type: "email",
        action: "Sent lease renewal proposal",
        date: new Date('2025-01-20'),
        details: "Proposal for 3-year extension at current rates with option for floor expansion"
      },
      {
        type: "meeting",
        action: "Quarterly business review",
        date: new Date('2025-01-15'),
        details: "Discussed company growth plans and future space requirements"
      },
      {
        type: "call",
        action: "Phone call regarding maintenance",
        date: new Date('2025-01-10'),
        details: "Discussed HVAC upgrade timeline"
      }
    ],
    properties: [
      {
        propertyId: "PROP-001",
        propertyName: "Canary Wharf Tower",
        unit: "Floor 12",
        status: "Occupied",
        moveInDate: new Date('2022-03-15'),
        leaseEnd: new Date('2025-03-14')
      },
      {
        propertyId: "PROP-002",
        propertyName: "Shoreditch Tech Hub",
        unit: "Units 5A-5C",
        status: "Interested",
        moveInDate: null,
        leaseEnd: null
      }
    ],
    communications: [
      {
        type: "email",
        direction: "sent",
        subject: "Lease Renewal Discussion",
        date: new Date('2025-01-20'),
        preview: "Following up on our conversation about the lease renewal..."
      },
      {
        type: "email",
        direction: "received",
        subject: "Re: Quarterly Business Review",
        date: new Date('2025-01-16'),
        preview: "Thank you for the productive meeting yesterday..."
      },
      {
        type: "call",
        direction: "outbound",
        subject: "HVAC Upgrade Timeline",
        date: new Date('2025-01-10'),
        duration: "15 mins",
        notes: "Confirmed upgrade will be completed by end of January"
      }
    ],
    documents: [
      {
        name: "Signed Lease Agreement.pdf",
        type: "Contract",
        uploadDate: new Date('2022-03-10'),
        size: "2.4 MB"
      },
      {
        name: "Company Registration Certificate.pdf",
        type: "ID Document",
        uploadDate: new Date('2022-03-05'),
        size: "1.1 MB"
      }
    ]
  },
  {
    id: "CONT-002",
    firstName: "Tom",
    lastName: "Bradley",
    jobTitle: "Chief Technology Officer",
    department: "Technology",
    email: "tom.bradley@techvision.co.uk",
    phone: "+44 20 7946 0958",
    mobile: "+44 7700 900124",
    linkedin: "linkedin.com/in/tombradley",
    companyId: "COMP-001",
    type: "Tenant",
    tags: ["Technical Contact", "Influencer"],
    address: {
      street: "25 Old Broad Street",
      city: "London",
      postcode: "EC2N 1HQ"
    },
    photo: null,
    lastContact: new Date('2025-01-18'),
    preferredContact: "Email",
    notes: "Technical liaison for building systems and IT infrastructure.",
    timeline: [
      {
        type: "email",
        action: "Discussed internet connectivity upgrade",
        date: new Date('2025-01-18'),
        details: "Requested fiber upgrade to 10Gbps"
      },
      {
        type: "meeting",
        action: "IT infrastructure review",
        date: new Date('2025-01-12'),
        details: "Reviewed current setup and future requirements"
      }
    ],
    properties: [
      {
        propertyId: "PROP-001",
        propertyName: "Canary Wharf Tower",
        unit: "Floor 12",
        status: "Occupied",
        moveInDate: new Date('2022-03-15'),
        leaseEnd: new Date('2025-03-14')
      }
    ],
    communications: [
      {
        type: "email",
        direction: "received",
        subject: "Internet Connectivity Upgrade Request",
        date: new Date('2025-01-18'),
        preview: "We're experiencing bandwidth limitations..."
      },
      {
        type: "meeting",
        direction: "inbound",
        subject: "IT Infrastructure Review",
        date: new Date('2025-01-12'),
        duration: "45 mins",
        notes: "Discussed current and future IT needs"
      }
    ],
    documents: []
  },
  
  // Sterling Financial Partners - 2 contacts
  {
    id: "CONT-003",
    firstName: "James",
    lastName: "Patterson",
    jobTitle: "Managing Partner",
    department: "Executive",
    email: "james.patterson@sterlingfp.co.uk",
    phone: "+44 20 7946 0959",
    mobile: "+44 7700 900125",
    linkedin: "linkedin.com/in/jamespatterson",
    companyId: "COMP-002",
    type: "Tenant",
    tags: ["VIP", "Key Decision Maker", "Budget Holder"],
    address: {
      street: "1 Poultry",
      city: "London",
      postcode: "EC2R 8EJ"
    },
    photo: null,
    lastContact: new Date('2025-01-22'),
    preferredContact: "Phone",
    notes: "Prefers phone calls over email. Available afternoons only.",
    timeline: [
      {
        type: "call",
        action: "Lease extension discussion",
        date: new Date('2025-01-22'),
        details: "Interested in extending lease for 2 more years"
      },
      {
        type: "meeting",
        action: "Property tour for expansion",
        date: new Date('2025-01-17'),
        details: "Viewed adjacent units for potential expansion"
      }
    ],
    properties: [
      {
        propertyId: "PROP-003",
        propertyName: "London Bridge Quarter",
        unit: "Suite 4A",
        status: "Occupied",
        moveInDate: new Date('2023-01-10'),
        leaseEnd: new Date('2026-01-09')
      }
    ],
    communications: [
      {
        type: "call",
        direction: "inbound",
        subject: "Lease Extension Inquiry",
        date: new Date('2025-01-22'),
        duration: "20 mins",
        notes: "Confirmed interest in 2-year extension"
      }
    ],
    documents: [
      {
        name: "Current Lease Agreement.pdf",
        type: "Contract",
        uploadDate: new Date('2023-01-05'),
        size: "1.8 MB"
      }
    ]
  },
  {
    id: "CONT-004",
    firstName: "Rachel",
    lastName: "Green",
    jobTitle: "Operations Director",
    department: "Operations",
    email: "rachel.green@sterlingfp.co.uk",
    phone: "+44 20 7946 0959",
    mobile: "+44 7700 900126",
    linkedin: "linkedin.com/in/rachelgreen",
    companyId: "COMP-002",
    type: "Tenant",
    tags: ["Finance Contact"],
    address: {
      street: "1 Poultry",
      city: "London",
      postcode: "EC2R 8EJ"
    },
    photo: null,
    lastContact: new Date('2025-01-19'),
    preferredContact: "Email",
    notes: "Handles all billing and payment matters.",
    timeline: [
      {
        type: "email",
        action: "Invoice payment confirmation",
        date: new Date('2025-01-19'),
        details: "Confirmed Q1 rent payment processed"
      }
    ],
    properties: [
      {
        propertyId: "PROP-003",
        propertyName: "London Bridge Quarter",
        unit: "Suite 4A",
        status: "Occupied",
        moveInDate: new Date('2023-01-10'),
        leaseEnd: new Date('2026-01-09')
      }
    ],
    communications: [
      {
        type: "email",
        direction: "sent",
        subject: "Q1 2025 Invoice",
        date: new Date('2025-01-05'),
        preview: "Please find attached your Q1 invoice..."
      }
    ],
    documents: []
  },

  // HealthTech Innovations - 3 contacts
  {
    id: "CONT-005",
    firstName: "Emily",
    lastName: "Chen",
    jobTitle: "Chief Executive Officer",
    department: "Executive",
    email: "emily.chen@healthtechinnovations.co.uk",
    phone: "+44 20 7946 0960",
    mobile: "+44 7700 900127",
    linkedin: "linkedin.com/in/emilychen",
    companyId: "COMP-003",
    type: "Tenant",
    tags: ["VIP", "Key Decision Maker", "High Value"],
    address: {
      street: "10 King's Cross Boulevard",
      city: "London",
      postcode: "N1C 4AX"
    },
    photo: null,
    lastContact: new Date('2025-01-21'),
    preferredContact: "Email",
    notes: "Long-term tenant. Very satisfied with services. Considering additional space.",
    timeline: [
      {
        type: "meeting",
        action: "Annual review meeting",
        date: new Date('2025-01-21'),
        details: "Discussed satisfaction and future needs"
      },
      {
        type: "email",
        action: "Expansion inquiry",
        date: new Date('2025-01-14'),
        details: "Inquired about availability in King's Cross properties"
      }
    ],
    properties: [
      {
        propertyId: "PROP-004",
        propertyName: "King's Cross Innovation Centre",
        unit: "Floors 3-5",
        status: "Occupied",
        moveInDate: new Date('2021-06-01'),
        leaseEnd: new Date('2026-05-31')
      }
    ],
    communications: [
      {
        type: "meeting",
        direction: "inbound",
        subject: "Annual Review",
        date: new Date('2025-01-21'),
        duration: "60 mins",
        notes: "Very positive feedback. Interested in expansion."
      }
    ],
    documents: [
      {
        name: "Master Lease Agreement.pdf",
        type: "Contract",
        uploadDate: new Date('2021-05-25'),
        size: "3.2 MB"
      }
    ]
  },
  {
    id: "CONT-006",
    firstName: "Andrew",
    lastName: "Wilson",
    jobTitle: "Chief Financial Officer",
    department: "Finance",
    email: "andrew.wilson@healthtechinnovations.co.uk",
    phone: "+44 20 7946 0960",
    mobile: "+44 7700 900128",
    linkedin: "linkedin.com/in/andrewwilson",
    companyId: "COMP-003",
    type: "Tenant",
    tags: ["Finance Contact", "Budget Holder"],
    address: {
      street: "10 King's Cross Boulevard",
      city: "London",
      postcode: "N1C 4AX"
    },
    photo: null,
    lastContact: new Date('2025-01-15'),
    preferredContact: "Email",
    notes: "Handles all financial matters and contract negotiations.",
    timeline: [
      {
        type: "email",
        action: "Budget approval for expansion",
        date: new Date('2025-01-15'),
        details: "Confirmed budget allocated for additional space"
      }
    ],
    properties: [
      {
        propertyId: "PROP-004",
        propertyName: "King's Cross Innovation Centre",
        unit: "Floors 3-5",
        status: "Occupied",
        moveInDate: new Date('2021-06-01'),
        leaseEnd: new Date('2026-05-31')
      }
    ],
    communications: [
      {
        type: "email",
        direction: "received",
        subject: "Expansion Budget Approval",
        date: new Date('2025-01-15'),
        preview: "I'm pleased to confirm that the board has approved..."
      }
    ],
    documents: []
  },
  {
    id: "CONT-007",
    firstName: "Lisa",
    lastName: "Morgan",
    jobTitle: "Facilities Manager",
    department: "Operations",
    email: "lisa.morgan@healthtechinnovations.co.uk",
    phone: "+44 20 7946 0960",
    mobile: "+44 7700 900129",
    linkedin: "linkedin.com/in/lisamorgan",
    companyId: "COMP-003",
    type: "Tenant",
    tags: ["Technical Contact"],
    address: {
      street: "10 King's Cross Boulevard",
      city: "London",
      postcode: "N1C 4AX"
    },
    photo: null,
    lastContact: new Date('2025-01-23'),
    preferredContact: "Phone",
    notes: "Day-to-day contact for maintenance and facilities issues.",
    timeline: [
      {
        type: "call",
        action: "Maintenance request follow-up",
        date: new Date('2025-01-23'),
        details: "Confirmed completion of HVAC maintenance"
      }
    ],
    properties: [
      {
        propertyId: "PROP-004",
        propertyName: "King's Cross Innovation Centre",
        unit: "Floors 3-5",
        status: "Occupied",
        moveInDate: new Date('2021-06-01'),
        leaseEnd: new Date('2026-05-31')
      }
    ],
    communications: [
      {
        type: "call",
        direction: "outbound",
        subject: "HVAC Maintenance Completion",
        date: new Date('2025-01-23'),
        duration: "10 mins",
        notes: "Confirmed all systems working properly"
      }
    ],
    documents: []
  },

  // Creative Digital Agency - 2 contacts
  {
    id: "CONT-008",
    firstName: "Marcus",
    lastName: "Thompson",
    jobTitle: "Creative Director",
    department: "Creative",
    email: "marcus.thompson@creativedigital.co.uk",
    phone: "+44 20 7946 0961",
    mobile: "+44 7700 900130",
    linkedin: "linkedin.com/in/marcusthompson",
    companyId: "COMP-004",
    type: "Tenant",
    tags: ["Key Decision Maker", "Influencer"],
    address: {
      street: "15 Shoreditch High Street",
      city: "London",
      postcode: "E1 6JE"
    },
    photo: null,
    lastContact: new Date('2025-01-19'),
    preferredContact: "Email",
    notes: "Creative agency. Values modern, flexible workspace.",
    timeline: [
      {
        type: "email",
        action: "Space customization request",
        date: new Date('2025-01-19'),
        details: "Requested permission for interior design changes"
      }
    ],
    properties: [
      {
        propertyId: "PROP-002",
        propertyName: "Shoreditch Tech Hub",
        unit: "Unit 2B",
        status: "Occupied",
        moveInDate: new Date('2023-09-01'),
        leaseEnd: new Date('2026-08-31')
      }
    ],
    communications: [
      {
        type: "email",
        direction: "received",
        subject: "Interior Design Approval Request",
        date: new Date('2025-01-19'),
        preview: "We'd like to make some aesthetic improvements..."
      }
    ],
    documents: [
      {
        name: "Lease Agreement.pdf",
        type: "Contract",
        uploadDate: new Date('2023-08-25'),
        size: "1.9 MB"
      }
    ]
  },
  {
    id: "CONT-009",
    firstName: "Hannah",
    lastName: "Lewis",
    jobTitle: "Operations Manager",
    department: "Operations",
    email: "hannah.lewis@creativedigital.co.uk",
    phone: "+44 20 7946 0961",
    mobile: "+44 7700 900131",
    linkedin: "linkedin.com/in/hannahlewis",
    companyId: "COMP-004",
    type: "Tenant",
    tags: [],
    address: {
      street: "15 Shoreditch High Street",
      city: "London",
      postcode: "E1 6JE"
    },
    photo: null,
    lastContact: new Date('2025-01-16'),
    preferredContact: "Email",
    notes: "Handles day-to-day operations and facilities coordination.",
    timeline: [
      {
        type: "email",
        action: "Parking space request",
        date: new Date('2025-01-16'),
        details: "Requested additional parking space for new hire"
      }
    ],
    properties: [
      {
        propertyId: "PROP-002",
        propertyName: "Shoreditch Tech Hub",
        unit: "Unit 2B",
        status: "Occupied",
        moveInDate: new Date('2023-09-01'),
        leaseEnd: new Date('2026-08-31')
      }
    ],
    communications: [
      {
        type: "email",
        direction: "received",
        subject: "Additional Parking Space",
        date: new Date('2025-01-16'),
        preview: "We're hiring a new senior designer who will need..."
      }
    ],
    documents: []
  },

  // DataStream Analytics - 2 contacts
  {
    id: "CONT-010",
    firstName: "Priya",
    lastName: "Sharma",
    jobTitle: "Chief Executive Officer",
    department: "Executive",
    email: "priya.sharma@datastream.co.uk",
    phone: "+44 20 7946 0962",
    mobile: "+44 7700 900132",
    linkedin: "linkedin.com/in/priyasharma",
    companyId: "COMP-005",
    type: "Tenant",
    tags: ["VIP", "Key Decision Maker", "High Value"],
    address: {
      street: "40 Bank Street",
      city: "London",
      postcode: "E14 5NR"
    },
    photo: null,
    lastContact: new Date('2025-01-20'),
    preferredContact: "Email",
    notes: "Fast-growing data analytics company. Excellent tenant.",
    timeline: [
      {
        type: "meeting",
        action: "Growth discussion",
        date: new Date('2025-01-20'),
        details: "Discussed company growth and space requirements"
      }
    ],
    properties: [
      {
        propertyId: "PROP-001",
        propertyName: "Canary Wharf Tower",
        unit: "Floor 8",
        status: "Occupied",
        moveInDate: new Date('2022-11-15'),
        leaseEnd: new Date('2025-11-14')
      }
    ],
    communications: [
      {
        type: "meeting",
        direction: "inbound",
        subject: "Growth Planning Session",
        date: new Date('2025-01-20'),
        duration: "45 mins",
        notes: "Discussed headcount growth and space needs"
      }
    ],
    documents: [
      {
        name: "Lease Agreement.pdf",
        type: "Contract",
        uploadDate: new Date('2022-11-10'),
        size: "2.1 MB"
      }
    ]
  },
  {
    id: "CONT-011",
    firstName: "Daniel",
    lastName: "Cooper",
    jobTitle: "Chief Operating Officer",
    department: "Operations",
    email: "daniel.cooper@datastream.co.uk",
    phone: "+44 20 7946 0962",
    mobile: "+44 7700 900133",
    linkedin: "linkedin.com/in/danielcooper",
    companyId: "COMP-005",
    type: "Tenant",
    tags: ["Key Decision Maker"],
    address: {
      street: "40 Bank Street",
      city: "London",
      postcode: "E14 5NR"
    },
    photo: null,
    lastContact: new Date('2025-01-18'),
    preferredContact: "Email",
    notes: "Handles operational matters and vendor relationships.",
    timeline: [
      {
        type: "email",
        action: "Security access update",
        date: new Date('2025-01-18'),
        details: "Requested access cards for 5 new employees"
      }
    ],
    properties: [
      {
        propertyId: "PROP-001",
        propertyName: "Canary Wharf Tower",
        unit: "Floor 8",
        status: "Occupied",
        moveInDate: new Date('2022-11-15'),
        leaseEnd: new Date('2025-11-14')
      }
    ],
    communications: [
      {
        type: "email",
        direction: "received",
        subject: "New Employee Access Cards",
        date: new Date('2025-01-18'),
        preview: "We have 5 new starters next week who will need..."
      }
    ],
    documents: []
  },

  // Legal Partners LLP - 2 contacts
  {
    id: "CONT-012",
    firstName: "Richard",
    lastName: "Blackwood",
    jobTitle: "Senior Partner",
    department: "Legal",
    email: "richard.blackwood@legalpartners.co.uk",
    phone: "+44 20 7946 0963",
    mobile: "+44 7700 900134",
    linkedin: "linkedin.com/in/richardblackwood",
    companyId: "COMP-006",
    type: "Tenant",
    tags: ["VIP", "Key Decision Maker"],
    address: {
      street: "5 Fleet Street",
      city: "London",
      postcode: "EC4Y 1AA"
    },
    photo: null,
    lastContact: new Date('2025-01-17'),
    preferredContact: "Email",
    notes: "Established law firm. Long-term tenant since 2021.",
    timeline: [
      {
        type: "email",
        action: "Lease renewal discussion",
        date: new Date('2025-01-17'),
        details: "Initial discussion about 2026 lease renewal"
      }
    ],
    properties: [
      {
        propertyId: "PROP-005",
        propertyName: "Holborn Legal Quarter",
        unit: "Suite 3A-3B",
        status: "Occupied",
        moveInDate: new Date('2021-03-01'),
        leaseEnd: new Date('2026-02-28')
      }
    ],
    communications: [
      {
        type: "email",
        direction: "sent",
        subject: "2026 Lease Renewal",
        date: new Date('2025-01-17'),
        preview: "I wanted to reach out early to discuss..."
      }
    ],
    documents: [
      {
        name: "Current Lease.pdf",
        type: "Contract",
        uploadDate: new Date('2021-02-25'),
        size: "2.8 MB"
      }
    ]
  },
  {
    id: "CONT-013",
    firstName: "Catherine",
    lastName: "Price",
    jobTitle: "Practice Manager",
    department: "Administration",
    email: "catherine.price@legalpartners.co.uk",
    phone: "+44 20 7946 0963",
    mobile: "+44 7700 900135",
    linkedin: "linkedin.com/in/catherineprice",
    companyId: "COMP-006",
    type: "Tenant",
    tags: [],
    address: {
      street: "5 Fleet Street",
      city: "London",
      postcode: "EC4Y 1AA"
    },
    photo: null,
    lastContact: new Date('2025-01-22'),
    preferredContact: "Email",
    notes: "Primary contact for administrative and facilities matters.",
    timeline: [
      {
        type: "call",
        action: "Conference room booking",
        date: new Date('2025-01-22'),
        details: "Booked meeting room for client meetings"
      }
    ],
    properties: [
      {
        propertyId: "PROP-005",
        propertyName: "Holborn Legal Quarter",
        unit: "Suite 3A-3B",
        status: "Occupied",
        moveInDate: new Date('2021-03-01'),
        leaseEnd: new Date('2026-02-28')
      }
    ],
    communications: [
      {
        type: "call",
        direction: "inbound",
        subject: "Meeting Room Booking",
        date: new Date('2025-01-22'),
        duration: "5 mins",
        notes: "Booked conference room for next week"
      }
    ],
    documents: []
  },

  // GreenEnergy Solutions - 2 contacts
  {
    id: "CONT-014",
    firstName: "Sophie",
    lastName: "Williams",
    jobTitle: "Chief Executive Officer",
    department: "Executive",
    email: "sophie.williams@greenenergy.co.uk",
    phone: "+44 20 7946 0964",
    mobile: "+44 7700 900136",
    linkedin: "linkedin.com/in/sophiewilliams",
    companyId: "COMP-007",
    type: "Tenant",
    tags: ["VIP", "Key Decision Maker", "High Value"],
    address: {
      street: "20 Fenchurch Street",
      city: "London",
      postcode: "EC3M 3BY"
    },
    photo: null,
    lastContact: new Date('2025-01-21'),
    preferredContact: "Email",
    notes: "Sustainability-focused company. Interested in green building features.",
    timeline: [
      {
        type: "meeting",
        action: "Sustainability features discussion",
        date: new Date('2025-01-21'),
        details: "Discussed building's green credentials and improvements"
      }
    ],
    properties: [
      {
        propertyId: "PROP-006",
        propertyName: "Paddington Central",
        unit: "Floor 4",
        status: "Occupied",
        moveInDate: new Date('2023-02-01'),
        leaseEnd: new Date('2028-01-31')
      }
    ],
    communications: [
      {
        type: "meeting",
        direction: "inbound",
        subject: "Green Building Features",
        date: new Date('2025-01-21'),
        duration: "30 mins",
        notes: "Very interested in solar panels and EV charging"
      }
    ],
    documents: [
      {
        name: "Lease Agreement.pdf",
        type: "Contract",
        uploadDate: new Date('2023-01-25'),
        size: "2.3 MB"
      }
    ]
  },
  {
    id: "CONT-015",
    firstName: "Benjamin",
    lastName: "Turner",
    jobTitle: "Head of Operations",
    department: "Operations",
    email: "benjamin.turner@greenenergy.co.uk",
    phone: "+44 20 7946 0964",
    mobile: "+44 7700 900137",
    linkedin: "linkedin.com/in/benjaminturner",
    companyId: "COMP-007",
    type: "Tenant",
    tags: ["Technical Contact"],
    address: {
      street: "20 Fenchurch Street",
      city: "London",
      postcode: "EC3M 3BY"
    },
    photo: null,
    lastContact: new Date('2025-01-19'),
    preferredContact: "Email",
    notes: "Handles operational and technical matters.",
    timeline: [
      {
        type: "email",
        action: "Energy consumption report request",
        date: new Date('2025-01-19'),
        details: "Requested detailed energy usage data"
      }
    ],
    properties: [
      {
        propertyId: "PROP-006",
        propertyName: "Paddington Central",
        unit: "Floor 4",
        status: "Occupied",
        moveInDate: new Date('2023-02-01'),
        leaseEnd: new Date('2028-01-31')
      }
    ],
    communications: [
      {
        type: "email",
        direction: "received",
        subject: "Energy Usage Data Request",
        date: new Date('2025-01-19'),
        preview: "For our sustainability reporting, we need..."
      }
    ],
    documents: []
  },

  // Quantum Consulting Group - 2 contacts
  {
    id: "CONT-016",
    firstName: "David",
    lastName: "Foster",
    jobTitle: "Managing Director",
    department: "Executive",
    email: "david.foster@quantumconsulting.co.uk",
    phone: "+44 20 7946 0965",
    mobile: "+44 7700 900138",
    linkedin: "linkedin.com/in/davidfoster",
    companyId: "COMP-008",
    type: "Tenant",
    tags: ["Key Decision Maker", "Budget Holder"],
    address: {
      street: "12 Gresham Street",
      city: "London",
      postcode: "EC2V 7JE"
    },
    photo: null,
    lastContact: new Date('2025-01-16'),
    preferredContact: "Phone",
    notes: "Consulting firm. Professional services sector.",
    timeline: [
      {
        type: "call",
        action: "Quarterly check-in",
        date: new Date('2025-01-16'),
        details: "Routine satisfaction check"
      }
    ],
    properties: [
      {
        propertyId: "PROP-007",
        propertyName: "Clerkenwell Workspace",
        unit: "Suite 2A",
        status: "Occupied",
        moveInDate: new Date('2022-08-01'),
        leaseEnd: new Date('2025-07-31')
      }
    ],
    communications: [
      {
        type: "call",
        direction: "outbound",
        subject: "Quarterly Check-in",
        date: new Date('2025-01-16'),
        duration: "15 mins",
        notes: "Very satisfied with services"
      }
    ],
    documents: [
      {
        name: "Lease Agreement.pdf",
        type: "Contract",
        uploadDate: new Date('2022-07-25'),
        size: "2.0 MB"
      }
    ]
  },
  {
    id: "CONT-017",
    firstName: "Emma",
    lastName: "Richardson",
    jobTitle: "Office Manager",
    department: "Administration",
    email: "emma.richardson@quantumconsulting.co.uk",
    phone: "+44 20 7946 0965",
    mobile: "+44 7700 900139",
    linkedin: "linkedin.com/in/emmarichardson",
    companyId: "COMP-008",
    type: "Tenant",
    tags: [],
    address: {
      street: "12 Gresham Street",
      city: "London",
      postcode: "EC2V 7JE"
    },
    photo: null,
    lastContact: new Date('2025-01-23'),
    preferredContact: "Email",
    notes: "Day-to-day contact for office matters.",
    timeline: [
      {
        type: "email",
        action: "Cleaning schedule adjustment",
        date: new Date('2025-01-23'),
        details: "Requested earlier cleaning times"
      }
    ],
    properties: [
      {
        propertyId: "PROP-007",
        propertyName: "Clerkenwell Workspace",
        unit: "Suite 2A",
        status: "Occupied",
        moveInDate: new Date('2022-08-01'),
        leaseEnd: new Date('2025-07-31')
      }
    ],
    communications: [
      {
        type: "email",
        direction: "received",
        subject: "Cleaning Schedule Change",
        date: new Date('2025-01-23'),
        preview: "Could we adjust the cleaning times to..."
      }
    ],
    documents: []
  },

  // Urban Property Developers - 2 contacts
  {
    id: "CONT-018",
    firstName: "Amanda",
    lastName: "Clarke",
    jobTitle: "Development Director",
    department: "Development",
    email: "amanda.clarke@urbanproperty.co.uk",
    phone: "+44 20 7946 0966",
    mobile: "+44 7700 900140",
    linkedin: "linkedin.com/in/amandaclarke",
    companyId: "COMP-009",
    type: "Tenant",
    tags: ["VIP", "Key Decision Maker"],
    address: {
      street: "30 St Mary Axe",
      city: "London",
      postcode: "EC3A 8BF"
    },
    photo: null,
    lastContact: new Date('2025-01-20'),
    preferredContact: "Email",
    notes: "Property development company. Strategic tenant.",
    timeline: [
      {
        type: "meeting",
        action: "Partnership discussion",
        date: new Date('2025-01-20'),
        details: "Discussed potential joint ventures"
      }
    ],
    properties: [
      {
        propertyId: "PROP-008",
        propertyName: "Greenwich Business Park",
        unit: "Building A",
        status: "Occupied",
        moveInDate: new Date('2021-10-01'),
        leaseEnd: new Date('2026-09-30')
      }
    ],
    communications: [
      {
        type: "meeting",
        direction: "inbound",
        subject: "Partnership Opportunities",
        date: new Date('2025-01-20'),
        duration: "60 mins",
        notes: "Exploring co-development opportunities"
      }
    ],
    documents: [
      {
        name: "Lease Agreement.pdf",
        type: "Contract",
        uploadDate: new Date('2021-09-25'),
        size: "2.6 MB"
      }
    ]
  },
  {
    id: "CONT-019",
    firstName: "Peter",
    lastName: "Hughes",
    jobTitle: "Project Manager",
    department: "Projects",
    email: "peter.hughes@urbanproperty.co.uk",
    phone: "+44 20 7946 0966",
    mobile: "+44 7700 900141",
    linkedin: "linkedin.com/in/peterhughes",
    companyId: "COMP-009",
    type: "Tenant",
    tags: [],
    address: {
      street: "30 St Mary Axe",
      city: "London",
      postcode: "EC3A 8BF"
    },
    photo: null,
    lastContact: new Date('2025-01-18'),
    preferredContact: "Email",
    notes: "Handles project coordination and logistics.",
    timeline: [
      {
        type: "email",
        action: "Storage space request",
        date: new Date('2025-01-18'),
        details: "Requested additional storage for project materials"
      }
    ],
    properties: [
      {
        propertyId: "PROP-008",
        propertyName: "Greenwich Business Park",
        unit: "Building A",
        status: "Occupied",
        moveInDate: new Date('2021-10-01'),
        leaseEnd: new Date('2026-09-30')
      }
    ],
    communications: [
      {
        type: "email",
        direction: "received",
        subject: "Additional Storage Request",
        date: new Date('2025-01-18'),
        preview: "We need some temporary storage space for..."
      }
    ],
    documents: []
  },

  // Nexus Retail Group - 2 contacts
  {
    id: "CONT-020",
    firstName: "Oliver",
    lastName: "Martinez",
    jobTitle: "Chief Executive Officer",
    department: "Executive",
    email: "oliver.martinez@nexusretail.co.uk",
    phone: "+44 20 7946 0967",
    mobile: "+44 7700 900142",
    linkedin: "linkedin.com/in/olivermartinez",
    companyId: "COMP-010",
    type: "Tenant",
    tags: ["Key Decision Maker", "High Value"],
    address: {
      street: "8 Bishopsgate",
      city: "London",
      postcode: "EC2N 4BQ"
    },
    photo: null,
    lastContact: new Date('2025-01-19'),
    preferredContact: "Email",
    notes: "Retail group headquarters. Growing company.",
    timeline: [
      {
        type: "email",
        action: "Expansion discussion",
        date: new Date('2025-01-19'),
        details: "Interested in additional office space"
      }
    ],
    properties: [
      {
        propertyId: "PROP-009",
        propertyName: "Stratford Office Quarter",
        unit: "Floor 2",
        status: "Occupied",
        moveInDate: new Date('2023-05-01'),
        leaseEnd: new Date('2026-04-30')
      }
    ],
    communications: [
      {
        type: "email",
        direction: "received",
        subject: "Office Expansion Inquiry",
        date: new Date('2025-01-19'),
        preview: "Our team is growing and we're looking for..."
      }
    ],
    documents: [
      {
        name: "Lease Agreement.pdf",
        type: "Contract",
        uploadDate: new Date('2023-04-25'),
        size: "2.2 MB"
      }
    ]
  },
  {
    id: "CONT-021",
    firstName: "Natalie",
    lastName: "Brooks",
    jobTitle: "Head of HR",
    department: "Human Resources",
    email: "natalie.brooks@nexusretail.co.uk",
    phone: "+44 20 7946 0967",
    mobile: "+44 7700 900143",
    linkedin: "linkedin.com/in/nataliebrooks",
    companyId: "COMP-010",
    type: "Tenant",
    tags: [],
    address: {
      street: "8 Bishopsgate",
      city: "London",
      postcode: "EC2N 4BQ"
    },
    photo: null,
    lastContact: new Date('2025-01-17'),
    preferredContact: "Email",
    notes: "Handles HR and employee facilities matters.",
    timeline: [
      {
        type: "email",
        action: "Parking permit request",
        date: new Date('2025-01-17'),
        details: "Requested parking permits for senior staff"
      }
    ],
    properties: [
      {
        propertyId: "PROP-009",
        propertyName: "Stratford Office Quarter",
        unit: "Floor 2",
        status: "Occupied",
        moveInDate: new Date('2023-05-01'),
        leaseEnd: new Date('2026-04-30')
      }
    ],
    communications: [
      {
        type: "email",
        direction: "received",
        subject: "Parking Permits for Senior Staff",
        date: new Date('2025-01-17'),
        preview: "We have three senior hires starting who will need..."
      }
    ],
    documents: []
  },

  // FutureSpace Ventures (Prospect) - 2 contacts
  {
    id: "CONT-022",
    firstName: "Jessica",
    lastName: "Taylor",
    jobTitle: "Founder & CEO",
    department: "Executive",
    email: "jessica.taylor@futurespace.co.uk",
    phone: "+44 20 7946 0968",
    mobile: "+44 7700 900144",
    linkedin: "linkedin.com/in/jessicataylor",
    companyId: "COMP-011",
    type: "Prospect",
    tags: ["Key Decision Maker", "Budget Holder"],
    address: {
      street: "45 Moorgate",
      city: "London",
      postcode: "EC2R 6BL"
    },
    photo: null,
    lastContact: new Date('2025-01-22'),
    preferredContact: "Email",
    notes: "Early-stage startup. Looking for flexible office space.",
    timeline: [
      {
        type: "meeting",
        action: "Property viewing",
        date: new Date('2025-01-22'),
        details: "Viewed Shoreditch Tech Hub units"
      },
      {
        type: "email",
        action: "Initial inquiry",
        date: new Date('2025-01-15'),
        details: "Inquired about flexible workspace options"
      }
    ],
    properties: [
      {
        propertyId: "PROP-002",
        propertyName: "Shoreditch Tech Hub",
        unit: "Unit 3A",
        status: "Viewing Scheduled",
        moveInDate: null,
        leaseEnd: null
      }
    ],
    communications: [
      {
        type: "meeting",
        direction: "inbound",
        subject: "Property Viewing",
        date: new Date('2025-01-22'),
        duration: "45 mins",
        notes: "Very interested. Waiting for board approval."
      },
      {
        type: "email",
        direction: "received",
        subject: "Flexible Workspace Inquiry",
        date: new Date('2025-01-15'),
        preview: "We're a growing startup looking for..."
      }
    ],
    documents: []
  },
  {
    id: "CONT-023",
    firstName: "Ryan",
    lastName: "Collins",
    jobTitle: "Chief Operating Officer",
    department: "Operations",
    email: "ryan.collins@futurespace.co.uk",
    phone: "+44 20 7946 0968",
    mobile: "+44 7700 900145",
    linkedin: "linkedin.com/in/ryancollins",
    companyId: "COMP-011",
    type: "Prospect",
    tags: [],
    address: {
      street: "45 Moorgate",
      city: "London",
      postcode: "EC2R 6BL"
    },
    photo: null,
    lastContact: new Date('2025-01-22'),
    preferredContact: "Email",
    notes: "Handles operational planning and logistics.",
    timeline: [
      {
        type: "meeting",
        action: "Property viewing",
        date: new Date('2025-01-22'),
        details: "Attended viewing with CEO"
      }
    ],
    properties: [
      {
        propertyId: "PROP-002",
        propertyName: "Shoreditch Tech Hub",
        unit: "Unit 3A",
        status: "Viewing Scheduled",
        moveInDate: null,
        leaseEnd: null
      }
    ],
    communications: [
      {
        type: "meeting",
        direction: "inbound",
        subject: "Property Viewing",
        date: new Date('2025-01-22'),
        duration: "45 mins",
        notes: "Focused on technical specifications"
      }
    ],
    documents: []
  },

  // Horizon Biotech (Prospect) - 2 contacts
  {
    id: "CONT-024",
    firstName: "Michael",
    lastName: "Roberts",
    jobTitle: "Chief Executive Officer",
    department: "Executive",
    email: "michael.roberts@horizonbiotech.co.uk",
    phone: "+44 20 7946 0969",
    mobile: "+44 7700 900146",
    linkedin: "linkedin.com/in/michaelroberts",
    companyId: "COMP-012",
    type: "Prospect",
    tags: ["VIP", "Key Decision Maker", "High Value"],
    address: {
      street: "18 Monument Street",
      city: "London",
      postcode: "EC3R 8AJ"
    },
    photo: null,
    lastContact: new Date('2025-01-21'),
    preferredContact: "Email",
    notes: "Biotech company. Requires specialized lab space.",
    timeline: [
      {
        type: "meeting",
        action: "Requirements discussion",
        date: new Date('2025-01-21'),
        details: "Discussed lab specifications and requirements"
      },
      {
        type: "email",
        action: "Initial contact",
        date: new Date('2025-01-14'),
        details: "Referred by broker. Looking for lab space."
      }
    ],
    properties: [
      {
        propertyId: "PROP-004",
        propertyName: "King's Cross Innovation Centre",
        unit: "Lab Suite 2",
        status: "Interested",
        moveInDate: null,
        leaseEnd: null
      }
    ],
    communications: [
      {
        type: "meeting",
        direction: "inbound",
        subject: "Lab Requirements Meeting",
        date: new Date('2025-01-21'),
        duration: "60 mins",
        notes: "Need specialized ventilation and power"
      }
    ],
    documents: []
  },
  {
    id: "CONT-025",
    firstName: "Laura",
    lastName: "Bennett",
    jobTitle: "Facilities Director",
    department: "Operations",
    email: "laura.bennett@horizonbiotech.co.uk",
    phone: "+44 20 7946 0969",
    mobile: "+44 7700 900147",
    linkedin: "linkedin.com/in/laurabennett",
    companyId: "COMP-012",
    type: "Prospect",
    tags: ["Technical Contact"],
    address: {
      street: "18 Monument Street",
      city: "London",
      postcode: "EC3R 8AJ"
    },
    photo: null,
    lastContact: new Date('2025-01-21'),
    preferredContact: "Email",
    notes: "Technical specialist for lab requirements.",
    timeline: [
      {
        type: "meeting",
        action: "Technical specifications review",
        date: new Date('2025-01-21'),
        details: "Reviewed building systems and capabilities"
      }
    ],
    properties: [
      {
        propertyId: "PROP-004",
        propertyName: "King's Cross Innovation Centre",
        unit: "Lab Suite 2",
        status: "Interested",
        moveInDate: null,
        leaseEnd: null
      }
    ],
    communications: [
      {
        type: "meeting",
        direction: "inbound",
        subject: "Technical Specifications Review",
        date: new Date('2025-01-21'),
        duration: "60 mins",
        notes: "Very detailed technical requirements"
      }
    ],
    documents: []
  },

  // Apex Manufacturing (Prospect) - 1 contact
  {
    id: "CONT-026",
    firstName: "Thomas",
    lastName: "Anderson",
    jobTitle: "Managing Director",
    department: "Executive",
    email: "thomas.anderson@apexmanufacturing.co.uk",
    phone: "+44 20 7946 0970",
    mobile: "+44 7700 900148",
    linkedin: "linkedin.com/in/thomasanderson",
    companyId: "COMP-013",
    type: "Prospect",
    tags: ["Key Decision Maker"],
    address: {
      street: "22 Cannon Street",
      city: "London",
      postcode: "EC4M 6XH"
    },
    photo: null,
    lastContact: new Date('2025-01-16'),
    preferredContact: "Phone",
    notes: "Manufacturing company. Looking for office + warehouse space.",
    timeline: [
      {
        type: "call",
        action: "Initial consultation",
        date: new Date('2025-01-16'),
        details: "Discussed space requirements and timeline"
      }
    ],
    properties: [
      {
        propertyId: "PROP-008",
        propertyName: "Greenwich Business Park",
        unit: "Building C",
        status: "Interested",
        moveInDate: null,
        leaseEnd: null
      }
    ],
    communications: [
      {
        type: "call",
        direction: "inbound",
        subject: "Initial Consultation",
        date: new Date('2025-01-16'),
        duration: "30 mins",
        notes: "Need combined office and warehouse space"
      }
    ],
    documents: []
  },

  // Prime Property Advisors (Broker) - 1 contact
  {
    id: "CONT-027",
    firstName: "Victoria",
    lastName: "Hughes",
    jobTitle: "Senior Broker",
    department: "Brokerage",
    email: "victoria.hughes@primepropertyadvisors.co.uk",
    phone: "+44 20 7946 0971",
    mobile: "+44 7700 900149",
    linkedin: "linkedin.com/in/victoriahughes",
    companyId: "COMP-014",
    type: "Broker",
    tags: ["VIP", "Influencer"],
    address: {
      street: "50 Liverpool Street",
      city: "London",
      postcode: "EC2M 7PY"
    },
    photo: null,
    lastContact: new Date('2025-01-23'),
    preferredContact: "Phone",
    notes: "Active broker. Has referred multiple clients. Commission rate: 10%.",
    timeline: [
      {
        type: "call",
        action: "New client referral",
        date: new Date('2025-01-23'),
        details: "Referred Horizon Biotech for lab space"
      },
      {
        type: "meeting",
        action: "Portfolio review",
        date: new Date('2025-01-10'),
        details: "Reviewed available units and pricing"
      }
    ],
    properties: [],
    communications: [
      {
        type: "call",
        direction: "inbound",
        subject: "New Client Referral",
        date: new Date('2025-01-23'),
        duration: "15 mins",
        notes: "Referred biotech company looking for lab space"
      }
    ],
    documents: [
      {
        name: "Broker Agreement.pdf",
        type: "Contract",
        uploadDate: new Date('2024-01-15'),
        size: "1.5 MB"
      }
    ]
  },

  // Elite Facilities Management (Vendor) - 1 contact
  {
    id: "CONT-028",
    firstName: "Robert",
    lastName: "Davies",
    jobTitle: "Account Manager",
    department: "Client Services",
    email: "robert.davies@elitefm.co.uk",
    phone: "+44 20 7946 0972",
    mobile: "+44 7700 900150",
    linkedin: "linkedin.com/in/robertdavies",
    companyId: "COMP-015",
    type: "Vendor",
    tags: [],
    address: {
      street: "35 Leadenhall Street",
      city: "London",
      postcode: "EC3A 1AR"
    },
    photo: null,
    lastContact: new Date('2025-01-22'),
    preferredContact: "Email",
    notes: "Facilities management vendor. Manages cleaning and maintenance services.",
    timeline: [
      {
        type: "meeting",
        action: "Service review meeting",
        date: new Date('2025-01-22'),
        details: "Quarterly service performance review"
      },
      {
        type: "email",
        action: "Invoice submission",
        date: new Date('2025-01-15'),
        details: "Submitted Q1 service invoice"
      }
    ],
    properties: [],
    communications: [
      {
        type: "meeting",
        direction: "inbound",
        subject: "Quarterly Service Review",
        date: new Date('2025-01-22'),
        duration: "45 mins",
        notes: "Performance excellent. Renewed contract."
      }
    ],
    documents: [
      {
        name: "Service Contract.pdf",
        type: "Contract",
        uploadDate: new Date('2024-01-01'),
        size: "2.7 MB"
      }
    ]
  }
];
