import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import RepeatIcon from './../assets/fluent_arrow-repeat-all-24-filled.svg'

export default function AddTask() {

  const [taskName, setTaskName] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskTime, setTaskTime] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate()

  const date = new Date();
  const inputDate = new Date(taskDate);

  useEffect(()=> {
    handleSubmit();
  }, []);

  async function handleSubmit(e) {
    try {
      e.preventDefault();

      // The form will not be submitted if there is any empty input
      if (!taskName || !taskDate || !taskTime) {
        return setErrorMsg('Please add all task details');
      }

      // The form will not be submitted if the date is set in the past
      if (inputDate.setHours(0,0,0,0) < date.setHours(0,0,0,0)) {
        console.log(taskDate)
        return setErrorMsg('The date cannot be in the past');
      }

      // Checks for the time in the current date, so it is not in the past
      if ((taskDate.substring(0,4) === date.getFullYear() && taskDate.substring(5,7) === date.get + 1 && taskDate.substring(8, 10) === date.getDate()) && 
      ((date.getHours() < '10' && taskTime.substring(0,2) < '0' + date.getHours()) || (date.getHours() > '10' && taskTime.substring(0,2) < date.getHours())) || 
      ((date.getMinutes() < '10' && taskTime.substring(3,5) < '0' + date.getMinutes()) || (date.getMinutes() > '10' && taskTime.substring(3,5) < date.getMinutes()))) {
        return setErrorMsg('The time cannot be in the past');
      }

      const response = await fetch('http://localhost:4000/api/tasks/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: taskName,
          date: taskDate,
          time: taskTime,
        })
      });

      const data = await response.json();
      setErrorMsg(data.message);
      setTaskName('');
      setTaskDate('');
      setTaskTime('');

      navigate("/");

    } catch(err) {
      console.log(err);
    }
  }

  function cancelSubmit(e) {
    e.preventDefault();
    navigate("/");
  }

  return (
    <div className='add-task-page'>
        <h1>Add Task</h1>

        <div className='add-task-error'>
          <p>{errorMsg}</p>
        </div>

        <form action="POST" onSubmit={handleSubmit}>
            <input 
            type="text" 
            name="title" 
            id="task-name" 
            placeholder='Task Name'
            value={taskName}
            onChange={e => setTaskName(e.target.value)}
            />
            <input 
            type="date" 
            name="date" 
            id="task-date" 
            placeholder='Date'
            value={taskDate}
            onChange={e => setTaskDate(e.target.value)}
            />
            <input 
            type="time" 
            name="time" 
            id="task-time" 
            placeholder='Time'
            value={taskTime}
            onChange={e => setTaskTime(e.target.value)}
            />
            <label htmlFor="task-repeat">
                <input type="checkbox" name="task-repeat" id="task-repeat" />Repeat
                <img src={RepeatIcon} alt="" srcset="" />
            </label>

            <div className='task-buttons'>
              <button className='submit-task' onClick={handleSubmit}>Add Task</button>
              <button className='cancel-add-task' onClick={cancelSubmit}>Cancel</button>
            </div>
        </form>
    </div>
  )
}
