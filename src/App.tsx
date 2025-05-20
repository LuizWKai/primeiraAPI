import { FiTrash } from "react-icons/fi"
import { api } from "./services/api"
import { useEffect, useState, useRef, FormEvent } from 'react'



interface CustomersProps{
  id: string;
  name: string;
  email: string;
  status: boolean;
  created_at: string;
}

export default function App(){

  const [customers, setCustomers] = useState<CustomersProps[]>([])
  const nameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    loadCustomers();
  }, [])

  async function loadCustomers(){
    const response = await api.get('/listar')
    console.log(response.data);
    setCustomers(response.data)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>){
    event.preventDefault();

    if(!nameRef.current?.value || !emailRef.current?.value) return;

     try {
      const response = await api.post('/customer', {
        name: nameRef.current.value,
        email: emailRef.current.value
      })

      setCustomers(allCustomers => [...allCustomers, response.data])

      nameRef.current.value = ''
      emailRef.current.value = ''
      
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      alert('Erro ao cadastrar cliente!');
    }
  }

async function handleDelete(id: string) {
  console.log("Tentando deletar cliente com ID:", id);
  try {await api.delete(`/customer/${id}`);

    const allCustomers = customers.filter( (customers) => customers.id !== id)
    setCustomers(allCustomers)

    setCustomers(prev => prev.filter(customer => customer.id !== id));
  } 
  catch (error: any) {
    console.error('Erro ao deletar:', error.response?.data || error.message);
    alert(`Erro ao deletar cliente: ${error.response?.data?.error || error.message}`);

      if (error.message === "Network Error") {
      alert("Erro de conexão: Verifique sua internet ou se o servidor está online");
    } else {
      alert(`Erro ao deletar cliente: ${error.response?.data?.error || error.message}`);
    }
  }
}

    
  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-4xl font-medium text-white text-center">Clientes</h1>

        <form className="flex flex-col my-6" onSubmit={handleSubmit}>
          <label className="font-medium text-white">Nome:</label>
          <input 
          type="text" 
          placeholder="Digite seu nome completo" 
          className="w-full mb-5 p-2 rounded border text-white"
          ref={nameRef}
          />
          <label className="font-medium text-white">Email:</label>
          <input 
          type="email" 
          placeholder="Digite seu email" 
          className="w-full mb-5 p-2 rounded border text-white"
          ref={emailRef}
          />

          <input
          type="submit"
          value="Cadastrar"
          className="cursor-pointer w-full p-2 bg-green-600 rounded font-medium"
          />
        </form>

        <section className="flex flex-col gap-3">

          {customers.map( (customer) => ( 
           <article 
           key={customer.id}
           className="font-full bg-white rounded p-2 relative hover:scale-105 duration-200">

            <p><span className="font-medium">Nome: </span> {customer.name} </p>
            <p><span className="font-medium">Email: </span> {customer.email}</p>
            <p><span className="font-medium">Status: </span> {customer.status ? 'ATIVO' : 'INATIVO'} </p>

            <button 
            className=" cursor-pointer bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-0 -top-2"
            onClick={() => handleDelete(customer.id)}
            >
            <FiTrash size={18} color="white"/>
           </button>
          </article>

          ))}

        </section>
      </main>
    </div>
  )
}
