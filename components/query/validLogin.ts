import React from 'react'

const ValidLogin = async (username: string, password: string) => {
    const req = await fetch(`https://data.mongodb-api.com/app/data-mnieb/endpoint/data/v1/action/findOne`, {
        method: "POST",
        headers: {
          "api-key": "GLiGibvg36w2Fcajl3OdKENEMWeCtXL2UtOgAs4evfz5o9kLRSTZWISJCLuuAMFf"
        },
        body: JSON.stringify({
            "collection":"Users",
            "database":"Whatsapp",
            "dataSource":"Cluster0",
            "filter": {
                "name": username,
                "password": password
            }
        })
    })

    const data = await req.json()
    console.log(username, password)
    if (data.document) {
       return true
    }
    else {
        return false
    }
}

export default ValidLogin