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

import {
    selectUserTemplates,
    selectRecentWorkouts,
    deleteTemplateFromUser,
    deleteExerciseFromTemplate,
} from "../../features/workoutsTemplates/workoutTemplatesSlice";
import { clearLastWorkout, setLastNWorkouts } from "../../features/workouts/workoutSlice";

export default function SelectTemplatePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const user = useSelector(selectUser);
    const templates = useSelector(selectUserTemplates);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [flagToUpdateSelectedTemplate, setFlagToUpdateSelectedTemplate] = useState(false);

    useEffect(() => {
        if (selectedTemplate) {
            const updatedTemplate = templates.find(template => template.id === selectedTemplate.id);
            if (updatedTemplate.exercises.length > 0) {
                setSelectedTemplate(updatedTemplate);
            } else {
                setSelectedTemplate(null);
                dispatch(deleteTemplateFromUser({ templateId: selectedTemplate.id }));
            }
        }
    }, [dispatch, templates, flagToUpdateSelectedTemplate]);


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
            numberOfWorkouts: 7,
        }));
    };

    const handleGoToWorkout = ({ id }) => {
        navigate(`/startWorkout/template/${id}`);
    }

    const handleDeleteTemplate = ({ id }) => {
        // TODO: When remove first for redux for better UX. If error when actually deleting it, then restore.
        dispatch(deleteTemplateFromUser({ templateId: id }));
        setSelectedTemplate(null);
    };

    const handleRemoveExerciseFromTemplate = ({ exerciseId, exerciseOrder }) => {
        const templateId = selectedTemplate.id;

        dispatch(deleteExerciseFromTemplate({
            templateId,
            exerciseId,
            exerciseOrder,
        })).then(() => {
            // Update selected template
            setFlagToUpdateSelectedTemplate(!flagToUpdateSelectedTemplate);
        });
    };

    const recentWorkouts = useSelector(selectRecentWorkouts);

    return (
        <PagePresenter children={
            <>
                {user ? (
                    <div className={styles.createTemplatePageContainer}>

                        {templates.length > 0 &&
                            <div>
                                <h2>Recent workouts</h2>
                                {recentWorkouts.length === 0 && <p>No recent workouts</p>}
                                {recentWorkouts.length > 0 && <RecentWorkoutsCarousel recentWorkouts={recentWorkouts} />}

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
                                            handleDeleteClick={handleDeleteTemplate}
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
                                                                id={exercise.id}
                                                                order={exercise.order}
                                                                name={exercise.alias}
                                                                sets={exercise.sets}
                                                                onClickRemove={handleRemoveExerciseFromTemplate}
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