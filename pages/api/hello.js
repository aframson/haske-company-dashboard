//  Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import runMiddleware from "./middleware"
import Cors from 'cors'



const cors = Cors({
  methods: ['GET','HEAD','PUT', 'PATCH', 'POST', 'DELETE'],
  origin: ['https://example.com']
})



export default async function handler(req, res) {
  await runMiddleware(req, res, cors)
  res.status(200).json({ name: 'John Doe' })

}
