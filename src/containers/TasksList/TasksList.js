import React, { useState, useEffect } from "react";
import { AiFillFolderOpen, AiFillEdit, AiFillDelete } from 'react-icons/ai';
import Loader from "../../UI/Loader/Loader";
import ViewModal from "../../UI/Modal/ViewModal/ViewModal";
import './TasksList.css'

const TasksList = (props) => {

    // States
    const [tasks, setTasks] = useState({});
    const [statuses] = useState({
        0: 'Assigned',
        1: 'Started',
        2: 'Successful',
        3: 'Failed',
        4: 'InProgress',
        5: 'Pending',
        6: 'Unassigned',
        7: 'Accepted',
        8: 'Decline',
        9: 'Cancel',
        10: 'Deleted',
    });
    const [loader, setLoader] = useState(true);
    const [viewModal, setViewModal] = useState(null);

    // Lifecycle hooks
    useEffect(() => {
        (async () => {
            setLoader(true);
            const response = await fetch('/tasks.json');
            const jsonResponse = await response.json();
            setTasks(jsonResponse);
            setLoader(false)
        })()
    }, []);

    // Methods
    const loadViewModal = (props) => {
        let task = {
            ...props,
            task_status: statuses[props.task_status]
        };
        setViewModal(task);
    };
    const closeViewModal = () => {
        setViewModal(null);
    };

    // Render variables
    let body = null;
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
                <td>View</td>
                <td>Edit</td>
                <td>Delete</td>
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
                            <td><button onClick={() => loadViewModal(tasks[task])} className='btn btn-open'><AiFillFolderOpen /></button></td>
                            <td><button className='btn btn-edit'><AiFillEdit /></button></td>
                            <td><button className='btn btn-delete'><AiFillDelete /></button></td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    }

    return (
        <div>
            { body }
            { loader? <Loader/> : '' }
            { viewModal? <ViewModal closeHandler={closeViewModal} task={viewModal}/> : '' }
        </div>
    )
};

export default TasksList;
