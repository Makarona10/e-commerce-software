import logo from './logo.svg';
import './App.css';
import { BrowseProd } from './components/browseProd/browseProd';
import { AddProduct } from './components/addProduct/addProduct';
import { ListMerchant } from './components/merchant-prod/list_merchant';
import { ClientOrders } from './components/order_history/clientOrders';
import { ModifyProduct } from './components/modifyProduct/modifyProduct';
import { ListPending } from './components/listPending/listPending';
import { DeliveryOrders } from './components/deliveryOrders/deliveryOrders';


function App() {
  return (
    <div className="App">
      {/* <BrowseProd /> */}
      <AddProduct />
      {/* <ListMerchant /> */}
      {/* <ClientOrders /> */}
      {/* <ModifyProduct /> */}
      {/* <ListPending /> */}
      {/* <DeliveryOrders /> */}
    </div>
  );
}

export default App;
