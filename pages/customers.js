import React, { useState, useEffect, useContext } from 'react'
import styles from '../styles/Customers.module.css'
import NavigationLayout from '../components/NavigationLayout';
import ViewLayout from '../components/ViewLayout';
import NicheCard from '../components/NicheCard';
import ten from '../public/assets/13.png'
import NicheMount from '../components/NicheMount';
import Link from 'next/link';
import { fetchUsers } from '../controllers/users';
import { State } from '../StateManagement';
import { useToasts } from 'react-toast-notifications'
import { useRouter } from 'next/router';
import Select from 'react-select'
import ReactLoading from 'react-loading';
import AllUsers from '../components/Allusers';

import { FaUserCircle } from 'react-icons/fa';


function Customers() {


    const { editData, setEditData } = useContext(State)

    const [isUser, setIsUsers] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingbut, setLoadingbut] = useState(false)
    const [getUsers, setGetUsers] = useState([])
    const [add, setAdd] = useState(null)
    const [error, errMsg] = useState('')
    const { addToast } = useToasts()


    
    const router = useRouter()


    const addCollection = () => {
        setLoadingbut(true)
        setEditData({})
        setTimeout(() => {
            router.push('/adduser')
        }, 1000)
    }

    const setDataToBrEdited = (data) => {
        setLoading(true)
        setEditData(data)
        setTimeout(() => {
          router.push('/adduser')
        }, 1000)
      }


    useEffect(() => {
        if (error !== '') {
            addToast(error, { appearance: 'warning', autoDismiss: true, })
        }
    }, [error, addToast])


    useEffect(() => {
        fetchUsers(setGetUsers, setLoading, setAdd, errMsg, setIsUsers, setLoading)
    }, 
    [setGetUsers, errMsg, setIsUsers, setLoading])


    return (
        <NavigationLayout>
            <ViewLayout title={'Customers'}>
                <NicheCard id={styles.prodbox}>
                    <div className={styles.toptabnavigator}>

                        <div className={styles.items2} >
                            <Select
                                placeholder={"Search or select product"}
                                // className={styles.searchinp}
                                options={getUsers && getUsers.map((item, i) => {
                                    return {
                                        id: item.id,
                                        label: item.name,
                                        value: item,
                                    }

                                })}
                                formatOptionLabel={opt => (
                                    <div className={styles.optionlistbox}>
                                        <div className={styles.optionimagebox}>
                                            <FaUserCircle size={25} color='black' />
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
                            ) : "Add User"}
                        </button>
                    </div>
                    <AllUsers  setLoad={setLoading} setIsProduct={setIsUsers} />
                    {loading ? (
                        <center>
                            <ReactLoading color={'black'} height={40} width={40} />
                        </center>
                    ) : null}
                </NicheCard>
                {loading ? null : (
                    <>
                        {isUser ?
                            null
                            : (
                                <NicheCard>
                                    <NicheMount
                                        subtitle={'Everything customers-related in a single place'}
                                        sub={`When a customers visits your site and purchases a product, you will be able to get a summary of their order history, 
                                        create segments to send personalized communications that drive sales and more.`}
                                        image={ten}
                                    />
                                    <center>
                                        <button onClick={() => router.push('/adduser')} className={styles.paybutt}>Add Customer</button>
                                    </center>
                                </NicheCard>
                            )}
                    </>
                )}
                <center>
                    <div className={styles.link}>
                        Learn more about <Link href={"#"}>Customers</Link>
                    </div>
                </center>
            </ViewLayout>
        </NavigationLayout>
    )
}

export default Customers