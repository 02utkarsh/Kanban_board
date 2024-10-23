import React from 'react';

function SortBySelector({ sortBy, onSortByChange }) {
    return (
        <div className="sort-by-selector">
            <label>Sort by:</label>
            <select value={sortBy} onChange={(e) => onSortByChange(e.target.value)} className='boxes2'>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
            </select>
        </div>
    );
}
export default SortBySelector;