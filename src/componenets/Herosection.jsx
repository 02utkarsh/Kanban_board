import React from 'react';
import "../../src/App.css"  
import add from "../../src/Assets/add.svg";
import threedot from "../../src/Assets/3 dot menu.svg";
import backlog from "../../src/Assets/Backlog.svg"; 
import cancelled from "../../src/Assets/Cancelled.svg";
import display from "../../src/Assets/Display.svg"; 
import done from "../../src/Assets/Done.svg"; 
import inProgress from "../../src/Assets/in-progress.svg"; 
import todo from "../../src/Assets/To-do.svg"; 
import { GoDotFill } from "react-icons/go";
import urgentPriority from "../../src/Assets/SVG - Urgent Priority colour.svg"; 
import highPriority from "../../src/Assets/Img - High Priority.svg"; 
import mediumPriority from "../../src/Assets/Img - Medium Priority.svg"; 
import lowPriority from "../../src/Assets/Img - Low Priority.svg"; 
import noPriority from "../../src/Assets/No-priority.svg";
import Ramesh from "../../src/Assets/Ramesh.jpg"
import Shankar from "../../src/Assets/Shankar.jpg"
import Suresh from "../../src/Assets/Suresh.jpg"
import Yogesh from "../../src/Assets/Yogesh.jpg"
import Anoop from "../../src/Assets/Anoop.jpg"


const Herosection = ({ fetcheddata, groupBy, sortBy }) => {
    if (!fetcheddata) return <div>Loading...</div>;

    const { tickets, users } = fetcheddata;

    const imageMap = {
        "Backlog": backlog,
        "Cancelled": cancelled,
        "Display": display,
        "Done": done,
        "In progress": inProgress,
        "Todo": todo,
        4: urgentPriority, 
        3: highPriority,    
        2: mediumPriority,  
        1: lowPriority,    
        0: noPriority,
        "Anoop sharma":Anoop,
        "Yogesh":Yogesh,
        "Suresh":Suresh,
        "Shankar Kumar":Shankar,
        "Ramesh":Ramesh       
    };
    const priorityLabels = {
        4: 'Urgent',
        3: 'High',
        2: 'Medium',
        1: 'Low',
        0: 'No priority',
    };

    const groupTickets = (tickets, groupBy) => {
        switch(groupBy) {
            case 'status':
                return tickets.reduce((acc, ticket) => {
                    acc[ticket.status] = acc[ticket.status] || [];
                    acc[ticket.status].push(ticket);
                    return acc;
                }, {});
            case 'user':
                return tickets.reduce((acc, ticket) => {
                    const user = users.find(u => u.id === ticket.userId);
                    const userName = user ? user.name : 'Unassigned';
                    acc[userName] = acc[userName] || [];
                    acc[userName].push(ticket);
                    return acc;
                }, {});
            case 'priority':
                return tickets.reduce((acc, ticket) => {
                    acc[ticket.priority] = acc[ticket.priority] || [];
                    acc[ticket.priority].push(ticket);
                    return acc;
                }, {});
            default:
                return tickets;
        }
    };

    const sortTickets = (tickets, sortBy) => {
        switch(sortBy) {
            case 'priority':
                return tickets.sort((a, b) => b.priority - a.priority);
            case 'title':
                return tickets.sort((a, b) => a.title.localeCompare(b.title));
            default:
                return tickets;
        }
    };

    const groupedTickets = groupTickets(tickets, groupBy);
    const priorityOrder = [0, 4, 3, 2, 1];
    const sortedGroups = Object.entries(groupedTickets)
        .map(([groupName, tickets]) => ({
            groupName,
            tickets: sortTickets(tickets, sortBy),
        }))
        .sort((a, b) => {
            if (groupBy === 'priority') {
                return priorityOrder.indexOf(parseInt(a.groupName)) - priorityOrder.indexOf(parseInt(b.groupName));
            }
            return 0; 
        });
    console.log(sortedGroups);
    return (
        <div className="hero-section">
            <div className="columns-container">
                {sortedGroups.map((group, index) => (
                    <div key={index} className="ticket-column">
                        <div className='cols'>
                           <div className='alpha'>
                                <img className='images'  
                                    src={imageMap[group.groupName] || '/path/to/default-image.svg'} 
                                    alt={group.groupName} 
                                    />               
                                    <div>{groupBy === 'priority' 
                                        ? priorityLabels[group.groupName]
                                        : group.groupName}</div>
                                    <p>{group.tickets.length}</p>
                           </div>
                            
                            <div className='option'>
                                <img src={add} alt="Add"/>
                                <img src={threedot} alt="Options"/>
                            </div>
                        </div>
                        <div className="card-container">
                            {group.tickets.map((ticket) => (
                                <div key={ticket.id} className="ticket-card">
                                    <div className='t1'>
                                        <p>{ticket.id}</p>
                                        <img className='images' src={imageMap[group.groupName]}/>
                                    </div>
                                    <div className='t2'>
                                    
                                        <img className='images' src={imageMap[ticket.status]}/>
                                        {/* <img className='images' src={imageMap[group.groupName]}/> */}
                                        <div className='overfls'>{ticket.title}</div>
                                    </div>
                                    <div className='t3'>
                                    
                                        <img src={imageMap[ticket.priority]}/>
                                        <div className='ttag'>
                                        <GoDotFill className='goto'/>
                                        <p >{ticket.tag}</p>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Herosection;
