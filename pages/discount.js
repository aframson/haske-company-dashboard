import React, { useState, useEffect, useContext } from 'react'
import styles from '../styles/Discount.module.css'
import NavigationLayout from '../components/NavigationLayout';
import ViewLayout from '../components/ViewLayout';
import NicheCard from '../components/NicheCard';
import NicheMount from '../components/NicheMount';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ReactLoading from 'react-loading';
import { State } from '../StateManagement';
import AllCollections from '../components/AllCollections';
import AllDiscounts from '../components/AllDiscounts';
import Select from 'react-select'
import { fetchDiscounts } from '../controllers/discount';
import { useToasts } from 'react-toast-notifications'
import Image from 'next/image';
import ten from '../public/assets/15.png'




function Categories() {


    const { editData, setEditData } = useContext(State)

    const [tabs, setTabs] = useState('active')
    const [isProduct, setIsProduct] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingbut, setLoadingbut] = useState(false)
    const [getProducts, setGetProducts] = useState([])
    const [add, setAdd] = useState(null)
    const [error, errMsg] = useState('')
    const { addToast } = useToasts()


    useEffect(() => {
        if (error !== '') {
            addToast(error, { appearance: 'warning', autoDismiss: true, })
        }  
    }, [error, addToast])

    useEffect(() => {
        fetchDiscounts(setGetProducts, setLoading, setAdd, errMsg, setIsProduct, setLoading, tabs)
    }, [setGetProducts, errMsg, setIsProduct, setLoading, tabs])

    const router = useRouter()


    const addCollection = () => {
        setLoadingbut(true)
        setEditData({})
        setTimeout(() => {
            router.push('/adddiscount')
        }, 1000)
    }

    const setDataToBrEdited = (data) => {
        setLoading(true)
        setEditData(data)
        setTimeout(() => {
            router.push('/adddiscount')
        }, 1000)
    }


    return (
        <NavigationLayout>
            <ViewLayout title={"Discounts"}>

                <NicheCard id={styles.prodbox}>
                    <div className={styles.toptabnavigator}>
                        <div className={styles.tablist}>
                            <div onClick={() => setTabs('active')} style={{ borderBottomColor: tabs === 'active' ? '#31a658' : 'none', borderBottom: tabs === 'active' ? '5px solid #31a658' : 'none' }} className={styles.items}>Active</div>
                            <div onClick={() => setTabs('draft')} style={{ borderBottomColor: tabs === 'draft' ? '#31a658' : 'none', borderBottom: tabs === 'draft' ? '5px solid #31a658' : 'none' }} className={styles.items}>Draft</div>
                        </div>
                        <div className={styles.items2} >
                            <Select
                                placeholder={"Search or select product"}
                                // className={styles.searchinp}
                                options={getProducts && getProducts.map((item, i) => {
                                    return {
                                        id: item.id,
                                        label: item.title,
                                        value: item,
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
                                onChange={(value) => {
                                    setDataToBrEdited(value.value)
                                    console.log('this::', value.value)
                                }}
                            />
                        </div>
                        <button onClick={() => addCollection()} className={styles.butt}>
                            {loadingbut ? (
                                <center>
                                    <ReactLoading color={'white'} height={20} width={20} />
                                </center>
                            ) : "Add Discount"}
                        </button>
                    </div>
                    {tabs === 'active' ? (
                        <AllDiscounts type={tabs} setLoad={setLoading} setIsProduct={setIsProduct} />
                    ) : null}
                    {tabs === 'draft' ? (
                        <AllDiscounts type={tabs} setLoad={setLoading} setIsProduct={setIsProduct} />
                    ) : null}
                    {loading ? (
                        <center>
                            <ReactLoading color={'black'} height={40} width={40} />
                        </center>
                    ) : null}
                </NicheCard>


                {loading ? null : (
                    <>
                        {isProduct ?
                            null
                            : (
                                <NicheCard>
                                    <NicheMount
                                        subtitle={'Manage discounts and promotions'}
                                        sub={`
                                                Create discount  that apply at checkout. 
                                                You can also use discounts on your pages as a collection of products.
                                          `}
                                        image={ten}
                                    />
                                    <center>
                                        <button onClick={() => router.push('/adddiscount')} className={styles.paybutt}>Create Category</button>
                                    </center>
                                </NicheCard>
                            )}
                    </>
                )}
                <center>
                    <div className={styles.link}>
                        Learn more about <Link href={"#"}>Collections</Link>
                    </div>
                </center>
            </ViewLayout>
        </NavigationLayout>
    )
}

export default Categories