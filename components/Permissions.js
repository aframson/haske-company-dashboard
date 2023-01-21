import React, { useEffect, useState } from 'react'
import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel
} from 'react-accessible-accordion';
import { FaUser } from "react-icons/fa";
import styles from '../styles/Settings.module.css'
import ReactLoading from 'react-loading';
import { RiEyeOffFill, RiEyeFill } from "react-icons/ri";
import { register } from '../controllers/register'
import NicheMount from './NicheMount';
import im from '../public/assets/13.png'
import { useToasts } from 'react-toast-notifications'
import { useRouter } from 'next/router';


function Permissions() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpass, setCpass] = useState('')
    const [see, setSee] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [msg, setMsg] = useState('')
    const [error, errMsg] = useState('')

    const { addToast } = useToasts()

    const router = useRouter()

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


    const onRegister = () => {
        // const response = confirm("Are you sure you want to do that?");
        if (confirm("Adding a user will automatically log you out of the system , you can sign in back to continue your activity")) {
            register(setLoading2, cpass, password, email, setMsg, errMsg,router)
            console.log("Ok was pressed");
        } else {
            // add code if the user pressed the Cancel button
            console.log("Cancel was pressed");
        }

    }


    return (
        <AccordionItem className={styles.flip}>
            <AccordionItemHeading>
                <AccordionItemButton>
                    <div className={styles.ques}>
                        <FaUser size={15} color="gray" />
                        <div className={styles.questxt}>Permissions</div>
                    </div>
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
                <div className={styles.cont}>
                    <div className={styles.c1}>
                        <div className={styles.loginsection}>
                            <NicheMount
                                subtitle={'Add a User'}
                                sub={`
                             By proceeding, you consent to get calls, WhatsApp or SMS messages,
                             including by automated means, from Soma and its affiliates to the number provided.
                             `}
                                image={im}
                            />
                            <div className={styles.secp}>
                                <div className={styles.label}>Email</div>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} id={styles.email} className={styles.inp} type="email" placeholder='eg.(example@domain.com)' />
                            </div>

                            <div className={styles.secp}>
                                <div className={styles.label}>Password</div>
                                <div className={styles.passbox}>
                                    <input value={password} onChange={(e) => setPassword(e.target.value)} id={styles.password} className={styles.inp} type={see ? "text" : "password"} placeholder='Password' />
                                    {see ? (
                                        <RiEyeOffFill onClick={() => setSee(false)} style={{ margin: 5, cursor: 'pointer' }} size={28} color="black" />
                                    ) : (
                                        <RiEyeFill onClick={() => setSee(true)} style={{ margin: 5, cursor: 'pointer' }} size={28} color="black" />
                                    )}
                                </div>
                            </div>

                            <div className={styles.secp}>
                                <div className={styles.label}>Confirm Password</div>
                                <div className={styles.passbox}>
                                    <input value={cpass} onChange={(e) => setCpass(e.target.value)} className={styles.inp} type={see ? "text" : "password"} placeholder='Password' />
                                    {see ? (
                                        <RiEyeOffFill onClick={() => setSee(false)} style={{ margin: 5, cursor: 'pointer' }} size={28} color="black" />
                                    ) : (
                                        <RiEyeFill onClick={() => setSee(true)} style={{ margin: 5, cursor: 'pointer' }} size={28} color="black" />
                                    )}
                                </div>
                            </div>
                            <button onClick={() => onRegister()} className={styles.tobutt}>
                                {loading2 ? (
                                    <center>
                                        <ReactLoading color={'white'} height={30} width={30} />
                                    </center>
                                ) : "Register"}
                            </button>
                        </div>
                    </div>
                </div>
            </AccordionItemPanel>
        </AccordionItem>
    )
}

export default Permissions