import React, {useEffect, useState} from 'react';
import './App.css';
import Card from "./components/Card";
import axios from "axios";

function App() {
    const [error, setError] = useState("");
    const [data, setData] = useState([]);
    const [offset, setOffset] = useState(0)
    const [maxOffset, setMaxOffset] = useState(1);

    useEffect(() => {
        async function fetchData() {
            setError("");
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`);
                setData(response.data.results);
                setMaxOffset(response.data.count);
            } catch (e) {
                console.log(e);
                setError("Er is geen informatie gevonden...")
            }
        }

        fetchData();
    }, [offset]);

    return (
        <>
            <header>
                <img className="logo" src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
                     alt="logo"/>
                <nav>
                    <button
                        onClick={() => {
                            setOffset(Math.max(0, offset - 20))
                        }}
                        disabled={offset === 0 && true}
                    >Vorige
                    </button>
                    <button
                        onClick={() => {if (offset < maxOffset - 20) setOffset(offset + 20)}}
                        disabled={offset + 20 > maxOffset && true}
                    >Volgende
                    </button>
                </nav>
            </header>
            <main>
                {error !== "" ? <span>{error}</span> :
                    <ul className="card-container">
                        {data.map((item) => <Card key={item.name} url={item.url}/>)}
                    </ul>
                }
            </main>
        </>
    );
}

export default App;
