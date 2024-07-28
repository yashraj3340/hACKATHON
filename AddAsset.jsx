import React, { useState } from "react";
import axios from "axios";

function AddAsset() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [department, setDepartment] = useState("");
  const [address, setAddress] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const asset = {
      name,
      type,
      department,
      address,
      purchaseDate,
      purchasePrice: Number(purchasePrice),
    };

    axios
      .post("http://localhost:5000/api/assets/add", asset)
      .then((res) => {
        console.log(res.data);
        // Clear form or redirect
      })
      .catch((err) => console.log("Error: " + err));
  };

  return (
    <div>
      <h3>Add New Asset</h3>
      <form onSubmit={onSubmit}>
        {/* ... other form fields ... */}
        <div className="form-group">
          <label>Address: </label>
          <input
            type="text"
            required
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        {/* ... other form fields ... */}
        <div className="form-group">
          <input type="submit" value="Add Asset" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}

export default AddAsset;
