import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { doc, updateDoc, deleteDoc, addDoc, collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import db from "../firebase";
import { USER_TABLE } from '../shema/index'


const TableName = 'users'



// unique random string numbers
const code = () => {
    return Math.random().toString(5).substring(2, 5) + Math.random().toString(5).substring(2, 5)
}

const random = () => {
    return Math.random().toString(36).substring(2, 15) 
}



export const chooseImage = (file, setImageUrl, setFilename, setImageLocation) => {
    let value = URL.createObjectURL(file);
    setImageUrl(value);
    setFilename(file.name)
    setImageLocation(file)
    console.log(value)
}






 export async function UpdateUser(id, data, setLoading, setMsg, errMsg,setProgress) {
    setLoading(true)
    try {
        const q = doc(db, TableName, id);
        // const querySnapshot = await getDocs(q);
        await updateDoc(q, {
            metaData:data.metaData,
            institution:data.institution,
            name:data.name,
            telephone:data.telephone
        })
        setLoading(false)
        setMsg("Data Updated Sucessfully")
        console.log('Data Updated Sucessfully')
        setProgress(0)
    } catch (error) {
        errMsg("Data could not update")
        console.log(error)
        setLoading(false)
        setProgress(0)
    }
}




export const delData = async (id, errMsg, setMsg, setLoading) => {
    setLoading(true)
    try {
        const del = doc(db, TableName, id)
        const storage = getStorage();
        await deleteDoc(del)
        setMsg("Updated successfully")
        setLoading(false)
    } catch (error) {
        console.log(error)
        errMsg('Could not Delete Logo')
        setLoading(false)
    }

}



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



export const Adduser = async (username, telephone, metadata,products, setLoading, setMsg, errMsg) => {
    setLoading(true)
    try {
        await addDoc(collection(db, TableName), USER_TABLE(metadata,telephone, username,products))
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
