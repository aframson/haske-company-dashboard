import React from 'react'
import db from "../firebase";
import { doc, updateDoc, addDoc, collection, query, where, getDocs } from "firebase/firestore";




const TableName = "personalInfo"

export async function SubmitPersonalInfo(storeName, storeLegalName, about,slogan,description, setLoading, setMsg, industry, errMsg) {
    setLoading(true)

    try {
        const docRef = await addDoc(collection(db, TableName), {
            storeName: storeName,
            storeLegalName: storeLegalName,
            about: about,
            industry: industry,
            slogan:slogan,
            description:description
        });
        console.log("Document written with ID: ", docRef.id);

        setLoading(false)
        setMsg("Data Uploadded Sucessfully")
    } catch (error) {
        errMsg("Could not add data")
        setLoading(false)
    }


}


export async function UpdatePersonalInfo(storeName, storeLegalName, about,slogan,description, setLoading, setMsg, industry, errMsg) {


    setLoading(true)
    try {
        const q = query(collection(db, TableName));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (res) => {
            const que = doc(collection(db, TableName), res.id)
            await updateDoc(que,
                {
                    storeName,
                    storeLegalName,
                    about,
                    industry,
                    slogan,
                    description
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

export async function FetchPersonalInfo(setStoreName, setStoreLegalName, setIndustry, setAbout,setSlogan,setDescription, setLoading, setAdd) {
    setLoading(true)
    const info = query(collection(db, TableName))
    const querySnapshot = await getDocs(info);
    const mainData = [];
    querySnapshot.forEach((doc) => {
        mainData.push(doc.data())
    });
    if (mainData.length > 0) {
        setStoreName(mainData[0].storeName)
        setStoreLegalName(mainData[0].storeLegalName)
        setIndustry(mainData[0].industry)
        setAbout(mainData[0].about)
        setSlogan(mainData[0].slogan)
        setDescription(mainData[0].description)
        setLoading(false)
    } else {
        setLoading(false)
        setAdd(true)
    }
}
