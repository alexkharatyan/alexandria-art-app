import React, {useEffect, useState} from 'react';
// import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import {
    deleteGalleryItem,
    editGalleryItem,
    fetchGalleryList, getUserFavoritesData, addUserFavoritesData, deleteUserFavoritesData
} from '../../Store/gallery-actions';
import {DeleteGalleryItemModal} from '../Drawings/DeleteGalleryItemModal/DeleteGalleryItemModal';
import UploadGalleryItemForm from '../Drawings/UploadGalleryItemForm/UploadGalleryItemForm';
import {AppModal} from '../../Store/shared/AppModal/AppModal';
import {DELETE, EDIT, FAVORITE} from '../Drawings/constants';
import {useDispatch, useSelector} from 'react-redux';
import {usePrevious} from '../../hooks/usePrevious';
import GalleryList from './GalleryList/GalleryList';
import toast from 'react-hot-toast';
import {isEmpty} from 'lodash';
import './Drawings.scss';

const Drawings = (props) => {
    const dispatch = useDispatch();
    const {
        galleryItems,
        galleryListLoading,
        galleryListSuccess,
        editedSuccess,
        deletedSuccess,
        userFavoritesList,
        getUserFavoritesLoading,
        getUserFavoritesSuccess,
        addUserFavoritesLoading,
        addUserFavoritesSuccess,
        deleteUserFavoritesLoading,
        deleteUserFavoritesSuccess
    } = useSelector(state => state.gallery);
    const {userInfo} = useSelector(
        (state) => state.auth,
    );

    const [isEditModalOpen, setEditModalOpenState] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpenState] = useState(false);
    const [selectedCard, setSelectedCard] = useState({values: null, type: ''});

    const prevAddUserFavoritesLoading = usePrevious(addUserFavoritesLoading);
    const prevGetUserFavoritesLoading = usePrevious(getUserFavoritesLoading);
    const prevDeletedSuccess = usePrevious(deletedSuccess);
    const prevEditedSuccess = usePrevious(editedSuccess);
    const prevSelectedCard = usePrevious(selectedCard);
    const prevGalleryLisLoading = usePrevious(galleryListLoading);
    const prevDeleteUserFavoritesLoading = usePrevious(deleteUserFavoritesLoading);

    useEffect(() => {
        if(!prevSelectedCard?.values && selectedCard?.values && selectedCard?.type === EDIT) {
            setEditModalOpenState(!isEditModalOpen);
        }
    }, [selectedCard, prevSelectedCard]);

     useEffect(() => {
        if(!prevSelectedCard?.values && selectedCard?.values && selectedCard?.type === DELETE) {
            setDeleteModalOpenState(!isDeleteModalOpen);
        }
     }, [selectedCard, prevSelectedCard]);

    useEffect(() => {
        if(galleryItems.length === 0 && !prevGalleryLisLoading && !galleryListLoading) {
            setSelectedCard({values: null, type: ''});
        }
    });

    useEffect(() => {
        if(!isEmpty(userInfo) && !getUserFavoritesLoading && !prevGetUserFavoritesLoading && !getUserFavoritesSuccess) {
            // debugger;
            dispatch(getUserFavoritesData({
                userId: userInfo.localId
            }));
        }
    }, [userInfo, getUserFavoritesLoading, prevGetUserFavoritesLoading]);

    useEffect(() => {
        if((!prevSelectedCard?.values && selectedCard?.values && selectedCard?.type === FAVORITE)) {
            favoriteItemHandler(selectedCard?.values);
        }
    }, [selectedCard, prevSelectedCard]);

    // {TODO: ADD LOADING}
    useEffect(() => {
        if (!prevEditedSuccess && editedSuccess) {
            toast.success('Successfully edited!');
            dispatch(fetchGalleryList());
            closeModalHandler();
        }
    }, [dispatch, editedSuccess, prevEditedSuccess]);

    useEffect(() => {
        if (!prevDeletedSuccess && deletedSuccess) {
            toast.success('Successfully deleted!');
            dispatch(fetchGalleryList());
            closeDeleteModalHandler();
        }
    }, [dispatch, deletedSuccess, prevDeletedSuccess]);

    useEffect(() => {
        if(prevDeleteUserFavoritesLoading && !deleteUserFavoritesLoading && deleteUserFavoritesSuccess) {
            // debugger;
            dispatch(getUserFavoritesData({
                userId: userInfo.localId
            }));
        }
    });

    useEffect(() => {
        if((prevAddUserFavoritesLoading && !addUserFavoritesLoading && addUserFavoritesSuccess)) {
            // debugger;
            dispatch(getUserFavoritesData({
                userId: userInfo.localId
            }));
        }
    }, [dispatch, prevAddUserFavoritesLoading, addUserFavoritesLoading, addUserFavoritesSuccess]);


    const editItemHandler = (formValues) => {
        dispatch(editGalleryItem({
            key: formValues.key,
            name: formValues.name,
            image: formValues.image,
            price: formValues.price,
            category: formValues.category,
            isFavorite: formValues.isFavorite,
            description: formValues.description
        }))
    };

    const removeFavoriteItem = () => {
        dispatch(deleteGalleryItem({key: selectedCard.values.key}));
    };

    const closeModalHandler = () => {
        setEditModalOpenState(false);
        setSelectedCard({values: null, type: ''});
    };

    const closeDeleteModalHandler = () => {
        setDeleteModalOpenState(false);
        setSelectedCard({values: null, type: ''})
    };

    const favoriteItemHandler = (item) => {
        // debugger;
        if(item.isFavoriteItem) {
            dispatch(deleteUserFavoritesData({
                key: item.key,
                userId: userInfo?.localId,
            }));
        } else {
            dispatch(addUserFavoritesData({
                key: item.key,
                userId: userInfo?.localId,
                isFavorite: !item.isFavorite,
                name: item.name,
                image: item.image,
                price: item.price,
                category: item.category,
                description: item.description
            }));
        }
        setSelectedCard({values: null, type: ''});
    };

    const listLoading = isEmpty(userInfo) ? galleryListLoading : galleryListLoading;
    const hasAllGalleryData = isEmpty(userInfo) ? galleryListSuccess : (getUserFavoritesSuccess);

    return (
        <section className="px-container text-center">
            <h1 className="text-center mb-40 text-colored">Gallery</h1>
            <div className="px-row">
               <GalleryList
                    loading={listLoading}
                    drawingData={galleryItems}
                    setSelectedCard={setSelectedCard}
                    selectedCard={selectedCard}
                    favoriteItems={userFavoritesList}
                    hasAllGalleryData={hasAllGalleryData}
                />
            </div>
            <AppModal
                open={isEditModalOpen}
                title="Add Gallery Item"
                closeHandler={closeModalHandler}
            >
                <UploadGalleryItemForm
                    currentItem={selectedCard.values}
                    closeHandler={closeModalHandler}
                    submitHandler={editItemHandler}
                />
            </AppModal>
            <AppModal
                open={isDeleteModalOpen}
                title="Remove Gallery Item"
                closeHandler={closeDeleteModalHandler}
            >
               <DeleteGalleryItemModal
                   currentItemId={selectedCard.values}
                   closeModalHandler={closeDeleteModalHandler}
                   removeFavoriteItem={removeFavoriteItem}
               />
            </AppModal>
        </section>
    )
}

export default Drawings;
