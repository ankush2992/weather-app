import { Suspense, lazy, useEffect } from "react";
import styles from "./Layout.module.css";
import loadingSvg from "../../assets/loading-spinner.svg";

const Header = lazy(() => import("../header/Header"));
const Now = lazy(() => import("../now/Now"));
const Forecast = lazy(() => import("../forecast/Forecast"));
const Highlights = lazy(() => import("../highlights/Highlights"));
const Today = lazy(() => import("../today/Today"));
const Footer = lazy(() => import("../footer/Footer"));

function Loading() {
  return <img src={loadingSvg} alt="Loading..." />;
}

function Layout() {
  // Add mouse parallax effect to cards
  useEffect(() => {
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
      
      const cards = document.querySelectorAll('.parallax-wrapper');
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const moveX = (x - centerX) / 30;
          const moveY = (y - centerY) / 30;
          
          card.style.transform = `perspective(1000px) rotateY(${moveX}deg) rotateX(${-moveY}deg) translateZ(10px)`;
          card.querySelector('.card-glow').style.opacity = '1';
          card.querySelector('.card-glow').style.setProperty('--mouse-x', `${x}px`);
          card.querySelector('.card-glow').style.setProperty('--mouse-y', `${y}px`);
        } else {
          card.style.transform = '';
          card.querySelector('.card-glow').style.opacity = '0';
        }
      });
    };

    const handleMouseLeave = () => {
      const cards = document.querySelectorAll('.parallax-wrapper');
      cards.forEach(card => {
        card.style.transform = '';
        card.querySelector('.card-glow').style.opacity = '0';
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Add parallax wrapper and glow to all cards
    const wrapCards = () => {
      const cards = document.querySelectorAll('.currentWeather .card, .highlights, .hourlyForecast, .forecast .card');
      
      cards.forEach(card => {
        if (!card.closest('.parallax-wrapper')) {
          const parentElement = card.parentElement;
          const wrapper = document.createElement('div');
          wrapper.className = 'parallax-wrapper';
          
          const glowElement = document.createElement('div');
          glowElement.className = 'card-glow';
          
          const content = document.createElement('div');
          content.className = 'card-content';
          
          // Replace card with wrapper
          parentElement.replaceChild(wrapper, card);
          
          // Move card into content div
          content.appendChild(card);
          
          // Add all to wrapper
          wrapper.appendChild(glowElement);
          wrapper.appendChild(content);
        }
      });
    };
    
    // Run after a delay to ensure all components are rendered
    setTimeout(wrapCards, 1000);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div>
      {/* Weather background effects */}
      <div className="weather-background">
        <div className="clouds">
          <div className="cloud cloud-1"></div>
          <div className="cloud cloud-2"></div>
          <div className="cloud cloud-3"></div>
          <div className="cloud cloud-4"></div>
        </div>
        
        {/* Rain effect */}
        <div className="rain">
          {[...Array(15)].map((_, index) => (
            <div key={index} className="drop"></div>
          ))}
        </div>
      </div>
      
      <Suspense fallback={<Loading />}>
        <Header />
      </Suspense>
      <main className={`${styles.main} container`}>
        <section className={styles.leftContent}>
          <Suspense fallback={<Loading />}>
            <Now />
            <Forecast />
          </Suspense>
        </section>
        <section className={styles.rightContent}>
          <Suspense fallback={<Loading />}>
            <Highlights />
            <Today />
          </Suspense>
        </section>
      </main>
      <Suspense fallback={<Loading />}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default Layout;
