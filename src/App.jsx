import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { QuickViewModal } from './components/QuickViewModal';
import { ProductQuickBuyModal } from './components/common/ProductQuickBuyModal';
import { AuthModal } from './components/AuthModal';
import { Toast } from './components/Toast';

import { Home } from './pages/Home';
import { Workouts } from './pages/Workouts';
import { Nutrition } from './pages/Nutrition';
import { Clubs } from './pages/Clubs';
import { Shop } from './pages/Shop';
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin';

// Scroll to top helper on route navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
      <ScrollToTop />

      {/* Show Navbar on all public pages, keep Admin clean with sidebar */}
      {!isAdminRoute && <Navbar />}

      {/* Main Pages */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Booking Pass Modal */}
      <BookingModal />

      {/* Club Quick View Modal */}
      <QuickViewModal />

      {/* Product Quick Buy Modal */}
      <ProductQuickBuyModal />

      {/* Auth Modal (Login / Register / Demo) */}
      <AuthModal />

      {/* Global Toast */}
      <Toast />

      {/* Show Footer on public pages */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}
