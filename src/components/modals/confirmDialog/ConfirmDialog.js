import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element for accessibility

const ConfirmDialog = ({ isOpen, onRequestClose, onConfirm, message }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Confirm Dialog"
            className="modal"
            overlayClassName="overlay"
        >
            <div className="modal-content">
                <p>{message}</p>
                <div className="user-choice-container">
                    <button className='dull-user-choice' onClick={onRequestClose}>No</button>
                    <button onClick={onConfirm}>Yes</button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmDialog;