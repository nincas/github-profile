import React, { Component, Suspense, lazy } from 'react'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
const Home = lazy(() => import('../Components/Login'))
const NotFound = lazy(() => import('../Components/404'))



class Router extends Component {
    lazyLoader (Comp) {
        // eslint-disable-next-line
        return (
            <Suspense fallback={<h1>Loading..</h1>}>
                <React.Fragment>
                    <Comp/>
                </React.Fragment>
            </Suspense>
        )
    }


    render () {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact={true} path="/" component={this.lazyLoader.bind(this, Home)}/>
                    <Route component={this.lazyLoader.bind(this, NotFound)}/>
                </Switch>
            </BrowserRouter>
        )
    }
}


export default Router;