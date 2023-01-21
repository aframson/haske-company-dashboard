import db from "../firebase";
import { doc, updateDoc, addDoc, collection, query, where, getDocs } from "firebase/firestore";


const TableName = "ContactInfo"

export async function Add(phone, email, storeEmail, setLoading, setMsg, errMsg) {
    try {
        setLoading(true)
        const docRef = await addDoc(collection(db, TableName), {
            phone, email, storeEmail
        });
        console.log("Document written with ID: ", docRef.id);
        setLoading(false)
        setMsg("Data Added Sucessfully")
    } catch (error) {
        errMsg("Could not add data")
        setLoading(false)
    }

}


export async function Update(phone, email, storeEmail, setLoading, setMsg, errMsg) {
    setLoading(true)
    try {
        const q = query(collection(db, TableName));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (res) => {
            const que = doc(collection(db, TableName), res.id)
            await updateDoc(que,
                {
                    phone, email, storeEmail
                }
            )
        });
        setLoading(false)
        setMsg("Data Updated Sucessfully")
        console.log('Data Updated Sucessfully')
    } catch (error) {
        errMsg("Data could not update")
        console.log(error)
        setLoading(false)
    }
}

export async function Fetch(setPhone, setEmail, setStoreEmail, setLoading, setAdd) {
    setLoading(true)
    const info = query(collection(db, TableName))
    const querySnapshot = await getDocs(info);
    const mainData = [];
    querySnapshot.forEach((doc) => {
        mainData.push(doc.data())
    });
    if (mainData.length > 0) {
        setPhone(mainData[0].phone)
        setEmail(mainData[0].email)
        setStoreEmail(mainData[0].storeEmail)
        setLoading(false)
    } else {
        setLoading(false)
        setAdd(true)
    }
}
