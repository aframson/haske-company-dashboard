import React from 'react'
import styles from '../styles/Analytics.module.css'
import NavigationLayout from '../components/NavigationLayout';
import ViewLayout from '../components/ViewLayout';
import NicheCard from '../components/NicheCard';
import {
    Chart,
    ChartTitle,
    ChartSeries,
    ChartSeriesItem,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
} from "@progress/kendo-react-charts";


const categories = ["Jan", "Feb", "Mar"];
const ChartContainer = () => (
    <Chart>
        <ChartTitle text="Units sold" />
        <ChartCategoryAxis>
            <ChartCategoryAxisItem
                title={{
                    text: "Months",
                }}
                categories={categories}
            />
        </ChartCategoryAxis>
        <ChartSeries>
            <ChartSeriesItem style='smooth' color={'black'} type="line" data={[240, 156, 598]} />
        </ChartSeries>
    </Chart>
);

function Analytics() {
    return (
        <NavigationLayout>
            <ViewLayout title={"Analytics"}>

                <div className={styles.vow}>
                    <NicheCard>
                        <ChartContainer />
                    </NicheCard>

                    <NicheCard>
                        <ChartContainer />
                    </NicheCard>

                    <NicheCard>
                        <ChartContainer />
                    </NicheCard>

                    <NicheCard>
                        <ChartContainer />
                    </NicheCard>

                    <NicheCard>
                        <ChartContainer />
                    </NicheCard>

                    <NicheCard>
                        <ChartContainer />
                    </NicheCard>

                </div>


            </ViewLayout>
        </NavigationLayout>
    )
}

export default Analytics