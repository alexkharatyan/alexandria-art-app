import React, {useEffect, useState} from 'react';
// import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import {deleteGalleryItem, editGalleryItem, fetchGalleryList, updateGalleryFavoritesList} from '../../Store/gallery-actions';
import {DeleteGalleryItemModal} from '../Drawings/DeleteGalleryItemModal/DeleteGalleryItemModal';
import UploadGalleryItemForm from '../Drawings/UploadGalleryItemForm/UploadGalleryItemForm';
import {AppModal} from '../../Store/shared/AppModal/AppModal';
import {DELETE, EDIT, FAVORITE} from '../Drawings/constants';
import {useDispatch, useSelector} from 'react-redux';
import {usePrevious} from '../../hooks/usePrevious';
import GalleryList from './GalleryList/GalleryList';
import toast from 'react-hot-toast';
import './Drawings.scss';

const Drawings = (props) => {
    const dispatch = useDispatch();
    const {galleryItems, loading, editedSuccess, deletedSuccess} = useSelector(state => state.gallery);
    const {favoriteSuccess} = useSelector(state => state.cart);
    const [isEditModalOpen, setEditModalOpenState] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpenState] = useState(false);
    const [itemName, setItemName] = useState('');

    const [selectedCard, setSelectedCard] = useState({values: null, type: ''});

    const prevFavoriteSuccess = usePrevious(favoriteSuccess);
    const prevDeletedSuccess = usePrevious(deletedSuccess);
    const prevEditedSuccess = usePrevious(editedSuccess);

    const prevSelectedCard = usePrevious(selectedCard);

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
        if(galleryItems.length === 0 || (!prevFavoriteSuccess && favoriteSuccess) ) {
            dispatch(fetchGalleryList());
            setSelectedCard({values: null, type: ''});
        }
    }, [dispatch, galleryItems, favoriteSuccess, prevFavoriteSuccess]);

    useEffect(() => {
        if((!prevSelectedCard?.values && selectedCard?.values && selectedCard?.type === FAVORITE)) {
            favoriteItemHandler(selectedCard?.values);
        }
    }, [selectedCard, prevSelectedCard]);

    useEffect(() => {
        if (!prevEditedSuccess && editedSuccess) {
            toast.success('Successfully edited!');
            dispatch(fetchGalleryList());
            closeModalHandler();
        }
    }, [editedSuccess, prevEditedSuccess]);

    useEffect(() => {
        if (!prevDeletedSuccess && deletedSuccess) {
            toast.success('Successfully deleted!');
            dispatch(fetchGalleryList());
            closeDeleteModalHandler();
        }
    }, [deletedSuccess, prevDeletedSuccess]);

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
        setItemName(selectedCard.values.name);
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
        // console.log('fav item=====', item);
        dispatch(updateGalleryFavoritesList({
            key: item.key,
            isFavorite: !item.isFavorite
        }));
    };

    return (
        <section className="px-container text-center">
            <h1 className="text-center mb-40 text-colored">Gallery</h1>
            <div className="px-row">
               <GalleryList
                    loading={loading}
                    drawingData={galleryItems}
                    setSelectedCard={setSelectedCard}
                    selectedCard={selectedCard}
                    // favoriteItemHandler={favoriteItemHandler}
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
