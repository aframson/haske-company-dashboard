import React, { useState, useEffect, useMemo, useContext } from 'react'
import styles from '../styles/AddProducts.module.css'
import NavigationLayout from '../components/NavigationLayout';
import ViewLayout from '../components/ViewLayout';
import NicheCard from '../components/NicheCard';
import { FileUploader } from "react-drag-drop-files";
const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];
import { MdDragIndicator, MdDelete } from 'react-icons/md'
import { BiCheckboxSquare, BiCheckbox } from 'react-icons/bi'
import { chooseImage, handleUpload, updateaffectAllProduct, delImageData, handleUploadWhenUpdate, deleteDiscount, fetchDiscountById } from '../controllers/discount'
import { useToasts } from 'react-toast-notifications'
import Image from 'next/image';
import dynamic from 'next/dynamic'
import ReactLoading from 'react-loading';
import { useRouter } from 'next/router';
import Select, { components } from 'react-select'
import countryList from 'react-select-country-list'
import CurrencyInput from 'react-currency-input-field';
const RichText = dynamic(() => import('../components/RichText'), { ssr: false })
import { State } from '../StateManagement';
import { fetchDiscountedProducts } from '../controllers/products'
import { fetch } from '../controllers/institution';

const type = 'active'


const ProductStatusOption = [
    { value: 'active', label: 'Active' },
    { value: 'draft', label: 'Draft' }
]




function AddDiscount() {

    const { editData, setEditData } = useContext(State)






    const [imageLoading, setImageLoading] = useState(false)
    const [imageProgress, setImageProgress] = useState(0)
    const [isUpdate, setIspdate] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setProductStatus] = useState({ value: 'active', label: "active" })
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
    const [discount, setDiscount] = useState(0)
    const [oldproducts, setOldProducts] = useState(0)
    const [showUpdate, setShowUpdate] = useState(false)

    const [institutionIds, setInstitutionIds] = useState('')



    const [products2, setProducts2] = useState([])
    const [getProducts2, setGetProducts2] = useState([])


    const { addToast } = useToasts()

    const router = useRouter()



    const handleProductChange = (data) => {
        let dis = parseInt(discount)
        setProducts(prev => [...prev, { discount: dis, ...data }])
        console.log('after select', products)

    }



    useEffect(() => {
        if (JSON.stringify(editData) === '{}' || editData === undefined) {

        } else {
            if (
                editData.title === title &&
                editData.description === description &&
                editData.products === products &&
                editData.institution === products2 &&
                editData.status === status.value
            ) {
                setShowUpdate(false);
            }
            else {
                setShowUpdate(true);
            }
        }
    }, [title, description, status, products,products2, editData]);



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
            setTitle(editData.title)
            setDescription(editData && editData.description)
            // media
            setFilename(editData.filename)
            fetchDiscountById(editData.id, setImageUrl, setLoading, errMsg)
            setImageLocation(editData.image)
            // others
            setProductStatus({ value: editData.status, label: editData.status })
            // products
            setProducts(editData.products)
            setOldProducts(editData.products.length)
            setProducts2(editData.institution)
            setInstitutionIds(editData.institutionIds)

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
            title === '' ||
            description === ''
        ) {
            addToast("Basic fields such us product info, media and pricing are compulsory.", { appearance: 'warning', autoDismiss: true, })
        } else {
            handleUpload(institutionIds,products2, title, description, filename, status.value, products, setLoading, imageLocation, setProgress, setMsg, errMsg)
            setDescription('')
            setTitle('')
            setFilename('')
            setImageUrl('')
            setImageLocation('')
            setProducts([])
            setProductStatus({ value: 'active', label: "active" })
            setProducts2([])

        }
    }


    const updateProduct = () => {
        if (
            imageurl === '' ||
            title === '' ||
            description === '' ||
            products.length < 1
        ) {
            addToast("Basic fields such us product info, media and pricing are compulsory.", { appearance: 'warning', autoDismiss: true, })
        } else {
            let data = {
                filename: filename,
                title: title,
                imageurl: imageurl,
                description: description,
                products: products,
                status: status.value,
                institutionIds: institutionIds
            }
            updateaffectAllProduct(id, data, oldproducts, setLoading, setMsg, errMsg, setProgress)
        }

    }

    const handleProductChange2 = (data) => {
        setProducts2(prev => [...prev, data])
        setInstitutionIds(data.id)
        console.log('after select', data)
    }

    const removeProd = (pid) => {
        deleteDiscount(pid, products, setProducts, setLoading, setMsg, errMsg)
    }

    const fetchProducts = () => {
        console.log('starting...')
        fetchDiscountedProducts(setGetProducts, institutionIds, setLoading, errMsg, setIsProduct, setLoading2)
    }


    const removeProd2 = (pid) => {
        let data = products2.filter(x => x.id !== pid)
        setProducts2(data)
        setInstitutionIds('')
    }

    const updateWhenisUpdate = (file) => {
        handleUploadWhenUpdate(file, setFilename, setImageLoading, setImageProgress, setMsg, errMsg, id)
    }

    const RemoveImage = (filename) => {
        delImageData(id, filename, errMsg, setMsg, setLoading)
    }

    // useEffect(() => {
    //     fetchDiscountedProducts(setGetProducts, setLoading, errMsg, setIsProduct, setLoading2)
    // }, [setProducts, setLoading, errMsg, setIsProduct, setLoading2])


    useEffect(() => {
        fetch(setGetProducts2, setLoading, setAdd, errMsg, setIsProduct, setLoading2, type)
    }, [setGetProducts2, setLoading, errMsg, setIsProduct, setLoading2])



    return (
        <NavigationLayout>
            <ViewLayout title={"Discounts"}>
                <div className={styles.acceptbox}>
                    <div className={styles.navbox}>
                        <div className={styles.unsaved}>Create Discounts  </div>
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
                                <div className={styles.label}>Title</div>
                                <input defaultValue={title} onChange={(e) => setTitle(e.target.value)} type={"text"} placeholder={"title"} className={styles.inp} />
                            </div>

                            <div className={styles.inpbox}>
                                <div className={styles.label}>Description</div>
                                <RichText text={description && description} setText={setDescription} placeholder={'Add a description'} width='99%' />
                            </div>
                        </NicheCard>

                        <NicheCard id={styles.pro}>
                            <div className={styles.inpbox}>
                                <div className={styles.title}>What institution does this product belong</div>
                                <div className={styles.sub}>
                                    Search or browse to add Vendor.
                                </div>
                                {products2 && products2.length > 0 ? null :
                                    <Select
                                        placeholder={"Search or select Institution"}
                                        options={getProducts2 && getProducts2.map((item, i) => {
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
                                        onChange={(value) => handleProductChange2(value)} />
                                }

                            </div>


                            {products2 && products2.map((item, i) => (
                                <div key={i} className={styles.optionlistbox}>
                                    <MdDragIndicator style={{ marginTop: 0 }} size={30} color={'gray'} />
                                    <div className={styles.optionimagebox}>
                                        <Image blurDataURL={item.image} src={item.image} alt="option-image" height={30} width={30} className={styles.optionimages} />
                                    </div>
                                    <div className={styles.optionlistname} >{item.label}</div>
                                    <div onClick={() => removeProd2(item.id)} className={styles.optionlistname} >
                                        <MdDelete style={{ marginTop: 0 }} size={30} color={'red'} />
                                    </div>
                                </div>
                            ))}
                        </NicheCard>
                        <br />

                        {institutionIds !== '' ?
                            <button onClick={() => fetchProducts()} className={styles.addop}>Activate Products</button>
                            : null}
                        <br />

                        {getProducts && getProducts.length > 0 ? (
                        <NicheCard id={styles.pro}>
                            <div className={styles.inpbox}>
                                <div className={styles.title}>Set discount to Products</div>
                                <CurrencyInput
                                    name="input-name1"
                                    placeholder="Percentage to set off eg. 20"
                                    defaultValue={10}
                                    decimalsLimit={2}
                                    onValueChange={(value, name) => setDiscount(value)}
                                    prefix={"% "}
                                    className={styles.inp}
                                    value={discount}
                                />
                                <div className={styles.sub}>
                                    Search or browse to add products.
                                </div>
                                <Select
                                    placeholder={"Search or select product"}
                                    options={getProducts && getProducts.map((item, i) => {
                                        return {
                                            id: item.id,
                                            label: item.info.title,
                                            value: { prductid: item.id },
                                            image: item.images[0]
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
                            </div>
                            {products && products.map((item, i) => (
                                <div key={i} className={styles.optionlistbox}>
                                    <MdDragIndicator style={{ marginTop: 0 }} size={30} color={'gray'} />
                                    <div className={styles.optionimagebox}>
                                        <Image blurDataURL={item.image} src={item.image} alt="option-image" height={30} width={30} className={styles.optionimages} />
                                    </div>
                                    <div style={{ display: 'flex' }} className={styles.optionlistname} >
                                        {item.label} -
                                        <div className={styles.optionlistname} >{item.discount}% off</div>
                                    </div>
                                    <div onClick={() => removeProd(item.id)} className={styles.optionlistname} >
                                        <MdDelete style={{ marginTop: 0 }} size={30} color={'red'} />
                                    </div>
                                </div>
                            ))}
                        </NicheCard>
                        ):null}
                    </div>
                    <div className={styles.side}>
                        <NicheCard id={styles.pro}>
                            <div className={styles.inpbox}>
                                <div className={styles.title}>Discount availability</div>
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


                    </div>
                </div>
            </ViewLayout>
        </NavigationLayout>
    )
}

export default AddDiscount