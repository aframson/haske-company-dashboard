import React, { useEffect } from 'react'
import NavigationLayout from '../components/NavigationLayout';
import ViewLayout from '../components/ViewLayout';
import SettingsCard from '../components/SettingsCard';
import Basicinfo from '../components/Basicinfo';
import Address from '../components/Address';
import ContactInfo from '../components/Contactinfo';
import StoreCurrency from '../components/StoreCurrency';
import PaymentSettings from '../components/Payment';
import Permissions from '../components/Permissions';
import Policies from '../components/Policies';
import Colors from '../components/Colors';
import Logo from '../components/Logo';
import CoverImage from '../components/CoverImage';
import SocilaMediaLinks from '../components/SocilaMediaLinks';
import SetiingsCover from '../components/settingsCov'
import cover from '../public/assets/settingcov.png'

export default function Settings() {


    return (
        <NavigationLayout>
            <ViewLayout title={"Settings"}>
                <SetiingsCover sub={`
                    Customize , make security changes and lots more with Settings
                    you can click the button below to learn more.
                `}
                    title={'Organize'}
                    image={cover}
                    linkText={"Learn More"}
                />
                <SettingsCard
                    subtitle={"Personal"}
                    sub={`
                     Every information about your store.
                   `}>
                    <Basicinfo />
                    <Address />
                    <ContactInfo />
                </SettingsCard>
                <SettingsCard
                    subtitle={"Branding"}
                    sub={`
                     Every information about your store.
                   `}>
                    <Colors />
                    <Logo />
                    <CoverImage />
                    <SocilaMediaLinks />
                </SettingsCard>

                <SettingsCard
                    subtitle={"Security"}
                    sub={`
                     Every information about your store.
                   `}>
                    <StoreCurrency />
                    <PaymentSettings />
                    <Permissions />
                    <Policies />
                </SettingsCard>



            </ViewLayout>
        </NavigationLayout>
    )
}
