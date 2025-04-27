import InputGroup from "./InputGroup";

export default function GeneralInfo({ data, handleInputChange }) {
  const handleSubmit = (e) => {
    console.log("submitting form");
    e.preventDefault();
    const form = e.target;
    const nameInput = form.elements.name;
    const emailInput = form.elements.email;
    const phoneInput = form.elements.phone;
    let isValid = true;

    if (nameInput.value === "" || nameInput.value.length < 4) {
      nameInput.setCustomValidity(
        "Name is required and must be at least 4 characters long"
      );
      isValid = false;
    }

    if (emailInput.value === "" || !emailInput.value.includes("@")) {
      emailInput.setCustomValidity("Please enter a valid email address");
      isValid = false;
    }

    if (!/^\d{10}$/.test(phoneInput.value)) {
      phoneInput.setCustomValidity("Please enter a valid phone number");
      isValid = false;
    }

    if (!isValid) {
      form.reportValidity();
      return;
    }

    handleInputChange("isEditable", false);
  };

  const handleClearValidity = (e) => {
    e.target.setCustomValidity("");
  };

  return (
    <div className="personal-section">
      <div className="section-header">
        <h2>Personal Info</h2>
      </div>
      <div className="item-container">
        {data.isEditable ? (
            <div className="personal-item">
          <form onSubmit={handleSubmit}>
            <InputGroup
              label="Name"
              type="text"
              id="name"
              name="name"
              value={data.name}
              placeholder="Enter your name"
              onChange={(e) => {
                handleInputChange("name", e.target.value);
                handleClearValidity(e);
              }}
              required
            />
            <InputGroup
              label="Email"
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={(e) => {
                handleInputChange("email", e.target.value);
                handleClearValidity(e);
              }}
              required
            />
            <InputGroup
              label="Phone No"
              type="tel"
              id="phone"
              name="phone"
              value={data.phone}
              onChange={(e) => {
                handleInputChange("phone", e.target.value);
                handleClearValidity(e);
              }}
              required
            />
            <button type="submit" className="save-btn">
              Save
            </button>
          </form>
          </div>
        ) : (
          <div className="personal-item">
            <p><span>Name: </span> {data.name}</p>
            <p><span>Email: </span>{data.email}</p>
            <p><span>Phone: </span>{data.phone}</p>
            <button onClick={() => handleInputChange("isEditable", true)}>
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
