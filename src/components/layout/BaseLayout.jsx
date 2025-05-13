import { Outlet } from 'react-router-dom';
import Sidebar from '../../modules/admin/sidebar/Sidebar.jsx';
import './BaseLayout.scss';

const BaseLayout = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default BaseLayout; 