import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

function UpdateLead() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const leadId = searchParams.get("id");

  const [leadFields, setLeadFields] = useState({
    TITLE: "",
    NAME: "",
    SECOND_NAME: "",
    PHONE: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const fetchLead = async () => {
    const webhookUrl = `https://b24-u0y45w.bitrix24.com/rest/1/561xqejtky8rtmoh/crm.lead.get.json?id=${leadId}`;

    try {
      const response = await fetch(webhookUrl);
      const data = await response.json();
      if (data.result) {
        setLeadFields({
          TITLE: data.result.TITLE || "",
          NAME: data.result.NAME || "",
          SECOND_NAME: data.result.SECOND_NAME || "",
          PHONE: data.result.PHONE?.[0]?.VALUE || "",
        });
      } else {
        alert("Error: " + data.error_description);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (leadId) {
      fetchLead();
    }
  }, [leadId]);

  const handleFieldChange = (field, value) => {
    setLeadFields((prevFields) => ({
      ...prevFields,
      [field]: value,
    }));
  };

  const updateLead = async () => {
    setIsLoading(true);
    const webhookUrl =
      "https://b24-u0y45w.bitrix24.com/rest/1/561xqejtky8rtmoh/crm.lead.update.json";

    const requestBody = {
      id: leadId,
      fields: {
        TITLE: leadFields.TITLE,
        NAME: leadFields.NAME,
        SECOND_NAME: leadFields.SECOND_NAME,
        PHONE: leadFields.PHONE
          ? [{ VALUE: leadFields.PHONE, VALUE_TYPE: "WORK" }]
          : [],
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
        alert("Lead updated successfully.");
        navigate("/lead-list");
      } else {
        alert("Error: " + data.error_description);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Update Lead</h2>
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
              value={leadFields.TITLE}
              onChange={(e) => handleFieldChange("TITLE", e.target.value)}
              placeholder="Enter new title"
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
              value={leadFields.NAME}
              onChange={(e) => handleFieldChange("NAME", e.target.value)}
              placeholder="Enter new name"
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
              value={leadFields.SECOND_NAME}
              onChange={(e) => handleFieldChange("SECOND_NAME", e.target.value)}
              placeholder="Enter new second name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="leadPhone" className="form-label">
              Phone:
            </label>
            <input
              type="text"
              id="leadPhone"
              className="form-control"
              value={leadFields.PHONE}
              onChange={(e) => handleFieldChange("PHONE", e.target.value)}
              placeholder="Enter new phone number"
            />
          </div>
          <button
            onClick={updateLead}
            className="btn btn-primary w-100"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Lead"}
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

export default UpdateLead;
