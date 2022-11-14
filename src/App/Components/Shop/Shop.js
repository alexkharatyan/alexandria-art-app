import React, {useEffect} from 'react';
import {SkeletonLoading} from '../../Store/shared/SkeletonLoading/SkeletonLoading';
import DrawingItem from '../Drawings/DrawingItem/DrawingItem';
import {getUserFavoritesData, deleteUserFavoritesData} from '../../Store/gallery-actions';
import {useDispatch, useSelector} from 'react-redux';
import {usePrevious} from '../../hooks/usePrevious';
import './Shop.scss';

const Shop = (props) => {
    const dispatch = useDispatch();
    const {
        addUserFavoritesLoading,
        userFavoritesList,
        deleteUserFavoritesLoading,
        deleteUserFavoritesSuccess
    } = useSelector(state => state.gallery);
    const {userInfo} = useSelector(state => state.auth);
    const prevDeleteUserFavoritesLoading = usePrevious(deleteUserFavoritesLoading);

    useEffect(() => {
        if(prevDeleteUserFavoritesLoading && !deleteUserFavoritesLoading && deleteUserFavoritesSuccess) {
            dispatch(getUserFavoritesData({userId: userInfo?.localId}));
        }
    });

    const deleteFavoriteItemHandler = (item) => {
        dispatch(deleteUserFavoritesData({
            key: item.key,
            userId: userInfo?.localId
        }));
    };

    return (
        <section className="px-container shop text-center">
            <h1 className="text-center text-colored mb-40">Favorites</h1>
            <ul className="shop__list">
                {!addUserFavoritesLoading ? (
                    userFavoritesList?.map(item => (
                        <li>
                            <DrawingItem
                                deleteFavoriteItemHandler={deleteFavoriteItemHandler}
                                loading={addUserFavoritesLoading}
                                className="px-col-1"
                                shopView={true}
                                key={item.id}
                                item={item}
                            />
                        </li>
                    ))
                ) : !addUserFavoritesLoading && !userFavoritesList ? (
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
