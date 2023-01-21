import React from 'react'
import styles from '../styles/NicheMount.module.css'
import Image from 'next/image'

function NicheMount({image,subtitle,sub}) {
    return (
        <div>
            <center>
                <div className={styles.imagebox}>
                    <Image src={image} placeholder="blur" alt='logo' className={styles.image} blurDataURL={'data://'+image} />
                </div>
                <div className={styles.subtitle}>{subtitle}</div>
                <div className={styles.sub}>
                    {sub}
                </div>
            </center>
        </div>
    )
}

export default NicheMount