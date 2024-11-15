import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Company: a.model({
    name:a.string().required(),
    accounts: a.hasMany('Accounts', 'idCompany'),
    admins: a.hasMany('Admins', 'idCompany'),
    agents: a.hasMany('Agents', 'idCompany'),
    bot:a.hasOne("Bot","idCompany"),
    contacts:a.hasMany("Contacts","idCompany"),
    suscription:a.hasOne("Suscription","idCompany")
  }).authorization((allow) => [allow.publicApiKey()]),

  Profile:a.model({
    user:a.string(),
    company:a.string(),
    country:a.string(),
    name:a.string(),
    rol:a.string()
  }).authorization((allow) => [allow.publicApiKey()]),

  Admins: a.model({
    idCompany:a.id(),
    user:a.string(),
    status:a.boolean(),
    company: a.belongsTo('Company', 'idCompany'),
  }).authorization((allow) => [allow.publicApiKey()]),

  Agents: a.model({
    idCompany:a.id(),
    user:a.string(),
    status:a.boolean(),
    company: a.belongsTo('Company', 'idCompany'),
  }).authorization((allow) => [allow.publicApiKey()]),

  Chats:a.model({
    idContacts:a.id(),
    messages:a.hasMany("Message","idChats"),
    contact:a.belongsTo("Contacts","idContacts")
  }).authorization((allow) => [allow.publicApiKey()]),

  Accounts:a.model({
    idCompany:a.id(),
    type:a.string(),
    token_authorization:a.string(),
    id_page:a.string(),
    token_webhook:a.string(),
    webhook_path:a.string(),
    contacts:a.hasMany("Contacts", "idAccount"),
    company: a.belongsTo("Company", 'idCompany'),
    status:a.boolean()
  }).authorization((allow) => [allow.publicApiKey()]),
  
  Message: a.model({
    idChats:a.id(),
    chats:a.belongsTo("Chats","idChats"),
    text:a.string(),
    from:a.string(),
    to:a.string(),
    time:a.string(),
    status:a.string().default("NV")
  }).authorization((allow) => [allow.publicApiKey()]),

  Contacts:a.model({
    idCompany:a.id(),
    company:a.belongsTo("Company","idCompany"),
    idAccount:a.id(),
    account:a.belongsTo("Accounts","idAccount"),
    chat:a.hasOne('Chats', 'idContacts'),
    name:a.string(),
    identity:a.string(),
    accountName:a.string()
    
  }).authorization((allow) => [allow.publicApiKey()]),

  Bot:a.model({
    status: a.boolean(),
    idCompany:a.id(),
    company:a.belongsTo("Company","idCompany"),
    msjBot: a.hasMany("MsjBot","idBot")

  }).authorization((allow) => [allow.publicApiKey()]),

  MsjBot:a.model({
    idBot:a.id(),
    bot:a.belongsTo("Bot","idBot"),
    answer:a.string(),
    question:a.string()

  }).authorization((allow) => [allow.publicApiKey()]),

  Suscription: a.model({
      idCompany:a.id(),
      company:a.belongsTo("Company", "idCompany"),
      idSus: a.string(),
      status: a.string(),
      creation_date: a.string(),
      next_billing_date: a.string(),
      current_period: a.string(),
      trial_start: a.string(),
      trial_end: a.string(),
      active_card: a.string(),
      plan: a.string(),
      customer: a.string()
    }
  ).authorization((allow) => [allow.publicApiKey()])   
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
