import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  FileText, 
  BarChart3, 
  Edit3, 
  Eye,
  Bell,
  Shield,
  Calendar,
  Clock,
  Mail,
  Phone,
  MapPin,
  Activity,
  Star,
  Award,
  TrendingUp,
  Download,
  Upload,
  RefreshCw
} from 'lucide-react';
import Header from './Header';
import { useAuth } from '../Context/AuthContext';
import FeatureCard from './FeatureCard';


const UserDashboard = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const { user } = useAuth();
  const recentActivity = [
    { id: 1, action: 'Updated profile picture', time: '2 hours ago', icon: User, color: 'text-blue-600' },
    { id: 2, action: 'Generated monthly report', time: '1 day ago', icon: FileText, color: 'text-green-600' },
    { id: 3, action: 'Changed password', time: '3 days ago', icon: Shield, color: 'text-orange-600' },
    { id: 4, action: 'Updated contact information', time: '1 week ago', icon: Mail, color: 'text-purple-600' }
  ];

  const StatCard = ({ title, value, subtitle, icon: Icon, color, trend, onClick }) => (
    <div 
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 border border-gray-100 hover:border-transparent transform hover:-translate-y-1 relative group cursor-pointer"
      style={{
        boxShadow: hoveredCard === title 
          ? '0 20px 40px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(59, 130, 246, 0.5), 0 0 15px rgba(59, 130, 246, 0.2)' 
          : undefined
      }}
      onMouseEnter={() => setHoveredCard(title)}
      onMouseLeave={() => setHoveredCard(null)}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-full ${color.replace('text-', 'bg-').replace('600', '100')} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        {trend && (
          <div className="flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500 text-sm font-medium">{trend}</span>
          </div>
        )}
      </div>
      <h3 className="font-bold text-gray-900 text-lg mb-1">{title}</h3>
      <p className={`text-2xl font-bold ${color} mb-1`}>{value}</p>
      <p className="text-gray-600 text-sm">{subtitle}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title={"User Dashboard"}/>
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-2xl font-bold backdrop-blur-sm">
                <User className="w-4 h-4 text-purple" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.firstName  +" "+ user.lastName } !</h1>
                <p className="text-indigo-100 text-lg">Your personal dashboard awaits</p>
                <div className="flex items-center space-x-4 mt-2 text-indigo-200">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Last login: {user.lastLogin}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Member since: {user.joinDate}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-indigo-200">Profile Completion</div>
                <div className="flex items-center space-x-2">
                  <div className="w-24 h-2 bg-white bg-opacity-20 rounded-full">
                    <div 
                      className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-1000"
                      style={{ width: `${user.profileCompletion}%` }}
                    ></div>
                  </div>
                  <span className="font-bold text-lg">{user.profileCompletion}%</span>
                </div>
              </div>
              <button className="bg-white bg-opacity-20 hover:bg-opacity-30 p-3 rounded-full transition-all duration-300 hover:scale-105">
                <Bell className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-8">
        {/* Account Information Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <User className="w-8 h-8 mr-3 text-indigo-600" />
            Account Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
              <User className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="font-semibold text-gray-900">
                  {user?.firstName  +" "+ user.lastName || 'Not provided'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
              <Mail className="w-6 h-6 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold text-gray-900">
                  {user?.email || 'Not provided'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
              <Phone className="w-6 h-6 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-semibold text-gray-900">
                  {user?.phone || 'Not provided'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
              <MapPin className="w-6 h-6 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-semibold text-gray-900">
                  {user?.location || user?.address || 'Not provided'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Profile Views"
            value="1,234"
            subtitle="This month"
            icon={Eye}
            color="text-blue-600"
            trend="+12%"
          />
          <StatCard
            title="Reports Generated"
            value="48"
            subtitle="Total reports"
            icon={FileText}
            color="text-green-600"
            trend="+8%"
          />
          <StatCard
            title="Active Sessions"
            value="3"
            subtitle="Current sessions"
            icon={Activity}
            color="text-orange-600"
          />
          <StatCard
            title="Account Score"
            value="95"
            subtitle="Security rating"
            icon={Award}
            color="text-purple-600"
            trend="+2%"
          />
        </div>

        {/* Features Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="Profile Management"
              description="View and update your profile information, change your avatar, and manage your personal details"
              icon={User}
              color="text-blue-600"
              action={() => console.log('Profile Management clicked')}
            />
            <FeatureCard
              title="Reports & Analytics"
              description="Access your personal reports, view analytics, and download detailed insights about your account"
              icon={BarChart3}
              color="text-green-600"
              action={() => console.log('Reports clicked')}
            />
            <FeatureCard
              title="Account Settings"
              description="Configure your account preferences, security settings, and notification preferences"
              icon={Settings}
              color="text-purple-600"
              action={() => console.log('Settings clicked')}
            />
            <FeatureCard
              title="Document Center"
              description="Upload, manage, and organize your important documents in a secure environment"
              icon={FileText}
              color="text-orange-600"
              action={() => console.log('Documents clicked')}
              comingSoon={true}
            />
            <FeatureCard
              title="Activity Monitor"
              description="Track your account activity, login history, and security events in real-time"
              icon={Activity}
              color="text-red-600"
              action={() => console.log('Activity clicked')}
            />
            <FeatureCard
              title="Support Center"
              description="Get help with your account, submit tickets, and access our knowledge base"
              icon={Star}
              color="text-indigo-600"
              action={() => console.log('Support clicked')}
            />
          </div>
        </div>

     
      </div>
    </div>
  );
};

export default UserDashboard;