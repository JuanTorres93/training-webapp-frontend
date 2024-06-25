import ExerciseList from "../../components/listNameDescription/ListNameDescription";
import styles from "./CreateTemplatePage.module.css";

export default function CreateTemplatePage() {
    // TODO Get recent workouts from redux and DB with id, name and description
    const availableExercises = [
        {
            id: 1,
            name: "Push-ups",
            description: "A body weight exercise that works the chest, shoulders, and triceps.",
        },
        {
            id: 2,
            name: "Pull-ups",
            description: "An upper-body strength exercise that works the back, shoulders, and arms.",
        },
        {
            id: 3,
            name: "Squats",
            description: "A lower-body strength exercise that works the thighs, hamstrings, and glutes.",
        },
    ];

    // TODO Update through redux state
    const selectedExercises = [
        {
            id: 4,
            name: "Lunges",
            description: "A lower-body strength exercise that works the thighs, hamstrings, and glutes.",
        },
    ];


    return (
        <div className={styles.createTemplatePageContainer}>
            <h2>Create new template</h2>
        
            <div className={styles.templateInfoContainer}>
                <div className={styles.inputContainer}>
                    <label htmlFor="template-name">Template name</label>
                    <input id="template-name" type="text" placeholder="Template name" />
                </div>

                <div className={styles.inputContainer}>
                    <label htmlFor="template-description">Template description</label>
                    <textarea id="template-description" placeholder="Template description"></textarea>
                </div>
            </div>

            <div className={styles.exerciseListsContainer}>
                <div className={styles.exerciseList}>
                    <h3>Exercises</h3>
                    <ExerciseList exercises={availableExercises} />
                </div>
                <div className={styles.exerciseList}>
                    {/* TODO Change this to user template's name input */}
                    <h3>Template's exercises</h3>
                    <ExerciseList exercises={selectedExercises} isSetPresenter={true} />
                </div>
            </div>

            {/* Create a div that will act as a button with two possible options. 
            One of them "Create template" and the other one "Create template and start workout". 
            The buttons are going to be implemented as divs with use of CSS. A vertical 
            subtle line must me render between both buttons */}
            <div className={styles.createTemplateOptions}>
                <div className={styles.createTemplateOption}>
                    <p>Create template</p>
                </div>
                <div className={styles.createTemplateOption}>
                    <p>Create template and start workout</p>
                </div>
            </div>
            
        </div>
    );
};