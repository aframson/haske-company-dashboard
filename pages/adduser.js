import React, { useState, useEffect, useMemo, useContext } from 'react'
import styles from '../styles/AddProducts.module.css'
import NavigationLayout from '../components/NavigationLayout';
import ViewLayout from '../components/ViewLayout';
import NicheCard from '../components/NicheCard';
import { MdDragIndicator, MdDelete } from 'react-icons/md'
import { useToasts } from 'react-toast-notifications'
import Image from 'next/image';
import ReactLoading from 'react-loading';
import { useRouter } from 'next/router';
import { State } from '../StateManagement';
import {FaUserCircle } from 'react-icons/fa'
import { Adduser } from '../controllers/users';


const type = 'active'


const ProductStatusOption = [
    { value: 'active', label: 'Active' },
    { value: 'draft', label: 'Draft' }
]



function AaddCard() {

    const { editData, setEditData } = useContext(State)


    const [isUpdate, setIspdate] = useState(false)

    const [status, setStatus] = useState({ value: 'active', label: "Active" })
    const [id, setId] = useState()
    const [imageLocation, setImageLocation] = useState('')
    const [Progress, setProgress] = useState(0)
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState('')
    const [add, setAdd] = useState(false)
    const [error, errMsg] = useState('')
    const [dominationsData, setDominationData] = useState([])
    const [showUpdate, setShowUpdate] = useState(false)
    const [username, setUserName] = useState('')
    const [phone, setPhoneNumber] = useState('')
    const [metaDataname, setMetaDataName] = useState('')
    const [metaDataValue, setMetaDataValue] = useState('')



    const { addToast } = useToasts()

    const router = useRouter()



    useEffect(() => {
        if (JSON.stringify(editData) === '{}' || editData === undefined) {

        } else {
            if (
                editData.name === username &&
                editData.dominationsData === dominationsData &&
                editData.telephone === phone
            ) {
                setShowUpdate(false);
            }
            else {
                setShowUpdate(true);
            }
        }
    }, [username, phone, dominationsData, editData]);




    useEffect(() => {

        if (JSON.stringify(editData) === '{}' || editData === undefined) {
            // alert('nothing')
            setIspdate(false)
        } else {
            setIspdate(true)
            // id
            setId(editData.id)
            console.log('id:', editData.id)
            // info
            setUserName(editData.name)
            setPhoneNumber(editData.telephone)
            // others
            setDominationData(editData.metadata)
        }

    }, [editData])

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


    const AddUserhandler = () => {
        if (
            username === '' ||
            phone == '' 
        ) {
            addToast("Basic fields such us name and  phone must be filled.", { appearance: 'warning', autoDismiss: true, })
        } else {
            Adduser(username,phone,dominationsData,setLoading,setMsg,errMsg)
            setUserName('')
            setPhoneNumber('')
            setDominationData([])
        }
    }


    const updateGiftCard = () => {
        if (
            imageurl === '' ||
            title === '' ||
            description === ''
            ) {
            addToast("Basic fields such us product info, media and pricing are compulsory.", { appearance: 'warning', autoDismiss: true, })
        } else {
            let data = {
                title: title,
                description: description,
                filename: filename,
                image: imageurl,
                dominationsData: dominationsData,
                status: status.value
            }
            UpdateUser(id, data, setLoading, setMsg, errMsg, setProgress)
        }
    }

  

    const DeleteDomination = (name) => {
        let newData = dominationsData.filter(x => x !== name)
        setDominationData(newData)

    }

    const AddKeywords = () => {
        if (metaDataname === '' || metaDataValue === ''){
            addToast("Key world fields must not be empty", { appearance: 'warning', autoDismiss: true, })
        }else{
            setDominationData((prevData) => [...prevData,{name:metaDataname,value:metaDataValue}])
        }
    }


    const RemoveImage = (filename) => {
        delImageData(id, filename, errMsg, setMsg, setLoading)
    }





    return (
        <NavigationLayout>
            <ViewLayout title={"GiftCard"}>
                <div className={styles.acceptbox}>
                    <div className={styles.navbox}>
                        <div className={styles.unsaved}>Create User  </div>
                        <div className={styles.savebox}>
                            <button id={styles.discard} onClick={() => router.back()} className={styles.actionbutt}>Discard</button>
                            {isUpdate ? (
                                <>
                                    {showUpdate ? (
                                        <button onClick={() => updateGiftCard()} className={styles.actionbutt}>
                                            {loading ? (
                                                <center>
                                                    <ReactLoading color={'white'} height={30} width={30} />
                                                </center>
                                            ) : "Update"}
                                        </button>
                                    ) : (null)}
                                </>
                            ) : (
                                <button onClick={() => AddUserhandler()} className={styles.actionbutt}>
                                    {loading ? (
                                        <center>
                                            <ReactLoading color={'white'} height={30} width={30} />
                                        </center>
                                    ) : "Save"}
                                </button>
                            )}
                        </div>
                    </div>
                    <div
                        style={{ width: Progress + '%' }}
                        className={styles.progress}></div>
                </div>
                <div className={styles.productBox}>
                    <div className={styles.side}>
                        <NicheCard id={styles.pro} >
                            <div className={styles.inpbox}>
                                <div className={styles.label}>User Name</div>
                                <input defaultValue={username} onChange={(e) => setUserName(e.target.value)} type={"text"} placeholder={"Username"} className={styles.inp} />
                            </div>
                            <div className={styles.inpbox}>
                                <div className={styles.label}>Phone Number</div>
                                <input defaultValue={phone} onChange={(e) => setPhoneNumber(e.target.value)} type={"text"} placeholder={"telephone"} className={styles.inp} />
                            </div>
                        </NicheCard>


                        <NicheCard id={styles.pro}>
                            <div className={styles.inpbox}>
                                <div className={styles.title}> Metadata</div>
                                <div className={styles.sub}>
                                    Add optional value to the user 
                                </div>
                            </div>
                            <div className={styles.inpbox}>
                                <div className={styles.label}>Name</div>
                                <input value={metaDataname} onChange={(e) => setMetaDataName(e.target.value)} type={"text"} placeholder={"meta data name"} className={styles.inp} />
                            </div>

                            <div className={styles.inpbox}>
                                <div className={styles.label}>Value</div>
                                <input value={metaDataValue} onChange={(e) => setMetaDataValue(e.target.value)} type={"text"} placeholder={"meta data value "} className={styles.inp} />
                                <button onClick={() => AddKeywords()} className={styles.addop}>Add data</button>
                            </div>

                            <div className={styles.list}>
                                {dominationsData && dominationsData.map((item, i) => (
                                    <div key={i} className={styles.optionbox}>
                                        <MdDragIndicator size={30} color={'gray'} />
                                        <div className={styles.optiontxt}>{item.name}</div>
                                        <div className={styles.optiontxt}>{item.value}</div>
                                        <MdDelete onClick={() => DeleteDomination(item)} size={30} color={'black'} />
                                    </div>
                                ))}
                            </div>

                        </NicheCard>
                    </div>
                    <div className={styles.side}>
                        <NicheCard id={styles.pro}>
                            <div className={styles.inpbox}>
                                <div className={styles.sub}>
                                    Everything about the user will be populated here once he or she starts purchases
                                </div>
                            </div>

                        </NicheCard>

                    </div>
                </div>
            </ViewLayout>
        </NavigationLayout>
    )
}

export default AaddCard;