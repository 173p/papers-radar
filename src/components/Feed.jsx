import { useState, useEffect } from "react";
import axios from "axios";

export default function Feed() {
    const [papers, setPapers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get("http://localhost:5000/api/papers");
                setPapers(response.data);
            }catch(error){
                console.error("Error fetching data:", error)
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Add loading animation later m8
    if (loading) {
        return <div className="p-8 max-w-4xl mx-auto text-center">Loading...</div>;
    }
    
    return (
  <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">
        Last Month's Top AI Papers
      </h1>
      <div className="space-y-6">
        {papers.map((paper, id) => (
          <div key={id} className="p-4 border rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">{paper.title}</h2>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Authors:</strong> {paper.authors.join(", ")}
            </p>
            <p className="text-sm text-gray-600 mb-2"><strong>Published</strong>: {paper.published}</p>
          </div>
        ))}
      </div>
    </div>
        

    )
}