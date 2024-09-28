import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element for accessibility

const Alert = ({ isOpen, onRequestClose, message }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Alert Dialog"
            className="modal"
            overlayClassName="overlay"
        >
            <div className="modal-content">
                <p>{message}</p>
                <button onClick={onRequestClose}>Ok</button>
            </div>
        </Modal>
    );
};

export default Alert;