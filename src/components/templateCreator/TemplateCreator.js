import TranslatedSearchBar from "../searchBar/TranslatedSearchBar";
import TranslatedButtonNew from "../ButtonNew/TranslatedButtonNew";

const TemplateCreator = () => {
    return (
        <div className="template-creator">
            <div className="template-creator__exercises-box">
                Exercises box

                <TranslatedSearchBar
                    extraClasses="exercises-page__search-bar"
                />
                <TranslatedButtonNew
                    extraClasses="exercises-page__button-new"
                // onClick={handleClickShowPopup}
                />
            </div>
            <div className="template-creator__template-box">
                template box
            </div>
        </div>
    );
};

export default TemplateCreator;