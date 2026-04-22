import { useState } from "react";
import { useNavigate } from "react-router";
import { Sprout, TrendingUp, Users, ShoppingCart, CheckCircle, ArrowRight, GraduationCap } from "lucide-react";
import { toast } from "sonner";
import Header from "../components/Header";
import Footer from "../components/Footer";

type UserRole = "farmer" | "buyer" | "expert" | null;

const features = [
  {
    icon: Sprout,
    title: "Farm Management",
    description: "Track all your farming activities, from planting to harvest",
  },
  {
    icon: ShoppingCart,
    title: "Digital Marketplace",
    description: "Buy and sell agricultural products directly with other farmers",
  },
  {
    icon: TrendingUp,
    title: "Market Prices",
    description: "Stay updated with real-time market prices for your products",
  },
  {
    icon: Users,
    title: "Expert Consultations",
    description: "Get advice from agricultural experts and experienced farmers",
  },
];

const testimonials = [
  {
    name: "James Mwangi",
    farm: "Sunrise Farm",
    image: "https://images.unsplash.com/photo-1740741703636-1680d0c0f0a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwZmFybWVyJTIwYWdyaWN1bHR1cmV8ZW58MXx8fHwxNzc2MTYxMzA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    quote: "AgroLink transformed how I manage my farm and connect with buyers. My sales increased by 40%!",
  },
  {
    name: "Mary Njeri",
    farm: "Green Valley",
    image: "https://images.unsplash.com/photo-1651592278720-fd9479be2a9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBmYXJtZXIlMjBhZ3JpY3VsdHVyZXxlbnwxfHx8fDE3NzYyNTU5MDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    quote: "The market price tracking helps me sell at the right time. Best platform for modern farmers!",
  },
  {
    name: "Chen Wei",
    farm: "Golden Harvest",
    image: "https://images.unsplash.com/photo-1718968924561-a25d9ec0c3f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGZhcm1lciUyMHdvcmtpbmd8ZW58MXx8fHwxNzc2MjU1OTA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    quote: "Expert consultations helped me improve my crop yield by 60%. Highly recommended!",
  },
  {
    name: "David Johnson",
    farm: "Organic Meadows",
    image: "https://images.unsplash.com/photo-1717175554477-f814ead82745?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGZhcm1lciUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NjI1NTkwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    quote: "The marketplace feature connects me directly with buyers. No more middlemen taking my profits!",
  },
];

export default function Landing() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formStep, setFormStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    farmName: "",
    farmSize: "",
    cropType: "",
    businessName: "",
    businessType: "",
    location: "",
    specialization: "",
    yearsExperience: "",
    certification: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRole) {
      toast.error("Please select your role");
      return;
    }

    const roleText = selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1);

    if (isLogin) {
      toast.success(`Welcome back to AgroLink, ${roleText}!`);
      navigate("/app");
    } else {
      toast.success(`Account created successfully! Welcome to AgroLink, ${roleText}!`);
      navigate("/app");
    }
  };

  const resetRole = () => {
    setSelectedRole(null);
    setFormData({
      email: "",
      password: "",
      fullName: "",
      farmName: "",
      farmSize: "",
      cropType: "",
      businessName: "",
      businessType: "",
      location: "",
      specialization: "",
      yearsExperience: "",
      certification: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 relative overflow-hidden flex flex-col">
      {/* Background Image */}
      <div
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1724531281596-cfae90d5a082?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyYWwlMjBmYXJtbGFuZCUyMGFlcmlhbCUyMHZpZXd8ZW58MXx8fHwxNzczMjI2Mjg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')"
        }}
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        {/* Hero Section */}
        <div className="container mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
            {/* Left Side - Info */}
            <div className="text-white">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-cyan-600 rounded-full" />
                <h1 className="text-4xl font-bold">AgroLink</h1>
              </div>

              <h2 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Empowering Farmers for a Better Tomorrow
              </h2>

              <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
                Join thousands of farmers who are transforming their agricultural businesses with our comprehensive platform. Manage your farm, connect with buyers, and grow your business.
              </p>

              {/* Features Grid */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <Icon className="w-8 h-8 text-emerald-300 mb-3" />
                      <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                      <p className="text-emerald-100 text-sm">{feature.description}</p>
                    </div>
                  );
                })}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div>
                  <p className="text-4xl font-bold text-white mb-1">5000+</p>
                  <p className="text-emerald-200 text-sm">Active Farmers</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-white mb-1">50K+</p>
                  <p className="text-emerald-200 text-sm">Products Listed</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-white mb-1">98%</p>
                  <p className="text-emerald-200 text-sm">Satisfaction</p>
                </div>
              </div>
            </div>

            {/* Right Side - Auth Form */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl relative overflow-hidden">
              {/* Background Image for Form */}
              <div
                className="absolute inset-0 opacity-5 bg-cover bg-center"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1708975477074-71e2907b699f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwdHJhY3RvciUyMGZpZWxkJTIwYWdyaWN1bHR1cmV8ZW58MXx8fHwxNzc2MjU1OTAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')"
                }}
              />
              
              <div className="relative z-10">
                <div className="flex gap-2 mb-6">
                  <button
                    onClick={() => {
                      setIsLogin(true);
                      resetRole();
                    }}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                      isLogin
                        ? "bg-emerald-600 text-white shadow-lg"
                        : "bg-white/5 text-emerald-200 hover:bg-white/10"
                    }`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setIsLogin(false);
                      resetRole();
                    }}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                      !isLogin
                        ? "bg-emerald-600 text-white shadow-lg"
                        : "bg-white/5 text-emerald-200 hover:bg-white/10"
                    }`}
                  >
                    Sign Up
                  </button>
                </div>

                {/* Role Selection */}
                {!selectedRole && (
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white text-center mb-6">
                      {isLogin ? "Login as a" : "Sign up as a"}
                    </h3>

                    <button
                      onClick={() => setSelectedRole("farmer")}
                      className="w-full bg-white/10 hover:bg-white/20 border-2 border-white/20 hover:border-emerald-400 rounded-xl p-6 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-12 h-12 rounded-full group-hover:scale-110 transition-transform bg-cover bg-center border-2 border-emerald-400"
                          style={{
                            backgroundImage: "url('https://images.unsplash.com/photo-1627829382469-f4bce7df99ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzYxOTUzNTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')"
                          }}
                        />
                        <div className="flex-1 text-left">
                          <p className="text-white font-bold text-lg">Farmer</p>
                          <p className="text-emerald-200 text-sm">Manage your farm and sell products</p>
                        </div>
                        <ArrowRight className="w-6 h-6 text-emerald-300 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>

                    <button
                      onClick={() => setSelectedRole("buyer")}
                      className="w-full bg-white/10 hover:bg-white/20 border-2 border-white/20 hover:border-blue-400 rounded-xl p-6 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-12 h-12 rounded-full group-hover:scale-110 transition-transform bg-cover bg-center border-2 border-blue-400"
                          style={{
                            backgroundImage: "url('https://images.unsplash.com/photo-1753161618211-2b3d3166133a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBlcnNvbiUyMGJ1eWVyfGVufDF8fHx8MTc3NjI1NTkwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')"
                          }}
                        />
                        <div className="flex-1 text-left">
                          <p className="text-white font-bold text-lg">Buyer</p>
                          <p className="text-emerald-200 text-sm">Purchase quality agricultural products</p>
                        </div>
                        <ArrowRight className="w-6 h-6 text-emerald-300 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>

                    <button
                      onClick={() => setSelectedRole("expert")}
                      className="w-full bg-white/10 hover:bg-white/20 border-2 border-white/20 hover:border-purple-400 rounded-xl p-6 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-12 h-12 rounded-full group-hover:scale-110 transition-transform bg-cover bg-center border-2 border-purple-400"
                          style={{
                            backgroundImage: "url('https://images.unsplash.com/photo-1582794496242-8165eed32971?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyYWwlMjBleHBlcnQlMjBzY2llbnRpc3R8ZW58MXx8fHwxNzc2MjU1OTA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')"
                          }}
                        />
                        <div className="flex-1 text-left">
                          <p className="text-white font-bold text-lg">Expert</p>
                          <p className="text-emerald-200 text-sm">Provide consultations and advice</p>
                        </div>
                        <ArrowRight className="w-6 h-6 text-emerald-300 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  </div>
                )}

                {/* Role-Specific Forms */}
                {selectedRole && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <button
                      type="button"
                      onClick={resetRole}
                      className="text-emerald-300 hover:text-white text-sm flex items-center gap-1 mb-4"
                    >
                      ← Change role
                    </button>

                    {!isLogin && (
                      <div>
                        <label className="block text-emerald-100 text-sm font-medium mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                    )}

                    {/* Farmer Fields */}
                    {selectedRole === "farmer" && !isLogin && (
                      <>
                        <div>
                          <label className="block text-emerald-100 text-sm font-medium mb-2">
                            Farm Name
                          </label>
                          <input
                            type="text"
                            value={formData.farmName}
                            onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            placeholder="e.g., Green Valley Farm"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-emerald-100 text-sm font-medium mb-2">
                            Farm Size (acres)
                          </label>
                          <input
                            type="text"
                            value={formData.farmSize}
                            onChange={(e) => setFormData({ ...formData, farmSize: e.target.value })}
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            placeholder="e.g., 10 acres"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-emerald-100 text-sm font-medium mb-2">
                            Primary Crop Type
                          </label>
                          <select
                            value={formData.cropType}
                            onChange={(e) => setFormData({ ...formData, cropType: e.target.value })}
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            required
                          >
                            <option value="">Select crop type</option>
                            <option value="vegetables">Vegetables</option>
                            <option value="grains">Grains</option>
                            <option value="fruits">Fruits</option>
                            <option value="dairy">Dairy</option>
                            <option value="poultry">Poultry</option>
                            <option value="mixed">Mixed Farming</option>
                          </select>
                        </div>
                      </>
                    )}

                    {/* Buyer Fields */}
                    {selectedRole === "buyer" && !isLogin && (
                      <>
                        <div>
                          <label className="block text-emerald-100 text-sm font-medium mb-2">
                            Business Name
                          </label>
                          <input
                            type="text"
                            value={formData.businessName}
                            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            placeholder="e.g., Fresh Foods Ltd"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-emerald-100 text-sm font-medium mb-2">
                            Business Type
                          </label>
                          <select
                            value={formData.businessType}
                            onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            required
                          >
                            <option value="">Select business type</option>
                            <option value="retailer">Retailer</option>
                            <option value="wholesaler">Wholesaler</option>
                            <option value="processor">Food Processor</option>
                            <option value="exporter">Exporter</option>
                            <option value="restaurant">Restaurant/Hotel</option>
                            <option value="cooperative">Cooperative</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-emerald-100 text-sm font-medium mb-2">
                            Business Location
                          </label>
                          <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            placeholder="e.g., Nairobi, Kenya"
                            required
                          />
                        </div>
                      </>
                    )}

                    {/* Expert Fields */}
                    {selectedRole === "expert" && !isLogin && (
                      <>
                        <div>
                          <label className="block text-emerald-100 text-sm font-medium mb-2">
                            Specialization
                          </label>
                          <select
                            value={formData.specialization}
                            onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            required
                          >
                            <option value="">Select specialization</option>
                            <option value="agronomy">Agronomy</option>
                            <option value="pest-management">Pest Management</option>
                            <option value="soil-science">Soil Science</option>
                            <option value="irrigation">Irrigation Systems</option>
                            <option value="livestock">Livestock Management</option>
                            <option value="organic-farming">Organic Farming</option>
                            <option value="business">Agricultural Business</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-emerald-100 text-sm font-medium mb-2">
                            Years of Experience
                          </label>
                          <input
                            type="number"
                            value={formData.yearsExperience}
                            onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            placeholder="e.g., 10"
                            min="1"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-emerald-100 text-sm font-medium mb-2">
                            Certification/Qualification
                          </label>
                          <input
                            type="text"
                            value={formData.certification}
                            onChange={(e) => setFormData({ ...formData, certification: e.target.value })}
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            placeholder="e.g., MSc Agriculture, Certified Agronomist"
                            required
                          />
                        </div>
                      </>
                    )}

                    <div>
                      <label className="block text-emerald-100 text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder={
                          selectedRole === "farmer" ? "farmer@example.com" :
                          selectedRole === "buyer" ? "buyer@example.com" :
                          "expert@example.com"
                        }
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-emerald-100 text-sm font-medium mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Enter your password"
                        required
                      />
                    </div>

                    {isLogin && (
                      <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center text-emerald-200">
                          <input type="checkbox" className="mr-2 rounded" />
                          Remember me
                        </label>
                        <a href="#" className="text-emerald-300 hover:text-white">
                          Forgot password?
                        </a>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      {isLogin ? "Login to AgroLink" : "Create Account"}
                      <ArrowRight className="w-5 h-5" />
                    </button>

                    {!isLogin && (
                      <p className="text-emerald-200 text-xs text-center">
                        By signing up, you agree to our Terms of Service and Privacy Policy
                      </p>
                    )}
                  </form>
                )}

                {/* Demo Login */}
                {!selectedRole && (
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <button
                      onClick={() => {
                        toast.success("Logged in as demo user!");
                        navigate("/app");
                      }}
                      className="w-full bg-white/5 hover:bg-white/10 text-emerald-100 font-medium py-3 px-4 rounded-lg transition-all border border-white/20"
                    >
                      Continue as Demo User
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="py-20">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              What Farmers Are Saying
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-16 h-16 bg-cover bg-center rounded-full border-4 border-emerald-400"
                      style={{ backgroundImage: `url(${testimonial.image})` }}
                    />
                    <div>
                      <p className="text-white font-bold text-lg">{testimonial.name}</p>
                      <p className="text-emerald-300 text-sm">{testimonial.farm}</p>
                    </div>
                  </div>
                  <p className="text-emerald-100 text-lg leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex gap-1 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <CheckCircle key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}