import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = ({ userId, onlyUser, createdView }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        let endpoint;
        if (onlyUser) {
          endpoint = `http://localhost:3000/api/tasks/assigned/${userId}`;
        } else if (createdView) {
          endpoint = `http://localhost:3000/api/tasks/created/${userId}`;
        } else {
          endpoint = `http://localhost:3000/api/tasks`;
        }

        const res = await axios.get(endpoint);
        setTasks(res.data);
      } catch (error) {
        console.error('Error in fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [userId, onlyUser, createdView]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) return <p className="text-white">Loading tasks...</p>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h5 className="mb-4">
        {onlyUser ? '🧾 My Tasks' : createdView ? '📤 All Tasks (Assigned)' : '📋 All Tasks'}
      </h5>

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Task ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Due Date</th>
                <th>Created By</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task.TaskID}>
                  <td>{task.TaskID}</td>
                  <td>{task.Title}</td>
                  <td>{task.Description}</td>
                  <td>
                    <span className={`badge ${task.Status === 'Completed'
                      ? 'bg-success'
                      : task.Status === 'In Progress'
                      ? 'bg-info text-dark'
                      : 'bg-secondary'}`}>
                      {task.Status}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${task.Priority === 'High'
                      ? 'bg-danger'
                      : task.Priority === 'Medium'
                      ? 'bg-warning text-dark'
                      : 'bg-light text-dark'}`}>
                      {task.Priority}
                    </span>
                  </td>
                  <td>{formatDate(task.DueDate)}</td>
                  <td>{task.CreatedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TaskList;