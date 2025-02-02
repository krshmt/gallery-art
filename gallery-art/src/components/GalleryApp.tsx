import { Route, Routes, Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import images from "../data/images";
import Detail from './Detail';
import Lenis from '@studio-freight/lenis';
import "./GalleryApp.css";

function GalleryApp() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<any[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

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
      const newItems = rows.map((row) => {
        return Array.from({ length: row.count }, (_, index) => {
          const itemId = `${row.id}-${index}`;
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

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY, currentTarget } = e;
      const { width, height } = (currentTarget as HTMLElement).getBoundingClientRect();
      const centerX = width / 2;
      const centerY = height / 2;

      const sensitivity = 1;
      const deltaX = (centerX - clientX) / sensitivity;
      const deltaY = (centerY - clientY) / sensitivity;

      if (galleryRef.current) {
        galleryRef.current.style.transform = `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px))`;
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  const handleImageClick = (id: string) => {
    const items = document.querySelectorAll('.item');
    items.forEach(item => {
      item.style.height = '0';
    });
    setTimeout(() => {
      navigate(`/detail/${id}`);
    }, 500); // Adjust the timeout to match the animation duration
  };

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div
            initial={{ height: 'auto' }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="container" ref={containerRef}>
              <div className="gallery" ref={galleryRef}>
                {items.map((row, rowIndex) => (
                  <div key={`row-${rowIndex}`} className="row">
                    {row.map((item) => (
                      <motion.div key={item.id} className="item" layout>
                        <div className="preview-img">
                          <Link to={`/detail/${item.id}`} onClick={() => handleImageClick(item.id)}>
                            <img src={item.image.src} alt={item.image.title} />
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        } />
        <Route path="/detail/:id" element={
          <motion.div
            initial={{ y: '100vh' }}
            animate={{ y: 0 }}
            exit={{ y: '100vh' }}
            transition={{ duration: 0.5 }}
          >
            <Detail />
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
}

export default GalleryApp;