import { Users, Package, TrendingUp, DollarSign, UserCheck, ShoppingCart, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const salesData = [
  { month: "Jan", sales: 45000 },
  { month: "Feb", sales: 52000 },
  { month: "Mar", sales: 48000 },
  { month: "Apr", sales: 61000 },
  { month: "May", sales: 55000 },
  { month: "Jun", sales: 67000 },
];

const userGrowthData = [
  { month: "Jan", users: 120 },
  { month: "Feb", users: 145 },
  { month: "Mar", users: 168 },
  { month: "Apr", users: 192 },
  { month: "May", users: 215 },
  { month: "Jun", users: 243 },
];

const recentUsers = [
  { name: "Alice Kamau", role: "Farmer", joined: "2 days ago", status: "Active", avatar: "👩🏾‍🌾" },
  { name: "Robert Otieno", role: "Buyer", joined: "3 days ago", status: "Active", avatar: "👨🏿‍💼" },
  { name: "Jane Wangari", role: "Farmer", joined: "5 days ago", status: "Pending", avatar: "👩🏾" },
  { name: "Peter Kariuki", role: "Buyer", joined: "1 week ago", status: "Active", avatar: "👨🏾‍💼" },
];

export default function AdminDashboard() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-emerald-200">Platform overview and management</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl p-6 text-white">
          <div className="flex items-start justify-between mb-4">
            <Users className="w-8 h-8 opacity-80" />
            <span className="text-xs bg-emerald-800 px-2 py-1 rounded">+12%</span>
          </div>
          <p className="text-sm opacity-80 mb-1">Total Users</p>
          <p className="text-4xl font-bold">243</p>
        </div>
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <div className="flex items-start justify-between mb-4">
            <Package className="w-8 h-8 opacity-80" />
            <span className="text-xs bg-blue-800 px-2 py-1 rounded">+8%</span>
          </div>
          <p className="text-sm opacity-80 mb-1">Total Products</p>
          <p className="text-4xl font-bold">1,847</p>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white">
          <div className="flex items-start justify-between mb-4">
            <ShoppingCart className="w-8 h-8 opacity-80" />
            <span className="text-xs bg-purple-800 px-2 py-1 rounded">+15%</span>
          </div>
          <p className="text-sm opacity-80 mb-1">Total Orders</p>
          <p className="text-4xl font-bold">892</p>
        </div>
        <div className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-xl p-6 text-white">
          <div className="flex items-start justify-between mb-4">
            <DollarSign className="w-8 h-8 opacity-80" />
            <span className="text-xs bg-amber-800 px-2 py-1 rounded">+22%</span>
          </div>
          <p className="text-sm opacity-80 mb-1">Revenue (Month)</p>
          <p className="text-4xl font-bold">KES 67K</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Sales Chart */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h3 className="text-white font-bold text-lg mb-4">Monthly Sales</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis dataKey="month" stroke="#a7f3d0" />
              <YAxis stroke="#a7f3d0" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }}
                labelStyle={{ color: "#fff" }}
              />
              <Bar dataKey="sales" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* User Growth Chart */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h3 className="text-white font-bold text-lg mb-4">User Growth</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis dataKey="month" stroke="#a7f3d0" />
              <YAxis stroke="#a7f3d0" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }}
                labelStyle={{ color: "#fff" }}
              />
              <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} dot={{ fill: "#3b82f6", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Users & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold text-lg">Recent Users</h3>
            <button className="text-emerald-400 text-sm hover:text-emerald-300">View All</button>
          </div>
          <div className="space-y-3">
            {recentUsers.map((user, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{user.avatar}</div>
                  <div>
                    <p className="text-white font-medium">{user.name}</p>
                    <p className="text-emerald-300 text-sm">{user.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      user.status === "Active"
                        ? "bg-emerald-900/50 text-emerald-300"
                        : "bg-amber-900/50 text-amber-300"
                    }`}
                  >
                    {user.status}
                  </span>
                  <p className="text-gray-400 text-xs mt-1">{user.joined}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold text-lg">System Alerts</h3>
            <AlertTriangle className="w-5 h-5 text-amber-400" />
          </div>
          <div className="space-y-3">
            <div className="p-4 bg-amber-900/20 border border-amber-700/50 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium mb-1">High Traffic Alert</p>
                  <p className="text-amber-200 text-sm">Platform experiencing 2x normal traffic</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-emerald-900/20 border border-emerald-700/50 rounded-lg">
              <div className="flex items-start gap-3">
                <UserCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium mb-1">Verification Pending</p>
                  <p className="text-emerald-200 text-sm">12 farmers awaiting verification</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-blue-900/20 border border-blue-700/50 rounded-lg">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium mb-1">Sales Milestone</p>
                  <p className="text-blue-200 text-sm">Platform reached 50K total sales</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
