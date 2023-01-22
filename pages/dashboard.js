import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import NavigationLayout from '../components/NavigationLayout';
import styles from '../styles/Dashboard.module.css'
import ReactLoading from 'react-loading';
import { Findus } from '../utils';
import { verifyEmail } from '../controllers/verifyEmail';
import { CheckUserAuthOut } from '../controllers/checkAuth';
import ViewLayout from '../components/ViewLayout';
import Link from 'next/link';
import ReactPlayer from 'react-player/youtube'

import logo from '../public/assets/icon2.png'
import logo2 from '../public/assets/icone.png'


import { GrConnectivity } from 'react-icons/gr';

import Image from 'next/image';

import { fetchLogo } from '../controllers/logo'


export default function Dashboard() {

    const [checEmailkuser, setCheckEmailUser] = useState(false)
    const [loading, setLoading] = useState(false)
    const [mainlogo, setLogo] = useState(null)
    const [add, setAdd] = useState('')
    const [error, errMsg] = useState('')


    const [wri, setwri] = useState(`
    Hi there , you have not verified your email account ,
    this will not let you access to some previlages , kindly click on the verify button to do that.
    `)
    const router = useRouter()

    useEffect(() => {
        CheckUserAuthOut(setLoading, setCheckEmailUser, router)
    }, [router])

    useEffect(() => {
        fetchLogo(setLogo, setLoading, setAdd, errMsg)
    }, [setLogo, setLoading, setAdd, errMsg])

    return (
        <NavigationLayout>
            <ViewLayout title={"Home"}>

                {loading ?
                    <center>
                        <ReactLoading color={'black'} height={50} width={50} />
                    </center> :
                    <>
                        {checEmailkuser ?
                            <div id={styles.goop} className={styles.emailbox}>
                                <div style={{ color: 'white' }} className={styles.content}>
                                    Hi there Guess what ? you can buy the whole software at an affordable plan
                                    check out the niche plan to see if you are fit for this
                                </div>
                                <button style={{ backgroundColor: '#161616' }} className={styles.verify}>
                                    Pick a Plan
                                </button>
                            </div>
                            : (
                                <div className={styles.emailbox}>
                                    <div className={styles.content}>
                                        {wri}
                                    </div>
                                    <button onClick={() => verifyEmail(setLoading, setwri)} className={styles.verify}>
                                        {loading ? (
                                            <center>
                                                <ReactLoading color={'white'} height={30} width={30} />
                                            </center>
                                        ) : "Verify"}
                                    </button>
                                </div>
                            )}
                    </>}



                <div className={styles.connect}>
                    <center>
                        <div id={styles.imagebox} className={styles.pals}>
                            <Image src={logo} alt={'logo'} placeholder={'blur'} className={styles.imagex} />
                        </div>
                    </center>
                    <div className={styles.palsx}>
                        <center>
                            <GrConnectivity id={styles.ic} size={55} color='black' />
                        </center>
                    </div>
                    {mainlogo ? <>
                        {mainlogo && mainlogo.map((logo, i) => (
                            <center key={i}>
                                <div id={styles.imagebox} className={styles.pals}>
                                    <Image blurDataURL={logo.image} src={logo.image} width={80} height={80} alt={'logo'} placeholder={'blur'} className={styles.imagex} />
                                </div>
                            </center>
                        ))}
                    </> :
                        <>
                            <center>
                                <div id={styles.imagebox} className={styles.pals}>
                                    <Image blurDataURL={''+logo2} src={logo2}  alt={'logo'} placeholder={'blur'} className={styles.imagex} />
                                </div>
                            </center>
                        </>}

                </div>




                <div className={styles.giued}>
                    <div className={styles.title}>Explore more support</div>
                    <div className={styles.sub}>Check out these resources for answers to your questions, videos, and best practices.</div>
                    <div className={styles.find}>
                        {Findus.map((item, i) => (
                            <Link key={i} style={{ color: 'black' }} href={`${item.link}`}>
                                <div className={styles.listbox}>
                                    <div className={styles.iconbox}>
                                        {item.icon}
                                    </div>
                                    <div className={styles.titlesub}>
                                        <div className={styles.itemtitle}>{item.title}</div>
                                        <div className={styles.itemsub}>{item.sub}</div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </ViewLayout>
        </NavigationLayout>
    )
}
