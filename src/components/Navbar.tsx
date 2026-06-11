import { NavLink } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import './Navbar.css';

const Navbar = () => {
  const activeWeeks = [1, 2, 3];
  const totalWeeks = 12;
  const weeks = Array.from({ length: totalWeeks }, (_, i) => i + 1);

  return (
    <nav className="navbar">
      <div className="nav-links-container">
        <div className="nav-links">
          {weeks.map((week) => {
            const isActive = activeWeeks.includes(week);
            const path = isActive ? `/week/${week}` : `/coming-soon/${week}`;
            
            return (
              <NavLink 
                key={week} 
                to={path}
                className={({ isActive: isRouteActive }) => 
                  `nav-link ${isActive ? 'active-week' : 'coming-soon-week'} ${isRouteActive ? 'current-route' : ''}`
                }
              >
                <div className="link-content">
                  <span className="week-num">W{week}</span>
                  {!isActive && <span className="tooltip">Coming Soon</span>}
                </div>
              </NavLink>
            );
          })}
        </div>
      </div>
      
      <div className="nav-divider" />
      <ThemeToggle />
    </nav>
  );
};

export default Navbar;
