import React,{useState,useEffect} from 'react';
import {useQuery} from 'react-query';

import Char from './Char';

export default function Character() 
{
  const[page,setPage]=useState(2)
  const {data,status} = useQuery(['characters',page],fetchcharacters);
  const {safe,safeStatus} = useQuery('hmm',fetchSafebooru);

  async function fetchcharacters({queryKey})
  {
    const res = await fetch(`https://rickandmortyapi.com/api/character?page=${queryKey[1]}`);
    return res.json();
 
  }
  async function fetchSafebooru()
  {
     const res = await fetch('https://safebooru.org/index.php?page=post&s=view&id=3374962');
     const data = await res.text();
     const html = new DOMParser().parseFromString(data, 'text/html');
     return html
  }

  if(status === "loading")
  {
     return <div>Loading...</div>
  }
  if(status === "error")
  {
     return <div>an error was occurred...</div>
  }
  
  
  console.log(safe)

  return (
    <div className='container'>
        {
           data.results.map((char)=>
            {
              return(
                <Char key={char.id} char={char}/>
              ) 
            })
          
        }
    </div>
  )
}
