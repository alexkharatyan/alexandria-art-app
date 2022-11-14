import React, {useEffect} from 'react';
import {fetchGalleryList, getUserFavoritesData} from '../Store/gallery-actions';
import {useDispatch, useSelector} from 'react-redux';
import {usePrevious} from '../hooks/usePrevious';
import {isEmpty} from 'lodash';

const GalleryFetchDataWrapper = (props) => {
    const {Component} = props;
    const {
        galleryItems,
        galleryListLoading,
    } = useSelector(state => state.gallery);
    const {userInfo} = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const prevGalleryListLoading = usePrevious(galleryListLoading);
    const prevUserInfo = usePrevious(userInfo);

    useEffect(() => {
        if(galleryItems.length === 0 && !prevGalleryListLoading && !galleryListLoading) {
            // debugger;
            dispatch(fetchGalleryList());
        }
    });

    useEffect(() => {
        if(isEmpty(prevUserInfo) && !isEmpty(userInfo)) {
            dispatch(getUserFavoritesData({
                userId: userInfo.localId,
            }));
        }
    }, [prevUserInfo, userInfo]);

    return (
        <>
            <Component />
        </>
    )
};
export default GalleryFetchDataWrapper;
