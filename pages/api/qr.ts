// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const client = new Client();


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await client.on('', (qr :any) => {
    console.log('QR RECEIVED', qr);
    // qrcode.generate(qr, {small: true});
    
    res.status(200).json({ name: qr })
  });
}
