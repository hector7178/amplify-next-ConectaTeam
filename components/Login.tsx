// components/Login.tsx
"use client"

import { Authenticator, CheckboxField, TextField, useAuthenticator, withAuthenticator } from "@aws-amplify/ui-react";
import { AuthUser, confirmSignUp, signUp, SignUpInput} from "aws-amplify/auth";

import { I18n } from "aws-amplify/utils";
import { translations } from "@aws-amplify/ui-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { cookiesClient } from "../utils/server-utils";
import { useEffect } from "react";
import { redirect } from "next/navigation";

I18n.putVocabularies(translations);

function Login({ user }: { user?: AuthUser }) {
  const notifySuccess= () => toast('mensaje de exito.');

  I18n.setLanguage("es");
  I18n.putVocabularies({
    fr: {
      "Sign In": "Se connecter",
      "Sign Up": "S`inscrire",
    },
    es: {
      "Sign In": "Inicia sesión",
      "Sign Up": "Regístrate",
    },

  });
 

  const formFields = {
    signIn: {
      username: {
        label:"Correo",
        placeholder: "Introduce tu correo",
      },
    },
    signUp: {
      email:{
        order:2
      },
      birthdate:{
        label:"Fecha de nacimiento",
        placeholder: "Introduce tu fecha de nacimiento:",
        order:8
      },
      phone_number:{
        label:"Teléfono",
        placeholder: "Introduce tu numero de telefono:",
        order:7
      },
      password: {
        label: "Contraseña:",
        placeholder: "Introduce tu contraseña:",
        order: 3,
      },
      confirm_password: {
        label: "Repite la contrseña:",
        placeholder: "Introduce tu contraseña:",
        required:true,
        order: 4,
      },
      name:{
        label: "Nombre completo:",
        placeholder: "Introduce tu Nombre:",
        required:true,
        order: 1,
      },
      "custom:company":{
        label: "Compañia:",
        placeholder: "Introduce el nombre de tu compañia:",
        required:true,
        order: 5,
      },
      "custom:country":{
        label: "Pais:",
        placeholder: "Introduce tu pais:",
        required:true,
        order: 6,

      }

    },
    forceNewPassword: {
      password: {
        placeholder: "Introduce tu contrseña:",
      },
    },
    forgotPassword: {
      username: {
        label:"Correo",
        placeholder: "Introduce tu correo:",
      },
    },
    confirmResetPassword: {
      confirmation_code: {
        placeholder: "Introduce el codigo aqui:",
        label: "Codigo de confirmación",
      },
      confirm_password: {
        label:"Confirmación de contrseña",
        placeholder: "introduce tu contrseña:",
      },
    },
    confirmSignIn: {
      confirmation_code: {
        label: "Codigo de confirmación",
        placeholder: "introduce el codigo de confirmacion:",
      },
    },
  };
  const services = {
   
    async handleSignUp(input: SignUpInput) {
      // custom username and email
      const { username, password, options } = input;
      
      const customUsername = username.toLowerCase();
      const customEmail = options?.userAttributes?.email?.toLowerCase();
      const customname= options?.userAttributes?.name?.toLowerCase();
      const customPhone= options?.userAttributes?.phone_number;
      const customBirthdate =options?.userAttributes?.birthdate;
      const company =options?.userAttributes?.["custom:company"]||" -";
      const pais =options?.userAttributes?.["custom:country"]|| " -";
       return signUp({
        
        username: customUsername,
        password,
        options: {
          ...input.options,
          userAttributes: {
            ...input.options?.userAttributes,
            email: customEmail,
            nickname:customname,
            phone_number:customPhone,
            birthdate:customBirthdate,
            "custom:company":company,
            "custom:country":pais,
            "custom:rol":"ADMIN",
          },
        },
      });
    },
  };
  useEffect(() => {
    if (user) {
      redirect(`/checkout`);
    }
  }, [user]);
  

  return( 
    <Authenticator 
    services={services} 
    formFields={formFields}
    signUpAttributes={["name","phone_number","birthdate"]}
    components={{
      SignUp: {

        FormFields() {
          const { validationErrors} = useAuthenticator();

          return (
            <>

              <Authenticator.SignUp.FormFields />
              {/* Append & require Terms and Conditions field to sign up  */}
              <CheckboxField
                required={true}
                errorMessage={validationErrors.acknowledgement as string}
                hasError={!!validationErrors.acknowledgement}
                name="acknowledgement"
                value="yes"
                label={<Link href={"/term_and_conditions"}>Aceptas los <span className="termAndCondition"> Terminos y Condiciones</span></Link>}

              />
            </>
          );
        },
      },
    }}
    
    passwordSettings={{minLength:8,requireLowercase:true,requireNumbers:true,requireSpecialCharacters:true,requireUppercase:true}}>
    {({ signOut, user }) =>{ 
      
      return redirect("/checkout")
    }}
  </Authenticator>
);
}

export default Login;