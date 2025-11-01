// UNION Issue Tracking - Tickets Data
// 40 sample tickets with realistic UK tenant data

const ticketsData = [
    // CRITICAL TICKETS (3)
    {
        id: 'TICK-001',
        status: 'Open',
        priority: 'Critical',
        category: 'Maintenance',
        subject: 'Water leak in ceiling - Unit 5A',
        description: 'Urgent: Water is actively leaking from the ceiling in Unit 5A. The leak appears to be coming from the floor above and is damaging office equipment and documents. Immediate attention required to prevent further damage.',
        reporter: {
            name: 'Sarah Mitchell',
            company: 'TechVentures Ltd',
            email: 'sarah.mitchell@techventures.co.uk',
            phone: '+44 20 7946 0958'
        },
        property: 'Canary Wharf Tower',
        propertyId: 'PROP-001',
        unit: 'Unit 5A',
        assignedTo: 'Dani',
        created: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        lastUpdated: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        slaDeadline: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
        attachments: [
            { name: 'ceiling_leak_photo1.jpg', size: '2.3 MB', type: 'image' },
            { name: 'ceiling_leak_photo2.jpg', size: '1.8 MB', type: 'image' }
        ],
        timeline: [
            { action: 'Ticket created', user: 'Sarah Mitchell', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), type: 'created' },
            { action: 'Assigned to Dani', user: 'System', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), type: 'assigned' },
            { action: 'Status changed to Open', user: 'Dani', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), type: 'status' },
            { action: 'Comment added', user: 'Dani', timestamp: new Date(Date.now() - 30 * 60 * 1000), type: 'comment', content: 'Emergency plumber has been dispatched. ETA 45 minutes.' }
        ],
        communications: [
            { user: 'Sarah Mitchell', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), message: 'Water is leaking heavily from the ceiling. We need immediate help!', internal: false },
            { user: 'Dani', timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000), message: 'Thank you for reporting this. I\'ve contacted our emergency plumber and they\'re on their way.', internal: false },
            { user: 'Dani', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), message: 'Internal note: Leak appears to be from Unit 6A bathroom. Contacted tenant above.', internal: true },
            { user: 'Sarah Mitchell', timestamp: new Date(Date.now() - 30 * 60 * 1000), message: 'Thank you. We\'ve moved equipment away from the leak area.', internal: false }
        ]
    },
    {
        id: 'TICK-015',
        status: 'In Progress',
        priority: 'Critical',
        category: 'Maintenance',
        subject: 'No heating in office - Unit 2B',
        description: 'The heating system has completely stopped working in Unit 2B. The office temperature has dropped to 12°C and staff are unable to work comfortably. This is affecting productivity and employee wellbeing.',
        reporter: {
            name: 'James Wilson',
            company: 'Digital Innovations Group',
            email: 'j.wilson@diginnovations.co.uk',
            phone: '+44 20 7946 0742'
        },
        property: 'Shoreditch Tech Hub',
        propertyId: 'PROP-002',
        unit: 'Unit 2B',
        assignedTo: 'Dani',
        created: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
        lastUpdated: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
        slaDeadline: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours from now
        attachments: [
            { name: 'thermostat_reading.jpg', size: '1.2 MB', type: 'image' }
        ],
        timeline: [
            { action: 'Ticket created', user: 'James Wilson', timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), type: 'created' },
            { action: 'Assigned to Dani', user: 'System', timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), type: 'assigned' },
            { action: 'Status changed to In Progress', user: 'Dani', timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), type: 'status' },
            { action: 'Comment added', user: 'Dani', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), type: 'comment', content: 'HVAC engineer is on site diagnosing the issue.' }
        ],
        communications: [
            { user: 'James Wilson', timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), message: 'Our heating has stopped working. It\'s very cold in the office.', internal: false },
            { user: 'Dani', timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), message: 'I\'ve contacted our HVAC contractor. They\'ll be there within 2 hours.', internal: false },
            { user: 'Dani', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), message: 'Engineer has arrived and is checking the boiler system.', internal: false },
            { user: 'James Wilson', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), message: 'Thanks for the quick response. Staff are wearing coats for now.', internal: false }
        ]
    },
    {
        id: 'TICK-028',
        status: 'Resolved',
        priority: 'Critical',
        category: 'Maintenance',
        subject: 'Fire alarm malfunction',
        description: 'The fire alarm system in the building is malfunctioning, causing false alarms every 30 minutes. This is disrupting all tenants and creating safety concerns. The system needs immediate inspection and repair.',
        reporter: {
            name: 'Emma Thompson',
            company: 'Apex Consulting',
            email: 'e.thompson@apexconsulting.co.uk',
            phone: '+44 20 7946 0823'
        },
        property: 'King\'s Cross Business Park',
        propertyId: 'PROP-003',
        unit: 'Building-wide',
        assignedTo: 'Dani',
        created: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        slaDeadline: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // Met SLA
        resolvedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        resolvedBy: 'Dani',
        resolutionTime: 2.0, // days
        resolutionNotes: 'Fire alarm system had a faulty sensor on the 3rd floor. Sensor was replaced and full system test completed. No further false alarms reported.',
        rootCause: 'Faulty sensor',
        actionsTaken: ['Identified faulty sensor', 'Replaced sensor', 'Tested entire system', 'Verified with fire safety officer'],
        satisfactionRating: 5,
        tenantFeedback: 'Excellent response time. The issue was resolved quickly and professionally.',
        attachments: [
            { name: 'fire_alarm_report.pdf', size: '450 KB', type: 'pdf' }
        ],
        timeline: [
            { action: 'Ticket created', user: 'Emma Thompson', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), type: 'created' },
            { action: 'Assigned to Dani', user: 'System', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), type: 'assigned' },
            { action: 'Status changed to In Progress', user: 'Dani', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), type: 'status' },
            { action: 'Comment added', user: 'Dani', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), type: 'comment', content: 'Fire safety engineer identified faulty sensor on 3rd floor.' },
            { action: 'Status changed to Resolved', user: 'Dani', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), type: 'status' },
            { action: 'Resolution notes added', user: 'Dani', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), type: 'resolution' }
        ],
        communications: [
            { user: 'Emma Thompson', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), message: 'The fire alarm keeps going off. This is the 5th false alarm today!', internal: false },
            { user: 'Dani', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), message: 'I apologize for the disruption. Fire safety engineer is being dispatched immediately.', internal: false },
            { user: 'Dani', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), message: 'The engineer has identified a faulty sensor. It will be replaced today.', internal: false },
            { user: 'Emma Thompson', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), message: 'Thank you! No more false alarms since the repair.', internal: false }
        ]
    },

    // HIGH PRIORITY TICKETS (8)
    {
        id: 'TICK-003',
        status: 'Open',
        priority: 'High',
        category: 'Access',
        subject: 'Access card not working',
        description: 'My access card stopped working this morning. I cannot enter the building or access the car park. I need a replacement card urgently as I have client meetings scheduled today.',
        reporter: {
            name: 'Michael Brown',
            company: 'Sterling Financial Services',
            email: 'm.brown@sterlingfs.co.uk',
            phone: '+44 20 7946 0654'
        },
        property: 'London Bridge Plaza',
        propertyId: 'PROP-004',
        unit: 'Unit 4C',
        assignedTo: 'Tom',
        created: new Date(Date.now() - 4 * 60 * 60 * 1000),
        lastUpdated: new Date(Date.now() - 3 * 60 * 60 * 1000),
        slaDeadline: new Date(Date.now() + 20 * 60 * 60 * 1000),
        attachments: [],
        timeline: [
            { action: 'Ticket created', user: 'Michael Brown', timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), type: 'created' },
            { action: 'Assigned to Tom', user: 'System', timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), type: 'assigned' }
        ],
        communications: [
            { user: 'Michael Brown', timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), message: 'My access card isn\'t working. Can you help?', internal: false },
            { user: 'Tom', timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), message: 'I\'ll have a new card programmed for you. You can collect it from reception in 30 minutes.', internal: false }
        ]
    },
    {
        id: 'TICK-007',
        status: 'In Progress',
        priority: 'High',
        category: 'Technical',
        subject: 'Internet connection down',
        description: 'Our internet connection has been down for the past hour. All staff are unable to access cloud services, email, or conduct video calls. This is severely impacting our business operations.',
        reporter: {
            name: 'Rachel Green',
            company: 'CloudTech Solutions',
            email: 'r.green@cloudtech.co.uk',
            phone: '+44 20 7946 0789'
        },
        property: 'Holborn House',
        propertyId: 'PROP-005',
        unit: 'Unit 3A',
        assignedTo: 'Max',
        created: new Date(Date.now() - 2 * 60 * 60 * 1000),
        lastUpdated: new Date(Date.now() - 30 * 60 * 1000),
        slaDeadline: new Date(Date.now() + 22 * 60 * 60 * 1000),
        attachments: [],
        timeline: [
            { action: 'Ticket created', user: 'Rachel Green', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), type: 'created' },
            { action: 'Assigned to Max', user: 'System', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), type: 'assigned' },
            { action: 'Status changed to In Progress', user: 'Max', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), type: 'status' }
        ],
        communications: [
            { user: 'Rachel Green', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), message: 'Our internet is completely down. This is urgent!', internal: false },
            { user: 'Max', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), message: 'I\'ve contacted the ISP. They\'re investigating a possible fiber cut in the area.', internal: false },
            { user: 'Max', timestamp: new Date(Date.now() - 30 * 60 * 1000), message: 'ISP has identified the issue. Estimated resolution time: 2 hours.', internal: false }
        ]
    },
    {
        id: 'TICK-012',
        status: 'In Progress',
        priority: 'High',
        category: 'Maintenance',
        subject: 'Broken window in meeting room',
        description: 'The large window in our main meeting room has a significant crack. It appears to have been caused by thermal stress. The window needs to be replaced urgently for safety and security reasons.',
        reporter: {
            name: 'David Chen',
            company: 'Innovate Design Studio',
            email: 'd.chen@innovatedesign.co.uk',
            phone: '+44 20 7946 0891'
        },
        property: 'Paddington Central',
        propertyId: 'PROP-006',
        unit: 'Unit 2D',
        assignedTo: 'Dani',
        created: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        lastUpdated: new Date(Date.now() - 12 * 60 * 60 * 1000),
        slaDeadline: new Date(Date.now() + 12 * 60 * 60 * 1000),
        attachments: [
            { name: 'cracked_window.jpg', size: '3.1 MB', type: 'image' }
        ],
        timeline: [
            { action: 'Ticket created', user: 'David Chen', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), type: 'created' },
            { action: 'Assigned to Dani', user: 'System', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), type: 'assigned' },
            { action: 'Status changed to In Progress', user: 'Dani', timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), type: 'status' }
        ],
        communications: [
            { user: 'David Chen', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), message: 'We have a large crack in our meeting room window. See attached photo.', internal: false },
            { user: 'Dani', timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000), message: 'Thank you for reporting. I\'ve contacted our glazier for an urgent assessment.', internal: false },
            { user: 'Dani', timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), message: 'Glazier will be on site tomorrow morning to replace the window.', internal: false }
        ]
    },
    {
        id: 'TICK-019',
        status: 'Resolved',
        priority: 'High',
        category: 'Maintenance',
        subject: 'Elevator out of service',
        description: 'The main elevator is out of service. This is causing significant inconvenience for staff and visitors, especially those with mobility issues. Our office is on the 5th floor.',
        reporter: {
            name: 'Sophie Anderson',
            company: 'Creative Media Partners',
            email: 's.anderson@creativemedia.co.uk',
            phone: '+44 20 7946 0923'
        },
        property: 'Clerkenwell Studios',
        propertyId: 'PROP-007',
        unit: 'Unit 5B',
        assignedTo: 'Dani',
        created: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        slaDeadline: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        resolvedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        resolvedBy: 'Dani',
        resolutionTime: 1.0,
        resolutionNotes: 'Elevator motor was replaced and full safety inspection completed. Elevator is now back in service and operating normally.',
        rootCause: 'Motor failure',
        actionsTaken: ['Emergency elevator technician called', 'Motor replaced', 'Safety inspection completed', 'Tested all floors'],
        satisfactionRating: 4,
        tenantFeedback: 'Good resolution but would have appreciated more frequent updates.',
        attachments: [],
        timeline: [
            { action: 'Ticket created', user: 'Sophie Anderson', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), type: 'created' },
            { action: 'Assigned to Dani', user: 'System', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), type: 'assigned' },
            { action: 'Status changed to In Progress', user: 'Dani', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), type: 'status' },
            { action: 'Status changed to Resolved', user: 'Dani', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), type: 'status' }
        ],
        communications: [
            { user: 'Sophie Anderson', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), message: 'The elevator isn\'t working. This is a major issue for our team.', internal: false },
            { user: 'Dani', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), message: 'Emergency elevator technician has been called. They should be here within 4 hours.', internal: false },
            { user: 'Dani', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), message: 'Elevator has been repaired and is back in service.', internal: false }
        ]
    },
    {
        id: 'TICK-023',
        status: 'Open',
        priority: 'High',
        category: 'Other',
        subject: 'Parking space dispute',
        description: 'There is an ongoing dispute about parking space allocation. Another tenant is regularly parking in our assigned spaces, causing inconvenience for our staff. This needs to be resolved urgently.',
        reporter: {
            name: 'Thomas Wright',
            company: 'Legal Associates LLP',
            email: 't.wright@legalassociates.co.uk',
            phone: '+44 20 7946 0756'
        },
        property: 'Greenwich Business Centre',
        propertyId: 'PROP-008',
        unit: 'Unit 1A',
        assignedTo: 'Tom',
        created: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        slaDeadline: new Date(Date.now() + 21 * 60 * 60 * 1000),
        attachments: [
            { name: 'parking_violation.jpg', size: '2.8 MB', type: 'image' }
        ],
        timeline: [
            { action: 'Ticket created', user: 'Thomas Wright', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), type: 'created' },
            { action: 'Assigned to Tom', user: 'System', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), type: 'assigned' }
        ],
        communications: [
            { user: 'Thomas Wright', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), message: 'Another tenant keeps using our parking spaces. This has happened 3 times this week.', internal: false },
            { user: 'Tom', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), message: 'I\'m investigating this. I\'ll speak with the other tenant and send a reminder about parking allocations.', internal: false }
        ]
    },
    {
        id: 'TICK-031',
        status: 'In Progress',
        priority: 'High',
        category: 'Billing',
        subject: 'Invoice discrepancy',
        description: 'There is a significant discrepancy in our latest invoice. We\'ve been charged for services we didn\'t request and the square footage calculation appears incorrect. Please review and correct the invoice.',
        reporter: {
            name: 'Jennifer Clarke',
            company: 'Quantum Analytics',
            email: 'j.clarke@quantumanalytics.co.uk',
            phone: '+44 20 7946 0834'
        },
        property: 'Stratford Office Park',
        propertyId: 'PROP-009',
        unit: 'Unit 3C',
        assignedTo: 'Max',
        created: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        slaDeadline: new Date(Date.now() + 19 * 60 * 60 * 1000),
        attachments: [
            { name: 'invoice_march_2024.pdf', size: '156 KB', type: 'pdf' }
        ],
        timeline: [
            { action: 'Ticket created', user: 'Jennifer Clarke', timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), type: 'created' },
            { action: 'Assigned to Max', user: 'System', timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), type: 'assigned' },
            { action: 'Status changed to In Progress', user: 'Max', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), type: 'status' }
        ],
        communications: [
            { user: 'Jennifer Clarke', timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), message: 'Our invoice has several errors. Can you please review?', internal: false },
            { user: 'Max', timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), message: 'I\'m reviewing the invoice with our finance team. I\'ll get back to you within 48 hours.', internal: false },
            { user: 'Max', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), message: 'I\'ve identified the errors. A corrected invoice will be issued tomorrow.', internal: false }
        ]
    },
    {
        id: 'TICK-034',
        status: 'Open',
        priority: 'High',
        category: 'Technical',
        subject: 'Security camera not recording',
        description: 'The security camera covering our entrance has stopped recording. This is a security concern as we need footage for our insurance and safety requirements. The camera appears to be powered but not functioning.',
        reporter: {
            name: 'Robert Taylor',
            company: 'Secure Systems Ltd',
            email: 'r.taylor@securesystems.co.uk',
            phone: '+44 20 7946 0967'
        },
        property: 'Canary Wharf Tower',
        propertyId: 'PROP-001',
        unit: 'Unit 7B',
        assignedTo: 'Dani',
        created: new Date(Date.now() - 6 * 60 * 60 * 1000),
        lastUpdated: new Date(Date.now() - 5 * 60 * 60 * 1000),
        slaDeadline: new Date(Date.now() + 18 * 60 * 60 * 1000),
        attachments: [],
        timeline: [
            { action: 'Ticket created', user: 'Robert Taylor', timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), type: 'created' },
            { action: 'Assigned to Dani', user: 'System', timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), type: 'assigned' }
        ],
        communications: [
            { user: 'Robert Taylor', timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), message: 'Security camera at our entrance isn\'t recording. We need this fixed ASAP.', internal: false },
            { user: 'Dani', timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), message: 'I\'ve contacted our security systems contractor. They\'ll be on site this afternoon.', internal: false }
        ]
    },
    {
        id: 'TICK-037',
        status: 'Resolved',
        priority: 'High',
        category: 'Services',
        subject: 'Mail delivery issues',
        description: 'We haven\'t received our mail for the past 3 days. Important documents and client correspondence are missing. Please investigate the mail delivery process urgently.',
        reporter: {
            name: 'Laura Martinez',
            company: 'Premier Consulting Group',
            email: 'l.martinez@premierconsulting.co.uk',
            phone: '+44 20 7946 0845'
        },
        property: 'Shoreditch Tech Hub',
        propertyId: 'PROP-002',
        unit: 'Unit 4A',
        assignedTo: 'Tom',
        created: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        slaDeadline: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        resolvedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        resolvedBy: 'Tom',
        resolutionTime: 2.0,
        resolutionNotes: 'Mail was being delivered to the wrong unit due to a labeling error. All missing mail has been located and delivered. Unit labels have been corrected.',
        rootCause: 'Incorrect unit labeling',
        actionsTaken: ['Located missing mail', 'Corrected unit labels', 'Updated mail room procedures', 'Briefed reception staff'],
        satisfactionRating: 5,
        tenantFeedback: 'Thank you for finding our mail and fixing the issue quickly.',
        attachments: [],
        timeline: [
            { action: 'Ticket created', user: 'Laura Martinez', timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), type: 'created' },
            { action: 'Assigned to Tom', user: 'System', timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), type: 'assigned' },
            { action: 'Status changed to In Progress', user: 'Tom', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), type: 'status' },
            { action: 'Status changed to Resolved', user: 'Tom', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), type: 'status' }
        ],
        communications: [
            { user: 'Laura Martinez', timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), message: 'We haven\'t received any mail for 3 days. This is very concerning.', internal: false },
            { user: 'Tom', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), message: 'I\'m investigating with our mail room. I\'ll update you shortly.', internal: false },
            { user: 'Tom', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), message: 'Found the issue - mail was going to Unit 4B by mistake. All your mail is ready for collection.', internal: false }
        ]
    }

    // Note: Due to character limits, I'll create a function to generate the remaining 29 tickets (Medium and Low priority)
    // This will be handled in the JavaScript file with a generation function
];

// Generate remaining Medium and Low priority tickets
function generateRemainingTickets() {
    const mediumTickets = [
        { id: 'TICK-002', priority: 'Medium', category: 'Maintenance', subject: 'Flickering lights in corridor', property: 'Canary Wharf Tower', unit: 'Floor 3', assignedTo: 'Dani', status: 'Open' },
        { id: 'TICK-004', priority: 'Medium', category: 'Services', subject: 'Coffee machine not working', property: 'Shoreditch Tech Hub', unit: 'Kitchen', assignedTo: 'Tom', status: 'In Progress' },
        { id: 'TICK-005', priority: 'Medium', category: 'Maintenance', subject: 'Toilet leak in restroom', property: 'King\'s Cross Business Park', unit: '2nd Floor WC', assignedTo: 'Dani', status: 'Resolved' },
        { id: 'TICK-006', priority: 'Medium', category: 'Access', subject: 'Visitor pass request', property: 'London Bridge Plaza', unit: 'Reception', assignedTo: 'Tom', status: 'Open' },
        { id: 'TICK-008', priority: 'Medium', category: 'Maintenance', subject: 'Air conditioning too cold', property: 'Holborn House', unit: 'Unit 2A', assignedTo: 'Dani', status: 'In Progress' },
        { id: 'TICK-009', priority: 'Medium', category: 'Services', subject: 'Printer paper refill needed', property: 'Paddington Central', unit: 'Print Room', assignedTo: 'Tom', status: 'Resolved' },
        { id: 'TICK-010', priority: 'Medium', category: 'Technical', subject: 'Wi-Fi signal weak in corner office', property: 'Clerkenwell Studios', unit: 'Unit 6A', assignedTo: 'Max', status: 'Open' },
        { id: 'TICK-011', priority: 'Medium', category: 'Maintenance', subject: 'Carpet stain removal needed', property: 'Greenwich Business Centre', unit: 'Unit 2B', assignedTo: 'Dani', status: 'In Progress' },
        { id: 'TICK-013', priority: 'Medium', category: 'Access', subject: 'Additional access cards needed', property: 'Stratford Office Park', unit: 'Unit 4D', assignedTo: 'Tom', status: 'Resolved' },
        { id: 'TICK-014', priority: 'Medium', category: 'Maintenance', subject: 'Window cleaning overdue', property: 'Canary Wharf Tower', unit: 'Unit 8A', assignedTo: 'Dani', status: 'Open' },
        { id: 'TICK-016', priority: 'Medium', category: 'Services', subject: 'Reception desk unstaffed', property: 'Shoreditch Tech Hub', unit: 'Reception', assignedTo: 'Tom', status: 'In Progress' },
        { id: 'TICK-017', priority: 'Medium', category: 'Maintenance', subject: 'Door handle loose', property: 'King\'s Cross Business Park', unit: 'Unit 5C', assignedTo: 'Dani', status: 'Resolved' },
        { id: 'TICK-018', priority: 'Medium', category: 'Technical', subject: 'Phone line static noise', property: 'London Bridge Plaza', unit: 'Unit 3B', assignedTo: 'Max', status: 'Open' },
        { id: 'TICK-020', priority: 'Medium', category: 'Services', subject: 'Recycling bins full', property: 'Holborn House', unit: 'Common Area', assignedTo: 'Tom', status: 'In Progress' },
        { id: 'TICK-021', priority: 'Medium', category: 'Maintenance', subject: 'Paint touch-up needed', property: 'Paddington Central', unit: 'Unit 1B', assignedTo: 'Dani', status: 'Resolved' }
    ];

    const lowTickets = [
        { id: 'TICK-022', priority: 'Low', category: 'Other', subject: 'Request for additional storage', property: 'Clerkenwell Studios', unit: 'Unit 4B', assignedTo: 'Tom', status: 'Open' },
        { id: 'TICK-024', priority: 'Low', category: 'Services', subject: 'Meeting room booking inquiry', property: 'Greenwich Business Centre', unit: 'Reception', assignedTo: 'Tom', status: 'Resolved' },
        { id: 'TICK-025', priority: 'Low', category: 'Other', subject: 'Building directory update', property: 'Stratford Office Park', unit: 'Lobby', assignedTo: 'Tom', status: 'Open' },
        { id: 'TICK-026', priority: 'Low', category: 'Services', subject: 'Request for bike rack', property: 'Canary Wharf Tower', unit: 'Car Park', assignedTo: 'Dani', status: 'In Progress' },
        { id: 'TICK-027', priority: 'Low', category: 'Other', subject: 'Noise complaint - construction', property: 'Shoreditch Tech Hub', unit: 'Unit 5A', assignedTo: 'Tom', status: 'Resolved' },
        { id: 'TICK-029', priority: 'Low', category: 'Services', subject: 'Request for water cooler', property: 'King\'s Cross Business Park', unit: 'Unit 6B', assignedTo: 'Tom', status: 'Open' },
        { id: 'TICK-030', priority: 'Low', category: 'Other', subject: 'Suggestion for building improvements', property: 'London Bridge Plaza', unit: 'Unit 2A', assignedTo: 'Max', status: 'In Progress' },
        { id: 'TICK-032', priority: 'Low', category: 'Services', subject: 'Request for additional cleaning', property: 'Holborn House', unit: 'Unit 4C', assignedTo: 'Dani', status: 'Resolved' },
        { id: 'TICK-033', priority: 'Low', category: 'Other', subject: 'Information about building amenities', property: 'Paddington Central', unit: 'Reception', assignedTo: 'Tom', status: 'Open' },
        { id: 'TICK-035', priority: 'Low', category: 'Services', subject: 'Request for plant maintenance', property: 'Clerkenwell Studios', unit: 'Common Area', assignedTo: 'Tom', status: 'In Progress' },
        { id: 'TICK-036', priority: 'Low', category: 'Other', subject: 'Question about lease terms', property: 'Greenwich Business Centre', unit: 'Unit 3A', assignedTo: 'Max', status: 'Resolved' },
        { id: 'TICK-038', priority: 'Low', category: 'Services', subject: 'Request for additional signage', property: 'Stratford Office Park', unit: 'Building-wide', assignedTo: 'Tom', status: 'Open' },
        { id: 'TICK-039', priority: 'Low', category: 'Other', subject: 'Feedback on building services', property: 'Canary Wharf Tower', unit: 'Unit 9A', assignedTo: 'Max', status: 'In Progress' },
        { id: 'TICK-040', priority: 'Low', category: 'Services', subject: 'Request for event space booking', property: 'Shoreditch Tech Hub', unit: 'Event Space', assignedTo: 'Tom', status: 'Resolved' }
    ];

    // Add basic data to medium and low tickets
    const allTickets = [...ticketsData];
    
    [...mediumTickets, ...lowTickets].forEach((ticket, index) => {
        const daysAgo = Math.floor(Math.random() * 15) + 1;
        const hoursAgo = Math.floor(Math.random() * 24);
        
        allTickets.push({
            ...ticket,
            description: `This is a ${ticket.priority.toLowerCase()} priority ${ticket.category.toLowerCase()} issue that needs attention.`,
            reporter: {
                name: ['John Smith', 'Mary Johnson', 'Peter Williams', 'Lisa Davis'][Math.floor(Math.random() * 4)],
                company: ['Tech Solutions Ltd', 'Business Partners', 'Creative Agency', 'Finance Group'][Math.floor(Math.random() * 4)],
                email: 'contact@company.co.uk',
                phone: '+44 20 7946 0' + (700 + index)
            },
            propertyId: 'PROP-00' + (Math.floor(Math.random() * 9) + 1),
            created: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000 - hoursAgo * 60 * 60 * 1000),
            lastUpdated: new Date(Date.now() - (daysAgo - 1) * 24 * 60 * 60 * 1000),
            slaDeadline: ticket.priority === 'Medium' ? 
                new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) : 
                new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
            attachments: [],
            timeline: [
                { action: 'Ticket created', user: ticket.reporter?.name || 'User', timestamp: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000), type: 'created' },
                { action: 'Assigned to ' + ticket.assignedTo, user: 'System', timestamp: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000), type: 'assigned' }
            ],
            communications: [
                { user: ticket.reporter?.name || 'User', timestamp: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000), message: 'Reporting this issue for your attention.', internal: false },
                { user: ticket.assignedTo, timestamp: new Date(Date.now() - (daysAgo - 1) * 24 * 60 * 60 * 1000), message: 'Thank you for reporting. We\'ll look into this.', internal: false }
            ]
        });

        // Add resolution data for resolved tickets
        if (ticket.status === 'Resolved') {
            const lastTicket = allTickets[allTickets.length - 1];
            lastTicket.resolvedDate = new Date(Date.now() - (daysAgo - 2) * 24 * 60 * 60 * 1000);
            lastTicket.resolvedBy = ticket.assignedTo;
            lastTicket.resolutionTime = 2.0;
            lastTicket.resolutionNotes = 'Issue has been resolved successfully.';
            lastTicket.rootCause = 'Standard maintenance';
            lastTicket.actionsTaken = ['Investigated issue', 'Applied fix', 'Verified resolution'];
            lastTicket.satisfactionRating = Math.floor(Math.random() * 2) + 4; // 4 or 5
            lastTicket.tenantFeedback = 'Thank you for resolving this quickly.';
        }
    });

    return allTickets;
}

// Export the complete tickets data
const allTicketsData = generateRemainingTickets();

console.log('Tickets data loaded: ' + allTicketsData.length + ' tickets');
