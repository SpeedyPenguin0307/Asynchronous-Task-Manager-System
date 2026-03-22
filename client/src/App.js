import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import TaskList from './components/TaskList';
import CreateTaskForm from './components/CreateTaskForm';
import AssignTaskForm from './components/AssignTaskForm';
import UpdateTaskForm from './components/UpdateTaskForm';

// Role-specific icons
const roleIcons = {
  'Upper Senior Manager': '🏛️',
  'Senior Manager': '🧑‍💼',
  'Manager': '🗂️',
  'Employee': '🧑‍💻',
};

const welcomeMessages = {
  'Upper Senior Manager': 'You have full access across all roles.',
  'Senior Manager': 'You can manage managers and employees.',
  'Manager': 'You can manage tasks for employees.',
  'Employee': 'You can view and complete your tasks.',
};

const getBadgeClass = (role) => {
  switch (role) {
    case 'Upper Senior Manager': return 'bg-danger';
    case 'Senior Manager': return 'bg-warning text-dark';
    case 'Manager': return 'bg-info text-dark';
    default: return 'bg-secondary';
  }
};

const getGradientStyle = (role) => {
  switch (role) {
    case 'Upper Senior Manager': return 'linear-gradient(135deg, #ff4e50, #f9d423)';
    case 'Senior Manager': return 'linear-gradient(135deg, #ffb347, #ffcc33)';
    case 'Manager': return 'linear-gradient(135deg, #36d1dc, #5b86e5)';
    default: return 'linear-gradient(135deg, #a1c4fd, #c2e9fb)';
  }
};

function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    if (user) {
      if (user.role === 'Employee') {
        setCurrentPage('mytasks');
      } else {
        setCurrentPage('alltasks');
      }
    }
  }, [user]);

  if (!user) return <LoginPage onLogin={setUser} />;

  const isPrivileged = user.role !== 'Employee';

  return (
    <div className="min-vh-100" style={{ background: getGradientStyle(user.role) }}>
      <div className="container py-5">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="mb-0 text-white">
            Welcome, {user.name}
            <span className={`badge ms-2 ${getBadgeClass(user.role)}`} title={welcomeMessages[user.role]}>
              {roleIcons[user.role]} {user.role}
            </span>
          </h4>
          <button className="btn btn-outline-light" onClick={() => setUser(null)}>
            Logout
          </button>
        </div>

        <p className="text-white-50 mb-4">{welcomeMessages[user.role]}</p>

        {/* Navigation Tabs */}
        <div className="mb-3">
          <button className="btn btn-light btn-sm me-2" onClick={() => setCurrentPage('mytasks')}>
            📋 My Tasks
          </button>

          {isPrivileged && (
            <>
              <button className="btn btn-light btn-sm me-2" onClick={() => setCurrentPage('alltasks')}>
                📚 All Tasks
              </button>
              <button className="btn btn-light btn-sm me-2" onClick={() => setCurrentPage('create')}>
                ✏️ Create
              </button>
              <button className="btn btn-light btn-sm me-2" onClick={() => setCurrentPage('assign')}>
                📤 Assign
              </button>
              <button className="btn btn-light btn-sm" onClick={() => setCurrentPage('update')}>
                🔄 Update
              </button>
            </>
          )}
        </div>

        {/* Dynamic Views */}
        {currentPage === 'mytasks' && <TaskList userId={user.employeeId} onlyUser={true} />}
        {currentPage === 'alltasks' && isPrivileged && <TaskList userId={user.employeeId} onlyUser={false} createdView={true} />}
        {currentPage === 'create' && isPrivileged && <CreateTaskForm creatorId={user.employeeId} />}
        {currentPage === 'assign' && isPrivileged && <AssignTaskForm role={user.role} creatorId={user.employeeId} />}
        {currentPage === 'update' && isPrivileged && <UpdateTaskForm role={user.role} />}
      </div>
    </div>
  );
}

export default App;
