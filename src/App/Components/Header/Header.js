import React from "react";
import {
    NavLink,
} from "react-router-dom";
import Logo from '../../../assets/images/pixar.png';
import {useDispatch, useSelector} from 'react-redux';
import {authActions} from '../../Store/authSlice';
import {useHistory} from 'react-router';
import './Header.scss';

const Header = () => {
    const {idToken} = useSelector(
        (state) => state.auth,
    );
    const dispatch = useDispatch();
    const history = useHistory();

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
                        <li>
                            <button onClick={logoutHandler} className="px-button-primary">Logout</button>
                        </li>
                    ) : (
                        <>
                            <li className="px-button-primary">
                                <NavLink activeClassName="active" to="/sign-in">Sign In</NavLink>
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
