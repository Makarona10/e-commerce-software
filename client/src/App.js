import logo from './logo.svg';
import './App.css';
import { Nav_bar } from './components/Navbar/Navbar.js';
import { BrandBar } from './components/brandBar/brandBar.js'
import { Categoside } from './components/categories/categories.js';
import { ListProd } from './components/container/container.js';

function App() {
  return (
    <div className="App">
      <BrandBar />
      <Nav_bar />
      <Categoside />
      <ListProd />
    </div>
  );
}

export default App;
