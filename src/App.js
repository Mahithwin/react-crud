import { useEffect, useState } from "react";
import UserForm from "./components/UserForm";
import { getUsers, createUser, deleteUser, updateUser } from "./api/userApi";

function App() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  const handleOpenModal = (user = null) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

const handleSubmit = async (data) => {
  // Use destructuring to pull 'id' out and keep the 'rest'
  const { id, ...cleanData } = data; 

  try {
    if (selectedUser) {
      // id goes in the URL, cleanData goes in the body
      await updateUser(selectedUser.id, cleanData);
    } else {
      await createUser(cleanData);
    }
    fetchUsers();
    handleCloseModal();
  } catch (err) {
    console.error("Detailed Error:", err.response?.data);
  }
};



  // Change this line in your App.js
const handleDelete = async (id) => {
  // Use window.confirm to satisfy the linter, 
  // or better yet, build a custom modal for this later!
  const confirmed = window.confirm("Are you sure you want to delete this user?");
  
  if (confirmed) {
    await deleteUser(id);
    fetchUsers();
  }
};

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="brand"><span>Users</span></div>
        <button className="add-btn" onClick={() => handleOpenModal()}>
          <span>+</span> New User
        </button>
      </nav>


<div className="table-wrapper">
  <table className="user-table">
    <thead>
      <tr>
        <th>User</th>
        <th>Last Name</th>
        <th>Email Address</th>
        <th>Phone</th>
        <th className="text-right">Actions</th>
      </tr>
    </thead>
    <tbody>
  {users.length > 0 ? (
    users.map((u) => (
      <tr key={u.id} className="table-row">
        <td>
          <div className="user-cell">
            <div className="avatar">{u.firstName ? u.firstName[0] : "?"}</div>
            <span className="full-name">{u.firstName}</span>
          </div>
        </td>
        <td>{u.lastName}</td>
        <td className="email-cell">{u.email}</td>
        <td>{u.phoneNo || "—"}</td>
        <td className="text-right">
          <button className="icon-btn edit" onClick={() => handleOpenModal(u)}>Edit</button>
          <button className="icon-btn delete" onClick={() => handleDelete(u.id)}>Delete</button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5" className="empty-state-cell">
        <div className="empty-content">
          <div className="empty-icon">📂</div>
          <p>No users found in the directory</p>
          <span>Start by adding a new member to your team.</span>
        </div>
      </td>
    </tr>
  )}
</tbody>
  </table>
</div>

      {/* MODAL OVERLAY */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedUser ? "Edit Profile" : "Create Member"}</h3>
              <button className="close-x" onClick={handleCloseModal}>&times;</button>
            </div>
            <UserForm 
              onSubmit={handleSubmit} 
              initialData={selectedUser} // Pass existing data for editing
            />
          </div>
        </div>
      )}

      <style jsx>{`
        .app-container {
          min-height: 100vh;
          background: #fcfcfd;
          padding: 0 5%;
          font-family: 'Inter', system-ui, sans-serif;
        }

        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem 0;
        }

        .brand {
          font-size: 1.5rem;
          font-weight: 800;
          color: #111827;
        }

        .brand span { color: #6366f1; }

        .add-btn {
          background: #111827;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s;
        }

        .add-btn:hover { background: #374151; transform: translateY(-1px); }

        .table-wrapper {
          background: white;
          border-radius: 16px;
          border: 1px solid #f3f4f6;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          overflow: hidden;
        }

        .user-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        th {
          padding: 16px 24px;
          background: #f9fafb;
          color: #6b7280;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .table-row {
          border-bottom: 1px solid #f3f4f6;
          transition: 0.15s;
        }

        .table-row:hover { background: #f9fafb; }

        td { padding: 16px 24px; color: #374151; }

        .user-cell { display: flex; align-items: center; gap: 12px; }

        .avatar {
          width: 32px; height: 32px;
          background: #e0e7ff;
          color: #4338ca;
          border-radius: 8px;
          display: grid; place-content: center;
          font-weight: 700; font-size: 0.8rem;
        }

        .full-name { font-weight: 500; }

        .email-cell { color: #6b7280; font-size: 0.9rem; }

        .text-right { text-align: right; }

        .icon-btn {
          border: none; background: transparent;
          margin-left: 12px; cursor: pointer;
          font-weight: 600; font-size: 0.85rem;
          padding: 6px 12px; border-radius: 6px;
        }

        .edit { color: #4f46e5; }
        .edit:hover { background: #eef2ff; }

        .delete { color: #dc2626; }
        .delete:hover { background: #fef2f2; }

        /* MODAL STYLES */
        .modal-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(4px);
          display: grid; place-content: center;
          z-index: 1000;
          animation: fadeIn 0.2s ease-out;
        }

        .modal-content {
          background: white;
          padding: 24px;
          border-radius: 24px;
          width: 400px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          position: relative;
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .modal-header {
          display: flex; justify-content: space-between;
          align-items: center; margin-bottom: 20px;
        }

        .modal-header h3 { margin: 0; font-size: 1.25rem; color: #111827; }

        .close-x {
          background: none; border: none; font-size: 1.5rem;
          color: #9ca3af; cursor: pointer;
        }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { 
          from { opacity: 0; transform: translateY(20px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
      `}</style>
    </div>
  );
}

export default App;