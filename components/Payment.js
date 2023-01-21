import React, { useEffect, useState } from 'react'
import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel
} from 'react-accessible-accordion';
import { MdRadioButtonUnchecked,MdRadioButtonChecked } from "react-icons/md";
import styles from '../styles/Settings.module.css'
import { Add, Fetch, Update } from '../controllers/paymentInfo';
import ReactLoading from 'react-loading';
function PaymentSettings() {


    const [accno, setAccno] = useState()
    const [phone, setPhone] = useState('')
    const [swCode, setSwCode] = useState('')
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState('')
    const [loading2, setLoading2] = useState(false)
    const [add, setAdd] = useState(false)


    const Addfunc = () => {
        if (accno === '' || phone === '' || swCode === '') {
            alert("Fields must not be empty")
        } else {
            Add(phone, accno, swCode, setLoading, setMsg)
        }
    }


    const UpdateFunc = () => {
        if (email === '' || phone === '' || storeEmail === '') {
            alert("Fields must not be empty")
        } else {
            Update(phone, accno, swCode, setLoading, setMsg)
        }
    }

    useEffect(() => {
        Fetch(setPhone, setAccno, setSwCode, setLoading2, setAdd)
    }, [setPhone, setAccno, setSwCode])


    return (
        <AccordionItem className={styles.flip}>
            <AccordionItemHeading>
                <AccordionItemButton>
                    <div className={styles.ques}>
                        {add ? <MdRadioButtonUnchecked size={20} color={'gray'} /> : <MdRadioButtonChecked size={20} color={'#33cc66'} />}
                        <div className={styles.questxt}>Payment Information</div>
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
                                <div className={styles.label}>Phone Number (Mobile Money Number)</div>
                                <input defaultValue={phone} onChange={(e) => setPhone(e.target.value)} className={styles.inp} type={"text"} placeholder={"Phone"} />
                            </div>
                            <div className={styles.pp}>
                                <div className={styles.label}>Account Number</div>
                                <input defaultValue={accno} onChange={(e) => setAccno(e.target.value)} className={styles.inp} type={"text"} placeholder={"Account Number"} />
                            </div>
                            <div className={styles.pp}>
                                <div className={styles.label}>Swift Code</div>
                                <input defaultValue={swCode} onChange={(e) => setSwCode(e.target.value)} className={styles.inp} type={"text"} placeholder={"Swift Code"} />
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

export default PaymentSettings