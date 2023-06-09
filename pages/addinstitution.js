import React, { useState, useEffect, useMemo, useContext } from 'react'
import styles from '../styles/AddProducts.module.css'
import NavigationLayout from '../components/NavigationLayout';
import ViewLayout from '../components/ViewLayout';
import NicheCard from '../components/NicheCard';
import { FileUploader } from "react-drag-drop-files";
const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];
import { MdDragIndicator, MdDelete } from 'react-icons/md'
import { chooseImage, handleUpload, Update, delImageData, handleUploadWhenUpdate, fetchGiftCardById } from '../controllers/institution'
import { useToasts } from 'react-toast-notifications'
import Image from 'next/image';
import dynamic from 'next/dynamic'
import ReactLoading from 'react-loading';
import { useRouter } from 'next/router';
import Select, { components } from 'react-select'

const RichText = dynamic(() => import('../components/RichText'), { ssr: false })
import { State } from '../StateManagement';

import MapComponent from '../components/MapsComponent';

const type = 'active'


const ProductStatusOption = [
    { value: 'active', label: 'Active' },
    { value: 'draft', label: 'Draft' }
]



function AddInstitution() {

    const { editData, setEditData } = useContext(State)


    const [imageLoading, setImageLoading] = useState(false)
    const [imageProgress, setImageProgress] = useState(0)
    const [isUpdate, setIspdate] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState({ value: 'active', label: "Active" })
    const [id, setId] = useState()
    const [filename, setFilename] = useState('')
    const [imageurl, setImageUrl] = useState('')
    const [imageLocation, setImageLocation] = useState('')
    const [Progress, setProgress] = useState(0)
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState('')
    const [add, setAdd] = useState(false)
    const [error, errMsg] = useState('')
    const [dominations, setDominations] = useState('')
    const [dominationsData, setDominationData] = useState([])
    const [currency, setCurrency] = useState()
    const [showUpdate, setShowUpdate] = useState(false)
    const [codename, setCodeName] = useState('')
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')

    const { addToast } = useToasts()

    const router = useRouter()



    useEffect(() => {
        if (JSON.stringify(editData) === '{}' || editData === undefined) {

        } else {
            if (
                editData.name === title &&
                editData.description === description &&
                editData.codeName === codename &&
                editData.geolocation === dominationsData &&
                editData.status === status.value
            ) {
                setShowUpdate(false);
            }
            else {
                setShowUpdate(true);
            }
        }
    }, [title, description, status, dominationsData, editData,codename]);




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
            setTitle(editData.name)
            setDescription(editData.description)
            setFilename(editData.filename)
            setCodeName(editData.codeName)
            // media
            fetchGiftCardById(editData.id, setImageUrl, setLoading, errMsg)
            setImageLocation(editData.image)
            // others
            setStatus({ value: editData.status, label: editData.status })
            setDominationData(editData.geolocation)

            // products
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


    const addinstitution = () => {
        if (
            imageLocation === '' ||
            imageurl == null ||
            codename == '' ||
            title === '' ||
            description === ''
        ) {
            addToast("Basic fields such us name , image, descrition and pricing are compulsory.", { appearance: 'warning', autoDismiss: true, })
        } else {
            handleUpload(title, description, lat, lng, codename, filename, status.value, dominationsData, setLoading, imageLocation, setProgress, setMsg, errMsg)
            setDescription('')
            setTitle('')
            setFilename('')
            setImageUrl('')
            setImageLocation('')
            setStatus({ value: 'active', label: "active" })
            setCodeName('')
        }
    }
    const updateGiftCard = () => {
        if (

            imageurl === '' ||
            title === '' ||
            description === '') {
            addToast("Basic fields such us product info, media and pricing are compulsory.", { appearance: 'warning', autoDismiss: true, })
        } else {
            let data = {
                title: title,
                description: description,
                filename: filename,
                image: imageurl,
                geolocation: dominationsData,
                status: status.value
            }
            Update(id, data, setLoading, setMsg, errMsg, setProgress)
        }
    }

    const updateWhenisUpdate = (file) => {
        handleUploadWhenUpdate(file, setFilename, setImageLoading, setImageProgress, setMsg, errMsg, id)
    }





    const RemoveImage = (filename) => {
        delImageData(id, filename, errMsg, setMsg, setLoading)
    }

    const AddKeywords = () => {
        if (lat === '' || lng === '') {
            addToast("Key world fields must not be empty", { appearance: 'warning', autoDismiss: true, })
        } else {
            setDominationData((prevData) => [...prevData, { lat: lat, lng: lng }])
        }
    }
    const DeleteDomination = (name) => {
        let newData = dominationsData.filter(x => x !== name)
        setDominationData(newData)

    }




    return (
        <NavigationLayout>
            <ViewLayout title={"Locality"}>
                <div className={styles.acceptbox}>
                    <div className={styles.navbox}>
                        <div className={styles.unsaved}>Create Locality  </div>
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
                                <button onClick={() => addinstitution()} className={styles.actionbutt}>
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
                                <div className={styles.label}>Name</div>
                                <input defaultValue={title} onChange={(e) => setTitle(e.target.value)} type={"text"} placeholder={"Lapaz"} className={styles.inp} />
                            </div>

                            <div className={styles.inpbox}>
                                <div className={styles.label}>Code Name</div>
                                <input defaultValue={codename} onChange={(e) => setCodeName(e.target.value)} type={"text"} placeholder={"LP"} className={styles.inp} />
                            </div>

                            <div className={styles.inpbox}>
                                <div className={styles.label}>Description</div>
                                <RichText text={description && description} setText={setDescription} placeholder={'Add a description'} width='99%' />
                            </div>
                        </NicheCard>
                        <NicheCard id={styles.pro}>
                            
                            {dominationsData && dominationsData.map((item,i)=>(
                                <MapComponent key={i} lat={item.lat} lng={item.lng} />
                            ))}

                            <div className={styles.inpbox}>
                                <div className={styles.title}> Geolocation</div>
                                <div className={styles.sub}>
                                    Add Store location
                                </div>
                            </div>
                            {dominationsData.length > 0 ? null :
                                <>
                                    <div className={styles.inpbox}>
                                        <div className={styles.label}>Latitude</div>
                                        <input defau={lat} onChange={(e) => setLat(e.target.value)} type={"number"} placeholder={"eg. 1.374647"} className={styles.inp} />
                                    </div>

                                    <div className={styles.inpbox}>
                                        <div className={styles.label}>Longitude</div>
                                        <input defaultValue={lng} onChange={(e) => setLng(e.target.value)} type={"number"} placeholder={"eg. -3.44567"} className={styles.inp} />
                                        <button onClick={() => AddKeywords()} className={styles.addop}>Add data</button>
                                    </div>
                                </>
                            }


                            <div className={styles.list}>
                                {dominationsData && dominationsData.map((item, i) => (
                                    <div key={i} className={styles.optionbox}>
                                        <MdDragIndicator size={30} color={'gray'} />
                                        <div className={styles.optiontxt}>lat: {item.lat}</div>
                                        <div className={styles.optiontxt}>lng: {item.lng}</div>
                                        <MdDelete onClick={() => DeleteDomination(item)} size={30} color={'black'} />
                                    </div>
                                ))}
                            </div>

                        </NicheCard>
                    </div>
                    <div className={styles.side}>
                        <NicheCard id={styles.pro}>
                            <div className={styles.inpbox}>
                                <div className={styles.title}>Availability</div>
                                <Select options={ProductStatusOption} value={status} onChange={(value) => setStatus(value)} />
                            </div>
                            <div className={styles.inpbox}>
                                <div className={styles.sub}>
                                    Active Products Appears on your site for consumers to see and interact
                                </div>
                            </div>
                        </NicheCard>
                        {isUpdate ?
                            <NicheCard id={styles.pro}>
                                {imageLoading ? (
                                    <center style={{ padding: 20 }}>
                                        <span>{Math.round(imageProgress)}%</span>
                                        <ReactLoading type='spin' color={'black'} height={30} width={30} />
                                    </center>
                                ) : null}
                                <div style={{ width: imageProgress + "%" }} className={styles.imgprog}></div>
                                {imageurl ? (
                                    <>
                                        <div onClick={() => RemoveImage(filename)} className={styles.cancel}>
                                            <MdDelete style={{ marginTop: 12 }} size={20} color={'red'} />
                                        </div>
                                        <div className={styles.imageboxx}>
                                            {imageurl ? <Image blurDataURL={imageurl} src={imageurl} alt="product-image" placeholder='blur' height={100} width={100} className={styles.imagex} /> : null}
                                        </div>
                                    </>
                                ) :
                                    <div className={styles.inpbox}>
                                        <div className={styles.title}>Media</div>
                                        <FileUploader className={styles.fileupload} handleChange={(file) => updateWhenisUpdate(file)} name="file" types={fileTypes} />
                                    </div>
                                }
                            </NicheCard>
                            :
                            <NicheCard id={styles.pro}>
                                {imageurl ? (
                                    <>
                                        <div onClick={() => setImageUrl('')} className={styles.cancel}>
                                            <MdDelete style={{ marginTop: 12 }} size={20} color={'red'} />
                                        </div>
                                        <div className={styles.imageboxx}>
                                            {imageurl ? <Image blurDataURL={imageurl} src={imageurl} alt="product-image" placeholder='blur' height={100} width={100} className={styles.imagex} /> : null}
                                        </div>
                                    </>
                                ) :
                                    <div className={styles.inpbox}>
                                        <div className={styles.title}>Media</div>
                                        <FileUploader className={styles.fileupload} handleChange={(file) => chooseImage(file, setImageUrl, setFilename, setImageLocation)} name="file" types={fileTypes} />
                                    </div>
                                }
                            </NicheCard>
                        }


                    </div>
                </div>
            </ViewLayout>
        </NavigationLayout>
    )
}

export default AddInstitution;