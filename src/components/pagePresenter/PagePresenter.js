// React component for presenting a page, taking care of the margins and padding. Do NOT use Outlet here, use it in the parent component.
import GoBackButton from "../../components/goBackButton/GoBackButton";
import styles from './PagePresenter.module.css'

const PagePresenter = ({ children, showBackButton=true }) => {
    return (
        <div className={styles.pageContainer}>
            {showBackButton ? <GoBackButton /> : null}
            {children}
        </div>
    )
}

export default PagePresenter
