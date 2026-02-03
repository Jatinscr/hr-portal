import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TextField,
  Paper,
  InputBase,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const holidaysData = [
  // 🔹 Mandatory Holidays
  { date: "January 26", day: "Monday", name: "Republic Day" },
  { date: "March 03", day: "Tuesday", name: "Holi" },
  { date: "August 15", day: "Saturday", name: "Independence Day" },
  { date: "August 28", day: "Friday", name: "Raksha Bandhan" },
  { date: "October 02", day: "Friday", name: "Gandhi Jayanti" },
  { date: "October 20", day: "Tuesday", name: "Dussehra" },
  { date: "November 08", day: "Sunday", name: "Diwali" },
  { date: "December 25", day: "Friday", name: "Christmas" },

  // 🔹 Optional Holidays (Any 2 Can Be Availed)
  { date: "May 28", day: "Thursday", name: "Eid (Optional)" },
  { date: "November 09", day: "Monday", name: "Goverdhan Pooja (Optional)" },
  { date: "November 11", day: "Wednesday", name: "Bhai Dooj (Optional)" },
  {
    date: "December 31",
    day: "Thursday",
    name: "Beginning of New Year (Optional)",
  },
];

const Holidays = () => {
  const [search, setSearch] = React.useState("");
  const filterData = holidaysData.filter((item) => {
    if (!search) return true;
    return item.name.toLowerCase().includes(search.toLowerCase());
  });
  const currentYear = new Date().getFullYear();
  return (
    <Box p={3}>
      <Typography variant="h7" mb={2}>
        Holidays List - {currentYear}
      </Typography>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            borderRadius: "8px",
            border: "1px solid #637381",
            padding: "4px 10px",
            cursor: "pointer",
          }}
        >
          <InputBase
            size="small"
            placeholder="search holidays..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              flex: 1,
            }}
          />
          <SearchOutlinedIcon sx={{ color: "#637381", cursor: "pointer" }} />
        </Box>
      </Box>
      <Paper sx={{ maxHeight: 400, overflow: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h7">#</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h7">Day</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h7">Date</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h7">Holidays Name</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No holidays found
                </TableCell>
              </TableRow>
            ) : (
              filterData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography variant="h6">{index + 1}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">{item.day}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">{item.date}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">{item.name}</Typography>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};
export default Holidays;
