import React, { useState, useEffect, useMemo, useContext } from 'react'
import styles from '../styles/AddProducts.module.css'
import NavigationLayout from '../components/NavigationLayout';
import ViewLayout from '../components/ViewLayout';
import NicheCard from '../components/NicheCard';
import { FileUploader } from "react-drag-drop-files";
const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];
import { MdDragIndicator, MdDelete } from 'react-icons/md'
import { chooseImage, handleUpload, Update, delImageData, handleUploadWhenUpdate, fetchCollectionById } from '../controllers/vendors'
import { useToasts } from 'react-toast-notifications'
import Image from 'next/image';
import dynamic from 'next/dynamic'
import ReactLoading from 'react-loading';
import { useRouter } from 'next/router';
import Select from 'react-select'
const RichText = dynamic(() => import('../components/RichText'), { ssr: false })
import { State } from '../StateManagement';
import { fetch } from '../controllers/institution'
import MapComponent from '../components/MapsComponent';


const type = 'active'


const ProductStatusOption = [
    { value: 'active', label: 'Active' },
    { value: 'draft', label: 'Draft' }
]




function AddVendors() {

    const { editData, setEditData } = useContext(State)






    const [imageLoading, setImageLoading] = useState(false)
    const [imageProgress, setImageProgress] = useState(0)
    const [isUpdate, setIspdate] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setProductStatus] = useState({ value: 'active', label: "Active" })
    const [id, setId] = useState()
    const [filename, setFilename] = useState('')
    const [imageurl, setImageUrl] = useState('')
    const [imageLocation, setImageLocation] = useState('')
    const [Progress, setProgress] = useState(0)
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState('')
    const [products, setProducts] = useState([])
    const [getProducts, setGetProducts] = useState([])
    const [loading2, setLoading2] = useState(false)
    const [add, setAdd] = useState(false)
    const [error, errMsg] = useState('')
    const [isProduct, setIsProduct] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    const [dominationsData, setDominationData] = useState([])
    const [ownername, setOwnername] = useState('')
    const [storename, setStoreName] = useState('')
    const [institutionId,setInstitutionId] = useState('')
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')

    const { addToast } = useToasts()

    const router = useRouter()



    const handleProductChange = (data) => {
        setProducts(prev => [...prev, data])
        setInstitutionId(data.id)
        console.log('after select', data)
    }


    useEffect(() => {
        if (JSON.stringify(editData) === '{}' || editData === undefined) {

        } else {
            if (
                editData.ownername === ownername &&
                editData.storename === storename &&
                editData.description === description &&
                editData.institution === products &&
                editData.status === status.value &&
                editData.geolocation  === dominationsData &&
                editData.password === password &&
                editData.email === email
            ) {
                setShowUpdate(false);
            }
            else {
                setShowUpdate(true);
            }
        }
    }, [ownername, storename, description, status, products, editData,dominationsData,password,email]);






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
            setOwnername(editData.ownername)
            setStoreName(editData.storename)
            setDescription(editData && editData.description)
            setDominationData(editData.geolocation)
            setPassword(editData.password)
            setEmail(editData.email)
            // media
            setFilename(editData.filename)
            fetchCollectionById(editData.id, setImageUrl, setLoading, errMsg)
            setImageLocation(editData.image)
            // others
            setProductStatus({ value: editData.status, label: editData.status })
            // products
            setProducts(editData.institution)
            setInstitutionId(editData.institutionId)
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

    const AddProduct = () => {
        if (
            imageLocation === '' ||
            imageurl == null ||
            ownername === '' ||
            storename === '' ||
            description === ''||
            password === '' ||
            email === '' 
        ) {
            addToast("Basic fields such us product info, media and pricing are compulsory.", { appearance: 'warning', autoDismiss: true, })
        } else {
            handleUpload(institutionId,ownername,password,email, storename, lat, lng, description, filename, status.value, products, setLoading, imageLocation, setProgress, setMsg, errMsg)
            setDescription('')
            setOwnername('')
            setStoreName('')
            setFilename('')
            setImageUrl('')
            setImageLocation('')
            setDominationData([])
            setProducts([])
            setInstitutionId('')
            setPassword('')
            setEmail('')
            setProductStatus({ value: 'active', label: "active" })
        }
    }


    const updateProduct = () => {
      
            let data = {
                filename: filename,
                title: title,
                imageurl: imageurl,
                description: description,
                institution: products,
                status: status.value,
                institutionId:institutionId,
                geolocation:dominationsData,
                password:password,
                email:email,
            }
            Update(id, data, setLoading, setMsg, errMsg, setProgress)
    

    }


    const removeProd = (pid) => {
        let data = products.filter(x => x.id !== pid)
        setProducts(data)
        setInstitutionId('')
    }
    const updateWhenisUpdate = (file) => {
        handleUploadWhenUpdate(file, setFilename, setImageLoading, setImageProgress, setMsg, errMsg, id)
    }

    const RemoveImage = (filename) => {
        delImageData(id, filename, errMsg, setMsg, setLoading)
    }

    useEffect(() => {
        fetch(setGetProducts, setLoading, setAdd, errMsg, setIsProduct, setLoading2, type)
    }, [setProducts, setLoading, errMsg, setIsProduct, setLoading2])

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
            <ViewLayout title={"Vendors"}>
                <div className={styles.acceptbox}>
                    <div className={styles.navbox}>
                        <div className={styles.unsaved}>Add Restaurant  </div>
                        <div className={styles.savebox}>
                            <button id={styles.discard} onClick={() => router.back()} className={styles.actionbutt}>Discard</button>
                            {isUpdate ? (
                                <>
                                    {showUpdate ? (
                                        <button onClick={() => updateProduct()} className={styles.actionbutt}>
                                            {loading ? (
                                                <center>
                                                    <ReactLoading color={'white'} height={30} width={30} />
                                                </center>
                                            ) : "Update"}
                                        </button>
                                    ) : (null)}
                                </>
                            ) : (
                                <button onClick={() => AddProduct()} className={styles.actionbutt}>
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
                                <div className={styles.label}>Owner Name </div>
                                <input defaultValue={ownername} onChange={(e) => setOwnername(e.target.value)} type={"text"} placeholder={"Owners Name"} className={styles.inp} />
                            </div>

                            <div className={styles.inpbox}>
                                <div className={styles.label}>Store Name</div>
                                <input defaultValue={storename} onChange={(e) => setStoreName(e.target.value)} type={"text"} placeholder={"Store Name"} className={styles.inp} />
                            </div>

                            <div className={styles.inpbox}>
                                <div className={styles.label}>Email</div>
                                <input defaultValue={email} onChange={(e) => setEmail(e.target.value)} type={"text"} placeholder={"Email"} className={styles.inp} />
                            </div>

                            <div className={styles.inpbox}>
                                <div className={styles.label}>Password</div>
                                <input defaultValue={password} onChange={(e) => setPassword(e.target.value)} type={"text"} placeholder={"Password"} className={styles.inp} />
                            </div>

                            <div className={styles.inpbox}>
                                <div className={styles.label}>Description</div>
                                <RichText text={description && description} setText={setDescription} placeholder={'Add a description'} width='99%' />
                            </div>
                        </NicheCard>
                        <NicheCard id={styles.pro}>
                            <div className={styles.inpbox}>
                                <div className={styles.title}>Add Locality To Restaurant</div>
                                <div className={styles.sub}>
                                    Search or browse to add institution.
                                </div>
                                {products.length > 0 ? null :
                                    <Select
                                        placeholder={"Search or select product"}
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
                    </div>
                    <div className={styles.side}>
                        <NicheCard id={styles.pro}>
                            <div className={styles.inpbox}>
                                <div className={styles.title}> availability</div>
                                <Select options={ProductStatusOption} value={status} onChange={(value) => setProductStatus(value)} />
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

                        <NicheCard id={styles.pro}>

                            {dominationsData && dominationsData.map((item, i) => (
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
                                        <input value={lat} onChange={(e) => setLat(e.target.value)} type={"number"} placeholder={"eg. 1.374647"} className={styles.inp} />
                                    </div>

                                    <div className={styles.inpbox}>
                                        <div className={styles.label}>Longitude</div>
                                        <input value={lng} onChange={(e) => setLng(e.target.value)} type={"number"} placeholder={"eg. -3.44567"} className={styles.inp} />
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
                </div>
            </ViewLayout>
        </NavigationLayout >
    )
}

export default AddVendors