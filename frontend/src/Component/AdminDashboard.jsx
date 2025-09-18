import React, { useEffect, useState } from "react";
import {
  Users,
  UserPlus,
  Shield,
  User,
  Mail,
  Edit3,
  Trash2,
  Eye,
  MoreHorizontal,
  TrendingUp,
  Activity,
  Settings,
} from "lucide-react";
import Header from "./Header";
import GetAllUserService from "../Services/GetAllUserService";
import AddUserForm from "./AddUserForm";
import DisableUserService from "../Services/DisableUserService";

const AdminDashboard = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showActionMenu, setShowActionMenu] = useState(null);
  const [mockUsers, setMockusers] = useState([]);

  const user = { name: "Admin User", username: "admin" };
  const allUsers = mockUsers;
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddUserClick = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    fecthAllUser();
  };

  useEffect(() => {
    fecthAllUser();
  }, []);

  const fecthAllUser = () => {
    GetAllUserService().then((res) => {
      if (res) {
        setMockusers(res);
      }
    });
  };

  const deleteUser = async (userEmail) => {
    try {
      if (
        window.confirm(
          `Are you sure you want to disable user with email: ${userEmail}?`
        )
      ) {
        DisableUserService(userEmail).then((res)=>{

          fecthAllUser();
        })
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

 const handleCardAction = (action, userId, userEmail = null) => {
    const actionMessages = {
      edit: "Opening edit form",
      delete: "Deleting user",
    };

    console.log(`${actionMessages[action]} for user:`, userId);

    switch (action) {
      case "edit":
        console.log("Edit user logic here");
        break;
      case "delete":
        if (userEmail) {
          deleteUser(userEmail);
        } else {
          console.error("User email not provided for deletion");
        }
        break;
      default:
        break;
    }

    setShowActionMenu(null);
  };
  const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-gray-200 group">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
          {trend && (
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500 text-sm font-medium">
                {trend}
              </span>
            </div>
          )}
        </div>
        <div
          className={`p-3 rounded-full ${color
            .replace("text-", "bg-")
            .replace(
              "600",
              "100"
            )} group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
      </div>
    </div>
  );

  const UserCard = ({ user: cardUser }) => (
    <div
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2 relative group"
      onMouseEnter={() => setHoveredCard(cardUser.id)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      <div
        className={`absolute top-4 right-4 w-3 h-3 rounded-full ${
          cardUser.activeStaus == true ? "bg-green-400" : "bg-gray-300"
        } shadow-md`}
      ></div>

      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
          {cardUser.avatar}
        </div>
        <div className="ml-4 flex-1">
          <h3 className="font-bold text-gray-900 text-lg">
            {cardUser.firstName + " " + cardUser.lastName}
          </h3>
          <p className="text-gray-500 text-sm">@{cardUser.email}</p>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-600">
          <Mail className="w-4 h-4 mr-2" />
          <span className="text-sm truncate">{cardUser.email}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {cardUser.type === "admin" ? (
              <>
                <Shield className="w-4 h-4 mr-2 text-red-500" />
                <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                  Admin
                </span>
              </>
            ) : (
              <>
                <User className="w-4 h-4 mr-2 text-blue-500" />
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  User
                </span>
              </>
            )}
          </div>
          <span className="text-xs text-gray-500">{cardUser.lastActive}</span>
        </div>
      </div>

      {hoveredCard === cardUser.id && (
        <div className="absolute inset-0 bg-black bg-opacity-20 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white rounded-lg shadow-xl p-4 flex space-x-2">
            <button
              onClick={() => handleCardAction("edit", cardUser.id)}
              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title="Edit User"
            >
              <Edit3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleCardAction("delete", cardUser.id, cardUser.email)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete User"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Header title={"Admin Dashboard"} />
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-blue-100">
                Welcome back, {user?.name || user?.username}!
              </p>
              <p className="text-blue-200 text-sm">
                You have full administrative access to the system
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleAddUserClick}
                className="bg-white text-violet-600 border border-violet-600 px-6 py-3 rounded-lg flex items-center space-x-2 transition-all duration-300 hover:bg-violet-50 hover:scale-105"
              >
                Add New User
              </button>

              <AddUserForm isOpen={isFormOpen} onClose={handleCloseForm} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={allUsers.length}
            icon={Users}
            color="text-blue-600"
            trend="+12%"
          />
          <StatCard
            title="Admin Users"
            value={allUsers.filter((u) => u.type == "admin").length}
            icon={Shield}
            color="text-red-600"
            trend="+5%"
          />
          <StatCard
            title="Regular Users"
            value={allUsers.filter((u) => u.type == "user").length}
            icon={User}
            color="text-green-600"
            trend="+18%"
          />
          <StatCard
            title="Active Now"
            value={allUsers.filter((u) => u.status === "active").length}
            icon={Activity}
            color="text-purple-600"
            trend="+8%"
          />
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Users className="w-8 h-8 mr-3 text-blue-600" />
              All Users
            </h2>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search users..."
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group">
              <UserPlus className="w-8 h-8 text-blue-600 mr-3 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">Add New User</h4>
                <p className="text-gray-600 text-sm">
                  Create a new user account
                </p>
              </div>
            </button>
            <button className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group">
              <Settings className="w-8 h-8 text-green-600 mr-3 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">System Settings</h4>
                <p className="text-gray-600 text-sm">
                  Configure system preferences
                </p>
              </div>
            </button>
            <button className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group">
              <Activity className="w-8 h-8 text-purple-600 mr-3 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">View Reports</h4>
                <p className="text-gray-600 text-sm">Generate system reports</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
