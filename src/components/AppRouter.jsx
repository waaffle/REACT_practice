import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '../router/routes';
import { AuthContext } from './UI/context';
import Loader from './UI/Loader/Loader';

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext);

    if(isLoading){
      return <Loader/>
    }

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