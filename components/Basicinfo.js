import React, { useState, useEffect, useContext } from 'react'
import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel
} from 'react-accessible-accordion';
import { MdRadioButtonUnchecked, MdRadioButtonChecked } from "react-icons/md";
import styles from '../styles/Settings.module.css'
import { SubmitPersonalInfo, FetchPersonalInfo, UpdatePersonalInfo } from '../controllers/personalInfo'
import ReactLoading from 'react-loading';
import { useToasts } from 'react-toast-notifications'
import dynamic from 'next/dynamic'

// import { Markup } from 'interweave';

const RichText = dynamic(() => import('./RichText'), {ssr: false})


function Basicinfo() {



    const [storeName, setStoreName] = useState()
    const [storeLegalName, setStoreLegalName] = useState('')
    const [about, setAbout] = useState('')
    const [loading, setLoading] = useState(false)
    const [industry, setIndustry] = useState('')
    const [msg, setMsg] = useState('')
    const [loading2, setLoading2] = useState(false)
    const [add, setAdd] = useState(false)
    const [error, errMsg] = useState('')
    const [slogan,setSlogan] = useState('')
    const [description,setDescription] = useState('')

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
        if (storeName === '' || about === '' || storeLegalName === '' || industry === '' || slogan === '' || description === '' ) {
            addToast("Fields must not be empty",{appearance:'warning',autoDismiss: true,})

        } else {
            SubmitPersonalInfo(storeName, storeLegalName, about,slogan, description,setLoading, setMsg, industry, errMsg)
        }
    }


    const Update = () => {
        if (storeName === '' || about === '' || storeLegalName === '' || industry === ''  || slogan === '' || description === '') {
            addToast("Fields must not be empty",{appearance:'warning',autoDismiss: true,})


        } else {
            UpdatePersonalInfo(storeName, storeLegalName, about,slogan,description ,setLoading, setMsg, industry, errMsg)
        }
    }

    useEffect(() => {
        FetchPersonalInfo(setStoreName, setStoreLegalName, setIndustry, setAbout,setSlogan,setDescription, setLoading2, setAdd)
    }, [setStoreName, setStoreLegalName, setIndustry, setAbout,setSlogan,setDescription])

    return (
        <AccordionItem className={styles.flip}>
            <AccordionItemHeading>
                <AccordionItemButton>
                    <div className={styles.ques}>
                        {add ? <MdRadioButtonUnchecked size={20} color={'gray'} /> : <MdRadioButtonChecked size={20} color={'#33cc66'} />}
                        <div className={styles.questxt}>Basic Information </div>
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
                                <div className={styles.label}>Store Name</div>
                                <input defaultValue={storeName} onChange={(e) => setStoreName(e.target.value)} className={styles.inp} type={"text"} placeholder={"Store Name"} />
                            </div>
                            <div className={styles.pp}>
                                <div className={styles.label}>Legal name of company</div>
                                <input defaultValue={storeLegalName} onChange={(e) => setStoreLegalName(e.target.value)} className={styles.inp} type={"text"} placeholder={"Store Name"} />
                            </div>
                            <div className={styles.pp}>
                                <div className={styles.label}>Slogan</div>
                                <input defaultValue={slogan} onChange={(e) => setSlogan(e.target.value)} className={styles.inp} type={"text"} placeholder={"Slogan"} />
                            </div>
                            <div className={styles.pp}>
                                <div className={styles.label}>Short Description of the Company</div>
                                <textarea defaultValue={description} onChange={(e) => setDescription(e.target.value)} className={styles.inp} type={"text"} placeholder={"short description"} ></textarea>
                            </div>
                            <div className={styles.pp}>
                                <div className={styles.label}>About Company</div>
                                    <RichText placeholder={"Write somthing about your company"} setText={setAbout} text={about} />
                            </div>
                            {/* <Markup content={about} /> */}

                            <div className={styles.pp}>
                                <div className={styles.label}>Store Industry</div>
                                <select value={industry} onChange={(e) => setIndustry(e.target.value)} id={styles.sele} className={styles.inp} >
                                    <option>Select Industry</option>
                                    <option>Technology</option>
                                    <option>Marketing</option>
                                    <option>Art</option>
                                    <option>Clothing</option>
                                    <option>Furniture</option>
                                    <option>Painting</option>
                                    <option>Pasteries</option>
                                    <option>Toys</option>
                                    <option>Sports</option>
                                    <option>Groceries</option>
                                    <option>Food</option>
                                    <option>Restaurant</option>
                                    <option>I havent decided yet</option>
                                    <option>Others</option>
                                </select>
                            </div>
                            {add ? (
                                <button onClick={() => Add()} className={styles.tobutt}>
                                    {loading ? (
                                        <center>
                                            <ReactLoading color={'white'} height={30} width={30} />
                                        </center>
                                    ) : "Add Details"}
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

export default Basicinfo