import React,{useState,useEffect} from 'react';
import {useQuery} from 'react-query';


export default function Character() 
{
   console.log('arribafdf')
  const[page,setPage]=useState(2)
  const[image,setImage]=useState(undefined)
  const[link,setLink]=useState('https://safebooru.org/index.php?page=post&s=list&tags=crisalys+&pid=0')
  const {data,status} = useQuery(['characters',page],fetchcharacters);
/*   const {safe,safeStatus} = useQuery('hmm',fetchSafebooru); */
  
  
  async function fetchcharacters({queryKey})
  {
   /*  const res = await fetch(`https://safebooru.org/index.php?page=post&s=view&id=3374962`);
    const data = await res.text();
    return new DOMParser().parseFromString(data, 'text/html'); */
    console.log(link)
    const data = await fetch(link);
    const si = await data.text();
    return new DOMParser().parseFromString(si, 'text/html'); 
  }
 /*  async function fetchSafebooru()
  {
     const res = await fetch('https://safebooru.org/index.php?page=post&s=view&id=3374962');
     
  } */

 /*  console.log(link);
  console.log(data); */

/*   if(data!== undefined)  
   {
     console.log(data)
     const newImage = data.querySelector('#image')
     if(newImage!==null && newImage!==undefined)setImage(newImage.src)
   } */
  

  if(status === "loading")
  {
     return <div>Loading...</div>
  }
  if(status === "error")
  {
     return <div>an error was occurred...</div>
  }
  function getAndRandomizingLinks()
  {
     const page = data.querySelector('#post-list');
     const thumbs = [...page.children[1].querySelectorAll('div:first-child > span')] ;
     const links = thumbs.map(thumb=>thumb.querySelector('a:first-child').href);
     
     for (let i = links.length -1; i > 0; i--) 
     {
      let j = Math.floor(Math.random() * i)
      let k = links[i]
      links[i] = links[j]
      links[j] = k
    }
    
    const castLink = `https://safebooru.org/${links[0].split('/').splice(3,1)}`

    return castLink
  }
  function setNewLink()
  {
     const newlink= getAndRandomizingLinks();
     console.log('arribe de set link')
     setLink(newlink)
  }

  return (
    <div className='container'>
          <button onClick={setNewLink}>clickMe</button>
          {image && <img src={image}></img>} 
    </div>
  )
}
