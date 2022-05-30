import React, {useEffect, useState} from 'react';
import axios from "axios";

const Card = ({ url }) => {
    const [error, setError] = useState("");
    const [pokemonData, setPokemonData] = useState([]);

    useEffect(() => {
        setError("")
        async function fetchPokemonData() {
            try {
                const response = await axios.get(url);
                setPokemonData(response.data);
            } catch (e) {
                console.log(e);
                setError("Er is geen informatie gevonden...")
            }
        }
        fetchPokemonData();
    }, [url]);

    return (
        <>
            {error !== "" ? <span>{error}</span> :
                <li className="card">
                    <h2>{pokemonData.name}</h2>
                    {pokemonData.sprites &&
                        <img
                            src={pokemonData.sprites.front_default}
                            alt={pokemonData.name}
                        />
                    }
                    <span><strong>Moves: </strong>{pokemonData.moves && pokemonData.moves.length}</span>
                    <span><strong>Weight: </strong>{pokemonData.weight}</span>
                    <span><strong>Abilities: </strong></span>
                    {pokemonData.abilities && pokemonData.abilities.map((ability) => {
                        return(
                            <span className="ability">{ability.ability.name}</span>
                        )
                    })}
                </li>
            }
        </>
    );
};

export default Card;