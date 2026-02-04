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
import AddIcon from "@mui/icons-material/Add";
import apiUrl from "../api";

export default function Profile() {
  const [isEdit, setIsEdit] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const labelProps = (value) => ({
    shrink: Boolean(value),
    sx: {
      backgroundColor: "background.paper",
      px: 0.5,
    },
  });

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
    if (name === "phone") {
      if (/^\d{0,10}$/.test(value)) {
        setProfile((prev) => ({ ...prev, [name]: value }));
      }
      return;
    }
    // if (name === "pincode") {
    //   if (/^\d{0,6}$/.test(value)) {
    //     setProfile((prev) => ({ ...prev.address, pincode: value }));
    //   }
    //   return;
    // }

    // const textFields = ["firstName", "lastName", "department", "designation"];
    // if (textFields.includes(name)) {
    //   if (/^[a-zA-Z\s]*$/.test(value)) {
    //     setProfile((prev) => ({ ...prev, [name]: value }));
    //   }
    // }
    if (name === "street") {
      if (/^[a-zA-Z0-9\s]*$/.test(value)) {
        setProfile((prev) => ({
          ...prev,
          address: { ...prev.address, street: value },
        }));
      }
    }
    if (name === "joiningDate") {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate <= today) {
        setProfile((prev) => ({ ...prev, joiningDate: value }));
      } else {
        alert("Future date allowed nahi hai ");
      }
      return;
    }

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
  const handleRemove = () => {
    setPreviewImage(null);
    setSelectedImage(null);
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
    <Box
      sx={{
        width: "fit-content",
        mx: "auto",
        mt: 4,
      }}
    >
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        {/* HEADER */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 0 }}>
          <Box sx={{ position: "relative", mb: 0 }}>
            <Avatar
              src={
                previewImage
                  ? previewImage
                  : profile?.photo
                    ? `http://192.168.1.48:3000/uploads/${profile?.photo}`
                    : "/default-avatar.png"
              }
              sx={{ width: 72, height: 72, mb: 0 }}
            />
          </Box>

          {/* <Button variant="Black-outlined" onClick={handleRemove}>
            {" "}
            Remove
          </Button> */}
        </Box>
        <Box
          sx={{
            display: "flex",
            // alignItems: "center",
            gap: 3,
            // justifyContent: "flex-end",
            mt: 2,
            mb: 0,
          }}
        >
          <Button variant="black" component="label" sx={{ minWidth: 120 }}>
            <AddIcon sx={{ color: "#fff", fontSize: 15, mr: 0.5 }} />
            Upload Image
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleImageChange}
            />
          </Button>
          {/* ACTION */}
          <Box sx={{ mt: 0, mb: 0 }}>
            {!isEdit ? (
              <Button
                variant="black"
                sx={{
                  minWidth: 120,
                  alignItems: "center", // icon aur text vertically center
                  justifyContent: "center",
                }}
                onClick={() => setIsEdit(true)}
              >
                Edit Profile
              </Button>
            ) : (
              <Button
                variant="black"
                sx={{ minWidth: 120 }}
                onClick={handleSave}
              >
                Save
              </Button>
            )}
          </Box>
        </Box>

        <Typography variant="h6" mb={2} sx={{ mt: 2 }}>
          Personal Information
        </Typography>

        {/* FORM */}
        <Grid container spacing={3}>
          {/* FIRST NAME */}
          <Grid item xs={12} md={4}>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              First name
            </Typography>
            <TextField
              name="firstName"
              fullWidth
              disabled={!isEdit}
              value={profile.firstName || ""}
              onChange={handleChange}
              placeholder="Enter first name"
              InputProps={{ sx: { borderRadius: 2 } }}
            />
          </Grid>

          {/* LAST NAME */}
          <Grid item xs={12} md={4}>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              Last name
            </Typography>
            <TextField
              name="lastName"
              fullWidth
              disabled={!isEdit}
              value={profile.lastName || ""}
              onChange={handleChange}
              placeholder="Enter last name"
              InputProps={{ sx: { borderRadius: 2 } }}
            />
          </Grid>

          {/* CONTACT */}
          <Grid item xs={12} md={4}>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              Contact No
            </Typography>
            <TextField
              name="phone"
              fullWidth
              disabled={!isEdit}
              value={profile.phone || ""}
              onChange={handleChange}
              placeholder="Enter contact number"
              InputProps={{ sx: { borderRadius: 2 } }}
            />
          </Grid>
        </Grid>
        <Typography
          variant="h6"
          sx={{
            mt: 5,
            mb: 3,
            fontWeight: 600,
          }}
        >
          Company Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              Joining Date
            </Typography>
            <TextField
              type="date"
              fullWidth
              disabled
              placeholder=" Your Joining Date"
              value={profile.joiningDate || ""}
              InputProps={{
                sx: { borderRadius: 2, backgroundColor: "#f5f5f5" },
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              Designation
            </Typography>
            <TextField
              fullWidth
              disabled
              placeholder=" Your Designation"
              value={profile.designation || ""}
              InputProps={{
                sx: { borderRadius: 2, backgroundColor: "#f5f5f5" },
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              Email
            </Typography>
            <TextField
              fullWidth
              disabled
              placeholder="Email"
              value={profile.email || ""}
              InputProps={{
                sx: { borderRadius: 2, backgroundColor: "#f5f5f5" },
              }}
            />
          </Grid>

          {/* DEPARTMENT */}
          <Grid item xs={12} md={4}>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              Department
            </Typography>
            <TextField
              fullWidth
              disabled
              placeholder=" Your Department"
              value={profile.department || ""}
              InputProps={{
                sx: { borderRadius: 2, backgroundColor: "#f5f5f5" },
              }}
            />
          </Grid>
        </Grid>

        <Typography
          variant="h6"
          sx={{
            mt: 5,
            mb: 3,
            fontWeight: 600,
          }}
        >
          Address Information
        </Typography>
        <Grid container spacing={3}>
          {/* STREET */}
          <Grid item xs={12} md={3}>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              Street
            </Typography>
            <TextField
              fullWidth
              disabled={!isEdit}
              value={profile.address?.street || ""}
              placeholder="Enter street"
              InputProps={{ sx: { borderRadius: 2 } }}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[a-zA-Z0-9\s]*$/.test(value)) {
                  setProfile((prev) => ({
                    ...prev,
                    address: { ...prev.address, street: value },
                  }));
                }
                // }
              }}
            />
          </Grid>

          {/* CITY */}
          <Grid item xs={12} md={3}>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              City
            </Typography>
            <TextField
              fullWidth
              disabled={!isEdit}
              value={profile.address?.city || ""}
              placeholder="Enter city"
              InputProps={{ sx: { borderRadius: 2 } }}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[a-zA-Z\s]*$/.test(value)) {
                  setProfile((prev) => ({
                    ...prev,
                    address: { ...prev.address, city: e.target.value },
                  }));
                }
              }}
            />
          </Grid>

          {/* STATE */}
          <Grid item xs={12} md={3}>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              State
            </Typography>
            <TextField
              fullWidth
              disabled={!isEdit}
              value={profile.address?.state || ""}
              placeholder="Enter state"
              InputProps={{ sx: { borderRadius: 2 } }}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[a-zA-Z\s]*$/.test(value)) {
                  setProfile((prev) => ({
                    ...prev,
                    address: { ...prev.address, city: e.target.value },
                  }));
                }
              }}
            />
          </Grid>

          {/* PINCODE */}
          <Grid item xs={12} md={3}>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              Pincode
            </Typography>
            <TextField
              fullWidth
              disabled={!isEdit}
              value={profile.address?.pincode || ""}
              placeholder="Enter pincode"
              InputProps={{ sx: { borderRadius: 2 } }}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || /^\d{0,6}$/.test(value))
                  setProfile((prev) => ({
                    ...prev,
                    address: { ...prev.address, pincode: e.target.value },
                  }));
              }}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
