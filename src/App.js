import React, {Suspense} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import LoadingSpinner from './App/Components/LoadingSpinner/LoadingSpinner';
import {AuthWrapper} from './App/Containers/AuthWrapper';
import Header from "./App/Components/Header/Header";
import Footer from "./App/Components/Footer/Footer";
import {Toaster} from 'react-hot-toast';
import {useSelector} from 'react-redux';
import './App.scss';

const App = () => {
    const {userInfo, idToken} = useSelector(
        (state) => state.auth,
    );

    // const DrawingItemInner = React.lazy(() => import('./App/Components/Drawings/DrawingItemInner/DrawingItemInner'));
    const PageNotFound = React.lazy(() => import('./App/Components/PageNotFound/PageNotFound'));
    // const InspiredBy = React.lazy(() => import('./App/Components/InspiredBy/InspiredBy'));
    // const HomePage = React.lazy(() => import('./App/Components/HomePage/HomePage'));
    const Profile = React.lazy(() => import('./App/Components/Profile/Profile'));
    const SignIn = React.lazy(() => import('./App/Components/Auth/SignIn'));
    const SignUp = React.lazy(() => import('./App/Components/Auth/SignUp'));
    // const About = React.lazy(() => import('./App/Components/About/About'));
    const Drawings = React.lazy(() => import('./App/Components/Drawings'));
    const Shop = React.lazy(() => import('./App/Components/Shop/Shop'));

    return (
        <>
            <main className="main-page">
                <Suspense fallback={<LoadingSpinner />}>
                    <Router>
                        <Header/>
                        <Switch>
                            <Route exact path="/drawings" render={props => <AuthWrapper {...props} Component={Drawings} />} />
                            <Route exact path="/sign-in" render={props => <AuthWrapper {...props} Component={SignIn} />} />
                            <Route exact path="/sign-up" render={props => <AuthWrapper {...props} Component={SignUp} />} />
                            <Route exact path="/profile" render={props => <AuthWrapper {...props} Component={Profile} />}/>
                            <Route exact path="/shop" render={props => <AuthWrapper {...props} Component={Shop} />}/>
                            <Route path="*" render={props => <AuthWrapper {...props} Component={PageNotFound} />}/>
                        </Switch>
                    </Router>
                </Suspense>
                <Footer/>
            </main>
            <Toaster
                containerStyle={{
                    top: 20,
                    left: 20,
                    bottom: 20,
                    right: 20,
                }}
                toastOptions={{
                    success: {
                        style: {
                            border: '2px solid lightgreen',
                            backgroundColor: '#fff'
                        },
                    },
                    error: {
                        style: {
                            border: '2px solid lightcoral',
                            backgroundColor: '#fff'
                        },
                    },
                }}
            />
        </>
    );
}

export default App;
