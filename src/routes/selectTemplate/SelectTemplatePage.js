import List from "../../components/listNameDescription/ListNameDescription";
import RecentWorkoutsCarousel from "../../components/recentWorkoutCarousel/RecentWorkoutsCarousel";
import PagePresenter from "../../components/pagePresenter/PagePresenter";
import styles from "./SelectTemplatePage.module.css";

export default function SelectTemplatePage() {
    // TODO Get recent workouts from redux and DB with id, name and description

    // TODO Get recent workouts from redux and DB
    const recentWorkouts = [
        { id: 1, date: "2024-06-05", name: "Push" },
        { id: 2, date: "2024-06-04", name: "Pull" },
        { id: 3, date: "2024-06-03", name: "Leg" },
        { id: 4, date: "2024-06-02", name: "Push" },
        { id: 5, date: "2024-06-01", name: "Pull" },
    ];

    // TODO Get workouts templates from redux and DB
    const templates = [
        {
            id: 1,
            name: "Push",
            description: "Routine for push exercises. It includes push-ups, bench press, and shoulder press."
        },
        {
            id: 2,
            name: "Pull",
            description: "Pull routine. It includes pull-ups, deadlifts, and rows.",
        },
        {
            id: 3,
            name: "Leg",
            description: "Leg workout that includes squats, lunges, and calf raises.",
        },
    ];

    return (
        <PagePresenter children={

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
                <List exercises={templates} />
            </div>

        } />
    );
};