import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { selectUser, selectUserIsLoading } from '../../features/user/userSlice';

import ListNameDescription from "../../components/listNameDescription/ListNameDescription";
import GenericList from "../../components/genericList/GenericList";
import ExerciseTemplatePresenter from "../../components/exerciseTemplatePresenter/ExerciseTemplatePresenter";
import RecentWorkoutsCarousel from "../../components/recentWorkoutCarousel/RecentWorkoutsCarousel";
import PagePresenter from "../../components/pagePresenter/PagePresenter";
import LoginForm from "../../components/loginForm/LoginForm";
import styles from "./SelectTemplatePage.module.css";

import {
    selectUserTemplates,
    selectRecentWorkouts,
    selectTemplatesLoading,
    deleteTemplateFromUser,
    deleteExerciseFromTemplate,
} from "../../features/workoutsTemplates/workoutTemplatesSlice";
import { clearLastWorkout, setLastNWorkouts } from "../../features/workouts/workoutSlice";

import { selectExercisesLoading } from "../../features/exercises/exercisesSlice";

export default function SelectTemplatePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(selectUser);
    const userIsLoading = useSelector(selectUserIsLoading);
    const templates = useSelector(selectUserTemplates);
    const templatesLoading = useSelector(selectTemplatesLoading);
    const exercisesLoading = useSelector(selectExercisesLoading);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [templatesMarkedForDeletion, setTemplatesMarkedForDeletion] = useState([]);
    const [exercisesMarkedForDeletion, setExercisesMarkedForDeletion] = useState([]);


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
    }, [dispatch, templates, exercisesMarkedForDeletion]);

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
        // Mark template for deletion
        setTemplatesMarkedForDeletion([...templatesMarkedForDeletion, id]);
        dispatch(deleteTemplateFromUser({ templateId: id })).then(() => {
            // Remove template from marked for deletion
            setTemplatesMarkedForDeletion(templatesMarkedForDeletion.filter(templateId => templateId !== id));
        });
        setSelectedTemplate(null);
    };

    const handleRemoveExerciseFromTemplate = ({ exerciseId, exerciseOrder }) => {
        const templateId = selectedTemplate.id;

        // Mark exercise for deletion
        setExercisesMarkedForDeletion([...exercisesMarkedForDeletion, exerciseId]);

        dispatch(deleteExerciseFromTemplate({
            templateId,
            exerciseId,
            exerciseOrder,
        })).then(() => {
            // Remove exercise from marked for deletion
            setExercisesMarkedForDeletion(exercisesMarkedForDeletion.filter(exerciseId => exerciseId !== exerciseId));
        });
    };

    const recentWorkouts = useSelector(selectRecentWorkouts);

    return (
        <PagePresenter children={
            <>
                {user ? (
                    <div className={styles.pageContainer}>

                        {templates.length > 0 &&
                            <div className={styles.conditionalRender}>
                                {/* Recent workouts */}
                                <div className={styles.recentWorkoutsContainer}>
                                    <h2 className="heading">Recent workouts</h2>
                                    {recentWorkouts.length === 0 && <p>No recent workouts</p>}
                                    {recentWorkouts.length > 0 && <RecentWorkoutsCarousel
                                        recentWorkouts={recentWorkouts}
                                        isLoading={templatesLoading}
                                    />}
                                </div>

                                {/* Template name */}
                                <div className={styles.templateNameContainer}>
                                    <h3>
                                        Template{`${selectedTemplate ? `: ${selectedTemplate.name}` : ""}`}
                                    </h3>
                                </div>

                                {/* List of templates and exercises */}
                                <div className={styles.listContainer}>
                                    {/* List of templates */}
                                    <div className={styles.individualListContainer}>
                                        {/* Render list of templates */}
                                        <ListNameDescription
                                            exercises={templates}
                                            exercisesMarkedForDeletion={templatesMarkedForDeletion}
                                            isLoading={templatesLoading}
                                            handleExerciseClick={handleSelectTemplate}
                                            handleExerciseDoubleClick={handleGoToWorkout}
                                            handleDeleteClick={handleDeleteTemplate}
                                        />
                                    </div>

                                    {/* List of exercises */}
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
                                                                isLoading={exercisesLoading || templatesLoading}
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
                            <div className={styles.conditionalRender}>
                                {!templatesLoading &&
                                    <div>
                                        <p style={{ fontSize: 'var(--subheading-font-size)' }}>
                                            You don't have any templates yet.
                                        </p>
                                        <button onClick={() => navigate('/createTemplate')}>Create a template</button>
                                    </div>
                                }
                                {templatesLoading &&
                                    <div className="spinner-heading-size"></div>
                                }
                            </div>
                        )}

                    </div>
                ) : (
                    <LoginForm
                        user={user}
                        userIsLoading={userIsLoading}
                    />
                )}
            </>
        } />
    );
};