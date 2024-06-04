import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';

interface IData  {
  stargazers_count: number;
  name: string;
  public_repos: number;
}

interface iValue{
 option: string;
 input: string;
}

function App() {

const [data, setData]=useState<IData>()
const [error, setError]=useState<string>('')
const [loading, setLoading]=useState<boolean>(false)
const [value, setValue] = useState<iValue>({option:'', input:''})
console.log(data);

async function getUser(event:React.MouseEvent<HTMLInputElement, MouseEvent>){
  event.preventDefault()
  setError('')
  try { 
    if(value.option&&value.input){
      setLoading(true)
      const respons = await axios.get(`https://api.github.com/${value.option}/${value.input}`)
      setData(respons.data)
      setLoading(false)
    }else{
      alert('заполните поля')
    }
  } catch(e) {
    const error = e as AxiosError
    setError(error.message)
    setLoading(false)
  }
}
const loadRepoz=(data:IData)=>{
  const loadUser=(data:IData)=>{
    return <>
    Имя: <p>{data.name ? data.name : <>Нет имени</>}</p>
    количество репозиториев: <p>{data.public_repos ? data.public_repos : <>Нет репозиториев</>}</p>
    </>
  }
  return <>
  {
    data?.stargazers_count 
    ? 
    <>
    Название репозитория: <p>{data.name ? data.name : <>Нет название репозитория</>}</p>
    количество звезд:<p>{data?.stargazers_count ? data.stargazers_count : <>Нет звезд</>}</p>
    </>
    :
    loadUser(data)
  }
  </>
}

  return (
    <div className="App">
      <form action="">
        <input type="text" onChange={e=>setValue({...value, input:e.target.value})}/>
        <select name="select" id=""  onChange={e=>setValue({...value,option:e.target.value})} defaultValue={'DEFAULT'}>
          <option value="DEFAULT" disabled >Выбрать</option>
          <option value="users">user</option>
          <option value="repos">response</option>
        </select>
        <input type="submit" onClick={(event)=>{getUser(event)}}/>
      </form>
      {loading && <p>Loading....</p>}
      {error && <p>{error}</p>}
    {data && <>
    {loadRepoz(data)}
    </>}
    </div>
  );
}
export default App;
