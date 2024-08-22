import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { selectUser } from '../../features/user/userSlice';

import List from "../../components/listNameDescription/ListNameDescription";
import GenericList from "../../components/genericList/GenericList";
import ExerciseTemplatePresenter from "../../components/exerciseTemplatePresenter/ExerciseTemplatePresenter";
import RecentWorkoutsCarousel from "../../components/recentWorkoutCarousel/RecentWorkoutsCarousel";
import PagePresenter from "../../components/pagePresenter/PagePresenter";
import LoginForm from "../../components/loginForm/LoginForm";
import styles from "./SelectTemplatePage.module.css";

import { selectUserTemplates } from "../../features/workoutsTemplates/workoutTemplatesSlice";
import { clearLastWorkout, setLastNWorkouts } from "../../features/workouts/workoutSlice";

export default function SelectTemplatePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const user = useSelector(selectUser);
    const templates = useSelector(selectUserTemplates).map(template => ({
        ...template,
        name: template.alias
    }));
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    useEffect(() => {
        dispatch(clearLastWorkout());
    }, [dispatch]); // Empty dependency array removed, added dispatch to ensure linting rules and best practices are followed

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const handleSelectTemplate = ({ id }) => {
        setSelectedTemplate(templates.find(template => template.id === id));

        dispatch(setLastNWorkouts({
            templateId: id,
            userId: user.id,
            // TODO change to number that can be selected by user
            numberOfWorkouts: 2,
        }));
    };

    const handleGoToWorkout = ({ id }) => {
        navigate(`/startWorkout/template/${id}`);
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

                        {templates.length > 0 &&
                            <div>
                                <h2>Recent workouts</h2>
                                <RecentWorkoutsCarousel recentWorkouts={recentWorkouts} />

                                <div className={styles.searchAndSortContainer}>
                                    <h3>
                                        Template{`${selectedTemplate ? `: ${selectedTemplate.name}` : ""}`}
                                    </h3>
                                </div>

                                <div className={styles.listContainer}>
                                    <div className={styles.individualListContainer}>
                                        {/* Render list of templates */}
                                        <List
                                            exercises={templates}
                                            handleExerciseClick={handleSelectTemplate}
                                            handleExerciseDoubleClick={handleGoToWorkout}
                                        />

                                    </div>

                                    <div className={styles.individualListContainer}>
                                        {/* Render preview of selected template */}
                                        {selectedTemplate && (
                                            <div className={styles.previewContainer}>
                                                <GenericList
                                                    children={
                                                        selectedTemplate.exercises.map((exercise) => (
                                                            <ExerciseTemplatePresenter
                                                                key={exercise.id}
                                                                order={exercise.order}
                                                                name={exercise.alias}
                                                                sets={exercise.sets}
                                                            />
                                                        ))
                                                    }
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        }

                        {templates.length === 0 && (
                            <div>
                                <p style={{ fontSize: 'var(--subheading-font-size)' }}>You don't have any templates yet.</p>
                                <button onClick={() => navigate('/createTemplate')}>Create a template</button>
                            </div>
                        )}

                    </div>
                ) : (
                    <LoginForm />
                )}
            </>
        } />
    );
};