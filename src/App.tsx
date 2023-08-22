import React from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './components/Search';
import Page from './components/Page';

const App = () => {
    const queryParameters = new URLSearchParams(window.location.search);
    const pageId = queryParameters.get("pageid");

    if (pageId) {
        return <Page pageId={pageId} />
    } else {
        return <Search />
    }
}

export default App;
