import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { doc, updateDoc, deleteDoc, addDoc, collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import db from "../firebase";


const TableName = "collections"
const fileLocation = 'collections/'

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


const addCollection = async (institutionId,title, description, filename, status, products,products2, downloadURL, setMsg, errMsg, setLoading, setProgress) => {
    setLoading(true)
    try {
        const docRef = await addDoc(collection(db, TableName), {
            filename,
            image: downloadURL,
            title,
            description,
            status,
            products,
            institution:products2,
            institutionId
        });
        setMsg("Logo Added sucessfully")
        setProgress(0)
        console.log("Document written with ID: ", docRef.id);
        setLoading(false)
    } catch (error) {
        errMsg("Oops could not add data")
        setLoading(false)
        setImageUrl(null)
    }


}


export const handleUploadWhenUpdate = async (file, setFilename, setLoading, setProgress, setMsg, errMsg, id) => {
    // get file name from file
    setLoading(true)
    let value = URL.createObjectURL(file);
    console.log(value)
    const storage = getStorage();
    const uniquename = random() + file.name

    const storageRef = ref(storage, fileLocation + uniquename);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress)
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case 'paused': // or 'paused'
                console.log('Upload is paused');
                break;
            case 'running': // or 'running'
                console.log('Upload is running');
                break;
        }
    }, (error) => {
        // Handle unsuccessful uploads
        console.log(error)
        errMsg("Unsuccessful uploads")
    }, () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            setFilename(uniquename)
            UpdateImage(id, downloadURL, uniquename, setLoading, setMsg, errMsg, setProgress)
        });
        setLoading(false)
    });

}

export const handleUpload = async (institutionId,title, description, filename, status, products,products2, setLoading, imageLocation, setProgress, setMsg, errMsg) => {
    // get file name from file
    setLoading(true)
    const storage = getStorage();
    const uniquename = random() + filename
    const storageRef = ref(storage, fileLocation + uniquename);
    const uploadTask = uploadBytesResumable(storageRef, imageLocation);
    uploadTask.on('state_changed', (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress)
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case 'paused': // or 'paused'
                console.log('Upload is paused');
                break;
            case 'running': // or 'running'
                console.log('Upload is running');
                break;
        }
    }, (error) => {
        // Handle unsuccessful uploads
        console.log(error)
        errMsg("Unsuccessful uploads")
    }, () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            addCollection(institutionId,title, description, uniquename, status, products,products2, downloadURL, setMsg, errMsg, setLoading, setProgress);
        });
        setLoading(false)
    });

}


export async function Update(id, data, setLoading, setMsg, errMsg, setProgress) {
    setLoading(true)
    try {
        const q = doc(db, TableName, id);
        // const querySnapshot = await getDocs(q);
        await updateDoc(q, data)
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

export async function UpdateImage(id, image, filename, setLoading, setMsg, errMsg, setProgress) {
    setLoading(true)
    try {
        const q = doc(db, TableName, id);
        // const querySnapshot = await getDocs(q);
        await updateDoc(q, {
            filename,
            image,
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


export const delImageData = async (id, filename, errMsg, setMsg, setLoading) => {
    setLoading(true)
    try {
        const del = doc(db, TableName, id)
        const storage = getStorage();
        // Create a reference to the file to delete
        const desertRef = ref(storage, fileLocation + filename);
        // Delete the file

        deleteObject(desertRef).then(async () => {
            // File deleted successfully 
            await updateDoc(del, {
                filename: '',
                image: ''
            })
            setMsg("File deleted successfully ")
        }).catch((error) => {
            // Uh-oh, an error occurred!
            errMsg("Uh-oh, an error occurred!")
        });
        setLoading(false)
    } catch (error) {
        console.log(error)
        errMsg('Could not Delete image')
        setLoading(false)
    }

}

export const delData = async (id, filename, errMsg, setMsg, setLoading, setCollection, collectionData) => {
    setLoading(true)
    try {
        const del = doc(db, TableName, id)
        const storage = getStorage();
        // Create a reference to the file to delete
        const desertRef = ref(storage, fileLocation + filename);
        // Delete the file
        deleteObject(desertRef).then(async () => {
            // File deleted successfully 
            await deleteDoc(del)
            setMsg("File deleted successfully ")
            setCollection(collectionData.filter(x => x.id !== id))
        }).catch((error) => {
            // Uh-oh, an error occurred!
            errMsg("Uh-oh, an error occurred!")
        });
        setLoading(false)
    } catch (error) {
        console.log(error)
        errMsg('Could not Delete Logo')
        setLoading(false)
    }

}


export async function fetchCollections(setCollection, setLoading, setAdd, errMsg, setIsProduct, setLoad, type) {
    setLoading(true)
    try {
        const q = query(collection(db, TableName), where("status", "==", type));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const mainData = [];
            querySnapshot.forEach((doc) => {
                mainData.push({ id: doc.id, ...doc.data() })
                // console.log('collection :', mainData)
            });
            if (mainData.length > 0) {
                setCollection(mainData)
                setLoading(false)
                setLoad(false)
                setIsProduct(true)
            } else {
                setLoading(false)
                setAdd(true)
                setLoad(false)
                setIsProduct(false)
            }
        });
    } catch (error) {
        errMsg(error)
        setLoading(false)
    }


}


export async function fetchCollectionById(id, setImageUrl, setLoading, errMsg) {
    setLoading(true)
    try {
        const unsub = onSnapshot(doc(db, TableName, id), (doc) => {
            setImageUrl(doc.data() && doc.data().image)
            if (doc.data() && doc.data().length > 0) {
                setLoading(false)
            } else {
                setLoading(false)
            }
        });
        setLoading(false)
    } catch (error) {
        errMsg(error)
        setLoading(false)
    }


}