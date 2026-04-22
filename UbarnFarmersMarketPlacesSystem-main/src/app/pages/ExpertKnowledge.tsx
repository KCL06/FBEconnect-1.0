import { useState } from "react";
import { Search, ThumbsUp, ThumbsDown, BookOpen, Filter, ChevronRight } from "lucide-react";
import { Link } from "react-router";

const categories = [
  { name: "Pest Management", count: 12 },
  { name: "Soil Health", count: 8 },
  { name: "Organic Farming", count: 15 },
  { name: "Plant Diseases", count: 10 },
  { name: "Seasonal Planting", count: 9 },
  { name: "Irrigation", count: 7 },
  { name: "Harvest Tips", count: 11 },
  { name: "Composting", count: 6 },
];

const browseByTags = [
  ["Crop Rotation", "Soil Testing"],
  ["Pest Control", "Veggies"],
  ["Sustainable", "Insects"],
  ["Irrigation", "Soil Fertility"],
];

const articles = [
  { id: 1, title: "Integrated Pest Management – Best Practices", category: "Pest Management", author: "Dr. John Makori", date: "2 days ago", rating: 5, color: "from-red-800 to-red-700" },
  { id: 2, title: "Improving Soil Health for Better Yields", category: "Soil Health", author: "Dr. Grace Achieng", date: "4 days ago", rating: 5, color: "from-amber-800 to-amber-700" },
  { id: 3, title: "Organic Farming Techniques for Beginners", category: "Organic Farming", author: "Prof. Samuel Njau", date: "1 week ago", rating: 4, color: "from-emerald-800 to-emerald-700" },
  { id: 4, title: "Early Detection of Common Plant Diseases", category: "Plant Diseases", author: "Dr. John Makori", date: "1 week ago", rating: 5, color: "from-purple-800 to-purple-700" },
];

const popularTopics = [
  { id: 1, title: "Crop Rotation", subtitle: "Beginner guide to crop rotation" },
  { id: 2, title: "Soil Testing", subtitle: "Essential soil testing techniques" },
  { id: 3, title: "Insect Pest Control", subtitle: "Effective control of garden insects" },
  { id: 4, title: "Composting", subtitle: "Building a healthy compost system" },
];

const topExperts = [
  { name: "Dr. Emily Wangari", specialty: "Pest Expert", color: "bg-orange-500" },
  { name: "Dr. Samuel Njau", specialty: "Soil Specialist", color: "bg-emerald-600" },
  { name: "Prof. Grace Achieng", specialty: "Organic Farming", color: "bg-purple-600" },
];

const featuredGuides = [
  { title: "Sustainable pest control techniques", color: "from-yellow-700 to-yellow-600" },
  { title: "Preventing powdery mildew on vegetables", color: "from-green-800 to-green-700" },
  { title: "Best crops for dry and rainy seasons", color: "from-blue-800 to-blue-700" },
];

export default function ExpertKnowledge() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8 relative rounded-2xl overflow-hidden p-8 bg-gradient-to-r from-emerald-800/80 to-emerald-700/80 backdrop-blur-sm">
        <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1582794496242-8165eed32971?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')" }} />
        <div className="relative z-10 text-center">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 bg-emerald-600/60 rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-emerald-200" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Expert Knowledge Library</h1>
          <p className="text-emerald-200 max-w-2xl mx-auto">
            Farming knowledge, guides and tips curated by agricultural experts to help you grow better.
            Browse articles or submit your own question for expert advice.
          </p>
          <button className="mt-5 px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-lg transition-all font-semibold">
            Submit A Question
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles, guides & topics..."
            className="w-full pl-12 pr-12 py-3.5 bg-white/10 border border-white/20 text-white placeholder-emerald-300/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 backdrop-blur-sm"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-300 hover:text-white transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar – Categories + Tags */}
        <div className="lg:col-span-1 space-y-5">
          {/* Categories */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5">
            <h3 className="text-lg font-bold text-white mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <button
                    onClick={() => setActiveCategory(activeCategory === cat.name ? null : cat.name)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all text-sm ${activeCategory === cat.name ? "bg-emerald-700 text-white" : "text-emerald-200 hover:bg-emerald-800/40 hover:text-white"}`}
                  >
                    <span>{cat.name}</span>
                    <span className="w-6 h-6 bg-emerald-600/60 rounded-full flex items-center justify-center text-xs font-semibold">{cat.count}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Browse by Tags */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5">
            <h3 className="text-lg font-bold text-white mb-4">Browse By Tags</h3>
            <div className="space-y-2">
              {browseByTags.map((row, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-2 gap-2">
                  {row.map((tag) => (
                    <button key={tag} className="px-3 py-2 bg-emerald-800/60 hover:bg-emerald-700 text-emerald-200 hover:text-white rounded-lg transition-all text-xs font-medium border border-emerald-700/30">
                      {tag}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Top Experts */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5">
            <h3 className="text-lg font-bold text-white mb-4">Top Experts</h3>
            <div className="space-y-3">
              {topExperts.map((expert) => (
                <div key={expert.name} className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${expert.color} rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                    {expert.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{expert.name}</p>
                    <p className="text-emerald-400 text-xs">{expert.specialty}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content – Articles + Guides */}
        <div className="lg:col-span-3 space-y-8">
          {/* Articles Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Latest Articles</h2>
              <button className="text-emerald-400 hover:text-white text-sm transition-colors flex items-center gap-1">
                View all <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {articles.map((article) => (
                <div key={article.id} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all hover:border-emerald-500/40 group cursor-pointer">
                  <div className={`h-36 bg-gradient-to-br ${article.color} flex items-center justify-center`}>
                    <BookOpen className="w-10 h-10 text-white/40" />
                  </div>
                  <div className="p-4">
                    <span className="inline-block px-2 py-0.5 bg-emerald-700/60 text-emerald-200 text-xs rounded-md mb-2 font-medium">
                      {article.category}
                    </span>
                    <h4 className="font-semibold text-white mb-2 group-hover:text-emerald-300 transition-colors">{article.title}</h4>
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < article.rating ? "text-yellow-400" : "text-gray-600"}>★</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-emerald-300">
                      <span>{article.author}</span>
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="w-7 h-7 bg-emerald-800 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {article.author.split(" ")[2]?.charAt(0) || article.author.charAt(0)}
                      </div>
                      <div className="flex gap-2">
                        <button className="p-1.5 hover:bg-emerald-700/40 rounded-lg text-emerald-300 hover:text-white transition-all">
                          <ThumbsUp className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 hover:bg-red-700/40 rounded-lg text-emerald-300 hover:text-red-400 transition-all">
                          <ThumbsDown className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Guides */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Featured Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {featuredGuides.map((guide) => (
                <div key={guide.title} className="rounded-xl overflow-hidden shadow-md cursor-pointer group hover:scale-105 transition-transform">
                  <div className={`h-40 bg-gradient-to-br ${guide.color} flex items-center justify-center`}>
                    <BookOpen className="w-10 h-10 text-white/50 group-hover:text-white/80 transition-colors" />
                  </div>
                  <div className="p-4 bg-white/5 border border-white/10 border-t-0">
                    <p className="text-white font-medium text-sm leading-tight">{guide.title}</p>
                    <div className="flex items-center gap-1 mt-2 text-emerald-400 text-xs font-medium">
                      Read guide <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Topics */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            <h2 className="text-xl font-bold text-white mb-5">Popular Topics</h2>
            <ol className="space-y-4">
              {popularTopics.map((topic) => (
                <li key={topic.id} className="flex items-start gap-4 pb-4 border-b border-white/10 last:border-0 last:pb-0">
                  <span className="w-8 h-8 bg-emerald-700/60 rounded-full flex items-center justify-center text-emerald-200 font-bold text-sm flex-shrink-0">
                    {topic.id}
                  </span>
                  <div>
                    <p className="font-semibold text-white">{topic.title}</p>
                    <p className="text-emerald-300 text-sm mt-0.5">{topic.subtitle}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-emerald-400 ml-auto mt-1 flex-shrink-0" />
                </li>
              ))}
            </ol>
          </div>

          {/* Browse All CTA */}
          <div className="text-center">
            <button className="px-12 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full text-lg font-bold shadow-lg hover:shadow-emerald-500/25 transition-all">
              Browse All Articles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
