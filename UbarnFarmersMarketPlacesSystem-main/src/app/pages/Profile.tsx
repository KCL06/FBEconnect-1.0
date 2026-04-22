import { Camera, Mail, Phone, MapPin, Calendar, Edit2, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "Hillary Brian",
    email: "hillary.brian@agrilink.com",
    phone: "+254 712 345 678",
    farmName: "Green Acres",
    location: "Nakuru, Kenya",
    farmSize: "150 acres",
    established: "2018",
    specialization: "Mixed Farming",
    bio: "Passionate farmer committed to sustainable agricultural practices. Growing quality vegetables and grains for local and regional markets.",
  });

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 relative rounded-2xl overflow-hidden p-8 bg-gradient-to-r from-emerald-800/80 to-emerald-700/80 backdrop-blur-sm">
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1622676566956-b42b50c84c31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwZmFybWVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczNDkwMzc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')"
          }}
        />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">My Profile</h1>
            <p className="text-emerald-200">Manage your account information</p>
          </div>
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg flex items-center gap-2 backdrop-blur-sm border border-white/30 transition-all"
          >
            {isEditing ? (
              <>
                <Save className="w-5 h-5" />
                Save Changes
              </>
            ) : (
              <>
                <Edit2 className="w-5 h-5" />
                Edit Profile
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 sticky top-8">
            {/* Profile Image */}
            <div className="relative w-32 h-32 mx-auto mb-4">
              <div 
                className="w-full h-full rounded-full bg-cover bg-center border-4 border-emerald-500"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1622676566956-b42b50c84c31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwZmFybWVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczNDkwMzc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')"
                }}
              />
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-emerald-600 text-white p-2 rounded-full hover:bg-emerald-700 transition-all">
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-1">{formData.fullName}</h2>
              <p className="text-emerald-300 text-sm">{formData.farmName}</p>
              <p className="text-gray-400 text-xs mt-1">Member since {formData.established}</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-emerald-600/20 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-white">125</p>
                <p className="text-emerald-300 text-xs">Products</p>
              </div>
              <div className="bg-blue-600/20 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-white">450</p>
                <p className="text-blue-300 text-xs">Sales</p>
              </div>
              <div className="bg-amber-600/20 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-white">4.8</p>
                <p className="text-amber-300 text-xs">Rating</p>
              </div>
              <div className="bg-purple-600/20 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-white">98%</p>
                <p className="text-purple-300 text-xs">Verified</p>
              </div>
            </div>

            {/* Achievements */}
            <div className="border-t border-white/10 pt-4">
              <h3 className="text-white font-semibold mb-3">Achievements</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-emerald-300 text-sm">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-xs">🏆</div>
                  Top Seller
                </div>
                <div className="flex items-center gap-2 text-emerald-300 text-sm">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-xs">✓</div>
                  Verified Farmer
                </div>
                <div className="flex items-center gap-2 text-emerald-300 text-sm">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs">⭐</div>
                  Quality Products
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-emerald-200 text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white ${
                    isEditing ? "focus:outline-none focus:ring-2 focus:ring-emerald-500" : "opacity-70"
                  }`}
                />
              </div>

              <div>
                <label className="block text-emerald-200 text-sm font-medium mb-2">
                  <Mail className="w-4 h-4 inline-block mr-1" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white ${
                    isEditing ? "focus:outline-none focus:ring-2 focus:ring-emerald-500" : "opacity-70"
                  }`}
                />
              </div>

              <div>
                <label className="block text-emerald-200 text-sm font-medium mb-2">
                  <Phone className="w-4 h-4 inline-block mr-1" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white ${
                    isEditing ? "focus:outline-none focus:ring-2 focus:ring-emerald-500" : "opacity-70"
                  }`}
                />
              </div>

              <div>
                <label className="block text-emerald-200 text-sm font-medium mb-2">
                  <MapPin className="w-4 h-4 inline-block mr-1" />
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white ${
                    isEditing ? "focus:outline-none focus:ring-2 focus:ring-emerald-500" : "opacity-70"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Farm Information */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6">Farm Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-emerald-200 text-sm font-medium mb-2">
                  Farm Name
                </label>
                <input
                  type="text"
                  value={formData.farmName}
                  onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white ${
                    isEditing ? "focus:outline-none focus:ring-2 focus:ring-emerald-500" : "opacity-70"
                  }`}
                />
              </div>

              <div>
                <label className="block text-emerald-200 text-sm font-medium mb-2">
                  Farm Size
                </label>
                <input
                  type="text"
                  value={formData.farmSize}
                  onChange={(e) => setFormData({ ...formData, farmSize: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white ${
                    isEditing ? "focus:outline-none focus:ring-2 focus:ring-emerald-500" : "opacity-70"
                  }`}
                />
              </div>

              <div>
                <label className="block text-emerald-200 text-sm font-medium mb-2">
                  <Calendar className="w-4 h-4 inline-block mr-1" />
                  Year Established
                </label>
                <input
                  type="text"
                  value={formData.established}
                  onChange={(e) => setFormData({ ...formData, established: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white ${
                    isEditing ? "focus:outline-none focus:ring-2 focus:ring-emerald-500" : "opacity-70"
                  }`}
                />
              </div>

              <div>
                <label className="block text-emerald-200 text-sm font-medium mb-2">
                  Specialization
                </label>
                <input
                  type="text"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white ${
                    isEditing ? "focus:outline-none focus:ring-2 focus:ring-emerald-500" : "opacity-70"
                  }`}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-emerald-200 text-sm font-medium mb-2">
                  Bio / Description
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  disabled={!isEditing}
                  rows={4}
                  className={`w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white resize-none ${
                    isEditing ? "focus:outline-none focus:ring-2 focus:ring-emerald-500" : "opacity-70"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6">Security Settings</h3>
            <div className="space-y-4">
              <button className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition-all">
                Change Password
              </button>
              <button className="w-full md:w-auto bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-all ml-0 md:ml-4">
                Enable Two-Factor Authentication
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
