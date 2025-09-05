import express from 'express';
import axios from 'axios';
import { DOMParser } from '@xmldom/xmldom';

const router = express.Router();

// Format date to match arXiv's expected format YYYYMMDDTTTT where TTTT is time in 24hr
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}${month}${day}${hours}${minutes}`;
}

function parseXML(xmlString) {
    
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "application/xml");
    const totalResults = parseInt(xmlDoc.getElementsByTagName("opensearch:totalResults")[0]?.textContent || '0', 10);
    const entries = xmlDoc.getElementsByTagName("entry");
    const papers = [];
    
    for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        const title = entry.getElementsByTagName("title")[0]?.textContent || "Title n/a";
        const summary = entry.getElementsByTagName("summary")[0]?.textContent || "Summary n/a";
        const link = entry.getElementsByTagName("id")[0]?.textContent;
        const published = entry.getElementsByTagName("published")[0]?.textContent?.slice(0, 10) || "Date n/a";
        const authors = Array.from(entry.getElementsByTagName("author")).map(author => author.getElementsByTagName("name")[0]?.textContent || "Author n/a");

        papers.push({ title, authors, summary, link, published });
    }
    return {papers, totalResults};
}

router.get('/', async (req, res) => {
  try {
    const base_url = "http://export.arxiv.org/api/query?"
    const start = parseInt(req.query.start) || 0;

    let currentTime = new Date();
    let weekAgo = new Date();
    weekAgo.setDate(currentTime.getDate() - 7);
    currentTime = formatDate(currentTime);
    weekAgo = formatDate(weekAgo);

    const dateQuery = `submittedDate:[${weekAgo} TO ${currentTime}]`
    const categories = "cat:cs.AI+OR+cs.LG"
    const searchQuery = `${categories}+AND+${dateQuery}`
    const maxResultsPerPage = 15
    const sortBy = 'submittedDate'
    const sortOrder = 'descending'
    
    const queryURL = `${base_url}search_query=${searchQuery}&start=${start}&max_results=${maxResultsPerPage}&sortBy=${sortBy}&sortOrder=${sortOrder}`

    const response = await axios.get(queryURL);
    const {papers, totalResults} = parseXML(response.data);
    res.json({
        papers,
        pagination: {
            start,
            maxResultsPerPage,
            totalResults
        }
    });
  } catch (err) {
    console.error("Error fetching paper(s) from arXiv:", err);
    res.status(500).json({ message: "Failed to fetch data" });
  }
});

router.get('/:id', async (req, res) => {
  try {
  const paperID = req.params.id;
  const queryURL = `http://export.arxiv.org/api/query?id_list=${paperID}`
  const response = await axios.get(queryURL)
  const {papers: paper} = parseXML(response.data);
  if(paper[0].title == "Title n/a") res.status(404).json({message: "Paper not found"})
    else res.json(paper[0]);
  } catch (err) {
    console.error("Error fetching paper from arXiv:", err)
    res.status(500).json({message: "Failed to fetch data"})
  }

})

export default router;