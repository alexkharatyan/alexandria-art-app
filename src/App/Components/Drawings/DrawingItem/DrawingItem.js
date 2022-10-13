import React, {useState} from 'react';
import {SkeletonLoading} from '../../../Store/shared/SkeletonLoading/SkeletonLoading';
import {updateGalleryList} from '../../../Store/gallery-actions';
import {cartActions} from '../../../Store/cartSlice';
import {useDispatch, useSelector} from 'react-redux';
import ReactTooltip from 'react-tooltip';
import cx from 'classnames';
import './DrawingItem.scss';

const DrawingItem = (props) => {
    const {item, loading, className = "", shopView = false} = props;
    const dispatch = useDispatch();
    const {idToken} = useSelector(
        (state) => state.auth,
    );

    const favoriteItemHandler = () => {
        console.log('click');
        dispatch(updateGalleryList({
            id: item.id,
            isFavorite: !item.isFavorite
        }));
    };

    // TODO: LATER
    const removeFavoriteItem = () => {
        dispatch(cartActions.removeItemFromCart(item.id));
    };

    return (
        <div className={cx('px-col', className)}>
            <figure className={cx('gallery-item',
                {
                    'gallery-item--shop-view': shopView
                })}>
                <div className="gallery-item__image">
                    <div className="actions">
                        {!shopView && idToken ? (
                            <i onClick={favoriteItemHandler}
                               className={cx('fa-regular fa-heart',
                                   {
                                       'fa-solid': item.isFavorite
                               })}
                            />
                        ) : null}
                    </div>
                    {!loading ? (
                        <>
                            <img width="200" height="300" src={item.image} alt={item.name}/>
                            {!shopView ? <p className="gallery-item__description">{item.description}</p> : null}
                        </>
                    ) : <SkeletonLoading type={'LINE'}/>}
                </div>
                <figcaption className="gallery-item__caption">
                    <div className="gallery-item__caption__info">
                        {shopView ? (
                            <>
                                <div className="pos-actions">
                                    {/*<i className="fa-solid fa-plus" />*/}
                                    {/*<i className="fa-solid fa-minus"/>*/}
                                    <i onClick={favoriteItemHandler}
                                       data-tip="Unselect"
                                       className="fa-solid fa-heart" />
                                    <ReactTooltip />
                                </div>
                                <div>
                                    <h2 className="name">{item.name}</h2>
                                    <h3 className="description">{item.description}</h3>
                                    <p>${item.price}</p>
                                </div>
                            </>
                        ) : (
                            <h2 className="name">{item.name}</h2>
                        )}
                    </div>
                </figcaption>
            </figure>
        </div>
    )
}

export default DrawingItem;
