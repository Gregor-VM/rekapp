import styles from './loading.module.scss';

function Loading() {
    return (
        <div className={styles.container}>
            <i className={`${styles.spinner} fas fa-sync-alt`}></i>
        </div>
    )
}

export default Loading
