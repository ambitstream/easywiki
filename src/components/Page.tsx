import { useState, useEffect } from "react";
import OpenAI from "openai";
import axios from "axios";

interface Props {
    pageId: string,
};

const Page = ({ pageId }: Props) => {
    const [title, setTitle] = useState('Page ' + pageId);
    const [content, setContent] = useState('');

    useEffect(() => {
        getWiki();
    }, []);

    async function gptRequest(text: string) {
        if (!text) return false;

        const openai = new OpenAI({
            apiKey: process.env.REACT_APP_OPENAI_API_KEY,
            dangerouslyAllowBrowser: true
        });

        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: 'user', content: 'Retell the following in three sentences: ' + text }],
        });

        const result = chatCompletion.choices[0].message.content;

        if (result) {
            setContent(result);
        }
    };

    function getWiki() {
        const params = {
            action: 'query',
            format: 'json',
            pageids: pageId,
            prop: 'extracts',
            explaintext: true
        };

        axios.get('https://en.wikipedia.org/w/api.php', { params })
            .then(response => {
                const data = response.data?.query?.pages[pageId];
                const text = data.extract.slice(0, 10000);

                setTitle(data.title);
                gptRequest(text);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div className="App">
            <header className="App-header">
                <h3>{title}</h3>
                <div style={{fontSize: 10}}>{content}</div>
            </header>
        </div>
    );
};

export default Page;