  export type chat={
    idAccount:string,
    idContacts:string,
    account:account,
    messages:message[],
    contact:contact
  }
  
  export type contact={
    idCompany:string,
    company?:string,
    chat?:chat,
    name:string,
    account:string,
    identity:string,
    accountName:string
  }
  export type message={
    idChats:string,
    from:string,
    to:string,
    text:string,  
    time:Date,
    status:string
  }
  export type account={
    idCompany:string,
    type:string,
    token_authorization:string,
    id_page:string,
    token_webhook:string,
    webhook_path:string,
    chat?:string,
    company?: string,
    status:boolean
  }

  type chatProps={
    type: string,
    status:boolean,
    msgs:any[]
  }
  export type props={
    company?:string,
    contacts?:contact[],
    chats?:chatProps[],
    message?:any
  }
  