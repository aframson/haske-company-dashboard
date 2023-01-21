import db from "../firebase";
import { doc, updateDoc, addDoc, collection, query, where, getDocs } from "firebase/firestore";



const TableName = "socialmedialinks"

export async function SubmitPersonalInfo(facebook, instagrame, twitter, tiktok, linkedIn, SnapChat, whatsApp, setLoading, setMsg, errMsg) {
    setLoading(true)
    try {
        const docRef = await addDoc(collection(db, TableName), {
            facebook, instagrame, twitter, tiktok, linkedIn, SnapChat, whatsApp
        });
        console.log("Document written with ID: ", docRef.id);

        setLoading(false)
        setMsg("Data Uploadded Sucessfully")
    } catch (error) {
        errMsg("Could not add data")
        setLoading(false)
    }


}


export async function UpdatePersonalInfo(facebook, instagrame, twitter, tiktok, linkedIn, SnapChat, whatsApp, setLoading, setMsg, errMsg) {


    setLoading(true)
    try {
        const q = query(collection(db, TableName));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (res) => {
            const que = doc(collection(db, TableName), res.id)
            await updateDoc(que,
                {
                    facebook, instagrame, twitter, tiktok, linkedIn, SnapChat, whatsApp
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

export async function FetchPersonalInfo(setFaceBook, setInstagrame, setTwitter, setTiktok, setLinkedIn, setSnapChat,setWhatsApp, setLoading2, setAdd) {
    setLoading2(true)
    const info = query(collection(db, TableName))
    const querySnapshot = await getDocs(info);
    const mainData = [];
    querySnapshot.forEach((doc) => {
        mainData.push(doc.data())
    });
    if (mainData.length > 0) {
        setFaceBook(mainData[0].facebook)
        setInstagrame(mainData[0].instagrame)
        setTwitter(mainData[0].twitter)
        setTiktok(mainData[0].tiktok)
        setLinkedIn(mainData[0].linkedIn)
        setSnapChat(mainData[0].SnapChat)
        setWhatsApp(mainData[0].whatsApp)
        setLoading2(false)
    } else {
        setLoading2(false)
        setAdd(true)
    }
}
