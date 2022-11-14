import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {usePrevious} from 'src/App/hooks/usePrevious';
import {useHistory} from 'react-router-dom';

export const CustomRoute = (props) => {
    const {} = props;
    const [returnedRoute, setReturnedRoute] = useState('');
    const {userInfo, idToken, signInLoading, signInSuccess} = useSelector(
        (state) => state.auth,
    );
    const prevSignInLoading = usePrevious(signInLoading);
    const prevSignInSuccess = usePrevious(signInSuccess);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        getReturnedRoute();
    });

    const getReturnedRoute = () => {
        if(!prevSignInSuccess && signInSuccess && userInfo) {
            history.replace("/profile");
        }
    };

    return <>{returnedRoute}</>;
};
