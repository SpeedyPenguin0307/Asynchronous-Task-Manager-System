import React, { useState } from 'react';
import axios from 'axios';

const UpdateTaskForm = () => {
  const [form, setForm] = useState({
    TaskID: '',
    Title: '',
    Description: '',
    Status: '',
    DueDate: '',
    Priority: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    setLoading(true);

    try {
      await axios.put(`/api/tasks/${form.TaskID}`, form);
      setSuccessMessage('✅ Task updated successfully!');
      setForm({
        TaskID: '',
        Title: '',
        Description: '',
        Status: '',
        DueDate: '',
        Priority: ''
      });
    } catch (err) {
      console.error('Error:', err);
      setErrorMessage('❌ Failed to update task. Please check the Task ID and try again.');
    }

    setLoading(false);
  };

  return (
    <div className="card p-4 shadow-sm mb-4">
      <h5 className="mb-3">Update Task</h5>

      <form onSubmit={handleSubmit}>
        <input
          name="TaskID"
          placeholder="Task ID"
          className="form-control mb-2"
          value={form.TaskID}
          onChange={handleChange}
          required
        />
        <input
          name="Title"
          placeholder="Title"
          className="form-control mb-2"
          value={form.Title}
          onChange={handleChange}
        />
        <textarea
          name="Description"
          placeholder="Description"
          className="form-control mb-2"
          value={form.Description}
          onChange={handleChange}
        />
        <input
          name="DueDate"
          type="date"
          className="form-control mb-2"
          value={form.DueDate}
          onChange={handleChange}
        />
        <select
          name="Status"
          className="form-control mb-2"
          value={form.Status}
          onChange={handleChange}
        >
          <option value="">-- Select Status --</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <select
          name="Priority"
          className="form-control mb-2"
          value={form.Priority}
          onChange={handleChange}
        >
          <option value="">-- Select Priority --</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <button className="btn btn-info w-100" disabled={loading}>
          {loading ? 'Updating...' : 'Update'}
        </button>
      </form>

      {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
    </div>
  );
};

export default UpdateTaskForm;
