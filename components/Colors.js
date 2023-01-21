import React, { useState, useEffect } from 'react'
import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel
} from 'react-accessible-accordion';
import styles from '../styles/Settings.module.css'
import NicheMount from './NicheMount';
import six from '../public/assets/17.png'
import { Add, Fetch, Update } from '../controllers/colors';
import ReactLoading from 'react-loading';
import { useToasts } from 'react-toast-notifications'
import { MdRadioButtonUnchecked ,MdRadioButtonChecked} from "react-icons/md";


const NichePicker = ({ type, description, color, setColor }) => {

    return (
        <div className={styles.colorcontainer}>
            <div className={styles.colorsubtitle}>{type}</div>
            <div className={styles.colorsub}>{description}</div>
            <input value={color} onChange={(e) => setColor(e.target.value)} className={styles.color} type={'color'} />
            <input className={styles.colorinp} value={color} onChange={(e) => setColor(e.target.value)} placeholder='Enter Color Code ...' type={'text'} />
        </div>
    )
}

function Colors() {


    const [primarycolor, setPrimaryColor] = useState('')
    const [secondarycolor, setSecondaryColor] = useState('')
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
        if (primarycolor === '' || secondarycolor === '') {
            addToast("Fields must not be empty", { appearance: 'warning', autoDismiss: true, })
        } else {
            Add(primarycolor, secondarycolor, setLoading, setMsg, errMsg)
        }
    }


    const UpdateFunc = () => {
        if (primarycolor === '' || secondarycolor === '') {
            addToast("Fields must not be empty", { appearance: 'warning', autoDismiss: true, })
        } else {
            Update(primarycolor, secondarycolor, setLoading, setMsg, errMsg)
        }
    }

    useEffect(() => {
        Fetch(setPrimaryColor, setSecondaryColor, setLoading2, setAdd)
    }, [setPrimaryColor, setSecondaryColor])


    return (
        <AccordionItem className={styles.flip}>
            <AccordionItemHeading>
                <AccordionItemButton>
                    <div className={styles.ques}>
                        {add ? <MdRadioButtonUnchecked size={20} color={'gray'} /> : <MdRadioButtonChecked size={20} color={'#33cc66'} />}
                        <div className={styles.questxt}>Brand Color</div>
                    </div>
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
                <div className={styles.cont}>
                    <NicheMount
                        sub={`
                            Change the look to suit your brand
                        `}
                        subtitle=" Change the look to suit your brand"
                        image={six}
                    />
                </div>
                <NichePicker
                    type={'Primary'}
                    description={`
                       The brand colors that appear on your store, social media, and more
                    `}
                    color={primarycolor}
                    setColor={setPrimaryColor}
                />
                <NichePicker
                    type={'Secondary'}
                    description={`
                    Supporting colors used for accents and additional detail
                    `}
                    color={secondarycolor}
                    setColor={setSecondaryColor}
                />
                {add ? (
                    <button onClick={() => Addfunc()} className={styles.tobutt}>
                        {loading ? (
                            <center>
                                <ReactLoading color={'white'} height={30} width={30} />
                            </center>
                        ) : "Add Color"}
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
            </AccordionItemPanel>
        </AccordionItem>
    )
}

export default Colors