import { useNavigate } from "react-router-dom";
import styles from "./GoBackButton.module.css";

function GoBackButton() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <button className={styles.goBackButton} onClick={handleGoBack}>
      {/* TODO DELETE THIS COMPONENT: Change for an actual arrow */}
      &lt;
    </button>
  );
}

export default GoBackButton;
