import React, { useState,useEffect,useRef } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { TfiMenuAlt } from 'react-icons/tfi';
import GroupBySelector from './GroupBySelector';
import SortBySelector from './SortBySelector';
import "../../src/App.css"
const Navbar = ({ groupBy, setGroupBy, sortBy, setSortBy, dropdownOpen, setDropdownOpen }) => {
    const dropdownRef = useRef(null);
    const toggleDropdown = (event) => {
        event.stopPropagation();
        setDropdownOpen(!dropdownOpen); 
    };
    const handleDropdownClick = (event) => {
        event.stopPropagation();
    };
    return (
        <div className="mainnav"  onClick={handleDropdownClick}>  
            <button className="dropdown-toggle-btn" onClick={toggleDropdown}>
                <TfiMenuAlt />
                Display
                <RiArrowDropDownLine />
            </button>
            {dropdownOpen && (
                <div className="dropdown-menu">
                    <div className="dropdown-section">
                        <GroupBySelector groupBy={groupBy} onGroupByChange={setGroupBy} />
                    </div>
                    <div className="dropdown-section">
                        <SortBySelector sortBy={sortBy} onSortByChange={setSortBy} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
