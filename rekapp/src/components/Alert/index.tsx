import styles from './alert.module.scss';

function Alert({msg, setMsg}:{msg: string, setMsg: React.Dispatch<React.SetStateAction<string>>}) {
    return (
        <div className={styles.container}>
            <p>{msg}</p>
            <i onClick={() => setMsg("")} className="fas fa-times"></i>
        </div>
    )
}

export default Alert
