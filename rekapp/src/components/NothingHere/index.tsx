import styles from './nothing_here.module.scss';

function NothingHere() {
    return (
        <div className={styles.container}>
            <img src="/empty.svg" alt="Nothing here" />
            <h2>Nothing here</h2>
        </div>
    )
}

export default NothingHere;