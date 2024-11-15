'use client'
import React, { useEffect, useState } from 'react'
import {
    Bird,
    Book,
    Bot,
    BotMessageSquare,
    Code2,
    CornerDownLeft,
    FileDownIcon,
    LifeBuoy,
    LoaderCircle,
    Mic,
    Paperclip,
    Rabbit,
    Settings,
    Settings2,
    Share,
    SquareTerminal,
    SquareUser,
    Trash2,
    Triangle,
    Turtle,
  } from "lucide-react"
  import WhatsappIcon from '@/components/icons/WhatsappIcon'
  import { ChatBubbleIcon, InstagramLogoIcon } from '@radix-ui/react-icons'
  import MessengerIcon from '@/components/icons/MessengerIcon'
  import { Badge } from "@/components/ui/badge"
  import { Button } from "@/components/ui/button"
  import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { Textarea } from "@/components/ui/textarea"
  import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { textChat } from '../../constants'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../../components/ui/dialog'
import  CImage from 'next/image'
import { useLocalStorage } from '../../../hooks/useLocalStorage'
import { chat, contact, props } from './types'
import { Schema } from '../../../amplify/data/resource'
import { generateClient } from "aws-amplify/data";


function Chats({contacts,chats,message,company}:props) {
  const [accountSelected,setAccountSelected]=useState(textChat.select)
  const [account,setAccount]=useState<Schema["Accounts"]["type"][] >([])
  const [data,setData]=useState<contact[]>([])
  const [chatSelected,setChatSelected]=useState<chat|null>(null)
  const [fileUploaded,setFileUploaded]=useState<File[]>([])
  const [imgs,setImgs]=useState<HTMLImageElement[]>([])
  const [sendImg,setSendImg]=useState<boolean>(false)
  const [loading,setLoading]=useState<boolean>(false)

  const [count, setCount] = useLocalStorage("Photos", []);


  const [todos, setTodos] = useState<Schema["Contacts"]["type"][]>([]);
  const client = generateClient<Schema>();

  useEffect(() => {
   

    const createSub = client.models.Company.observeQuery({
      filter: {
        id: {
          contains: company,
        },
      },
    }).subscribe({
      next: async (data) => {
        const acc=await data.items[0].accounts()
        setAccount(acc.data)},
      error: (error) => console.warn(error),
    });
  

    return () => createSub.unsubscribe();
  }, []);
  

  const handleChat=(index:number)=>{
    if(data !==null ){
    setChatSelected(data[index].chat!)
    setCount((e:any)=>e.concat({contact:data[index]?.name,imgUploads:[]}))
    }
  }

  function removeDragData(ev:any) {
    console.log("Removing drag data");
  
    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to remove the drag data
      ev.dataTransfer.items.clear();
    } else {
      // Use DataTransfer interface to remove the drag data
      ev.dataTransfer.clearData();
    }
  }
  function dragOverHandler(ev:React.DragEvent<HTMLDivElement>) {
    console.log("File(s) in drop zone");
  
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  }
  function dropHandler(ev:React.DragEvent<HTMLDivElement>) {
    console.log("Fichero(s) arrastrados");
    setLoading(true)
    // Evitar el comportamiendo por defecto (Evitar que el fichero se abra/ejecute)
    ev.preventDefault();
    const readData=(file:File)=>{
       const reader = new FileReader();
      reader.onload = (e) => {
    const img = new Image();
    if (typeof e!.target!.result === 'string') {
      img.src = e!.target!.result;
      setImgs((e)=>[...e,img])
      
    } else if (e!.target!.result instanceof ArrayBuffer ) {
      const uint8Array = new Uint8Array(e!.target!.result);
      const numberArray = Array.from(uint8Array);
      const base64String = btoa(String.fromCharCode.apply(null, numberArray));
      img.src = `data:image/png;base64,${base64String}`;
      setImgs((e)=>[...e,img])
    } else {
      console.error('Error al leer el archivo');
    }
    // O cualquier contenedor donde quieras mostrar la imagen
      };
      reader.readAsDataURL(file);
 
    }
   
  
    if (ev.dataTransfer.items) {
      // Usar la interfaz DataTransferItemList para acceder a el/los archivos)
      for (var i = 0; i < ev.dataTransfer.items.length; i++) {
        // Si los elementos arrastrados no son ficheros, rechazarlos
        if (ev.dataTransfer.items[i].kind === "file") {
          var file = ev.dataTransfer.items[i].getAsFile()!;
          setFileUploaded((e):File[]=> e ? [...e,file]:[file])
          readData(file)
          console.log("... file[" + i + "].name = " + file?.name);
        }
      }
      setLoading(false)
    } else {
      // Usar la interfaz DataTransfer para acceder a el/los archivos
      for (var i = 0; i < ev.dataTransfer.files.length; i++) {
        console.log(
          "... file[" + i + "].name = " + ev.dataTransfer.files[i].name,
        );
      }
    }
  
    // Pasar el evento a removeDragData para limpiar
    removeDragData(ev);
  }
  
console.log(count)
  return (
    <div className="flex flex-col">
    <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
      <h1 className="text-xl font-semibold">Mensajes</h1>
  
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <ChatBubbleIcon className="size-4" />
            <span className="sr-only">Mensajes</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-[80vh]">
          <DrawerHeader>
            <DrawerTitle>Mensajes</DrawerTitle>
          </DrawerHeader>
          <form className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
            <fieldset className="grid gap-6 rounded-lg border p-4">
              <legend className="-ml-1 px-1 text-sm font-medium">
               Cuentas
              </legend>
              <div className="grid gap-3">
                <Select onValueChange={(e:string) => setAccountSelected(e)}>
                  <SelectTrigger
                    id="model"
                    className="items-start [&_[data-description]]:hidden"
                  >
                    <SelectValue placeholder={accountSelected}></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Whatsapp">
                      <div className="flex items-start gap-3 text-muted-foreground">
                        <Rabbit className="size-5" />
                        <div className="grid gap-0.5">
                          <span>Whatsapp</span>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="Messenger">
                      <div className="flex items-start gap-3 text-muted-foreground">
                        <Bird className="size-5" />
                        <div className="grid gap-0.5">
                          <span>Messenger</span>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="Instagram">
                      <div className="flex items-start gap-3 text-muted-foreground">
                        <Turtle className="size-5" />
                        <div className="grid gap-0.5">
                        <span>Instagram</span>
                        </div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
          
            </fieldset>
          
            <fieldset className="grid gap-6 rounded-lg border p-4 h-[55vh]">
                <legend className="-ml-1 px-1 text-sm font-medium">
                Chats
                </legend>
                <div className="flex gap-3 flex flex-col">
                <Card x-chunk="dashboard-01-chunk-5">
                  <CardHeader className='flex flex-row gap-4 items-center'>
                      <Avatar className="hidden h-12 w-12 sm:flex">
                          <AvatarImage src="/avatars/01.png" alt="Avatar" />
                          <AvatarFallback>OM</AvatarFallback>
                        </Avatar>
                    <CardTitle> Olivia Martin </CardTitle>
                  </CardHeader>
                  <CardContent className="grid ">
                    <div className="flex justify-between gap-4">
                      <div className='flex flex-row gap-4'>
                        
                        <div className="grid gap-1">
                         
                          <p className="text-sm text-muted-foreground">
                            olivia.martin@email.com
                          </p>
                        </div>
                      </div>
                      
                      <span className="w-4 h-4 rounded-full bg-red-400"></span>
                    </div>
                    
                  </CardContent>
                </Card>
               
                </div>
               
            </fieldset>
              
            
          </form>
        </DrawerContent>
      </Drawer>
      
    </header>
    <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
      <div
        className="relative hidden flex-col items-start gap-8 md:flex " x-chunk="dashboard-03-chunk-0"
      >
        <section className="grid w-full items-start gap-6 ">
          <fieldset className="grid gap-6 rounded-lg border p-4 h-[75vh]">
            <legend className="-ml-1 px-1 text-sm font-medium">
            <Select  onValueChange={(e:string) => {
              setChatSelected(null)
              setAccountSelected(e)
              }} >
                <SelectTrigger
                
                  id="model"
                  className="items-start [&_[data-description]]:hidden"
                >
                  <SelectValue placeholder={accountSelected} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Whatsapp">
                    <div className="flex items-start gap-3 text-muted-foreground ">
                      <WhatsappIcon className="size-5 " />
                      <div className="grid gap-0.5">
                      <span>Whatsapp</span>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="Messenger">
                    <div className="flex items-start gap-3 text-muted-foreground ">
                      <MessengerIcon className="size-5" />
                      <div className="grid gap-0.5">
                       <span>Messenger</span>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="Instagram">
                    <div className="flex items-start gap-3 text-muted-foreground ">
                      <InstagramLogoIcon className="size-5" />
                      <div className="grid gap-0.5">
                       <span>Instagram</span>
                      </div>
                    </div>
                  </SelectItem>
                </SelectContent>
            </Select>
            </legend>

            <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                Chats
                </legend>
                <div className="flex gap-3 flex flex-col">
               {contacts!==null && contacts? contacts.map((item,index)=>{
                return (
                  <Card key={index} onClick={()=>handleChat(index)} x-chunk="dashboard-01-chunk-5" className='p-4 cursor-pointer max-h-[115px]'>
                  <CardHeader className='flex flex-row gap-4 items-center p-2 '>
                      <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage src="/avatars/01.png" alt="Avatar" />
                        <AvatarFallback>{item?.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    <CardTitle>{item?.name }</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-8 p-2">
                    <div className="flex justify-between gap-4">
                      
                      <div className="grid gap-1">
                        
                        <p className="text-sm text-muted-foreground">
                          correo@email.com
                        </p>
                      </div>
                      <span className="w-4 h-4 rounded-full bg-red-400"></span>
                    </div>
                    
                  </CardContent>
                </Card>
                )
               }):
               <span>{textChat.noChat}</span>}
               
                </div>
               
            </fieldset>
          </fieldset>
          
        </section>
      </div>
      <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
       
       <div className='w-full h-fit relative'>
          <div className=' h-[60vh] w-full rounded-lg bg-gray-100 overflow-y-scroll flex flex-col pt-16 gap-4 p-6'>
        
          {chatSelected !== null ? chatSelected.messages.map((item,index)=>{
            return (<>
            <div className='absolute w-full left-0 top-0 h-14 bg-gray-100 rounded-lg px-6 shadow-md flex flex-row justify-between items-center'>
            <div></div>
            <BotMessageSquare className='w-10 h-10 p-2 rounded-lg hover:bg-gray-200 hover:scale-105'/>
            </div>
            <p className={`text-wrap text-md md:text-lg text-white w-3/4 h-fit min-h-[60px] p-4 rounded-lg 
            ${accountSelected ==='Whatsapp'?' bg-green-600'
            :accountSelected ==='Instagram'?' bg-rose-600'
            :accountSelected ==='Messenger'?' bg-blue-600'
            :' bg-neutral-600'}`} 
            key={index}>

            {item.text}
            </p>
            </>)
          })
          :<span>{textChat.noChat}</span>       
          }
          
        </div>

       </div>
        
        
        <form
          className="relative  h-fit rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring" x-chunk="dashboard-03-chunk-1"
        >
           <div className={`${sendImg?"visible ":"invisible "} duration-300 ease-in-out transition-all shadow-inner absolute bg-red-200 w-full h-18 -top-16 left-0 p-2 gap-4 flex flex-row overflow-x-scroll`}>
            {imgs.map((item,index)=>{
             return <div className='flex items-center justify-center'>
              <CImage key={index} src={item.src} alt={`photo uploaded ${index}` }  width={40} height={40} className=' shadow-lg ' />
             </div> 
            })}
          </div>
          <Label htmlFor="message" className="sr-only">
            Mensaje
          </Label>
          <Textarea
            id="message"
            placeholder={textChat.inputTextPlaceholder}
            className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
          />
          <div className="flex items-center p-3 pt-0">
          
            <Dialog onOpenChange={(e)=>{
              if(!e && !sendImg){
                setFileUploaded([])
                setImgs([])
              }
            }}>
              <DialogTrigger >
                <Paperclip className="size-4" />
              </DialogTrigger>
              <DialogContent  className='p-10 w-3/4 h-1/2 max-w-[500px] max-h-[300px] rounded-xl' >
                <div id="drop-zone" onDragOver={(ev)=>dragOverHandler(ev)} onDrop={(ev)=>dropHandler(ev)} className='rounded-xl border-2 border-neutral-500 border-dashed w-full h-full max-h-[230px] flex justify-center items-center flex flex-col gap-4'>
                  
                 {loading?
                  <span className='w-fit h-fit'>
                      <LoaderCircle className='animate-spin w-10 h-10'/>
                  </span>
                  :imgs.length>0?
                  <div className='flex flex-row items-center justify-center gap-2 flex-wrap overflow-y-scroll h-3/4 w-full'>
                      {imgs.map((item, index)=>{
                        return (<div className='group/item relative shadow-xl'>
                          <Trash2 className='w-8 h-8 absolute top-0 right-0 p-2 bg-gray-100 shadow-lg w-4 h-4 hidden group-hover/item:flex duration-500 ease-in-out transition-all text-neutral-500 group-hover/item:text-red-700 z-50 rounded-lg hover:scale-105 '
                           onClick={()=>{
                            setFileUploaded(e=> e.toSpliced(index,1))
                            setImgs(e=>e.toSpliced(index,1))}}/>
                          <CImage src={item.src} alt='photo uploaded' key={index} width={100} height={100} className='group-hover/item:opacity-70 group-hover/item:grayscale rounded-lg'  />
                          </div>
                          )
                      })}
                    
                  </div>
                  : <div className='flex flex-col items-center justify-center gap-2'>
                    <DialogTitle className='text-xl text-neutral-400'>CARGAR ARCHIVOS</DialogTitle>
                    <label htmlFor='file-input' className='text-center w-3/4'>Arrastra o <span className='text-customText cursor-pointer'>selecciona desde el explorador de archivos</span></label>
                    <input type='file' id="file-input" accept="image/png, image/gif, image/jpeg" multiple={true} className='hidden'/> 
                    <FileDownIcon className='w-10 h-10 text-neutral-500'/>
                    
                  </div>
                  
                  }
                <DialogClose asChild>
                  <Button type='button' size={"sm"} onClick={()=>{
                    setSendImg(true)
                  }} 
                  className='p-2 px-4 font-bold rounded-lg bg-customColorBg'>
                    Cargar
                  </Button>
                </DialogClose>
              </div>
              </DialogContent>
            </Dialog>
            <Button type="submit" size="sm" className="ml-auto gap-1.5">
              {textChat.button}
              <CornerDownLeft className="size-3.5" />
            </Button>
          </div>
        </form>
      </div>
    </main>
  </div>

  )
}

export default Chats