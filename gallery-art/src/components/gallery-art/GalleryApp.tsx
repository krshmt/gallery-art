import { Route, Routes, Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { gsap } from 'gsap';
import images from "../../data/images";
import Detail from '../detail/Detail';
import Lenis from '@studio-freight/lenis';
import "./GalleryApp.css";

function GalleryApp() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<any[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const controls = useAnimation();
  const requestRef = useRef<number>();
  const [isMouseAnimationActive, setIsMouseAnimationActive] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const generateItems = () => {
      const rows = [
        { id: 1, count: 4 },
        { id: 2, count: 3 },
        { id: 3, count: 4 },
      ];
      const newItems = rows.flatMap((row) => {
        return Array.from({ length: row.count }, (_, index) => {
          const itemId = `${row.id}-${index + 1}`;
          const image = images.find((i) => i.id === itemId);
          return {
            id: itemId,
            rowId: row.id,
            image: image || "",
          };
        });
      });
      setItems(newItems);
    };
    generateItems();

    
    if (location.pathname !== "/") return;
  
    let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  const handleMouseMove = (e: MouseEvent) => {
    if (!isMouseAnimationActive) return;

    const { clientX, clientY, currentTarget } = e;
    if (!currentTarget) return;

    const { width, height } = (currentTarget as HTMLElement).getBoundingClientRect();
    const centerX = width / 2;
    const centerY = height / 2;

    const sensitivity = 1;
    targetX = (centerX - clientX) / sensitivity;
    targetY = (centerY - clientY) / sensitivity;
  };

  const animate = () => {
    mouseX += (targetX - mouseX) * 0.1;
    mouseY += (targetY - mouseY) * 0.1;

    controls.start({
      x: `calc(-50% + ${mouseX}px)`,
      y: `calc(-50% + ${mouseY}px)`,
      transition: { type: "spring", stiffness: 50, damping: 10 }
    });

    requestRef.current = requestAnimationFrame(animate);
  };

  const container = containerRef.current;
  if (container) {
    container.addEventListener("mousemove", handleMouseMove);
    requestRef.current = requestAnimationFrame(animate);
  }

  return () => {
    if (container) {
      container.removeEventListener("mousemove", handleMouseMove);
    }
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
  };
}, [controls, isMouseAnimationActive, location.pathname]);

  useEffect(() => {
    if (location.pathname === "/") {
      setIsMouseAnimationActive(true); 
    }
  }, [location]);
  

  useEffect(() => {
    const items = document.querySelectorAll('.item');
    const positions = [
      { top: '00%', left: '0%' },
      { top: '10%', left: '30%' },
      { top: '40%', left: '40%' },
      { top: '40%', left: '70%' },
      { top: '50%', left: '10%' },
      { top: '60%', left: '30%' },
      { top: '70%', left: '50%' },
      { top: '100%', left: '80%' },
      { top: '90%', left: '10%' },
      { top: '10%', left: '50%' },
      { top: '0%', left: '50%' },
    ];

    items.forEach((item, index) => {
      const pos = positions[index % positions.length];
      item.style.top = pos.top;
      item.style.left = pos.left;
    });
  }, [items]);

  const handleImageClick = (id: string) => {
    if (isNavigating) return; // Prevent double navigation
    setIsNavigating(true);
    setIsMouseAnimationActive(false); 

    const items = document.querySelectorAll('.item');
    items.forEach(item => {
      const computedHeight = window.getComputedStyle(item).height;
      item.style.height = computedHeight;
      requestAnimationFrame(() => {
        item.style.height = '0';
      });
    });
    setTimeout(() => {
      navigate(`/detail/${id}`);
      setIsMouseAnimationActive(true); // Re-enable mouse animation after navigation
      setIsNavigating(false); // Reset navigation state
    }, 500);
  };

  useEffect(() => {
    if (location.pathname.startsWith('/detail')) {
      gsap.fromTo(
        '.detail-container',
        { y: '100vh' },
        { y: 0, duration: 0.5 }
      );
    }
  }, [location]);

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div
            exit={{ height: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="container" ref={containerRef}>
              <motion.div className="gallery__container" ref={galleryRef} animate={controls}>
                <div className="gallery">
                {items.map((item) => (
                  <motion.div key={item.id} className="item" layout>
                    <div className="preview-img">
                      <div onClick={() => handleImageClick(item.id)}>
                        <img src={item.image.src} alt={item.image.title} />
                      </div>
                    </div>
                  </motion.div>
                ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        } />
        <Route path="/detail/:id" element={
          <Detail />
        } />
      </Routes>
    </AnimatePresence>
  );
}

export default GalleryApp;