import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { Eye, EyeOff, Leaf, ArrowRight, Sprout, ShoppingBag, GraduationCap } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    toast.success("Login successful! Welcome back.");
    setTimeout(() => {
      setIsLoading(false);
      navigate("/app");
    }, 1200);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 relative overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1724531281596-cfae90d5a082?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')" }}
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-10 items-center">

              {/* Left – Branding */}
              <div className="text-white hidden lg:block">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-emerald-500 rounded-full flex items-center justify-center shadow-xl">
                    <Leaf className="w-7 h-7 text-white" />
                  </div>
                  <h1 className="text-4xl font-bold">FBEconnect</h1>
                </div>
                <h2 className="text-3xl font-bold mb-4 leading-tight">
                  Welcome Back to Your Agricultural Hub
                </h2>
                <p className="text-emerald-200 text-lg mb-8 leading-relaxed">
                  Access your farm records, connect with buyers, track market prices, and consult with experts — all in one place.
                </p>
                <div className="space-y-4">
                  {[
                    { icon: Sprout, label: "Manage farm records & activities" },
                    { icon: ShoppingBag, label: "Buy & sell agricultural products" },
                    { icon: GraduationCap, label: "Access expert knowledge library" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-emerald-700/60 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-emerald-300" />
                      </div>
                      <span className="text-emerald-100">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right – Login Form */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
                <div className="text-center mb-8">
                  <div className="flex justify-center mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg lg:hidden">
                      <Leaf className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-1">Sign In</h2>
                  <p className="text-emerald-200 text-sm">Login to your FBEconnect account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-emerald-100 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter your email"
                      className="w-full bg-white/10 border border-white/20 text-white placeholder-emerald-300/60 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-emerald-100 mb-2">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Enter your password"
                        className="w-full bg-white/10 border border-white/20 text-white placeholder-emerald-300/60 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-300 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-emerald-200 cursor-pointer">
                      <input type="checkbox" id="remember" className="h-4 w-4 rounded border-white/30 bg-white/10 text-emerald-500 focus:ring-emerald-500" />
                      Remember me
                    </label>
                    <Link to="/forgot-password" className="text-emerald-300 hover:text-white transition-colors font-medium">
                      Forgot password?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-emerald-500/25"
                  >
                    {isLoading ? "Signing in..." : "Login to FBEconnect"}
                    {!isLoading && <ArrowRight className="w-5 h-5" />}
                  </button>
                </form>

                <div className="mt-6 pt-6 border-t border-white/20 space-y-3">
                  <button
                    onClick={() => { toast.success("Demo login success!"); navigate("/app"); }}
                    className="w-full bg-white/5 hover:bg-white/10 border border-white/20 text-emerald-100 font-medium py-3 px-4 rounded-xl transition-all text-sm"
                  >
                    Continue as Demo User
                  </button>
                  <p className="text-center text-emerald-200 text-sm">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-white font-semibold hover:text-emerald-300 transition-colors">
                      Register here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
