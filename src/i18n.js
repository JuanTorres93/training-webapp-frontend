import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
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
        currentLanguage = "es";
        return i18n.changeLanguage("es");
    } else {
        currentLanguage = "en";
        return i18n.changeLanguage("en");
    }
};



export default i18n;
