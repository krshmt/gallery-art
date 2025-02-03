import { BrowserRouter as Router } from 'react-router-dom';
import GalleryApp from './components/gallery-art/GalleryApp';

function App() {
  return (
    <Router>
      <GalleryApp />
    </Router>
  );
}

export default App;