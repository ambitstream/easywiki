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
        <div>
           {data.map((item, i) =>
               <div key={item.pageid + i}>
                    <a href={`/?pageid=${item.pageid}`}>
                        {item.title}
                    </a>
               </div>
            )}
        </div>
    );
};

export default Results;