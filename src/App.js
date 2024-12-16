import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/NavBar';
import AddLead from './Pages/AddLead';
import LeadList from './Pages/LeadList';
import UpdateLead from './Pages/UpdateLead';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1 className='d-flex justify-content-center' style={{ color: '3E4095' }}>Welcome to Bitrix24 CRM</h1>} />
        <Route path="/add-lead" element={<AddLead />} />
        <Route path="/lead-list" element={<LeadList />} />
        <Route path="/update-lead" element={<UpdateLead />} />
      </Routes>
    </Router>
  );
}

export default App;