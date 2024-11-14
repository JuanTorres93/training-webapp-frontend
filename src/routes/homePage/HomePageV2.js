import NavVertical from "../../components/navVertical/NavVertical";

export default function HomePageV2() {
    const navItems = [
        // TODO TRADUCIR
        {
            icon: <ion-icon name="apps-outline"></ion-icon>,
            text: "Dashboard",
            path: "/app",
        },
        {
            icon: <ion-icon name="bookmark-outline"></ion-icon>,
            text: "Templates",
            path: "/app/templates",
        },
        {
            icon: <ion-icon name="barbell-outline"></ion-icon>,
            text: "Exercises",
            path: "/app/exercises",
        },
    ];
    return (
        <div className="behind-app">
            <main className="app-layout">
                APP
                <NavVertical
                    items={navItems}
                />
            </main>
        </div>
    );
};
