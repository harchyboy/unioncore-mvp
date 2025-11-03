import React, { useState } from "react";
import { Search, Plus, FileText, Bell, ChevronDown, Check } from "lucide-react";
import { USERS } from "../../lib/constants";

const Header: React.FC = () => {
  const [currentUser, setCurrentUser] = useState(USERS.DANI);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const handleUserSwitch = (userId: keyof typeof USERS) => {
    setCurrentUser(USERS[userId]);
    setIsUserDropdownOpen(false);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-slate rounded-lg flex items-center justify-center">
              <div className="w-5 h-5 bg-white rounded-sm"></div>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate tracking-tight">
                UNION Core Plus
              </h1>
              <p className="text-xs text-concrete">Built for the Best</p>
            </div>
          </div>
        </div>

        {/* Global Search */}
        <div className="flex-1 max-w-2xl mx-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-concrete" />
            </div>
            <input
              type="text"
              className="w-full pl-12 pr-4 py-3 bg-stone border-0 rounded-lg text-slate placeholder-concrete focus:outline-none focus:ring-2 focus:ring-slate"
              placeholder="Search deals, properties, documents, tasks, vendors..."
            />
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {/* Quick Actions */}
          <div className="flex items-center space-x-2">
            <button
              className="p-2 text-concrete hover:text-slate transition-colors"
              title="Add Property"
            >
              <Plus className="h-4 w-4" />
            </button>
            <button
              className="p-2 text-concrete hover:text-slate transition-colors"
              title="Create Proposal"
            >
              <FileText className="h-4 w-4" />
            </button>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button className="p-2 text-concrete hover:text-slate transition-colors">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
          </div>

          {/* User Profile Dropdown */}
          <div className="relative">
            <div
              className="flex items-center space-x-3 cursor-pointer hover:bg-stone hover:bg-opacity-30 rounded-lg px-3 py-2 transition-colors"
              onClick={toggleUserDropdown}
            >
              <div className="text-right">
                <p className="text-sm font-medium text-slate">
                  {currentUser.name}
                </p>
                <p className="text-xs text-concrete">{currentUser.role}</p>
              </div>
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <ChevronDown className="h-3 w-3 text-concrete ml-1" />
            </div>

            {/* User Dropdown Menu */}
            {isUserDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-stone rounded-lg shadow-xl z-50">
                <div className="p-2">
                  <div className="px-3 py-2 border-b border-stone mb-2">
                    <p className="text-xs font-semibold text-concrete uppercase">
                      Switch Portfolio Manager
                    </p>
                  </div>

                  {Object.entries(USERS).map(([key, user]) => (
                    <div
                      key={key}
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-stone hover:bg-opacity-30 cursor-pointer transition-colors"
                      onClick={() =>
                        handleUserSwitch(key as keyof typeof USERS)
                      }
                    >
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate">
                          {user.name}
                        </p>
                        <p className="text-xs text-concrete">{user.role}</p>
                      </div>
                      {currentUser.id === user.id && (
                        <Check className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
