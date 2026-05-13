import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { Eye, EyeOff, ArrowRight, Sprout, ShoppingBag, GraduationCap, Shield } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import { signIn } from "../../lib/auth";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // MFA states
  const [showMfa, setShowMfa] = useState(false);
  const [mfaCode, setMfaCode] = useState("");
  const [mfaFactorId, setMfaFactorId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    try {
      const { supabase } = await import("../../lib/supabase");
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      // Check if MFA is required
      if (data.session && data.user && data.user.factors && data.user.factors.length > 0) {
        const factor = data.user.factors.find((f: any) => f.factor_type === 'totp' && f.status === 'verified');
        if (factor) {
           setMfaFactorId(factor.id);
           setShowMfa(true);
           setIsLoading(false);
           return;
        }
      }

      toast.success("Welcome back to FBEconnect!");
      navigate("/app");
    } catch (err: any) {
      const msg = err.message || "Login failed";
      if (msg.includes("Invalid login")) toast.error("Wrong email or password.");
      else if (msg.includes("Email not confirmed")) toast.error("Please verify your email first.");
      else toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyMfa = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mfaCode.length !== 6) {
      toast.error("Please enter a valid 6-digit code.");
      return;
    }
    setIsLoading(true);
    try {
      const { supabase } = await import("../../lib/supabase");
      const { data, error } = await supabase.auth.mfa.challengeAndVerify({
        factorId: mfaFactorId,
        code: mfaCode,
      });
      if (error) throw error;
      
      toast.success("Welcome back to FBEconnect!");
      navigate("/app");
    } catch (err: any) {
      toast.error("Invalid code: " + err.message);
    } finally {
      setIsLoading(false);
    }
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
                  <Logo size="lg" />
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
                    <Logo size="sm" className="lg:hidden" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-1">Sign In</h2>
                  <p className="text-emerald-200 text-sm">Login to your FBEconnect account</p>
                </div>

                {showMfa ? (
                  <form onSubmit={handleVerifyMfa} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-emerald-100 mb-2">Two-Factor Authentication Code</label>
                      <input
                        type="text"
                        maxLength={6}
                        value={mfaCode}
                        onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ""))}
                        placeholder="000000"
                        className="w-full bg-white/10 border border-white/20 text-white placeholder-emerald-300/60 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all tracking-widest text-center font-mono text-xl"
                        required
                      />
                      <p className="text-emerald-300 text-xs mt-2 text-center">Open your authenticator app to get the code.</p>
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-emerald-500/25"
                    >
                      {isLoading ? "Verifying..." : "Verify & Login"}
                      {!isLoading && <ArrowRight className="w-5 h-5" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => { setShowMfa(false); setMfaCode(""); }}
                      className="w-full text-emerald-300 hover:text-white transition-colors text-sm font-medium mt-2"
                    >
                      Cancel and go back
                    </button>
                  </form>
                ) : (
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
                      <Link
                        to="/forgot-password"
                        className="text-emerald-300 hover:text-white transition-colors font-medium"
                      >
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
                )}

                <div className="mt-6 pt-5 border-t border-white/20">
                  <div className="bg-emerald-900/40 rounded-xl p-5 mb-5 border border-emerald-500/20 text-center shadow-inner">
                    <Shield className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                    <p className="text-emerald-50 text-sm font-bold mb-1 tracking-wide">Secure Login</p>
                    <p className="text-emerald-200/80 text-xs leading-relaxed max-w-xs mx-auto">
                      Your connection is protected by enterprise-grade security and end-to-end encryption.
                    </p>
                  </div>
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
