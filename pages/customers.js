import React from 'react'
import styles from '../styles/Customers.module.css'
import NavigationLayout from '../components/NavigationLayout';
import ViewLayout from '../components/ViewLayout';
import NicheCard from '../components/NicheCard';
import ten from '../public/assets/13.png'
import NicheMount from '../components/NicheMount';
import Link from 'next/link';

function Customers() {
    return (
        <NavigationLayout>
            <ViewLayout title={'Customers'}>
                <NicheCard>
                    <NicheMount
                        image={ten}
                        sub={`
                        When a customers visits your site and purchases a product, you will be able to get a summary of their order history, 
                        create segments to send personalized communications that drive sales and more.
                    `}
                        subtitle={'Everything customers-related in a single place'}
                    />
                </NicheCard>
                <center>
                    <div className={styles.link}>
                        Learn more about <Link href={"#"}>Customers</Link>
                    </div>
                </center>
            </ViewLayout>
        </NavigationLayout>
    )
}

export default Customers