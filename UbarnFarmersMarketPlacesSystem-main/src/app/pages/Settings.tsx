import { User, Bell, Lock, CreditCard, Globe, Shield, Smartphone, Mail, Camera, Key, Trash2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type SettingsTab = "profile" | "notifications" | "security" | "payment" | "language" | "privacy";

export default function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [notifications, setNotifications] = useState({
    orders: true,
    messages: true,
    prices: false,
    marketing: false,
  });

  const [profileData, setProfileData] = useState({
    fullName: "Lamech kipkorir",
    farmName: "Green acres",
    email: "lamech@greenacres.com",
    phone: "+254 712 345 678",
    location: "Nairobi, Kenya",
    bio: "Organic farmer specializing in vegetables and grains. Over 10 years of experience in sustainable agriculture."
  });

  const handleSaveChanges = () => {
    toast.success("Settings saved successfully!");
  };

  const handlePhotoChange = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => {
      if (input.files && input.files[0]) {
        toast.success("Profile photo updated successfully!");
      }
    };
    input.click();
  };

  const handlePasswordChange = () => {
    toast.success("Password updated successfully!");
  };

  const handleAddPaymentMethod = () => {
    toast.info("Payment method added!");
  };

  const handleDeleteAccount = () => {
    toast.error("Please contact support to delete your account.");
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
        <p className="text-emerald-200">Manage your account preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 sticky top-8">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "profile" ? "bg-emerald-700 text-white" : "text-gray-300 hover:bg-white/5"
                }`}
              >
                <User className="w-5 h-5" />
                <span className="font-medium">Profile</span>
              </button>
              <button
                onClick={() => setActiveTab("notifications")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "notifications" ? "bg-emerald-700 text-white" : "text-gray-300 hover:bg-white/5"
                }`}
              >
                <Bell className="w-5 h-5" />
                <span className="font-medium">Notifications</span>
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "security" ? "bg-emerald-700 text-white" : "text-gray-300 hover:bg-white/5"
                }`}
              >
                <Lock className="w-5 h-5" />
                <span className="font-medium">Security</span>
              </button>
              <button
                onClick={() => setActiveTab("payment")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "payment" ? "bg-emerald-700 text-white" : "text-gray-300 hover:bg-white/5"
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span className="font-medium">Payment Methods</span>
              </button>
              <button
                onClick={() => setActiveTab("language")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "language" ? "bg-emerald-700 text-white" : "text-gray-300 hover:bg-white/5"
                }`}
              >
                <Globe className="w-5 h-5" />
                <span className="font-medium">Language & Region</span>
              </button>
              <button
                onClick={() => setActiveTab("privacy")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "privacy" ? "bg-emerald-700 text-white" : "text-gray-300 hover:bg-white/5"
                }`}
              >
                <Shield className="w-5 h-5" />
                <span className="font-medium">Privacy</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          {activeTab === "profile" && (
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Profile Information</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center text-4xl relative group">
                  👨🏾‍🌾
                  <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <button
                    onClick={handlePhotoChange}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm mb-2 transition-all"
                  >
                    Change Photo
                  </button>
                  <p className="text-gray-400 text-sm">JPG, PNG or GIF. Max size 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-emerald-200 text-sm mb-2">Full Name</label>
                  <input
                    type="text"
                    value={profileData.fullName}
                    onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                    className="w-full bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-emerald-200 text-sm mb-2">Farm Name</label>
                  <input
                    type="text"
                    value={profileData.farmName}
                    onChange={(e) => setProfileData({...profileData, farmName: e.target.value})}
                    className="w-full bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-emerald-200 text-sm mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    className="w-full bg-white/10 text-white pl-10 pr-4 py-2 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-emerald-200 text-sm mb-2">Phone Number</label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    className="w-full bg-white/10 text-white pl-10 pr-4 py-2 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-emerald-200 text-sm mb-2">Location</label>
                <input
                  type="text"
                  value={profileData.location}
                  onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                  className="w-full bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-emerald-200 text-sm mb-2">Bio</label>
                <textarea
                  rows={4}
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  className="w-full bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>
            </div>
          </div>
          )}

          {/* Notification Settings */}
          {activeTab === "notifications" && (
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Notification Preferences</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Order Updates</p>
                  <p className="text-gray-400 text-sm">Get notified about new orders and order status</p>
                </div>
                <button
                  onClick={() => {
                    setNotifications({ ...notifications, orders: !notifications.orders });
                    toast.success(!notifications.orders ? "Order notifications enabled" : "Order notifications disabled");
                  }}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    notifications.orders ? "bg-emerald-600" : "bg-gray-600"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      notifications.orders ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Messages</p>
                  <p className="text-gray-400 text-sm">Receive notifications for new messages</p>
                </div>
                <button
                  onClick={() => {
                    setNotifications({ ...notifications, messages: !notifications.messages });
                    toast.success(!notifications.messages ? "Message notifications enabled" : "Message notifications disabled");
                  }}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    notifications.messages ? "bg-emerald-600" : "bg-gray-600"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      notifications.messages ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Price Alerts</p>
                  <p className="text-gray-400 text-sm">Get updates on market price changes</p>
                </div>
                <button
                  onClick={() => {
                    setNotifications({ ...notifications, prices: !notifications.prices });
                    toast.success(!notifications.prices ? "Price alerts enabled" : "Price alerts disabled");
                  }}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    notifications.prices ? "bg-emerald-600" : "bg-gray-600"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      notifications.prices ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Marketing Updates</p>
                  <p className="text-gray-400 text-sm">Receive news and promotional content</p>
                </div>
                <button
                  onClick={() => {
                    setNotifications({ ...notifications, marketing: !notifications.marketing });
                    toast.success(!notifications.marketing ? "Marketing updates enabled" : "Marketing updates disabled");
                  }}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    notifications.marketing ? "bg-emerald-600" : "bg-gray-600"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      notifications.marketing ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Security Settings</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-emerald-200 text-sm mb-2">Current Password</label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter current password"
                    className="w-full bg-white/10 text-white pl-10 pr-12 py-2 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-emerald-200 text-sm mb-2">New Password</label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    className="w-full bg-white/10 text-white pl-10 pr-12 py-2 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-emerald-200 text-sm mb-2">Confirm New Password</label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full bg-white/10 text-white pl-10 pr-4 py-2 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <button
                onClick={handlePasswordChange}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-semibold transition-all"
              >
                Update Password
              </button>

              <div className="border-t border-white/10 pt-6 mt-6">
                <h3 className="text-lg font-bold text-white mb-4">Two-Factor Authentication</h3>
                <p className="text-gray-400 text-sm mb-4">Add an extra layer of security to your account</p>
                <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg font-semibold transition-all border border-white/20">
                  Enable 2FA
                </button>
              </div>
            </div>
          </div>
          )}

          {/* Payment Methods */}
          {activeTab === "payment" && (
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Payment Methods</h2>

            <div className="space-y-4 mb-6">
              <div className="bg-white/5 p-4 rounded-lg border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-3 rounded-lg">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Visa ending in 4242</p>
                    <p className="text-gray-400 text-sm">Expires 12/2027</p>
                  </div>
                </div>
                <span className="bg-emerald-900/50 text-emerald-300 text-xs px-3 py-1 rounded-full">Default</span>
              </div>

              <div className="bg-white/5 p-4 rounded-lg border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-3 rounded-lg">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Mastercard ending in 8888</p>
                    <p className="text-gray-400 text-sm">Expires 06/2026</p>
                  </div>
                </div>
                <button className="text-red-400 hover:text-red-300 transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddPaymentMethod}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2"
            >
              <CreditCard className="w-5 h-5" />
              Add Payment Method
            </button>
          </div>
          )}

          {/* Language & Region */}
          {activeTab === "language" && (
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Language & Region</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-emerald-200 text-sm mb-2">Language</label>
                <select className="w-full bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500 [&>option]:bg-emerald-900 [&>option]:text-white">
                  <option value="en">English</option>
                  <option value="sw">Swahili</option>
                  <option value="fr">French</option>
                  <option value="es">Spanish</option>
                </select>
              </div>

              <div>
                <label className="block text-emerald-200 text-sm mb-2">Time Zone</label>
                <select className="w-full bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500 [&>option]:bg-emerald-900 [&>option]:text-white">
                  <option>East Africa Time (EAT) - UTC+3</option>
                  <option>West Africa Time (WAT) - UTC+1</option>
                  <option>Central Africa Time (CAT) - UTC+2</option>
                </select>
              </div>

              <div>
                <label className="block text-emerald-200 text-sm mb-2">Currency</label>
                <select className="w-full bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500 [&>option]:bg-emerald-900 [&>option]:text-white">
                  <option>Kenyan Shilling (KES)</option>
                  <option>US Dollar (USD)</option>
                  <option>Euro (EUR)</option>
                  <option>British Pound (GBP)</option>
                </select>
              </div>
            </div>
          </div>
          )}

          {/* Privacy Settings */}
          {activeTab === "privacy" && (
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Privacy Settings</h2>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Profile Visibility</p>
                  <p className="text-gray-400 text-sm">Make your profile visible to other users</p>
                </div>
                <button className="relative w-12 h-6 rounded-full transition-colors bg-emerald-600">
                  <div className="absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform translate-x-6" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Show Online Status</p>
                  <p className="text-gray-400 text-sm">Let others see when you're online</p>
                </div>
                <button className="relative w-12 h-6 rounded-full transition-colors bg-gray-600">
                  <div className="absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5" />
                </button>
              </div>

              <div className="border-t border-white/10 pt-6 mt-6">
                <h3 className="text-lg font-bold text-red-400 mb-4">Danger Zone</h3>
                <p className="text-gray-400 text-sm mb-4">Once you delete your account, there is no going back.</p>
                <button
                  onClick={handleDeleteAccount}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-all"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
          )}

          {/* Save Button */}
          <div className="flex gap-4">
            <button
              onClick={handleSaveChanges}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              Save Changes
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-semibold transition-all border border-white/20">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}