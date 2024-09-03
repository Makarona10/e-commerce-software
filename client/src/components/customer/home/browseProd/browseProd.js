import { BrandBar } from '../../../brandBar/brandBar.js';
import { MyFooter } from '../../../common/footer/footer.jsx';
import { PaginationBar } from '../../../common/pagination/pagination.jsx';
import { Nav_bar } from '../../../Navbar/Navbar.js';
import { LandingPage } from '../../listProducts/container.js';

export const BrowseProd = () => {
  return (
    <div>
      <BrandBar />
      <Nav_bar search={true} />
      {/* <Categoside /> */}
      <LandingPage />
      <PaginationBar />
      <MyFooter />
    </div>
  );
};
