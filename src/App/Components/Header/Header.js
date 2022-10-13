import React from "react";
import {
    NavLink,
} from "react-router-dom";
import {favoritesTotalQuantity} from '../../shared/selectors';
import {useDispatch, useSelector} from 'react-redux';
import Logo from '../../../assets/images/pixar.png';
import {authActions} from '../../Store/authSlice';
import {useHistory} from 'react-router';
import './Header.scss';

const Header = () => {
    const {idToken} = useSelector(
        (state) => state.auth,
    );
    const dispatch = useDispatch();
    const history = useHistory();
    const favoritesItemsCount = useSelector(favoritesTotalQuantity);

    const logoutHandler = () => {
        dispatch(authActions.logout());
        history.push("/sign-in");
    };

    return (
        <header className="header">
            <NavLink to="/"><img height="36" width="155" src={Logo} alt="PIXAR"/></NavLink>
            <nav>
                <ul>
                    <li>
                        <NavLink activeClassName="active" to="/about">About</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to="/drawings">Gallery</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to="/inspired-by">Inspired By</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to="/profile">Profile</NavLink>
                    </li>
                    {idToken ? (
                        <>
                            <li>
                                <NavLink activeClassName="active" className="px-shop" to="/shop">
                                    <i className="fa-solid fa-cart-shopping"/>
                                    {favoritesItemsCount > 0 ? <sup>{favoritesItemsCount}</sup> : null}
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
