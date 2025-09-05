import { BrowserRouter, Routes, Route } from 'react-router'
import Navbar from './components/NavBar'
import Feed from './components/Feed'
import PaperDetails from './components/PaperDetails'
function App() {


  return (
    <>
    <Navbar/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Feed/>}></Route>
        <Route path="/paper/:id" element={<PaperDetails/>}></Route>
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
