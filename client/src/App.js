import logo from './logo.svg';
import './App.css';
import { BrowseProd } from './components/browseProd/browseProd';
import { AddProduct } from './components/addProduct/addProduct';


function App() {
  return (
    <div className="App">
      {/* <BrowseProd /> */}
      <AddProduct />
    </div>
  );
}

export default App;
