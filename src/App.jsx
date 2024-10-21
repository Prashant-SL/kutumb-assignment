import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import QuotesPage from './pages/QuotesPage';
import CreateQuotePage from './pages/CreateQuotePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/quotes" element={<QuotesPage />} />
        <Route path="/create-quote" element={<CreateQuotePage />} />
      </Routes>
    </Router>
  );
}

export default App;