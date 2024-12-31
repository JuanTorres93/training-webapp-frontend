const TemplatePresenter = ({
    id,
    name,
    description,
    isCommonTemplate = false,
    onMouseEnter = () => { },
    onMouseLeave = () => { },
    onClickEdit = () => { },
    onClickDelete = () => { },
}) => {
    return (
        <div
            className={`template-presenter ${isCommonTemplate ? 'template-presenter--no-actions' : ''}`}
            onMouseLeave={onMouseLeave}
            onMouseEnter={onMouseEnter}
        >
            <div className="template-presenter__info-box">
                <span className="template-presenter__name">
                    {name}
                </span>
                <p className="template-presenter__description">
                    {description}
                </p>
            </div>

            <div className="template-presenter__actions-box">
                <div
                    className="template-presenter__icon-box template-presenter__icon-box--delete"
                    enabled={isCommonTemplate ? 'false' : 'true'}
                    onClick={onClickDelete}
                >
                    <ion-icon name="trash-outline"></ion-icon>
                </div>

                {/* <div
                    className="template-presenter__icon-box template-presenter__icon-box--duplicate"
                    enabled={isCommonTemplate ? 'false' : 'true'}
                >
                    <ion-icon name="copy-outline"></ion-icon>
                </div> */}

                <div
                    className="template-presenter__icon-box template-presenter__icon-box--edit"
                    enabled={isCommonTemplate ? 'false' : 'true'}
                    onClick={onClickEdit}
                >
                    <ion-icon name="create-outline"></ion-icon>
                </div>
            </div>

            <div className="template-presenter__start-box">
                <button className="plain-btn template-presenter__launch-template">
                    TRAIN!
                </button>
            </div>
        </div>
    );
}

export default TemplatePresenter;