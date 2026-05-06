import { Link, useNavigate } from "react-router";
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, PackageCheck, Tag, MapPin, Star, ShoppingBag, AlertCircle } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../../lib/supabase";
import { toast } from "sonner";
import { useState } from "react";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    if (!profile) {
      toast.error("You must be logged in to place an order.");
      return;
    }
    
    setIsOrdering(true);
    try {
      // 1. Create the order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          buyer_id: profile.id,
          status: 'pending',
          total_amount: totalPrice,
          notes: 'Placed via Cart'
        })
        .select()
        .single();
        
      if (orderError) throw orderError;
      
      // 2. Insert order items
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: typeof item.id === "number" ? null : item.id, // only include uuid products
        quantity: item.quantity,
        price_at_purchase: item.price
      })).filter(oi => oi.product_id !== null); // skip static demo items
      
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);
        
      if (itemsError) throw itemsError;

      setIsOrdering(false);
      setOrderPlaced(true);
      clearCart();
      toast.success("Order placed successfully! You will be notified once confirmed.");
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to place order: " + err.message);
      setIsOrdering(false);
    }
  };

  // ── Empty Cart ──────────────────────────────────────────────────────────────
  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-24 h-24 bg-emerald-800/40 rounded-full flex items-center justify-center mb-6">
          <ShoppingCart className="w-12 h-12 text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Your Cart is Empty</h2>
        <p className="text-emerald-300 mb-8 max-w-sm">
          Browse the marketplace and add products you'd like to order from local farmers.
        </p>
        <Link
          to="/app/marketplace"
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg"
        >
          <ShoppingBag className="w-5 h-5" />
          Browse Marketplace
        </Link>
      </div>
    );
  }

  // ── Order Success ───────────────────────────────────────────────────────────
  if (orderPlaced) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-24 h-24 bg-emerald-600/40 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <PackageCheck className="w-14 h-14 text-emerald-300" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-3">Order Placed!</h2>
        <p className="text-emerald-200 mb-2 max-w-sm text-lg">
          Your order has been submitted successfully.
        </p>
        <p className="text-emerald-400 text-sm mb-8">
          The farmer will confirm your order shortly. Track it under <strong>Order Tracking</strong>.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/app/order-tracking"
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-semibold transition-all"
          >
            <MapPin className="w-5 h-5" />
            Track My Order
          </Link>
          <Link
            to="/app/marketplace"
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all"
          >
            <ShoppingBag className="w-5 h-5" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // ── Cart with Items ─────────────────────────────────────────────────────────
  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="text-emerald-300 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white">My Cart</h1>
            <p className="text-emerald-300 text-sm mt-0.5">{totalItems} item{totalItems !== 1 ? "s" : ""} ready to order</p>
          </div>
        </div>
        <button
          onClick={clearCart}
          className="flex items-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 px-3 py-2 rounded-lg transition-all text-sm font-medium border border-red-800/40"
        >
          <Trash2 className="w-4 h-4" />
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* ── Cart Items ── */}
        <div className="xl:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-emerald-500/30 transition-all overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row gap-0">
                {/* Product Image */}
                <div
                  className="sm:w-40 h-36 sm:h-auto bg-cover bg-center flex-shrink-0"
                  style={{ backgroundImage: `url(${item.image})` }}
                />

                {/* Product Details */}
                <div className="flex-1 p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg">{item.name}</h3>
                      <p className="text-emerald-400 text-sm mt-0.5">{item.seller}</p>

                      <div className="flex flex-wrap items-center gap-3 mt-2">
                        {/* Location */}
                        <span className="flex items-center gap-1 text-emerald-300 text-xs">
                          <MapPin className="w-3 h-3" /> {item.location}
                        </span>
                        {/* Rating */}
                        <span className="flex items-center gap-1 text-yellow-400 text-xs">
                          <Star className="w-3 h-3 fill-yellow-400" /> {item.rating}
                        </span>
                        {/* Availability */}
                        <span className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${item.inStock ? "bg-emerald-800/60 text-emerald-300" : "bg-red-900/40 text-red-400"}`}>
                          {item.inStock ? "✓ In Stock" : "✗ Out of Stock"}
                        </span>
                        {/* Available qty */}
                        <span className="flex items-center gap-1 text-emerald-400 text-xs">
                          <Tag className="w-3 h-3" /> {item.availableQty} {item.unit} available
                        </span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right flex-shrink-0">
                      <p className="text-emerald-400 text-xs">{item.priceLabel}</p>
                      <p className="text-white font-bold text-xl">
                        KES {(item.price * item.quantity).toLocaleString()}
                      </p>
                      <p className="text-emerald-400 text-xs">
                        KES {item.price.toLocaleString()} × {item.quantity}
                      </p>
                    </div>
                  </div>

                  {/* Quantity Controls + Remove */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-3">
                      <span className="text-emerald-300 text-sm font-medium">Quantity:</span>
                      <div className="flex items-center gap-2 bg-emerald-900/60 rounded-xl border border-white/10 p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-white transition-all disabled:opacity-40"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-white font-bold min-w-[2rem] text-center text-lg">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-white transition-all disabled:opacity-40"
                          disabled={item.quantity >= item.availableQty}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      {item.quantity >= item.availableQty && (
                        <span className="flex items-center gap-1 text-amber-400 text-xs">
                          <AlertCircle className="w-3 h-3" /> Max stock reached
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="flex items-center gap-1.5 text-red-400 hover:text-red-300 hover:bg-red-900/20 px-3 py-2 rounded-lg transition-all text-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Order Summary ── */}
        <div className="xl:col-span-1">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sticky top-24">
            <h2 className="text-xl font-bold text-white mb-5">Order Summary</h2>

            {/* Item Breakdown */}
            <div className="space-y-3 mb-5">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-emerald-300 truncate max-w-[180px]">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="text-white font-medium flex-shrink-0">
                    KES {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-white/10 my-4" />

            {/* Totals */}
            <div className="space-y-2 mb-5">
              <div className="flex justify-between text-sm text-emerald-300">
                <span>Subtotal ({totalItems} item{totalItems !== 1 ? "s" : ""})</span>
                <span>KES {totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-emerald-300">
                <span>Delivery</span>
                <span className="text-emerald-400">Negotiated with seller</span>
              </div>
              <div className="flex justify-between font-bold text-white text-lg pt-2 border-t border-white/10">
                <span>Total</span>
                <span>KES {totalPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Delivery Note */}
            <div className="bg-emerald-900/40 border border-emerald-700/40 rounded-xl p-3 mb-5">
              <p className="text-emerald-200 text-xs leading-relaxed">
                📦 Delivery terms will be confirmed directly with the farmer after placing your order.
              </p>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={isOrdering}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-emerald-500/25 text-lg"
            >
              {isOrdering ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Placing Order...
                </>
              ) : (
                <>
                  <PackageCheck className="w-5 h-5" />
                  Place Order · KES {totalPrice.toLocaleString()}
                </>
              )}
            </button>

            {/* Continue Shopping */}
            <Link
              to="/app/marketplace"
              className="w-full flex items-center justify-center gap-2 mt-3 text-emerald-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl transition-all font-medium text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
