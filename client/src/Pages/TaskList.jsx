import React from 'react'
import PlusIcon from './../assets/mdi_plus-circle.svg'
import TrashIcon from './../assets/heroicons_trash-solid.svg'
import ThreeDots from './../assets/ph_dots-three-vertical-bold.svg';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function TaskList() {

  const [taskData, getTaskData] = useState();


  async function getTask() {
    const response = await fetch('https://mern-to-do.onrender.com/api/tasks/');
    const data = await response.json();
    console.log(data)
    getTaskData(data);
  }

  async function deleteTask(id) {
    const response = await fetch('https://mern-to-do.onrender.com/api/tasks/delete/' + id, {
      method: "DELETE"
    });
    const data = await response.json();
    console.log(data);

    getTaskData(taskData => taskData.filter(task => task._id !== data.deleteTask._id));
  }

  useEffect(()=> {
    getTask();
  }, []);

  return (
    <div className='task-list-page'>
        <h1>Task List</h1>

        <div className='task-list'>
            {(typeof taskData === 'undefined') ? (<p>Loading...</p>) : (
              taskData.map(task => 
              (
                <div className='task-item' key={task._id}>
                  <label htmlFor="task-completed">
                    <span className='checkmark'></span>
                  </label>

                  <div className='task-details'>
                  <p className='task-title'>{task.title}</p>
                  <div className='task-time'>
                    <p>{task.date.substring(0,10)}</p>
                    <p>{task.time}</p>
                  </div>
                  </div>

                  <button className='delete-task'><img src={TrashIcon} alt="" onClick={() => deleteTask(task._id)} /></button>
                  <button className='task-details'><img src={ThreeDots} alt="" /></button>
                </div>
              ))
            )}
        </div>

        <Link to='/task/new'>
          <button className='add-task-button'>
            <img src={PlusIcon} alt="" /><span>Add Task</span>
          </button>
        </Link>
    </div>
  )
}
