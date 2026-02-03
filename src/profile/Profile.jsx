import {
  Box,
  Paper,
  Typography,
  Avatar,
  Button,
  Grid,
  TextField,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import apiUrl from "../api";

export default function Profile() {
  const [isEdit, setIsEdit] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    joiningDate: "",
    photo: "",
    address: {
      street: "",
      city: "",
      state: "",
      pincode: "",
    },
  });
  console.log("===========p", profile);

  // ================= FETCH PROFILE =================
  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchProfile = async () => {
      try {
        const res = await apiUrl.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = {
          ...res.data,
          // photo: res.data.photo || res.data.photoUrl || "",
        };
        setProfile(data);
        localStorage.setItem("user", JSON.stringify(res.data));
      } catch (err) {
        console.log("Profile fetch error:", err);
      }
    };

    fetchProfile();
  }, []);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= IMAGE CHANGE =================
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setProfile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  // ================= UPDATE PROFILE DATA =================
  const updateProfileData = async () => {
    const token = localStorage.getItem("token");

    const payload = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      phone: profile.phone,
    };

    const res = await apiUrl.put("/users/profile", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  };

  // ================= UPLOAD PROFILE PHOTO =================
  const uploadProfilePhoto = async () => {
    if (!imageFile) return null;

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("photo", imageFile);

    const res = await apiUrl.put("/users/profile/photo", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  };

  // ================= SAVE =================
  const handleSave = async () => {
    try {
      // 1️⃣ update text data
      let updatedProfile = await updateProfileData();

      // 2️⃣ upload image separately
      if (imageFile) {
        const photoRes = await uploadProfilePhoto();
        if (photoRes?.photoUrl) {
          updatedProfile.photo = photoRes.photoUrl;
        }
      }

      // 3️⃣ update state + localStorage
      setProfile(updatedProfile);
      localStorage.setItem("user", JSON.stringify(updatedProfile));

      setIsEdit(false);
      setImageFile(null);
    } catch (err) {
      console.log("Profile update error:", err);
    }
  };

  // ================= ADDRESS STRING =================
  const fullAddress = [
    profile.address?.street,
    profile.address?.city,
    profile.address?.state,
    profile.address?.pincode,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto", mt: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        {/* HEADER */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <Box sx={{ position: "relative" }}>
            <Avatar
              src={
                previewImage
                  ? previewImage
                  : profile?.photo
                    ? `http://192.168.1.48:3000/uploads/${profile?.photo}`
                    : "/default-avatar.png"
              }
              sx={{ width: 72, height: 72 }}
            />
            {isEdit && (
              <IconButton
                component="label"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  background: "#fff",
                  border: "1px solid #ccc",
                }}
              >
                <CameraAltIcon sx={{ fontSize: 16 }} />
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleImageChange}
                />
              </IconButton>
            )}
          </Box>
        </Box>

        <Typography variant="h6" fontWeight={600} mb={3}>
          Personal Information
        </Typography>

        {/* FORM */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              label="First Name"
              name="firstName"
              fullWidth
              disabled={!isEdit}
              value={profile.firstName}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              label="Last Name"
              name="lastName"
              fullWidth
              disabled={!isEdit}
              value={profile.lastName}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              label="Contact No"
              name="phone"
              fullWidth
              disabled={!isEdit}
              value={profile.phone}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField label="Email" fullWidth disabled value={profile.email} />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              label="Department"
              fullWidth
              disabled
              value={profile.department}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              label="Designation"
              fullWidth
              disabled
              value={profile.designation}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              label="Joining Date"
              fullWidth
              disabled
              value={profile.joiningDate}
            />
          </Grid>

          {/* ADDRESS FIELDS */}
          <Grid item xs={12} md={3}>
            <TextField
              label="Street"
              name="street"
              fullWidth
              disabled={!isEdit}
              value={profile.address?.street || ""}
              onChange={(e) =>
                setProfile((prev) => ({
                  ...prev,
                  address: { ...prev.address, street: e.target.value },
                }))
              }
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              label="City"
              name="city"
              fullWidth
              disabled={!isEdit}
              value={profile.address?.city || ""}
              onChange={(e) =>
                setProfile((prev) => ({
                  ...prev,
                  address: { ...prev.address, city: e.target.value },
                }))
              }
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              label="State"
              name="state"
              fullWidth
              disabled={!isEdit}
              value={profile.address?.state || ""}
              onChange={(e) =>
                setProfile((prev) => ({
                  ...prev,
                  address: { ...prev.address, state: e.target.value },
                }))
              }
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              label="Pincode"
              name="pincode"
              fullWidth
              disabled={!isEdit}
              value={profile.address?.pincode || ""}
              onChange={(e) =>
                setProfile((prev) => ({
                  ...prev,
                  address: { ...prev.address, pincode: e.target.value },
                }))
              }
            />
          </Grid>
        </Grid>

        {/* ACTION */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
          {!isEdit ? (
            <Button onClick={() => setIsEdit(true)}>Edit Profile</Button>
          ) : (
            <Button onClick={handleSave}>Save</Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
