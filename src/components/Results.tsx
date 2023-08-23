interface Page {
    pageid: string;
    title: string;
};

interface Props {
    data: Page[];
};

const Results = ({ data }: Props) => {
    if (!data.length) return null;

    return (
        <div className="reasults-holder">
           {data.map((item, i) =>
                <a href={`/?pageid=${item.pageid}`} key={item.pageid + i} className="result-item">
                    {item.title}
                </a>
            )}
        </div>
    );
};

export default Results;