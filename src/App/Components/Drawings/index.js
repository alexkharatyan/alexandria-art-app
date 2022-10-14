import React, {useEffect, useState} from 'react';
// import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import {deleteGalleryItem, editGalleryItem, fetchGalleryList} from '../../Store/gallery-actions';
import {DeleteGalleryItemModal} from '../Drawings/DeleteGalleryItemModal/DeleteGalleryItemModal';
import UploadGalleryItemForm from '../Drawings/UploadGalleryItemForm/UploadGalleryItemForm';
import {AppModal} from '../../Store/shared/AppModal/AppModal';
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
    const [selectedCard, setSelectedCard] = useState(null);
    const [selectedCardId, setSelectedCardId] = useState(null);
    const prevUpdateSuccess = usePrevious(favoriteSuccess);
    const prevDeletedSuccess = usePrevious(deletedSuccess);
    const prevEditedSuccess = usePrevious(editedSuccess);
    const prevSelectedCard = usePrevious(selectedCard);
    const prevSelectedCardId = usePrevious(selectedCardId);

    useEffect(() => {
        if(!prevSelectedCard && selectedCard) {
            setEditModalOpenState(!isEditModalOpen);
        }
    }, [selectedCard, prevSelectedCard]);

     useEffect(() => {
        if(!prevSelectedCardId && selectedCardId) {
            setDeleteModalOpenState(!isDeleteModalOpen);
        }
     }, [selectedCardId, prevSelectedCardId]);

    useEffect(() => {
        if(galleryItems.length === 0 || (!prevUpdateSuccess && favoriteSuccess)) {
            dispatch(fetchGalleryList());
        }
    }, [dispatch, galleryItems, favoriteSuccess, prevUpdateSuccess]);

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
        dispatch(deleteGalleryItem({key: selectedCardId.key}));
        setItemName(selectedCardId.name);
    };

    const closeModalHandler = () => {
        setEditModalOpenState(false);
        setSelectedCard(null);
    };

    const closeDeleteModalHandler = () => {
        setDeleteModalOpenState(false);
        setSelectedCardId(null)
    };

    return (
        <section className="px-container text-center">
            <h1 className="text-center mb-40 text-colored">Gallery</h1>
            <div className="px-row">
               <GalleryList
                    loading={loading}
                    drawingData={galleryItems}
                    setSelectedCard={setSelectedCard}
                    setSelectedCardId={setSelectedCardId}
                />
            </div>
            <AppModal
                open={isEditModalOpen}
                title="Add Gallery Item"
                closeHandler={closeModalHandler}
            >
                <UploadGalleryItemForm
                    currentItem={selectedCard}
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
                   currentItemId={selectedCardId}
                   closeModalHandler={closeDeleteModalHandler}
                   removeFavoriteItem={removeFavoriteItem}
               />
            </AppModal>
        </section>
    )
}

export default Drawings;
