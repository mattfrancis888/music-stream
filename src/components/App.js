import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import Header from "./Header";
import StreamCreate from "./streams/StreamCreate";
import StreamList from "./streams/StreamList";
import StreamDelete from "./streams/StreamDelete";
import StreamEdit from "./streams/StreamEdit";
import StreamShow from "./streams/StreamShow";
import history from "../history";
//Changed BrowserRouter to Router because history neesd Router to work
//Used Switch because React thinks strems/new and streams/id are identical,
//so that it shows both. But if you use <switch> it will only show the first
//visited route
const App = () => {
    return (
        <React.Fragment>
            <Router history={history}>
                <Header />
                <Switch>
                    <Route path="/" exact component={StreamList} />
                    <Route path="/streams/new" exact component={StreamCreate} />
                    <Route
                        path="/streams/edit/:id"
                        exact
                        component={StreamEdit}
                    />
                    <Route
                        path="/streams/delete/:id"
                        exact
                        component={StreamDelete}
                    />
                    <Route path="/streams/:id" exact component={StreamShow} />
                </Switch>
            </Router>
        </React.Fragment>
    );
};
export default App;
