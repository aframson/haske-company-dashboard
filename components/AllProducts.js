import React, { useEffect, useState, useContext } from 'react'
import styles from '../styles/Products.module.css'
import { MdDragIndicator, MdDelete, MdEdit } from 'react-icons/md'
import { fetchProducts, delData } from '../controllers/products'
import ReactLoading from 'react-loading';
import { useToasts } from 'react-toast-notifications'
import Image from 'next/image';
import { Fetch } from '../controllers/storeCurrency'
import { useRouter } from 'next/router';
import { State } from '../StateManagement';









export default function AllProducts({ setIsProduct, setLoad, type }) {



  const { editData, setEditData } = useContext(State)


  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')
  const [loading2, setLoading2] = useState(false)
  const [add, setAdd] = useState(false)
  const [error, errMsg] = useState('')
  const [productData, setProductData] = useState([])
  const [currency, setCurrency] = useState()
  const [delid, setdeId] = useState()

  const { addToast } = useToasts()
  const router = useRouter()

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

  useEffect(() => {
    Fetch(setCurrency, setLoading, setAdd)
  }, [])



  const setDataToBrEdited = (data) => {
    setdeId(data.id)
    setLoading(true)
    setEditData(data)

    setTimeout(() => {
      router.push('/addproducts')
    }, 1000)
  }



  const Delete = (id, images, errMsg, setMsg, setLoading, setProductData, productData) => {
     setdeId(id)
    if (confirm("Are you sure you want to do that?")) {

      delData(id, images, errMsg, setMsg, setLoading, setProductData, productData)
      console.log("Ok was pressed");
    } else {
      // add code if the user pressed the Cancel button
      console.log("Cancel was pressed");
    }
  }


  useEffect(() => {
    fetchProducts(setProductData, setLoading, errMsg, setIsProduct, setLoad, type)
  }, [setProductData, setLoading, errMsg, setIsProduct, setLoad, type])



  return (
    <div className={styles.tablerow}>
      <div className={styles.tablecontent}>
        <div className={styles.tablehead}>
          <div className={styles.th}>product</div>
          <div className={styles.th}>staus</div>
          <div className={styles.th}>inventory</div>
          <div className={styles.th}>price</div>
          <div className={styles.th}>edit</div>
          <div className={styles.th}>delete</div>
        </div>
        {productData && productData.map((item, i) => (
          <div key={i} className={styles.body}>
            <div id={styles.pnai} className={styles.tb}>
              <div className={styles.imaagebox}>
                <Image blurDataURL={item.images[0]} src={item.images[0]} alt="product-image" height={35} width={35} className={styles.imagex} />
              </div>
              <div className={styles.productname}>
                {item.info.title}
              </div>
            </div>
            <div className={styles.tb}>
              <div className={styles.stats}>{item.status}</div>
            </div>
            <div className={styles.tb}>{item.inventory.numberAvailable} in stock</div>
            <div className={styles.tb}>{currency && currency} {item.pricing.price}</div>
            <div onClick={() => setDataToBrEdited(item)} id={styles.action2} className={styles.tb}>
              {loading && delid === item.id ? <ReactLoading width={20} height={20} color="black" /> : <MdEdit size={20} color="black" />}
            </div>

            <div onClick={() => Delete(item.id,item.images,errMsg, setMsg, setLoading2, setProductData, productData)} id={styles.action} className={styles.tb}>

              {loading2 && delid === item.id ? (<center><ReactLoading color={'black'} height={20} width={20} /></center>) : <MdDelete size={20} color="black" />}
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}
