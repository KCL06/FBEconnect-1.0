import { useState } from "react";
import { Package, Truck, CheckCircle, Clock, MapPin, Phone, X } from "lucide-react";
import { toast } from "sonner";

type OrderStatus = "Pending" | "Processing" | "In Transit" | "Delivered";
type FilterTab = "All Orders" | OrderStatus;

const initialOrders = [
  {
    id: "ORD-001",
    product: "Organic Tomatoes",
    quantity: "100 kg",
    buyer: "John Mwangi",
    phone: "+254 712 345 678",
    status: "In Transit" as OrderStatus,
    orderDate: "April 13, 2026",
    deliveryDate: "April 15, 2026",
    location: "Nairobi - En route",
    progress: 60,
  },
  {
    id: "ORD-002",
    product: "Fresh Maize",
    quantity: "200 kg",
    buyer: "Sarah Wanjiru",
    phone: "+254 723 456 789",
    status: "Delivered" as OrderStatus,
    orderDate: "April 11, 2026",
    deliveryDate: "April 13, 2026",
    location: "Kiambu - Delivered",
    progress: 100,
  },
  {
    id: "ORD-003",
    product: "Green Cabbage",
    quantity: "80 kg",
    buyer: "David Ochieng",
    phone: "+254 734 567 890",
    status: "Processing" as OrderStatus,
    orderDate: "April 14, 2026",
    deliveryDate: "April 16, 2026",
    location: "Farm - Preparing",
    progress: 25,
  },
  {
    id: "ORD-004",
    product: "Fresh Milk",
    quantity: "150 liters",
    buyer: "Grace Akinyi",
    phone: "+254 745 678 901",
    status: "Pending" as OrderStatus,
    orderDate: "April 15, 2026",
    deliveryDate: "April 16, 2026",
    location: "Awaiting Pickup",
    progress: 10,
  },
];

const trackingStepsFor = (status: OrderStatus) => {
  const steps = [
    { label: "Order Placed", icon: CheckCircle },
    { label: "Processing", icon: Package },
    { label: "In Transit", icon: Truck },
    { label: "Delivered", icon: CheckCircle },
  ];
  const completedCount =
    status === "Pending" ? 1 :
    status === "Processing" ? 2 :
    status === "In Transit" ? 3 :
    4;
  return steps.map((s, i) => ({ ...s, completed: i < completedCount }));
};

const statusColors: Record<OrderStatus, string> = {
  Delivered: "bg-emerald-900/50 text-emerald-300",
  "In Transit": "bg-purple-900/50 text-purple-300",
  Processing: "bg-blue-900/50 text-blue-300",
  Pending: "bg-amber-900/50 text-amber-300",
};

const filterTabs: FilterTab[] = ["All Orders", "Pending", "Processing", "In Transit", "Delivered"];

export default function OrderTracking() {
  const [orders, setOrders] = useState(initialOrders);
  const [activeFilter, setActiveFilter] = useState<FilterTab>("All Orders");
  const [contactModal, setContactModal] = useState<typeof initialOrders[0] | null>(null);
  const [updateModal, setUpdateModal] = useState<typeof initialOrders[0] | null>(null);

  const filtered = activeFilter === "All Orders"
    ? orders
    : orders.filter(o => o.status === activeFilter);

  const counts = {
    Pending: orders.filter(o => o.status === "Pending").length,
    Processing: orders.filter(o => o.status === "Processing").length,
    "In Transit": orders.filter(o => o.status === "In Transit").length,
    Delivered: orders.filter(o => o.status === "Delivered").length,
  };

  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    const progressMap: Record<OrderStatus, number> = {
      Pending: 10,
      Processing: 25,
      "In Transit": 60,
      Delivered: 100,
    };
    setOrders(prev =>
      prev.map(o =>
        o.id === orderId
          ? { ...o, status: newStatus, progress: progressMap[newStatus] }
          : o
      )
    );
    toast.success(`Order ${orderId} status updated to ${newStatus}`);
    setUpdateModal(null);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Order Tracking</h1>
        <p className="text-emerald-200">Track and manage your orders in real-time</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {(["Pending", "Processing", "In Transit", "Delivered"] as OrderStatus[]).map((status) => {
          const icons = { Pending: Clock, Processing: Package, "In Transit": Truck, Delivered: CheckCircle };
          const colors = {
            Pending: "from-amber-600 to-amber-700",
            Processing: "from-blue-600 to-blue-700",
            "In Transit": "from-purple-600 to-purple-700",
            Delivered: "from-emerald-600 to-emerald-700",
          };
          const Icon = icons[status];
          return (
            <button
              key={status}
              onClick={() => setActiveFilter(activeFilter === status ? "All Orders" : status)}
              className={`bg-gradient-to-br ${colors[status]} rounded-xl p-6 text-white text-left transition-all hover:scale-105 ${
                activeFilter === status ? "ring-2 ring-white/50 scale-105" : ""
              }`}
            >
              <Icon className="w-8 h-8 mb-3 opacity-80" />
              <p className="text-sm opacity-80 mb-1">{status}</p>
              <p className="text-3xl font-bold">{counts[status]}</p>
            </button>
          );
        })}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
              activeFilter === tab
                ? "bg-emerald-600 text-white shadow-lg"
                : "bg-white/10 text-emerald-200 hover:bg-white/20"
            }`}
          >
            {tab}
            {tab !== "All Orders" && (
              <span className="ml-2 text-xs opacity-70">({counts[tab as OrderStatus]})</span>
            )}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {filtered.length === 0 && (
          <div className="bg-white/5 rounded-xl p-12 text-center text-gray-400 border border-white/10">
            No orders found for this filter.
          </div>
        )}
        {filtered.map((order) => {
          const steps = trackingStepsFor(order.status);
          return (
            <div
              key={order.id}
              className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden hover:border-emerald-500/50 transition-all"
            >
              {/* Order Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-white font-bold text-lg">{order.product}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-1">Order ID: {order.id}</p>
                    <p className="text-emerald-300 text-sm">Quantity: {order.quantity}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setContactModal(order)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-all"
                    >
                      <Phone className="w-4 h-4" />
                      Contact Buyer
                    </button>
                    {order.status !== "Delivered" && (
                      <button
                        onClick={() => setUpdateModal(order)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-all"
                      >
                        Update Status
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400 mb-1">Buyer</p>
                    <p className="text-white font-medium">{order.buyer}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Order Date</p>
                    <p className="text-white font-medium">{order.orderDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Expected Delivery</p>
                    <p className="text-white font-medium">{order.deliveryDate}</p>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="p-6 bg-white/5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">{order.location}</span>
                  </div>
                  <span className="text-white text-sm font-semibold">{order.progress}%</span>
                </div>
                <div className="bg-white/10 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-700"
                    style={{ width: `${order.progress}%` }}
                  />
                </div>
              </div>

              {/* Tracking Timeline */}
              <div className="p-6 border-t border-white/10">
                <div className="flex items-center justify-between relative">
                  {/* connector line */}
                  <div className="absolute top-5 left-5 right-5 h-0.5 bg-white/10 z-0" />
                  <div
                    className="absolute top-5 left-5 h-0.5 bg-emerald-600 z-0 transition-all duration-700"
                    style={{ width: `${((steps.filter(s => s.completed).length - 1) / (steps.length - 1)) * (100 - 10)}%` }}
                  />
                  {steps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <div key={index} className="flex flex-col items-center flex-1 relative z-10">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                            step.completed ? "bg-emerald-600" : "bg-white/10"
                          }`}
                        >
                          <Icon className={`w-5 h-5 ${step.completed ? "text-white" : "text-gray-500"}`} />
                        </div>
                        <p className={`text-xs text-center ${step.completed ? "text-white font-medium" : "text-gray-400"}`}>
                          {step.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Contact Modal */}
      {contactModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-emerald-900 border border-emerald-700/50 rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Contact Buyer</h2>
              <button onClick={() => setContactModal(null)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="bg-white/5 rounded-xl p-4 mb-6">
              <p className="text-emerald-300 text-sm mb-1">Order: {contactModal.id}</p>
              <p className="text-white font-bold text-lg">{contactModal.buyer}</p>
              <div className="flex items-center gap-2 mt-3">
                <Phone className="w-5 h-5 text-emerald-400" />
                <span className="text-white">{contactModal.phone}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  toast.success(`Calling ${contactModal.buyer}...`);
                  setContactModal(null);
                }}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </button>
              <button
                onClick={() => {
                  toast.success(`Message sent to ${contactModal.buyer}`);
                  setContactModal(null);
                }}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg font-semibold transition-all"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Status Modal */}
      {updateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-emerald-900 border border-emerald-700/50 rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Update Order Status</h2>
              <button onClick={() => setUpdateModal(null)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-gray-300 mb-6">
              Order <span className="text-white font-semibold">{updateModal.id}</span> — {updateModal.product}
            </p>
            <div className="space-y-3">
              {(["Pending", "Processing", "In Transit", "Delivered"] as OrderStatus[]).map((status) => (
                <button
                  key={status}
                  onClick={() => handleUpdateStatus(updateModal.id, status)}
                  className={`w-full py-3 px-4 rounded-lg text-left font-medium transition-all ${
                    updateModal.status === status
                      ? "bg-emerald-600 text-white cursor-default"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {updateModal.status === status ? "✓ " : ""}{status}
                  {updateModal.status === status && " (Current)"}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
