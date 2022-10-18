import React, {useEffect} from 'react';
import {getAccountInfo} from '../Components/Profile/account-actions';
import {useDispatch, useSelector} from 'react-redux';
import {usePrevious} from '../hooks/usePrevious';
import {authActions} from '../Store/authSlice';
import {useHistory} from 'react-router-dom';

export const AuthWrapper = (props) => {
    const {children} = props;
    const {userInfo, idToken, signInLoading, signInSuccess} = useSelector(
        (state) => state.auth,
    );
    const prevUser = usePrevious(userInfo);
    const prevSignInLoading = usePrevious(signInLoading);
    const prevSignInSuccess = usePrevious(signInSuccess);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        // in login page if user token exists in local storage, do auth request
        // console.log('loggedIn');
        if (!userInfo) {
            dispatch(getAccountInfo({
                idToken: idToken,
            }));
        }
    }, [dispatch, history, userInfo]);

    useEffect(() => {
        if(!prevSignInLoading && !signInSuccess) {
            // console.log('router to profile');
            history.replace("/profile");
        }
    }, [dispatch, history, userInfo, signInLoading, signInSuccess, prevSignInLoading, prevSignInSuccess]);

    useEffect(() => {
        if (userInfo) {
            setTimeout(
                () => {
                    dispatch(authActions.logout());
                    history.replace('/gallery');
                },
                // log out after some seconds
                10 * 60000
            );
        }
    }, [userInfo, dispatch, history]);

    // console.log(userInfo);
    return (
        <>
            {children}
        </>
    );
};
