import './App.css';
import { BrowseProd } from './components/customer//home/browseProd/browseProd';
import { AddProduct } from './components/Pages/addProduct/addProduct';
import { DeliveryOrders } from './components/deliveryOrders/deliveryOrders';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ModifyProduct } from './components/modifyProduct/modifyProduct';
import { ListMerchant } from './components/merchant-prod/list_merchant';
import { ClientOrders } from './components/order_history/clientOrders';
import { ListPending } from './components/listPending/listPending';
import { PaymentHandle } from './components/Pages/paymentCheck/paymentSuccess';
import { MerchantBestSellers } from './components/merchantBestSellers/M-Best-Sellers';
import { StoreInfo } from './components/storeInfo/storeInfo';
import Login from './components/auth/login/Login';
import Register from './components/auth/register/Register';
import ProtectedRoute from './components/auth/protected/Protected';
import NotProtectedRoute from './components/auth/not_protected/NotProtected';
import { ProductDetail } from './components/Pages/product_page/Product_Page';
import { ViewProducts } from './components/Pages/ViewProducts/ViewProducts';

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
            hasErrorBoundary={false}
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
            element={<ProtectedRoute component={ListPending} />}
          />
          <Route
            path="/success"
            element={<ProtectedRoute component={PaymentHandle} />}
          />
          <Route
            path="/merchant-best-sellers"
            element={<ProtectedRoute component={MerchantBestSellers} />}
          />
          <Route
            path="/store-info"
            element={<ProtectedRoute component={StoreInfo} />}
          />
          <Route
            path="/prod-info"
            element={<ProtectedRoute component={ProductDetail} />}
          />
          <Route
            path="/view-prods"
            element={<ProtectedRoute component={ViewProducts} />}
          />
          <Route path="/" element={<ProtectedRoute component={BrowseProd} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
