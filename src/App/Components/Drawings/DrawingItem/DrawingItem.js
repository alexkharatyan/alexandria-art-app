import React from 'react';
import {SkeletonLoading} from '../../shared/SkeletonLoading/SkeletonLoading';
import './DrawingItem.scss';

const DrawingItem = (props) => {
    const {item, loading} = props;

    // const innerPageNavigationHandler = () =>{
    //
    // };

    return (
        <div className="px-col">
            <figure className="gallery-item">
                <div className="gallery-item__image">
                    {!loading ? (
                      <>
                          <img width="200" height="300" src={item.image} alt={item.name}/>
                          <p className="gallery-item__description">{item.description}</p>
                      </>
                    ) : <SkeletonLoading type={'LINE'}/>}
                </div>
                <figcaption className="gallery-item__name">
                    <h2>{item.name}</h2>
                </figcaption>
            </figure>
        </div>
    )
}

export default DrawingItem;
