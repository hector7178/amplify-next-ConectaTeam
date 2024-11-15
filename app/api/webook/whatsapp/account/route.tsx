import { NextRequest, NextResponse } from "next/server"
import { cookiesClient } from "../../../../../utils/server-utils"
import { NextApiRequest, NextApiResponse } from "next"

type Entry={
      id: string,
      changes: [
        {
          value: {
            messaging_product: string,
            metadata: {
              display_phone_number: string
            },
            contacts: [
              {
                wa_id: string
              }
            ],
            messages: [
              {
                from: string,
                id: string,
                timestamp: string,
                type: string,
                text: {
                  body: string
                }
              }
            ]
          },
          field: string
        }
      ]
}

export async function GET(req: NextRequest, res:NextResponse){
  const queryParams=req.nextUrl.searchParams
console.log("queryy", queryParams.entries())
  
  const dataAccounts= await cookiesClient.models.Accounts.list({filter:{
    type:{
      beginsWith:"whatsapp"
    }
  }})
  const VERIFY_TOKEN = process.env.TOKEN_SECRET

  const mode = queryParams.get("hub.mode")
  const token = queryParams.get("hub.verify_token")
  const challenge = queryParams.get("hub.challenge")

  // Comprobar que el modo y el token son válidos
  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      // Devolver el challenge
      console.log("WEBHOOK_VERIFIED");
      return new Response(`${challenge}`, {
        status: 200,
      })
  
    } else {
      // Devolver un código 403 Forbidden
      console.log("no WEBHOOK_VERIFIED");
      return NextResponse.json({msj:"Token no verificado"},{status:402})
    }
  }else{
    return NextResponse.json({msj:"Error"}, {status:500})
  }

}


export async function POST(req: NextRequest,res:NextApiResponse){
  let body = await req.json();
  console.log("bodyyyy",body)
  return new Response(`Evento recibido`, {
    status: 200,
  })
}

