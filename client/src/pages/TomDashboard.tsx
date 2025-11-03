import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Building2,
  Users,
  TrendingUp,
  TrendingDown,
  Plus,
  Calendar,
  Phone,
  Mail,
  MapPin,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  Flame,
  Award,
  MessageSquare,
  Search,
  Filter,
  MoreVertical,
  Bell,
  Settings,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Dummy data for the dashboard
const portfolioData = {
  totalProperties: 42,
  occupiedUnits: 38,
  availableUnits: 4,
  occupancyRate: 90.5,
  monthlyRevenue: 2400000,
  revenueChange: 8.2,
  pendingViewings: 12,
};

const topProperties = [
  {
    id: 1,
    name: "Canary Wharf Tower",
    occupancy: 98,
    revenue: 450000,
    badge: "🔥",
  },
  {
    id: 2,
    name: "Shoreditch Hub",
    occupancy: 95,
    revenue: 380000,
    badge: "⭐",
  },
  {
    id: 3,
    name: "King's Cross Central",
    occupancy: 92,
    revenue: 340000,
    badge: "📈",
  },
  {
    id: 4,
    name: "Liverpool Street",
    occupancy: 88,
    revenue: 295000,
    badge: "⭐",
  },
  { id: 5, name: "Old Street", occupancy: 85, revenue: 250000, badge: "📈" },
];

const propertyAlerts = [
  {
    id: 1,
    type: "warning",
    property: "Bishopsgate Plaza",
    message: "Low occupancy (68%)",
    severity: "medium",
  },
  {
    id: 2,
    type: "info",
    property: "The Shard Suite",
    message: "Lease expiring in 45 days",
    severity: "low",
  },
  {
    id: 3,
    type: "success",
    property: "Tech Hub London",
    message: "High performer - upsell opportunity",
    severity: "low",
  },
];

const recentLeads = [
  {
    id: 1,
    company: "TechVenture Ltd",
    contact: "Sarah Chen - CEO",
    source: "Website",
    bantScore: 95,
    grade: "A",
    budget: "£150K",
    timeline: "2-4 weeks",
    status: "new",
    time: "2 min ago",
  },
  {
    id: 2,
    company: "GreenSpace Solutions",
    contact: "Marcus Wong",
    source: "Broker",
    bantScore: 88,
    grade: "A",
    budget: "£120K",
    timeline: "1 month",
    status: "viewing",
    time: "15 min ago",
  },
  {
    id: 3,
    company: "MediaHub Agency",
    contact: "Lisa Martinez",
    source: "Direct",
    bantScore: 75,
    grade: "B",
    budget: "£85K",
    timeline: "2-3 months",
    status: "qualified",
    time: "1 hour ago",
  },
];

const leadSourceData = [
  { source: "Website", count: 52, percentage: 52, conversion: 42 },
  { source: "Brokers", count: 28, percentage: 28, conversion: 58 },
  { source: "Direct", count: 15, percentage: 15, conversion: 35 },
  { source: "Events", count: 5, percentage: 5, conversion: 28 },
];

const brokerData = [
  {
    id: 1,
    name: "David Brown",
    referrals: 3,
    score: 95,
    revenue: 320000,
    conversion: 73,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    referrals: 2,
    score: 88,
    revenue: 265000,
    conversion: 67,
  },
  {
    id: 3,
    name: "Mike Rodriguez",
    referrals: 1,
    score: 82,
    revenue: 198000,
    conversion: 60,
  },
];

const commissionAlerts = [
  {
    id: 1,
    broker: "David Brown",
    deal: "Canary Wharf deal",
    amount: 18500,
    status: "pending",
  },
  {
    id: 2,
    broker: "Sarah Johnson",
    deal: "Shoreditch lease",
    amount: 12750,
    status: "pending",
  },
  {
    id: 3,
    broker: "Mike Rodriguez",
    deal: "King's Cross",
    amount: 14000,
    status: "pending",
  },
];

const pipelineData = {
  new: 100,
  qualified: 78,
  matched: 45,
  viewing: 32,
  proposal: 18,
};

export default function TomDashboard() {
  const [selectedView, setSelectedView] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold">UNION Core</h1>
                <p className="text-sm text-gray-500">Portfolio & Marketing</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search properties, leads, brokers..."
                className="pl-10 w-80"
              />
            </div>

            {/* Notifications */}
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                8
              </span>
            </Button>

            {/* Settings */}
            <Button variant="outline" size="icon">
              <Settings className="h-5 w-5" />
            </Button>

            {/* Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                    T
                  </div>
                  <span className="font-medium">Tom</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Quick Actions Bar */}
        <div className="border-t bg-gray-50 px-6 py-3 flex items-center gap-3">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Lead
          </Button>
          <Button variant="outline" className="gap-2">
            <Building2 className="h-4 w-4" />
            Update Property
          </Button>
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Schedule Viewing
          </Button>
          <Button variant="outline" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Contact Broker
          </Button>
        </div>
      </header>

      {/* Main Content - 3 Column Layout */}
      <main className="p-6">
        <div className="grid grid-cols-12 gap-6">
          {/* LEFT COLUMN - Property Portfolio */}
          <div className="col-span-3 space-y-6">
            {/* Portfolio Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Portfolio Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Total Properties</p>
                    <p className="text-2xl font-bold">
                      {portfolioData.totalProperties}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Occupied</p>
                    <p className="text-2xl font-bold text-green-600">
                      {portfolioData.occupiedUnits}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Available</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {portfolioData.availableUnits}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Occupancy</p>
                    <div className="flex items-center gap-1">
                      <p className="text-2xl font-bold">
                        {portfolioData.occupancyRate}%
                      </p>
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-500">Monthly Revenue</p>
                    <Badge
                      variant="outline"
                      className="text-green-600 border-green-600"
                    >
                      +{portfolioData.revenueChange}%
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold">
                    £{(portfolioData.monthlyRevenue / 1000000).toFixed(1)}M
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-500 mb-2">Occupancy Rate</p>
                  <Progress
                    value={portfolioData.occupancyRate}
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Top Performing Properties */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Top Performing</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-3">
                    {topProperties.map((property, index) => (
                      <div
                        key={property.id}
                        className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{property.badge}</span>
                            <span className="font-medium text-sm">
                              {property.name}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            #{index + 1}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">
                            Occupancy: {property.occupancy}%
                          </span>
                          <span className="font-semibold">
                            £{(property.revenue / 1000).toFixed(0)}K
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Property Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Property Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {propertyAlerts.map(alert => (
                    <div
                      key={alert.id}
                      className={`p-3 rounded-lg border ${
                        alert.severity === "high"
                          ? "border-red-200 bg-red-50"
                          : alert.severity === "medium"
                            ? "border-amber-200 bg-amber-50"
                            : "border-blue-200 bg-blue-50"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {alert.severity === "high" && (
                          <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
                        )}
                        {alert.severity === "medium" && (
                          <Clock className="h-4 w-4 text-amber-600 mt-0.5" />
                        )}
                        {alert.severity === "low" && (
                          <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-sm">
                            {alert.property}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            {alert.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CENTER COLUMN - Lead Management */}
          <div className="col-span-6 space-y-6">
            {/* Lead Pipeline Funnel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Lead Pipeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Funnel Visualization */}
                  <div className="relative">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-16 bg-blue-600 rounded flex items-center justify-center text-white font-bold">
                        {pipelineData.new} New
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div
                        className="flex-1 h-14 bg-blue-500 rounded flex items-center justify-center text-white font-semibold"
                        style={{ width: "78%" }}
                      >
                        {pipelineData.qualified} Qualified
                      </div>
                      <span className="text-sm text-gray-500">78%</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div
                        className="flex-1 h-12 bg-blue-400 rounded flex items-center justify-center text-white font-semibold"
                        style={{ width: "45%" }}
                      >
                        {pipelineData.matched} Matched
                      </div>
                      <span className="text-sm text-gray-500">58%</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div
                        className="flex-1 h-10 bg-blue-300 rounded flex items-center justify-center text-white font-semibold"
                        style={{ width: "32%" }}
                      >
                        {pipelineData.viewing} Viewing
                      </div>
                      <span className="text-sm text-gray-500">71%</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div
                        className="flex-1 h-8 bg-green-500 rounded flex items-center justify-center text-white font-semibold"
                        style={{ width: "18%" }}
                      >
                        {pipelineData.proposal} Proposal
                      </div>
                      <span className="text-sm text-gray-500">56%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Lead Activity */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    Recent Lead Activity
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {recentLeads.map(lead => (
                      <div
                        key={lead.id}
                        className="p-4 border rounded-lg hover:shadow-md transition cursor-pointer"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold">{lead.company}</h4>
                              <Badge
                                variant={
                                  lead.grade === "A" ? "default" : "secondary"
                                }
                                className={
                                  lead.grade === "A"
                                    ? "bg-green-600"
                                    : lead.grade === "B"
                                      ? "bg-blue-600"
                                      : "bg-gray-600"
                                }
                              >
                                Grade {lead.grade}
                              </Badge>
                              <Badge variant="outline">{lead.source}</Badge>
                            </div>
                            <p className="text-sm text-gray-600">
                              {lead.contact}
                            </p>
                          </div>
                          <span className="text-xs text-gray-500">
                            {lead.time}
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-3">
                          <div>
                            <p className="text-xs text-gray-500">BANT Score</p>
                            <div className="flex items-center gap-1">
                              <p className="text-lg font-bold">
                                {lead.bantScore}
                              </p>
                              <Progress
                                value={lead.bantScore}
                                className="h-1 flex-1"
                              />
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Budget</p>
                            <p className="text-sm font-semibold">
                              {lead.budget}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Timeline</p>
                            <p className="text-sm font-semibold">
                              {lead.timeline}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button size="sm" className="flex-1">
                            {lead.status === "new"
                              ? "Qualify Now"
                              : "View Details"}
                          </Button>
                          <Button size="sm" variant="outline">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Mail className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="sm" variant="outline">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>
                                Match Properties
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                Schedule Viewing
                              </DropdownMenuItem>
                              <DropdownMenuItem>Assign to Max</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                Disqualify
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Lead Source Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Lead Source Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leadSourceData.map(source => (
                    <div key={source.source} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{source.source}</span>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-gray-600">
                            {source.count} leads
                          </span>
                          <span className="text-green-600 font-semibold">
                            {source.conversion}% conv.
                          </span>
                        </div>
                      </div>
                      <Progress value={source.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT COLUMN - Broker Management */}
          <div className="col-span-3 space-y-6">
            {/* Active Brokers Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Broker Network
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Total Partners</p>
                    <p className="text-2xl font-bold">24</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Active</p>
                    <p className="text-2xl font-bold text-green-600">18</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">This Month</p>
                    <p className="text-2xl font-bold text-blue-600">12</p>
                    <p className="text-xs text-gray-500">referrals</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Conversion</p>
                    <p className="text-2xl font-bold">58%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Broker Performance Rankings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {brokerData.map((broker, index) => (
                    <div
                      key={broker.id}
                      className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {index === 0 && <span className="text-lg">🥇</span>}
                          {index === 1 && <span className="text-lg">🥈</span>}
                          {index === 2 && <span className="text-lg">🥉</span>}
                          <div>
                            <p className="font-semibold text-sm">
                              {broker.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {broker.referrals} referrals this week
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className="text-green-600 border-green-600"
                        >
                          {broker.score}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs mt-2">
                        <span className="text-gray-600">
                          {broker.conversion}% conversion
                        </span>
                        <span className="font-semibold">
                          £{(broker.revenue / 1000).toFixed(0)}K
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <Button size="sm" variant="outline" className="flex-1">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          Contact
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Commission Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Commission Alerts
                  </span>
                  <Badge variant="destructive">3 Pending</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm font-medium mb-1">Total Pending</p>
                    <p className="text-2xl font-bold">£45,250</p>
                  </div>

                  <ScrollArea className="h-[200px]">
                    <div className="space-y-3">
                      {commissionAlerts.map(commission => (
                        <div
                          key={commission.id}
                          className="p-3 border rounded-lg"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-semibold text-sm">
                                {commission.broker}
                              </p>
                              <p className="text-xs text-gray-600">
                                {commission.deal}
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              className="text-amber-600 border-amber-600"
                            >
                              Pending
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-lg font-bold">
                              £{commission.amount.toLocaleString()}
                            </p>
                            <div className="flex items-center gap-1">
                              <Button size="sm" variant="outline">
                                Review
                              </Button>
                              <Button size="sm">Approve</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
