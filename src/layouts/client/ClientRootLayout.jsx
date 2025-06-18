import { useEffect } from 'react';

import { Outlet, useLocation } from "react-router-dom"
import { frontendBase } from '../../services/api';

const ClientRootLayout = () => {
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
      </header>

      <Outlet />
    </>

  )
}

export default ClientRootLayout