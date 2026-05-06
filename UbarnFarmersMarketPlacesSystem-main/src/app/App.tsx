import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Toaster } from "sonner";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <CartProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right" richColors />
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}