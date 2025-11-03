import React from "react";
import { Clock, User, Building, FileText } from "lucide-react";

interface ActivityItem {
  id: string;
  type: "lead" | "property" | "deal" | "document";
  title: string;
  description: string;
  timestamp: string;
  user: string;
}

const RecentActivity: React.FC = () => {
  const activities: ActivityItem[] = [
    {
      id: "1",
      type: "lead",
      title: "New lead qualified",
      description: "TechCorp Ltd - 5,000 sq ft requirement in Canary Wharf",
      timestamp: "2 hours ago",
      user: "Dani",
    },
    {
      id: "2",
      type: "property",
      title: "Property viewing scheduled",
      description: "25 Bank Street - Viewing with Goldman Sachs on Friday",
      timestamp: "4 hours ago",
      user: "Max",
    },
    {
      id: "3",
      type: "deal",
      title: "Deal approved",
      description: "Barclays HQ - £2.4M annual rent approved by board",
      timestamp: "6 hours ago",
      user: "Tom",
    },
    {
      id: "4",
      type: "document",
      title: "Contract signed",
      description: "Microsoft UK - 10-year lease agreement executed",
      timestamp: "1 day ago",
      user: "Dani",
    },
    {
      id: "5",
      type: "lead",
      title: "Lead updated",
      description: "Amazon Web Services - Requirements updated to 15,000 sq ft",
      timestamp: "1 day ago",
      user: "Max",
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "lead":
        return <User className="h-4 w-4 text-blue-600" />;
      case "property":
        return <Building className="h-4 w-4 text-green-600" />;
      case "deal":
        return <FileText className="h-4 w-4 text-purple-600" />;
      case "document":
        return <FileText className="h-4 w-4 text-orange-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getActivityBgColor = (type: string) => {
    switch (type) {
      case "lead":
        return "bg-blue-100";
      case "property":
        return "bg-green-100";
      case "deal":
        return "bg-purple-100";
      case "document":
        return "bg-orange-100";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <section className="mb-8">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-stone">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate">Recent Activity</h2>
          <button className="text-sm text-blue-600 hover:text-blue-700">
            View all
          </button>
        </div>

        <div className="space-y-4">
          {activities.map(activity => (
            <div key={activity.id} className="flex items-start space-x-4">
              <div
                className={`w-10 h-10 ${getActivityBgColor(activity.type)} rounded-lg flex items-center justify-center flex-shrink-0`}
              >
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-slate truncate">
                    {activity.title}
                  </h3>
                  <span className="text-xs text-concrete flex-shrink-0 ml-2">
                    {activity.timestamp}
                  </span>
                </div>
                <p className="text-sm text-concrete mt-1">
                  {activity.description}
                </p>
                <div className="flex items-center mt-2">
                  <span className="text-xs text-concrete">
                    by {activity.user}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentActivity;
