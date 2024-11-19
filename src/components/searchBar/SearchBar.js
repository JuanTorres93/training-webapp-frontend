export default function SearchBar({
    placeholder,
    extraClasses = "",
}) {
    return (
        <div
            className={`search-bar ${extraClasses}`}
        >
            <figure className="search-bar__icon-box search-bar__icon-box--search">
                <ion-icon name="search-outline"></ion-icon>
            </figure>

            <div className="search-bar__input-box">
                <input
                    className="base-input-text search-bar__input"
                    type="text"
                    placeholder={placeholder}
                />

                <figure className="search-bar__icon-box search-bar__icon-box--close">
                    <ion-icon name="close-outline"></ion-icon>
                </figure>
            </div>

        </div>
    );
}