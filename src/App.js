import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routers/router';
import DefaultLayout from './layouts/DefaultLayout/defaultLayout';
import { Fragment } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './guards/ProtectedRoute';

function App() {
   return (
      <Router>
         <div data-testid="cypress-title" className="App">
            <ToastContainer />
            <Routes>
               {publicRoutes.map((route, index) => {
                  const Page = route.element;
                  let Layout = DefaultLayout;
                  if (route.layout === null) {
                     Layout = Fragment;
                  } else if (route.layout) {
                     Layout = route.layout;
                  }

                  return (
                     <Route
                        key={index}
                        path={route.path}
                        element={
                           route.protected ? (
                              <ProtectedRoute>
                                 <Layout>
                                    <Page />
                                 </Layout>
                              </ProtectedRoute>
                           ) : (
                              <Layout>
                                 <Page />
                              </Layout>
                           )
                        }
                     />
                  );
               })}
            </Routes>
         </div>
      </Router>
   );
}

export default App;
