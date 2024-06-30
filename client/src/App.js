import logo from './logo.svg';
import './App.css';
import { Nav_bar } from './components/Navbar/Navbar.js';
import { BrandBar } from './components/brandBar/brandBar.js'

function App() {
  return (
    <div className="App">
      <BrandBar />
      <Nav_bar />
    </div>
  );
}

export default App;
