import React, {useEffect} from 'react';
// import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import {fetchGalleryList} from '../../Store/gallery-actions';
import {usePrevious} from '../../hooks/usePrevious';
import GalleryList from './GalleryList/GalleryList';
import {useDispatch, useSelector} from 'react-redux';
import './Drawings.scss';

const Drawings = (props) => {
    const dispatch = useDispatch();
    const {galleryItems, loading} = useSelector(state => state.gallery);
    const {favoriteSuccess} = useSelector(state => state.cart);
    const prevUpdateSuccess = usePrevious(favoriteSuccess);

    useEffect(() => {
        if(galleryItems.length === 0 || (!prevUpdateSuccess && favoriteSuccess)) {
            dispatch(fetchGalleryList());
        }
    }, [dispatch, galleryItems, favoriteSuccess]);

    return (
        <section className="px-container text-center">
            <h1 className="text-center mb-40 text-colored">Gallery</h1>
            <div className="px-row">
               <GalleryList
                    loading={loading}
                    drawingData={galleryItems}
                />
            </div>
        </section>
    )
}

export default Drawings;
