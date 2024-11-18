export default function ButtonNew({
    buttonText,
    extraClasses = "",
    onClick = () => { },
}) {
    return (
        <button
            onClick={onClick}
            className={`button-new plain-btn ${extraClasses}`}
        >
            <figure className="button-new__icon-box">
                <ion-icon name="add-outline"></ion-icon>
            </figure>
            <span className="button-new__text">
                {buttonText}
            </span>
        </button>
    );
}