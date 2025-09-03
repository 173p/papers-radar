import express from 'express';
import axios from 'axios';
import { DOMParser } from '@xmldom/xmldom';

const router = express.Router();

function parseXML(xmlString) {
    
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "application/xml");
    const entries = xmlDoc.getElementsByTagName("entry");
    const papers = [];
    
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);

    for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        const title = entry.getElementsByTagName("title")[0].textContent;
        const summary = entry.getElementsByTagName("summary")[0].textContent;
        const authors = Array.from(entry.getElementsByTagName("author")).map(author => author.getElementsByTagName("name")[0].textContent);
        const link = entry.getElementsByTagName("id")[0].textContent;
        const published = entry.getElementsByTagName("published")[0].textContent.slice(0, 10);

        const publishedDate = new Date(published);
        if (publishedDate < monthAgo) continue; // Skip papers older than one month
        papers.push({ title, authors, summary, link, published });
    }
    console.log(papers.length);
    return papers;
}

router.get('/', async (req, res) => {
  try {
    let base_url = "http://export.arxiv.org/api/query?"
    let search_query = "cat:cs.LG+AND+cs.AI"
    let start = 0
    let max_results = 15
    let sortBy = 'submittedDate'
    let sortOrder = 'descending'
    const queryURL = `${base_url}search_query=${search_query}&start=${start}&max_results=${max_results}&sortBy=${sortBy}&sortOrder=${sortOrder}`

    const response = await axios.get(queryURL);
    const papers = parseXML(response.data);
    res.json(papers);
  } catch (error) {
    console.error("Error fetching papers from arXiv:", error);
    res.status(500).json({ message: "Failed to fetch data" });
  }
});

export default router;