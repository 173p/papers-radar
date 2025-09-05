import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from 'axios';
export default function PaperDetails() {
    const [paper, setPaper] = useState();
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5000/api/papers/${id}`);
                setPaper(response.data);
            } catch (err) {
                console.error("err fetching paper details:", err);
        
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id])

    if(loading){
        return <div className="p-8 max-w-4xl mx-auto text-center">Loading...</div>
    }

    if (!paper){
        return <div className="p-8 max-w-4xl mx-auto text-center">Paper not found</div>
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">{paper.title}</h1>
            <p className="text-xl text-gray-700 mb-4"><strong>Authors:</strong> {paper.authors.join(', ')}</p>
            <p className="mb-8 text-lg">{paper.summary}</p>
            <hr/>

            

        </div>
    )
}