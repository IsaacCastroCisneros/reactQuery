import React from 'react'

export default function Char({char}) {
  return (
    <div className='char'>
       <section className='char__img-container'>
          <img src={char.image}></img>
       </section>
       <aside className='char__aside'>
          <h3>{char.name}</h3>
          <strong>Especie:<span>{char.species}</span></strong>
          <strong>Status:<span>{char.species}</span></strong>
       </aside>
    </div>
  )
}
