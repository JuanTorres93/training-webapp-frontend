import FlashMessage from "./FlashMessage";

const ErrorFlashMessage = ({
    isVisible,
    description,
    onClose,
}) => {
    return (
        <FlashMessage
            isVisible={isVisible}
            title={'Error'}
            description={description}
            type={'error'}
            onClose={onClose}
        />
    );
};

export default ErrorFlashMessage;