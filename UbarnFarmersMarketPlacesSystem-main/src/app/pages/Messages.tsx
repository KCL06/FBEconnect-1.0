import { Search, Send, Paperclip, Phone, Video } from "lucide-react";
import { useState } from "react";

const conversations = [
  {
    id: 1,
    name: "John Mwangi",
    lastMessage: "I'm interested in buying 100kg of maize",
    time: "2h ago",
    unread: 2,
    avatar: "👨🏾‍🌾",
  },
  {
    id: 2,
    name: "Sarah Wanjiru",
    lastMessage: "When will the tomatoes be ready?",
    time: "5h ago",
    unread: 0,
    avatar: "👩🏾",
  },
  {
    id: 3,
    name: "David Ochieng",
    lastMessage: "Thank you for the quality products!",
    time: "1d ago",
    unread: 0,
    avatar: "👨🏿‍💼",
  },
  {
    id: 4,
    name: "Grace Akinyi",
    lastMessage: "Can we negotiate the price?",
    time: "2d ago",
    unread: 1,
    avatar: "👩🏾‍💼",
  },
];

const messages = [
  {
    id: 1,
    sender: "John Mwangi",
    text: "Hello, I saw your listing for maize",
    time: "10:30 AM",
    isOwn: false,
  },
  {
    id: 2,
    sender: "You",
    text: "Hi John! Yes, I have fresh maize available.",
    time: "10:32 AM",
    isOwn: true,
  },
  {
    id: 3,
    sender: "John Mwangi",
    text: "I'm interested in buying 100kg of maize. What's your best price?",
    time: "10:35 AM",
    isOwn: false,
  },
  {
    id: 4,
    sender: "You",
    text: "For 100kg, I can offer KES 60 per kg. That's KES 6,000 total.",
    time: "10:37 AM",
    isOwn: true,
  },
];

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState(conversations[0]);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-white mb-2">Messages</h1>
        <p className="text-emerald-200">Chat with buyers and sellers</p>
      </div>

      {/* Messages Container */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 h-[calc(100vh-250px)] flex">
        {/* Conversations List */}
        <div className="w-80 border-r border-white/10 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-white/10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full bg-white/10 text-white placeholder-gray-400 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedChat(conv)}
                className={`p-4 border-b border-white/5 cursor-pointer transition-colors ${
                  selectedChat.id === conv.id
                    ? "bg-emerald-900/30"
                    : "hover:bg-white/5"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{conv.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="text-white font-semibold truncate">
                        {conv.name}
                      </h4>
                      <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                        {conv.time}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-400 truncate">
                        {conv.lastMessage}
                      </p>
                      {conv.unread > 0 && (
                        <span className="bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-2">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{selectedChat.avatar}</div>
              <div>
                <h3 className="text-white font-semibold">{selectedChat.name}</h3>
                <p className="text-xs text-emerald-300">Active now</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Phone className="w-5 h-5 text-emerald-300" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Video className="w-5 h-5 text-emerald-300" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] ${
                    message.isOwn
                      ? "bg-emerald-600 text-white"
                      : "bg-white/10 text-white"
                  } rounded-lg p-3`}
                >
                  <p className="text-sm mb-1">{message.text}</p>
                  <p
                    className={`text-xs ${
                      message.isOwn ? "text-emerald-200" : "text-gray-400"
                    }`}
                  >
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Paperclip className="w-5 h-5 text-emerald-300" />
              </button>
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 bg-white/10 text-white placeholder-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button className="bg-emerald-600 hover:bg-emerald-700 p-2 rounded-lg transition-colors">
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
