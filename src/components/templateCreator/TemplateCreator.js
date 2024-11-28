import ExercisePresenterV2 from "../exercisePresenter/ExercisePresenterV2";
import TranslatedSearchBar from "../searchBar/TranslatedSearchBar";
import TranslatedButtonNew from "../ButtonNew/TranslatedButtonNew";

const TemplateCreator = ({
    nameLabel = "Template name",
    descriptionLabel = "Template description",
}) => {
    // TODO traducir
    return (
        <div className="template-creator">
            <TranslatedSearchBar
                extraClasses="template-creator__exercise-search-bar"
            />
            <TranslatedButtonNew
                extraClasses="template-creator__exercise-button-new"
            // onClick={handleClickShowPopup}
            />

            <div className="template-creator__separator template-creator__separator--available-exercises separator-text-between-lines">Available exercises</div>

            <div className="template-creator__available-exercises-box">
                <ExercisePresenterV2
                    extraClasses="exercise-presenter--no-actions"
                    id="1"
                    name="Pull up"
                    description="Exercise for the back muscles. It is a compound exercise that also involves the biceps, forearms, traps, and the rear deltoids. The pull up is a basic movement that is very valuable for building strength and muscle mass."
                // onClickEdit={handleClickShowPopup}
                />

                <ExercisePresenterV2
                    extraClasses="exercise-presenter--no-actions"
                    id="2"
                    name="Push up"
                    description="Exercise for the chest muscles. It is a compound exercise that also involves the triceps and the front deltoids. The push up is a basic movement that is very valuable for building strength and muscle mass."
                // onClickEdit={handleClickShowPopup}
                />

                <ExercisePresenterV2
                    extraClasses="exercise-presenter--no-actions"
                    id="3"
                    name="Squat"
                    description="Exercise for the leg muscles. It is a compound exercise that also involves the glutes, hamstrings, quads, and lower back. The squat is a basic movement that is very valuable for building strength and muscle mass."
                // onClickEdit={handleClickShowPopup}
                />
            </div>
            <div className="template-creator__input-box template-creator__input-box--name">
                <label htmlFor="name" className="template-creator__label">{nameLabel}</label>
                <input
                    id="name"
                    className="base-input-text template-creator__input"
                    type="text"
                    placeholder={nameLabel}
                    maxLength={40}
                />
            </div>

            <div className="template-creator__input-box template-creator__input-box--description">
                <label htmlFor="description" className="template-creator__label">{descriptionLabel}</label>
                <textarea
                    id="description"
                    className="base-input-text template-creator__input"
                    placeholder={descriptionLabel}
                    maxLength={500}
                >

                </textarea>
            </div>

            <div className="template-creator__confirm-button-box">
                {/* TODO CREAR UN BOTÓN DE CONFIRMACIÓN. COMPONENTE LLAMADO BUTTON ICON AND TEXT */}
                {/* TODO BORRAR ESTE TEXTO */}
                BUTTON
            </div>

            <div className="template-creator__separator template-creator__separator--used-exercises separator-text-between-lines">Selected exercises</div>

            <div className="template-creator__used-exercises-box">
                <ExercisePresenterV2
                    extraClasses="exercise-presenter--creating-template"
                    orderInTemplate={1}
                    id="2"
                    name="Push up"
                    description="Exercise for the chest muscles. It is a compound exercise that also involves the triceps and the front deltoids. The push up is a basic movement that is very valuable for building strength and muscle mass."
                // onClickEdit={handleClickShowPopup}
                />

                <ExercisePresenterV2
                    extraClasses="exercise-presenter--creating-template"
                    orderInTemplate={2}
                    id="3"
                    name="Squat"
                    description="Exercise for the leg muscles. It is a compound exercise that also involves the glutes, hamstrings, quads, and lower back. The squat is a basic movement that is very valuable for building strength and muscle mass."
                // onClickEdit={handleClickShowPopup}
                />
            </div>
        </div>
    );
};

export default TemplateCreator;