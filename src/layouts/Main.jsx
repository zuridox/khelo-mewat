import Navbar from '../pages/Shared/Navbar/Navbar';
import { Outlet, useLocation} from 'react-router-dom';
import Footer from '../pages/Shared/Footer/Footer';

const Main = () => {
  const location = useLocation();
  const isHomePage = () => location.pathname === "/";

    return (
      <div>
        <Navbar isHomePage={isHomePage()} />
        <Outlet />
        <Footer />
      </div>
    );
};

export default Main;