import NavVertical from "./NavVertical";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { currentLanguage, changeLanguage } from "../../i18n";
import { logoutUser, selectUser } from "../../features/user/userSlice";

import { selectActiveTemplate } from "../../features/workoutsTemplates/workoutTemplatesSlice";
import { selectActiveWorkout } from "../../features/workouts/workoutSlice";

export default function TranslatedNavVertical() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const user = useSelector(selectUser);
    const activeTemplate = useSelector(selectActiveTemplate);
    const activeWorkout = useSelector(selectActiveWorkout);
    const [navItems, setNavItems] = useState([
        {
            icon: <ion-icon name="apps-outline"></ion-icon>,
            text: t("nav-app-dashboard"),
            path: "/app",
        },
        {
            icon: <ion-icon name="bookmark-outline"></ion-icon>,
            text: t("nav-app-templates"),
            path: "/app/templates",

        },
        {
            icon: <ion-icon name="barbell-outline"></ion-icon>,
            text: t("nav-app-exercises"),
            path: "/app/exercises",
        },
    ]);

    const cbHandleLogout = () => {
        dispatch(logoutUser()).then(() => {
            navigate("/");
        });
    };

    useEffect(() => {
        // Show Workout nav item when it is needed
        if (activeTemplate && activeWorkout) {
            // Only show if there is an active template
            const workoutNavItem = {
                text: t("nav-app-current-workout"),
                path: "/app/runWorkout/" + activeTemplate.id + "/" + activeWorkout.id,
                // icon: <ion-icon name="fitness-outline"></ion-icon>,
                icon: <ion-icon name="pulse-outline"></ion-icon>,
            };

            // check index of contains runWorkout in navItems
            const runWorkoutIndex = navItems.findIndex((item) => item.text === t("nav-app-current-workout"));

            if (runWorkoutIndex !== -1) {
                const newNavItems = [...navItems];

                newNavItems[runWorkoutIndex] = workoutNavItem;

                setNavItems(newNavItems);
            } else {
                const newNavItems = [...navItems];

                setNavItems([...newNavItems, workoutNavItem]);
            }
        }

    }, [activeTemplate, activeWorkout, user]);

    const logoutItem = {
        icon: <ion-icon name="log-out-outline"></ion-icon>,
        text: t("nav-app-logout"),
    };

    return (
        <NavVertical
            items={navItems}
            logoutItem={logoutItem}
            currentLanguage={currentLanguage}
            cbChangeLanguage={changeLanguage}
            cbHandleLogout={cbHandleLogout}
        />
    );
}
