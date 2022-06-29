import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { jwtConst, userRoles } from 'constants/index';
import jwtDecode from 'jwt-decode';
import { ROUTES } from 'constants/index';
import { decodedType } from 'types/common';

const { ACCESS_TOKEN } = jwtConst;
const { ADMIN } = userRoles;

type PrivateRouteProps = {
  admin?: boolean;
  exact?: boolean;
  path: string;
  component: React.FC;
};

const PrivateRoute = ({ admin, ...rest }: PrivateRouteProps) => {
  try {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    if (admin) {
      if (accessToken) {
        const decoded: decodedType = jwtDecode(accessToken.split(' ')[1]);
        return decoded.role === ADMIN ? <Route {...rest} /> : <Redirect to={ROUTES.admin.login} />;
      } else return <Redirect to={ROUTES.admin.login} />;
    } else {
      if (accessToken) {
        return <Route {...rest} />;
      } else return <Redirect to={ROUTES.home.login} />;
    }
  } catch (err) {
    return <Redirect to={ROUTES.home.login} />;
  }
};

export default PrivateRoute;
