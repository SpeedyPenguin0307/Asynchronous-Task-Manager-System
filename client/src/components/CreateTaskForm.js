import React, { useState } from 'react';
import axios from 'axios';

const CreateTaskForm = ({ creatorId }) => {
  const [form, setForm] = useState({
    Title: '',
    Description: '',
    Status: 'Pending',
    DueDate: '',
    Priority: 'Medium'
  });

  const [lastCreatedId, setLastCreatedId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      const response = await axios.post('/api/tasks', {
        ...form,
        CreatedBy: creatorId
      });

      const createdTaskId = response.data.taskId;
      setLastCreatedId(createdTaskId);
      setSuccessMsg(`Task has been created successfully! Task ID: ${createdTaskId}`);
      
      // Clearing form
      setForm({
        Title: '',
        Description: '',
        Status: 'Pending',
        DueDate: '',
        Priority: 'Medium'
      });
    } catch (err) {
      console.error('Error in creating task:', err);
      setError('Error: Could not create task. Please check the inputs or server.');
    }

    setLoading(false);
  };

  return (
    <div className="card p-4 shadow-sm mb-4">
      <h5 className="mb-3">Create New Task</h5>

      <form onSubmit={handleSubmit}>
        <input
          name="Title"
          placeholder="Title"
          className="form-control mb-2"
          value={form.Title}
          onChange={handleChange}
          required
        />
        <textarea
          name="Description"
          placeholder="Description"
          className="form-control mb-2"
          value={form.Description}
          onChange={handleChange}
        />
        <input
          type="date"
          name="DueDate"
          className="form-control mb-2"
          value={form.DueDate}
          onChange={handleChange}
          required
        />
        <select
          name="Priority"
          className="form-control mb-3"
          value={form.Priority}
          onChange={handleChange}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <button className="btn btn-success w-100" disabled={loading}>
          {loading ? 'Creating Task...' : 'Submit'}
        </button>
      </form>

      {successMsg && (
        <div className="alert alert-success mt-3">{successMsg}</div>
      )}

      {error && (
        <div className="alert alert-danger mt-3">{error}</div>
      )}

      {lastCreatedId && (
        <div className="alert alert-info mt-2">
          Task Created with ID: <strong>{lastCreatedId}</strong>
        </div>
      )}
    </div>
  );
};

export default CreateTaskForm;