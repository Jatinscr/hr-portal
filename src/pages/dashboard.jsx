import {
  Box,
  Typography,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Stack,
  CardContent,
  Card,
  Avatar,
  Button,
  Divider,
  Link,
  TextField,
  Checkbox,
} from "@mui/material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PaidIcon from "@mui/icons-material/Paid";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TodayIcon from "@mui/icons-material/Today";
import { IconButton } from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Chart from "react-apexcharts";

// import { PieChart, Pie, Cell } from "recharts";
import React from "react";
const Dashboard = () => {
  const data = [
    { name: "Male", value: 73 },
    { name: "Female", value: 27 },
  ];
  const COLORS = ["#0e7cdc", "#2E7D32"];
  const [currentDate, setCurrentDate] = useState(new Date());
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const totalDays = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const today = new Date();
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);

  const handleAddOrUpdate = () => {
    if (!text.trim()) return;

    if (editId) {
      setTasks(
        tasks.map((task) => (task.id === editId ? { ...task, text } : task))
      );
      setEditId(null);
    } else {
      setTasks([...tasks, { id: Date.now(), text, done: false }]);
    }

    setText("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const handleEdit = (task) => {
    setText(task.text);
    setEditId(task.id);
  };
  const radialOptions = {
    chart: {
      type: "radialBar",
      sparkline: { enabled: true },
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: { size: "65%" },
        track: {
          background: "#f2f2f2",
        },
        dataLabels: {
          name: { show: false },
          value: {
            fontSize: "18px",
            fontWeight: 600,
            offsetY: -10,
          },
        },
      },
    },
    colors: ["#FFC107"],
  };

  const barOptions = {
    chart: {
      type: "bar",
      sparkline: { enabled: true },
    },
    plotOptions: {
      bar: {
        columnWidth: "60%",
        borderRadius: 3,
      },
    },
    colors: ["#FFC107"],
  };
  return (
    <Box sx={{ p: 2, width: "100%" }}>
      {/* Left: Employee Table */}
      <Grid container spacing={2} alignItems="stretch">
        <Grid item xs={6}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={5}>
                    <Typography variant="h7">Employee Details</Typography>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Projects</TableCell>
                  <TableCell>More</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>

              <TableBody>
                {/* EMPLOYEE 1 */}
                <TableRow>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar src="https://i.pravatar.cc/150?img=" />
                      <Typography variant="h6">Jatin Sharma</Typography>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Typography variant="h6">Frontend Developer</Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="h6">Active</Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="h6">5 Projects</Typography>
                  </TableCell>
                  <TableCell>
                    <Button
                      startIcon={<RemoveRedEyeOutlinedIcon sx={{ ml: 0.5 }} />}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>

                {/* EMPLOYEE 2 */}
                <TableRow>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar src="https://i.pravatar.cc/150?img=30" />
                      <Typography variant="h6">Rohit Kumar</Typography>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Typography variant="h6">Backend Developer</Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="h6">On Leave</Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="h6">3 Projects</Typography>
                  </TableCell>
                  <TableCell>
                    <Button
                      startIcon={<RemoveRedEyeOutlinedIcon sx={{ ml: 0.5 }} />}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>

                {/* EMPLOYEE 3 */}
                <TableRow>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar src="https://i.pravatar.cc/150?img=24" />
                      <Typography variant="h6">Neha Verma</Typography>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Typography variant="h6">UI/UX Designer</Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="h6">Active</Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="h6">7 Projects</Typography>
                  </TableCell>
                  <TableCell>
                    <Button
                      startIcon={<RemoveRedEyeOutlinedIcon sx={{ ml: 0.5 }} />}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
                {/* EMPLOYEE 4 */}
                <TableRow>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar src="https://i.pravatar.cc/150?img=30" />
                      <Typography variant="h6">Rohit Kumar</Typography>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Typography variant="h6">Backend Developer</Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="h6">On Leave</Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="h6">3 Projects</Typography>
                  </TableCell>
                  <TableCell>
                    <Button
                      startIcon={<RemoveRedEyeOutlinedIcon sx={{ ml: 0.5 }} />}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={6}>
          <Paper
            elevation={2}
            sx={{
              width: 555,
              height: 218,
              borderRadius: 1,
              backgroundColor: "#F8F7F7",
              p: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Month + Year */}
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: 600,
                fontSize: 14,
                mb: 0.5,
              }}
            >
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </Typography>

            {/* Week Days */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                textAlign: "center",
                mb: 0.3,
              }}
            >
              {weekDays.map((day, index) => (
                <Typography
                  key={day}
                  sx={{
                    fontSize: 11,
                    fontWeight: 600,
                    color:
                      index === 0
                        ? "#ff6b6b"
                        : index === 6
                        ? "#1976d2"
                        : "#555",
                  }}
                >
                  {day}
                </Typography>
              ))}
            </Box>

            {/* Dates */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gridTemplateRows: "repeat(6, 1fr)",
                flex: 1,
              }}
            >
              {/* empty cells */}
              {Array.from({ length: firstDay }).map((_, i) => (
                <Box key={i} />
              ))}

              {/* dates */}
              {Array.from({ length: totalDays }).map((_, i) => {
                const day = i + 1;
                const isToday =
                  day === today.getDate() &&
                  currentDate.getMonth() === today.getMonth() &&
                  currentDate.getFullYear() === today.getFullYear();

                return (
                  <Box
                    key={day}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 24,
                      height: 24,
                      mx: "auto",
                      borderRadius: "50%",
                      fontSize: 11,
                      fontWeight: isToday ? 700 : 500,
                      backgroundColor: isToday ? "#1976d2" : "transparent",
                      color: isToday ? "#fff" : "#333",
                    }}
                  >
                    {day}
                  </Box>
                );
              })}
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {/* Right: Projects  */}
      <Grid container spacing={2} sx={{ mt: 3 }}>
        {/* LEFT SIDE (table ke niche) */}
        <Grid item xs={6}>
          <Grid
            container
            spacing={2}
            // sx={{
            //   // mt: 3,
            //   // flexWrap: "nowrap",
            //   // overflowX: "auto",
            // }}
          >
            <Grid item xs={6}>
              <Box
                sx={{
                  width: "268px",
                  flexShrink: 0,
                  border: "1px solid #e0e0e0",
                  p: 1.5,
                  borderRadius: 2,
                }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"
                  sx={{
                    width: "100%",
                    height: 142,
                    objectFit: "cover",
                    mb: 1.5,
                  }}
                />
                <Typography variant="h7">Project One</Typography>
                <Typography variant="h6">HR Management System</Typography>
                <Link variant="h6" href="#">
                  demosite.com
                </Link>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box
                sx={{
                  border: "1px solid #e0e0e0",
                  p: 1.5,
                  borderRadius: 2,
                  width: "268px",
                  flexShrink: 0,
                }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"
                  sx={{
                    width: "100%",
                    height: 142,
                    objectFit: "cover",
                    mb: 1.5,
                  }}
                />
                <Typography variant="h7">Project One</Typography>
                <Typography variant="h6">HR Management System</Typography>
                <Link variant="h6" href="#">
                  demosite.com
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {/* RIGHT SIDE (calendar ke niche) */}
        <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box
                sx={{
                  border: "1px solid #e0e0e0",
                  p: 1.5,
                  borderRadius: 2,
                  width: "268px",
                  flexShrink: 0,
                }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"
                  sx={{
                    width: "100%",
                    height: 142,
                    objectFit: "cover",
                    mb: 1.5,
                  }}
                />
                <Typography variant="h7">Project One</Typography>
                <Typography variant="h6">HR Management System</Typography>
                <Link variant="h6" href="#">
                  demosite.com
                </Link>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box
                sx={{
                  border: "1px solid #e0e0e0",
                  p: 1.5,
                  borderRadius: 2,
                  width: "268px",
                  flexShrink: 0,
                }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"
                  sx={{
                    width: "100%",
                    height: 142,
                    objectFit: "cover",
                    mb: 1.5,
                  }}
                />
                <Typography variant="h7">Project One</Typography>
                <Typography variant="h6">HR Management System</Typography>
                <Link variant="h6" href="#">
                  demosite.com
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid item xs={6}>
          <Card
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: 1,
              width: "268px",
              height: "100%",
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #e0e0e0",
                    borderRadius: 1,
                    p: 2,
                    gap: 2,
                    width: "100%",
                  }}
                >
                  <PersonIcon sx={{ fontSize: 36 }} />
                  <Box>
                    <Typography variant="h7">New Employee</Typography>
                    <Typography variant="h6">22</Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #e0e0e0",
                    borderRadius: 1,
                    p: 2,
                    gap: 2,
                    width: "100%",
                  }}
                >
                  <GroupsIcon sx={{ fontSize: 36 }} />

                  <Box>
                    <Typography variant="h7">Total Employee</Typography>
                    <Typography variant="h6">22</Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #e0e0e0",
                    borderRadius: 1,
                    p: 2,
                    gap: 2,
                    width: "100%",
                  }}
                >
                  <AccountBalanceIcon sx={{ fontSize: 36 }} />
                  <Box>
                    <Typography variant="h7">Total Salary</Typography>
                    <Typography variant="h6">$22K</Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #e0e0e0",
                    borderRadius: 1,
                    p: 2,
                    gap: 2,
                    width: "100%",
                  }}
                >
                  <PaidIcon sx={{ fontSize: 36 }} />
                  <Box>
                    <Typography variant="h7">Avg. Salary</Typography>
                    <Typography variant="h6">1250$</Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={7}>
          <Card sx={{ p: 3, width: "268px", height: "100%" }}>
            <Typography variant="h7">Employee Gender Distribution</Typography>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  background: `conic-gradient(
      #0e7cdc 0% 73%,
      #2E7D32 73% 100%
    )`,
                  position: "relative",
                  mx: "auto",
                }}
              >
                {/* center hole */}
                <Box
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                ></Box>
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                }}
              >
                <Typography variant="h7">Total</Typography>
                <Typography variant="h6">100</Typography>
              </Box>
            </Box>
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Typography variant="h7">Male</Typography>
              <Typography variant="h6">73%</Typography>

              <Typography variant="h7" mt={1}>
                Female
              </Typography>
              <Typography variant="h6">27%</Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              width: 269,
              height: 381,
              minWidth: 269,
              flexShrink: 0,
              p: 2,
              borderRadius: 1,
              backgroundColor: "background.paper",
              border: "1px solid #e0e0e0",
              textAlign: "center",
            }}
          >
            <Typography fontSize={14} color="text.secondary">
              Monthly Salary
            </Typography>

            <Typography fontWeight={600} mb={1}>
              ₹45,000
            </Typography>

            {/* HALF DONUT */}
            <Chart
              options={radialOptions}
              series={[75]}
              type="radialBar"
              height={160}
            />

            {/* MINI BAR CHART */}
            <Box mt={1}>
              <Chart
                options={barOptions}
                series={[{ data: [20, 35, 50, 25, 40, 45, 30] }]}
                type="bar"
                height={110}
              />
            </Box>

            <Typography fontSize={13} mt={1} color="text.secondary">
              Monthly Earnings
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: 1,
              p: 2,
              height: "100%",
            }}
          >
            <Typography variant="h7" mb={2}>
              Today’s Tasks
            </Typography>

            {/* INPUT */}
            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <TextField
                size="small"
                fullWidth
                placeholder="Enter New Task"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <Button
                // variant="contained"
                size="small"
                onClick={handleAddOrUpdate}
              >
                {editId ? "Update Task" : "Add Task"}
              </Button>
            </Box>

            {/* LIST */}
            <Stack spacing={1}>
              {tasks.map((task) => (
                <Box
                  key={task.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Checkbox
                    size="small"
                    checked={task.done}
                    onChange={() => toggleTask(task.id)}
                  />

                  <Typography
                    sx={{
                      flex: 1,
                      fontSize: 13,
                      textDecoration: task.done ? "line-through" : "none",
                      color: task.done ? "#637381" : "#111",
                    }}
                  >
                    {task.text}
                  </Typography>

                  <IconButton size="small" onClick={() => handleEdit(task)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Dashboard;
