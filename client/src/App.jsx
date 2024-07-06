import './App.css';
import { BrowseProd } from './components/browseProd/browseProd';
import { AddProduct } from './components/addProduct/addProduct';
import { DeliveryOrders } from './components/deliveryOrders/deliveryOrders';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ModifyProduct } from './components/modifyProduct/modifyProduct';
import { ListMerchant } from './components/merchant-prod/list_merchant';
import { ClientOrders } from './components/order_history/clientOrders';
import { ListPending } from './components/listPending/listPending';
import Login from './components/auth/login/Login';
import Register from './components/auth/register/Register';
import ProtectedRoute from './components/auth/protected/Protected';
import NotProtectedRoute from './components/auth/not_protected/NotProtected';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/new-product"
            element={<ProtectedRoute component={AddProduct} />}
          />
          <Route
            path="/login"
            element={<NotProtectedRoute component={Login} />}
          />
          <Route
            path="/register"
            element={<NotProtectedRoute component={Register} />}
          />
          <Route
            path="/delivery-orders"
            element={<ProtectedRoute component={DeliveryOrders} />}
          />
          <Route
            path="/modify-product"
            element={<ProtectedRoute component={ModifyProduct} />}
          />
          <Route
            path="/list-merchant-products"
            element={<ProtectedRoute component={ListMerchant} />}
          />
          <Route
            path="/orders-history"
            element={<ProtectedRoute component={ClientOrders} />}
          />
          <Route
            path="/pending"
            element={<ProtectedRoute component={ClientOrders} />}
          />
          <Route path="/" element={<BrowseProd />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
