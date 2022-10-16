import React from 'react';
import './SkeletonLoading.scss';

const PROFILE = 'PROFILE';
const CARD = 'CARD';
const LINE = 'LINE';

export const SkeletonLoading = (props) => {
    const {styles = {}, className = '', type = ''} = props;

    const renderSkeletonLoading = () => {
        switch (type) {
            case PROFILE :
                return (
                    <div className="skeleton skeleton--profile">
                        <div className="skeleton--profile__photo loading" />
                        <div className="skeleton--profile__title loading" />
                        <div className="skeleton--profile__line loading line-loading" />
                    </div>
                );
            case CARD :
                return (
                    <div
                        className={`skeleton skeleton--list ${className}`}
                        style={styles}
                    >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                            <div className=" px-col">
                                <div className="gallery-item loading">
                                    <div className="gallery-item__image"/>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case LINE :
                return (
                    <>
                        {[1,2,3,4,5,6].map((item) => (
                            <div className="skeleton px-col px-col-1">
                                <div className="loading " style={styles} />
                            </div>
                        ))}
                    </>
                );
            default: return
        }
    };

    return renderSkeletonLoading();
};
