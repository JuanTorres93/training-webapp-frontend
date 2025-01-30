import FlashMessage from "./FlashMessage";

const ErrorFlashMessage = ({
    isVisible,
    description,
}) => {
    return (
        <FlashMessage
            isVisible={isVisible}
            title={'Error'}
            description={description}
            type={'error'}
        />
    );
};

export default ErrorFlashMessage;