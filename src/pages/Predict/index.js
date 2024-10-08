import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Container,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import AssignmentReturnedIcon from "@material-ui/icons/AssignmentReturned";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import WcIcon from "@material-ui/icons/Wc";
import AllInboxIcon from "@material-ui/icons/AllInbox";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SmokingRoomsIcon from "@material-ui/icons/SmokingRooms";
import GrainIcon from "@material-ui/icons/Grain";
import InvertColorsIcon from "@material-ui/icons/InvertColors";
import axios from "../../axiosConfig";
const Predict = () => {
  const navigate = useNavigate();
  const [gender, setGender] = useState("");
  const [hypertension, setHypertension] = useState("");
  const [heart, setHeart] = useState("");
  const [smoking, setSmoking] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [HbA1c, setHbA1c] = useState("");
  const [blood, setBlood] = useState("");

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleHypertension = (event) => {
    setHypertension(event.target.value);
  };
  const handleHeart = (event) => {
    setHeart(event.target.value);
  };
  const handleSmoking = (event) => {
    setSmoking(event.target.value);
  };
  const handleHbA1c = (event) => {
    setHbA1c(event.target.value);
  };
  const handleBlood = (event) => {
    setBlood(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleHeightChange = (event) => {
    setHeight(event.target.value);
  };

  const getResult = async () => {
    // const requestData = {
    //     HbA1c_level: 5.6,
    //     age: 37.0,
    //     blood_glucose_level: 140,
    //     height: 170,
    //     weight: 60,
    //     gender: "Female",
    //     heart_disease: 1,
    //     hypertension: 0,
    //     smoking_history: "not_current"
    // };

    const requestData = {
      HbA1c_level: parseFloat(HbA1c), // Kiểu số (float)
      age: parseFloat(age), // Kiểu số (float)
      blood_glucose_level: parseInt(blood, 10), // Kiểu số nguyên (integer)
      height: parseInt(height, 10), // Kiểu số nguyên (integer)
      weight: parseInt(weight, 10), // Kiểu số nguyên (integer)
      gender: gender, // Kiểu chuỗi
      heart_disease: parseInt(heart, 10), // Kiểu số nguyên (integer)
      hypertension: parseInt(hypertension, 10), // Kiểu số nguyên (integer)
      smoking_history: smoking, // Kiểu chuỗi
    };
    try {
      const response = await axios.post("patient/predict", requestData);
      if (response.status === 200) {
        navigate("/result", {
          state: {
            dataResult: response.data, // Dữ liệu từ API
            requestData: requestData, // Dữ liệu yêu cầu
          },
        });
      }
    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
  };

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        marginTop: "30px",
        marginBottom: "30px",
      }}
    >
      {/* Tiêu đề */}
      <Typography variant="h4" component="h1" style={{ marginBottom: "10px" }}>
        Diabetes Predicting
      </Typography>

      {/* Mô tả */}
      <Typography variant="subtitle1" style={{ marginBottom: "40px" }}>
        Please fill in your demographic data below.
      </Typography>

      {/* Khung nhập dữ liệu */}
      <Box
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f9f9f9",
          border: "1px solid #ccc",
          borderRadius: 8,
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <Typography
          variant="h6"
          component="h1"
          style={{
            marginBottom: "10px",
            fontWeight: "bold",
            paddingBottom: 10,
          }}
        >
          Demographic data
        </Typography>
        {/* Giới tính */}
        <Grid
          container
          spacing={2}
          alignItems="center"
          style={{ marginBottom: "20px" }}
        >
          <Grid item xs={6} style={{ display: "flex", alignItems: "center" }}>
            <WcIcon style={{ marginRight: "8px" }} />
            <Typography>Gender:</Typography>
          </Grid>
          <Grid item xs={6}>
            <RadioGroup row value={gender} onChange={handleGenderChange}>
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          </Grid>
        </Grid>

        {/* Tuổi */}
        <Grid
          container
          spacing={2}
          alignItems="center"
          style={{ marginBottom: "20px" }}
        >
          <Grid item xs={6} style={{ display: "flex", alignItems: "center" }}>
            <PersonIcon style={{ marginRight: "8px" }} />
            <Typography>Age:</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="number"
              value={age}
              onChange={handleAgeChange}
              required
              fullWidth
              variant="outlined"
              InputProps={{
                style: { height: "45px" }, // Chiều cao cho Input bên trong
              }}
            />
          </Grid>
        </Grid>

        {/* Cân nặng */}
        <Grid
          container
          spacing={2}
          alignItems="center"
          style={{ marginBottom: "20px" }}
        >
          <Grid item xs={6} style={{ display: "flex", alignItems: "center" }}>
            <AssignmentReturnedIcon style={{ marginRight: "8px" }} />
            <Typography>Weight (kg):</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="number"
              value={weight}
              onChange={handleWeightChange}
              required
              fullWidth
              variant="outlined"
              InputProps={{
                style: { height: "45px" }, // Chiều cao cho Input bên trong
              }}
            />
          </Grid>
        </Grid>

        {/* Chiều cao */}
        <Grid
          container
          spacing={2}
          alignItems="center"
          style={{ marginBottom: "20px" }}
        >
          <Grid item xs={6} style={{ display: "flex", alignItems: "center" }}>
            <AccessibilityNewIcon style={{ marginRight: "8px" }} />
            <Typography>Height (cm):</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="number"
              value={height}
              onChange={handleHeightChange}
              required
              fullWidth
              variant="outlined"
              InputProps={{
                style: { height: "45px" }, // Chiều cao cho Input bên trong
              }}
            />
          </Grid>
        </Grid>
        <Typography
          variant="h6"
          component="h1"
          style={{
            marginBottom: "10px",
            fontWeight: "bold",
            paddingBottom: 10,
          }}
        >
          Medical data
        </Typography>
        <Grid
          container
          spacing={2}
          alignItems="center"
          style={{ marginBottom: "20px" }}
        >
          <Grid item xs={6} style={{ display: "flex", alignItems: "center" }}>
            <AllInboxIcon style={{ marginRight: "8px" }} />
            <Typography>Do you have hypertension?</Typography>
          </Grid>
          <Grid item xs={6}>
            <RadioGroup row value={hypertension} onChange={handleHypertension}>
              <FormControlLabel value="1" control={<Radio />} label="Yes" />
              <FormControlLabel value="0" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          alignItems="center"
          style={{ marginBottom: "20px" }}
        >
          <Grid item xs={6} style={{ display: "flex", alignItems: "center" }}>
            <FavoriteIcon style={{ marginRight: "8px" }} />
            <Typography>Do you have heart disease?</Typography>
          </Grid>
          <Grid item xs={6}>
            <RadioGroup row value={heart} onChange={handleHeart}>
              <FormControlLabel value="1" control={<Radio />} label="Yes" />
              <FormControlLabel value="0" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          alignItems="center"
          style={{ marginBottom: "20px" }}
        >
          <Grid item xs={6} style={{ display: "flex", alignItems: "center" }}>
            <SmokingRoomsIcon style={{ marginRight: "8px" }} />
            <Typography>Smoking history</Typography>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Smoking history</InputLabel>
              <Select
                value={smoking}
                onChange={handleSmoking}
                label="Smoking history" // Nhãn của dropdown
                style={{ height: "45px" }} // Chiều cao cho dropdown
              >
                <MenuItem value="not_current">Not Current</MenuItem>
                <MenuItem value="current">Current</MenuItem>
                <MenuItem value="non-smoker">Non-Smoker</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          alignItems="center"
          style={{ marginBottom: "20px" }}
        >
          <Grid item xs={6} style={{ display: "flex", alignItems: "center" }}>
            <GrainIcon style={{ marginRight: "8px" }} />
            <Typography>HbA1c level</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="number"
              value={HbA1c}
              onChange={handleHbA1c}
              required
              fullWidth
              variant="outlined"
              InputProps={{
                style: { height: "45px" }, // Chiều cao cho Input bên trong
              }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          alignItems="center"
          style={{ marginBottom: "20px" }}
        >
          <Grid item xs={6} style={{ display: "flex", alignItems: "center" }}>
            <InvertColorsIcon style={{ marginRight: "8px" }} />
            <Typography>Blood glucose level</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="number"
              value={blood}
              onChange={handleBlood}
              required
              fullWidth
              variant="outlined"
              InputProps={{
                style: { height: "45px" }, // Chiều cao cho Input bên trong
              }}
            />
          </Grid>
        </Grid>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            style={{
              height: "100%",
              maxHeight: "50px",
              marginTop: 10,
              marginBottom: 10,
              paddingTop: 10,
              paddingBottom: 10,
            }}
            variant="contained"
            color="primary"
            onClick={getResult}
          >
            GET RESULT
          </Button>
        </div>
      </Box>
    </Container>
  );
};

export default Predict;
