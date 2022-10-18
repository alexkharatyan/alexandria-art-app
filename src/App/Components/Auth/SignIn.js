import React from 'react';
import AuthForm from './AuthForm';
import {useSelector} from 'react-redux';

const SignIn = () => {
    const {signInLoading, signInSuccess, signInError, userInfo, idToken} = useSelector(
        (state) => state.auth,
    );

    // console.log('idToken', idToken);
    // console.log('userInfo', userInfo);

    return (
        <section className="px-container text-center">
            <h1 className="text-center text-colored mb-40">Sign In</h1>
            <AuthForm
                userInfo={userInfo}
                idToken={idToken}
                loading={signInLoading}
                success={signInSuccess}
                error={signInError}
                signInSession={true}
            />
        </section>
    );
};
export default SignIn;
