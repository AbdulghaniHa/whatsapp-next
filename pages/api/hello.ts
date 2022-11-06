// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const fs = require('fs');
const qrcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
  authStrategy: new LocalAuth({ clientId: "client-one" })
});


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
  ) {
    
    client.on('qr', (qr: any)  => {
      qrcode.generate(qr, {small: true});
      // sends a socket to connect
    });

  client.on('authenticated', (session: any) => {

    // console.log("clientId:", client)
    console.log('Authentacation Done.')
  });


client.on('ready', (e: any) => {
  console.log('Client is ready!');
  console.log(e)
  // client.getChats()
});


client.on('message', (message: any) => {
  console.log('Message!');
  console.log(message)
  // client.getChats()
});


client.initialize();

    
  res.status(200).json({ name: 'connection started' })
}
