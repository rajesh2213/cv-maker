import React from "react";

export default function Cv({
  generalInfo,
  educationData,
  experienceData,
  selectedFont,
}) {
  return (
    <div className="cv-container" style={{ fontFamily: selectedFont }}>
      <div className="cv-personal-section">
        <h1>{generalInfo.name}</h1>
        <p>
          {generalInfo.phone} | {generalInfo.email}
        </p>
      </div>
      <div className="cv-educational-section">
        <h2 className="cv-section-header">Education</h2>
        {educationData.map((education) => {
          return (
            <div key={education.id} className="cv-education-item">
              <div className="education-info">
                <h3>{education.degree}</h3>
                <p>{education.institution}</p>
              </div>
              {(education.fromDate || education.toDate) && (
                <div className="education-time">
                  <p>
                    {education.fromDate} - {education.toDate}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="cv-experience-section">
        <h2 className="cv-section-header">Experience</h2>
        {experienceData.map((experience) => {
          return (
            <div key={experience.id} className="cv-experience-item">
              <div className="experience-info">
                <h3>{experience.position}</h3>
                <p>{experience.company}</p>
              </div>
              {(experience.fromDate || experience.toDate) && (
                <div className="experience-time">
                  <p>
                    {experience.fromDate} - {experience.toDate}
                  </p>
                </div>
              )}
              {experience.description && <p>{experience.description}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}