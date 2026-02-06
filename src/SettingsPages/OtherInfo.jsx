import { Box, TextField, Typography, MenuItem, Button } from "@mui/material";
import { useState } from "react";

const OtherInfo = () => {
  const [form, setForm] = useState({});
  const [docInput, setDocInput] = useState({
    type: "",
    file: null,
  });
  const [documents, setDocuments] = useState([]);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const textOnly = ["emgName", "emgRelation", "altContactName"];
    if (textOnly.includes(name)) {
      if (!/^[a-zA-Z ]*$/.test(value)) return;
    }

    /* PHONE NUMBER – exactly 10 digits */
    if (name === "emgPhone") {
      if (!/^\d{0,10}$/.test(value)) return;
    }

    /* EMAIL VALIDATION */
    if (name === "altEmail") {
      if (!/^[a-zA-Z ]*$/.test(value)) return;
    }
    if (name === "type") {
      setDocInput({ ...docInput, type: value });
    }
    if (name === "file") {
      const file = files[0];
      if (!file) return;

      const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/jpg",
      ];

      if (!allowedTypes.includes(file.type)) return;

      setDocInput({ ...docInput, file });
      return;
    }

    setForm({ ...form, [name]: value });
  };
  const addDoc = () => {
    if (!docInput.type || !docInput.file) return;
    setDocuments([
      ...documents,
      {
        type: docInput.type,
        file: docInput.file,
      },
    ]);
    setDocInput({ type: "", file: null });
  };
  return (
    <>
      {/* OTHER INFO */}
      <Typography variant="h8" sx={{ mb: 3, letterSpacing: 1.5 }}>
        Other Info
      </Typography>

      <Box sx={{ display: "flex", gap: 3, mt: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Document Type
          </Typography>
          <TextField
            select
            fullWidth
            name="type"
            onChange={handleChange}
            value={docInput.type}
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="aadhaar">Aadhaar</MenuItem>
            <MenuItem value="pan">PAN</MenuItem>
            <MenuItem value="passport">Passport</MenuItem>
          </TextField>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Upload Document
          </Typography>
          <TextField
            type="file"
            fullWidth
            name="file"
            onChange={handleChange}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: " flex-start",
          alignContent: "center",
          mt: 3,
          mb: 3,
        }}
      >
        <Button variant="black-Size" onClick={addDoc}>
          {" "}
          Add Doc..
        </Button>
      </Box>
      {documents.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Uploaded Documents
          </Typography>
          {documents.map((doc, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 1.5,
                mb: 1,
                border: "1px solid #ddd",
                borderRadius: "10px",
              }}
            >
              {" "}
              <Typography>{doc.type}</Typography>
              <Typography>{doc.file.name}</Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* EMERGENCY CONTACT */}
      <Typography variant="h8" sx={{ mt: 4, mb: 3, letterSpacing: 1.5 }}>
        Emergency Contact
      </Typography>

      <Box sx={{ display: "flex", gap: 3, mt: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Name
          </Typography>
          <TextField
            fullWidth
            placeholder="e.g. Rahul Sharma"
            name="emgName"
            value={form.emgName || ""}
            onChange={handleChange}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Relation
          </Typography>
          <TextField
            fullWidth
            placeholder="e.g. Brother"
            value={form.emgRelation || ""}
            name="emgRelation"
            onChange={handleChange}
          />
        </Box>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Phone Number
        </Typography>
        <TextField
          fullWidth
          placeholder="e.g. 9876543210"
          value={form.emgPhone || ""}
          name="emgPhone"
          onChange={handleChange}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        {/* ALTERNATE CONTACT */}
        <Typography variant="h8" sx={{ letterSpacing: 1.5 }}>
          Alternate Contact
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 3, mt: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Alternate Email
          </Typography>
          <TextField
            fullWidth
            placeholder="e.g. alt@email.com"
            value={form.altEmail || ""}
            name="altEmail"
            onChange={handleChange}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Contact Person Name
          </Typography>
          <TextField
            fullWidth
            placeholder="e.g. Amit Verma"
            name="altContactName"
            value={form.altContactName || ""}
            onChange={handleChange}
          />
        </Box>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Alternate Address
        </Typography>
        <TextField
          fullWidth
          // multiline
          // rows={3}
          placeholder="Enter full address"
          value={form.altAddress || ""}
          name="altAddress"
          onChange={handleChange}
        />
      </Box>

      <Box sx={{ mt: 3 }}>
        <Button variant="black-Size">Save</Button>
      </Box>
    </>
  );
};

export default OtherInfo;
