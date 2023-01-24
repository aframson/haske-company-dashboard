import { collection, addDoc,onSnapshot ,query,where} from "firebase/firestore";
import db from "../../../../firebase";
import { USER_TABLE } from "../../../../shema";


const TABLE_NAME = 'users'


export default async function handler(req, res) {
    const { uid } = req.body;

    if (req.method === 'POST') {
        try {
            const q = query(collection(db, TABLE_NAME), where("uid", "==", uid));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const mainData = [];
                querySnapshot.forEach((doc) => {
                    mainData.push({ id: doc.id, ...doc.data() })
                });
                if (mainData.length > 0) {
                    res.status(200).json(mainData)
                } else {
                    res.status(400).send({message:"user does not exists",status:false})
                }
            });

        } catch (error) {
            res.status(404).send(error)
        }
    } else {
        res.status(404).send('Unexpected Request Method')
    }
}
