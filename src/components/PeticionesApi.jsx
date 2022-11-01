import React, { useState } from 'react'

export default function PeticionesApi() {
    const [cervezas, setCervezas] = useState([])
    const [pagina, setPagina] = useState(1)

    const obtenerCervezas = async (paginacion) => {
        try {
            const res = await fetch(`https://api.punkapi.com/v2/beers?page=${paginacion}&per_page=5`)
            const cervezas = await res.json()
            setCervezas(cervezas)
        } catch (error) {
            console.log(error)
        }
    }
    const siguiente = () => {
        setPagina(() => {
            obtenerCervezas(pagina + 1)
            return pagina + 1
        })

    }
    const atras = () => {
        setPagina(() => {
            obtenerCervezas(pagina - 1)
            return pagina - 1
        })

    }




    return (
        <div>
            <h1>PETICIONES DE CERVEZAS</h1>
            <button onClick={() => obtenerCervezas(pagina)}>LISTA DE CERVEZAS</button>
            <button onClick={siguiente}>SIGUIENTE</button>
            <button onClick={atras}>ATRÁS</button>
            {
                cervezas.map((item) => (
                    <div key={item.id}>
                        <h4>{item.id}-{item.name}</h4>
                        <p>{item.description}</p>
                        <img src={item.image_url} alt={item.name} />
                    </div>
                ))
            }
        </div>
    )
}
