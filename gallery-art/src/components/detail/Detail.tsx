import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import images from '../../data/images';
import imageVoirPlus from '../../data/imageDetail';
import './Detail.css';

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const image = images.find(img => img.id === id);
  const associatedImages = imageVoirPlus.find(img => img.id === id);
  const navigate = useNavigate();
  const detailRef = useRef<HTMLDivElement>(null);

  if (!image) {
    return <div>Image not found</div>;
  }

  const handleBackClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    gsap.to(detailRef.current, {
      scale: 0.9,
      opacity: 0,
      duration: 0.5,
      onComplete: () => navigate('/')
    });
  };

  return (
    <div className="detail-container" ref={detailRef}>
      <div className="associated-images">
        <div className="images-grid">
          <img className='images__main' src={image.src} alt={image.title} />
          {associatedImages && Object.keys(associatedImages).filter(key => key.startsWith('src_')).map((key, index) => (
            <img className='images__associated' key={index} src={associatedImages[key]} alt={`${image.title} ${index + 1}`} />
          ))}
        </div>
      </div>
      <Link to="/" onClick={handleBackClick}>Back to Gallery</Link>
    </div>
  );
};

export default Detail;