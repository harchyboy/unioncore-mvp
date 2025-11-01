// Comprehensive Property Data for UNION Prototype
// 10 realistic commercial properties in London

const propertiesData = [
    {
        id: "PROP-001",
        name: "Canary Wharf Tower",
        address: "1 Canada Square, Canary Wharf, London, E14 5AB",
        location: "Canary Wharf",
        type: "Office Building",
        totalArea: 45000,
        floors: 12,
        builtYear: 2018,
        totalUnits: 24,
        occupiedUnits: 22,
        occupancyRate: 92,
        status: "Partially Occupied",
        pricePerSqFt: 65,
        annualRevenue: 2850,
        description: "Premium Grade A office building in the heart of Canary Wharf's financial district. Features state-of-the-art facilities, floor-to-ceiling windows with Thames views, and excellent transport links via Canary Wharf Underground and DLR stations.",
        amenities: ["24/7 Security", "Reception", "Parking (200 spaces)", "Bike Storage", "Shower Facilities", "On-site Cafe", "Meeting Rooms", "High-Speed Internet", "Air Conditioning", "Disabled Access"],
        images: [
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800",
            "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800",
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800"
        ],
        units: [
            { id: "U-001", floor: 3, size: 2000, status: "Occupied", tenant: "FinTech Solutions Ltd", rent: 130000, leaseEnd: "2026-12-31" },
            { id: "U-002", floor: 3, size: 1800, status: "Occupied", tenant: "Legal Partners LLP", rent: 117000, leaseEnd: "2027-06-30" },
            { id: "U-003", floor: 5, size: 2200, status: "Available", tenant: null, rent: 143000, leaseEnd: null },
            { id: "U-004", floor: 5, size: 1900, status: "Occupied", tenant: "DataCloud Systems", rent: 123500, leaseEnd: "2026-09-30" },
            { id: "U-005", floor: 7, size: 2500, status: "Occupied", tenant: "Consulting Group UK", rent: 162500, leaseEnd: "2027-03-31" }
        ],
        documents: [
            { name: "Floor Plans - All Floors.pdf", type: "Floor Plan", size: "4.2 MB", date: "2024-01-15" },
            { name: "EPC Certificate.pdf", type: "Certificate", size: "1.1 MB", date: "2024-02-01" },
            { name: "Building Insurance Policy.pdf", type: "Insurance", size: "2.8 MB", date: "2024-01-01" },
            { name: "Property Photos - Exterior.zip", type: "Photos", size: "15.3 MB", date: "2024-03-10" },
            { name: "Marketing Brochure.pdf", type: "Marketing", size: "8.5 MB", date: "2024-03-15" }
        ],
        marketing: {
            active: true,
            platforms: ["Rightmove", "Zoopla", "OnTheMarket", "Company Website"],
            views: 1250,
            enquiries: 45
        }
    },
    {
        id: "PROP-002",
        name: "Shoreditch Tech Hub",
        address: "85 Great Eastern Street, Shoreditch, London, EC2A 3HU",
        location: "Shoreditch",
        type: "Flex Space",
        totalArea: 28000,
        floors: 6,
        builtYear: 2020,
        totalUnits: 18,
        occupiedUnits: 18,
        occupancyRate: 100,
        status: "Fully Let",
        pricePerSqFt: 58,
        annualRevenue: 1624,
        description: "Modern flexible workspace in the heart of Shoreditch's creative and tech quarter. Exposed brick, industrial design, and collaborative spaces perfect for startups and creative agencies. Walking distance to Old Street and Shoreditch High Street stations.",
        amenities: ["24/7 Access", "Concierge", "Bike Storage", "Shower Facilities", "Breakout Areas", "Kitchen Facilities", "Event Space", "High-Speed Internet", "Phone Booths", "Disabled Access"],
        images: [
            "https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=800",
            "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800",
            "https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?w=800",
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
            "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=800"
        ],
        units: [
            { id: "U-006", floor: 2, size: 1500, status: "Occupied", tenant: "Creative Studio Ltd", rent: 87000, leaseEnd: "2026-08-31" },
            { id: "U-007", floor: 2, size: 1600, status: "Occupied", tenant: "Tech Startup Inc", rent: 92800, leaseEnd: "2027-01-31" },
            { id: "U-008", floor: 4, size: 1800, status: "Occupied", tenant: "Design Agency", rent: 104400, leaseEnd: "2026-11-30" },
            { id: "U-009", floor: 4, size: 1400, status: "Occupied", tenant: "Marketing Co", rent: 81200, leaseEnd: "2027-04-30" }
        ],
        documents: [
            { name: "Floor Plans.pdf", type: "Floor Plan", size: "3.5 MB", date: "2024-01-20" },
            { name: "EPC Certificate.pdf", type: "Certificate", size: "0.9 MB", date: "2024-02-05" },
            { name: "Building Insurance.pdf", type: "Insurance", size: "2.1 MB", date: "2024-01-01" },
            { name: "Interior Photos.zip", type: "Photos", size: "12.8 MB", date: "2024-03-01" }
        ],
        marketing: {
            active: false,
            platforms: [],
            views: 0,
            enquiries: 0
        }
    },
    {
        id: "PROP-003",
        name: "King's Cross Central",
        address: "5 Pancras Square, King's Cross, London, N1C 4AG",
        location: "King's Cross",
        type: "Office Building",
        totalArea: 38000,
        floors: 10,
        builtYear: 2019,
        totalUnits: 20,
        occupiedUnits: 16,
        occupancyRate: 80,
        status: "Partially Occupied",
        pricePerSqFt: 62,
        annualRevenue: 2356,
        description: "Contemporary office space in the regenerated King's Cross district. Surrounded by cafes, restaurants, and green spaces. Excellent connectivity with King's Cross St Pancras station offering international, national, and underground services.",
        amenities: ["Reception", "Security", "Parking (150 spaces)", "Bike Storage", "Gym", "Cafe", "Roof Terrace", "Meeting Rooms", "High-Speed Internet", "Air Conditioning"],
        images: [
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800",
            "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800",
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800"
        ],
        units: [
            { id: "U-010", floor: 2, size: 1900, status: "Occupied", tenant: "Healthcare Services Ltd", rent: 117800, leaseEnd: "2026-10-31" },
            { id: "U-011", floor: 2, size: 2000, status: "Available", tenant: null, rent: 124000, leaseEnd: null },
            { id: "U-012", floor: 4, size: 2100, status: "Occupied", tenant: "Education Trust UK", rent: 130200, leaseEnd: "2027-02-28" },
            { id: "U-013", floor: 4, size: 1800, status: "Available", tenant: null, rent: 111600, leaseEnd: null },
            { id: "U-014", floor: 6, size: 2200, status: "Occupied", tenant: "Architecture Studio", rent: 136400, leaseEnd: "2026-12-31" }
        ],
        documents: [
            { name: "Floor Plans - Complete.pdf", type: "Floor Plan", size: "5.1 MB", date: "2024-01-10" },
            { name: "EPC Certificate.pdf", type: "Certificate", size: "1.3 MB", date: "2024-02-01" },
            { name: "Insurance Policy.pdf", type: "Insurance", size: "3.2 MB", date: "2024-01-01" },
            { name: "Building Photos.zip", type: "Photos", size: "18.5 MB", date: "2024-03-05" }
        ],
        marketing: {
            active: true,
            platforms: ["Rightmove", "Zoopla", "Company Website"],
            views: 890,
            enquiries: 32
        }
    },
    {
        id: "PROP-004",
        name: "The Shard Business Centre",
        address: "32 London Bridge Street, Southwark, London, SE1 9SG",
        location: "London Bridge",
        type: "Office Building",
        totalArea: 52000,
        floors: 15,
        builtYear: 2017,
        totalUnits: 28,
        occupiedUnits: 24,
        occupancyRate: 86,
        status: "Partially Occupied",
        pricePerSqFt: 72,
        annualRevenue: 3744,
        description: "Prestigious office building adjacent to The Shard with panoramic views of London. Premium specification throughout with marble reception, VIP lifts, and concierge services. Direct access to London Bridge station.",
        amenities: ["Concierge", "24/7 Security", "Valet Parking", "Bike Storage", "Executive Lounge", "Restaurant", "Conference Facilities", "High-Speed Internet", "Air Conditioning", "Disabled Access"],
        images: [
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800",
            "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800",
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800"
        ],
        units: [
            { id: "U-015", floor: 5, size: 2500, status: "Occupied", tenant: "Investment Bank", rent: 180000, leaseEnd: "2027-06-30" },
            { id: "U-016", floor: 5, size: 2300, status: "Occupied", tenant: "Law Firm LLP", rent: 165600, leaseEnd: "2026-09-30" },
            { id: "U-017", floor: 8, size: 2800, status: "Available", tenant: null, rent: 201600, leaseEnd: null },
            { id: "U-018", floor: 8, size: 2400, status: "Occupied", tenant: "Consulting Firm", rent: 172800, leaseEnd: "2027-03-31" }
        ],
        documents: [
            { name: "Floor Plans - All Levels.pdf", type: "Floor Plan", size: "6.8 MB", date: "2024-01-05" },
            { name: "EPC Certificate.pdf", type: "Certificate", size: "1.5 MB", date: "2024-02-01" },
            { name: "Building Insurance.pdf", type: "Insurance", size: "4.1 MB", date: "2024-01-01" },
            { name: "Professional Photos.zip", type: "Photos", size: "22.3 MB", date: "2024-03-01" }
        ],
        marketing: {
            active: true,
            platforms: ["Rightmove", "Zoopla", "OnTheMarket", "Company Website", "LinkedIn"],
            views: 1580,
            enquiries: 67
        }
    },
    {
        id: "PROP-005",
        name: "Holborn Gate",
        address: "26 Southampton Buildings, Holborn, London, WC2A 1PB",
        location: "Holborn",
        type: "Office Building",
        totalArea: 32000,
        floors: 8,
        builtYear: 2016,
        totalUnits: 16,
        occupiedUnits: 14,
        occupancyRate: 88,
        status: "Partially Occupied",
        pricePerSqFt: 68,
        annualRevenue: 2176,
        description: "Character office building in the heart of legal London. Period features combined with modern fit-out. Perfect for law firms, consultancies, and professional services. Close to Chancery Lane and Holborn stations.",
        amenities: ["Reception", "Security", "Parking (80 spaces)", "Bike Storage", "Meeting Rooms", "Kitchen Facilities", "High-Speed Internet", "Air Conditioning", "Disabled Access"],
        images: [
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800",
            "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800",
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800"
        ],
        units: [
            { id: "U-019", floor: 2, size: 2000, status: "Occupied", tenant: "Solicitors LLP", rent: 136000, leaseEnd: "2026-11-30" },
            { id: "U-020", floor: 2, size: 2100, status: "Available", tenant: null, rent: 142800, leaseEnd: null },
            { id: "U-021", floor: 4, size: 1900, status: "Occupied", tenant: "Barristers Chambers", rent: 129200, leaseEnd: "2027-01-31" },
            { id: "U-022", floor: 6, size: 2200, status: "Occupied", tenant: "Patent Attorneys", rent: 149600, leaseEnd: "2026-10-31" }
        ],
        documents: [
            { name: "Floor Plans.pdf", type: "Floor Plan", size: "4.5 MB", date: "2024-01-12" },
            { name: "EPC Certificate.pdf", type: "Certificate", size: "1.2 MB", date: "2024-02-01" },
            { name: "Insurance Policy.pdf", type: "Insurance", size: "2.9 MB", date: "2024-01-01" }
        ],
        marketing: {
            active: true,
            platforms: ["Rightmove", "Company Website"],
            views: 650,
            enquiries: 28
        }
    },
    {
        id: "PROP-006",
        name: "Paddington Basin",
        address: "3 Sheldon Square, Paddington, London, W2 6HY",
        location: "Paddington",
        type: "Office Building",
        totalArea: 41000,
        floors: 11,
        builtYear: 2021,
        totalUnits: 22,
        occupiedUnits: 18,
        occupancyRate: 82,
        status: "Partially Occupied",
        pricePerSqFt: 60,
        annualRevenue: 2460,
        description: "Brand new Grade A office building overlooking the canal basin. Sustainable design with BREEAM Excellent rating. Excellent transport links with Paddington station offering Elizabeth Line, Underground, and national rail services.",
        amenities: ["Reception", "24/7 Security", "Parking (120 spaces)", "Bike Storage", "Gym", "Cafe", "Roof Garden", "Meeting Rooms", "High-Speed Internet", "Air Conditioning", "EV Charging"],
        images: [
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800",
            "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800",
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800"
        ],
        units: [
            { id: "U-023", floor: 3, size: 1900, status: "Occupied", tenant: "Media Company", rent: 114000, leaseEnd: "2026-12-31" },
            { id: "U-024", floor: 3, size: 2000, status: "Available", tenant: null, rent: 120000, leaseEnd: null },
            { id: "U-025", floor: 5, size: 2100, status: "Occupied", tenant: "Tech Firm", rent: 126000, leaseEnd: "2027-03-31" },
            { id: "U-026", floor: 7, size: 1800, status: "Available", tenant: null, rent: 108000, leaseEnd: null }
        ],
        documents: [
            { name: "Floor Plans - Complete.pdf", type: "Floor Plan", size: "5.5 MB", date: "2024-01-08" },
            { name: "EPC Certificate - A Rated.pdf", type: "Certificate", size: "1.4 MB", date: "2024-02-01" },
            { name: "BREEAM Certificate.pdf", type: "Certificate", size: "2.1 MB", date: "2024-01-15" },
            { name: "Building Insurance.pdf", type: "Insurance", size: "3.5 MB", date: "2024-01-01" }
        ],
        marketing: {
            active: true,
            platforms: ["Rightmove", "Zoopla", "OnTheMarket", "Company Website"],
            views: 1120,
            enquiries: 48
        }
    },
    {
        id: "PROP-007",
        name: "Clerkenwell Workshops",
        address: "45 Clerkenwell Road, Clerkenwell, London, EC1M 5RS",
        location: "Clerkenwell",
        type: "Mixed Use",
        totalArea: 25000,
        floors: 5,
        builtYear: 2015,
        totalUnits: 15,
        occupiedUnits: 12,
        occupancyRate: 80,
        status: "Partially Occupied",
        pricePerSqFt: 55,
        annualRevenue: 1375,
        description: "Converted warehouse with original features and modern amenities. Mix of office and studio spaces perfect for creative industries. Located in trendy Clerkenwell with excellent bars, restaurants, and cultural venues nearby.",
        amenities: ["24/7 Access", "Security", "Bike Storage", "Shower Facilities", "Communal Kitchen", "Breakout Areas", "High-Speed Internet", "Loading Bay", "Disabled Access"],
        images: [
            "https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=800",
            "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800",
            "https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?w=800",
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
            "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=800"
        ],
        units: [
            { id: "U-027", floor: 1, size: 1600, status: "Occupied", tenant: "Design Studio", rent: 88000, leaseEnd: "2026-09-30" },
            { id: "U-028", floor: 1, size: 1700, status: "Available", tenant: null, rent: 93500, leaseEnd: null },
            { id: "U-029", floor: 3, size: 1800, status: "Occupied", tenant: "Photography Studio", rent: 99000, leaseEnd: "2027-02-28" },
            { id: "U-030", floor: 3, size: 1500, status: "Available", tenant: null, rent: 82500, leaseEnd: null }
        ],
        documents: [
            { name: "Floor Plans.pdf", type: "Floor Plan", size: "3.8 MB", date: "2024-01-18" },
            { name: "EPC Certificate.pdf", type: "Certificate", size: "1.0 MB", date: "2024-02-01" },
            { name: "Insurance Policy.pdf", type: "Insurance", size: "2.3 MB", date: "2024-01-01" }
        ],
        marketing: {
            active: true,
            platforms: ["Rightmove", "Zoopla", "Company Website"],
            views: 780,
            enquiries: 35
        }
    },
    {
        id: "PROP-008",
        name: "Greenwich Peninsula",
        address: "15 Millennium Way, Greenwich, London, SE10 0AX",
        location: "Greenwich",
        type: "Business Park",
        totalArea: 35000,
        floors: 4,
        builtYear: 2022,
        totalUnits: 20,
        occupiedUnits: 15,
        occupancyRate: 75,
        status: "Partially Occupied",
        pricePerSqFt: 48,
        annualRevenue: 1680,
        description: "Modern business park in the regenerated Greenwich Peninsula. Flexible floor plates suitable for various business types. Excellent transport links via North Greenwich Underground and Thames Clipper river bus services.",
        amenities: ["Reception", "Security", "Parking (250 spaces)", "Bike Storage", "Cafe", "Meeting Rooms", "High-Speed Internet", "Air Conditioning", "EV Charging", "Disabled Access"],
        images: [
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800",
            "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800",
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800"
        ],
        units: [
            { id: "U-031", floor: 1, size: 1800, status: "Occupied", tenant: "Logistics Company", rent: 86400, leaseEnd: "2026-10-31" },
            { id: "U-032", floor: 1, size: 1900, status: "Available", tenant: null, rent: 91200, leaseEnd: null },
            { id: "U-033", floor: 2, size: 2000, status: "Occupied", tenant: "Tech Startup", rent: 96000, leaseEnd: "2027-01-31" },
            { id: "U-034", floor: 3, size: 1700, status: "Available", tenant: null, rent: 81600, leaseEnd: null }
        ],
        documents: [
            { name: "Floor Plans - All Floors.pdf", type: "Floor Plan", size: "4.9 MB", date: "2024-01-22" },
            { name: "EPC Certificate.pdf", type: "Certificate", size: "1.3 MB", date: "2024-02-01" },
            { name: "Insurance Policy.pdf", type: "Insurance", size: "3.1 MB", date: "2024-01-01" }
        ],
        marketing: {
            active: true,
            platforms: ["Rightmove", "Zoopla", "Company Website"],
            views: 920,
            enquiries: 41
        }
    },
    {
        id: "PROP-009",
        name: "Stratford Olympic Park",
        address: "8 International Way, Stratford, London, E20 1DY",
        location: "Stratford",
        type: "Office Building",
        totalArea: 48000,
        floors: 13,
        builtYear: 2020,
        totalUnits: 26,
        occupiedUnits: 21,
        occupancyRate: 81,
        status: "Partially Occupied",
        pricePerSqFt: 52,
        annualRevenue: 2496,
        description: "Contemporary office building in the Olympic Park with views over Queen Elizabeth Olympic Park. Excellent value for money with high specification. Superb transport links with Stratford station offering Underground, Overground, DLR, and national rail services.",
        amenities: ["Reception", "24/7 Security", "Parking (180 spaces)", "Bike Storage", "Gym", "Cafe", "Meeting Rooms", "High-Speed Internet", "Air Conditioning", "Disabled Access"],
        images: [
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800",
            "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800",
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800"
        ],
        units: [
            { id: "U-035", floor: 4, size: 1900, status: "Occupied", tenant: "Software Company", rent: 98800, leaseEnd: "2026-11-30" },
            { id: "U-036", floor: 4, size: 2000, status: "Available", tenant: null, rent: 104000, leaseEnd: null },
            { id: "U-037", floor: 6, size: 2100, status: "Occupied", tenant: "Marketing Agency", rent: 109200, leaseEnd: "2027-04-30" },
            { id: "U-038", floor: 8, size: 1800, status: "Available", tenant: null, rent: 93600, leaseEnd: null }
        ],
        documents: [
            { name: "Floor Plans - Complete.pdf", type: "Floor Plan", size: "5.8 MB", date: "2024-01-14" },
            { name: "EPC Certificate.pdf", type: "Certificate", size: "1.4 MB", date: "2024-02-01" },
            { name: "Building Insurance.pdf", type: "Insurance", size: "3.7 MB", date: "2024-01-01" }
        ],
        marketing: {
            active: true,
            platforms: ["Rightmove", "Zoopla", "OnTheMarket", "Company Website"],
            views: 1050,
            enquiries: 44
        }
    },
    {
        id: "PROP-010",
        name: "Docklands Business Centre",
        address: "Marsh Wall, Canary Wharf, London, E14 9SH",
        location: "Canary Wharf",
        type: "Office Building",
        totalArea: 36000,
        floors: 9,
        builtYear: 2019,
        totalUnits: 19,
        occupiedUnits: 19,
        occupancyRate: 100,
        status: "Fully Let",
        pricePerSqFt: 63,
        annualRevenue: 2268,
        description: "Modern office building in Canary Wharf's secondary office district. More affordable than primary Canary Wharf locations while maintaining excellent specifications and transport links. Popular with growing financial services and professional services firms.",
        amenities: ["Reception", "Security", "Parking (140 spaces)", "Bike Storage", "Shower Facilities", "Cafe", "Meeting Rooms", "High-Speed Internet", "Air Conditioning", "Disabled Access"],
        images: [
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800",
            "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800",
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800"
        ],
        units: [
            { id: "U-039", floor: 2, size: 1900, status: "Occupied", tenant: "Insurance Brokers", rent: 119700, leaseEnd: "2026-12-31" },
            { id: "U-040", floor: 2, size: 2000, status: "Occupied", tenant: "Accountancy Firm", rent: 126000, leaseEnd: "2027-05-31" },
            { id: "U-041", floor: 5, size: 2100, status: "Occupied", tenant: "Wealth Management", rent: 132300, leaseEnd: "2026-09-30" },
            { id: "U-042", floor: 7, size: 1800, status: "Occupied", tenant: "Asset Management", rent: 113400, leaseEnd: "2027-02-28" }
        ],
        documents: [
            { name: "Floor Plans.pdf", type: "Floor Plan", size: "4.7 MB", date: "2024-01-16" },
            { name: "EPC Certificate.pdf", type: "Certificate", size: "1.2 MB", date: "2024-02-01" },
            { name: "Insurance Policy.pdf", type: "Insurance", size: "2.9 MB", date: "2024-01-01" }
        ],
        marketing: {
            active: false,
            platforms: [],
            views: 0,
            enquiries: 0
        }
    }
];

// Export for use in the application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = propertiesData;
}
