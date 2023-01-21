import React from 'react'
import styles from '../styles/SettingsCard.module.css'
import {
    Accordion,
} from 'react-accessible-accordion';
function SettingsCard({ children, subtitle, sub }) {
    return (
        <div className={styles.giued}>
            <div className={styles.title}>{subtitle}</div>
            <div className={styles.sub}>{sub}</div>
            <Accordion className={styles.acc}>
                {children}
            </Accordion>
        </div>
    )
}

export default SettingsCard