import { useState, useEffect } from "react";

function UserForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState({});

  // Sync state when initialData changes (e.g., when clicking a new Edit button)
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({});
    }
  }, [initialData]);



  const handleChange = (name, value) => {
  // If the field is phoneNo, strip all non-digit characters
  if (name === "phoneNo") {
    const numericValue = value.replace(/\D/g, ""); // \D matches anything that is NOT a digit
    setFormData({ ...formData, [name]: numericValue });
  } else {
    setFormData({ ...formData, [name]: value });
  }
};

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
    >
      <div className="inputs">
        <input
          placeholder="First Name"
          value={formData.firstName || ""}
          onChange={(e) => handleChange("firstName", e.target.value)}
          required
          maxLength={30}
        />
        <input
          placeholder="Last Name"
          value={formData.lastName || ""}
          onChange={(e) => handleChange("lastName", e.target.value)}
          required
          maxLength={10}
        />
      <input
    name="phoneNo"
    placeholder="Phone Number (Digits only)"
    type="text" 
    maxLength={10}
    inputMode="numeric" // Triggers number pad on mobile
    pattern="[0-9]*"    // Extra validation for browsers
    value={formData.phoneNo || ""}
    onChange={(e) => handleChange("phoneNo", e.target.value)}
    required
  />
        <input
          placeholder="Email"
          type="email"
          value={formData.email || ""}
          onChange={(e) => handleChange("email", e.target.value)}
          required
          maxLength={30}
        />
      </div>
      <button type="submit" style={{marginTop:"20px"}}>
        {initialData ? "Update Member" : "Create Member"}
      </button>
      
      <style jsx>{`
        .inputs { display: flex; flex-direction: column; gap: 12px; }
        input { 
          padding: 12px; 
          border-radius: 8px; 
          border: 1px solid #e2e8f0; 
          background: #f8fafc;
        }
        button {
          padding: 12px;
          background: #6366f1;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }
      `}</style>
    </form>
  );
}

export default UserForm;