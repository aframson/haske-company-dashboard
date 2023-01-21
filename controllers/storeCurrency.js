import db from "../firebase";
import { doc, updateDoc, addDoc, collection, query, where, getDocs } from "firebase/firestore";


const TableName = "storeCurrency";

export async function Add(currency,setLoading,setMsg,errMsg){
    try {
        setLoading(true)
        const docRef = await addDoc(collection(db, TableName), {
            currency
        });
        console.log("Document written with ID: ", docRef.id);
        setLoading(false)
        setMsg("Data Added Sucessfully")
    } catch (error) {
        errMsg("Data could not be added")
        setLoading(false)
    }
   
}


export async function Update(currency,setLoading,setMsg,errMsg) {
    setLoading(true)
    try {
        const q = query(collection(db, TableName));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (res) => {
            const que = doc(collection(db, TableName), res.id)
            await updateDoc(que,
                {
                    currency
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

export  async function Fetch(setCurrency,setLoading,setAdd){
    setLoading(true)
    const info = query(collection(db, TableName))
    const querySnapshot = await getDocs(info);
    const mainData = [];
    querySnapshot.forEach((doc) => {
        mainData.push(doc.data())
    });
    if (mainData.length > 0) {
        setCurrency(mainData[0].currency)
        setLoading(false)
    } else {
        setLoading(false)
        setAdd(true)
    }
}
