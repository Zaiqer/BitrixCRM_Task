import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";

// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation);

function LeadList() {
  const [leads, setLeads] = useState([]);
  const navigate = useNavigate();

  const fetchLeads = async () => {
    const webhookUrl =
      "https://b24-u0y45w.bitrix24.com/rest/1/561xqejtky8rtmoh/crm.lead.list.json";

    const requestBody = {
      select: ["ID", "TITLE", "NAME", "SECOND_NAME", "PHONE"],
    };

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (data.result) {
        setLeads(data.result);
      } else {
        alert("Error: " + data.error_description);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Lead silmək
  const deleteLead = async (id) => {
    const webhookUrl = `https://b24-u0y45w.bitrix24.com/rest/1/561xqejtky8rtmoh/crm.lead.delete.json?id=${id}`;

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (data.result) {
        alert(`Lead with ID ${id} deleted successfully.`);
        setLeads((prevLeads) => prevLeads.filter((lead) => lead.ID !== id)); // Siyahını yenilə
      } else {
        alert("Error: " + data.error_description);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleUpdate = (id) => {
    navigate(`/update-lead?id=${id}`);
  };

  return (
    <div>
      <h2 className="col-12 m-5 text-center">Leads List</h2>
      <div className="container mt-5">
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-primary mb-3"
            onClick={() => navigate("/add-lead")}
          >
            <i className="fa-solid fa-plus fa-fade"></i> Add Lead
          </button>
        </div>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Title</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Operations</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.ID}>
                <th scope="row">{lead.ID}</th>
                <td>{lead.TITLE}</td>
                <td>{lead.NAME}</td>
                <td>{lead.SECOND_NAME}</td>
                <td>
                  {lead.PHONE && lead.PHONE.length > 0
                    ? lead.PHONE.map((phone) => phone.VALUE).join(", ")
                    : "No Phone"}
                </td>
                <td>
                  <lord-icon
                    src="https://cdn.lordicon.com/wkvacbiw.json"
                    trigger="hover"
                    colors="primary:#c7c116"
                    style={{ height: "40px", width: "40px" }}
                    onClick={() => handleUpdate(lead.ID)}
                  ></lord-icon>
                  <lord-icon
                    src="https://cdn.lordicon.com/skkahier.json"
                    trigger="hover"
                    colors="primary:#c71f16"
                    style={{ marginLeft: "5px", height: "40px", width: "40px" }}
                    onClick={() => {
                      if (
                        window.confirm(
                          `Are you sure you want to delete Lead ID ${lead.ID}?`
                        )
                      ) {
                        deleteLead(lead.ID);
                      }
                    }}
                  ></lord-icon>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeadList;
