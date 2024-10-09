import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../axiosConfig";
import {
  Typography,
  Container,
  Box,
  Button,
  CircularProgress,
} from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { useNavigate } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const { dataResult, requestData } = location.state;
  const [advise, setAdvise] = useState([]);
  const [analyze, setAnalyze] = useState([]);
  const [loading, setLoading] = useState(true); // State để quản lý loading
  const navigate = useNavigate();

  const retake = () => {
    navigate("/predict");
  };

  useEffect(() => {
    const getAdvise = async () => {
      try {
        const response = await axios.post("patient/advise", requestData);
        setAdvise(response.data.data.advices);
        setAnalyze(response.data.data.indexes);
        setLoading(false); // Khi dữ liệu đã được tải về, tắt trạng thái loading
      } catch (error) {
        console.error("Error fetching prediction:", error);
        setLoading(false); // Trong trường hợp lỗi, cũng tắt loading
      }
    };

    getAdvise();
  }, [requestData]);

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        marginTop: "40px",
        marginBottom: "30px",
      }}
    >
      <Typography variant="h4" component="h1" style={{ marginBottom: "10px" }}>
        Diabetes Risk Assessment
      </Typography>

      <Box
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#ffffff",
          border: "1px solid #ccc",
          borderRadius: 8,
          width: "100%",
          maxWidth: "1000px",
          marginTop: 30,
        }}
      >
        <Typography variant="h6" component="h1" style={{ fontWeight: "bold" }}>
          Your result
        </Typography>
        <Typography
          variant="subtitle1"
          style={{ fontSize: "1rem", color: "#757575" }}
        >
          Based on the information provided, our model predicts your diabetes
          risk.
        </Typography>
        <div
          style={{
            paddingTop: 15,
            paddingBottom: 5,
          }}
        >
          <FiberManualRecordIcon
            style={{ height: 10, width: 10, paddingRight: 10 }}
          />
          Risk Level: <strong> {dataResult.message}</strong>
        </div>
        <div
          style={{
            paddingTop: 5,
          }}
        >
          <FiberManualRecordIcon
            style={{
              height: 10,
              width: 10,
              paddingRight: 10,
            }}
          />
          Prediction Confidence: {dataResult.accuracy}%
        </div>

        <div
          style={{
            borderBottom: "0.5px solid #999999",
            paddingBottom: 20,
          }}
        >
          <Typography
            variant="h6"
            component="h1"
            style={{ fontWeight: "bold", paddingTop: 10 }}
          >
            Recommendations
          </Typography>
        </div>

        {/* Loading Icon */}
        {loading ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <CircularProgress />
            <Typography
              variant="subtitle1"
              style={{ fontSize: "0.775rem", color: "#757575", marginTop: 10 }}
            >
              AI đang phân tích. Vui lòng đợi trong giây lát...
            </Typography>
          </div>
        ) : (
          <>
            <div
              style={{
                paddingTop: 20,
                paddingBottom: 20,
              }}
            >
              {advise.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 10,
                    textAlign: "justify",
                  }}
                >
                  <FiberManualRecordIcon
                    style={{
                      height: 10,
                      width: 10,
                      marginRight: 8,
                    }}
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div
              style={{
                borderTop: "0.5px solid #999999",
              }}
            >
              <Typography
                variant="h6"
                component="h1"
                style={{ fontWeight: "bold", paddingTop: 20 }}
              >
                Indicators
              </Typography>
            </div>

            <div
              style={{
                paddingTop: 15,
                paddingBottom: 20,
              }}
            >
              {analyze.map((index, idx) => {
                return (
                  <li
                    key={idx}
                    style={{
                      paddingBottom: 5,
                      textAlign: "justify",
                    }}
                  >
                    <strong>{Object.keys(index)[0]}:</strong>{" "}
                    {Object.values(index)[0]}
                  </li>
                );
              })}
            </div>
          </>
        )}
        <hr />
        <div
          style={{
            borderTop: "0.5px solid #999999",
          }}
        >
          <Typography
            variant="subtitle1"
            style={{ fontSize: "1rem", color: "#757575", paddingTop: 30 }}
          >
            <strong>Disclaimer:</strong> The information provided on this
            platform is for informational purposes only and does not constitute
            medical advice. Always consult with a qualified healthcare
            professional for personalized guidance and treatment.
          </Typography>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: 50,
            paddingBottom: 30,
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
            onClick={retake}
          >
            Retake Assessment
          </Button>
        </div>
      </Box>
    </Container>
  );
};

export default Result;
