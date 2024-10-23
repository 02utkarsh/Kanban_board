import React, { useState, useEffect } from 'react';
import Navbar from './componenets/Navbar';
import { apidata } from './Api/Api';
import Herosection from './componenets/Herosection';

function App() {
  const [fetcheddata, setFetcheddata] = useState(null);
  const [groupBy, setGroupBy] = useState(() => {
    return localStorage.getItem('groupBy') || 'status';
  });
  const [sortBy, setSortBy] = useState(() => {
    return localStorage.getItem('sortBy') || 'priority';
  });
  const [dropdownOpen, setDropdownOpen] = useState(() => {
    return JSON.parse(localStorage.getItem('dropdownOpen')) || false;
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await apidata();
      setFetcheddata(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('groupBy', groupBy);
  }, [groupBy]);

  useEffect(() => {
    localStorage.setItem('sortBy', sortBy);
  }, [sortBy]);

  useEffect(() => {
    localStorage.setItem('dropdownOpen', JSON.stringify(dropdownOpen));
  }, [dropdownOpen]);

  useEffect(() => {
    const handleScroll = () => {
      localStorage.setItem('scrollPosition', window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const savedScrollPosition = localStorage.getItem('scrollPosition');
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition, 10));
    }
  }, []);

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <div className="App" onClick={closeDropdown}>
      <Navbar 
        groupBy={groupBy} 
        setGroupBy={setGroupBy} 
        sortBy={sortBy} 
        setSortBy={setSortBy} 
        dropdownOpen={dropdownOpen} 
        setDropdownOpen={setDropdownOpen}
      />
      <Herosection fetcheddata={fetcheddata} groupBy={groupBy} sortBy={sortBy} />
    </div>
  );
}

export default App;
