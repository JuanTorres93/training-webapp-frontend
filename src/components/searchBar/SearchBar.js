import React, { useState } from "react";

export default function SearchBar({
    placeholder,
    extraClasses = "",
    dataTestId = "",
    parentSearchSetterFunction,
}) {
    const [searchValue, setSearchValue] = useState('');

    const handleChange = (event) => {
        const value = event.target.value;

        if (parentSearchSetterFunction) {
            parentSearchSetterFunction(value);
        }

        setSearchValue(value);
    };

    const handleClear = () => {
        setSearchValue('');
        if (parentSearchSetterFunction) {
            parentSearchSetterFunction('');
        }
    };

    return (
        <div
            className={`search-bar ${extraClasses}`}
        >
            <figure className="search-bar__icon-box search-bar__icon-box--search">
                <ion-icon name="search-outline"></ion-icon>
            </figure>

            <div className="search-bar__input-box">
                <input
                    data-testid={dataTestId ? dataTestId : undefined}
                    className="base-input-text search-bar__input"
                    onChange={handleChange}
                    value={searchValue}
                    type="text"
                    placeholder={placeholder}
                />

                <figure
                    className="search-bar__icon-box search-bar__icon-box--close"
                    onMouseDown={handleClear}
                >
                    <ion-icon name="close-outline"></ion-icon>
                </figure>
            </div>

        </div>
    );
}