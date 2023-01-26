import React, { useState, useEffect, useMemo, useContext, useRef } from 'react'
import styles from '../styles/AddProducts.module.css'
import NavigationLayout from '../components/NavigationLayout';
import ViewLayout from '../components/ViewLayout';
import NicheCard from '../components/NicheCard';
import { FileUploader } from "react-drag-drop-files";
const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];
import { MdDragIndicator, MdDelete } from 'react-icons/md'
import { BiCheckboxSquare, BiCheckbox } from 'react-icons/bi'
import { chooseImage, handleUpload, Update, delImageData, chooseImageWhenUpdated, fetchProductsById } from '../controllers/products'
import { useToasts } from 'react-toast-notifications'
import Image from 'next/image';
import dynamic from 'next/dynamic'
import ReactLoading from 'react-loading';
import { useRouter } from 'next/router';
import Select from 'react-select'
import countryList from 'react-select-country-list'
import CurrencyInput from 'react-currency-input-field';
const RichText = dynamic(() => import('../components/RichText'), { ssr: false })
import { State } from '../StateManagement';
const ProductStatusOption = [
    { value: 'active', label: 'Active' },
    { value: 'draft', label: 'Draft' }
]
import { Fetch } from '../controllers/storeCurrency'
import { fetchVendors, fetchVendorsByInstitution } from '../controllers/vendors'
import { fetch } from '../controllers/institution'


const type = 'active'



function AddProducts() {

    const { editData, setEditData } = useContext(State)

    const [isShiping, setIsShipping] = useState(false)
    const [isOption, setIsOption] = useState(false)
    const [isUpdate, setIspdate] = useState(false)
    const [imageLoading, setImageLoading] = useState(false)
    const [imageProgress, setImageProgress] = useState(0)
    const countryoptions = useMemo(() => countryList().getData(), [])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [pricing, setPricing] = useState(0)
    const [comparePrice, setComparePrice] = useState(0)
    const [cpp, setCpp] = useState(0)
    const [sku, setSku] = useState('')
    const [barCode, setBarCode] = useState('')
    const [numberAvailable, setNumberAvailable] = useState('')
    const [status, setProductStatus] = useState({ value: 'active', label: "active" })
    const [weight, setWeight] = useState(0)
    const [customsInfo, setCustomsInfo] = useState('')
    const [hs, setHs] = useState('')
    const [weightval, setWeightval] = useState('')
    const [options, setOptions] = useState('')
    const [optionValue, setOptionValue] = useState('')
    const [optionData, setOptionData] = useState([])
    const [country, setCountry] = useState('')
    const [keyWords, setKeywords] = useState('')
    const [keywordData, setKeywordData] = useState([])
    const [id, setId] = useState()
    const [showUpdate, setShowUpdate] = useState(false)
    const [institutionIds, setInstitutionIds] = useState('')


    const [imageurl, setImageUrl] = useState([])
    const [imageLocation, setImageLocation] = useState([])
    const [Progress, setProgress] = useState(0)
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState('')
    const [add, setAdd] = useState(false)
    const [error, errMsg] = useState('')
    const { addToast } = useToasts()
    const [currency, setCurrency] = useState()
    const [products, setProducts] = useState([])
    const [getProducts, setGetProducts] = useState([])
    const [loading2, setLoading2] = useState(false)
    const [isproduct, setIsProduct] = useState()


    const [products2, setProducts2] = useState([])
    const [getProducts2, setGetProducts2] = useState([])

    const router = useRouter()




    useEffect(() => {
        if (JSON.stringify(editData) === '{}' || editData === undefined) {

        } else {
            if (
                numberAvailable === editData.inventory.numberAvailable &&
                editData.info.title === title &&
                editData.info.description === description &&
                editData.inventory.barCode === barCode &&
                editData.inventory.sku === sku &&
                editData.options.length === optionData.length &&
                editData.pricing.price === pricing &&
                editData.pricing.comparePrice === comparePrice &&
                editData.pricing.cpp === cpp &&
                editData.shipping.customsInfo === customsInfo &&
                editData.shipping.hs === hs &&
                editData.shipping.weight === weight &&
                editData.shipping.country === country &&
                editData.keywords === keywordData &&
                editData.status === status.value &&
                editData.vendor === products &&
                editData.institution === products2
            ) {
                setShowUpdate(false);
            }
            else {
                setShowUpdate(true);
            }
        }
    }, [products, products2, optionData, country, hs, title, pricing, description, weight, status, sku, cpp, comparePrice, barCode, editData, numberAvailable, customsInfo, keywordData]);



    // useEffect(() => {
    //     fetchVendorsByInstitution(setGetProducts, institutionIds, setLoading, errMsg, setIsProduct, setLoading2, type)
    // }, [setGetProducts, setLoading, errMsg, setIsProduct, setLoading2])


    useEffect(() => {
        fetch(setGetProducts2, setLoading, setAdd, errMsg, setIsProduct, setLoading2, type)
    }, [setGetProducts2, setLoading, errMsg, setIsProduct, setLoading2])

    useEffect(() => {

        if (JSON.stringify(editData) === '{}' || editData === undefined) {

            // alert('nothing')
            setIspdate(false)

        } else {
            setIspdate(true)
            // id
            setId(editData.id)
            fetchProductsById(editData.id, setImageUrl, setLoading, errMsg)
            // info
            setTitle(editData.info.title)
            setDescription(editData.info.description)
            // inventory
            setNumberAvailable(editData.inventory.numberAvailable)
            setBarCode(editData.inventory.barCode)
            setSku(editData.inventory.sku)
            // media
            // options
            setOptionData(editData.options)
            setPricing(editData.pricing.price)
            setComparePrice(editData.pricing.comparePrice)
            setCpp(editData.pricing.cpp)
            // shipping
            setCustomsInfo(editData.shipping.customsInfo)
            setHs(editData.shipping.hs)
            setWeight(editData.shipping.weight)
            setCountry(editData.shipping.country)
            // others
            setKeywordData(editData.keywords)
            setProductStatus({ value: editData.status, label: editData.status })
            setProducts(editData.vendor)
            setProducts2(editData.institution)
            setInstitutionIds(editData.institutionIds)

        }

    }, [editData])

    useEffect(() => {
        if (optionData.length > 0) {
            setIsOption(true)
        }
        if (customsInfo !== '' || hs !== '' || weight !== 0 || country !== "") {
            setIsShipping(true)
        }
    }, [optionData, customsInfo, hs, weight, country])



    useEffect(() => {
        Fetch(setCurrency, setLoading, setAdd)
    }, [setCurrency, setLoading, setAdd])


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
            products.length <= 0 ||
            products2.length <= 0 ||
            title === '' ||
            description === '' ||
            pricing === 0 ||
            cpp === 0 ||
            comparePrice === 0
        ) {
            addToast("Basic fields such us product info, media and pricing are compulsory.", { appearance: 'warning', autoDismiss: true, })
        } else {
            handleUpload(institutionIds, title, description, products, products2, pricing, comparePrice, cpp, sku, barCode, numberAvailable, status.value, weight, customsInfo, country, hs, optionData, keywordData, setLoading, imageLocation, setProgress, setMsg, errMsg)
            setProducts([])
            setProducts2([])
            setGetProducts2([])
            setGetProducts([])
            setBarCode('')
            setDescription('')
            setComparePrice(0)
            setPricing(0)
            setCountry(0)
            setCpp(0)
            setTitle('')
            setHs('')
            setSku('')
            setCustomsInfo('')
            setIsOption(false)
            setIsShipping(false)
            setKeywordData([])
            setOptionData([])
            setImageUrl([])
            setImageLocation([])
            setProductStatus({ value: 'active', label: "active" })
        }
    }



    const updateImageWhenisUpdate = (file) => {
        chooseImageWhenUpdated(file, imageurl, setImageLoading, setImageProgress, setMsg, errMsg, id)
    }



    const updateProduct = () => {
        if (imageurl.length < 1 || title === '' || description === '' || pricing === 0) {
            errMsg("Basic fields such us product info, media and pricing are compulsory.")
        } else {
            const data = {
                info: {
                    title: title,
                    description: description
                },
                images: imageurl,
                pricing: {
                    price: pricing,
                    comparePrice: comparePrice,
                    cpp: cpp
                },
                inventory: {
                    sku: sku,
                    barCode: barCode,
                    numberAvailable: numberAvailable
                },
                status: status.value,
                shipping: {
                    weight: weight,
                    customsInfo: customsInfo,
                    country: country,
                    hs: hs
                },
                options: optionData,
                keywords: keywordData,
                vendor: products,
                institution: products2,
                institutionIds: institutionIds
            }
            Update(id, data, setLoading, setMsg, errMsg, setProgress)
        }

    }

    const AddOptions = () => {
        if (options === '' || optionValue === '') {
            addToast("Option fields must not be empty", { appearance: 'warning', autoDismiss: true, })
        } else {
            setOptionData((prevData) => [...prevData, { name: options, value: optionValue }])
            setOptionValue('')
            setOptions('')
        }
    }

    const AddKeywords = () => {
        if (keyWords === '') {
            addToast("Key world fields must not be empty", { appearance: 'warning', autoDismiss: true, })
        } else {
            setKeywordData((prevData) => [...prevData, keyWords])
            setKeywords('')
        }
    }

    const Deleteoption = (name) => {
        let newData = optionData.filter(x => x !== name)
        setOptionData(newData)

    }

    const DeletKeyword = (name) => {
        let newData = keywordData.filter(x => x !== name)
        setKeywordData(newData)

    }

    const changeHandler = value => {
        console.log('country:', value)
        setCountry(value)
    }


    const RemoveImage = (image) => {
        delImageData(id, image, imageurl, errMsg, setMsg, setLoading)
    }

    const RemoveImage2 = (image) => {
        let newImage = imageurl.filter(x => x !== image)
        setImageUrl(newImage)
    }



    const handleProductChange = (data) => {
        setProducts(prev => [...prev, data])
        console.log('after select', data)
    }



    const handleProductChange2 = (data) => {
        setProducts2(prev => [...prev, data])
        setInstitutionIds(data.id)
        console.log('after select', data)
    }

    const fetchProducts = () => {
        console.log('starting...')
        fetchVendorsByInstitution(setGetProducts, institutionIds, setLoading, errMsg, setIsProduct, setLoading2, type)
    }



    const removeProd = (pid) => {
        let data = products.filter(x => x.id !== pid)
        setProducts(data)
    }


    const removeProd2 = (pid) => {
        let data = products2.filter(x => x.id !== pid)
        setProducts2(data)
        setInstitutionIds('')
    }


    return (
        <NavigationLayout>
            <ViewLayout title={"Add Products"}>



                <div className={styles.acceptbox}>
                    <div className={styles.navbox}>
                        <div className={styles.unsaved}>Product Adding </div>
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





                        <NicheCard id={styles.pro}>
                            <div className={styles.inpbox}>
                                <div className={styles.title}>Who is selling this Product</div>
                                <div className={styles.sub}>
                                    Search or browse to add Vendor.
                                </div>

                                {institutionIds.length > 0 ?
                                    <button onClick={() => fetchProducts()} className={styles.addop}>Activate Vendors</button>
                                    : null}

                                <br />
                                <br />

                                {getProducts && getProducts.length > 0 ? (
                                    <>
                                        {products.length > 0 ? null :
                                            <Select
                                                placeholder={"Search or select Vendor"}
                                                options={getProducts && getProducts.map((item, i) => {
                                                    return {
                                                        id: item.id,
                                                        label: item.storename,
                                                        value: { vendorId: item.id },
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

                                    </>

                                ) : null}

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


                        <NicheCard id={styles.pro} >
                            <div className={styles.inpbox}>
                                <div className={styles.label}>Name</div>
                                <input defaultValue={title} onChange={(e) => setTitle(e.target.value)} type={"text"} placeholder={"title"} className={styles.inp} />
                            </div>

                            <div className={styles.inpbox}>
                                <div className={styles.label}>Description</div>
                                <RichText text={description && description} setText={setDescription} placeholder={'Add a description'} width='99%' />
                            </div>
                        </NicheCard>
                        {isUpdate ? (
                            <NicheCard id={styles.pro}>
                                {imageLoading ? (
                                    <center style={{ padding: 20 }}>
                                        <span>{Math.round(imageProgress)}%</span>
                                        <ReactLoading type='spin' color={'black'} height={30} width={30} />
                                    </center>
                                ) : null}

                                <div style={{ width: imageProgress + "%" }} className={styles.imgprog}></div>
                                <div className={styles.slideImage}>
                                    {imageurl && imageurl.map((image, i) => (
                                        <div key={i}>
                                            <div onClick={() => RemoveImage(image)} className={styles.cancel}>
                                                {loading ? <ReactLoading type='spin' color={'black'} height={20} width={20} /> : <MdDelete style={{ marginTop: 12 }} size={20} color={'red'} />}
                                            </div>
                                            <div className={styles.imageboxx}>
                                                <Image blurDataURL={image} src={image} alt="product-image" placeholder='blur' height={100} width={100} className={styles.imagex} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {imageurl.length >= 3 ? (null) :
                                    <div className={styles.inpbox}>
                                        <div className={styles.title}>Media</div>
                                        <div className={styles.sub}>
                                            Maximum image to upload is 3.
                                        </div>
                                        <FileUploader multiple={true} className={styles.fileupload} handleChange={(file) => updateImageWhenisUpdate(file)} name="file" types={fileTypes} />
                                    </div>
                                }
                            </NicheCard>
                        ) : (
                            <NicheCard id={styles.pro}>
                                <div className={styles.slideImage}>
                                    {imageurl && imageurl.map((image, i) => (
                                        <div key={i}>
                                            <div onClick={() => RemoveImage2(image)} className={styles.cancel}>
                                                <MdDelete style={{ marginTop: 12 }} size={20} color={'red'} />
                                            </div>
                                            <div className={styles.imageboxx}>
                                                <Image blurDataURL={image} src={image} alt="product-image" placeholder='blur' height={100} width={100} className={styles.imagex} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {imageurl.length >= 3 ? (null) :
                                    <div className={styles.inpbox}>
                                        <div className={styles.title}>Media</div>
                                        <div className={styles.sub}>
                                            Maximum image to upload is 3.
                                        </div>
                                        <FileUploader multiple={true} className={styles.fileupload} handleChange={(file) => chooseImage(file, setImageUrl, setImageLocation, errMsg)} name="file" types={fileTypes} />
                                    </div>
                                }
                            </NicheCard>
                        )}


                        <NicheCard id={styles.pro}>
                            <div className={styles.inpbox}>
                                <div className={styles.title}>Pricing</div>
                                <div className={styles.label}>Price</div>
                                <CurrencyInput
                                    name="input-name1"
                                    placeholder="Price of the product"
                                    defaultValue={1000}
                                    decimalsLimit={2}
                                    onValueChange={(value, name) => setPricing(value)}
                                    prefix={currency && currency + " "}
                                    className={styles.inp}
                                    value={pricing}
                                />
                            </div>
                            <div className={styles.inpbox}>
                                <div className={styles.label}>Compare at price</div>
                                <CurrencyInput
                                    name="input-name2"
                                    placeholder="Compare at price"
                                    defaultValue={1000}
                                    decimalsLimit={2}
                                    onValueChange={(value, name) => setComparePrice(value)}
                                    prefix={currency && currency + " "}
                                    className={styles.inp}
                                    value={comparePrice}
                                />
                            </div>
                            <div className={styles.inpbox}>
                                <div className={styles.label}>Cost per item</div>
                                <div className={styles.profitbox}>
                                    <CurrencyInput
                                        name="input-name3"
                                        placeholder="Cost per item"
                                        defaultValue={1000}
                                        decimalsLimit={2}
                                        onValueChange={(value, name) => setCpp(value)}
                                        prefix={currency && currency + " "}
                                        className={styles.inp}
                                        value={cpp}
                                    />
                                    <div className={styles.labeltexts}>
                                        <div className={styles.val}>
                                            <div className={styles.valtxt}>Margin</div>
                                            <div className={styles.valtxtval}> {parseInt(((pricing - cpp) / pricing) * 100) ? parseInt(((pricing - cpp) / pricing) * 100) : "0"}%</div>
                                        </div>
                                        <div className={styles.val}>
                                            <div style={{ color: parseInt(((pricing - cpp) / pricing) * 100) < 0 ? 'red' : 'green' }} className={styles.valtxt}>Profit</div>
                                            <div style={{ color: parseInt(((pricing - cpp) / pricing) * 100) < 0 ? 'red' : 'green' }} className={styles.valtxtval}>
                                                {cpp === 0 ? 'Profit Unknown' :
                                                    <>
                                                        {parseInt(((pricing - cpp) / pricing) * 100) < 0 ? "Loss" : "Profit"} : {currency && currency + " "}  {parseInt(pricing - cpp) ? parseInt(pricing - cpp) : "0"}
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {pricing === 0 || cpp === 0 ? null : <div className={styles.sub}>Customers will not see this</div>}
                            </div>
                        </NicheCard>
                        <NicheCard id={styles.pro}>
                            <div className={styles.inpbox}>
                                <div className={styles.title}>Inventory</div>
                                <div className={styles.label}>SKU (Stock Keeping Unit) - Optional </div>
                                <input defaultValue={sku} onChange={(e) => setSku(e.target.value)} type={"text"} placeholder={"SKU (Stock Keeping Unit)"} className={styles.inp} />
                            </div>
                            <div className={styles.inpbox}>
                                <div className={styles.label}>Barcode (ISBN, UPC, GTIN, etc.) - Optional</div>
                                <input defaultValue={barCode} onChange={(e) => setBarCode(e.target.value)} type={"text"} placeholder={"Barcode (ISBN, UPC, GTIN, etc.)"} className={styles.inp} />
                            </div>
                            <div className={styles.inpbox}>
                                <div className={styles.label}>Number of product available</div>
                                <input defaultValue={numberAvailable} onChange={(e) => setNumberAvailable(e.target.value)} type={"text"} placeholder={"Number  available"} className={styles.inp} />
                            </div>
                        </NicheCard>


                    </div>
                    <div className={styles.side}>
                        <NicheCard id={styles.pro}>
                            <div className={styles.inpbox}>
                                <div className={styles.title}>Product Staus</div>
                                <Select options={ProductStatusOption} value={status} onChange={(value) => setProductStatus(value)} />
                            </div>
                            <div className={styles.inpbox}>
                                <div className={styles.sub}>
                                    Active Products Appears on your site for consumers to see and interact
                                </div>
                            </div>
                        </NicheCard>

                        <NicheCard id={styles.pro}>
                            <div className={styles.inpbox}>
                                <div className={styles.title}>Shipping</div>
                                <div className={styles.opt}>
                                    {!isShiping ? (<BiCheckbox onClick={() => setIsShipping(!isShiping)} className={styles.check} size={25} color="black" />)
                                        : (<BiCheckboxSquare onClick={() => setIsShipping(!isShiping)} className={styles.check} size={25} color="black" />)}
                                    <div className={styles.optxt}>Is this a Physical product ?</div>
                                </div>
                                <div className={styles.sub}>Customers wont enter their shipping address or choose a shipping method when buying this product.</div>
                            </div>
                            {!isShiping ? null
                                :
                                <>
                                    <div className={styles.inpbox}>
                                        <div className={styles.label}>Weight</div>
                                        <div className={styles.sub}>Used to calculate shipping rates at checkout and label prices during fulfillment. See guidelines for estimating product weight.</div>
                                        <div className={styles.opt}>
                                            <input defaultValue={weight} onChange={(e) => setWeight(e.target.value)} type={"number"} placeholder={"weight"} className={styles.inp} />
                                            <select value={weightval} onChange={(e) => setWeightval(e.target.value)} style={{ width: 80, marginTop: 2, marginLeft: 5, height: 45 }} id={styles.select} className={styles.inp}>
                                                <option value={'Ib'}>Ib</option>
                                                <option value={'oz'}>oz</option>
                                                <option value={'kg'}>kg</option>
                                                <option value={'g'}>g</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className={styles.inpbox}>
                                        <div className={styles.label}>Customs information</div>
                                        <div className={styles.sub}>
                                            Customs authorities use this information to calculate duties when shipping internationally. Shown on printed customs forms.
                                        </div>
                                    </div>
                                    <div className={styles.inpbox}>
                                        <div className={styles.label}>Country/Region of origin</div>
                                        <Select options={countryoptions} value={country} onChange={changeHandler} />
                                        <div className={styles.sub}>
                                            In most cases, where the product is manufactured.
                                        </div>
                                    </div>
                                    <div className={styles.inpbox}>
                                        <div className={styles.label}>HS (Harmonized System) code</div>
                                        <input defaultValue={hs} onChange={(e) => setHs(e.target.value)} type={"text"} placeholder={"Number  available"} className={styles.inp} />
                                        <div className={styles.sub}>
                                            Manually enter codes that are longer than 6 numbers.
                                        </div>
                                    </div>
                                </>
                            }

                        </NicheCard>

                        <NicheCard id={styles.pro}>
                            <div className={styles.inpbox}>
                                <div className={styles.title}>Options</div>
                                <div className={styles.opt}>
                                    {!isOption ? (<BiCheckbox onClick={() => setIsOption(!isOption)} className={styles.check} size={25} color="black" />)
                                        : (<BiCheckboxSquare onClick={() => setIsOption(!isOption)} className={styles.check} size={25} color="black" />)}
                                    <div className={styles.optxt}>This product has options, like size or color</div>
                                </div>
                            </div>
                            {!isOption ? null
                                :
                                <>
                                    <div className={styles.inpbox}>
                                        <div className={styles.label}>Option Name</div>
                                        <input defaultValue={options} onChange={(e) => setOptions(e.target.value)} type={"text"} placeholder={"Option Name"} className={styles.inp} />
                                        <div className={styles.sub}>
                                            In most cases, where the product is manufactured.
                                        </div>
                                    </div>
                                    <div className={styles.inpbox}>
                                        <div className={styles.label}>Option Value</div>
                                        <input defaultValue={optionValue} onChange={(e) => setOptionValue(e.target.value)} type={"text"} placeholder={"Number  available"} className={styles.inp} />
                                        <div className={styles.sub}>
                                            In most cases, where the product is manufactured.
                                        </div>
                                        <button onClick={() => AddOptions()} className={styles.addop}>Add Options</button>

                                    </div>
                                    <div className={styles.list}>
                                        {optionData && optionData.map((item, i) => (
                                            <div key={i} className={styles.optionbox}>
                                                <MdDragIndicator size={30} color={'gray'} />
                                                <div className={styles.optiontxt}>{item.name}</div>
                                                <div className={styles.optiontxt}>{item.value}</div>
                                                <MdDelete onClick={() => Deleteoption(item.name)} size={30} color={'black'} />
                                            </div>
                                        ))}
                                    </div>
                                </>
                            }

                        </NicheCard>


                        <NicheCard id={styles.pro}>
                            <div className={styles.inpbox}>
                                <div className={styles.title}> Search Keywords</div>
                                <div className={styles.sub}>
                                    This helps customers to find the product easily without typing the specific word for the product.
                                    give them a clue to find your product.
                                </div>
                            </div>
                            <div className={styles.inpbox}>
                                <div className={styles.label}>Keyword Value</div>
                                <input defaultValue={keyWords} onChange={(e) => setKeywords(e.target.value)} type={"text"} placeholder={"Keywords "} className={styles.inp} />
                                <button onClick={() => AddKeywords()} className={styles.addop}>Add Keyword</button>
                            </div>
                            <div className={styles.list}>
                                {keywordData && keywordData.map((item, i) => (
                                    <div key={i} className={styles.optionbox}>
                                        <MdDragIndicator size={30} color={'gray'} />
                                        <div className={styles.optiontxt}>{item}</div>
                                        <MdDelete onClick={() => DeletKeyword(item)} size={30} color={'black'} />
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

export default AddProducts