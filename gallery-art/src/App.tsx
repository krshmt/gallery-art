import { BrowserRouter as Router } from 'react-router-dom';
import GalleryApp from './components/gallery-art/GalleryApp';
import Header from './components/header';

function App() {
  return (
    <Router>
      <Header />
      <GalleryApp />
    </Router>
  );
}

export default App;