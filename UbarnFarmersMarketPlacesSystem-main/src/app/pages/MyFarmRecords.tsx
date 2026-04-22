import { Calendar, Sprout, Droplets, Bug, Plus } from "lucide-react";
import { useState } from "react";

const records = [
  {
    id: 1,
    date: "March 8, 2026",
    activity: "Planted tomatoes in field A",
    type: "Planting",
    area: "Field A - 2 acres",
    icon: Sprout,
    color: "bg-emerald-600",
  },
  {
    id: 2,
    date: "March 7, 2026",
    activity: "Applied fertilizer to maize crop",
    type: "Fertilization",
    area: "Field B - 3 acres",
    icon: Droplets,
    color: "bg-blue-600",
  },
  {
    id: 3,
    date: "March 5, 2026",
    activity: "Pest control spray applied",
    type: "Pest Control",
    area: "Field C - 1.5 acres",
    icon: Bug,
    color: "bg-orange-600",
  },
  {
    id: 4,
    date: "March 3, 2026",
    activity: "Irrigation system maintenance",
    type: "Maintenance",
    area: "All Fields",
    icon: Droplets,
    color: "bg-cyan-600",
  },
  {
    id: 5,
    date: "March 1, 2026",
    activity: "Harvested cabbage - 500kg",
    type: "Harvesting",
    area: "Field D - 1 acre",
    icon: Sprout,
    color: "bg-green-700",
  },
  {
    id: 6,
    date: "February 28, 2026",
    activity: "Soil testing completed",
    type: "Analysis",
    area: "Field A & B",
    icon: Calendar,
    color: "bg-purple-600",
  },
];

export default function MyFarmRecords() {
  const [filter, setFilter] = useState<string>("all");

  const filteredRecords = filter === "all" 
    ? records 
    : records.filter(record => record.type.toLowerCase() === filter.toLowerCase());

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 relative rounded-2xl overflow-hidden p-8 bg-gradient-to-r from-emerald-800/80 to-emerald-700/80 backdrop-blur-sm">
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1695566775365-0a2fb08ee4e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFjdG9yJTIwZmFybWluZyUyMGZpZWxkfGVufDF8fHx8MTc3MzI0MzQ2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')"
          }}
        />
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white mb-2">My Farm Records</h1>
          <p className="text-emerald-200">Track all your farming activities</p>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 shadow-lg transition-all hover:shadow-xl">
          <Plus className="w-5 h-5" />
          <span className="font-semibold">Add New Record</span>
        </button>
        
        <div className="flex gap-2 flex-wrap">
          {["all", "planting", "fertilization", "pest control", "harvesting"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === type
                  ? "bg-amber-600 text-white shadow-lg"
                  : "bg-white/10 text-emerald-200 hover:bg-white/20"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Records Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRecords.map((record) => {
          const Icon = record.icon;
          return (
            <div
              key={record.id}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all border border-white/10 hover:border-emerald-500/50"
            >
              <div className="flex items-start gap-4">
                <div className={`${record.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-white font-semibold text-lg">{record.activity}</h3>
                    <span className="text-xs text-emerald-300 bg-emerald-900/30 px-2 py-1 rounded">
                      {record.type}
                    </span>
                  </div>
                  <p className="text-emerald-200 text-sm mb-2">{record.area}</p>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{record.date}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredRecords.length === 0 && (
        <div className="text-center py-12">
          <p className="text-emerald-300 text-lg">No records found for this filter</p>
        </div>
      )}
    </div>
  );
}