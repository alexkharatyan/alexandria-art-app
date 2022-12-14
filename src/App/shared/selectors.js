import { createSelector } from '@reduxjs/toolkit'

const galleryItems = state => state.gallery.galleryItems;

export const favoritesList = createSelector(galleryItems, items => items.filter(item => item.isFavorite));
