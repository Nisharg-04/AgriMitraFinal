import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { User, LogOut, Settings, LayoutDashboard } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import { use } from "react";

const UserDropdown = ({ isOpen, onClose }) => {
  const { logout, user } = useAuth();
  const [isFarmer, setIsFarmer] = React.useState(false);
  useEffect(() => {
    if (user?.role === "farmer") {
      setIsFarmer(true);
    } else {
      setIsFarmer(false);
    }
  }, [user]);

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-60 bg-white rounded-lg shadow-xl z-50">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <User className="w-8 h-8 text-gray-400" />
          )}
          <div>
            <p className="font-medium text-gray-900">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>
      </div>

      <div className="p-2">
        <Link
          to="/profile"
          onClick={onClose}
          className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
        >
          <Settings className="w-5 h-5" />
          <span>My Profile</span>
        </Link>
        {isFarmer && (
          <Link
            to="/farmer/dashboard"
            onClick={onClose}
            className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
        )}
        <Link
          to="/chats"
          onClick={onClose}
          className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
        >
          <User className="w-5 h-5" />
          <span>Chats</span>
        </Link>

        <button
          onClick={() => {
            logout();
            onClose();
          }}
          className="w-full flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-md"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default UserDropdown;
