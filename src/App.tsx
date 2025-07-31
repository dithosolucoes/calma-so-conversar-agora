
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { WriterAuthProvider } from "@/contexts/WriterAuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ProtectedWriterRoute } from "@/components/ProtectedWriterRoute";
import { Landing } from "./pages/Landing";
import { Checkout } from "./pages/Checkout";
import { Sucesso } from "./pages/Sucesso";
import { AppDevocional } from "./components/AppDevocional";
import { WriterLogin } from "./pages/escritor/WriterLogin";
import { WriterDashboard } from "./pages/escritor/WriterDashboard";
import { WriterConfiguracoes } from "./pages/escritor/WriterConfiguracoes";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <WriterAuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/sucesso" element={<Sucesso />} />
              
              {/* Reader App Routes */}
              <Route path="/app" element={
                <ProtectedRoute>
                  <AppDevocional />
                </ProtectedRoute>
              } />
              
              {/* Writer Platform Routes */}
              <Route path="/escritor/login" element={<WriterLogin />} />
              <Route path="/escritor/dashboard" element={
                <ProtectedWriterRoute>
                  <WriterDashboard />
                </ProtectedWriterRoute>
              } />
              <Route path="/escritor/configuracoes" element={
                <ProtectedWriterRoute>
                  <WriterConfiguracoes />
                </ProtectedWriterRoute>
              } />
              
              {/* Legacy */}
              <Route path="/old" element={<Index />} />
              
              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </WriterAuthProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
