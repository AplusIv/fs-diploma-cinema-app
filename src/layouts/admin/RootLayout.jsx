// import '../../sass/admin/normalize.css'
// import '../../sass/admin/styles.scss'
import { useEffect } from 'react';

import { Outlet, useLocation } from "react-router-dom"
import Logout from './Logout';
import { frontendBase } from '../../services/api';

const RootLayout = () => {
  // цвет фона для разных путей
  const location = useLocation();
  useEffect(() => {
    const { pathname: pathName } = location;
    pathName.startsWith(frontendBase + '/client/')
      ? document.body.className = 'client'
      : document.body.className = 'admin';
  }, [location]);


  return (
    <>
      <header className="page-header">
        <h1 className="page-header__title">Идём<span>в</span>кино</h1>
        <span className="page-header__subtitle">Администраторррская</span>
        <div className="logout-container" style={{ width: '972px', margin: '0 auto' }}>
          <Logout/>
        </div>
      </header>

      <Outlet />
    </>
  )
}

export default RootLayout