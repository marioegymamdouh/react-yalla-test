import React, { useState, useEffect } from "react";

const TasksList = (props) => {

    // States
    const [tasks, setTasks] = useState({});
    const [statuses] = useState({
        0: 'Assigned',
        1: 'Started',
        2: 'Successful',
        3: 'Failed',
        4: 'InProgress',
        6: 'Unassigned',
        7: 'Accepted',
        8: 'Decline',
        9: 'Cancel',
        10: 'Deleted',
    });

    // Lifecycle hooks
    useEffect(() => {
        (async () => {
            const response = await fetch('/tasks.json');
            const jsonResponse = await response.json();
            setTasks(jsonResponse)
        })()
    }, []);

    // Render variables
    let body = <div>nothing to show</div>;
    if (Object.keys(tasks).length>0){
        body = <table>
            <thead>
            <tr>
                <td>Task ID</td>
                <td>Customer Name</td>
                <td>Customer Phone</td>
                <td>Email</td>
                <td>Task Status</td>
                <td>Task Date</td>
            </tr>
            </thead>
            <tbody>
            {
                Object.keys(tasks).map(task => {
                    return (
                        <tr key={task}>
                            <td>{tasks[task].task_id}</td>
                            <td>{tasks[task].customer_name}</td>
                            <td>{tasks[task].customer_phone}</td>
                            <td>{tasks[task].customer_email}</td>
                            <td>{statuses[tasks[task].task_status]}</td>
                            <td>{tasks[task].task_datetime}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    }

    return (
        <div>
            {body}
        </div>
    )
};

export default TasksList;
