import { Outlet } from 'react-router-dom';
import UserSidebar from '../sidebar/UserSidebar';
import './UserLayout.scss';

const UserLayout = () => {
  return (
    <div className="app-container">
      <UserSidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout; 