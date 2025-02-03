import { BrowserRouter as Router } from 'react-router-dom';
import GalleryApp from './components/gallery-art/GalleryApp';
import NavHeader from './components/nav-header';

function App() {
  return (
    <Router>
      <NavHeader />
      <GalleryApp />
    </Router>
  );
}

export default App;