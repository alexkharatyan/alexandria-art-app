import './Notification.scss';

const Notification = (props) => {
    return (
        <section className={`${props.status === 'error' ? 'error' : props.status === 'success' ? 'success' : ''}`}>
            <h2>{props.title}</h2>
            <p>{props.message}</p>
        </section>
    );
};

export default Notification;
