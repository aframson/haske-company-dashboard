import React from 'react'
import styles from '../styles/Offline.module.css'
import logo from '../public/assets/logo2.png'
import Image from 'next/image'

function UseOffline() {
    return (
        <div className={styles.containers}>
            <div className={styles.offlinebox}>
                <center>
                    <div className={styles.imagebox}>
                        <Image className={styles.image} src={logo} placeholder={'blur'} alt="logo" />
                    </div>
                </center>
                <div className={styles.title}>Anything that can go wrong will go wrong.</div>
                <div className={styles.who}>- murphys law</div>
                <div className={styles.sub}>kindly Check your Internet connection and try again or refresh the page . This service  rely on internet to perform some of its operations.</div>
            </div>
        </div>
    )
}

export default UseOffline