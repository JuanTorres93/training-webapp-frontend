import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { selectUser } from '../../features/user/userSlice';

import List from "../../components/listNameDescription/ListNameDescription";
import RecentWorkoutsCarousel from "../../components/recentWorkoutCarousel/RecentWorkoutsCarousel";
import PagePresenter from "../../components/pagePresenter/PagePresenter";
import LoginForm from "../../components/loginForm/LoginForm";
import styles from "./SelectTemplatePage.module.css";

import { selectUserTemplates } from "../../features/workoutsTemplates/workoutTemplatesSlice";

export default function SelectTemplatePage() {
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const templates = useSelector(selectUserTemplates).map(template => ({ 
        ...template, 
        name: template.alias 
    }));
    let previewedTemplate = null;
        
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const handleSelectTemplate = ({ id }) => {
        previewedTemplate = templates.find(template => template.id === id);
        
        // TODO DELETE THESE DEBUG LOGS
        console.log('previewedTemplate');
        console.log(previewedTemplate);
    };

    const handleGoToWorkout = (templateId) => {
        // TODO include as onDoubleClick
        navigate(`/startWorkout/${templateId}`);
    }


    // TODO Get recent workouts from redux and DB
    const recentWorkouts = [
        { id: 1, date: "2024-06-05", name: "Push" },
        { id: 2, date: "2024-06-04", name: "Pull" },
        { id: 3, date: "2024-06-03", name: "Leg" },
        { id: 4, date: "2024-06-02", name: "Push" },
        { id: 5, date: "2024-06-01", name: "Pull" },
    ];

    return (
        <PagePresenter children={
            <>
                {user ? (
                    <div className={styles.createTemplatePageContainer}>
                        <h2>Recent workouts</h2>
                        <RecentWorkoutsCarousel recentWorkouts={recentWorkouts} />
        
                        {/* Search and sort by components */}
                        {/* TODO Style and create functionallity */}
                        <div className={styles.searchAndSortContainer}>
                            <div className={`${styles.searchContainer} ${styles.columnAlignedLeft}`}>
                                <span>Search</span>
                                <input type="text" placeholder="Search templates" />
                            </div>
                            <div className={`${styles.sortContainer} ${styles.columnAlignedLeft}`}>
                                <span>Sort by</span>
                                <select>
                                    <option value="newest">Newest</option>
                                    <option value="oldest">Oldest</option>
                                    <option value="name">Name</option>
                                </select>
                            </div>
                        </div>

                        {/* Render list of templates */}
                        <List 
                            exercises={templates} 
                            handleExerciseClick={handleSelectTemplate}
                        />
                    </div>
                ) : (
                    <LoginForm />
                )}
            </>
        } />
    );
};