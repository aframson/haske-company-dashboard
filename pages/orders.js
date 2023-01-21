import React from 'react'
import styles from '../styles/Orders.module.css'
import NavigationLayout from '../components/NavigationLayout';
import ViewLayout from '../components/ViewLayout';
import NicheCard from '../components/NicheCard';
import Image from 'next/image';
import six from '../public/assets/6.png'
import Link from 'next/link';
import NicheMount from '../components/NicheMount';
function Orders() {
    return (
        <NavigationLayout>
            <ViewLayout title={"Orders"}>
                <NicheCard>
                    <NicheMount
                        subtitle={'Your orders will show here'}
                        sub={`
                     To get orders and accept payments from customers,
                     you need to setup your payment details.
                     You will only be charged when a product is been bought.
                     `}
                        image={six}
                    />
                    <center>
                        <button className={styles.paybutt}>Setup Payment</button>
                    </center>
                </NicheCard>
                <center>
                    <div className={styles.link}>
                        Learn more about <Link href={"#"}>Orders</Link>
                    </div>
                </center>
            </ViewLayout>
        </NavigationLayout>
    )
}

export default Orders