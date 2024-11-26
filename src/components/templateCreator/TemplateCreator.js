import TranslatedSearchBar from "../searchBar/TranslatedSearchBar";
import TranslatedButtonNew from "../ButtonNew/TranslatedButtonNew";

const TemplateCreator = ({
    nameLabel = "Name",
    descriptionLabel = "Description",
}) => {
    // TODO traducir
    return (
        // TODO HACERLO TODO UNA SOLA GRID PARA MEJOR ALINEACIÓN
        <div className="template-creator">
            <div className="template-creator__exercises-box template-creator__subgrid">
                <TranslatedSearchBar
                    extraClasses="template-creator__exercise-search-bar"
                />
                <TranslatedButtonNew
                    extraClasses="template-creator__exercise-button-new"
                // onClick={handleClickShowPopup}
                />
                <div className="template-creator__available-exercises-box">
                    {/* TODO use ExercisePresenter component */}
                    AVAILABLE EXERCISE
                </div>
            </div>
            <div className="template-creator__templates-box template-creator__subgrid">
                <div className="template-creator__input-box">
                    <label htmlFor="name" className="template-creator__label">{nameLabel}</label>
                    <input
                        id="name"
                        className="base-input-text template-creator__input"
                        type="text"
                        placeholder={nameLabel}
                        maxLength={40}
                    />
                </div>

                <div className="template-creator__input-box">
                    <label htmlFor="description" className="template-creator__label">{descriptionLabel}</label>
                    <textarea
                        id="description"
                        className="base-input-text template-creator__input"
                        placeholder={descriptionLabel}
                        maxLength={500}
                    >

                    </textarea>
                </div>
                <div className="template-creator__used-exercises-box">
                    {/* TODO use ExercisePresenter component */}
                    USED EXERCISE
                </div>
            </div>
        </div>
    );
};

export default TemplateCreator;