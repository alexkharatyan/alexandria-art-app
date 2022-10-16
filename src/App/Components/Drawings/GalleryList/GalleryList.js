import React from 'react';
import {SkeletonLoading} from '../../../Store/shared/SkeletonLoading/SkeletonLoading';
import DrawingItem from "../DrawingItem/DrawingItem";
import './GalleryList.scss';
// import FsLightbox from 'fslightbox-react';

const GalleryList = (props) => {
    const {
        loading,
        closedModal,
        drawingData,
        isEditModalOpen,
        setSelectedCard,
        closeModalHandler,
        favoriteItemHandler
    } = props;
    // const [toggler, setToggler] = useState(false);

    // loading &&  console.log('loading', loading);
    return (
        <>
            <>
                {!loading ? (
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
                                    favoriteItemHandler={favoriteItemHandler}
                                    closeModalHandler={closeModalHandler}
                                    setSelectedCard={setSelectedCard}
                                    isEditModalOpen={isEditModalOpen}
                                    closedModal={closedModal}
                                    loading={loading}
                                    index={index}
                                    key={item.id}
                                    item={item}
                                />
                            </>
                        )
                    })
                ) : (
                    <SkeletonLoading type={'LINE'}/>
                )}
            </>
        </>
    )
}

export default GalleryList;
