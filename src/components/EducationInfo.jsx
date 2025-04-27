import InputGroup from "./InputGroup";
import {FaSave, FaEdit, FaTrash } from "react-icons/fa";

const EducationInfo = ({
  data,
  isExpanded,
  toggleExpand,
  handleInputChange,
  handleEdit,
  handleSave,
  handleDelete,
  handleAdd
}) => {
  return (
    <div className="educational-section">
      <div className="section-header" onClick={toggleExpand}>
        <h2>Education</h2>
        <button className="expand-btn">{isExpanded ? "▼" : "►"}</button>
      </div>
        <div className={`item-container ${isExpanded ? 'expanded': ""}`}>
          {data.map((education) => (
            <div key={education.id} className="education-item">
              {education.isEditable ? (
                <form>
                  <InputGroup
                    label="Institution"
                    type="text"
                    id="institution"
                    name="institution"
                    value={education.institution}
                    onChange={(e) => handleInputChange(
                        education.id,
                      "institution",
                      e.target.value
                    )}
                    required="true"
                  />
                  <InputGroup
                    label="Degree"
                    type="text"
                    id="degree"
                    name="degree"
                    value={education.degree}
                    onChange={(e) => handleInputChange(
                        education.id,
                      "degree",
                      e.target.value
                    )}
                    required="false"
                  />
                  <InputGroup
                    label="From"
                    type="date"
                    id="fromDate"
                    name="fromDate"
                    value={education.fromDate}
                    onChange={(e) => handleInputChange(
                        education.id,
                      "fromDate",
                      e.target.value
                    )}
                    required="false"
                  />
                  <InputGroup
                    label="To"
                    type="date"
                    id="toDate"
                    name="toDate"
                    value={education.toDate}
                    onChange={(e) => handleInputChange(
                        education.id,
                      "toDate",
                      e.target.value
                    )}
                    required="false"
                  />
                  <button className="save-btn" onClick={()=>handleSave(education.id)}>
                    <FaSave/>
                  </button>
                </form>
              ) : (
                <>
                  <p><span>Institution: </span> <span>{education.institution}</span></p>
                  <p><span>Degree: </span> <span>{education.degree}</span></p>
                  <div className="btn-container">
                    <button className="edit-btn" onClick={()=>handleEdit(education.id)}>
                          <FaEdit /> 
                        </button>
                    <button className="delete-btn" onClick={()=>handleDelete(education.id)}>
                    <FaTrash /> 
                    </button>
              </div>
                </>
              )}
              <div className="btn-container">
              <button className="delete-btn" onClick={()=>handleDelete(education.id)}>
              <FaTrash /> 
              </button>
              </div>
            </div>
          ))}
          <button className="add-btn" onClick={handleAdd}>Add</button>
        </div>
    </div>
  );
};

export default EducationInfo;
