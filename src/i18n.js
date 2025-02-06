import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import store for being able to dispatch actions without being
// in a React component
import { store } from './app/store';
import { setLanguage } from './features/language/languageSlice';

import translationEn from './locales/en/translation.json';
import translationEs from './locales/es/translation.json';


// Detect navigator language
const userLanguage = navigator.language || navigator.userLanguage;

// Gets the language code (first two characters)
// e.g. 'es-ES' -> returns 'es'
// e.g. 'en-US' -> returns 'en'
const machineLanguage = userLanguage.split('-')[0];

i18n
    .use(initReactI18next) // React integration
    .init({
        resources: {
            en: { translation: translationEn },
            es: { translation: translationEs },
        },
        lng: machineLanguage,
        fallbackLng: 'en', // Default language
        interpolation: { escapeValue: false }, // XSS protection
    });

export let currentLanguage = i18n.language;

export const changeLanguage = () => {
    if (i18n.language === "en") {
        // For keeping track in this file
        currentLanguage = "es";
        // For keeping track in the rest of the app
        store.dispatch(setLanguage("es"));
        return i18n.changeLanguage("es");
    } else {
        // For keeping track in this file
        currentLanguage = "en";
        // For keeping track in the rest of the app
        store.dispatch(setLanguage("en"));
        return i18n.changeLanguage("en");
    }
};

export const processCommonResourcesFromDb = (resources) => {
    // Ensure the input is always treated as an array
    const resourceArray = Array.isArray(resources) ? resources : [resources];

    // Common keys to process
    const keysToProcess = ["name", "description"];

    return resourceArray.map(resource => {
        const mutResource = { ...resource };
        const keysInResource = Object.keys(resource);
        const commonKeys = keysInResource.filter(key => keysToProcess.includes(key));

        commonKeys.forEach(key => {
            const textLanguages = mutResource[key].split("%$");
            mutResource[key] = currentLanguage === "es" ? textLanguages[1] : textLanguages[0];
        });

        return mutResource;
    });
};

export const processCommonStringFromDb = (text) => {
    if (typeof text !== 'string') {
        throw new Error('Input must be a string');
    }

    const textLanguages = text.split("%$");
    return currentLanguage === "es" ? textLanguages[1] : textLanguages[0];
};


export default i18n;
