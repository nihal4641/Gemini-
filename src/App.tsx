import React, { useState, useEffect } from 'react';
import { ProductConfig, AppView, OrderSubmission } from './types';
import { getProductConfig, addOrder, getOrderById } from './services/storage';

import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WhyThisPdf } from './components/WhyThisPdf';
import { WhatsInside } from './components/WhatsInside';
import { ProductPreview } from './components/ProductPreview';
import { HowItWorks } from './components/HowItWorks';
import { TrustSection } from './components/TrustSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { StickyMobileBar } from './components/StickyMobileBar';

import { PaymentPage } from './components/PaymentPage';
import { VerificationScreen } from './components/VerificationScreen';
import { SuccessPage } from './components/SuccessPage';
import { PendingPage } from './components/PendingPage';
import { RejectedPage } from './components/RejectedPage';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
  const [config, setConfig] = useState<ProductConfig>(getProductConfig());
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [pendingOrderData, setPendingOrderData] = useState<Omit<OrderSubmission, 'id' | 'createdAt' | 'status'> | null>(null);
  const [activeOrder, setActiveOrder] = useState<OrderSubmission | null>(null);

  // Check URL hash on initial load (e.g. #admin)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#admin') {
        setCurrentView('admin');
      } else if (hash === '#payment') {
        setCurrentView('payment');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Update hash when view changes
  const handleNavigate = (view: AppView) => {
    setCurrentView(view);
    if (view === 'landing') {
      window.history.pushState(null, '', window.location.pathname);
    } else if (view === 'admin') {
      window.location.hash = 'admin';
    } else if (view === 'payment') {
      window.location.hash = 'payment';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Payment form submission handler
  const handleSubmitPayment = (data: Omit<OrderSubmission, 'id' | 'createdAt' | 'status'>) => {
    setPendingOrderData(data);
    setCurrentView('verifying');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Verification workflow completion handler
  const handleVerificationComplete = (order: OrderSubmission) => {
    addOrder(order);
    setActiveOrder(order);

    if (order.status === 'APPROVED') {
      setCurrentView('success');
    } else if (order.status === 'REJECTED') {
      setCurrentView('rejected');
    } else {
      setCurrentView('pending');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRefreshStatus = () => {
    if (!activeOrder) return;
    const latest = getOrderById(activeOrder.id);
    if (latest) {
      setActiveOrder(latest);
      if (latest.status === 'APPROVED') {
        setCurrentView('success');
      } else if (latest.status === 'REJECTED') {
        setCurrentView('rejected');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* RENDER VIEW ACCORDING TO STATE */}
      {currentView === 'landing' && (
        <>
          <Navbar
            config={config}
            currentView={currentView}
            onNavigate={handleNavigate}
            onOpenAdmin={() => handleNavigate('admin')}
          />

          <main className="flex-1 pb-16 md:pb-0">
            <HeroSection
              config={config}
              onGetPdf={() => handleNavigate('payment')}
            />
            
            <WhyThisPdf
              config={config}
              onGetPdf={() => handleNavigate('payment')}
            />

            <WhatsInside
              config={config}
              onGetPdf={() => handleNavigate('payment')}
            />

            <ProductPreview
              config={config}
              onGetPdf={() => handleNavigate('payment')}
            />

            <HowItWorks
              config={config}
              onGetPdf={() => handleNavigate('payment')}
            />

            <TrustSection config={config} />

            <FaqSection config={config} />
          </main>

          <Footer
            config={config}
            onNavigate={handleNavigate}
            onOpenAdmin={() => handleNavigate('admin')}
          />

          <StickyMobileBar
            config={config}
            onGetPdf={() => handleNavigate('payment')}
          />
        </>
      )}

      {/* VIEW: PAYMENT CHECKOUT PAGE */}
      {currentView === 'payment' && (
        <PaymentPage
          config={config}
          onBack={() => handleNavigate('landing')}
          onSubmitPayment={handleSubmitPayment}
        />
      )}

      {/* VIEW: VERIFYING ANIMATION SCREEN */}
      {currentView === 'verifying' && pendingOrderData && (
        <VerificationScreen
          orderData={pendingOrderData}
          config={config}
          onVerificationComplete={handleVerificationComplete}
        />
      )}

      {/* VIEW: SUCCESS CELEBRATION PAGE */}
      {currentView === 'success' && activeOrder && (
        <SuccessPage
          order={activeOrder}
          config={config}
          onHome={() => handleNavigate('landing')}
        />
      )}

      {/* VIEW: PENDING PAGE */}
      {currentView === 'pending' && activeOrder && (
        <PendingPage
          order={activeOrder}
          config={config}
          onHome={() => handleNavigate('landing')}
          onRefreshStatus={handleRefreshStatus}
        />
      )}

      {/* VIEW: REJECTED PAGE */}
      {currentView === 'rejected' && activeOrder && (
        <RejectedPage
          order={activeOrder}
          config={config}
          onHome={() => handleNavigate('landing')}
          onRetry={() => handleNavigate('payment')}
        />
      )}

      {/* VIEW: ADMIN DASHBOARD */}
      {currentView === 'admin' && (
        <AdminDashboard
          config={config}
          onUpdateConfig={setConfig}
          onClose={() => handleNavigate('landing')}
          onViewOrderAccess={(order) => {
            setActiveOrder(order);
            setCurrentView('success');
          }}
        />
      )}

    </div>
  );
}
