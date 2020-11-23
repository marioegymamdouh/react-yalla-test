import React from "react";
import './ViewModal.css'

const ViewModal = (props) => {
    return (
        <div className='view-modal'>
            <div className='view-modal-inner'>
                <div className='mb-1'><strong>Task ID:</strong> {props.task.task_id}</div>
                <div className='mb-1'><strong>Customer Name:</strong> {props.task.customer_name}</div>
                <div className='mb-1'><strong>Customer Phone:</strong> {props.task.customer_phone}</div>
                <div className='mb-1'><strong>Email:</strong> {props.task.customer_email}</div>
                <div className='mb-1'><strong>Task Status:</strong> {props.task.task_status}</div>
                <div className='mb-1'><strong>Task Date:</strong> {props.task.task_datetime}</div>
                <div className='mb-1'><strong>Barcode:</strong> {props.task.barcode}</div>
                <button onClick={props.closeHandler}>Close</button>
            </div>
        </div>
    )
};

export default ViewModal;
