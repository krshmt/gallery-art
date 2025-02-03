import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import images from '../../data/images';
import imageVoirPlus from '../../data/imageDetail';
import './Detail.css';

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const image = images.find(img => img.id === id);
  const associatedImages = imageVoirPlus.find(img => img.id === id);

  if (!image) {
    return <div>Image not found</div>;
  }

  return (
    <div className="detail-container">
      <motion.div
        initial={{ y: '100vh' }}
        animate={{ y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <div className="associated-images">
          <div className="images-grid">
            <img className='images__main' src={image.src} alt={image.title} />
            {associatedImages && Object.keys(associatedImages).filter(key => key.startsWith('src_')).map((key, index) => (
              <img className='images__associated' key={index} src={associatedImages[key]} alt={`${image.title} ${index + 1}`} />
            ))}
          </div>
        </div>
        <Link to="/">Back to Gallery</Link>
      </motion.div>
    </div>
  );
};

export default Detail;