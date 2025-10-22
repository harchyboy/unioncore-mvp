// Approval Analytics Components - Highcharts Integration
// Implements: Approval Timeline Trends & Approval by Role Distribution

(function() {
    'use strict';
    
    console.log('📊 Loading Approval Analytics...');

    // Sample Analytics Data
    const ANALYTICS_DATA = {
        timelineTrends: {
            categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
            approved: [12, 15, 18, 14, 20, 17],
            pending: [8, 6, 9, 11, 7, 10],
            rejected: [2, 3, 1, 4, 2, 3],
            avgApprovalTime: 2.3, // days
            fastestApproval: '4 hours',
            longestOutstanding: '12 days'
        },
        roleDistribution: [
            { role: 'Legal', count: 45, avgTime: 2.1, percentage: 26.5, color: '#3B82F6' },
            { role: 'Finance', count: 38, avgTime: 1.8, percentage: 22.4, color: '#10B981' },
            { role: 'Executive', count: 32, avgTime: 3.2, percentage: 18.8, color: '#8B5CF6' },
            { role: 'Risk', count: 28, avgTime: 2.5, percentage: 16.5, color: '#F59E0B' },
            { role: 'Operations', count: 18, avgTime: 1.5, percentage: 10.6, color: '#6B7280' },
            { role: 'Compliance', count: 9, avgTime: 2.8, percentage: 5.3, color: '#EC4899' }
        ]
    };

    // Initialize Approval Timeline Trends Chart
    function initTimelineTrendsChart() {
        const container = document.getElementById('approval-timeline-chart');
        if (!container) {
            console.warn('Timeline chart container not found');
            return;
        }

        const data = ANALYTICS_DATA.timelineTrends;

        Highcharts.chart('approval-timeline-chart', {
            chart: {
                type: 'area',
                backgroundColor: 'transparent',
                height: 320,
                spacing: [20, 20, 20, 20],
                style: {
                    fontFamily: 'Inter, sans-serif'
                }
            },
            title: {
                text: null
            },
            credits: {
                enabled: false
            },
            xAxis: {
                categories: data.categories,
                labels: {
                    style: {
                        color: '#6B7280',
                        fontSize: '12px'
                    }
                },
                lineColor: '#E5E7EB',
                tickColor: '#E5E7EB'
            },
            yAxis: {
                title: {
                    text: 'Number of Approvals',
                    style: {
                        color: '#6B7280',
                        fontSize: '12px'
                    }
                },
                labels: {
                    style: {
                        color: '#6B7280',
                        fontSize: '12px'
                    }
                },
                gridLineColor: '#F3F4F6'
            },
            tooltip: {
                shared: true,
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderColor: '#E5E7EB',
                borderRadius: 8,
                shadow: {
                    color: 'rgba(0, 0, 0, 0.1)',
                    offsetX: 0,
                    offsetY: 2,
                    opacity: 0.1,
                    width: 4
                },
                style: {
                    color: '#111827',
                    fontSize: '12px'
                },
                useHTML: true,
                formatter: function() {
                    let html = `<div style="padding: 8px;">
                        <div style="font-weight: 600; margin-bottom: 8px;">${this.x}</div>`;
                    
                    this.points.forEach(point => {
                        html += `<div style="display: flex; align-items: center; margin: 4px 0;">
                            <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background-color: ${point.color}; margin-right: 8px;"></span>
                            <span style="flex: 1;">${point.series.name}:</span>
                            <span style="font-weight: 600; margin-left: 8px;">${point.y}</span>
                        </div>`;
                    });
                    
                    html += `<div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #E5E7EB; color: #6B7280; font-size: 11px;">
                        Avg approval time: ${data.avgApprovalTime} days
                    </div></div>`;
                    
                    return html;
                }
            },
            plotOptions: {
                area: {
                    stacking: 'normal',
                    lineWidth: 2,
                    marker: {
                        enabled: false,
                        states: {
                            hover: {
                                enabled: true,
                                radius: 4
                            }
                        }
                    },
                    states: {
                        hover: {
                            lineWidthPlus: 0
                        }
                    }
                },
                series: {
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function() {
                                console.log(`📈 Clicked: ${this.series.name} - ${this.category}`);
                                showNotification(
                                    'Filter Applied',
                                    `Showing ${this.series.name.toLowerCase()} approvals for ${this.category}`,
                                    'info'
                                );
                            }
                        }
                    }
                }
            },
            legend: {
                align: 'center',
                verticalAlign: 'bottom',
                layout: 'horizontal',
                itemStyle: {
                    color: '#374151',
                    fontSize: '12px',
                    fontWeight: '500'
                },
                itemHoverStyle: {
                    color: '#111827'
                },
                symbolRadius: 6,
                symbolHeight: 10,
                symbolWidth: 10
            },
            series: [
                {
                    name: 'Approved',
                    data: data.approved,
                    color: '#10B981',
                    fillColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, 'rgba(16, 185, 129, 0.3)'],
                            [1, 'rgba(16, 185, 129, 0.05)']
                        ]
                    }
                },
                {
                    name: 'Pending',
                    data: data.pending,
                    color: '#F59E0B',
                    fillColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, 'rgba(245, 158, 11, 0.3)'],
                            [1, 'rgba(245, 158, 11, 0.05)']
                        ]
                    }
                },
                {
                    name: 'Rejected',
                    data: data.rejected,
                    color: '#EF4444',
                    fillColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, 'rgba(239, 68, 68, 0.3)'],
                            [1, 'rgba(239, 68, 68, 0.05)']
                        ]
                    }
                }
            ]
        });

        // Add insights section
        updateTimelineInsights(data);
        
        console.log('✅ Timeline Trends Chart initialized');
    }

    // Update timeline insights
    function updateTimelineInsights(data) {
        const insightsContainer = document.querySelector('#approval-timeline-chart').closest('.bg-white').querySelector('.grid');
        if (!insightsContainer) return;

        insightsContainer.innerHTML = `
            <div class="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <p class="text-xs text-green-600 font-medium mb-1">Avg Approval Duration</p>
                <p class="text-2xl font-bold text-green-700">${data.avgApprovalTime}</p>
                <p class="text-xs text-green-600">days</p>
            </div>
            <div class="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p class="text-xs text-blue-600 font-medium mb-1">Fastest Approval</p>
                <p class="text-2xl font-bold text-blue-700">${data.fastestApproval}</p>
                <p class="text-xs text-blue-600">this period</p>
            </div>
            <div class="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                <p class="text-xs text-orange-600 font-medium mb-1">Longest Outstanding</p>
                <p class="text-2xl font-bold text-orange-700">${data.longestOutstanding}</p>
                <p class="text-xs text-orange-600">and counting</p>
            </div>
        `;
    }

    // Initialize Approval by Role Distribution Chart
    function initRoleDistributionChart() {
        const container = document.getElementById('approval-role-chart');
        if (!container) {
            console.warn('Role chart container not found');
            return;
        }

        const data = ANALYTICS_DATA.roleDistribution;
        const chartData = data.map(item => ({
            name: item.role,
            y: item.count,
            percentage: item.percentage,
            avgTime: item.avgTime,
            color: item.color
        }));

        Highcharts.chart('approval-role-chart', {
            chart: {
                type: 'pie',
                backgroundColor: 'transparent',
                height: 320,
                spacing: [20, 20, 20, 20],
                style: {
                    fontFamily: 'Inter, sans-serif'
                }
            },
            title: {
                text: null
            },
            credits: {
                enabled: false
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderColor: '#E5E7EB',
                borderRadius: 8,
                shadow: {
                    color: 'rgba(0, 0, 0, 0.1)',
                    offsetX: 0,
                    offsetY: 2,
                    opacity: 0.1,
                    width: 4
                },
                style: {
                    color: '#111827',
                    fontSize: '12px'
                },
                useHTML: true,
                formatter: function() {
                    return `<div style="padding: 8px;">
                        <div style="font-weight: 600; margin-bottom: 8px; color: ${this.color};">${this.point.name}</div>
                        <div style="margin: 4px 0;">
                            <span style="color: #6B7280;">Approvals:</span>
                            <span style="font-weight: 600; margin-left: 8px;">${this.point.y}</span>
                        </div>
                        <div style="margin: 4px 0;">
                            <span style="color: #6B7280;">Percentage:</span>
                            <span style="font-weight: 600; margin-left: 8px;">${this.point.percentage.toFixed(1)}%</span>
                        </div>
                        <div style="margin: 4px 0;">
                            <span style="color: #6B7280;">Avg Time:</span>
                            <span style="font-weight: 600; margin-left: 8px;">${this.point.avgTime} days</span>
                        </div>
                    </div>`;
                }
            },
            plotOptions: {
                pie: {
                    innerSize: '60%',
                    depth: 45,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}: {point.percentage:.1f}%',
                        style: {
                            fontSize: '12px',
                            fontWeight: '500',
                            color: '#374151',
                            textOutline: 'none'
                        },
                        distance: 10
                    },
                    showInLegend: false,
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function() {
                                console.log(`🔍 Clicked role: ${this.name}`);
                                showNotification(
                                    'Filter Applied',
                                    `Showing approvals for ${this.name} role`,
                                    'info'
                                );
                            }
                        }
                    },
                    states: {
                        hover: {
                            brightness: 0.1
                        }
                    }
                }
            },
            series: [{
                name: 'Approvals',
                data: chartData
            }]
        });

        // Add role stats section
        updateRoleStats(data);

        console.log('✅ Role Distribution Chart initialized');
    }

    // Update role statistics
    function updateRoleStats(data) {
        const statsContainer = document.querySelector('#approval-role-chart').closest('.bg-white').querySelector('.space-y-3');
        if (!statsContainer) return;

        // Sort by count and take top 3
        const top3 = [...data].sort((a, b) => b.count - a.count).slice(0, 3);

        let html = '<div class="space-y-3">';
        top3.forEach((role, index) => {
            html += `
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div class="flex items-center space-x-3">
                        <div class="flex items-center justify-center w-8 h-8 rounded-full" style="background-color: ${role.color}20;">
                            <span class="text-sm font-bold" style="color: ${role.color};">#${index + 1}</span>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-gray-900">${role.role}</p>
                            <p class="text-xs text-gray-500">${role.count} approvals</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="text-sm font-bold text-gray-900">${role.avgTime}d</p>
                        <p class="text-xs text-gray-500">avg time</p>
                    </div>
                </div>
            `;
        });
        html += '</div>';

        statsContainer.innerHTML = html;
    }

    // Notification helper
    function showNotification(title, message, type = 'info') {
        const colors = {
            'success': { bg: 'bg-green-100', border: 'border-green-500', text: 'text-green-800', icon: 'fa-check-circle' },
            'warning': { bg: 'bg-yellow-100', border: 'border-yellow-500', text: 'text-yellow-800', icon: 'fa-exclamation-triangle' },
            'error': { bg: 'bg-red-100', border: 'border-red-500', text: 'text-red-800', icon: 'fa-times-circle' },
            'info': { bg: 'bg-blue-100', border: 'border-blue-500', text: 'text-blue-800', icon: 'fa-info-circle' }
        };
        
        const style = colors[type] || colors['info'];
        
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 ${style.bg} border-l-4 ${style.border} ${style.text} p-4 rounded-lg shadow-lg z-50 max-w-md`;
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
        
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    // Initialize all charts when page becomes visible
    function initializeAnalytics() {
        const approvalsPage = document.getElementById('approval-requests-page');
        if (!approvalsPage) {
            setTimeout(initializeAnalytics, 500);
            return;
        }

        if (approvalsPage.classList.contains('hidden')) {
            setTimeout(initializeAnalytics, 500);
            return;
        }

        console.log('📊 Initializing Approval Analytics...');
        
        // Wait a bit for DOM to be ready
        setTimeout(() => {
            initTimelineTrendsChart();
            initRoleDistributionChart();
        }, 500);

        console.log('✅ Approval Analytics initialized');
    }

    // Watch for page visibility changes
    function setupPageObserver() {
        const targetPage = document.getElementById('approval-requests-page');
        if (!targetPage) {
            setTimeout(setupPageObserver, 1000);
            return;
        }

        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const page = document.getElementById('approval-requests-page');
                    if (page && !page.classList.contains('hidden')) {
                        setTimeout(initializeAnalytics, 300);
                    }
                }
            });
        });

        observer.observe(targetPage, { attributes: true });

        // Also try immediate initialization if page is already visible
        if (!targetPage.classList.contains('hidden')) {
            setTimeout(initializeAnalytics, 300);
        }
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupPageObserver);
    } else {
        setupPageObserver();
    }

    // Also listen for hash changes
    window.addEventListener('hashchange', function() {
        if (window.location.hash === '#/approval-requests') {
            setTimeout(initializeAnalytics, 300);
        }
    });

    console.log('✅ Approval Analytics Script loaded and ready');

})();
