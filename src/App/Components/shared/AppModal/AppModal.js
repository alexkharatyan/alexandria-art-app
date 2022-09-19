import React from 'react';
import './AppModal.scss';

export const AppModal = (props) => {
    const {title, closeHandler, children} = props;
    return (
        <div className="px-modal px-modal--overlay">
            <div className="px-modal__content">
                <h2 className="px-modal__content__title">{title}</h2>
                <span onClick={() => closeHandler()} className="close-modal">close</span>
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
} ;
