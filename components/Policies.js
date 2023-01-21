import React, { useState, useEffect } from 'react'
import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel
} from 'react-accessible-accordion';
import { MdRadioButtonUnchecked, MdRadioButtonChecked } from "react-icons/md";
import styles from '../styles/Settings.module.css'
import dynamic from 'next/dynamic'
const RichText = dynamic(() => import('./RichText'), { ssr: false })
import { useToasts } from 'react-toast-notifications'
import { Fetch, Update, Add } from '../controllers/policies';
import ReactLoading from 'react-loading';
import NicheMount from './NicheMount';
import policy from '../public/assets/policy.png'


function Policies() {

    const [text, setText] = useState('')

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
        if (text === '') {
            addToast("Fields must not be empty", { appearance: 'warning', autoDismiss: true, })

        } else {
            Add(text, setLoading, setMsg)
        }
    }


    const UpdateFunc = () => {
        if (text === '') {
            addToast("Fields must not be empty", { appearance: 'warning', autoDismiss: true, })
        } else {
            Update(text, setLoading, setMsg, errMsg)
        }
    }

    useEffect(() => {
        Fetch(setText, setLoading2, setAdd, errMsg)
    }, [setText])

    return (
        <AccordionItem className={styles.flip}>
            <AccordionItemHeading>
                <AccordionItemButton>
                    <div className={styles.ques}>
                        {add ? <MdRadioButtonUnchecked size={20} color={'gray'} /> : <MdRadioButtonChecked size={20} color={'#33cc66'} />}
                        <div className={styles.questxt}>Policies</div>
                    </div>
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
                <div className={styles.cont}>
                    <div className={styles.c1}>
                        <NicheMount
                            sub={`
                            Create your own store policies, or customize a template. Saved policies are linked in the footer of your checkout. You can also add policies to your online store menu. Templates aren’t legal advice. By using these templates, you agree that you’ve read and agreed to the
                            disclaimer.
                         `}
                            subtitle={'Store policies'}
                            image={policy}
                        />

                        <div className={styles.pp}>
                            <div className={styles.textbox}>
                                <RichText placeholder={"Write your policy here..."} text={text} setText={setText} />
                            </div>
                        </div>
                        {add ? (
                            <button onClick={() => Addfunc()} className={styles.tobutt}>
                                {loading ? (
                                    <center>
                                        <ReactLoading color={'white'} height={30} width={30} />
                                    </center>
                                ) : "Add Policy"}
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
            </AccordionItemPanel>
        </AccordionItem>
    )
}

export default Policies