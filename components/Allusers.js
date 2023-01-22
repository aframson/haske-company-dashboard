import React, { useEffect, useState, useContext } from 'react'
import styles from '../styles/Customers.module.css'
import { MdDelete, MdEdit } from 'react-icons/md'
import ReactLoading from 'react-loading';
import { useToasts } from 'react-toast-notifications'
import Image from 'next/image';
import { Fetch } from '../controllers/storeCurrency'
import { useRouter } from 'next/router';
import { State } from '../StateManagement';
import { fetchUsers,delData } from '../controllers/users';
import { FaUserCircle } from 'react-icons/fa';

import icon from '../public/assets/icon2.png'



export default function AllUsers({ setIsProduct, setLoad }) {



  const { editData, setEditData } = useContext(State)


  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')
  const [loading2, setLoading2] = useState(false)
  const [add, setAdd] = useState(false)
  const [error, errMsg] = useState('')
  const [collectionData, setCollection] = useState([])
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
    console.log('from all col', data)

    setTimeout(() => {
      router.push('/adduser')
    }, 1000)
  }



  const Delete = (id, errMsg, setMsg, setLoading) => {
    setdeId(id)
    if (confirm("Are you sure you want to do that?")) {
      delData(id, errMsg, setMsg, setLoading)
      console.log("Ok was pressed");
    } else {
      // add code if the user pressed the Cancel button
      console.log("Cancel was pressed");
    }
  }


  
  useEffect(() => {
    fetchUsers(setCollection, setLoading, setAdd, errMsg, setIsProduct, setLoad)
  }, [setCollection, setLoading, setAdd, errMsg, setIsProduct, setLoad])



  return (
    <div className={styles.tablerow}>
      <div className={styles.tablecontent}>
        <div className={styles.tablehead}>
          <div className={styles.th}>User</div>
          <div className={styles.th}>phone</div>
          <div className={styles.th}>edit</div>
          <div className={styles.th}>delete</div>
        </div>
        {collectionData && collectionData.map((item, i) => (
          <div key={i} className={styles.body}>
            <div id={styles.pnai} className={styles.tb}>
              <div className={styles.imaagebox}>
                <FaUserCircle size={30} color='black'/>
              </div>
              <div className={styles.productname}>
                {item.name}
              </div>
            </div>  
            <div className={styles.tb}>
              <div className={styles.stats}>{item.telephone}</div>
            </div>
            <div onClick={() => setDataToBrEdited(item)} id={styles.action2} className={styles.tb}>
              {loading && delid === item.id ? <ReactLoading width={20} height={20} color="black" /> : <MdEdit size={20} color="black" />}
            </div>
            <div onClick={() => Delete(item.id, errMsg, setMsg, setLoading2)} id={styles.action} className={styles.tb}>
              {loading2 && delid === item.id ? (<center><ReactLoading color={'black'} height={20} width={20} /></center>) : <MdDelete size={20} color="black" />}
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}
