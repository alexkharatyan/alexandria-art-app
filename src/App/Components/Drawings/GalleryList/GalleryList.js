import React from 'react';
import DrawingItem from "../DrawingItem/DrawingItem";
import './GalleryList.scss';

const GalleryList = (props) => {
    const {drawingData, loading} = props;
    console.log(drawingData);
    return (
        drawingData.map((item, index) => {
            return (
                <>
                    {loading ? <div>aleeeex</div> : null}
                    <DrawingItem loading={loading} key={item.key} item={item}/>
                </>
            )
        })
    )
}

export default GalleryList;
