import React, { useState, useEffect } from 'react'
import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel
} from 'react-accessible-accordion';
import { MdRadioButtonUnchecked ,MdRadioButtonChecked} from "react-icons/md";
import styles from '../styles/Settings.module.css'
import { Add, Fetch, Update } from '../controllers/contactInfo';
import ReactLoading from 'react-loading';
import { useToasts } from 'react-toast-notifications'

function ContactInfo() {

    const [email, setEmail] = useState()
    const [phone, setPhone] = useState('')
    const [storeEmail, setStoreEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState('')
    const [loading2, setLoading2] = useState(false)
    const [add, setAdd] = useState(false)
    const [error,errMsg] = useState('')

    const { addToast } = useToasts()

    useEffect(()=>{
        if (msg !== ''){
            addToast(msg,{appearance:'success',autoDismiss: true,})
        }
    },[msg,addToast])

    useEffect(()=>{
        if (error !== ''){
            addToast(error,{appearance:'warning',autoDismiss: true,})
        }
    },[error,addToast])



    const Addfunc = () => {
        if (email === '' || phone === '' || storeEmail === '') {
            addToast("Fields must not be empty",{appearance:'warning',autoDismiss: true,})
        } else {
            Add(phone, email, storeEmail, setLoading, setMsg,errMsg)
        }
    }


    const UpdateFunc = () => {
        if (email === '' || phone === '' || storeEmail === '') {
            addToast("Fields must not be empty",{appearance:'warning',autoDismiss: true,})
        } else {
            Update(phone, email, storeEmail, setLoading, setMsg,errMsg)
        }
    }

    useEffect(() => {
        Fetch(setPhone, setEmail, setStoreEmail, setLoading2, setAdd)
    }, [setPhone, setEmail, setStoreEmail])



    return (
        <AccordionItem className={styles.flip}>
            <AccordionItemHeading>
                <AccordionItemButton>
                    <div className={styles.ques}>
                        {add ? <MdRadioButtonUnchecked size={20} color={'gray'} /> : <MdRadioButtonChecked size={20} color={'#33cc66'} />}

                        <div className={styles.questxt}>Contact Information</div>
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
                                <div className={styles.label}>Phone</div>
                                <input defaultValue={phone} onChange={(e) => setPhone(e.target.value)} className={styles.inp} type={"text"} placeholder={"Phone"} />
                            </div>
                            <div className={styles.gr}>
                                <div className={styles.pp}>
                                    <div className={styles.label}>Email</div>
                                    <input defaultValue={email} onChange={(e) => setEmail(e.target.value)} className={styles.inp} type={"text"} placeholder={"email"} />
                                </div>
                                <div className={styles.pp}>
                                    <div className={styles.label}>Store Email</div>
                                    <input defaultValue={storeEmail} onChange={(e) => setStoreEmail(e.target.value)} className={styles.inp} type={"text"} placeholder={"Store email"} />
                                </div>
                            </div>
                            {add ? (
                                <button onClick={() => Addfunc()} className={styles.tobutt}>
                                    {loading ? (
                                        <center>
                                            <ReactLoading color={'white'} height={30} width={30} />
                                        </center>
                                    ) : "Add Details"}
                                </button>
                            ) :
                                <button onClick={() => UpdateFunc()} className={styles.tobutt}>
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
        </AccordionItem>
    )
}

export default ContactInfo