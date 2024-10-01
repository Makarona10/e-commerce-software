import { BrandBar } from '../../../brandBar/brandBar.js';
import { MyFooter } from '../../../common/footer/footer.jsx';
import { PaginationBar } from '../../../common/pagination/pagination.jsx';
import { NavBar } from '../../../Navbar/Navbar.js';
import { LandingPage } from '../../listProducts/container.js';

export const BrowseProd = () => {
  return (
    <div className='' style={{}}>
      <BrandBar />
      <NavBar search={true} />
      {/* <Categoside /> */}
      <LandingPage />
      <PaginationBar />
      <MyFooter />
    </div>
  );
};
