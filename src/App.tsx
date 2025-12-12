import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import SplashScreen from "@/components/SplashScreen";
import Layout from "@/components/layout/Layout";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import CommitteePage from "@/pages/CommitteePage";
import ExamPage from "@/pages/ExamPage";
import SeminarPage from "@/pages/SeminarPage";
import EventsPage from "@/pages/EventsPage";
import DonatePage from "@/pages/DonatePage";
import LoginPage from "@/pages/LoginPage";
import NotFoundPage from "@/pages/NotFoundPage";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    // Check if splash was already shown this session
    const hasSeenSplash = sessionStorage.getItem('ausdav-splash-shown');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (hasSeenSplash || prefersReducedMotion) {
      setShowSplash(false);
      setAppReady(true);
    }
  }, []);

  const handleSplashComplete = () => {
    setAppReady(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            
            {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
            
            {appReady && (
              <BrowserRouter>
                <Layout>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/committee" element={<CommitteePage />} />
                    <Route path="/exam" element={<ExamPage />} />
                    <Route path="/seminar" element={<SeminarPage />} />
                    <Route path="/events" element={<EventsPage />} />
                    <Route path="/donate" element={<DonatePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </Layout>
              </BrowserRouter>
            )}
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
