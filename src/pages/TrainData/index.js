import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Container,
  Button,
  TablePagination,
  TextField,
} from "@material-ui/core";
import axios from "../../axiosConfig"; // Import axios configuration

const TrainData = () => {
  const [data, setData] = useState([]); // Initialize with an empty array
  const [page, setPage] = useState(0); // Current page (0-based index)
  const [totalPages, setTotalPages] = useState(0); // Total number of pages
  const navigate = useNavigate();
  // Fetch data from API
  const fetchData = async (pageNumber) => {
    try {
      const response = await axios.get(`/get-dataset?page=${pageNumber}`);
      setData(response.data.data || []); // Set data from API
      setTotalPages(response.data.total_pages || 0); // Set total pages from API
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const trainModel = async () => {
    try {
      const response = await axios.post("/training-dataset");
      //console.log(response.status);
      if (response.status === 200) {
        // Hiển thị thông báo khi train thành công
        const userConfirmed = window.confirm(
          "Train data thành công. Nhấn OK để xem kết quả."
        );
        if (userConfirmed) {
          navigate("/train-chart"); // Chuyển hướng đến trang TrainChart khi người dùng bấm OK
        }
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  useEffect(() => {
    fetchData(page + 1); // Fetch data on mount or when page changes (1-based index for API)
  }, [page]); // Fetch data when page changes

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage); // Update page state
  };

  // Handle input change for direct page selection
  const handlePageInputChange = (event) => {
    const inputValue = parseInt(event.target.value);
    if (!isNaN(inputValue) && inputValue > 0 && inputValue <= totalPages) {
      setPage(inputValue - 1); // Update page state (0-based index)
    }
  };

  return (
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: 20,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          style={{ marginBottom: "20px" }}
        >
          Diabetes Data
        </Typography>
        <div>
          <Button
            style={{
              height: "100%",
              maxHeight: "50px",
            }}
            variant="contained"
            color="primary"
            onClick={trainModel}
          >
            TRAIN MODEL
          </Button>
        </div>
      </div>
      <TableContainer
        component={Paper}
        style={{ maxHeight: 600, overflow: "auto" }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Gender</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Hypertension</TableCell>
              <TableCell>Heart Disease</TableCell>
              <TableCell>Smoking History</TableCell>
              <TableCell>BMI</TableCell>
              {/* <TableCell>HbA1c Level</TableCell>
              <TableCell>Blood Glucose</TableCell> */}
              <TableCell>Diabetes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.gender || "N/A"}</TableCell>
                  <TableCell>{row.age || "N/A"}</TableCell>
                  <TableCell>
                    {row.hypertension !== undefined ? row.hypertension : "N/A"}
                  </TableCell>
                  <TableCell>
                    {row.heart_disease !== undefined
                      ? row.heart_disease
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {row.smoking_history !== undefined
                      ? row.smoking_history
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {row.bmi !== undefined ? row.bmi : "N/A"}
                  </TableCell>
                  {/* <TableCell>
                    {row.HbA1c_level !== undefined ? row.HbA1c_level : "N/A"}
                  </TableCell>
                  <TableCell>
                    {row.blood_glucose_level !== undefined
                      ? row.blood_glucose_level
                      : "N/A"}
                  </TableCell> */}
                  <TableCell>
                    {row.diabetes !== undefined ? row.diabetes : "N/A"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Input for Direct Page Selection */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginTop: "10px",
        }}
      >
        <TextField
          type="number"
          variant="outlined"
          size="small"
          onChange={handlePageInputChange}
          style={{ marginRight: "10px", width: "70px" }} // Set width for the input
          InputProps={{
            inputProps: { min: 1, max: totalPages },
          }}
        />
        <TablePagination
          rowsPerPageOptions={[]} // Hide rows per page options
          component="div"
          count={totalPages} // Total number of pages
          rowsPerPage={data.length} // Show all available data for the current page
          page={page} // Current page
          onPageChange={handleChangePage} // Handle page change
        />
      </div>
    </Container>
  );
};

export default TrainData;
