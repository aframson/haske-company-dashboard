import React from 'react'
import styles from '../styles/Abandoned.module.css'
import NavigationLayout from '../components/NavigationLayout';
import ViewLayout from '../components/ViewLayout';
import cart1 from '../public/assets/7.png'
import cart2 from '../public/assets/8.png'
import Image from 'next/image';
import NicheCard from '../components/NicheCard';
import Link from 'next/link';
import NicheMount from '../components/NicheMount';
function Abandoned() {
    return (
        <NavigationLayout>
            <ViewLayout title={"Abandoned Checkouts"}>
                <NicheCard id={styles.orderbox}>
                    <div className={styles.pa}>
                        <div className={styles.sub}>
                            Personalize your messaging with Customers.
                            Recover even more sales with the newly added abandoned cart and product-browse automations.
                            by sending visitors messages and know why they choose to abandon product
                        </div>
                        <button className={styles.enable}> Enable </button>
                    </div>
                    <div id={styles.imagebox1} className={styles.pa}>
                        <Image src={cart1} placeholder="blur" alt='logo' className={styles.image1} />
                    </div>
                </NicheCard>
                <NicheCard className={styles.orderbox}>
                    <NicheMount
                        subtitle={'Abandoned checkouts will show here'}
                        sub={`
                        See when customers put an item in their cart but dont check out. You can also email customers a link to their cart.
                        `}
                        image={cart2}
                    />
                </NicheCard>
                <center>
                    <div className={styles.link}>
                        Learn more about <Link href={"#"}>Abandoned Checkouts</Link>
                    </div>
                </center>
            </ViewLayout>
        </NavigationLayout>
    )
}

export default Abandoned