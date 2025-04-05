import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../pages/Shared/Navbar/Navbar';
import Footer from '../pages/Shared/Footer/Footer';
import ScrollToTop from '../components/ScrollPageTop/ScrollPageTop';

const Main = () => {
  const location = useLocation();
  const isHomePage = () => location.pathname === "/";

  return (
    <div>
      <ScrollToTop />
      <Navbar isHomePage={isHomePage()} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
