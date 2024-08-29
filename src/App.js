import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routers/router";
import DefaultLayout from "./layouts/DefaultLayout/defaultLayout";
import { Fragment } from "react";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, id) => {
                        let Layout = DefaultLayout;
                        const Page = route.element;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {   
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={route.id}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
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
