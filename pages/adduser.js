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
import { Adduser,UpdateUser } from '../controllers/users';
import Select from 'react-select'
import { fetch } from '../controllers/institution'


const type = 'active'


function AaddCard() {

    const { editData, setEditData } = useContext(State)


    const [isUpdate, setIspdate] = useState(false)

    const [id, setId] = useState()
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
    const [products, setProducts] = useState([])
    const [getProducts, setGetProducts] = useState([])
    const [isProduct, setIsProduct] = useState(false)
    const [loading2, setLoading2] = useState(false)


    const { addToast } = useToasts()

    const router = useRouter()



    useEffect(() => {
        if (JSON.stringify(editData) === '{}' || editData === undefined) {

        } else {
            if (
                editData.name === username &&
                editData.metaData === dominationsData &&
                editData.institution === products &&
                editData.telephone === phone
            ) {
                setShowUpdate(false);
            }
            else {
                setShowUpdate(true);
            }
        }
    }, [username, phone, products, dominationsData, editData]);




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
            setDominationData(editData.metaData)
            setProducts(editData.institution)
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
            products === '' ||
            phone === ''
        ) {
            addToast("Basic fields such us name and  phone must be filled.", { appearance: 'warning', autoDismiss: true, })
        } else {
            Adduser(username, phone, dominationsData, products, setLoading, setMsg, errMsg)
            setUserName('')
            setPhoneNumber('')
            setProducts([])
            setDominationData([])
        }
    }


    const updateGiftCard = () => {
        if (
            username === '' ||
            products === '' ||
            phone == ''
        ) {
            addToast("Basic fields such us name and  phone must be filled.", { appearance: 'warning', autoDismiss: true, })
        } else {
            const data = {
                metaData:dominationsData,
                telephone:phone,
                name:username,
                institution:products
            }
            UpdateUser(id, data, setLoading, setMsg, errMsg, setProgress)
        }

      

    }



    const DeleteDomination = (name) => {
        let newData = dominationsData.filter(x => x !== name)
        setDominationData(newData)

    }

    const AddKeywords = () => {
        if (metaDataname === '' || metaDataValue === '') {
            addToast("Key world fields must not be empty", { appearance: 'warning', autoDismiss: true, })
        } else {
            setDominationData((prevData) => [...prevData, { name: metaDataname, value: metaDataValue }])
        }
    }

    useEffect(() => {
        fetch(setGetProducts, setLoading, setAdd, errMsg, setIsProduct, setLoading2, type)
    }, [setProducts, setLoading, errMsg, setIsProduct, setLoading2])


  


    const handleProductChange = (data) => {
        setProducts(prev => [...prev, data])
        console.log('after select', data)
    }
    const removeProd = (pid) => {
        let data = products.filter(x => x.id !== pid)
        setProducts(data)
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
                                <div className={styles.title}>Add User To Institution</div>
                                <div className={styles.sub}>
                                    Search or browse to add institution.
                                </div>
                                {products.length > 0 ? null :
                                    <Select
                                        placeholder={"Search or select Institution"}
                                        options={getProducts && getProducts.map((item, i) => {
                                            return {
                                                id: item.id,
                                                label: item.name,
                                                value: { institutionId: item.id },
                                                image: item.image
                                            }

                                        })}
                                        formatOptionLabel={opt => (
                                            <div className={styles.optionlistbox}>
                                                <div className={styles.optionimagebox}>
                                                    <Image blurDataURL={opt.image} src={opt.image} alt="option-image" height={30} width={30} className={styles.optionimages} />
                                                </div>
                                                <div className={styles.optionlistname} >{opt.label}</div>
                                            </div>
                                        )}
                                        onChange={(value) => handleProductChange(value)} />
                                }

                            </div>
                            {products && products.map((item, i) => (
                                <div key={i} className={styles.optionlistbox}>
                                    <MdDragIndicator style={{ marginTop: 0 }} size={30} color={'gray'} />
                                    <div className={styles.optionimagebox}>
                                        <Image blurDataURL={item.image} src={item.image} alt="option-image" height={30} width={30} className={styles.optionimages} />
                                    </div>
                                    <div className={styles.optionlistname} >{item.label}</div>
                                    <div onClick={() => removeProd(item.id)} className={styles.optionlistname} >
                                        <MdDelete style={{ marginTop: 0 }} size={30} color={'red'} />
                                    </div>
                                </div>
                            ))}
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