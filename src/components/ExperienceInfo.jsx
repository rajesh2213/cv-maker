import InputGroup from "./InputGroup";

export default function ExperienceInfo({
  data,
  isExpanded,
  toggleExpand,
  handleInputChange,
  handleSave,
  handleEdit,
  handleDelete,
  handleAdd
}) {
  return (
    <div className="experience-section">
      <div className="section-header" onClick={toggleExpand}>
        <h2>Experience</h2>
        <button className="expand-btn">{isExpanded ? "▼" : "►"}</button>
      </div>
      {isExpanded && (
        <div className="item-container">
          {data.map((experience) => (
            <div key={experience.id} className="experience-item">
              {experience.isEditable ? (
                <form>
                  <InputGroup
                    label="Company"
                    type="text"
                    id="company"
                    name="company"
                    value={experience.company}
                    onChange={(e) =>
                      handleInputChange(
                        experience.id,
                        "company",
                        e.target.value
                      )
                    }
                    required="true"
                  />
                  <InputGroup
                    label="Position"
                    type="text"
                    id="position"
                    name="position"
                    value={experience.position}
                    onChange={(e) =>
                      handleInputChange(
                        experience.id,
                        "position",
                        e.target.value
                      )
                    }
                    required="false"
                  />
                  <InputGroup
                    label="From"
                    type="date"
                    id="fromDate"
                    name="fromDate"
                    value={experience.fromDate}
                    onChange={(e) =>
                      handleInputChange(
                        experience.id,
                        "fromDate",
                        e.target.value
                      )
                    }
                    required="false"
                  />
                  <InputGroup
                    label="To"
                    type="date"
                    id="toDate"
                    name="toDate"
                    value={experience.toDate}
                    onChange={(e) =>
                      handleInputChange(experience.id, "toDate", e.target.value)
                    }
                    required="false"
                  />
                  <InputGroup
                    label="Description"
                    type="text"
                    id="description"
                    name="description"
                    value={experience.description}
                    onChange={(e) =>
                      handleInputChange(
                        experience.id,
                        "description",
                        e.target.value
                      )
                    }
                    required="false"
                  />
                  <button
                    className="save-btn"
                    onClick={() => handleSave(experience.id)}
                  >
                    Save
                  </button>
                </form>
              ) : (
                <>
                  <p><span>Company: </span> <span>{experience.company}</span></p>
                  <p><span>Position: </span> <span>{experience.position}</span></p>
                  <p>{experience.fromDate} - {experience.toDate}</p>
                  <p><span>Description: </span> <span>{experience.description}</span></p>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(experience.id)}
                  >
                    Edit
                  </button>
                </>
              )}
              <button
                className="delete-btn"
                onClick={() => handleDelete(experience.id)}
              >
                Delete
              </button>
            </div>
          ))}
          <button className="add-btn" onClick={handleAdd}>Add</button>
        </div>
      )}
    </div>
  );
}
