import React, { useState, useEffect, useContext } from 'react'
import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel
} from 'react-accessible-accordion';
import { MdRadioButtonUnchecked, MdRadioButtonChecked } from "react-icons/md";
import styles from '../styles/Settings.module.css'
import { SubmitPersonalInfo, FetchPersonalInfo, UpdatePersonalInfo } from '../controllers/socilalinks'
import ReactLoading from 'react-loading';
import { useToasts } from 'react-toast-notifications'



function SocilaMediaLinks() {



    const [facebook, setFaceBook] = useState('https://nitchapp.tech/facebook')
    const [instagrame, setInstagrame] = useState('')
    const [twitter, setTwitter] = useState('')
    const [tiktok, setTiktok] = useState('')
    const [linkedIn, setLinkedIn] = useState('')
    const [SnapChat, setSnapChat] = useState('')
    const [whatsApp, setWhatsApp] = useState('')

    const [msg, setMsg] = useState('')
    const [loading2, setLoading2] = useState(false)
    const [loading, setLoading] = useState(false)
    const [add, setAdd] = useState(false)
    const [error, errMsg] = useState('')
 

    const { addToast } = useToasts()

    useEffect(() => {
        if (msg !== '') {
            addToast(msg, { appearance: 'success', autoDismiss: true, })
        }
    }, [msg, addToast])

    useEffect(() => {
        if (error !== '') {
            addToast(error, { appearance: 'warning', autoDismiss: true, })
        }
    }, [error, addToast])




    const Add = () => {
        SubmitPersonalInfo(facebook, instagrame, twitter, tiktok, linkedIn, SnapChat, whatsApp, setLoading, setMsg, errMsg)
    }


    const Update = () => {
        UpdatePersonalInfo(facebook, instagrame, twitter, tiktok, linkedIn, SnapChat, whatsApp, setLoading, setMsg, errMsg)
    }

    useEffect(() => {
        FetchPersonalInfo(setFaceBook, setInstagrame, setTwitter, setTiktok, setLinkedIn, setSnapChat,setWhatsApp, setLoading2, setAdd)
    }, [setFaceBook, setInstagrame, setTwitter, setTiktok, setLinkedIn, setSnapChat,setWhatsApp,])

    return (
        <AccordionItem className={styles.flip}>
            <AccordionItemHeading>
                <AccordionItemButton>
                    <div className={styles.ques}>
                        {add ? <MdRadioButtonUnchecked size={20} color={'gray'} /> : <MdRadioButtonChecked size={20} color={'#33cc66'} />}
                        <div className={styles.questxt}>Socila Media Links</div>
                    </div>
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>

                {loading2 ? (
                    <center>
                        <ReactLoading color={'black'} height={50} width={50} />
                    </center>
                ) :
                    <div className={styles.cont}>
                        <div className={styles.c1}>
                            <div className={styles.pp}>
                                <div className={styles.label}>WhatsApp</div>
                                <input defaultValue={whatsApp} onChange={(e) => setWhatsApp(e.target.value)} className={styles.inp} type={"text"} placeholder={"WhatsApp"} />
                            </div>
                            <div className={styles.pp}>
                                <div className={styles.label}>faceBook</div>
                                <input defaultValue={facebook} onChange={(e) => setFaceBook(e.target.value)} className={styles.inp} type={"text"} placeholder={"faceBook"} />
                            </div>
                            <div className={styles.pp}>
                                <div className={styles.label}>Instagrame</div>
                                <input defaultValue={instagrame} onChange={(e) => setInstagrame(e.target.value)} className={styles.inp} type={"text"} placeholder={"Instagrame"} />
                            </div>
                            <div className={styles.pp}>
                                <div className={styles.label}>Tiktok</div>
                                <input defaultValue={tiktok} onChange={(e) => setTiktok(e.target.value)} className={styles.inp} type={"text"} placeholder={"Tiktok"} />
                            </div>
                            <div className={styles.pp}>
                                <div className={styles.label}>SnapChat</div>
                                <input defaultValue={SnapChat} onChange={(e) => setSnapChat(e.target.value)} className={styles.inp} type={"text"} placeholder={"SnapChat"} />
                            </div>
                            <div className={styles.pp}>
                                <div className={styles.label}>LinkedIn</div>
                                <input defaultValue={linkedIn} onChange={(e) => setLinkedIn(e.target.value)} className={styles.inp} type={"text"} placeholder={"LinkedIn"} />
                            </div>
                            <div className={styles.pp}>
                                <div className={styles.label}>Twitter</div>
                                <input defaultValue={twitter} onChange={(e) => setTwitter(e.target.value)} className={styles.inp} type={"text"} placeholder={"twitter"} />
                            </div>


                            {add ? (
                                <button onClick={() => Add()} className={styles.tobutt}>
                                    {loading ? (
                                        <center>
                                            <ReactLoading color={'white'} height={30} width={30} />
                                        </center>
                                    ) : "Add Links"}
                                </button>
                            ) :
                                <button onClick={() => Update()} className={styles.tobutt}>
                                    {loading ? (
                                        <center>
                                            <ReactLoading color={'white'} height={30} width={30} />
                                        </center>
                                    ) : "Update"}
                                </button>
                            }
                        </div>
                    </div>
                }


            </AccordionItemPanel>
        </AccordionItem >
    )
}

export default SocilaMediaLinks