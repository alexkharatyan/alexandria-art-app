import React from 'react';
import { Formik, Form, Field } from 'formik';

const UploadGalleryItemForm = (props) => {
    const {currentItem, submitHandler, closeHandler} = props;

    return (
        <Formik
            initialValues={currentItem ? currentItem : {
                name: '',
                image: '',
                price: '',
                category: '',
                description: '',
            }}
            onSubmit={(values, {resetForm}) => {
                submitHandler(values);
                resetForm({value: ''});
            }}
        >
            <Form>
                <fieldset>
                    <div className='control'>
                        <label htmlFor="name">Name</label>
                        <Field className="px-input" id="name" name="name" placeholder="" />
                    </div>
                </fieldset>
                <fieldset>
                    <div className='control'>
                        <label htmlFor="description">Description</label>
                        <Field className="px-input" id="description" name="description" placeholder="" />
                    </div>
                </fieldset>
                <fieldset>
                    <div className='control'>
                        <label htmlFor="image">Image URL</label>
                        <Field className="px-input" id="image" name="image" placeholder="" />
                    </div>
                </fieldset>
                <fieldset>
                    <div className='control'>
                        <label htmlFor="price">Price</label>
                        <Field className="px-input" id="price" name="price" placeholder="" />
                    </div>
                </fieldset>
                <fieldset>
                    <div className='control'>
                        <label htmlFor="category">Category</label>
                        <Field className="px-input" id="category" name="category" placeholder="" />
                    </div>
                </fieldset>
                <div className="counter-box__actions">
                    <button className="px-button-primary" type="button" onClick={closeHandler}><span className="text">Cancel</span></button>
                    <button className="px-button-primary" type='submit'><span className="text">Save</span></button>
                </div>
            </Form>
        </Formik>
    );
};

export default UploadGalleryItemForm;
