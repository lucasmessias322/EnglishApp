import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom";

import Home from './pages/Home/index';
import Texto1 from './pages/Textos/index.jsx';
// import Texto2 from './pages/Texto2/index.jsx';
// import Texto3 from './pages/Texto3';


function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/"   >
                    <Home />
                </Route>

                <Route exact path="/textos"   >
                    <Texto1 />
                </Route>

                {/* <Route exact path="/texto2"   >
                    <Texto2 />
                </Route>

                <Route exact path="/texto3"   >
                    <Texto3/>
                </Route> */}

            </Switch>
        </BrowserRouter>

    )
}

export default Routes
