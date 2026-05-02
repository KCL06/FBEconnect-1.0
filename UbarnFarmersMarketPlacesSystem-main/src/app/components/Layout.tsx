import { Link, Outlet, useLocation } from "react-router";
import { Home, Sprout, Package, TrendingUp, MessageSquare, ShoppingCart, Receipt, Bell, LayoutDashboard, Star, MapPin, MessageCircle, Settings, Menu, X, User, BookOpen, ChevronRight, ChevronLeft, Leaf } from "lucide-react";
import svgPaths from "../../imports/svg-ld7y1c2a9i";
import { useState } from "react";
import { useCart } from "../context/CartContext";

const menuItems = [
  { path: "/app", label: "Dashboard", icon: Home },
  { path: "/app/farm-records", label: "My Farm Records", icon: Sprout },
  { path: "/app/products", label: "Products", icon: Package },
  { path: "/app/market-prices", label: "Market Prices", icon: TrendingUp },
  { path: "/app/consultations", label: "Consultations", icon: MessageSquare },
  { path: "/app/messages", label: "Messages", icon: MessageCircle },
  { path: "/app/marketplace", label: "Market Place", icon: ShoppingCart },
  { path: "/app/transaction", label: "Transaction", icon: Receipt },
  { path: "/app/notification", label: "Notifications", icon: Bell },
  { path: "/app/admin", label: "Admin Dashboard", icon: LayoutDashboard },
  { path: "/app/reviews", label: "Reviews & Ratings", icon: Star },
  { path: "/app/order-tracking", label: "Order Tracking", icon: MapPin },
  { path: "/app/user-feedback", label: "User Feedback", icon: MessageCircle },
  { path: "/app/expert-knowledge", label: "Expert Knowledge", icon: BookOpen },
  { path: "/app/cart", label: "My Cart", icon: ShoppingCart },
  { path: "/app/profile", label: "My Profile", icon: User },
];

function FarmerIcon() {
  return (
    <div className="relative w-16 h-16 overflow-hidden">
      <div className="absolute inset-[62.57%_23.48%_18%_23.57%]">
        <svg className="absolute block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 168.385 61.8024">
          <path d={svgPaths.p1d9cba00} fill="#B1CC33" />
        </svg>
      </div>
      <div className="absolute inset-[62.57%_37.45%_25.09%_37.55%]">
        <svg className="absolute block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 79.5 39.2509">
          <path d={svgPaths.p643df80} fill="#5C9E31" />
        </svg>
      </div>
      <div className="absolute inset-[22.6%_32.11%_57.38%_31.39%]">
        <svg className="absolute block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 116.049 63.6618">
          <path d={svgPaths.p1324a080} fill="#6A462F" />
        </svg>
      </div>
      <div className="absolute inset-[22.6%_34.67%_40.93%_33.89%]">
        <svg className="absolute block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 99.9801 115.977">
          <path d={svgPaths.p3eb08a00} fill="#C19A65" />
        </svg>
      </div>
      <div className="absolute inset-[11.21%_37.84%_77.4%_37.76%]">
        <svg className="absolute block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77.6008 36.2255">
          <path d={svgPaths.p38d36000} fill="#F4AA41" />
        </svg>
      </div>
    </div>
  );
}

function getPageTitle(pathname: string): string {
  const found = menuItems.find((item) => item.path === pathname);
  if (found) return found.label;
  if (pathname === "/app/settings") return "Settings";
  return "FBEconnect";
}

function CartBadge() {
  const { totalItems } = useCart();
  return (
    <Link to="/app/cart" className="relative text-white p-1" title="My Cart">
      <ShoppingCart className="w-5 h-5" />
      {totalItems > 0 && (
        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full text-xs flex items-center justify-center text-white font-bold">
          {totalItems > 9 ? "9+" : totalItems}
        </span>
      )}
    </Link>
  );
}

export default function Layout() {

  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pageTitle = getPageTitle(location.pathname);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 relative">
      {/* Background */}
      <div
        className="absolute inset-0 opacity-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1724531281596-cfae90d5a082?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')" }}
      />

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* ── Sidebar ── */}
      <aside className={`fixed lg:static bg-emerald-900/70 backdrop-blur-md border-r border-emerald-700/50 flex flex-col z-30 h-full transition-all duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } ${isCollapsed ? 'lg:w-16' : 'lg:w-64'} w-64`}>
        {/* Logo + Collapse Toggle */}
        <div className="p-4 border-b border-emerald-700/50 flex items-center justify-between">
          {!isCollapsed && (
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-gradient-to-br from-amber-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform flex-shrink-0">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">FBEconnect</h1>
            </Link>
          )}
          {isCollapsed && (
            <div className="w-9 h-9 bg-gradient-to-br from-amber-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <Leaf className="w-4 h-4 text-white" />
            </div>
          )}
          <button onClick={() => setIsCollapsed(c => !c)} className="hidden lg:flex text-emerald-400 hover:text-white p-1 rounded-lg hover:bg-emerald-700/40 transition-all" title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* User Profile */}
        {!isCollapsed && (
          <div className="p-4 border-b border-emerald-700/50">
            <Link to="/app/profile" className="flex items-start gap-3 hover:bg-emerald-800/40 rounded-xl p-2 transition-all group">
              <div className="w-12 h-12 bg-emerald-700 rounded-full flex items-center justify-center overflow-hidden ring-2 ring-emerald-500/50">
                <FarmerIcon />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white text-sm truncate">Hillary Brian</p>
                <p className="text-xs text-emerald-300 truncate">Green Acres Farm</p>
                <span className="inline-block mt-1 text-xs bg-emerald-700/60 text-emerald-300 px-2 py-0.5 rounded-full">Farmer</span>
              </div>
            </Link>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-2">
          {!isCollapsed && <p className="text-emerald-500 text-xs font-semibold uppercase tracking-widest px-3 mb-2">Main Menu</p>}
          <ul className="space-y-0.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setIsSidebarOpen(false)}
                    title={isCollapsed ? item.label : undefined}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${isActive ? "bg-amber-700/90 text-white shadow-lg" : "text-emerald-200 hover:bg-emerald-700/40 hover:text-white"} ${isCollapsed ? 'justify-center' : ''}`}
                  >
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-amber-200" : "text-emerald-400 group-hover:text-white"}`} />
                    {!isCollapsed && <span className="text-sm font-medium truncate">{item.label}</span>}
                    {!isCollapsed && isActive && <ChevronRight className="w-3 h-3 ml-auto text-amber-200" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom: Settings */}
        <div className="p-2 border-t border-emerald-700/50">
          <Link
            to="/app/settings"
            onClick={() => setIsSidebarOpen(false)}
            title={isCollapsed ? 'Settings' : undefined}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${location.pathname === "/app/settings" ? "bg-amber-700/90 text-white shadow-lg" : "text-emerald-200 hover:bg-emerald-700/40 hover:text-white"} ${isCollapsed ? 'justify-center' : ''}`}
          >
            <Settings className="w-4 h-4 flex-shrink-0" />
            {!isCollapsed && <span className="text-sm font-medium">Settings</span>}
          </Link>
          {!isCollapsed && (
            <div className="flex items-center justify-around mt-3 pt-3 border-t border-emerald-700/30">
              <Link to="/" className="text-emerald-400 hover:text-white text-xs transition-colors">Home</Link>
              <Link to="/app/notification" className="text-emerald-400 hover:text-white text-xs transition-colors">Alerts</Link>
              <Link to="/login" className="text-emerald-400 hover:text-white text-xs transition-colors">Logout</Link>
            </div>
          )}
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 overflow-auto relative z-10 flex flex-col min-h-screen">

        {/* Desktop Top Header */}
        <div className="hidden lg:flex sticky top-0 bg-emerald-900/80 backdrop-blur-md border-b border-emerald-700/50 px-8 py-3 z-10 items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-emerald-400 hover:text-white text-sm transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-emerald-600" />
            <span className="text-white text-sm font-semibold">{pageTitle}</span>
          </div>
          <div className="flex items-center gap-3">
            <nav className="flex items-center gap-1">
              {[
                { path: "/app", label: "Dashboard", icon: Home },
                { path: "/app/marketplace", label: "Market", icon: ShoppingCart },
                { path: "/app/expert-knowledge", label: "Knowledge", icon: BookOpen },
                { path: "/app/market-prices", label: "Prices", icon: TrendingUp },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link key={item.path} to={item.path} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${isActive ? "bg-emerald-700 text-white" : "text-emerald-300 hover:bg-emerald-800/60 hover:text-white"}`}>
                    <Icon className="w-3.5 h-3.5" />{item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="w-px h-6 bg-emerald-700" />
            <Link to="/app/notification" className="relative text-emerald-300 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-emerald-800/60">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white font-bold">3</span>
            </Link>
            <Link to="/app/settings" className="text-emerald-300 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-emerald-800/60">
              <Settings className="w-5 h-5" />
            </Link>
            <Link to="/app/profile" className="flex items-center gap-2 text-emerald-200 hover:text-white transition-all hover:bg-emerald-800/60 px-2 py-1.5 rounded-lg">
              <div className="w-7 h-7 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center ring-2 ring-emerald-500/50">
                <User className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-xs font-medium">Hillary Brian</span>
            </Link>
          </div>
        </div>

        {/* Mobile Top Header */}
        <div className="lg:hidden sticky top-0 bg-emerald-900/90 backdrop-blur-md border-b border-emerald-700/50 p-4 z-10">
          <div className="flex items-center justify-between">
            <button className="text-white p-1" onClick={() => setIsSidebarOpen(!isSidebarOpen)} aria-label="Toggle sidebar">
              {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-emerald-500 rounded-full flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">FBEconnect</h1>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/app/notification" className="relative text-white p-1">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">3</span>
              </Link>
              <CartBadge />
              <Link to="/app/profile" className="text-white p-1"><User className="w-5 h-5" /></Link>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1 text-emerald-300 text-xs">
            <ChevronRight className="w-3 h-3" />
            <span className="font-medium">{pageTitle}</span>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1"><Outlet /></div>

        {/* App Footer */}
        <footer className="bg-emerald-950/80 backdrop-blur-sm border-t border-emerald-700/50 text-white py-8 mt-auto">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-5">
              {[
                { to: "/app", label: "Dashboard" },
                { to: "/app/farm-records", label: "Farm Records" },
                { to: "/app/marketplace", label: "Marketplace" },
                { to: "/app/market-prices", label: "Market Prices" },
                { to: "/app/expert-knowledge", label: "Expert Knowledge" },
                { to: "/app/consultations", label: "Consultations" },
                { to: "/app/messages", label: "Messages" },
                { to: "/app/transaction", label: "Transactions" },
                { to: "/app/order-tracking", label: "Order Tracking" },
                { to: "/app/settings", label: "Settings" },
              ].map((link) => (
                <Link key={link.to} to={link.to} className="text-emerald-300 hover:text-white text-sm transition-colors hover:underline">
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="border-t border-emerald-800 pt-5 flex flex-col md:flex-row justify-between items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-gradient-to-br from-amber-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <Leaf className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="font-bold text-white">FBEconnect</span>
              </div>
              <p className="text-emerald-400 text-sm text-center">&copy; {new Date().getFullYear()} FBEconnect. Empowering agricultural communities.</p>
              <div className="flex gap-4">
                <a href="#" className="text-emerald-400 hover:text-white text-xs transition-colors">Privacy</a>
                <a href="#" className="text-emerald-400 hover:text-white text-xs transition-colors">Terms</a>
                <a href="#" className="text-emerald-400 hover:text-white text-xs transition-colors">Support</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}