import React from 'react'
import { motion } from 'framer-motion'
import styles from '../styles/ViewLayout.module.css'
import { useProSidebar } from 'react-pro-sidebar';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoArrowBackSharp } from "react-icons/io5";
import { useRouter } from 'next/router';

function ViewLayout({ children, title }) {

    const { toggleSidebar } = useProSidebar();

    const router = useRouter()


    return (
        <motion.div
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.3,
                delay: 0.1,
                ease: [0, 0.71, 0.2, 1.01]
            }}
        >
           

            <div className={styles.container}>
                <div className={styles.nav}>
                    <div onClick={() => router.back()} className={styles.rep2}>
                        <IoArrowBackSharp size={35} color="black" />
                    </div>
                    <div className={styles.title}>{title}</div>
                    <div onClick={() => toggleSidebar()} className={styles.rep2}>
                        <GiHamburgerMenu size={35} color="black" />
                    </div>
                </div>

                {children}
            </div>


        </motion.div>

    )
}

export default ViewLayout