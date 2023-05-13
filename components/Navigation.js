import React, { useContext, useEffect, useState } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import Link from 'next/link'
import { MdDonutSmall, MdLogout, MdInventory, MdPostAdd } from "react-icons/md";
import styles from '../styles/Navigation.module.css'
import { HiOutlineLogout, HiHome } from "react-icons/hi";
import { BsCalendarEventFill, BsFillMenuButtonWideFill } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { IoBagSharp, IoAnalyticsSharp } from "react-icons/io5";
import { FaUser ,FaSchool} from "react-icons/fa";
import { HiSpeakerWave } from "react-icons/hi2";
import { TbDiscount2 } from "react-icons/tb";
import { motion } from "framer-motion";
import { logOutUser } from '../controllers/Logout';
import { CheckUserAuthOutBasic } from '../controllers/checkAuth';
import { useRouter } from 'next/router'
import { RiRestaurantFill } from "react-icons/ri";

const ICON_SIZE = 20

function Navigation() {

    const router = useRouter()
    const { rtl } = useProSidebar();


    const [loading, setLoading] = useState(false)

    useEffect(() => {
        CheckUserAuthOutBasic(setLoading, router)
    }, [router])

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar rtl
                backgroundColor="white"
                // width={'200px'}
                // rootStyles={{
                //     height: '100%',
                //     position: 'fixed',
                //     zIndex: 455,
                //     fontSize: 14
                // }}
                breakPoint="always"
            >
                <Menu
                    menuItemStyles={{
                        button: ({ level, active, disabled }) => {
                            // only apply styles on first level elements of the tree
                            if (level === 0)
                                return {
                                    color: disabled ? 'black' : 'black',
                                    backgroundColor: active ? 'white' : undefined,
                                };
                        },
                    }}
                >
                    <MenuItem routerLink={<Link href="/dashboard" />} icon={<HiHome size={ICON_SIZE} color="black" />} > Home </MenuItem>
                    <SubMenu icon={<MdInventory size={ICON_SIZE} color="black" />} label="Orders">
                        <MenuItem routerLink={<Link href="/orders" />}> View Orders  </MenuItem>
                        <MenuItem routerLink={<Link href="/abandonedCheck" />}> Abandoned Checkout </MenuItem>
                    </SubMenu>
                    <SubMenu icon={<IoBagSharp size={ICON_SIZE} color="black" />} label="Products">
                        <MenuItem routerLink={<Link href="/products" />}> Products </MenuItem>
                        <MenuItem routerLink={<Link href="/collections" />}> Categories </MenuItem>
                        <MenuItem routerLink={<Link href="/giftcard" />}> Gift Cards </MenuItem>
                    </SubMenu>
                    <MenuItem routerLink={<Link href="/customers" />} icon={<FaUser size={ICON_SIZE} color="black" />} > Customers </MenuItem>
                    <MenuItem routerLink={<Link href="/institutions" />} icon={<FaSchool size={ICON_SIZE} color="black" />} > Locality </MenuItem>
                    <MenuItem routerLink={<Link href="/vendors" />} icon={<RiRestaurantFill size={ICON_SIZE} color="black" />} > Restaurant </MenuItem>
                    <MenuItem routerLink={<Link href="/notification" />} icon={<RiRestaurantFill size={ICON_SIZE} color="black" />} > Notification </MenuItem>
                    <SubMenu icon={<IoAnalyticsSharp size={ICON_SIZE} color="black" />} label="Analytics">
                        <MenuItem routerLink={<Link href="/analytics" />} > View Analytics </MenuItem>
                        <MenuItem routerLink={<Link href="/reports" />}> View Reports </MenuItem>
                    </SubMenu>
                    <MenuItem icon={<HiSpeakerWave size={ICON_SIZE} color="black" />} routerLink={<Link href="/marketing" />}> Marketing</MenuItem>
                    <MenuItem icon={<TbDiscount2 size={ICON_SIZE} color="black" />} routerLink={<Link href="/discount" />}> Discount</MenuItem>
                    <MenuItem icon={<MdPostAdd size={ICON_SIZE} color="black" />} routerLink={<Link href="/blog" />}> Blog Post</MenuItem>
                    <MenuItem icon={<IoMdSettings size={ICON_SIZE} color="black" />} routerLink={<Link href="/settings" />}> Settings</MenuItem>
                </Menu>
            </Sidebar>
            <div onClick={() => logOutUser(router)} className={styles.rep}>
                <HiOutlineLogout size={25} color="white" /> 
            </div>
        </div>

    )
}

export default Navigation