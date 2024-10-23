import React from 'react';

function GroupBySelector({ groupBy, onGroupByChange }) {
    return (
        <div className="group-by-selector">
            <label>Group by:</label>
            <select value={groupBy} onChange={(e) => onGroupByChange(e.target.value)} className='boxes'>
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
            </select>
        </div>
    );
}

export default GroupBySelector;