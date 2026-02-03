import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  IconButton,
  Typography,
  InputBase,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Alert,
  MenuItem,
} from "@mui/material";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import React, { useEffect } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CloseIcon from "@mui/icons-material/Close";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import apiUrl from "../api/index";
import axios from "axios";

const employeesData = [
  {
    name: "Rahul Sharma",
    empId: "EMP001",
    phone: "9876543210",
    joinDate: "12 Jan 2024",
    role: "Frontend Developer",
  },
  {
    name: "Neha Verma",
    empId: "EMP002",
    phone: "9123456780",
    joinDate: "05 Mar 2023",
    role: "UI Designer",
  },
];

const Employees = () => {
  const currentYear = new Date().getFullYear();
  const [search, setSearch] = React.useState("");
  const [employees, setEmployees] = React.useState([]);
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    phone: "",
    department: "",
    designation: "",
    joiningDate: "",
    address: {
      street: "",
      city: "",
      state: "",
      pincode: "",
    },
  });
  console.log("=======>", formData);
  const roles = ["admin", "employee", "hr"];

  const [openDialog, setOpenDialog] = React.useState(false);
  const [editingIndex, setEditingIndex] = React.useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [deleteIndex, setDeleteIndex] = React.useState(null);
  const handleOpenDialog = (index) => {
    // if (index === -1) return;
    setEditingIndex(index);
    setFormData({
      ...employees[index],
      address: {
        street: employees[index].address?.street || "",
        city: employees[index].address?.city || "",
        state: employees[index].address?.state || "",
        pincode: employees[index].address?.pincode || "",
      },
    });
    setOpenDialog(true);
  };
  const handleOpenDialogForAdd = () => {
    setEditingIndex(null);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      role: "",
      phone: "",
      department: "",
      designation: "",
      joiningDate: "",
      address: {
        street: "",
        city: "",
        state: "",
        pincode: "",
      },
    });
    setOpenDialog(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      if (/^\d{0,10}$/.test(value)) {
        setFormData((prev) => ({ ...prev, phone: value }));
      }
      return;
    }
    const textOnlyFields = [
      "firstName",
      "lastName",
      "department",
      "designation",
    ];
    if (textOnlyFields.includes(name)) {
      if (/^[a-zA-Z\s]*$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
      return;
    }

    if (name === "joiningDate") {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate <= today) {
        setFormData((prev) => ({ ...prev, joiningDate: value }));
      }
      return;
    }

    // DEFAULT (email, role etc.)
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    if (name === "pincode") {
      if (/^\d{0,6}$/.test(value)) {
        setFormData((prev) => ({
          ...prev,
          address: { ...prev.address, pincode: value },
        }));
      }
      return;
    }
    if (name === "city" || name === "state") {
      if (/^[a-zA-Z\s]*$/.test(value)) {
        setFormData((prev) => ({
          ...prev,
          address: { ...prev.address, [name]: value },
        }));
      }
    }
    if (name === "street") {
      if (/^[a-zA-Z0-9\s]*$/.test(value)) {
        setFormData((prev) => ({
          ...prev,
          address: { ...prev.address, street: value },
        }));
      }
    }
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };
  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await apiUrl.post("/admin/users", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Employee added:", res.data);
      await fetchEmployees();
      setOpenDialog(false);
      // const token = res.data.token;
      // localStorage.setItem("token", token);
      // console.log("PRIVATE ROUTE TOKEN:", localStorage.getItem("token"));
    } catch (error) {
      console.error("Error adding employee", error);
    }
  };

  const fetchEmployees = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await apiUrl.get("/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Employees from API:", res.data);
      setEmployees(res.data);
    } catch (error) {
      console.error("Error fetching employees", error);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, []);

  // const handleEdit = (employee) => {
  //   setFormData(employee);
  //   setEditingIndex(employees.findIndex((emp) => emp._id === employee._id));
  //   setOpenDialog(true);
  // };
  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    const userId = formData._id;
    try {
      const res = await apiUrl.put(`/admin/users/${userId}`, formData);
      console.log("Updated==============> Employee:", res.data);

      await fetchEmployees();

      setOpenDialog(false); // dialog close
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleDesignationUpdate = async () => {
    const token = localStorage.getItem("token");
    const userId = formData._id;
    try {
      const res = await apiUrl.put(`/admin/users/${userId}/designation`, {
        designation: formData.designation,
      });
      console.log("Designation updated:", res.data);
      await fetchEmployees(); // table refresh
      setOpenDialog(false);
    } catch (error) {
      console.log("Designation update error:", error);
    }
  };

  const handleRoleUpdate = async () => {
    const token = localStorage.getItem("token");
    const userId = formData._id;
    try {
      const res = await apiUrl.put(`/admin/users/${userId}/role`, {
        role: formData.role,
      });
      console.log("Role  updated:", res.data);
      await fetchEmployees(); // table refresh
      setOpenDialog(false);
    } catch (error) {
      console.log("Role  update error:", error);
    }
  };
  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    const userId = employees[deleteIndex]?._id;
    console.log("Delete index:", deleteIndex);
    console.log("Delete user object:", employees[deleteIndex]);
    console.log("Delete userId:", userId);
    if (!userId) return;
    try {
      await apiUrl.delete(`/admin/users/${userId}`);
      await fetchEmployees();
      setOpenDeleteDialog(false);
      setDeleteIndex(null);
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const filterData = employees.filter((item) => {
    if (!search) return true;
    const query = search.toLowerCase();

    const firstName = item.firstName || "";
    const role = item.role || "";

    return (
      firstName.toLowerCase().includes(query) ||
      role.toLowerCase().includes(query)
    );
  });
  return (
    <Box p={3}>
      <Typography variant="h7" sx={{ mb: "1" }}>
        Employees List - {currentYear}
      </Typography>
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            borderRadius: "4px",
            border: "1px solid #637381",
            padding: "4px  10px",
            cursor: "pointer",
            flex: 1,
            mb: 2,
          }}
        >
          <InputBase
            size="small"
            value={search}
            placeholder="Search by Name ,Employee Id, Role..."
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flex: 1 }}
          />
          <SearchOutlinedIcon sx={{ color: "#637381", cursor: "pointer" }} />
        </Box>
        <Button
          variant="Black-outlined"
          sx={{ marginLeft: 2, mb: 2 }}
          onClick={handleOpenDialogForAdd}
        >
          Add Employee
        </Button>
      </Box>
      <Paper sx={{ overflow: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h7">Name</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h7">Email</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h7">Role</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h7">Phone</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h7">Department</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h7">Designation</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h7">Joining Date</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h7">Address</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h7">Action</Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filterData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No Employee Found
                </TableCell>
              </TableRow>
            ) : (
              filterData.map((item, index) => {
                const originalIndex = index;

                return (
                  <TableRow key={item.email || index}>
                    {/* Name + Avatar */}
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1.5}>
                        <Avatar sx={{ width: 32, height: 32 }}>
                          {item.firstName?.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="h6">{item.firstName}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.lastName}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    {/* Email */}
                    <TableCell>
                      <Typography variant="h6">{item.email}</Typography>
                    </TableCell>
                    {/* Role */}
                    <TableCell>
                      <Typography variant="h6">{item.role}</Typography>
                    </TableCell>

                    {/* Phone */}
                    <TableCell>
                      <Typography variant="h6">{item.phone}</Typography>
                    </TableCell>

                    {/* Department */}
                    <TableCell>
                      <Typography variant="h6">{item.department}</Typography>
                    </TableCell>

                    {/* Designation */}
                    <TableCell>
                      <Typography variant="h6">{item.designation}</Typography>
                    </TableCell>

                    {/* Joining Date */}
                    <TableCell>
                      <Typography variant="h6">
                        {item.joiningDate
                          ? new Date(item.joiningDate).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )
                          : "_"}
                      </Typography>
                    </TableCell>

                    {/* Address (SINGLE COLUMN ✅) */}
                    <TableCell>
                      <Typography variant="h6">
                        {[
                          item.address?.street,
                          item.address?.city,
                          item.address?.state,
                          item.address?.pincode,
                        ]
                          .filter(Boolean)
                          .join(", ") || "—"}
                      </Typography>
                    </TableCell>
                    {/* Action */}
                    <TableCell align="center">
                      <IconButton
                        onClick={() => handleOpenDialog(originalIndex)}
                      >
                        <CreateOutlinedIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setDeleteIndex(originalIndex);
                          setOpenDeleteDialog(true);
                        }}
                      >
                        <DeleteOutlinedIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </Paper>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle variant="h7">
          {editingIndex !== null ? "Edit Employee" : "Add Employee"}
        </DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <TextField
            name="firstName"
            label="First Name"
            fullWidth
            size="small"
            margin="dense"
            value={formData.firstName}
            onChange={handleChange}
          />

          <TextField
            name="lastName"
            label="Last Name"
            fullWidth
            size="small"
            margin="dense"
            value={formData.lastName}
            onChange={handleChange}
          />
          <TextField
            name="joiningDate"
            label="Joining Date"
            type="date"
            fullWidth
            size="small"
            margin="dense"
            InputLabelProps={{ shrink: true }}
            value={formData.joiningDate}
            onChange={handleChange}
          />

          <TextField
            name="email"
            label="Email"
            fullWidth
            size="small"
            margin="dense"
            value={formData.email}
            onChange={handleChange}
          />

          <TextField
            select
            name="role"
            label="Role"
            value={formData.role}
            onChange={handleChange}
            fullWidth
            // disabled={disabled}
            // helperText="Select user role"
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            name="phone"
            label="Phone"
            fullWidth
            size="small"
            margin="dense"
            value={formData.phone}
            onChange={handleChange}
          />

          <TextField
            name="department"
            label="Department"
            fullWidth
            size="small"
            margin="dense"
            value={formData.department}
            onChange={handleChange}
          />

          <TextField
            name="designation"
            label="Designation"
            fullWidth
            size="small"
            margin="dense"
            value={formData.designation}
            onChange={handleChange}
          />
          <TextField
            name="street"
            label="Street"
            fullWidth
            size="small"
            margin="dense"
            value={formData?.address?.street}
            onChange={handleAddressChange}
          />

          <TextField
            name="city"
            label="City"
            fullWidth
            size="small"
            margin="dense"
            value={formData?.address?.city}
            onChange={handleAddressChange}
          />

          <TextField
            name="state"
            label="State"
            fullWidth
            size="small"
            margin="dense"
            value={formData?.address?.state}
            onChange={handleAddressChange}
          />

          <TextField
            name="pincode"
            label="Pincode"
            fullWidth
            size="small"
            margin="dense"
            value={formData?.address?.pincode}
            onChange={handleAddressChange}
          />
        </DialogContent>
        <DialogActions>
          {/* Cancel */}
          <Button variant="Black-outlined" onClick={() => setOpenDialog(false)}>
            Cancel
          </Button>

          {/* ADD MODE */}
          {editingIndex === null && (
            <Button variant="black" onClick={handleSubmit}>
              Add
            </Button>
          )}

          {/* EDIT MODE */}
          {editingIndex !== null && (
            <>
              <Button variant="black" onClick={handleUpdate}>
                Update Employee
              </Button>

              <Button variant="outlined" onClick={handleDesignationUpdate}>
                Update Designation
              </Button>
              <Button variant="outlined" onClick={handleRoleUpdate}>
                Update Role
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "4px",
          },
        }}
      >
        {/* Title */}
        <DialogTitle
          variant="h8"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pb: 0,
            mb: 0,
          }}
        >
          Delete Employee
          <IconButton onClick={() => setOpenDeleteDialog(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        {/* Content */}
        <DialogContent sx={{ pt: 0 }}>
          <Typography variant="h7" sx={{ mb: 0.5, fontSize: "14px" }}>
            Are you sure you want to delete this employee?
          </Typography>

          <Alert
            variant="outlined"
            severity="error"
            icon={<WarningAmberOutlinedIcon />}
            sx={{
              mt: 1,
              alignItems: "flex-start",
              fontSize: "13px",
              "& .MuiAlert-icon": {
                mt: "2px",
              },
            }}
          >
            <Typography
              component="span"
              sx={{ fontSize: "13px", fontWeight: 600 }}
            >
              Note:
            </Typography>{" "}
            This action cannot be undone.
          </Alert>
        </DialogContent>

        {/* Actions */}
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            variant="Black-outlined"
            onClick={() => setOpenDeleteDialog(false)}
            sx={{
              py: 1.3,
            }}
          >
            Cancel
          </Button>

          <Button
            variant="error"
            // color="error"
            onClick={handleDelete}
            sx={{
              py: 1.3,
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default Employees;
