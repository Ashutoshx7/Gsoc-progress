import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { WeekIndex } from './components/WeekIndex';
import WeekPage from './pages/WeekPage';
import ComingSoon from './pages/ComingSoon';

function App() {
  return (
    <Router>
      <div className="progress-frame">
        <Navbar />
        <WeekIndex />

        <div className="guide-line guide-line-vertical guide-line-left" />
        <div className="guide-line guide-line-vertical guide-line-right" />
        <div className="guide-line guide-line-horizontal guide-line-header-top" />
        <div className="guide-line guide-line-horizontal guide-line-header-bottom" />
        <div className="guide-node guide-node-top-left" />
        <div className="guide-node guide-node-top-right" />
        <div className="guide-node guide-node-bottom-left" />
        <div className="guide-node guide-node-bottom-right" />

        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/week/1" replace />} />
            <Route path="/week/:id" element={<WeekPage />} />
            <Route path="/coming-soon/:id" element={<ComingSoon />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
