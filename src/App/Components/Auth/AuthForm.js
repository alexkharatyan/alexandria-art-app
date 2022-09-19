import React, {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {signInUser, signupUser} from '../../Store/auth-actions';
import {useHistory} from 'react-router';
import './AuthForm.scss';

const AuthForm = (props) => {
    const {
        signInSession,
    } = props;
    // const { register, handleSubmit } = useForm();
    const emailInputRef = useRef(null);
    const fNameInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const { loading, success, error } = useSelector(
        (state) => state.auth,
    );
    const dispatch = useDispatch();
    let history = useHistory();

    const switchAuthModeHandler = () => {
        if(signInSession) {
            history.replace('/sign-up');
        } else {
            history.replace('/sign-in');
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const enteredFName = fNameInputRef.current.value;

        //TODO: add validation

        if (signInSession) {
            dispatch(signInUser({
                email: enteredEmail,
                password: enteredPassword,
                displayName: enteredFName,
            }));
        } else {
            dispatch(signupUser({
                email: enteredEmail,
                password: enteredPassword,
                displayName: enteredFName,
            }));
        }
        //[API_KEY] is my firebase user web API key = AIzaSyC8MgaNDTIsyoaELRhpLs2XvY9dQkVQ1lA (taken from general settings)
    };

    return (
        <div className=' session-box counter-box'>
            <form onSubmit={submitHandler}>
                <fieldset>
                    <div className='control'>
                        <label htmlFor='fName'>Your display name</label>
                        <input className="px-input" type='text' id='fName' ref={fNameInputRef} required/>
                    </div>
                    <div className='control'>
                        <label htmlFor='email'>Your Email</label>
                        <input className="px-input" type='email' id='email' ref={emailInputRef} required/>
                    </div>
                    <div className='control'>
                        <label htmlFor='password'>Your Password</label>
                        <input className="px-input" type='password' id='password' ref={passwordInputRef} required/>
                    </div>
                </fieldset>
                {error ? <p className="text-center">error</p> : null}
                <div className='actions'>
                    {(loading && !success) ?
                        <h3>Loading...</h3> :
                        <button className="px-button-primary">{signInSession ? 'Login' : 'Create Account'}</button>
                    }
                    <button
                        type='button'
                        className='toggle px-button-link'
                        onClick={switchAuthModeHandler}
                    >
                        {signInSession ? 'Create new account' : 'Login with existing account'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AuthForm;
