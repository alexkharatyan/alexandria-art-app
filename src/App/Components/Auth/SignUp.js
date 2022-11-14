import React, {useEffect} from 'react';
import AuthForm from './AuthForm';
import { useSelector} from 'react-redux';

const SignUp = () => {
    const {signInSuccess, signInLoading, signInError} = useSelector(
        (state) => state.auth,
    );

    return (
        <section className='px-container text-center'>
            <h1 className="text-center text-colored mb-40">Sign Up</h1>
            <AuthForm
                loading={signInLoading}
                success={signInSuccess}
                error={signInError}
                signInSession={false}
            />
        </section>
    );
};
export default SignUp;
