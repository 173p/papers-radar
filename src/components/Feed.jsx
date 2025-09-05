import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import { Link } from "react-router";

export default function Feed() {
    const [papers, setPapers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [startIndex, setStartIndex] = useState(0);
    const [paginationInfo, setPaginationInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try{
                const response = await axios.get(`http://localhost:5000/api/papers?start=${startIndex}`);
                setPapers(response.data.papers);
                setPaginationInfo(response.data.pagination);
            }catch(error){
                console.error("Error fetching data:", error)
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [startIndex]);

    const handlePageChange = (pageNumber) => {
    const newStart = (pageNumber - 1) * paginationInfo.maxResultsPerPage;
    setStartIndex(newStart);
    };

    // Add loading animation later m8
    if (loading) {
        return <div className="p-8 max-w-4xl mx-auto text-center">Loading...</div>
    }

    const currentPage = paginationInfo ? (startIndex / paginationInfo.maxResultsPerPage) + 1 : 1;
    const totalPages = paginationInfo ? Math.ceil(paginationInfo.totalResults / paginationInfo.maxResultsPerPage) : 1;
    
  return (
  <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">
        Last Week's Top AI Papers
      </h1>
      <div className="space-y-6">
        {papers.map((paper) =>
        {
          const paperID = (paper.link).split("/").pop() // Grabs last element after splitting arr
          return (
          <div key={paper.link} className="p-4 border rounded-lg shadow-md">
            <Link to={`/paper/${paperID}`}>
            <h2 className="text-xl font-bold mb-2 text-blue-800 hover:text-blue-600">{paper.title}</h2>
            </Link>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Authors:</strong> {paper.authors.join(", ")}
            </p>
            <p className="text-sm text-gray-600 mb-2"><strong>Published</strong>: {paper.published}</p>
          </div>
        )})}
      </div>
      <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      />
    </div>
        

    )
}