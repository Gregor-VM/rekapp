import styles from './not_found_page.module.scss';
import {Link} from 'react-router-dom'

function NotFoundPage() {
    return (
        <div className={styles.container}>
            <h2>URL was not found</h2>
            <img alt="404" src="404.svg"></img>
            <Link to={{pathname:"/"}}>Go back home</Link>
        </div>
    )
}

export default NotFoundPage
