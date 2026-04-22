import { TrendingUp, Package, ShoppingBag, FileText, MessageSquare, BarChart3, ArrowRight, DollarSign, TrendingDown } from "lucide-react";
import { Link } from "react-router";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, ComposedChart } from "recharts";

const stats = [
  { label: "Total Revenue", value: "KES 450K", change: "+12%", trend: "up", color: "from-emerald-600 to-emerald-700", icon: DollarSign },
  { label: "Active Products", value: "3,050", change: "+8%", trend: "up", color: "from-blue-600 to-blue-700", icon: Package },
  { label: "Pending Orders", value: "250", change: "-5%", trend: "down", color: "from-amber-600 to-amber-700", icon: ShoppingBag },
  { label: "Farm Records", value: "450", change: "+15%", trend: "up", color: "from-purple-600 to-purple-700", icon: FileText },
];

// Sales data for line chart
const salesData = [
  { month: "Jan", revenue: 45000, orders: 120 },
  { month: "Feb", revenue: 52000, orders: 145 },
  { month: "Mar", revenue: 48000, orders: 130 },
  { month: "Apr", revenue: 61000, orders: 168 },
  { month: "May", revenue: 55000, orders: 152 },
  { month: "Jun", revenue: 68000, orders: 185 },
];

// Product category data for bar chart
const categoryData = [
  { category: "Vegetables", sales: 45, target: 50 },
  { category: "Grains", sales: 38, target: 40 },
  { category: "Dairy", sales: 25, target: 20 },
  { category: "Fruits", sales: 30, target: 35 },
  { category: "Poultry", sales: 20, target: 25 },
];

// Product distribution for pie chart
const productDistribution = [
  { name: "Tomatoes", value: 400 },
  { name: "Maize", value: 300 },
  { name: "Milk", value: 200 },
  { name: "Eggs", value: 150 },
  { name: "Others", value: 250 },
];

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ec4899"];

const quickActions = [
  { 
    label: "Record farm activity", 
    path: "/app/farm-records",
    color: "from-amber-700 to-amber-800", 
    icon: FileText 
  },
  { 
    label: "Add new product", 
    path: "/app/products",
    color: "from-purple-700 to-purple-800", 
    icon: Package 
  },
  { 
    label: "View Market Prices", 
    path: "/app/market-prices",
    color: "from-blue-700 to-blue-800", 
    icon: TrendingUp 
  },
];

const recentMessages = [
  { description: "New consultation request from buyer", date: "2 hours ago", color: "bg-slate-700" },
  { description: "Price update for tomatoes", date: "5 hours ago", color: "bg-cyan-600" },
  { description: "Order confirmed for 50kg maize", date: "1 day ago", color: "bg-emerald-600" },
  { description: "Review received on your product", date: "2 days ago", color: "bg-slate-500" },
];

export default function Dashboard() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 relative rounded-2xl overflow-hidden p-8 bg-gradient-to-r from-emerald-800/80 to-emerald-700/80 backdrop-blur-sm">
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1706685137907-7cdbc2bb7e48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGZhcm0lMjBmaWVsZCUyMGNyb3BzfGVufDF8fHx8MTc3MzI0ODczNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')"
          }}
        />
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white mb-2">DASHBOARD</h1>
          <p className="text-emerald-200">Welcome back, Lamech!</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all hover:scale-105`}
            >
              <div className="flex items-start justify-between mb-4">
                <Icon className="w-8 h-8 opacity-80" />
              </div>
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-white/80 text-sm mb-2">{stat.label}</div>
              <div className="flex items-center gap-1 text-sm">
                {stat.trend === "up" ? (
                  <TrendingUp className="w-4 h-4 text-emerald-300" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-rose-300" />
                )}
                <span className={stat.trend === "up" ? "text-emerald-300" : "text-rose-300"}>
                  {stat.change}
                </span>
                <span className="text-white/60 text-xs ml-1">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Quick Actions</h2>
          <button className="text-emerald-300 hover:text-white transition-colors">
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.path}
                to={action.path}
                className={`bg-gradient-to-br ${action.color} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 flex flex-col items-center justify-center text-center min-h-[160px] group`}
              >
                <Icon className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-lg">{action.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Messages */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Recent messages</h2>
          <Link to="/app/messages" className="text-emerald-300 hover:text-white transition-colors flex items-center gap-2">
            <span className="text-sm">View all</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        <div className="bg-rose-100/10 backdrop-blur-sm rounded-2xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentMessages.map((message) => (
              <div
                key={message.description}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer"
              >
                <div className={`${message.color} h-32 rounded-lg mb-3 flex items-center justify-center`}>
                  <MessageSquare className="w-12 h-12 text-white opacity-50" />
                </div>
                <p className="text-white text-sm font-medium mb-2">{message.description}</p>
                <p className="text-emerald-300 text-xs">{message.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Sales Chart */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-4">Sales Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={salesData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis dataKey="month" stroke="#fff" />
              <YAxis yAxisId="left" stroke="#fff" />
              <YAxis yAxisId="right" orientation="right" stroke="#93c5fd" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Legend />
              <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#10b981" fillOpacity={1} fill="url(#colorRevenue)" name="Revenue (KES)" />
              <Area yAxisId="right" type="monotone" dataKey="orders" stroke="#3b82f6" fillOpacity={1} fill="url(#colorOrders)" name="Orders" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Product Category Chart */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-4">Category Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart
              data={categoryData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis dataKey="category" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Legend />
              <Bar dataKey="sales" fill="#10b981" name="Actual Sales (%)" radius={[4, 4, 0, 0]} />
              <Line type="monotone" dataKey="target" stroke="#f59e0b" strokeWidth={3} name="Target (%)" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Product Distribution Chart */}
      <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-4">Product Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={productDistribution}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {productDistribution.map((entry, index) => (
                <Cell key={`pie-cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#fff'
              }} 
              itemStyle={{ color: '#fff' }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}