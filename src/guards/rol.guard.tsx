import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { PrivateRoutes, PublicRoutes} from '../models';
import { AppStore } from '../redux/store';


function RoleGuard() {
  const userState = useSelector((store: AppStore) => store.user);
  return userState.tipoUsuario == 2 || userState.tipoUsuario == 1 ? <Outlet /> : userState.tipoUsuario == 3 ? <Navigate replace to={PublicRoutes.Home} /> : <Navigate replace to={PrivateRoutes.PRIVATE} />;
}
export default RoleGuard;
