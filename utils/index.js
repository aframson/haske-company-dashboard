import { FcGoogle } from 'react-icons/fc';
import { BsFacebook ,BsFillQuestionCircleFill} from 'react-icons/bs';
import { IoLogoWhatsapp, IoLogoFirebase,IoLogoTiktok } from 'react-icons/io5';
import { IoIosHelpCircle} from 'react-icons/io';
import { FaBookOpen } from 'react-icons/fa';
import { GrTechnology ,GrLinkedin} from 'react-icons/gr';
import {TbWorld} from 'react-icons/tb'




export const MarketingIntegrations = [
    {
        id: '1',
        icon: <IoLogoWhatsapp size={25} color='green' />,
        desc: "Grow your business with niche ads on WhatsApp",
        name: "WhatsApp"
    },
    {
        id: '2',
        icon: <BsFacebook size={25} color='blue' />,
        desc: "Grow your business with niche ads on FaceBook",
        name: "Facebook"
    },
    {
        id: '3',
        icon: <FcGoogle size={25} />,
        desc: "Grow your business with niche ads on Google Ads",
        name: "Google Ads"
    },
    {
        id: '4',
        icon: <IoLogoFirebase size={25} color='#ffb300' />,
        desc: "Easily send email to your customers base on product bought or any information from your website using firebase",
        name: "Firebase"
    },
    {
        id: '5',
        icon: <IoLogoTiktok size={25} color='black' />,
        desc: "Grow your business with niche ads on Tiktok",
        name: "Tiktok"
    },
]


export const Findus = [
    {
        id:'1',
        icon:<IoIosHelpCircle size={20} color='black' />,
        title:'Help Center',
        sub:'Find documentation and tutorials on how to use niche. See our help docs',
        link:'#'
    },
    {
        id:'1',
        icon:<GrTechnology size={20} color='black' />,
        title:'niche AI',
        sub:'Get step-by-step guidance on how to use the AI features on niche to boost your business.',
        link:'#'
    },
    {
        id:'1',
        icon:<FaBookOpen size={20} color='black' />,
        title:'Courses',
        sub:'Learn how to run a successful business with video courses taught by industry experts and business owners. Browse courses',
        link:'#'
    },
    {
        id:'1',
        icon:<TbWorld size={20} color='black' />,
        title:'Community',
        sub:'Network and discuss best practices with other business owners. Join the discussion',
        link:'#'
    },
    {
        id:'1',
        icon:<BsFillQuestionCircleFill size={20} color='black' />,
        title:'Ask us about a topic',
        sub:'Find answers to your questions and review niche resources. Ask about a topic',
        link:'#'
    },
    {
        id:'1',
        icon:<GrLinkedin size={20} color='black' />,
        title:'LinkedIn',
        sub:'Connect to us on linkedIn to see all businesses connected',
        link:'#'
    },
    {
        id:'1',
        icon:<IoLogoTiktok size={20} color='black' />,
        title:'Tiktok',
        sub:'View our user feedback and comments on tiktok',
        link:'#'
    },
]