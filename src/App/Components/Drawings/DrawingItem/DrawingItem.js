import React from 'react';
import {SkeletonLoading} from '../../../Store/shared/SkeletonLoading/SkeletonLoading';
import {updateGalleryFavoritesList} from '../../../Store/gallery-actions';
import {useDispatch, useSelector} from 'react-redux';
import ReactTooltip from 'react-tooltip';
import cx from 'classnames';
import './DrawingItem.scss';

const DrawingItem = (props) => {
    const {item, loading, className = "", shopView = false, setSelectedCard, setSelectedCardId} = props;
    const {idToken} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const favoriteItemHandler = () => {
        dispatch(updateGalleryFavoritesList({
            key: item.key,
            isFavorite: !item.isFavorite
        }));
    };

    return (
        <>
            <div className={cx('px-col', className)}>
                <figure className={cx('gallery-item',
                    {
                        'gallery-item--shop-view': shopView
                    })}>
                    <div className="gallery-item__image">
                        <div className="actions">
                            {!shopView && idToken ? (
                                <>
                                    <i onClick={() => setSelectedCardId({...item})}
                                        // data-tip="remove"
                                       className="fa-solid fa-trash"/>
                                    <i onClick={() => setSelectedCard({...item})}
                                        // data-tip="Edit"
                                       className="fa-solid fa-pencil"/>
                                    <i onClick={favoriteItemHandler}
                                       className={cx('fa-regular fa-heart',
                                           {
                                               'fa-solid': item.isFavorite
                                           })}
                                    />
                                </>
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
                                           className="fa-solid fa-heart"/>
                                        <ReactTooltip/>
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
        </>
    )
}

export default DrawingItem;
