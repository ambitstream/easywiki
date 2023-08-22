import { useState, useEffect } from "react";
import axios from 'axios';
import Results from './Results';

const Search = () => {
    const [q, setQ] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (q.length > 2) {
            axios.get(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${q}&prop=info&inprop=url&utf8=&format=json`)
                .then(response => {
                    setResults(response.data.query.search);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [q]);

    return (
        <div className="App">
            <header className="App-header">
                <p>Easywiki</p>
                <div>
                    <input type="text" value={q} onChange={e => setQ(e.target.value)} />
                    <Results data={results} />
                </div>
            </header>
        </div>
    );
};

export default Search;