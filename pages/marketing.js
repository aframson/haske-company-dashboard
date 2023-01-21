import React from 'react'
import styles from '../styles/Marketing.module.css'
import NavigationLayout from '../components/NavigationLayout';
import ViewLayout from '../components/ViewLayout';
import NicheCard from '../components/NicheCard';
import Link from 'next/link';
import ReactPlayer from 'react-player/youtube'
import { MarketingIntegrations } from '../utils';

function Marketing() {
    return (
        <NavigationLayout>
            <ViewLayout title="Marketing">
                <div id={styles.row}>
                    <div className={styles.contentbox}>
                        <div className={styles.vidbox}>
                            <ReactPlayer
                                light={true}
                                width={'100%'}
                                height='100%'
                                url='https://www.youtube.com/watch?v=LzSAgcK1EWE' />
                        </div>
                    </div>
                    <div className={styles.contentbox}>
                        <div className={styles.subtitle}>
                            Let Niche handle your marketing
                        </div>
                        <div className={styles.sub}>
                            Send customers the right message at the right time with niche.
                            Watch this video to learn how marketing automations deliver targeted messaging while saving you time.
                            Then get started with one of our expertise.
                        </div>
                        <button className={styles.talk}>Talk to a Marketing Expert</button>
                    </div>
                </div>
                <NicheCard>
                    <div className={styles.subtitle}>Marketing Integration</div>
                    <div className={styles.sub}>
                        ncrease sessions, engage shoppers, and promote products by adding more marketing Integration.
                    </div>
                    <div className={styles.box}>
                        {MarketingIntegrations.map((item, i) => (
                            <div key={i} className={styles.mainb}>
                                {item.icon}
                                <div className={styles.fop}>
                                    <div className={styles.name}>{item.name}</div>
                                    <div className={styles.desc}>{item.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </NicheCard>
                <center>
                    <div className={styles.link}>
                        Learn more about <Link href={"#"}>Marketing</Link>
                    </div>
                </center>
            </ViewLayout>
        </NavigationLayout>
    )
}

export default Marketing