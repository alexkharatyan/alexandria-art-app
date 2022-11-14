import React from 'react';
import './AppModal.scss';

export const AppModal = (props) => {
    const {title, children, open, closeHandler} = props;
    return (
        <>
            {open ? (
                <div className="px-modal px-modal--overlay">
                    <div className="px-modal__content">
                        <h2 className="px-modal__content__title">{title}</h2>
                        <span onClick={() => closeHandler()} className="close-modal">
                            <i className="fa-solid fa-xmark"/>
                        </span>
                        <div>
                            {children}
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
} ;
