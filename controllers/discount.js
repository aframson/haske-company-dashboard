import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { doc, updateDoc, deleteDoc, addDoc, collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import db from "../firebase";


const TableName = "discount"
const fileLocation = 'discounts/'

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


const addDiscounts = async (title, description, filename, status, products, downloadURL, setMsg, errMsg, setLoading, setProgress) => {
    setLoading(true)
    try {
        const docRef = await addDoc(collection(db, TableName), {
            filename,
            image: downloadURL,
            title,
            description,
            status,
            products
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

export const handleUpload = async (title, description, filename, status, products, setLoading, imageLocation, setProgress, setMsg, errMsg) => {
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
            affectAllProduct(title, description, uniquename, status, products, downloadURL, setMsg, errMsg, setLoading, setProgress);
        });
        setLoading(false)
    });

}


async function affectAllProduct(title, description, filename, status, products, downloadURL, setMsg, errMsg, setLoading, setProgress) {
    for (let x = 0; x < products.length; x++) {
        const discount = products[x].discount;
        const productId = products[x].id
        try {
            const q = doc(db, "Products", productId);
            await updateDoc(q, {
                discount: discount,
            })
        } catch (error) {
            errMsg("Data could not update")
            console.log(error)
            setLoading(false)
            setProgress(0)
        }
    }
    addDiscounts(title, description, filename, status, products, downloadURL, setMsg, errMsg, setLoading, setProgress);
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



export const deleteDiscount = async (did, discounts, setDiscounts, setLoading, setMsg, errMsg) => {
    setLoading(true)
    let data = discounts.filter(x => x.id !== did)
    try {
        const q = doc(db, "Products", did);
        await updateDoc(q, {
            discount: 0,
        })
        setMsg("Discount deleted successfully ")
        setDiscounts(data)
        setLoading(false)
    } catch (error) {
        errMsg("Data could not update")
        console.log(error)
        setLoading(false)
    }
}

export async function updateaffectAllProduct(id, data, oldproducts, setLoading, setMsg, errMsg, setProgress) {
    setLoading(true)
    let products = data.products
    if (oldproducts === products.length) {
        Update(id, data, setLoading, setMsg, errMsg, setProgress);
    } else {
        for (let x = 0; x < products.length; x++) {
            const discount = products[x].discount;
            const productId = products[x].id
            try {
                const q = doc(db, "Products", productId);
                await updateDoc(q, {
                    discount: discount,
                })
            } catch (error) {
                errMsg("Data could not update")
                console.log(error)
                setLoading(false)
                setProgress(0)
            }
        }
        Update(id, data, setLoading, setMsg, errMsg, setProgress);
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

export const delData = async (id, filename,products, errMsg, setMsg, setLoading, setDiscount, discountData) => {
    setLoading(true)
    
    for (let x = 0; x < products.length; x++) {
        const productId = products[x].id
        try {
            const q = doc(db, "Products", productId);
            await updateDoc(q, {
                discount: 0,
            })
        } catch (error) {
            errMsg("Data could not Deleted")
            console.log(error)
            setLoading(false)
            setProgress(0)
        }
    }
    
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
            setDiscount(discountData.filter(x => x.id !== id))
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


export async function fetchDiscounts(setCollection, setLoading, setAdd, errMsg, setIsProduct, setLoad, type) {
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



export async function fetchDiscountById(id, setImageUrl, setLoading, errMsg) {
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