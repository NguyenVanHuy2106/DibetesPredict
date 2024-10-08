import React, { useState } from "react";
import axiosInstance from "../../axiosConfig";
import {
  Container,
  TextField,
  Button,
  Typography,
  IconButton,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import loginImage from "../../image/imageLogin.jpg"; // Đường dẫn đến hình ảnh
import logoSignIn from "../../image/LogoUIT.png";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      // Gửi yêu cầu POST đến API đăng nhập
      const response = await axiosInstance.post("login", {
        username: username,
        password: password,
      });

      if (response.data.access_token) {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("username", response.data.user.username);
        localStorage.setItem("role", response.data.user.role);
        //console.log(response);
        if (response.data.user.role === "admin") {
          window.location.href = "/";
        } else {
          window.location.href = "/predict";
        }
      } else {
        console.error("Đăng nhập không thành công. Không có token trả về.");
      }
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
    }
  };

  return (
    <Container
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Phần hình ảnh */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={loginImage}
          alt="Login"
          style={{
            width: "100%",
            height: "100vh",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Phần thông tin đăng nhập */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center", // Căn giữa theo chiều dọc
          alignItems: "center", // Căn giữa theo chiều ngang
          padding: "20px",
        }}
      >
        <img
          style={{
            height: "100px",
            paddingBottom: 50,
          }}
          src={logoSignIn}
          alt="Logo"
        />
        <Typography
          variant="h4"
          component="h1"
          style={{ paddingBottom: 30, textAlign: "center" }} // Căn giữa chữ Sign In
        >
          Sign In
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginBottom: "20px", width: "100%", maxWidth: "500px" }} // Đặt chiều dài ô nhập
        />
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: "20px", width: "100%", maxWidth: "500px" }} // Đặt chiều dài ô nhập
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleClickShowPassword}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            ),
          }}
        />
        <Button
          style={{
            width: "100%",
            maxWidth: "500px",
            height: "100%",
            maxHeight: "50px",
          }}
          variant="contained"
          color="primary"
          onClick={handleLogin}
        >
          Sign In
        </Button>
      </div>
    </Container>
  );
};

export default Login;
