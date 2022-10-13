import React, {useEffect} from 'react';
import {getAccountInfo} from '../Components/Profile/account-actions';
import {useDispatch, useSelector} from 'react-redux';
import {authActions} from '../Store/authSlice';
import {useHistory} from 'react-router-dom';

export const AuthWrapper = (props) => {
    const {children} = props;
    const {userInfo, idToken} = useSelector(
        (state) => state.auth,
    );
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        // in login page if user token exists in local storage, do auth request
        console.log('loggedIn');
        if (!userInfo) {
            dispatch(getAccountInfo({
                idToken: idToken,
            }));
        }
        // if(userInfo && idToken) {
        //     console.log('router to profile');
        //     history.replace("/profile");
        // }
    }, [dispatch, history, idToken, userInfo]);

    useEffect(() => {
        if (userInfo) {
            setTimeout(
                () => {
                    dispatch(authActions.logout());
                    history.replace('/');
                },
                // log out after some seconds
                10 * 60000
            );
        }
    }, [userInfo, dispatch, history]);

    return (
        <>
            {children}
        </>
    );
};
