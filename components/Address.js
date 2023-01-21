import React, { useState, useEffect,useMemo } from 'react'
import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel
} from 'react-accessible-accordion';
import { MdRadioButtonUnchecked ,MdRadioButtonChecked} from "react-icons/md";
import styles from '../styles/Settings.module.css'
import { Fetch, Update, Add } from '../controllers/addressInfo';
import ReactLoading from 'react-loading';
import { useToasts } from 'react-toast-notifications'
import Select from 'react-select'
import countryList from 'react-select-country-list'

function Address() {

    const [address, setAddress] = useState()
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [location, setLocation] = useState('')
    const [loading, setLoading] = useState(false)
    const [postalCode, setPostalCode] = useState('')
    const [msg, setMsg] = useState('')
    const [loading2, setLoading2] = useState(false)
    const [add, setAdd] = useState(false)
    const [error,errMsg] = useState('')
    const countryoptions = useMemo(() => countryList().getData(), [])

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
        if (address === '' || country === '' || location === '' || postalCode === '') {
            addToast("Fields must not be empty",{appearance:'warning',autoDismiss: true,})
        } else {
            Add(address, location, city, postalCode, country, setLoading, setMsg,errMsg)
        }
    }


    const UpdateFunc = () => {
        if (address === '' || country === '' || location === '' || postalCode === '') {
            addToast("Fields must not be empty",{appearance:'warning',autoDismiss: true,})

        } else {
            Update(address, location, city, postalCode, country, setLoading, setMsg,errMsg)
        }
    }

    useEffect(() => {
        Fetch(setAddress, setLocation, setCity, setPostalCode, setCountry, setLoading2, setAdd)
    }, [setAddress, setLocation, setCity, setPostalCode, setCountry])



    const changeHandler = value => {
        setCountry(value)
      }


    return (
        <AccordionItem className={styles.flip}>
            <AccordionItemHeading>
                <AccordionItemButton>
                    <div className={styles.ques}>
                    {add ? <MdRadioButtonUnchecked size={20} color={'gray'} /> : <MdRadioButtonChecked size={20} color={'#33cc66'} />}

                        <div className={styles.questxt}>Address</div>
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
                                <div className={styles.label}>Address</div>
                                <input defaultValue={address} onChange={(e) => setAddress(e.target.value)} className={styles.inp} type={"text"} placeholder={"Address"} />
                            </div>
                            <div className={styles.pp}>
                                <div className={styles.label}>Apartment, suite, etc.</div>
                                <input defaultValue={location} onChange={(e) => setLocation(e.target.value)} className={styles.inp} type={"text"} placeholder={"Location, suite, etc."} />
                            </div>
                            <div className={styles.gr}>
                                <div className={styles.pp}>
                                    <div className={styles.label}>City</div>
                                    <input defaultValue={city} onChange={(e) => setCity(e.target.value)} className={styles.inp} type={"text"} placeholder={"City"} />
                                </div>
                                <div className={styles.pp}>
                                    <div className={styles.label}>Postal Code</div>
                                    <input defaultValue={postalCode} onChange={(e) => setPostalCode(e.target.value)} className={styles.inp} type={"text"} placeholder={"Postal Code"} />
                                </div>
                            </div>

                            <div className={styles.pp}>
                                <div className={styles.label}>Country / Region</div>
                                <Select options={countryoptions} value={country} onChange={changeHandler} />
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

export default Address