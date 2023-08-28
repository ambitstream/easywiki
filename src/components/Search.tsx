import { useState, useEffect } from "react";
import axios from 'axios';
import Layout from './Layout';
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
        if (!q.length) setResults([]);
    }, [q]);

    return (
        <Layout loading={false}>
            <input
                placeholder="Search wikipedia"
                name="search"
                type="text"
                className="search-input"
                value={q}
                onChange={e => setQ(e.target.value)}
            />
            <Results data={results} />
            (v2.2)
        </Layout>
    );
};

export default Search;