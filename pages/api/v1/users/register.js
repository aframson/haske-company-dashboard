import { collection, addDoc } from "firebase/firestore";
import db from "../../../../firebase";
import { USER_TABLE } from "../../../../shema";


const TABLE_NAME = 'users'


export default async function handler(req, res) {
    const { metadata, telephone ,name } = req.body;
    if (req.method === 'POST') {
        try {
            const docRef = await addDoc(collection(db, TABLE_NAME),
                USER_TABLE(metadata, telephone,name))
            res.status(200).send({ status: true, message: "User Created Successfullyr" })
        } catch (error) {
            res.status(404).send({ status: false, message: 'Unable to create User' });
        }
    } else {
        res.status(404).send('Unexpected Request Method')
    }
}
