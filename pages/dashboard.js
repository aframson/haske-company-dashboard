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
import SetiingsCover from '../components/settingsCov'
import cov2 from '../public/assets/cov2.png'

export default function Dashboard() {

    const [checEmailkuser, setCheckEmailUser] = useState(false)
    const [loading, setLoading] = useState(false)
    const [wri, setwri] = useState(`
    Hi there , you have not verified your email account ,
    this will not let you access to some previlages , kindly click on the verify button to do that.
    `)
    const router = useRouter()

    useEffect(() => {
        CheckUserAuthOut(setLoading, setCheckEmailUser, router)
    }, [router])
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

                <SetiingsCover sub={`
                    This is license agreement contract between the software supplier and a customer or end-user.
                `}
                    title={'v 0.0.1'}
                    image={cov2}
                    linkText={"Learn More"}
                />
                
                <div id={styles.row}>
                    <div className={styles.contentbox}>
                        <div className={styles.vidbox}>
                             <ReactPlayer
                                light={true}
                                width={'100%'}
                                // height='100%'
                                url='https://www.youtube.com/watch?v=783ccP__No8' />
                        </div>
                    </div>
                    <div className={styles.contentbox}>
                        <div className={styles.subtitle}>
                            Lern how to use Niche seamlessly
                        </div>
                        <div className={styles.subx}>
                            This is a list of video teaching you how to use the niche software ,
                            kindly go through it if somthing bothers you.Incase you find the screen very
                            little you can click on the youtube button to visit on the website
                        </div>
                        <button className={styles.talk}>Or Talk to a Niche personel </button>
                    </div>
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
