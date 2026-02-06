import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

const Education = () => {
  const [form, setForm] = useState({});
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const textOnly = [
      "highestQualification",
      "degree",
      "university",
      "achievementTitle",
      "issuedBy",
    ];
    if (textOnly.includes(name)) {
      if (!/^[a-zA-Z ]*$/.test(value)) return;
    }

    // Passing Year & Achievement Year → 4 digit year
    if (name === "passingYear" || name === "achievementYear") {
      if (!/^\d{0,4}$/.test(value)) return;
      const year = Number(value);
      const currentYear = new Date().getFullYear();
      if (value.length === 4 && (year < 1900 || year > currentYear)) return;
    }
    if (name === "educationDocs") {
      const fileList = files;
      if (!fileList) return;

      const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/jpg",
      ];

      for (let file of fileList) {
        if (!allowedTypes.includes(file.type)) return;
      }

      setForm({ ...form, [name]: fileList });
      return;
    }

    setForm({ ...form, [name]: value });
  };
  return (
    <>
      <Typography variant="h8" sx={{ mb: 3, letterSpacing: 1.5 }}>
        Education
      </Typography>

      {/* Highest Qualification + Degree */}
      <Box sx={{ display: "flex", gap: 3, mt: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Highest Qualification
          </Typography>
          <TextField
            fullWidth
            placeholder="e.g. Graduation"
            name="highestQualification"
            value={form.highestQualification || ""}
            onChange={handleChange}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Degree
          </Typography>
          <TextField
            fullWidth
            placeholder="e.g. B.Tech"
            name="degree"
            value={form.degree || ""}
          />
        </Box>
      </Box>

      {/* University + Passing Year */}
      <Box sx={{ display: "flex", gap: 3, mt: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            University / Board
          </Typography>
          <TextField
            fullWidth
            placeholder="e.g. Delhi University"
            name="university"
            onChange={handleChange}
            value={form.university || ""}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Passing Year
          </Typography>
          <TextField
            fullWidth
            placeholder="e.g. 2023"
            name="passingYear"
            onChange={handleChange}
            value={form.passingYear || ""}
          />
        </Box>
      </Box>

      {/* Upload Documents */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Upload Documents
        </Typography>
        <TextField
          type="file"
          fullWidth
          inputProps={{ multiple: !true }}
          name="educationDocs"
          onChange={handleChange}
        />
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
        <Button variant="black-Size">Add New</Button>
      </Box>
      <Typography variant="h8" sx={{ mb: 3, letterSpacing: 1.5 }}>
        Achievements
      </Typography>

      {/* Title */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Title
        </Typography>
        <TextField
          fullWidth
          placeholder="e.g. Employee of the Year"
          name="achievementTitle"
          onChange={handleChange}
          value={form.achievementDescription || ""}
        />
      </Box>

      {/* Description */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Description
        </Typography>
        <textarea
          placeholder="Brief description"
          name="achievementDescription"
          rows={3}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "12px",
            border: "1px solid #d0d5dd",
            padding: "14px 16px",
            fontSize: "14px",
            fontFamily: "inherit",
            outline: "none",
          }}
          // onChange={handleChange}
        />
      </Box>

      {/* Year + Issued By */}
      <Box sx={{ display: "flex", gap: 3, mt: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Year
          </Typography>
          <TextField
            fullWidth
            placeholder="e.g. 2024"
            name="achievementYear"
            value={form.achievementYear || ""}
            onChange={handleChange}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Issued By
          </Typography>
          <TextField
            fullWidth
            placeholder="Company / External"
            name="issuedBy"
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
        <Button variant="black-Size">Add New</Button>
      </Box>
    </>
  );
};

export default Education;
