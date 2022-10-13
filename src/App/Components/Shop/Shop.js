import React, {useEffect} from 'react';
import {favoritesList} from '../../shared/selectors';
import DrawingItem from '../Drawings/DrawingItem/DrawingItem';
import {fetchGalleryList} from '../../Store/gallery-actions';
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
        if(!prevLoading && !loading) {
            dispatch(fetchGalleryList());
        }
    }, [selectedItems, loading, success]);

    return (
        <section className="px-container shop text-center">
            <h1 className="text-center text-colored mb-40">Favorites</h1>
            {favoriteItems ? (
                <ul className="shop__list">
                    {favoriteItems.map(item => (
                        <li>
                            <DrawingItem
                                loading={loading}
                                className="px-col-1"
                                shopView={true}
                                key={item.id}
                                item={item}
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                <div>
                    <h2 className="text-center">No favorite items</h2>
                </div>
            )}
        </section>
    )
};
export default Shop;
