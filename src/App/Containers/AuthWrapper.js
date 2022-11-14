import React, {useEffect} from 'react';
import GalleryFetchDataWrapper from '../Containers/GalleryFetchDataWrapper';
import {getAccountInfo} from '../Components/Profile/account-actions';
import {useHistory, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {galleryActions} from '../Store/gallerySlice';
import {authActions} from '../Store/authSlice';
import {usePrevious} from '../hooks/usePrevious';
import {isEmpty} from 'lodash';

const GALLERY_DATA_NEEDED_ROUTES = [
    '/drawings',
    '/shop',
    '/profile'
];

export const AuthWrapper = (props) => {
    const {Component} = props;
    const {userInfo, idToken, signInSuccess, isAdmin} = useSelector(
        (state) => state.auth,
    );
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();

    const prevSignInSuccess = usePrevious(signInSuccess);

    //TODO: USE SUCCESS AND LOADING STATES
    useEffect(() => {
        // in login page if user token exists in local storage, do auth request
        if (idToken && isEmpty(userInfo)) {
            dispatch(getAccountInfo({
                idToken: idToken,
            }));
        }
    }, [userInfo, dispatch]);

    useEffect(() => {
        if(!isEmpty(userInfo) && !prevSignInSuccess && signInSuccess) {
            history.replace("/drawings");
            dispatch(getAccountInfo({
                idToken: idToken,
            }));
        }
    }, [dispatch, userInfo, history]);

    useEffect(() => {
        if(isEmpty(userInfo) && !idToken) {
            history.replace("/sign-in");
        }
    }, [userInfo, history]);

    useEffect(() => {
        if (!isEmpty(userInfo)) {
            setTimeout(
                () => {
                    dispatch(authActions.logout());
                    dispatch(galleryActions.resetUserFavoriteList());
                    history.replace('/sign-in');
                },
                // log out after some seconds
                10 * 60000
            );
        }
    }, [dispatch, history, userInfo]);

    const renderWrapper = () => {
        if(GALLERY_DATA_NEEDED_ROUTES.includes(location.pathname)) {
            return <><GalleryFetchDataWrapper Component={Component} /></>
        } else {
            return <><Component /></>
        }
    }
    return (
        <>
            {renderWrapper()}
        </>
    );
};
