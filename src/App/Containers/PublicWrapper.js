import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {authActions} from '../Store/authSlice';
import {useHistory} from 'react-router-dom';
import {galleryActions} from 'src/App/Store/gallerySlice';

export const PublicWrapper = (props) => {
    const {Component} = props;
    const {userInfo} = useSelector(
        (state) => state.auth,
    );
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if(!userInfo) {
            history.replace("/sign-in");
        }
    }, [userInfo, history]);

    useEffect(() => {
        if (!userInfo) {
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

    return (
        <>
            <Component/>
        </>
    );
};
