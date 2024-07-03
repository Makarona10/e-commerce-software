import { BrandBar } from '../brandBar/brandBar.js';
import { Nav_bar } from '../Navbar/Navbar.js';
import { ListProd } from '../container/container.js';
import { Categoside } from '../categories/categories.js';

export const BrowseProd = () => {
  return (
    <div>
      <BrandBar />
      <Nav_bar search={true} />
      <Categoside />
      <ListProd />
    </div>
  );
};
