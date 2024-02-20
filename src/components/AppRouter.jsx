import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '../router/routes';
import { AuthContext } from './UI/context';

const AppRouter = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    return (
      <Routes>
        {isAuth
          ? privateRoutes.map(route => {
              return <Route key={route.path} path={route.path} element={<route.component />} exact={route.exact}/>
            })

          : publicRoutes.map(route => {
            return <Route key={route.path} path={route.path} element={<route.component />} exact={route.exact}/>
          })
        }
        </Routes>
        
    );
};

export default AppRouter;