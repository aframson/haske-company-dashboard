import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { doc, updateDoc, deleteDoc, addDoc, collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import db from "../firebase";

const TableName = "Products"


const randomString = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}


const random = () => {
    return Math.random().toString(36).substring(2, 15) 
}




export const chooseImage = (file, setImageUrl, setImageLocation, errMsg) => {

    if (file.length > 3) {
        errMsg("files should not be more than 3")
    } else {
        for (let x = 0; x < file.length; x++) {
            const single = file[x];
            console.log('file', single.name)
            let value = URL.createObjectURL(single);
            setImageUrl(prev => [...prev, value]);
        }
        setImageLocation(file)
    }

}



export const chooseImageWhenUpdated = (file, imageurl, setLoading, setProgress, setMsg, errMsg, id) => {
    if (file.length > 3) {
        errMsg("Images should not more than 3")
    } else {
        setLoading(true)
        const promises = []
        const images = [];
        imageurl.map(items => {
            images.push(items)
        })
        for (let x = 0; x < file.length; x++) {
            const mainfile = file[x];
            const uniquename = random() + mainfile.name
            console.log('file', mainfile.name)
            console.log('loop');
            const storage = getStorage();
            const sotrageRef = ref(storage,uniquename);
            const uploadTask = uploadBytesResumable(sotrageRef, mainfile);
            promises.push(uploadTask)
            uploadTask.on("state_changed", (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progress)
            }, (error) => console.log(error), async () => {
                await getDownloadURL(uploadTask.snapshot.ref).then((downloadURLs) => {
                    images.push(downloadURLs);
                    console.log("File available at", downloadURLs);
                    if (images.length >= file.length) {
                        console.log('Now its ready ++++')
                        console.log("new images ===", images);
                        UpdateImage(id, images, setLoading, setMsg, errMsg, setProgress)
                    }
                });
            }
            );
        }
        Promise.all(promises).then(() => { console.log('promises:', promises) }).then(err => console.log(err))
    }

}






const addProduct = async (exportData, setMsg, errMsg, setLoading, setProgress) => {
    setLoading(true)
    try {
        const docRef = await addDoc(collection(db, TableName), exportData);
        setMsg("Products Added sucessfully")
        setProgress(0)
        console.log("Document written with ID: ", docRef.id);
        setLoading(false)
    } catch (error) {
        errMsg("Oops could not add data", error)
        setLoading(false)
        setImageUrl([])
    }


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



export async function UpdateImage(id, image, setLoading, setMsg, errMsg, setProgress) {
    setLoading(true)
    try {
        const q = doc(db, TableName, id);
        await updateDoc(q, {
            "images": image,
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


export const handleUpload = (title, description, pricing, comparePrice, cpp, sku, barCode, numberAvailable, status, weight, customsInfo, country, hs, optionData, keywordData, setLoading, imageLocation, setProgress, setMsg, errMsg) => {
    setLoading(true)
    const promises = []
    const images = [];
    for (let x = 0; x < imageLocation.length; x++) {
        const file = imageLocation[x];
        console.log('loop');
        const storage = getStorage();
        const uniquename = random() + file.name

        const sotrageRef = ref(storage, uniquename);
        const uploadTask = uploadBytesResumable(sotrageRef, file);
        promises.push(uploadTask)
        uploadTask.on("state_changed", (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(progress)
        }, (error) => console.log(error), async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then((downloadURLs) => {
                images.push(downloadURLs);
                console.log("File available at", downloadURLs);
                console.log("images ===", images);
                if (images.length === imageLocation.length) {
                    console.log('Now its ready ++++')
                    console.log("new images ===", images);
                    const exportData = {
                        discount:0,
                        info: {
                            title: title,
                            description: description
                        },
                        images: images,
                        pricing: {
                            price: pricing,
                            comparePrice: comparePrice,
                            cpp: cpp
                        },
                        inventory: {
                            sku: sku,
                            barCode: barCode,
                            numberAvailable: numberAvailable
                        },
                        status: status,
                        shipping: {
                            weight: weight,
                            customsInfo: customsInfo,
                            country: country,
                            hs: hs
                        },
                        options: optionData,
                        keywords: keywordData
                    }
                    addProduct(exportData, setMsg, errMsg, setLoading, setProgress);
                }
            });
        }
        );
    }
    Promise.all(promises)
        .then(() => {
            console.log('promises:', promises)
        })
        .then(err => console.log(err))

};

export const delImageData = async (id, image, imageurl, errMsg, setMsg, setImageDeleteLoading) => {
    setImageDeleteLoading(true)
    try {
        const del = doc(db, TableName, id)
        let imageRest = imageurl.filter(images => images !== image)
        setImageDeleteLoading(true)

        const storage = getStorage();
        // // Create a reference to the file to delete
        const desertRef = ref(storage, image);
        // // Delete the file
        deleteObject(desertRef).then(async () => {
            // File deleted successfully 
            setMsg("File deleted successfully ")
            await updateDoc(del, {
                "images": imageRest
            })
            setImageDeleteLoading(false)
        }).catch((error) => {
            // Uh-oh, an error occurred!
            errMsg("Uh-oh, an error occurred!")
            setImageDeleteLoading(false)
        });
        setImageDeleteLoading(false)
    } catch (error) {
        console.log(error)
        errMsg('Could not Delete image')
        setImageDeleteLoading(false)
    }

}


export const delData = async (id, images, errMsg, setMsg, setLoading, setProductData, productData) => {
    setLoading(true)
    try {
        const del = doc(db, TableName, id)
        const storage = getStorage();
        // Create a reference to the file to delete
        for (let x = 0; x < images.length; x++) {
            const image = images[x];
            const desertRef = ref(storage, image);
            // Delete the file
            deleteObject(desertRef).then(async () => {
                // File deleted successfully 
                await deleteDoc(del)
                setMsg("File deleted successfully ")
                setProductData(productData.filter(f => f.id !== id))
            }).catch((error) => {
                // Uh-oh, an error occurred!
                errMsg("Uh-oh, an error occurred!")
            });
        }

        setLoading(false)
    } catch (error) {
        console.log(error)
        errMsg('Could not Delete Logo')
        setLoading(false)
    }

}



export async function fetchProducts(setProductData, setLoading, errMsg, setIsProduct, setLoad, type) {
    setLoading(true)
    setLoad(true)
    try {

        const q = query(collection(db, TableName), where("status", "==", type));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const mainData = [];
            querySnapshot.forEach((doc) => {
                mainData.push({ id: doc.id, ...doc.data() })
                // console.log('products:', mainData)
            });
            if (mainData.length > 0) {
                setProductData(mainData)
                setLoading(false)
                setLoad(false)
                setIsProduct(true)
            } else {
                setLoading(false)
                setLoad(false)
                setIsProduct(false)
            }
        });
    } catch (error) {
        errMsg(error)
        setLoading(false)
    }


}


export async function fetchDiscountedProducts(setProductData, setLoading, errMsg, setIsProduct, setLoad) {
    setLoading(true)
    setLoad(true)
    try {
        const q = query(collection(db, TableName), where("discount", "<", 1));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const mainData = [];
            querySnapshot.forEach((doc) => {
                mainData.push({ id: doc.id, ...doc.data() })
                // console.log('products:', mainData)
            });
            if (mainData.length > 0) {
                setProductData(mainData)
                setLoading(false)
                setLoad(false)
                setIsProduct(true)
            } else {
                setLoading(false)
                setLoad(false)
                setIsProduct(false)
            }
        });
    } catch (error) {
        errMsg(error)
        setLoading(false)
    }


}



export async function fetchProductsById(id, setImageUrl, setLoading, errMsg) {
    setLoading(true)
    try {
        const unsub = onSnapshot(doc(db, TableName, id), (doc) => {
            setImageUrl(doc.data() && doc.data().images)
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

