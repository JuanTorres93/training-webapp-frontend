import { dangerousSymbols } from "../../utils/validatorUtils";
import styles from './DangerousSymbolNotifier.module.css'

export default function DangerousSymbolNotifier({ hidden }) {
    return (
        <>
            <p className={styles.notifier} hidden={hidden}>Symbols {dangerousSymbols.map(sd => {
                return `${sd} `;
            })} are not allowed</p>
        </>
    );
};