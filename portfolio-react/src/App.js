import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { UserProvider, useUser } from './context/UserContext';
// import AOS from 'aos'; // Commented out because it's not being used
// import 'aos/dist/aos.css'; // Commented out because it's not being used

// Styles
import './styles/global.css';
import './styles/App.css';

// Eagerly loaded components
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import Footer from './components/Footer';
import WelcomeModal from './components/WelcomeModal';
import TechCursor from './components/TechCursor';
// const Footer = lazy(() => import('./components/Footer')); // Commented out because it's not being used
// const Cursor = lazy(() => import('./components/Cursor')); // Commented out because it's not being used

// Lazily loaded components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));
const BackToTop = lazy(() => import('./components/BackToTop'));

const AppContent = () => {
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  
  // Apply theme to the root element is now handled in ThemeContext
  
  // Shorter loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Reduced from 2000ms to 1000ms
    
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return <LoadingScreen />;
  }
  
  return (
    <>
      <TechCursor />
      <WelcomeModal />
      <Navbar />
      <main className="main-content">
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <Suspense fallback={null}>
        <BackToTop />
      </Suspense>
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Router>
          <div className="App">
            <AppContent />
          </div>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
