import React, { useState, useEffect } from 'react'
import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel
} from 'react-accessible-accordion';
import { MdRadioButtonUnchecked, MdRadioButtonChecked } from "react-icons/md";
import styles from '../styles/Settings.module.css'
import { Add, Fetch, Update } from '../controllers/storeCurrency';
import ReactLoading from 'react-loading';
import { useToasts } from 'react-toast-notifications'

function StoreCurrency() {

    const [currency, setCurrency] = useState('')
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState('')
    const [loading2, setLoading2] = useState(false)
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

    const Addfunc = () => {
        if (currency === '') {
            alert("Fields must not be empty")
        } else {
            Add(currency, setLoading, setMsg)
        }
    }


    const UpdateFunc = () => {
        if (currency === '') {
            alert("Fields must not be empty")
        } else {
            Update(currency, setLoading, setMsg, errMsg)
        }
    }

    useEffect(() => {
        Fetch(setCurrency, setLoading2, setAdd, errMsg)
    }, [setCurrency])

    const onSelectedCurrency = currencyAbbrev => {
        console.log(currencyAbbrev)
    }



    return (
        <AccordionItem className={styles.flip}>
            <AccordionItemHeading>
                <AccordionItemButton>
                    <div className={styles.ques}>
                        {add ? <MdRadioButtonUnchecked size={20} color={'gray'} /> : <MdRadioButtonChecked size={20} color={'#33cc66'} />}
                        <div className={styles.questxt}>Store Currency</div>
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
                                <div className={styles.label}>Store Currency</div>
                                <select value={currency} onChange={(e) => setCurrency(e.target.value)} id={styles.sele} className={styles.inp} >
                                    <option value={'---'}>Select Currency </option>
                                    <option value={'GHS'}>Ghana (GHS)</option>
                                    <option value={'RPS'}>India (RUPIS)</option>
                                    <option value={'Nira'}>Nigeria (KOBO)</option>
                                    <option value={'$'}>UK ($)</option>
                                    <option value={'E'}>US (E)</option>
                                    <option value={'@&'}>South Africa (@#)</option>
                                    <option value={'@&'} >Bulgaria (&*)</option>
                                </select>
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

export default StoreCurrency