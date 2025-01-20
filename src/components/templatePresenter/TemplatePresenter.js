import React, { useState, useEffect } from "react";

const TemplatePresenter = ({
    id,
    name,
    description,
    isCommonTemplate = false,
    onClickStart = () => { },
    onMouseEnter = () => { },
    onMouseLeave = () => { },
    onClickEdit = () => { },
    onClickDelete = () => { },
    isLoading = false,
    disableActions = false,
}) => {
    // state for enable and disable actions
    const [isActionsEnabled, setIsActionsEnabled] = useState(true);

    // state for enable and disable launch button
    const [isLaunchEnabled, setIsLaunchEnabled] = useState(true);

    useEffect(() => {
        const actionsDisabled = isLoading || disableActions || isCommonTemplate;
        setIsActionsEnabled(!actionsDisabled);
    }, [isLoading, isCommonTemplate, disableActions]);

    useEffect(() => {
        const launchdDisabled = isLoading || disableActions;
        setIsLaunchEnabled(!launchdDisabled);
    }, [isLoading, disableActions]);


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
                    className={`
                        template-presenter__icon-box 
                        template-presenter__icon-box--delete
                        ${isActionsEnabled ? '' : 'template-presenter__icon-box--disabled'}
                        `}
                    disabled={!isActionsEnabled}
                    onClick={!isActionsEnabled ? () => { } : onClickDelete}
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
                    className={`
                        template-presenter__icon-box 
                        template-presenter__icon-box--edit
                        ${isActionsEnabled ? '' : 'template-presenter__icon-box--disabled'}
                        `}
                    disabled={!isActionsEnabled}
                    onClick={!isActionsEnabled ? () => { } : onClickEdit}
                >
                    <ion-icon name="create-outline"></ion-icon>
                </div>
            </div>

            <div className="template-presenter__start-box">
                <button
                    className={`
                        plain-btn template-presenter__launch-template
                        ${!isLaunchEnabled ? 'template-presenter__launch-template--disabled' : ''}
                        `}
                    onClick={!isLaunchEnabled ? () => { } : onClickStart}
                    disabled={!isLaunchEnabled}
                >
                    {
                        isLoading ?
                            <div className="spinner-2p2-rem"></div>
                            : "TRAIN!"
                    }
                </button>
            </div>
        </div>
    );
}

export default TemplatePresenter;