import { NextRequest, NextResponse } from "next/server"
import {AuthGetCurrentUserServer, cookiesClient } from "../../../../utils/server-utils"
import { DataCountry } from "../../../../utils/country"



export async function POST(request: NextRequest) {
    try{
    const {user,token,plan,userID} = await request.json()

    if(!user){
        NextResponse.json({msj:"Error usuario no encontrado "})
        return NextResponse.redirect("http://localhost:3000/login")
    }
    if(!token){
        NextResponse.json({msj:"Error token no encontrado, por favor agrega tu metodo de pago"})
        return NextResponse.redirect("http://localhost:3000/checkout",{status:200})
    }
    const listCompany= await cookiesClient.models.Company.list({filter:{
        name:{beginsWith:user["custom:company"]}
    }})


    const company = listCompany.data.length> 0 ?
        listCompany.data[0]
     :
        (await cookiesClient.models.Company.create({name:user["custom:company"]})).data;



    if (!company){
    throw new Error("Error al crear la compañia");  
    }

    const listProfile= await cookiesClient.models.Profile.list({filter:{
        user:{beginsWith:userID}
    }})

    if(!(listProfile.data.length > 0)){

        const profile = await cookiesClient.models.Profile.create({user:userID,company:company.id,country:user["custom:country"],name:user.name})

    
        if(profile.errors){
            throw new Error("Error al crear la perfil");  
        }
    }
    
   

    const cliente = await fetch("https://api.culqi.com/v2/customers", {
        method:"POST",
        headers: {
        Authorization: `Bearer ${process.env.TOKEN_PRIV_CULQI}`,
        'content-type': 'application/json'
        },
        body: JSON.stringify( {
            address: "dirección",
            address_city: user['custom:country'],
            country_code: DataCountry.filter((e)=>e.country.toLowerCase()=== user["custom:country"]?.toLowerCase() )[0].code || "58",
            email: user.email,
            first_name: user.name?.split(" ")[0],
            last_name: user.name?.split(" ")[user.name?.split(" ").length-1],
            phone_number: user.phone_number,
            metadata: {rol: 'ADMIN'}
        })
    })


    if (cliente.status !== 201) {
        throw new Error("Error al crear cliente");  
    }
  
    const res = await cliente.json()

    

    const card = await fetch("https://api.culqi.com/v2/cards", {
        method:"POST",
        headers: {
        Authorization: `Bearer ${process.env.TOKEN_PRIV_CULQI}`,
        'content-type': 'application/json'
        },
        body: JSON.stringify( {
            customer_id: res.id,
            token_id: token.id,
            validate: true,        
            metadata: {
                marca_tarjeta: token.iin.card_brand
            }
        })
    })
    
    if (card.status !== 201) {
        throw new Error("Error al crear tarjeta");  
    }

    const resCard = await card.json()

    const susUser = await fetch("https://api.culqi.com/v2/recurrent/subscriptions/create", {
        method:"POST",
        headers: {
        Authorization: `Bearer ${process.env.TOKEN_PRIV_CULQI}`,
        'content-type': 'application/json'
        },
        body: JSON.stringify(  {
            card_id: resCard.id,
            plan_id: plan === "BASICO"? "pln_test_o8yEAGoG0Yq04xAU":"pln_test_mAlc272T6niLEVWn",
            tyc: true,
            metadata: {
                CLIENTE:res.id
            }
          })
    })
    
    if (susUser.status !== 201) {
        throw new Error("Error al crear suscripcion");  
    }
    const resSus = await susUser.json()

    const suscription = await fetch(`https://api.culqi.com/v2/recurrent/subscriptions/${resSus.id}`, {
        method:"GET",
        headers: {
        Authorization: `Bearer ${process.env.TOKEN_PRIV_CULQI}`,
        'content-type': 'application/json'
        }
    })

    const Suscription = await suscription.json();

    const DBsus = await cookiesClient.models.Suscription.list({filter:{
        idCompany:{
            contains:company.id
        }
    }})

    if(DBsus.data.length > 0 ){
        await cookiesClient.models.Suscription.update({idCompany:company.id,...Suscription})
        return NextResponse.redirect("http://localhost:3000/dashboard",{status:200})
    }

    await cookiesClient.models.Suscription.create({idCompany:company.id,...Suscription})

    return NextResponse.redirect("http://localhost:3000/dashboard",{status:201})
    
    }catch (error:any){
        return NextResponse.json({res:"Error de servidor",error:error?.message},{status:500})
    }
 

    
    
}