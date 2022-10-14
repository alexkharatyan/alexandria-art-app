import React from 'react';

export const DeleteGalleryItemModal = (props) => {
    const {itemName, removeFavoriteItem, closeModalHandler, currentItemId} = props;
        return (
            <div>
                <p className="mb-40">Are you sure you want to delete <b>{itemName?.name}</b> from Gallery?</p>
                <div className="counter-box__actions">
                    <button className="px-button-primary" type='submit'
                    onClick={closeModalHandler}>
                        <span className="text">Cancel</span>
                    </button>
                    <button className="px-button-primary" type='submit'
                            onClick={removeFavoriteItem}>
                        <span className="text">Delete</span>
                    </button>
                </div>
            </div>
        )
    }
;
