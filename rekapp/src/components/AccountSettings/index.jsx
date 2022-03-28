import styles from './account_settings.module.scss';

function index() {


    const imgLink = "https://yt3.ggpht.com/ytc/AKedOLTpvKuGuqG-anw7EaboiIh5Zb8AxdB1rFFkjIB4oQ=s48-c-k-c0x00ffffff-no-rj";

    return (
        <div className={styles.container}>
            
            <div className={styles.left_box}>
                <h3>Profile Settings</h3>
                <span>
                    <label>Username</label>
                    <input type="text" placeholder="Someone's name"></input>
                </span>
                <span>
                    <label>Email</label>
                    <input type="text" placeholder="Someone's email"></input>
                </span>

                <span>
                    <button>Update profile</button>
                </span>
            </div>

            <div className={styles.right_box}>
                <p>Profile picture</p>
                <img src={imgLink}></img>
                <button>Change</button>
            </div>

        </div>
    )
}

export default index
