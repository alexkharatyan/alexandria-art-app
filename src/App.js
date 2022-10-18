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
                            {/*<Route exact path="/">*/}
                            {/*    <HomePage/>*/}
                            {/*</Route>*/}
                            {/*<Route exact path="/about">*/}
                            {/*    <About/>*/}
                            {/*</Route>*/}
                            <Route exact path="/drawings">
                                <Drawings/>
                            </Route>
                            {/*<Route exact path="/drawing-inner">*/}
                            {/*    <DrawingItemInner/>*/}
                            {/*</Route>*/}
                            {/*<Route exact path="/inspired-by">*/}
                            {/*    <InspiredBy/>*/}
                            {/*</Route>*/}
                            {!idToken && (
                                <>
                                    <Route exact path="/sign-in">
                                        <SignIn />
                                    </Route>
                                    <Route exact path="/sign-up">
                                        <SignUp />
                                    </Route>
                                    <Route exact path="/profile">
                                        <SignIn />
                                    </Route>
                                </>
                            )}
                            {/*{!!idToken && (*/}
                            <AuthWrapper>
                                <Route exact path="/profile">
                                    <Profile/>
                                </Route>
                                <Route exact path="/shop">
                                    <Shop/>
                                </Route>
                            </AuthWrapper>
                            {/*)}*/}
                            <Route path="*">
                                <PageNotFound />
                            </Route>
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
