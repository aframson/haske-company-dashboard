import React from 'react'
import styles from '../styles/Reports.module.css'
import NavigationLayout from '../components/NavigationLayout';
import ViewLayout from '../components/ViewLayout';
import NicheCard from '../components/NicheCard';
import ten from '../public/assets/14.gif'
import NicheMount from '../components/NicheMount';
import Link from 'next/link';
function Reports() {
    return (
        <NavigationLayout>
            <ViewLayout title={"Reports"}>
                <NicheCard >
                    <NicheMount
                        subtitle={'Customer cohort analysis'}
                        sub={`Gain a deeper understanding of your customers with cohort analysis. 
                        Identify and target high-value groups of customers who spend more and return more often over time.`}
                        image={ten}
                    />
                      <center style={{padding:20}}>
                        Information will be displayed here once the data has reached the stage is ready to be analysed.
                      </center>
                </NicheCard>
                <center>
                    <div className={styles.link}>
                        Learn more about <Link href={"#"}>Reports</Link>
                    </div>
                </center>
            </ViewLayout>
        </NavigationLayout>
    )
}

export default Reports