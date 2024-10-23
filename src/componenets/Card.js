import React from 'react'

const Card = ({sortedGroups}) => {
  return (
    <div>{sortedGroups.map((group, index) => (
        <div key={index} className="ticket-column">
            <h3>{group.groupName}</h3>
            <div className="card-container">
                {group.tickets.map((ticket) => (
                    <div key={ticket.id} className="ticket-card">
                        <h4>{ticket.title}</h4>
                        <p>Status: {ticket.status}</p>
                        <p>Priority: {ticket.priority}</p>
                    </div>
                ))}
            </div>
        </div>
    ))}</div>
  )
}

export default Card