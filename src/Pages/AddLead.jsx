import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddLead() {
  const [leadName, setLeadName] = useState("");
  const [leadTitle, setLeadTitle] = useState("");
  const [leadSecondName, setLeadSecondName] = useState("");
  const [phone, setPhone] = useState(""); // Yeni state: Telefon nömrəsi
  const navigate = useNavigate();

  const addLead = async () => {
    const webhookUrl =
      "https://b24-u0y45w.bitrix24.com/rest/1/561xqejtky8rtmoh/crm.lead.add.json";

    const requestBody = {
      fields: {
        TITLE: leadTitle,
        NAME: leadName,
        SECOND_NAME: leadSecondName,
        PHONE: [{ VALUE: phone, VALUE_TYPE: "WORK" }], // İstifadəçi tərəfindən daxil edilən telefon nömrəsi
      },
    };

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (data.result) {
        alert("Lead successfully added with ID: " + data.result);
        setLeadName("");
        setLeadTitle("");
        setLeadSecondName("");
        setPhone("");
        navigate("/lead-list");
      } else {
        alert("Error: " + data.error_description);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add New Lead</h2>
      <div className="row justify-content-center">
        <div className="col-md-6 border p-4">
          <div className="mb-3">
            <label htmlFor="leadTitle" className="form-label">
              Title:
            </label>
            <input
              type="text"
              id="leadTitle"
              className="form-control"
              value={leadTitle}
              onChange={(e) => setLeadTitle(e.target.value)}
              placeholder="Enter lead title"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="leadName" className="form-label">
              First Name:
            </label>
            <input
              type="text"
              id="leadName"
              className="form-control"
              value={leadName}
              onChange={(e) => setLeadName(e.target.value)}
              placeholder="Enter lead name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="leadSecondName" className="form-label">
              Last Name:
            </label>
            <input
              type="text"
              id="leadSecondName"
              className="form-control"
              value={leadSecondName}
              onChange={(e) => setLeadSecondName(e.target.value)}
              placeholder="Enter lead second name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone Number:
            </label>
            <input
              type="text"
              id="phone"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter lead phone number"
            />
          </div>
          <button onClick={addLead} className="btn btn-primary w-100">
            Add Lead
          </button>
          <button
            className="btn btn-secondary mt-3"
            onClick={() => navigate("/lead-list")}
          >
            <i className="fa-solid fa-arrow-left fa-fade"></i> Back to list
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddLead;
