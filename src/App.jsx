import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/layout/Navbar';
import Home     from './pages/Home';
import Lessons  from './pages/Lessons';
import Practice from './pages/Practice';
import Progress from './pages/Progress';
import Settings from './pages/Settings';

/**
 * Root application component.
 * Wraps everything in AppProvider (global state + localStorage persistence)
 * and sets up React Router routes.
 */
export default function App() {
  return (
    <AppProvider>
      <BrowserRouter basename="/Devnagri">
        {/* Animated background gradient */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-[0.07] blur-3xl animate-pulse-slow"
               style={{ background: '#f97316' }} />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-[0.07] blur-3xl animate-pulse-slow"
               style={{ background: '#a855f7', animationDelay: '1.5s' }} />
          <div className="absolute top-1/2 left-0 w-64 h-64 rounded-full opacity-[0.05] blur-3xl"
               style={{ background: '#3b82f6' }} />
        </div>

        <Navbar />

        {/* Main content — padded for navbar (top) and mobile nav (bottom) */}
        <main className="min-h-screen pt-20 pb-24 md:pb-8 px-4 sm:px-6">
          <Routes>
            <Route path="/"         element={<Home />} />
            <Route path="/lessons"  element={<Lessons />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/settings" element={<Settings />} />
            {/* Fallback */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AppProvider>
  );
}
