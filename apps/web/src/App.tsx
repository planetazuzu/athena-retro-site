import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import CookieConsent from "@/components/CookieConsent";
import useCookies from "@/hooks/useCookies";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Funcionalidades from "./pages/Funcionalidades";
import Guias from "./pages/Guias";
import Descargas from "./pages/Descargas";
import Donaciones from "./pages/Donaciones";
// import Comunidad from "./pages/Comunidad"; // Comentado porque el módulo no se encuentra
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Acerca from "./pages/Acerca";
import Contacto from "./pages/Contacto";
import Terminos from "./pages/Terminos";
import Privacidad from "./pages/Privacidad";
import Admin from "./pages/Admin";
import ComingSoon from "./pages/ComingSoon";
// Páginas de test comentadas temporalmente para el build
// import PaymentTest from "./pages/PaymentTest";
// import StripeTest from "./pages/StripeTest";
// import PayPalTest from "./pages/PayPalTest";
// import SubscriptionTest from "./pages/SubscriptionTest";
// import AdvancedDonationsTest from "./pages/AdvancedDonationsTest";
// import UserFeaturesTest from "./pages/UserFeaturesTest";
// import AdvancedBlogTest from "./pages/AdvancedBlogTest";
import Comunidad from "./pages/Comunidad";
import LoginForm from "./components/LoginForm";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const { 
    hasConsented, 
    acceptAllCookies, 
    declineOptionalCookies, 
    customizeCookies 
  } = useCookies();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/funcionalidades" element={<Funcionalidades />} />
              <Route path="/guias" element={<Guias />} />
              <Route path="/descargas" element={<Descargas />} />
              <Route path="/donar" element={<Donaciones />} />
              <Route path="/comunidad" element={<Comunidad />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/acerca" element={<Acerca />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/terminos" element={<Terminos />} />
              <Route path="/privacidad" element={<Privacidad />} />
              <Route path="/admin" element={
                <ProtectedRoute requireAdmin={true}>
                  <Admin />
                </ProtectedRoute>
              } />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/app" element={<ComingSoon />} />
              {/* Páginas de test comentadas temporalmente para el build */}
              {/* <Route path="/payment-test" element={<PaymentTest />} /> */}
              {/* <Route path="/stripe-test" element={<StripeTest />} /> */}
              {/* <Route path="/paypal-test" element={<PayPalTest />} /> */}
              {/* <Route path="/subscription-test" element={<SubscriptionTest />} /> */}
              {/* <Route path="/donations-test" element={<AdvancedDonationsTest />} /> */}
              {/* <Route path="/user-features-test" element={<UserFeaturesTest />} /> */}
              {/* <Route path="/advanced-blog-test" element={<AdvancedBlogTest />} /> */}
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          
          {/* Cookie Consent Banner */}
          {!hasConsented() && (
            <CookieConsent
              onAccept={acceptAllCookies}
              onDecline={declineOptionalCookies}
              onCustomize={() => customizeCookies({ analytics: true, marketing: false })}
            />
          )}
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
