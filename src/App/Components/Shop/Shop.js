import React, {useEffect} from 'react';
import {SkeletonLoading} from '../../Store/shared/SkeletonLoading/SkeletonLoading';
import DrawingItem from '../Drawings/DrawingItem/DrawingItem';
import {fetchGalleryList} from '../../Store/gallery-actions';
import {favoritesList} from '../../shared/selectors';
import {useDispatch, useSelector} from 'react-redux';
import {usePrevious} from '../../hooks/usePrevious';
import './Shop.scss';

const Shop = (props) => {
    const dispatch = useDispatch();
    const {selectedItems} = useSelector(state => state.cart);
    const {loading, success} = useSelector(state => state.gallery);
    const favoriteItems = useSelector(favoritesList);
    const prevLoading = usePrevious(loading);

    useEffect(() => {
        if (!prevLoading && !loading) {
            dispatch(fetchGalleryList());
        }
    }, [selectedItems, loading, success]);

    return (
        <section className="px-container shop text-center">
            <h1 className="text-center text-colored mb-40">Favorites</h1>
            <ul className="shop__list">
                {!loading ? (
                    favoriteItems.map(item => (
                        <li>
                            <DrawingItem
                                loading={loading}
                                className="px-col-1"
                                shopView={true}
                                key={item.id}
                                item={item}
                            />
                        </li>
                    ))
                ) : !loading && !favoriteItems ? (
                    <div>
                        <h2 className="text-center">No favorite items</h2>
                    </div>
                ) : (
                    <SkeletonLoading styles={{height: '157px'}} type={'LINE'}/>
                )}
            </ul>
        </section>
    )
};
export default Shop;
