export default function ButtonNew({
    buttonText,
    onClick = () => { },
}) {
    return (
        <button
            onClick={onClick}
            className="button-new plain-btn"
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