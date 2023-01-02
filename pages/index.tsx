import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Router, { useRouter } from "next/router";
import { useState, useEffect } from "react";
import QRCode from 'react-qr-code'
import { io } from "socket.io-client";
import BlockButton from "../components/blockButton";
import Chatbot from "../components/chatbot";

const handelValidLogin = () => {
  const token = sessionStorage.getItem("token");

  console.log(token);
  if (token) {
    // check if token is valid
    console.log("checking if token is valid");
    return false;
  }
  return true;
};

const Home: NextPage = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [qr, setQr] = useState("");
  const [activeText, setActiveText] = useState("");
  const [textOne, setTextOne] = useState("");
  const [textTwo, setTextTwo] = useState("");
  const [textThree, setTextThree] = useState("");

  const [selectedField, setSelectedField] = useState("F1");


  const BACKEND_SERVER = "http://localhost:5000"
  const socket = io(BACKEND_SERVER);
  
  useEffect(() => {

    socket.on("connect", () => {
      console.log(socket.id);
      socket.emit("login", "client_id")


      socket.on("qr_frontendSide", (qr) => {
        console.log(qr)
        setQr(qr)
      })

      socket.on("board_statusFrontside", (status) => {
        console.log("status:", status)
      })
      
      socket.on("get_all_contact_fe", (data) => {
        console.log("all contacts:", data)
      })

    });

  }, []);


  useEffect(() => {
    handelValidLogin() ? router.push("/login") : setShow(true);
  }, []);

  useEffect(() => {
    console.log(activeText)
  }, [activeText])

  useEffect(() => {
    // fetch active text from localstorage
    setTextOne(localStorage.getItem("F1") || "")
    setTextTwo(localStorage.getItem("F2") || "")
    setTextThree(localStorage.getItem("F3") || "")

  }, [])
  return <>{true ? 

    <div className="bg-black-700 h-screen relative pt-20">
        <div className="grid grid-cols-2 place-items-center gap-4">
          { qr && <div className="p-9 bg-white"> <QRCode value={qr} /> </div>}

          <div className="text-white border-2 border-white rounded-lg">
            <h1 className="font-bold text-center py-2 border-b-2 border-white text-xl">Brodcast</h1>
            <div className="grid place-content-center">
              <div className="flex">
                <button className={`text-white border-2 py-1 px-3 m-2 rounded-md ${selectedField === "F1"? "bg-custom-green-700 border-custom-green-700" : ""}`} onClick={() => setSelectedField("F1")}>1</button>
                <button className={`text-white border-2 py-1 px-3 m-2 rounded-md ${selectedField === "F2"? "bg-custom-green-700 border-custom-green-700" : ""}`} onClick={() => setSelectedField("F2")}>2</button>
                <button className={`text-white border-2 py-1 px-3 m-2 rounded-md ${selectedField === "F3"? "bg-custom-green-700 border-custom-green-700" : ""}`} onClick={() => setSelectedField("F3")}>3</button>
              </div>
            </div>

            <div className="px-2 py-6">
              <textarea className={`${selectedField === "F1"? "block" : "hidden"} outline-none p-3 rounded-lg text-lg text-black-800`} name="Text1" cols={30} rows={5} value={textOne} onChange={(text) => {setTextOne(text.currentTarget.value)}}></textarea>
              <textarea className={`${selectedField === "F2"? "block" : "hidden"} outline-none p-3 rounded-lg text-lg text-black-800`} name="Text2" cols={30} rows={5} value={textTwo} onChange={(text) => {setTextTwo(text.currentTarget.value)}}></textarea>
              <textarea className={`${selectedField === "F3"? "block" : "hidden"} outline-none p-3 rounded-lg text-lg text-black-800`} name="Text3" cols={30} rows={5} value={textThree} onChange={(text) => {setTextThree(text.currentTarget.value)}}></textarea>
            </div>

            <div className="px-2">
              - Delay <input className="bg-black-700 outline-none w-4 font-bold" type="text" defaultValue={"2"} />mins
            </div>

            <div className="grid mx-auto">
              <button className="text-center border-2 px-4 py-2 m-2 rounded-md" onClick={() => {
                if (selectedField === "F1") localStorage.setItem(selectedField, textOne)
                else if (selectedField === "F2") localStorage.setItem(selectedField, textTwo)
                else localStorage.setItem(selectedField, textThree)
              }}>Save</button>

              <button className="text-center border-2 px-4 py-2 m-2 rounded-md" onClick={() => {
                socket.emit("send_bulk_messages")
              }}>Start Sending</button>
            </div>
          </div>
          
            <div className="text-white place-self-start row-span-2 border-2 border-white">
              Write a chatbot tree

              <Chatbot />
            </div>
          
          
          <BlockButton title="Get Contacts" inverseColor={false} onClick={() => socket.emit("get_all_contact")}/>

          <div className="bottom-0 left-0 absolute text-white p-4 rounded-lg font-bold bg-gray-800 m-2">
            <div className="cursor-pointer">Logout</div>
            <div className="">Signed in as: +966 532450689</div>
          </div>
        </div>
    </div> 

  : <div className="bg-black-700 h-screen"></div>}
  </>;
};

export default Home;
