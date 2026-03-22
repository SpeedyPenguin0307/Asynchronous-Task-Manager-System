import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssignTaskForm = ({ role, creatorId }) => {
  const [form, setForm] = useState({
    TaskID: '',
    EmployeeID: ''
  });
  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Fetching valid assignable employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get(`/api/employees/assignable?role=${role}`);
        setEmployees(res.data);
      } catch (err) {
        console.error('Error fetching employees:', err);
        setError('Failed to fetch employees');
      }
    };

    fetchEmployees();
  }, [role]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
        await axios.post('http://localhost:3000/api/assignments', { ...form, AssignedBy: creatorId });
      setMessage('✅ Task assigned successfully');
      setForm({ TaskID: '', EmployeeID: '' });
    } catch (err) {
      console.error('Error in assigning task:', err);
      setError('❌ Error in assigning task. Please check IDs.');
    }
  };

  return (
    <div className="card p-4 shadow-sm mb-4">
      <h5 className="mb-3">Assign Task</h5>

      <form onSubmit={handleSubmit}>
        <input
          name="TaskID"
          placeholder="Task ID"
          className="form-control mb-2"
          value={form.TaskID}
          onChange={handleChange}
          required
        />

        <select
          name="EmployeeID"
          className="form-control mb-3"
          value={form.EmployeeID}
          onChange={handleChange}
          required
        >
          <option value="">Select Employee to Assign Task</option>
          {employees.map((emp) => (
            <option key={emp.EmployeeID} value={emp.EmployeeID}>
              {emp.EmployeeID} - {emp.EmployeeName}
            </option>
          ))}
        </select>

        <button className="btn btn-warning w-100">Assign</button>
      </form>

      {message && <div className="alert alert-success mt-3">{message}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default AssignTaskForm;