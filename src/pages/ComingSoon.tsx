import { useParams } from 'react-router-dom';
import { Clock } from 'lucide-react';
import './ComingSoon.css';

const ComingSoon = () => {
  const { id } = useParams();

  return (
    <div className="animate-in coming-soon-container">
      <section className="coming-soon-card">
        <div className="icon-wrapper">
          <Clock size={48} className="pulse-icon" />
        </div>
        
        <h1 className="coming-soon-title">Week {id}</h1>
        <h2 className="coming-soon-subtitle">Coming Soon</h2>
        
        <p className="coming-soon-text">
          I'm currently working on earlier weeks or preparing the content for Week {id}. 
          Check back later to see the progress!
        </p>

        <div className="progress-bar-container">
          <div className="progress-bar-track">
            <div className="progress-bar-fill pulse-glow"></div>
          </div>
          <span className="progress-text">Coding in progress...</span>
        </div>
      </section>
    </div>
  );
};

export default ComingSoon;
