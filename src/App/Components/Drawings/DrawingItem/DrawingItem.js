import React from 'react';
import {useSelector} from 'react-redux';
import ReactTooltip from 'react-tooltip';
import {DELETE, EDIT, FAVORITE} from '../constants';
import {isEmpty} from 'lodash';
import './DrawingItem.scss';
import cx from 'classnames';

const DrawingItem = (props) => {
    const {
        item,
        loading,
        className = "",
        favoriteItems,
        shopView = false,
        setSelectedCard,
        deleteFavoriteItemHandler
    } = props;
    const {userInfo, isAdmin} = useSelector((state) => state.auth);

    const isFavoriteItem = favoriteItems?.find(favItem => favItem?.key === item?.key) ? true : false;

    return (
        <>
            <div className={cx('px-col', className)}>
                <figure className={cx('gallery-item',
                    {
                        'gallery-item--shop-view': shopView
                    })}>
                    <div className="gallery-item__image">
                        <div className="actions">
                            {!shopView && !isEmpty(userInfo) ? (
                                <>
                                    {
                                        isAdmin && (
                                            <>
                                                <i onClick={() => setSelectedCard({values: {...item}, type: DELETE})}
                                                   data-tip="Remove"
                                                   className="fa-solid fa-trash"/>
                                                <i onClick={() => setSelectedCard({values: {...item}, type: EDIT})}
                                                   data-tip="Edit"
                                                   className="fa-solid fa-pencil"/>
                                            </>
                                        )
                                    }

                                    <i onClick={() => setSelectedCard({values: {...item, isFavoriteItem}, type: FAVORITE})}
                                       data-tip={!isFavoriteItem ? 'Like' : 'Unlike'}
                                       className={cx('fa-regular fa-heart',
                                           {
                                               'fa-solid': isFavoriteItem
                                           })}
                                    />
                                    <ReactTooltip/>
                                </>
                            ) : null}
                        </div>
                        {!loading ? (
                            <>
                                <img width="200" height="300" src={item.image} alt={item.name}/>
                                {!shopView ? <p className="gallery-item__description">{item.description}</p> : null}
                            </>
                        ) :
                            null
                        }
                    </div>
                    <figcaption className="gallery-item__caption">
                        <div className="gallery-item__caption__info">
                            {shopView ? (
                                <>
                                    <div className="pos-actions alex">
                                        {/*<i className="fa-solid fa-plus" />*/}
                                        {/*<i className="fa-solid fa-minus"/>*/}
                                        <i
                                            onClick={() => deleteFavoriteItemHandler(item)}
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
