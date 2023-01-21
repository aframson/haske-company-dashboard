import React, { useState, useContext ,useEffect} from 'react'
import styles from '../styles/Products.module.css'
import NavigationLayout from '../components/NavigationLayout';
import ViewLayout from '../components/ViewLayout';
import NicheCard from '../components/NicheCard';
import Image from 'next/image';
import productimg from '../public/assets/9.png'
import Link from 'next/link';
import NicheMount from '../components/NicheMount';
import AllProducts from '../components/AllProducts';
import ReactLoading from 'react-loading';
import { State } from '../StateManagement';
import { useRouter } from 'next/router';
import { fetchProducts } from '../controllers/products';
import Select from 'react-select'
import { useToasts } from 'react-toast-notifications'


function Products() {


    const { editData, setEditData } = useContext(State)

    const [tabs, setTabs] = useState('active')
    const [isProduct, setIsProduct] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingbut, setLoadingbut] = useState(false)
    const [getProducts, setGetProducts] = useState([])
    const [add,setAdd] = useState(null)
    const [error,errMsg]=useState('')
    const { addToast } = useToasts()
    

    useEffect(() => {
        if (error !== '') {
            addToast(error, { appearance: 'warning', autoDismiss: true, })
        }
    }, [error, addToast])

    useEffect(() => {
        fetchProducts(setGetProducts, setLoading, errMsg, setIsProduct, setLoading, tabs)
    }, [ setGetProducts, errMsg, setIsProduct, setLoading,tabs])


    const router = useRouter()

 
    const addProduct = () => {
        setLoadingbut(true)
        setEditData({})
        setTimeout(() => {
            router.push('/addproducts')
        }, 1000)
    }


    const setDataToBrEdited = (data) => {
        setLoading(true)
        setEditData(data)
        setTimeout(() => {
          router.push('/addproducts')
        }, 1000)
      }



    return (
        <NavigationLayout>
            <ViewLayout title={"Products"}>

                <NicheCard id={styles.prodbox}>
                    <div className={styles.toptabnavigator}>
                        <div className={styles.tablist}>
                            <div onClick={() => setTabs('active')} style={{ borderBottomColor: tabs === 'active' ? '#31a658' : 'none', borderBottom: tabs === 'active' ? '5px solid #31a658' : 'none' }} className={styles.items}>Active</div>
                            <div onClick={() => setTabs('draft')} style={{ borderBottomColor: tabs === 'draft' ? '#31a658' : 'none', borderBottom: tabs === 'draft' ? '5px solid #31a658' : 'none' }} className={styles.items}>Draft</div>
                        </div>
                        <div className={styles.items2} >
                        <Select
                                    placeholder={"Search or select product"}
                                    options={getProducts && getProducts.map((item, i) => {
                                        return {
                                            id: item.id,
                                            label: item.info.title,
                                            value: item,
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
                                    onChange={(value) => {
                                        setDataToBrEdited(value.value)
                                        console.log('this::',value.value)

                                     } }
                                     />
                        </div>
                        <button onClick={() => addProduct()} className={styles.butt}>
                            {loadingbut ? (
                                <center>
                                    <ReactLoading color={'white'} height={20} width={20} />
                                </center>
                            ) : "Add Product"}
                        </button>
                    </div>
                    {tabs === 'active' ? (
                        <AllProducts   type={tabs} setLoad={setLoading} setIsProduct={setIsProduct} />
                    ) : null}
                    {tabs === 'draft' ? (
                        <AllProducts  type={tabs} setLoad={setLoading} setIsProduct={setIsProduct} />
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
                                        image={productimg}
                                        subtitle={'First up: what are you selling?'}
                                        sub={`Before you open your store, first you need some products.`}
                                    />
                                    <center>
                                        <button id={styles.bu} className={styles.butt}>Find Products to sell</button>
                                    </center>
                                </NicheCard>
                            )}
                    </>
                )}
                <center>
                    <div className={styles.link}>
                        Learn more about <Link href={"#"}>Products</Link>
                    </div>
                </center>
            </ViewLayout>

        </NavigationLayout>
    )
}

export default Products