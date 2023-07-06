import React from 'react'; 
import styles from './SecondaryHeader.module.css'; 

const SecondaryHeader = () => {

    return (
        <div className={styles.container}>
            <p className={styles.message}>Be confident in your technical interview.</p>
            <button className={styles.button}>Sign In</button>
        </div>
    );
}

export default SecondaryHeader;