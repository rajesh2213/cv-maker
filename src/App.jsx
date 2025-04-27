import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./styles/App.css";
import GeneralInfo from "./components/GeneralInfo";
import EducationInfo from "./components/EducationInfo";
import ExperienceInfo from "./components/ExperienceInfo";
import Cv from "./components/Cv";

function App() {
  //State for General info
  const [generalInfo, setGeneralInfo] = useState({
    name: "User Name",
    email: "email@email.com",
    phone: "1234567890",
    isEditable: true,
  });

  const handleGeneralInputChange = (field, value) => {
    setGeneralInfo((prevInfo) => ({
      ...prevInfo,
      [field]: value,
    }));
  };

  // State for educational data
  const [educationData, setEducationData] = useState([
    {
      id: "edu_sample1",
      institution: "ABC University",
      degree: "B.Sc. Computer Science",
      fromDate: "2023-05-15",
      toDate: "2027-05-15",
      isEditable: false,
    },
    {
      id: "edu_sample2",
      institution: "XYZ High School",
      degree: "High School Diploma",
      fromDate: "2019-06-10",
      toDate: "2023-05-15",
      isEditable: false,
    },
  ]);

  //Experience data
  const [experienceData, setExperienceData] = useState([
    {
      id: "exp_sample1",
      company: "Tech Solutions Inc.",
      position: "Software Engineer",
      fromDate: "2021-06-01",
      toDate: "2023-08-31",
      description:
        "Developed and maintained web applications using React and Node.js.",
      isEditable: false,
    },
    {
      id: "exp_sample2",
      company: "Innovatech Corp.",
      position: "Junior Developer",
      fromDate: "2019-09-01",
      toDate: "2021-05-31",
      description:
        "Assisted in building and testing software solutions for clients.",
      isEditable: false,
    },
  ]);

  // State for managing expand/collapse and edit mode
  const [isExpanded, setIsExpanded] = useState({
    font: false,
    education: false,
    experience: false,
  });

  const toggleExpand = (section) => {
    setIsExpanded((prevExpand) => ({
      ...prevExpand,
      [section]: !prevExpand[section],
    }));
  };

  console.log(`educational data : `);
  console.log(educationData);

  useEffect(() => {
    console.log(`Updated Expand State:`, isExpanded);
  }, [isExpanded]);

  const handleEdit = (section, id) => {
    console.log("handleEdit", section, id);
    if (section === "education") {
      updateState(educationData, setEducationData, id, true);
    } else if (section === "experience") {
      updateState(experienceData, setExperienceData, id, true);
    }
  };

  const handleSave = (section, id) => {
    if (section === "education") {
      updateState(educationData, setEducationData, id, false);
    } else if (section === "experience") {
      updateState(experienceData, setExperienceData, id, false);
    }
  };

  const updateState = (data, setData, id, editable) => {
    const updatedData = data.map((item) => {
      return item.id == id ? { ...item, isEditable: editable } : item;
    });
    setData(updatedData);
  };

  const handleDelete = (section, id) => {
    if (section === "education") {
      const updatedData = educationData.filter(
        (education) => education.id != id
      );
      setEducationData(updatedData);
    } else if (section === "experience") {
      const updatedData = experienceData.filter(
        (experience) => experience.id != id
      );
      setExperienceData(updatedData);
    }
  };

  const handleAdd = (section) => {
    switch (section) {
      case "education": {
        const newData = {
          id: `edu_${Date.now()}`,
          institution: "",
          degree: "",
          fromDate: "",
          toDate: "",
          isEditable: true,
        };
        setEducationData([...educationData, newData]);
        break;
      }
      case "experience": {
        const newData = {
          id: `exp_${Date.now()}`,
          company: "",
          position: "",
          fromDate: "",
          toDate: "",
          description: "",
          isEditable: true,
        };
        setExperienceData([...experienceData, newData]);
        break;
      }
    }
  };

  const handleInputChange = (section, id, field, value) => {
    switch (section) {
      case "education": {
        const updatedData = educationData.map((education) => {
          return education.id == id
            ? { ...education, [field]: value }
            : education;
        });
        setEducationData(updatedData);
        break;
      }
      case "experience": {
        const updatedData = experienceData.map((experience) => {
          return experience.id == id
            ? { ...experience, [field]: value }
            : experience;
        });
        setExperienceData(updatedData);
        break;
      }
    }
  };

  const [selectedFont, setSelectedFont] = useState("Arial");

  const handleFontChange = (event) => {
    setSelectedFont(event.target.value);
  };

  const handleClearBtn = () => {
    setGeneralInfo({
      name: "",
      email: "",
      phone: "",
    });
    setEducationData([]);
    setExperienceData([]);
  };

  const handleDownloadBtn = async () => {
    const cvElement = document.querySelector(".cv-container"); // Target the CV container
    if (!cvElement) return;

    // Capture the CV as an image using html2canvas
    const canvas = await html2canvas(cvElement, { scale: 2 }); // Higher scale for better quality
    const imgData = canvas.toDataURL("image/png");

    // Create a PDF using jsPDF
    const pdf = new jsPDF("portrait", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    let pdfName = `cv_${generalInfo.name}_${Date.now()}`;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(pdfName); // Save the PDF with the name "cv.pdf"
  };

  return (
    <>
      <header>
        <h1>Makr</h1>
      </header>
      <main>
        <div className="left-section">
          <div className="left-btn-section">
            <button className="clear-btn" onClick={handleClearBtn}>
              Clear
            </button>
            <button className="download-btn" onClick={handleDownloadBtn}>
              Download
            </button>
          </div>
          <div className="font-section">
            <div className="section-header" onClick={() => toggleExpand("font")}>
              <h2>Font</h2>
              <button className="expand-btn">{isExpanded["font"] ? "▼" : "►"}</button>
            </div>
            <div className={`font-item ${isExpanded["font"] ? "expanded" : ""}`}>
              <label htmlFor="font-select">Choose a font: </label>
              <select
                id="font-select"
                value={selectedFont}
                onChange={handleFontChange}
              >
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier New">Courier New</option>
                <option value="Georgia">Georgia</option>
                <option value="Verdana">Verdana</option>
              </select>
            </div>
          </div>
          <GeneralInfo
            data={generalInfo}
            handleInputChange={handleGeneralInputChange}
          />
          <EducationInfo
            data={educationData}
            isExpanded={isExpanded["education"]}
            toggleExpand={() => toggleExpand("education")}
            handleInputChange={(id, field, value) =>
              handleInputChange("education", id, field, value)
            }
            handleEdit={(id) => handleEdit("education", id)}
            handleSave={(id) => handleSave("education", id)}
            handleDelete={(id) => handleDelete("education", id)}
            handleAdd={() => handleAdd("education")}
          />
          <ExperienceInfo
            data={experienceData}
            isExpanded={isExpanded["experience"]}
            toggleExpand={() => toggleExpand("experience")}
            handleInputChange={(id, field, value) => {
              handleInputChange("experience", id, field, value);
            }}
            handleEdit={(id) => handleEdit("experience", id)}
            handleSave={(id) => handleSave("experience", id)}
            handleDelete={(id) => handleDelete("experience", id)}
            handleAdd={() => handleAdd("experience")}
          />
        </div>
        <div className="right-section">
          <Cv
            generalInfo={generalInfo}
            educationData={educationData}
            experienceData={experienceData}
            selectedFont={selectedFont} // Pass selected font to Cv
          />
        </div>
      </main>
    </>
  );
}

export default App;
