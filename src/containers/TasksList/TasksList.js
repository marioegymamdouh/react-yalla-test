import React, { useState, useEffect } from "react";
import { AiFillFolderOpen, AiFillEdit, AiFillDelete } from 'react-icons/ai';
import Loader from "../../UI/Loader/Loader";
import ViewModal from "../../UI/Modal/ViewModal/ViewModal";
import EditModal from "../../UI/Modal/EditModal/EditModal";
import Moment from 'moment';
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
    const [editModal, setEditModal] = useState(null);
    const [filter, setFilter] = useState({date: '', status: ''});

    // Lifecycle hooks
    useEffect(() => {
        loadTasks();
        filterHandler()
    }, []);

    // Methods
    const loadTasks = async (loaderController = true) => {
        setLoader(true);
        const response = await fetch('/tasks.json');
        const jsonResponse = await response.json();
        setTasks(jsonResponse);
        if (loaderController){
            setLoader(false)
        }
    };
    const loadViewModal = (props) => {
        let task = {
            ...props,
            task_status: statuses[props.task_status],
            task_datetime: Moment(props.task_datetime).format('DD-MM-YYYY hh:mm a')
        };
        setViewModal(task);
    };
    const closeViewModal = () => {
        setViewModal(null);
    };
    const loadEditModal = (props) => {
        setEditModal(props);
    };
    const closeEditModal = () => {
        setEditModal(null);
    };
    const deleteTask = async (key) => {
        try {
            setLoader(true);
            await fetch('/tasks/'+key+'.json', {
                method: 'DELETE'
            });
            await loadTasks(false);
            setLoader(false)
        } catch (e) {
            console.log(e)
        }
    };
    const updateTask = async (value) => {
        try {
            setLoader(true);
            await fetch('/tasks/'+editModal+'/.json', {
                method: 'PATCH',
                body: JSON.stringify(value)
            });
            await loadTasks(false);
            setLoader(false);
            setEditModal(null)
        } catch (e) {
            console.log(e)
        }
    };
    const filterHandler = () => {
        let result = Object.keys(tasks).map(key => {return {key: key, ...tasks[key]}});
        if (filter.status !== ''){
            result = result.filter((task) => {
                let filterStatus = parseInt(filter.status);
                return task.task_status === filterStatus
            })
        }
        if (filter.date !== ''){
            result = result.filter((task) => {
                let filterDate = Moment(filter.date).format('DD-MM-YYYY');
                let taskDate = Moment(task.task_datetime).format('DD-MM-YYYY');
                return taskDate === filterDate
            })
        }
        return result
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
                filterHandler().map(task => {
                    return (
                        <tr key={task.key}>
                            <td>{task.task_id}</td>
                            <td>{task.customer_name}</td>
                            <td>{task.customer_phone}</td>
                            <td>{task.customer_email}</td>
                            <td>{statuses[task.task_status]}</td>
                            <td>{Moment(task.task_datetime).format('DD-MM-YYYY hh:mm a')}</td>
                            <td><button onClick={() => loadViewModal(task)} className='btn btn-open'><AiFillFolderOpen /></button></td>
                            <td><button onClick={() => loadEditModal(task.key)} className='btn btn-edit'><AiFillEdit /></button></td>
                            <td><button onClick={() => deleteTask(task.key)} className='btn btn-delete'><AiFillDelete /></button></td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    }
    Moment.locale('en');
    return (
        <div>
            <div className='filter-container'>
                <select onChange={(e) => setFilter({...filter, status: e.target.value})} value={filter.status}>
                    <option value=''>select status</option>
                    {Object.keys(statuses).map(key => {
                        return (<option key={key} value={key}>{statuses[key]}</option>)
                    })}
                </select>
                <input type='date' onChange={(e) => setFilter({...filter, date: e.target.value})} value={filter.date}/>
            </div>

            { body }
            { loader? <Loader/> : '' }
            { viewModal? <ViewModal closeHandler={closeViewModal} task={viewModal}/> : '' }
            { editModal? <EditModal updateTask={(v) => updateTask(v)} closeHandler={closeEditModal} key={editModal} task={tasks[editModal]}/> : '' }
        </div>
    )
};

export default TasksList;
