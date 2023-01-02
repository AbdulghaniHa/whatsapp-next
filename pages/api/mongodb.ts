// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { validLogin } from "../../components/query"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
    ) {    
    if (req.method === "POST") {
        const body = JSON.parse(req.body) 

        if(await validLogin(body.username, body.password)) {
            
            res.status(200).json({ login: true })
        }
        else {
            res.status(200).json({ login: false })
        }
    }
    // res.status(200).json({ login: false })
  }
  