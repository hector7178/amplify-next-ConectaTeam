import { defineAuth } from "@aws-amplify/backend";

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailStyle: "CODE",
      verificationEmailSubject: "BiENVENIDO A CONECTATEAM!",
      verificationEmailBody: (createCode) => `Este es el codigo para verificar tu cuenta:\n \n ${createCode()}`,
      userInvitation: {
           emailSubject: "Bienvenido a conectaTeam!",
      emailBody: (user, code) =>
             `Estamos felices que formes parte de nosotros, ya puedes iniciar sesión:\n\n usuario: ${user()} \n contraseña: ${code()}`, 
          },
     },
  },
  userAttributes: {
    preferredUsername: {
      mutable: true,
      required: false
    },
    birthdate: {
      mutable: true,
      required: false,
    },
    nickname:{
      mutable: true,
      required: true,
    },
    phoneNumber:{
      mutable: true,
      required: true,
    },
    "custom:rol":{
      dataType: "String",
      mutable: true,
      maxLen: 16,
      minLen: 1,
    },
    "custom:company":{
      dataType:"String",
      mutable:true,
      maxLen:16,
      minLen:1
    },
    "custom:country":{
      dataType:"String",
      mutable:true,
      maxLen:16,
      minLen:1
    },

  },

  groups: ["ADMINS", "USERS"]
});
