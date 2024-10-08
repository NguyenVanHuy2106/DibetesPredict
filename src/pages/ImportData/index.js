import React, { useRef } from "react";
import { Typography, Container, Box, IconButton } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import axiosInstance from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
const ImportData = () => {
  const fileInputRef = useRef(null); // Tạo ref để tham chiếu đến input file
  const navigate = useNavigate();
  // Hàm mở cửa sổ chọn file
  const handleClick = () => {
    fileInputRef.current.click(); // Kích hoạt thẻ input khi người dùng click
  };

  // Hàm xử lý khi người dùng chọn file
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    // Sử dụng useNavigate

    try {
      const response = await axiosInstance.post("import-dataset", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Hiển thị thông báo thành công và hỏi người dùng có muốn chuyển trang không
      if (
        window.confirm(
          "Import data thành công! Bạn có muốn chuyển qua trang Train Data không?"
        )
      ) {
        // Chuyển đến trang train-data và truyền data qua state
        navigate("/train-data", { state: { data: response.data } });
      }
    } catch (error) {
      console.error(
        "Error during file upload:",
        error.response || error.message
      );
      if (error.response && error.response.status === 401) {
        console.log("Unauthorized: Redirecting to login.");
        window.location.href = "/login";
      }
    }
  };

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "30px",
        marginBottom: "30px",
      }}
    >
      {/* Tiêu đề */}
      <Typography variant="h4" component="h1" style={{ marginBottom: "10px" }}>
        Diabetes Predicting Model
      </Typography>

      {/* Mô tả */}
      <Typography variant="subtitle1" style={{ marginBottom: "40px" }}>
        Please import your data files using the tool below.
      </Typography>

      {/* Khung import file */}
      <div
        style={{
          backgroundColor: "#ffffff",
          paddingInline: 50,
          paddingBottom: 50,
        }}
      >
        <div
          style={{
            paddingBottom: 20,
          }}
        >
          <Typography
            variant="h5"
            component="h1"
            style={{ marginBottom: "5px", paddingTop: 20 }}
          >
            Dataset
          </Typography>
          <div
            style={{
              paddingTop: 5,
              maxWidth: "570px",
            }}
          >
            Based on the information provided, our model predicts that you [are
            at risk / are not at risk] of developing diabetes
          </div>
        </div>
        <Box
          style={{
            width: "570px",
            height: "350px",
            border: "2px dashed #ccc",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={handleClick} // Gọi hàm khi click vào Box
        >
          {/* Icon và nút import */}
          <IconButton color="primary">
            <CloudUploadIcon style={{ fontSize: 50 }} />
          </IconButton>
          <Typography variant="subtitle1">Click to import file</Typography>
        </Box>

        {/* Input file ẩn */}
        <input
          ref={fileInputRef}
          type="file"
          style={{ display: "none" }} // Ẩn thẻ input
          onChange={handleFileChange} // Xử lý khi chọn file
        />
      </div>
    </Container>
  );
};

export default ImportData;
