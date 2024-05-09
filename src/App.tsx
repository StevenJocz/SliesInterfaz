import { Home } from './pages/home'
import './App.css'
import { Suspense, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route } from 'react-router-dom';
import RoutesWithNotFound from './utilities/RoutesWithNotFound';
import { PrivateRoutes, PublicRoutes } from './models/routes';
import store from './redux/store';
import { AuthGuard, RoleGuard } from './guards';
import { Layout } from './pages/private/pages/layout';
import View from './pages/viewCursos/cusos/view';
import { ViewCursos } from './pages/viewCursos';
function App() {

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Establecer un temporizador para 3 segundos
    const timer = setTimeout(() => {
      // Actualizar el estado para indicar que se ha completado el tiempo de espera
      setIsLoading(false);
    }, 3000);

    // Limpiar el temporizador cuando el componente se desmonte
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Suspense>
        {isLoading ? (
          <div className='Loader'>
            <p>SLIES</p>
            <div className="Loader_circulo">
              <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            </div>
          </div>
        ) : (
          <Provider store={store}>
            <BrowserRouter>
              <RoutesWithNotFound>
                <Route path="/Private" element={<Navigate to={PrivateRoutes.PRIVATE} />} />
                <Route path={`${PublicRoutes.Home}`} element={<Home />} />
                <Route path={`${PublicRoutes.Home}/Cursos/:view/*`} element={<View />} />
                <Route element={<AuthGuard privateValidation={true} />}>
                  <Route element={<RoleGuard />}>
                    <Route path={`${PrivateRoutes.PRIVATE}/*`} element={<Layout />} />
                  </Route>
                  <Route path={`${PrivateRoutes.Estudiante}/*`} element={<ViewCursos/>} />
                </Route>
              </RoutesWithNotFound>
            </BrowserRouter>
          </Provider>
        )}
      </Suspense>

    </>
  )
}

export default App
