import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { doc, updateDoc, deleteDoc, addDoc, collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import db from "../firebase";


const TableName = "coverImages"
const fileLocation = 'coverImage/'

export const chooseImage = (file, setImageUrl, setFilename, setImageLocation) => {
    let value = URL.createObjectURL(file);
    setImageUrl(value);
    setFilename(file.name)
    setImageLocation(file)
    console.log(value)
}


const updateLogo = async (filename, downloadURL, setMsg, errMsg, setLoading, setImageUrl, setProgress) => {
    setLoading(true)
    try {
        const docRef = await addDoc(collection(db, TableName), {
            image: downloadURL,
            filename,
            status: false
        });
        setMsg("Cover Image Added sucessfully")
        setProgress(0)
        console.log("Document written with ID: ", docRef.id);
        setLoading(false)
        setImageUrl(null)
    } catch (error) {
        errMsg("Oops could not add data")
        setLoading(false)
        setImageUrl(null)
    }


}

export const handleUpload = async (filename, setLoading, imageLocation, setProgress, setMsg, errMsg, setImageUrl) => {
    // get file name from file
    setLoading(true)
    const storage = getStorage();
    const storageRef = ref(storage, fileLocation+filename);
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
            updateLogo(filename, downloadURL, setMsg, errMsg, setLoading, setImageUrl, setProgress);
        });
        setLoading(false)
    });

}

export const delData = async (id, filename, errMsg, setMsg, setLoading,setImage,imageData) => {
    setLoading(true)
    try {
        const del = doc(db, TableName, id)
        await deleteDoc(del)
        const storage = getStorage();
        // Create a reference to the file to delete
        const desertRef = ref(storage, fileLocation+filename);
        // Delete the file
        deleteObject(desertRef).then(() => {
            // File deleted successfully 
            setMsg("File deleted successfully ")
            
            setImage(imageData.filter(x=>x.id !== id))
        }).catch((error) => {
            // Uh-oh, an error occurred!
            errMsg("Uh-oh, an error occurred!")
        });
        setLoading(false)
    } catch (error) {
        console.log(error)
        errMsg('Could not Delete Cover Image')
        setLoading(false)
    }

}


export async function fetchLogo(setImage, setLoading, setAdd, errMsg) {
    setLoading(true)
    try {
        const q = query(collection(db, TableName));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const mainData = [];
            querySnapshot.forEach((doc) => {
                mainData.push({ id: doc.id, ...doc.data() })
                console.log(mainData)
            });
            if (mainData.length > 0) {
                setImage(mainData)
                setLoading(false)
            } else {
                setLoading(false)
                setAdd(true)
            }
        });
    } catch (error) {
        errMsg(error)
        setLoading(false)
    }


}

