// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');

// const client = new Client({
//   puppeteer: { headless: true },
//   authStrategy: new LocalAuth({ clientId: "client_1" }),
// });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  ) {
  const client = new Client();
  const QR = async () => await client.on('qr', (qr :any) => {
    console.log('QR RECEIVED', qr);
    // qrcode.generate(qr, {small: true});
    
    res.status(200).json({ name: qr })
  });
  QR();
  // res.status(200).json({ name: "qr" })
}
