import { ShoppingCart, Heart, Search, Filter, Star, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const initialListings = [
  {
    id: 1,
    seller: "Green Valley Farm",
    product: "Organic Tomatoes",
    price: "KES 120/kg",
    location: "Nairobi",
    rating: 4.8,
    reviews: 45,
    image: "https://images.unsplash.com/photo-1767978529638-ff1faefa00c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwdG9tYXRvZXMlMjBoYXJ2ZXN0fGVufDF8fHx8MTc3MzMwNzM5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    inStock: true,
  },
  {
    id: 2,
    seller: "Sunrise Dairy",
    product: "Fresh Milk",
    price: "KES 100/liter",
    location: "Nakuru",
    rating: 4.9,
    reviews: 78,
    image: "https://images.unsplash.com/photo-1719532520242-a809140b313d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWlyeSUyMGZhcm0lMjBmcmVzaCUyMG1pbGt8ZW58MXx8fHwxNzczMjE2NTkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    inStock: true,
  },
  {
    id: 3,
    seller: "Highland Farms",
    product: "Sweet Potatoes",
    price: "KES 70/kg",
    location: "Eldoret",
    rating: 4.7,
    reviews: 32,
    image: "https://images.unsplash.com/photo-1741112480266-62def497fa27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2VldCUyMHBvdGF0b2VzJTIwaGFydmVzdHxlbnwxfHx8fDE3NzMzMDczOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    inStock: true,
  },
  {
    id: 4,
    seller: "Golden Harvest",
    product: "Fresh Maize",
    price: "KES 60/kg",
    location: "Kitale",
    rating: 4.6,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1571342574841-80ba1dfc8d4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JuJTIwbWFpemUlMjBoYXJ2ZXN0fGVufDF8fHx8MTc3MzMwNzM5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    inStock: true,
  },
  {
    id: 5,
    seller: "Green Acres",
    product: "Green Cabbage",
    price: "KES 80/kg",
    location: "Naivasha",
    rating: 4.9,
    reviews: 91,
    image: "https://images.unsplash.com/photo-1555447740-6a812da65e7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGNhYmJhZ2UlMjB2ZWdldGFibGVzfGVufDF8fHx8MTc3MzMwNzM5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    inStock: true,
  },
  {
    id: 6,
    seller: "Happy Hen Farm",
    product: "Brown Eggs",
    price: "KES 15/piece",
    location: "Kiambu",
    rating: 5.0,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1664339307400-9c22e5f44496?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGJyb3duJTIwZWdnc3xlbnwxfHx8fDE3NzMzMDczOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    inStock: true,
  },
];

export default function MarketPlace() {
  const [listings, setListings] = useState(initialListings);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const categories = ["All", "Vegetables", "Fruits", "Grains", "Dairy", "Poultry", "Livestock"];

  const filteredListings = listings.filter(listing => {
    const matchesCategory = selectedCategory === "All" || listing.product.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = listing.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          listing.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          listing.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    toast.success(`Showing ${category === "All" ? "all products" : category}`);
  };

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fav => fav !== id));
      toast.info("Removed from favorites");
    } else {
      setFavorites([...favorites, id]);
      toast.success("Added to favorites!");
    }
  };

  const addToCart = (listing: typeof initialListings[0]) => {
    if (!cart.includes(listing.id)) {
      setCart([...cart, listing.id]);
      toast.success(`${listing.product} added to cart!`);
    } else {
      toast.info("Already in cart");
    }
  };

  const handleLoadMore = () => {
    toast.info("Loading more products...");
  };

  const handleFilters = () => {
    setShowFilters(!showFilters);
    toast.info(showFilters ? "Filters hidden" : "Filters shown");
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 relative rounded-2xl overflow-hidden p-8 bg-gradient-to-r from-emerald-800/80 to-emerald-700/80 backdrop-blur-sm">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1549248581-cf105cd081f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBtYXJrZXQlMjBwcm9kdWNlfGVufDF8fHx8MTc3MzI5NjUyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')"
          }}
        />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Market Place</h1>
            <p className="text-emerald-200">Buy and sell agricultural products</p>
          </div>
          {cart.length > 0 && (
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
              <p className="text-white font-semibold">Cart: {cart.length} items</p>
            </div>
          )}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products, sellers, locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 pl-12 pr-4 py-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={handleFilters}
          className={`px-6 py-3 rounded-lg flex items-center gap-2 border border-white/20 transition-all ${
            showFilters ? "bg-emerald-600 text-white" : "bg-white/10 hover:bg-white/20 text-white"
          }`}
        >
          <Filter className="w-5 h-5" />
          <span className="font-medium">Filters</span>
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 mb-8">
          <h3 className="text-white font-bold text-lg mb-4">Filter Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-emerald-200 text-sm mb-2">Price Range</label>
              <select className="w-full bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500 [&>option]:bg-emerald-900 [&>option]:text-white">
                <option>All Prices</option>
                <option>Under KES 50</option>
                <option>KES 50-100</option>
                <option>Above KES 100</option>
              </select>
            </div>
            <div>
              <label className="block text-emerald-200 text-sm mb-2">Rating</label>
              <select className="w-full bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500 [&>option]:bg-emerald-900 [&>option]:text-white">
                <option>All Ratings</option>
                <option>4+ Stars</option>
                <option>3+ Stars</option>
              </select>
            </div>
            <div>
              <label className="block text-emerald-200 text-sm mb-2">Location</label>
              <select className="w-full bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500 [&>option]:bg-emerald-900 [&>option]:text-white">
                <option>All Locations</option>
                <option>Nairobi</option>
                <option>Nakuru</option>
                <option>Eldoret</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
              selectedCategory === category
                ? "bg-emerald-600 text-white shadow-lg"
                : "bg-white/10 text-emerald-200 hover:bg-white/20"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Results Info */}
      <div className="mb-4">
        <p className="text-emerald-200">
          Showing {filteredListings.length} of {listings.length} products
          {searchTerm && ` for "${searchTerm}"`}
        </p>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((listing) => (
          <div
            key={listing.id}
            className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/10 transition-all border border-white/10 hover:border-emerald-500/50 hover:shadow-xl group"
          >
            {/* Product Image */}
            <div
              className="h-48 relative bg-cover bg-center"
              style={{ backgroundImage: `url(${listing.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <button
                onClick={() => toggleFavorite(listing.id)}
                className={`absolute top-3 right-3 backdrop-blur-sm p-2 rounded-full transition-all z-10 ${
                  favorites.includes(listing.id)
                    ? "bg-red-500/80 hover:bg-red-600"
                    : "bg-white/20 hover:bg-white/30"
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${
                    favorites.includes(listing.id) ? "text-white fill-white" : "text-white"
                  }`}
                />
              </button>
              {listing.inStock && (
                <span className="absolute top-3 left-3 bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
                  In Stock
                </span>
              )}
            </div>

            {/* Product Info */}
            <div className="p-5">
              <div className="mb-3">
                <h3 className="text-white font-bold text-lg mb-1">{listing.product}</h3>
                <p className="text-emerald-300 text-sm">{listing.seller}</p>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-white font-semibold text-sm">{listing.rating}</span>
                </div>
                <span className="text-gray-400 text-sm">({listing.reviews} reviews)</span>
              </div>

              <p className="text-gray-400 text-sm mb-4">📍 {listing.location}</p>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-white">{listing.price}</p>
                </div>
                <button
                  onClick={() => addToCart(listing)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                    cart.includes(listing.id)
                      ? "bg-gray-600 text-white"
                      : "bg-emerald-600 hover:bg-emerald-700 text-white"
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span className="text-sm font-semibold">
                    {cart.includes(listing.id) ? "In Cart" : "Add to Cart"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredListings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No products found matching your criteria</p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
            }}
            className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-semibold transition-all"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Load More */}
      {filteredListings.length > 0 && (
        <div className="mt-8 text-center">
          <button
            onClick={handleLoadMore}
            className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-semibold transition-all border border-white/20"
          >
            Load More Products
          </button>
        </div>
      )}
    </div>
  );
}