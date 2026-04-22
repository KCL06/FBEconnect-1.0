import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import MyFarmRecords from "./pages/MyFarmRecords";
import Products from "./pages/Products";
import MarketPrices from "./pages/MarketPrices";
import Consultations from "./pages/Consultations";
import Messages from "./pages/Messages";
import MarketPlace from "./pages/MarketPlace";
import Transaction from "./pages/Transaction";
import Notification from "./pages/Notification";
import AdminDashboard from "./pages/AdminDashboard";
import ReviewsRatings from "./pages/ReviewsRatings";
import OrderTracking from "./pages/OrderTracking";
import UserFeedback from "./pages/UserFeedback";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import ExpertKnowledge from "./pages/ExpertKnowledge";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterFarmer from "./pages/RegisterFarmer";
import RegisterBuyer from "./pages/RegisterBuyer";
import RegisterExpert from "./pages/RegisterExpert";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/register/farmer",
    Component: RegisterFarmer,
  },
  {
    path: "/register/buyer",
    Component: RegisterBuyer,
  },
  {
    path: "/register/expert",
    Component: RegisterExpert,
  },
  {
    path: "/app",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "farm-records", Component: MyFarmRecords },
      { path: "products", Component: Products },
      { path: "market-prices", Component: MarketPrices },
      { path: "consultations", Component: Consultations },
      { path: "messages", Component: Messages },
      { path: "marketplace", Component: MarketPlace },
      { path: "transaction", Component: Transaction },
      { path: "notification", Component: Notification },
      { path: "admin", Component: AdminDashboard },
      { path: "reviews", Component: ReviewsRatings },
      { path: "order-tracking", Component: OrderTracking },
      { path: "user-feedback", Component: UserFeedback },
      { path: "settings", Component: Settings },
      { path: "profile", Component: Profile },
      // Expert Knowledge is now inside /app so it gets the sidebar + header/footer
      { path: "expert-knowledge", Component: ExpertKnowledge },
    ],
  },
]);
