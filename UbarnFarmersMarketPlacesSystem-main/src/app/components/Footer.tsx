import { Link } from "react-router";
import { Mail, Phone, Facebook, Twitter, Instagram, Leaf, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-emerald-950 to-emerald-900 text-white border-t border-emerald-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">AgroLink</span>
            </Link>
            <p className="text-emerald-300 text-sm leading-relaxed max-w-md mb-4">
              Connecting farmers, buyers, and agricultural experts to create a sustainable
              farming ecosystem. Empowering agricultural communities through technology
              and knowledge sharing.
            </p>
            {/* Social Media */}
            <div className="flex items-center gap-3">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Instagram, label: "Instagram" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 bg-emerald-800 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-all hover:scale-110"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-base text-white mb-4 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/app", label: "Dashboard" },
                { to: "/app/marketplace", label: "Marketplace" },
                { to: "/app/expert-knowledge", label: "Expert Knowledge" },
                { to: "/app/market-prices", label: "Market Prices" },
                { to: "/register", label: "Get Started" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-emerald-300 hover:text-white transition-colors text-sm hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-base text-white mb-4 uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-emerald-300 text-sm">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a href="mailto:support@agrolink.com" className="hover:text-white transition-colors">
                  support@agrolink.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-emerald-300 text-sm">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a href="tel:+254700000000" className="hover:text-white transition-colors">
                  +254 700 000 000
                </a>
              </li>
              <li className="flex items-start gap-2 text-emerald-300 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Nairobi, Kenya</span>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="text-sm font-semibold text-white mb-2">Newsletter</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-emerald-800/60 border border-emerald-700 text-white placeholder-emerald-400 text-sm px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm transition-all font-medium">
                  Go
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-emerald-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-emerald-400 text-sm">
            &copy; {currentYear} AgroLink. All rights reserved. Empowering agricultural communities.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-emerald-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-emerald-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
