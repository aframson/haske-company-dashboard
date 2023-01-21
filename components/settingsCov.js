import React from 'react'
import styles from '../styles/SetiingsCover.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'
export default function SetiingsCover({ image, title, sub,link="#",linkText}) {

    const router  = useRouter()

    return (
        <div className={styles.container}>
            <div className={styles.imagebox}>
                <Image src={image} alt={'cover'} placeholder={'blur'} className={styles.image} />
            </div>
            <div className={styles.cov}>
                <div className={styles.title}>{title}</div>
                <div className={styles.sub}>
                    {sub}
                </div>

                <button onClick={()=>router.push(link)} className={styles.learn}>{linkText}</button>
            </div>
        </div>
    )
}
