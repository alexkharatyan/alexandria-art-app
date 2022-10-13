import React from 'react';
import './SkeletonLoading.scss';

const PROFILE = 'PROFILE';
const LINE = 'LINE';

export const SkeletonLoading = (props) => {
    const {dimensions = {}, type} = props;

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
            case LINE :
                return (
                    <div
                        className="skeleton skeleton--list loading"
                        style={{
                            width: dimensions.width,
                            height: dimensions.height,
                        }}
                    />
                );
            default: return
        }
    };

    return renderSkeletonLoading();
};
