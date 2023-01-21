import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { doc, updateDoc, deleteDoc, addDoc, collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import db from "../firebase";
import { USER_TABLE } from '../shema/index'


const TableName = 'users'


export async function fetchUsers(setUsers, setLoading, setAdd, errMsg, setIsUser, setLoad) {
    setLoading(true)
    try {
        const q = query(collection(db, TableName));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const mainData = [];
            querySnapshot.forEach((doc) => {
                mainData.push({ id: doc.id, ...doc.data() })
                console.log('users :', mainData)
            });
            if (mainData.length > 0) {
                setUsers(mainData)
                setLoading(false)
                setLoad(false)
                setIsUser(true)
            } else {
                setLoading(false)
                setAdd(true)
                setLoad(false)
                setIsUser(false)
            }
        });
    } catch (error) {
        errMsg(error)
        setLoading(false)
    }


}



export const Adduser = async (username, telephone, metadata, setLoading, setMsg, errMsg) => {
    setLoading(true)
    try {
        await addDoc(collection(db, TableName), USER_TABLE(metadata, telephone, username))
        setMsg("User Created Successfully")
        setLoading(false)
    } catch (error) {
        errMsg('Unable to create User')
        setLoading(false)
    }
}




export const AdduserApi = async (username, telephone, metadata,res) => {
    try {
        await addDoc(collection(db, TableName), USER_TABLE(metadata, telephone, username))
        res.status(200).send({ status: true, message: "User Created Successfully" })
    } catch (error) {
        res.status(404).send({ status: false, message: 'Unable to create User' });
    }
}
