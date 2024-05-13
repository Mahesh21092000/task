import axios from "axios";
import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { v4 as uuidv4 } from 'uuid';

const LinkResult = ({ inputValue }) => {
  const [urlData, setUrlData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCopy = (id) => {
    setUrlData(prevUrlData => {
      return prevUrlData.map(item => {
        if (item.id === id) {
          return { ...item, copyCount: item.copyCount + 1 };
        }
        return item;
      });
    });
  };

  const handleDelete = (id) => {
    setUrlData(prevUrlData => prevUrlData.filter(item => item.id !== id));
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!inputValue) return;
      setLoading(true);
      try {
        const response = await axios.get(`https://is.gd/create.php?format=json&url=${encodeURIComponent(inputValue)}`);
        const shortUrl = response.data.shorturl;
        const id = uuidv4(); // Generate unique ID
        setUrlData(prevUrlData => [...prevUrlData, { id, url: shortUrl, copyCount: 0 }]);
      } catch (err) {
        console.error("Error fetching URL:", err);
        setError("Error fetching URL. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [inputValue]);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {urlData.map((item) => (
        <div className="result" key={item.id}>
          <p>{item.url}</p>
          <CopyToClipboard text={item.url} onCopy={() => handleCopy(item.id)}>
            <button id="btn">Copy to Clipboard ({item.copyCount})</button>
          </CopyToClipboard>
          <button id="delete" onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      ))}
    </>
  );
};

export default LinkResult;
