import React, { useState, useEffect } from 'react'
import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel
} from 'react-accessible-accordion';
import { MdRadioButtonUnchecked, MdRadioButtonChecked } from "react-icons/md";
import styles from '../styles/Settings.module.css'
import ReactLoading from 'react-loading';
import { useToasts } from 'react-toast-notifications'
import { chooseImage, handleUpload, fetchLogo, delData } from '../controllers/logo'
import { FileUploader } from "react-drag-drop-files";
import Image from 'next/image';
import { RiDeleteBin6Line } from 'react-icons/ri'


function Logo() {

    const [imageData, setImage] = useState([])
    const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];
    const [filename, setFilename] = useState('')
    const [imageurl, setImageUrl] = useState(null)
    const [imageLocation, setImageLocation] = useState('')
    const [Progress, setProgress] = useState(0)
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState('')
    const [loading2, setLoading2] = useState(false)
    const [add, setAdd] = useState(false)
    const [error, errMsg] = useState('')

    const { addToast } = useToasts()




    useEffect(() => {
        if (msg !== '') {
            addToast(msg, { appearance: 'success', autoDismiss: true, })
        }
    }, [msg, addToast])

    useEffect(() => {
        if (error !== '') {
            addToast(error, { appearance: 'warning', autoDismiss: true, })
        }
    }, [error, addToast])

    const Addfunc = () => {
        if (filename === '' || imageLocation === '') {
            addToast("Fields must not be empty", { appearance: 'warning', autoDismiss: true, })
        } else {
            handleUpload(filename, setLoading, imageLocation, setProgress, setMsg, errMsg, setImageUrl)
        }
    }


    useEffect(() => {
        fetchLogo(setImage, setLoading2, setAdd, errMsg)
    }, [setImage,imageData])


    return (
        <AccordionItem className={styles.flip}>
            <AccordionItemHeading>
                <AccordionItemButton>
                    <div className={styles.ques}>
                        {add ? <MdRadioButtonUnchecked size={20} color={'gray'} /> : <MdRadioButtonChecked size={20} color={'#33cc66'} />}
                        <div className={styles.questxt}>Logo </div>
                    </div>
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
                <div className={styles.cont}>
                    <div className={styles.title}>Add Logo</div>
                    <div className={styles.logobox}>
                        <div className={styles.sub}>
                            JPEG, PNG, or JPG. Recommended width: 512 pixels minimum and should be a sqaure.
                        </div>
                        {imageurl ? (
                            <div className={styles.imageboxx}>
                                {imageurl ? <Image blurDataURL={imageurl} src={imageurl} alt="product-image" placeholder='blur' height={100} width={100} className={styles.imagex} /> : null}
                            </div>
                        ) : null}

                        {imageData && imageData.length < 1 ? (
                            <>


                                <div className={styles.fileupload}>
                                    <FileUploader className={styles.fileupload} handleChange={(file) => chooseImage(file, setImageUrl, setFilename, setImageLocation)} name="file" types={fileTypes} />
                                </div>

                                <button style={{ marginLeft: 20, width: 'fit-content' }} onClick={() => Addfunc()} className={styles.tobutt}>
                                    {loading ? (
                                        <center>
                                            <ReactLoading color={'white'} height={30} width={30} />
                                        </center>
                                    ) : "Add Logo"}
                                </button>
                                <div className={styles.progrssbox}>
                                    <div style={{ width: Progress + '%' }} className={styles.progress}></div>
                                </div>
                            </>

                        ) : null}


                        <div className={styles.logocontainer}>

                            {imageData && imageData.length < 1 ? <div className={styles.tell}>No Logo Uploaded yet </div> : null}

                            {imageData && imageData.map((item, i) => (
                                <div key={i} className={styles.imagelogoboxcontainer}>
                                    <div className={styles.imagelogobebox}>
                                        <Image className={styles.logoimage} width={100} height={100} blurDataURL={item.image} src={item.image} placeholder="blur" alt="logo" />
                                    </div>
                                    <div className={styles.filename}>{item.filename}</div>
                                    <div onClick={() => delData(item.id, item.filename, errMsg, setMsg, setLoading, setImage,imageData)} className={styles.delbox}>
                                        {loading ? (
                                            <center>
                                                <ReactLoading color={'black'} height={30} width={30} />
                                            </center>
                                        ) : <RiDeleteBin6Line size={20} color="black" />}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </AccordionItemPanel>
        </AccordionItem>
    )
}

export default Logo