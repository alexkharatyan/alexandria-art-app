import React, {useEffect, useState} from 'react';
// import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import {fetchGalleryList} from '../../Store/gallery-actions';
import {usePrevious} from '../../hooks/usePrevious';
import GalleryList from './GalleryList/GalleryList';
import {useDispatch, useSelector} from 'react-redux';
import './Drawings.scss';

const Drawings = (props) => {
    const dispatch = useDispatch();
    const {galleryItems, loading, success} = useSelector(state => state.gallery);
    // const prevListLoading = usePrevious(loading);
    const [modifiedGalleryList, setModifiedGalleryList] = useState([]);

    useEffect(() => {
        if(!galleryItems) {
            dispatch(fetchGalleryList());
        }
        if(galleryItems) {
            const modifiedItems = [];
            for(const key in galleryItems) {
                modifiedItems.push({
                    id: key,
                    name: galleryItems[key].name,
                    image: galleryItems[key].image,
                    description: galleryItems[key].description,
                    price: galleryItems[key].price
                })
            }
            setModifiedGalleryList(modifiedItems);
        }
        console.log(loading);
        if(loading){
            // debugger;
        }
    }, [dispatch, galleryItems, success, loading]);

    return (
        <section className="px-container">
            <h1 className="text-center mb-40">Gallery</h1>
            <div className="px-row">
               <GalleryList
                    loading={loading}
                    drawingData={modifiedGalleryList}
                />
            </div>
        </section>
    )
}

export default Drawings;
