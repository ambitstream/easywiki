import { useState, useEffect } from "react";
import OpenAI from "openai";
import axios from "axios";
import Layout from './Layout';

interface Props {
    pageId: string,
};

const Page = ({ pageId }: Props) => {
    const [title, setTitle] = useState('Page ' + pageId);
    const [content, setContent] = useState('');

    useEffect(() => {
        if (pageId === '307') {
            setTitle('Abraham Lincoln');
            setContent('Abraham Lincoln was born in a log cabin in Kentucky to a poor family and was primarily self-educated. He became a lawyer and entered politics, eventually becoming the 16th president of the United States. Lincoln led the country through the Civil War, abolished slavery, and worked to preserve the Union.')
        } else {
            getWiki();
        }
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
        <Layout loading={false}>
            <h3>{title}</h3>
            <div>{content}</div>
            <div className="page-footer">
                <a href="/">&larr; Back</a>
                {title ?
                    <a href={`https://en.wikipedia.org/wiki/${title}`} target="_blank">Full article</a>
                : ''}
            </div>
        </Layout>
    );
};

export default Page;