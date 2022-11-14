import React, {useEffect} from "react";
import {
    NavLink,
} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import Logo from '../../../assets/images/pixar.png';
import {authActions} from '../../Store/authSlice';
import {getUserFavoritesData} from '../../Store/gallery-actions';
import {galleryActions} from '../../Store/gallerySlice';
import {usePrevious} from '../../hooks/usePrevious';
import {useHistory} from 'react-router';
import './Header.scss';

const Header = () => {
    const {idToken} = useSelector(
        (state) => state.auth,
    );
    const dispatch = useDispatch();
    const history = useHistory();
    const {addUserFavoritesLoading, updateUserFavoritesSuccess, loading, userFavoritesList} = useSelector(state => state.gallery);
    const favoritesItemsCount = userFavoritesList?.length;
    const prevaddUserFavoritesLoading = usePrevious(addUserFavoritesLoading);
    const {userInfo} = useSelector(state => state.auth);

    useEffect(() => {
        if (prevaddUserFavoritesLoading && !addUserFavoritesLoading && updateUserFavoritesSuccess) {
            dispatch(getUserFavoritesData({userId: userInfo?.localId}));
        }
    }, [prevaddUserFavoritesLoading, addUserFavoritesLoading, updateUserFavoritesSuccess]);


    const logoutHandler = () => {
        dispatch(authActions.logout());
        dispatch(galleryActions.resetUserFavoriteList());
        history.push("/sign-in");
    };

    return (
        <header className="header">
            <NavLink to="/drawings"><img height="36" width="155" src={Logo} alt="PIXAR"/></NavLink>
            <nav>
                <ul>
                    {/*<li>*/}
                    {/*    <NavLink activeClassName="active" to="/about">About</NavLink>*/}
                    {/*</li>*/}
                    <li>
                        <NavLink activeClassName="active" to="/drawings">Gallery</NavLink>
                    </li>
                    {/*<li>*/}
                    {/*    <NavLink activeClassName="active" to="/inspired-by">Inspired By</NavLink>*/}
                    {/*</li>*/}
                    {idToken ? (
                        <>
                            <li>
                                <NavLink activeClassName="active" to="/profile">Profile</NavLink>
                            </li>
                            <li>
                                <NavLink activeClassName="active" className="px-shop" to="/shop">
                                    <i className="fa-solid fa-cart-shopping"/>
                                    {favoritesItemsCount && (favoritesItemsCount > 0) ? <sup>{favoritesItemsCount}</sup> : null}
                                </NavLink>
                            </li>
                            <li>
                                <button onClick={logoutHandler} className="px-button-primary"><span>Logout</span></button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink activeClassName="active" className="px-button-primary" to="/sign-in"><span>Sign In</span></NavLink>
                            </li>
                            <li>
                                <NavLink activeClassName="active" to="/sign-up">Sign Up</NavLink>
                            </li>
                        </>
                    ) }
                </ul>
            </nav>
        </header>
    )
}
export default Header;
