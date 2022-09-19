import React, {useEffect, useRef, useState} from 'react';
import {SkeletonLoading} from '../shared/SkeletonLoading/SkeletonLoading';
import profPhoto from '../../../assets/images/px-lamp.webp';
import {resetPassword} from '../../Store/auth-actions';
import {useDispatch, useSelector} from 'react-redux';
import {AppModal} from '../shared/AppModal/AppModal';
import {getAccountInfo} from './account-actions';
import toast from 'react-hot-toast';
import '../Auth/AuthForm.scss';
import cx from 'classnames';
import './Profile.scss';

const Profile = (props) => {
    const dispatch = useDispatch();
    const newPasswordInputRef = useRef(null);
    const newDisplayNameRef = useRef(null);
    const newPhotoRef = useRef(null);
    const [toggleModal, setToggleModal] = useState(false);
    const [showChangePassModal, setShowChangePassModal] = useState(false);
    const [baseUrl, setBaseUrl] = useState('');
    const {userInfo, idToken, userLoading, userSuccess} = useSelector(
        (state) => state.auth,
    );

    useEffect(() => {
        if (userSuccess) {
            toast.success('Successfully updated!');
            setToggleModal(false);
        }
    }, [userSuccess, dispatch]);

    const submitHandler = (e) => {
        e.preventDefault();
        const newPassword = newPasswordInputRef.current.value;
        dispatch(resetPassword({
            password: newPassword,
            idToken: idToken,
            returnSecureToken: false
        }));
    };
    const propPicture = userInfo?.photoUrl ? userInfo?.photoUrl : userInfo?.profilePicture ? userInfo?.profilePicture : profPhoto;

    const toggleAppModal = () => {
        setToggleModal(!toggleModal);
    };

    const toggleChangePassModal = () => {
        setShowChangePassModal(!showChangePassModal);
    };

    const uploadImage = (file) => {
        const baseFile = file;
        let reader = new FileReader();
        reader.onload = (e) => {
            let image = e.target.result;
            setBaseUrl(image);
        };
        reader.readAsDataURL(baseFile);

    }

    console.log('userInfo', userInfo);

    const editAccountHandler = (e) => {
        e.preventDefault();

        const newDisplayName = newDisplayNameRef.current.value;
        const newPhotoSrc = newPhotoRef.current.value;

        // const newPhoto = newPhotoRef.current.files[0];
        // uploadImage(newPhoto);

        dispatch(getAccountInfo({
            idToken: idToken,
            displayName: newDisplayName,
            photoUrl: newPhotoSrc
        }));
    };

    const renderEdtAccountModal = () => {
        return (
            <AppModal
                title="Edit Profile"
                closeHandler={setToggleModal}
            >
                <form onSubmit={editAccountHandler}>
                    <fieldset>
                        <div className='control'>
                            <label htmlFor='newDisplayName'>Your Display Name</label>
                            <input placeholder="New Display Name"
                                   ref={newDisplayNameRef}
                                   className="px-input"
                                   id='newDisplayName'
                                   type='text'
                                // onChange={previewFile}
                                   required
                            />
                        </div>
                        <div className='control'>
                            <label htmlFor='newPhoto'>Insert Profile picture external url</label>
                            <input placeholder="Profile picture url"
                                   ref={newPhotoRef}
                                   className="px-input"
                                   id='newPhoto'
                                   type='text'
                                // onChange={previewFile}
                                   required
                            />
                        </div>
                        {/*{TODO: change with input uploading}*/}
                        {/*<div className='control'>*/}
                        {/*    <label htmlFor='newPhoto'>Upload a new Photo</label>*/}
                        {/*    <input placeholder="New Photo"*/}
                        {/*           className="px-input"*/}
                        {/*           ref={newPhotoRef}*/}
                        {/*           accept="image"*/}
                        {/*           id='newPhoto'*/}
                        {/*           type='file'*/}
                        {/*           required*/}
                        {/*    />*/}
                        {/*</div>*/}
                        <button
                            type='submit'
                            className='px-button-primary'
                        >
                            Save
                        </button>
                    </fieldset>
                </form>
            </AppModal>
        );
    };

    const renderChangePasswordAppModal = () => {
        return (
            <AppModal
                title="Edit Profile"
                closeHandler={setShowChangePassModal}>
                <div>
                    <h3>Change password</h3>
                    <form onSubmit={submitHandler}>
                        <fieldset>
                            <div className='control'>
                                <label htmlFor='newPassword'>Your Password</label>
                                <input placeholder="New password" minLength={7} className="px-input" type='password'
                                       id='newPassword' ref={newPasswordInputRef} required/>
                            </div>
                            <button
                                type='submit'
                                className='px-button-primary'
                            >
                                Change password
                            </button>
                        </fieldset>
                    </form>
                </div>
            </AppModal>
        )
    };

    return (
        <section className="px-container profile">
            <aside className="profile__info__list">
                {!userLoading ? (
                    <ul>
                        <li className="profile__info__photo">
                            <div className="img-wrapper">
                                <img
                                    className={cx({
                                        'no-img': !userInfo?.profilePicture && !userInfo?.photoUrl
                                    })}
                                    src={propPicture}
                                    alt={userInfo?.displayName}
                                />
                            </div>
                            <button
                                className="px-button-link edit-profile"
                                onClick={toggleAppModal}
                            >
                                <span>Edit Profile</span>
                            </button>
                        </li>
                        <li><h1>{userInfo?.displayName}</h1></li>
                        <li><h2>{userInfo?.email}</h2></li>
                        <li>
                            <button
                                className="px-button-link"
                                onClick={toggleChangePassModal}
                            >
                                <span>Change Password</span>
                            </button>
                        </li>
                    </ul>
                ) : <SkeletonLoading type={'PROFILE'} />}
            </aside>
            {toggleModal && renderEdtAccountModal()}
            {showChangePassModal && renderChangePasswordAppModal()}
        </section>
    );
};
export default Profile;
