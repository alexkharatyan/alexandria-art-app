import React, {useState} from 'react';
import DrawingItem from "../DrawingItem/DrawingItem";
import {useSelector} from 'react-redux';
import './GalleryList.scss';
// import FsLightbox from 'fslightbox-react';

const GalleryList = (props) => {
    const {drawingData, loading} = props;
    // const {selectedItems} = useSelector(state => state.cart);
    // const [toggler, setToggler] = useState(false);

    return (
        drawingData.map((item, index) => {
            return (
                <>
                    {/*<button onClick={() => setToggler(!toggler)}>*/}
                    {/*    Toggle Lightbox*/}
                    {/*</button>*/}
                    {/*<FsLightbox*/}
                    {/*    toggler={toggler}*/}
                    {/*    sources={[*/}
                    {/*        'https://i.imgur.com/fsyrScY.jpg',*/}
                    {/*        'https://www.youtube.com/watch?v=3nQNiWdeH2Q',*/}
                    {/*        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'*/}
                    {/*    ]}*/}
                    {/*/>*/}
                    <DrawingItem
                        loading={loading}
                        index={index}
                        key={item.id}
                        item={item}
                    />
                </>
            )
        })
    )
}

export default GalleryList;
