import React from 'react';
import loadingImg from '../../../assets/images/loader.png';
import './LoadingSpinner.scss';

const LoadingSpinner = (props) => {
    return (
        <div className="text-center loader-spinner">
            <img width='50' height='50' src={loadingImg} alt="loading..."/>
        </div>
    )
};
export default LoadingSpinner;
