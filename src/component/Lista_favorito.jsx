import React, { useState, useEffect } from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlineDelete } from 'react-icons/ai';

function Lista_favorito() {
  const [favoritos, setFavoritos] = useState([]);
  const [nuevoFavorito, setNuevoFavorito] = useState('');

  useEffect(() => {
    const procesarFavoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    setFavoritos(procesarFavoritos);
  }, []);

  const handleInputChange = (event) => {
    setNuevoFavorito(event.target.value);
  };

  const agregarFavorito = () => {
    if (nuevoFavorito.trim() !== '') {
      const actualizarfavoritos = [...favoritos, { nombre: nuevoFavorito, favorito: false }];
      setFavoritos(actualizarfavoritos);
      setNuevoFavorito('');
    }
  };

  const cambiarFavorito = (index) => {
    const actualizarfavoritos = [...favoritos];
    actualizarfavoritos[index].favorito = !actualizarfavoritos[index].favorito;
    setFavoritos(actualizarfavoritos);
    localStorage.setItem('favoritos', JSON.stringify(actualizarfavoritos.filter(f => f.favorito)));

    //(actualizarfavoritos[index].favorito) ? alert('Agregado a favoritos...') : alert('Elminado de favoritos...');  

  };

  const eliminarFavorito = (index) => {
      const confirmacion = confirm('¿Deseas eliminar este elemento de tus favoritos?');

      if (confirmacion) {
        const actualizarfavoritos = favoritos.filter((_, i) => i !== index);
        setFavoritos(actualizarfavoritos);
        localStorage.setItem('favoritos', JSON.stringify(actualizarfavoritos));
      }
  };

  return (
    <div className="
    max-w-md 
    mx-auto 
    p-4 
    bg-gradient-to-r 
    from-purple-400 
    via-purple-500 
    to-purple-500 
    rounded shadow-md">
      <h1 className="
      font-bold 
      text-5xl 
      text-black-800 
      text-center 
      py-3">
        Lista de Favoritos
        </h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={nuevoFavorito}
          onChange={handleInputChange}
          placeholder="Agregar uno nuevo a la lista"
          className="
          px-4 
          py-2 
          border 
          rounded-l 
          w-full 
          focus:outline-none 
          focus:border-blue-500"
        />
        <button onClick={agregarFavorito} className="
        px-4 py-2 
        bg-purple-800
        text-white rounded-r 
        hover:bg-purple-900 focus:outline-none">
          Agregar
        </button>
      </div>
      <ul>
        {favoritos.map((favorito, index) => (
          <li key={index} className="
          flex 
          items-center 
          justify-between 
          bg-white 
          mb-2 
          p-2 
          rounded">
            <span className={`text-gray-900 font-mono ${favorito.favorito ? '' : 'opacity-50'}`}>
              {favorito.nombre}
            </span>
            <div className='flex'>
              <button onClick={() => cambiarFavorito(index)} className="
              text-xl 
              text-gray-500 
              hover:text-gray-700
              ml-2">
                {favorito.favorito ? <AiFillHeart /> : <AiOutlineHeart />}
              </button>
              <button onClick={() => eliminarFavorito(index)} className="
              text-red-400 
              hover:text-red-600 
              text-xl 
              ml-2
              ">
                <AiOutlineDelete  />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Lista_favorito