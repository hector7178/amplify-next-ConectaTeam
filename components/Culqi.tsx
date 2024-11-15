
import { useState } from 'react';
import { CulqiProvider, useCheckout } from 'react-culqi-next';
import { AuthGetCurrentUserServer } from '../utils/server-utils';
import toast,{ Toaster } from 'react-hot-toast';
import { redirect } from 'next/navigation';

interface prop {
    account:string,
    price:number,
    company?:string,
    active?:boolean,
    user?:any,
    userID:string,
    setActive:React.Dispatch<React.SetStateAction<boolean>>
}

const Culqi = ({account,price,company,active,user,userID,setActive}:prop ) => {
  
  return (
    <CulqiProvider    publicKey="pk_test_67c596361a68a7b2">
      <MyButton account={account} userID={userID} user={user} price={price} setActive={setActive} active={active}/>
      <Toaster/>
    </CulqiProvider>
  );
};

const MyButton = ({account,price,active,user, userID,setActive}:prop) => {
  

  const { openCulqi, token, error } = useCheckout({
    settings: {
      title: account,
      currency: 'PEN',
      amount: price,
      //optional
      options: {
        lang: 'auto',
        installments: false,
        paymentMethods: {
          tarjeta: true,
          yape: true,
        },
        style: {
          logo: '',
          bannerColor: '',
          buttonBackground: '',
          buttonText: '',
          buttonTextColor: '',
          linksColor: '',
          menuColor: '',
          priceColor: '',
        },
      },
    },
    onClose: () => {
      console.log('Handle the closing of the modal');
    },
    onToken: async token => {
      let data = await fetch('http://localhost:3000/api/payment/new',{method:"POST", body:JSON.stringify({
        user:user,
        token:token,
        plan:account,
        userID:userID
        })})

        toast.promise(data.json(),{
          loading: 'Se ha creando la suscripción, espere un momento...',
          success: <b>Genial! se ha creado exitosamente, pronto sera redireccionado</b>,
          error: <b>Ha ocurrido un Error en el servidor, intente de nuevo mas tarde</b>,
        })
        redirect("/dashboard?client=newclient")
    },
    onError: error => {
      toast.error(`Ha ocurrido un problema ${error.user_message}`)

      setActive(true)
    },
  });

  return (
    <>
      <button disabled={active} onClick={()=>{
        openCulqi()
        setActive(true)
      }} className={`${active?"bg-gray-400 text-neutral-500 cursor-not-allowed ":" bg-customColorBg text-white hover:scale-105 hover:bg-purple-950 cursor-pointer "} p-2 rounded-xl   w-fit h-fit   duration-300 ease-in-out transition-all` }>Registrar metodo de pago</button>
    </>
  );
};

export default Culqi