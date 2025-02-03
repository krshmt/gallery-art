import { Route, Routes, Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import images from "../../data/images";
import Detail from '../detail/Detail';
import Lenis from '@studio-freight/lenis';
import Header from '../header/';
import Menu from '../menu/';
import VerticalPixelTransition from '../pixelTransition/vertical/';
import "./GalleryApp.css";

function GalleryApp() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<any[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [menuIsActive, setMenuIsActive] = useState(false);

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
    }, 500);
  };

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div
            exit={{ height: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="container" ref={containerRef}>
            <Header menuIsActive={menuIsActive} setMenuIsActive={setMenuIsActive}/>
      <Menu menuIsActive={menuIsActive}/>
      {/* <CenteredPixelTransition menuIsActive={menuIsActive}/> */}
      {/* <HorizontalPixelTransition menuIsActive={menuIsActive}/> */}
      <VerticalPixelTransition menuIsActive={menuIsActive}/>
              <div className="gallery__container" ref={galleryRef}>
                <div className="gallery">
                {items.map((item) => (
                  <motion.div key={item.id} className="item" layout>
                    <div className="preview-img">
                      <Link to={`/detail/${item.id}`} onClick={() => handleImageClick(item.id)}>
                        <img src={item.image.src} alt={item.image.title} />
                      </Link>
                    </div>
                  </motion.div>
                ))}
                </div>
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