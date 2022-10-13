import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import notFoundImg from '../../../assets/images/not-found.jpeg';
import './PageNotFound.scss';

const PageNotFound = () => {
    const history = useHistory();

    useEffect(() => {
        setTimeout(() => {
           history.replace('/');
       }, 2000);
    });
    return (
        <section className='px-container not-found'>
            <img width={300} src={notFoundImg} alt="Page Not Found"/>
            <h1 className="text-center text-colored">Page Not Found</h1>
        </section>
    );
};
export default PageNotFound;
