import React, {useEffect, useRef, useState} from 'react';
import UploadGalleryItemForm from '../../Components/Drawings/UploadGalleryItemForm/UploadGalleryItemForm';
import {ReorderGalleryList} from '../Drawings/ReorderGalleryList/ReorderGalleryList';
import {SkeletonLoading} from '../../Store/shared/SkeletonLoading/SkeletonLoading';
import {addGalleryList, fetchGalleryList} from '../../Store/gallery-actions';
import {AppModal} from '../../Store/shared/AppModal/AppModal';
import profPhoto from '../../../assets/images/px-lamp.webp';
import {resetPassword} from '../../Store/auth-actions';
import {useDispatch, useSelector} from 'react-redux';
import {usePrevious} from '../../hooks/usePrevious';
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
    const [showItemReorderingModal, setShowItemReorderingModal] = useState(false);
    const [isAddModalOpen, setIsAddModalOpenState] = useState(false);
    const [baseUrl, setBaseUrl] = useState('');
    const {userInfo, idToken, userLoading, userSuccess} = useSelector(
        (state) => state.auth,
    );
    const prevUserSuccess = usePrevious(userSuccess);
    const {addedSuccess} = useSelector(state => state.gallery);
    const prevAddedSuccess = usePrevious(addedSuccess);

    useEffect(() => {
        if (!prevUserSuccess && userSuccess) {
            toast.success('Successfully updated!');
            setToggleModal(false);
        }
    }, [userSuccess, prevUserSuccess, dispatch]);

    useEffect(() => {
        if(!prevAddedSuccess && addedSuccess) {
            dispatch(fetchGalleryList());
            toast.success('Successfully saved!');
            closeAddItemModal();
        }
    }, [addedSuccess, prevAddedSuccess]);

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

    const toggleItemUploadingModal = () => {
        setIsAddModalOpenState(true);
    }

    const uploadImage = (file) => {
        const baseFile = file;
        let reader = new FileReader();
        reader.onload = (e) => {
            let image = e.target.result;
            setBaseUrl(image);
        };
        reader.readAsDataURL(baseFile);

    }

    const submitAddingHandler = (formValues) => {
        dispatch(addGalleryList({
            name: formValues.name,
            isFavorite: false,
            price: formValues.price,
            image: formValues.image,
            category: formValues.category,
            description: formValues.description
        }))
    };

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
                open={toggleModal}
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
                            <span>Save</span>
                        </button>
                    </fieldset>
                </form>
            </AppModal>
        );
    };

    const toggleItemReorderingModal = () => {
        setShowItemReorderingModal(!showItemReorderingModal);
    };

    const renderItemsReorderingModal = () => {
        return (
            <AppModal
                open={showItemReorderingModal}
                title="Change password"
                closeHandler={setShowChangePassModal}>
                {/*<ReorderGalleryList*/}
                {/*    reorderingItems={galleryItems}*/}
                {/*/>*/}
            </AppModal>
        );
    };

    const renderChangePasswordAppModal = () => {
        return (
            <AppModal
                open={showChangePassModal}
                title="Change password"
                closeHandler={setShowChangePassModal}>
                <div>
                    <form onSubmit={submitHandler}>
                        <fieldset>
                            <div className='control'>
                                <label htmlFor='newPassword'>New Password</label>
                                <input placeholder="New password" minLength={7} className="px-input" type='password'
                                       id='newPassword' ref={newPasswordInputRef} required/>
                            </div>
                            <button
                                type='submit'
                                className='px-button-primary'
                            >
                                <span>Change password</span>
                            </button>
                        </fieldset>
                    </form>
                </div>
            </AppModal>
        )
    };

    const closeAddItemModal = () => {
        setIsAddModalOpenState(false);
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
                                onClick={() => toggleAppModal()}
                            >
                                <i className="fa-solid fa-pencil"/>
                            </button>
                        </li>
                        <li><h1>{userInfo?.displayName}</h1></li>
                        <li><h2>{userInfo?.email}</h2></li>
                        <li>
                            <button
                                className="px-button-link"
                                onClick={toggleChangePassModal}
                            >
                                <i className="fa-solid fa-pen-to-square"/>
                                <span>Change Password</span>
                            </button>
                        </li>
                        <li>
                            <button
                                className="px-button-link"
                                onClick={toggleItemUploadingModal}
                            >
                                <i className="fa-solid fa-pen-to-square"/>
                                <span>Add Gallery Item</span>
                            </button>
                        </li>
                        {/*<li>*/}
                        {/*    <button*/}
                        {/*        className="px-button-link"*/}
                        {/*        onClick={toggleItemReorderingModal}*/}
                        {/*    >*/}
                        {/*        <i className="fa-solid fa-pen-to-square"/>*/}
                        {/*        <span>Reorder Gallery Item</span>*/}
                        {/*    </button>*/}
                        {/*</li>*/}
                    </ul>
                ) : <SkeletonLoading type='PROFILE' />}
            </aside>
            <AppModal
                open={isAddModalOpen}
                title="Add Gallery Item"
                closeHandler={closeAddItemModal}
            >
                <UploadGalleryItemForm
                    closeModal={closeAddItemModal}
                    submitHandler={submitAddingHandler}
                />
            </AppModal>
            {/*{showItemUploadingModal && renderItemUploadingModal()}*/}
            {renderEdtAccountModal()}
            {renderChangePasswordAppModal()}
            {renderItemsReorderingModal()}
        </section>
    );
};
export default Profile;
