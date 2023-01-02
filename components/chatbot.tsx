import React, { Children, useEffect } from "react";
import { useState } from "react";

function Chatbot() {
  const [tree, setTree] = useState([
    {
        "id": "0",
        "text": "initial question",
        "options": [
            {"res": "you have chosen juice", "option": "Juice", children: [""]},
            {"res": "you have chosen food", "option": "Food", children: [""]}
        ]
    }
  ])

  function handeladding() {
    setTree([
        ...tree, {
            "id": (tree.length).toString(),
            "text": "Text !",
            "options": [
                {"res": "you have chosen bla bla", "option": "Bla Bla", children: [""]}
            ]
        }
    ])
  }

  function handelAddingIndex(arrayId: number, obj: any) {
    console.log(obj)
    console.log("arrayId", arrayId)
    let value = tree.map((i, index) => {
        if (i.id === arrayId.toString()){
            return {
                id: i.id,
                text: i.text,
                options: i.options.map((j, jindex) => {
                    if (j.option === obj.option){
                        return {"res": obj.res, "option": obj.option, children: [...j.children,"Index"]}
                    }
                    return j
                })
            }

        }
        return i
    })
    console.log(value)
    setTree(value)
  }

  function handeldeleting(arrayIndex: number) {
    let array = tree.filter((i, index) => {
        if (index !== arrayIndex) return i;
    })
    array = array.map((i, index) => {
        return {
            id: index.toString(),
            text: i.text,
            options: i.options
        }
    })
    setTree(array)
  }

  function Log() {
    console.log(tree)
  }
  useEffect(() => {
    console.log(tree)
  }, tree)

  return (
    <div className="text-black-800 bg-white">

      <div className="bg-blue-500 text-white p-auto w-8 cursor-pointer" onClick={handeladding}>Add</div>
      <div className="bg-red-500 text-white p-auto w-auto cursor-pointer" onClick={() =>handeldeleting(0)}>Delete</div>
      <div className="bg-red-500 text-white p-auto w-auto cursor-pointer" onClick={Log}>Print</div>
      
      <div className="bg-red-500 text-white p-auto w-auto cursor-pointer" >Custom index</div>

      <div className="ml-4">
        {
            tree.map((i, index) => (
                <div>
                    <div className="cursor-pointer font-bold" onClick={()=>handeldeleting(index)}>{i.text}</div>
                    {i.options.map((j) => (
                        <>
                            <li className="cursor-pointer" onClick={() => handelAddingIndex(index, j)}>{j.option}</li>
                            <li className="text-gray-500">{j.res}</li>
                            <div className="text-transparent">.</div>
                            {j.children.map((k) => (
                                <div className="text-blue-600">{k}</div>
                            ))}
                        </>
                    ))}
                </div>
            ))
        }
      </div>
      {/* will show the options */}
    </div>
  );
}

export default Chatbot;
