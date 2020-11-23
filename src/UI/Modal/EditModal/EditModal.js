import React, {useState, useEffect} from "react";
import '../ViewModal/ViewModal.css'

const EditModal = (props) => {

    // States
    const [task, setTask] = useState({
        customer_name: '',
        customer_phone: '',
        customer_email: '',
        task_status: '',
        task_datetime: '',
        barcode: ''
    });
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


    // Lifecycle hooks
    useEffect(() => {
        setTask(props.task)
    }, [props.task]);

    // Methods
    const inputChangedHandler = (event) => {
        setTask({
            ...task,
            [event.target.name]: event.target.value
        })
    };

    return (
        <div className='view-modal'>
            <div className='view-modal-inner'>
                <div className='mb-1'>
                    <strong>Customer Name:</strong>
                    <input
                        onChange={(e) => inputChangedHandler(e)}
                        name='customer_name'
                        type='text'
                        value={task.customer_name}/>
                </div>
                <div className='mb-1'>
                    <strong>Customer Phone:</strong>
                    <input
                        onChange={(e) => inputChangedHandler(e)}
                        name='customer_phone'
                        type='text'
                        value={task.customer_phone}/>
                </div>
                <div className='mb-1'>
                    <strong>Email:</strong>
                    <input
                        onChange={(e) => inputChangedHandler(e)}
                        name='customer_email'
                        type='email'
                        value={task.customer_email}/>
                </div>
                <div className='mb-1'>
                    <strong>Task Status:</strong>
                                        <input
                        onChange={(e) => inputChangedHandler(e)}
                        name='task_status'
                        type='text'
                        value={task.task_status}/>
                </div>
                <div className='mb-1'>
                    <strong>Task Date:</strong>
                    <input
                        onChange={(e) => inputChangedHandler(e)}
                        name='task_datetime'
                        type='text'
                        value={task.task_datetime}/>
                </div>
                <div className='mb-1'>
                    <strong>Barcode:</strong>
                    <input
                        onChange={(e) => inputChangedHandler(e)}
                        name='barcode'
                        type='text'
                        value={task.barcode}/>
                </div>
                <button onClick={() => props.updateTask(task)}>Save</button>
                <button onClick={props.closeHandler}>Close</button>
            </div>
        </div>
    )
};

export default EditModal;
