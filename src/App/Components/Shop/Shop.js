import React, {useEffect, useState} from 'react';
import {SkeletonLoading} from '../../Store/shared/SkeletonLoading/SkeletonLoading';
import DrawingItem from '../Drawings/DrawingItem/DrawingItem';
import {fetchGalleryList, updateGalleryFavoritesList} from '../../Store/gallery-actions';
import {favoritesList} from '../../shared/selectors';
import {useDispatch, useSelector} from 'react-redux';
import {usePrevious} from '../../hooks/usePrevious';
import {FAVORITE} from '../Drawings/constants';
import './Shop.scss';

const Shop = (props) => {
    const dispatch = useDispatch();
    const {selectedItems} = useSelector(state => state.cart);
    const {loading, success} = useSelector(state => state.gallery);
    const favoriteItems = useSelector(favoritesList);
    const prevLoading = usePrevious(loading);
    const [selectedCard, setSelectedCard] = useState({values: null, type: ''});
    const prevSelectedCard = usePrevious(selectedCard);

    useEffect(() => {
        if((!prevSelectedCard?.values && selectedCard?.values && selectedCard?.type === FAVORITE)) {
            favoriteItemHandler(selectedCard?.values);
        }
    }, [selectedCard, prevSelectedCard]);

    useEffect(() => {
        if (!prevLoading && !loading) {
            dispatch(fetchGalleryList());
            setSelectedCard({values: null, type: ''});
        }
    }, [selectedItems, loading, success]);

    const favoriteItemHandler = (item) => {
        // console.log('fav item=====', item);
        dispatch(updateGalleryFavoritesList({
            key: item.key,
            isFavorite: !item.isFavorite
        }));
    };

    return (
        <section className="px-container shop text-center">
            <h1 className="text-center text-colored mb-40">Favorites</h1>
            <ul className="shop__list">
                {!loading ? (
                    favoriteItems.map(item => (
                        <li>
                            <DrawingItem
                                setSelectedCard={setSelectedCard}
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
