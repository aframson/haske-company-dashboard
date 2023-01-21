import db from "../firebase";
import { doc, updateDoc, addDoc, collection, query, where, getDocs } from "firebase/firestore";


const TableName = "Addressinfo"

export async function Add(address,location, city,postalCode,country,setLoading,setMsg,errMsg){
    setLoading(true)
    try {
        const docRef = await addDoc(collection(db, TableName), {
            address,location,city,postalCode,country
        });
        console.log("Document written with ID: ", docRef.id);
        setLoading(false)
        setMsg("Data Added Sucessfully")
    } catch (error) {
        errMsg("Could not add data")
        setLoading(false)
    }
  
}


export async function Update(address,location, city,postalCode,country,setLoading,setMsg,errMsg) {
    setLoading(true)
    try {
        const q = query(collection(db, TableName));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (res) => {
            const que = doc(collection(db, TableName), res.id)
            await updateDoc(que,
                {
                    address,location,city,postalCode,country
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

export  async function Fetch(setAddress,setLocation, setCity,setPostalCode,setCountry,setLoading,setAdd){
    setLoading(true)
    const info = query(collection(db, TableName))
    const querySnapshot = await getDocs(info);
    const mainData = [];
    querySnapshot.forEach((doc) => {
        mainData.push(doc.data())
    });
    if (mainData.length > 0) {
        setAddress(mainData[0].address)
        setLocation(mainData[0].location)
        setCity(mainData[0].city)
        setPostalCode(mainData[0].postalCode)
        setCountry(mainData[0].country)
        setLoading(false)
    } else {
        setLoading(false)
        setAdd(true)
    }
}
