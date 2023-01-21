import db from "../firebase";
import { doc, updateDoc, addDoc, collection, query, where, getDocs } from "firebase/firestore";


const TableName = "PaymentInfo"

export async function Add(phone,accno, swCode,setLoading,setMsg){
    setLoading(true)
    const docRef = await addDoc(collection(db, TableName), {
        phone,accno,swCode
    });
    console.log("Document written with ID: ", docRef.id);
    setLoading(false)
    setMsg("Data Added Sucessfully")
}


export async function Update(phone,accno, swCode,setLoading,setMsg) {
    setLoading(true)
    try {
        const q = query(collection(db, TableName));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (res) => {
            const que = doc(collection(db, TableName), res.id)
            await updateDoc(que,
                {
                    phone,accno, swCode
                }
            )
        });
        setLoading(false)
        setMsg("Data Updated Sucessfully")
        console.log('Data Updated Sucessfully')
    } catch (error) {
        setMsg("Data could not update")
        console.log(error)
        setLoading(false)
    }
}

export  async function Fetch(setPhone,setAccno, setSwCode,setLoading,setAdd){
    setLoading(true)
    const info = query(collection(db, TableName))
    const querySnapshot = await getDocs(info);
    const mainData = [];
    querySnapshot.forEach((doc) => {
        mainData.push(doc.data())
    });
    if (mainData.length > 0) {
        setPhone(mainData[0].phone)
        setAccno(mainData[0].accno)
        setSwCode(mainData[0].swCode)
        setLoading(false)
    } else {
        setLoading(false)
        setAdd(true)
    }
}
