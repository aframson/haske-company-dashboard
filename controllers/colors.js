import db from "../firebase";
import { doc, updateDoc, addDoc, collection, query, where, getDocs } from "firebase/firestore";

// const [primarycolor, setPrimaryColor] = useState('')
// const [secondarycolor, setSecondaryColor] = useState('')

const TableName = "ColorInfo"

export async function Add(primarycolor, secondarycolor, setLoading, setMsg, errMsg) {
    try {
        setLoading(true)
        const docRef = await addDoc(collection(db, TableName), {
            primarycolor, secondarycolor
        });
        console.log("Document written with ID: ", docRef.id);
        setLoading(false)
        setMsg("Data Added Sucessfully")
    } catch (error) {
        errMsg("Could not add data")
        setLoading(false)
    }

}


export async function Update(primarycolor, secondarycolor, setLoading, setMsg, errMsg) {
    setLoading(true)
    try {
        const q = query(collection(db, TableName));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (res) => {
            const que = doc(collection(db, TableName), res.id)
            await updateDoc(que,
                {
                    primarycolor, secondarycolor
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

export async function Fetch(setPrimaryColor, setSecondaryColor, setLoading, setAdd) {
    setLoading(true)
    const info = query(collection(db, TableName));
    const querySnapshot = await getDocs(info);
    const mainData = [];
    querySnapshot.forEach((doc) => {
        mainData.push(doc.data())
    });
    if (mainData.length > 0) {
        setPrimaryColor(mainData[0].primarycolor)
        setSecondaryColor(mainData[0].secondarycolor)
        setLoading(false)
    } else {
        setLoading(false)
        setAdd(true)
    }
}
