import React from "react";
const {useState} =  React;

const Searchbar = () => {
    const [search, setSearch] = useState('');

    const onChange = (e) => {
        setSearch(e.target.value);
    }
    const onClick = (e) =>{
        console.log('Boton Funcionando');
    }

    return (
        <div>
            <div>
                <input placeholder="Buscar pokemon..."
                onChange = {onChange}

                />
            </div>
            <div>
                <button onClick={onClick}>Buscar</button>
            </div>
        </div>
    );
};

export default Searchbar;