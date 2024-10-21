import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const QuotesPage = () => {
    const [quotes, setQuotes] = useState([]);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetchQuotes();
    }, [offset]);

    const fetchQuotes = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(
                `https://assignment.stage.crafto.app/getQuotes?limit=20&offset=${offset}`,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            if (response.data.length === 0) {
                setHasMore(false);
            } else {
                setQuotes((prev) => [...prev, ...response.data.data]);
            }
        } catch (error) {
            console.error('Error fetching quotes', error);
        }
    };

    const loadMore = () => {
        if (hasMore) setOffset((prev) => prev + 20);
    };

    return (
        <div className="p-8">
            <div className="grid grid-cols-4 gap-4">
                {quotes.map((quote) => (
                    <div key={quote.id} className="relative">
                        {quote.mediaUrl && (
                            <img
                                src={quote.mediaUrl}
                                alt="Quote"
                                className="w-auto h-80"
                            />
                        )}
                        <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-3">
                            <p>{quote.text}</p>
                            <p className="text-sm">By: {quote.username}</p>
                            <p className="text-xs">{new Date(quote.createdAt).toLocaleString()}</p>
                        </div>
                    </div>
                ))}
            </div>

            {hasMore && (
                <button
                    className="mt-4 p-2 bg-blue-500 text-white"
                    onClick={loadMore}
                >
                    Load More
                </button>
            )}

            <Link to="/create-quote">
                <button className="fixed bottom-10 right-10 bg-blue-500 text-white px-4 py-2 rounded-full">
                    +
                </button>
            </Link>
        </div>
    );
};

export default QuotesPage;