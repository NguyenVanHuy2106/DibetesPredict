import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosConfig";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ScatterChart,
  Scatter,
} from "recharts";

const TrainChart = () => {
  const [dataChart1, setDataChart1] = useState([]);
  const [dataChart2, setDataChart2] = useState([]);
  //   const jsonData = {
  //     data: [
  //       { age: 80.0, bmi: 25.19, diabetes: 0 },
  //       { age: 54.0, bmi: 27.32, diabetes: 0 },
  //       { age: 36.0, bmi: 23.45, diabetes: 1 },
  //       { age: 20.0, bmi: 27.32, diabetes: 0 },
  //       { age: 79.0, bmi: 23.86, diabetes: 1 },
  //       { age: 32.0, bmi: 27.32, diabetes: 0 },
  //       { age: 45.0, bmi: 30.0, diabetes: 1 }, // Dữ liệu thêm
  //       { age: 60.0, bmi: 22.0, diabetes: 0 },
  //       { age: 28.0, bmi: 26.0, diabetes: 1 },
  //     ],
  //   };

  const fetchDataChart1 = async (pageNumber) => {
    try {
      const response = await axiosInstance.get(
        "model/analysis/correlation-feature"
      );
      setDataChart1(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchDataChart2 = async (pageNumber) => {
    try {
      const response = await axiosInstance.get("model/analysis/age-bmi");
      setDataChart2(response.data.data);
      //console.log(response.data);
      //setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const dataMapped = dataChart1.map((item) => ({
    feature: item[0], // Tên biến
    value: item[1], // Giá trị tương ứng
  }));
  //   const dataMapped2 = jsonData.data.map((item) => ({
  //     age: item.age,
  //     bmi: item.bmi,
  //     diabetes: item.diabetes,
  //   }));

  useEffect(() => {
    fetchDataChart1();
    fetchDataChart2(); // Fetch data on mount or when page changes (1-based index for API)
  }, [dataChart1]);
  return (
    <div>
      <div>
        <h1>Correlation Feature Importance</h1>
        <BarChart width={600} height={300} data={dataMapped}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="feature" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </div>
      <div>
        <h1>Diabetes Data Visualization</h1>
        <ScatterChart width={600} height={300}>
          <CartesianGrid />
          <XAxis type="number" dataKey="age" name="Age" />
          <YAxis type="number" dataKey="bmi" name="BMI" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Legend />

          {/* Chấm xanh cho người không bị tiểu đường */}
          <Scatter
            name="Non Diabetes"
            data={dataChart2.filter((item) => item.diabetes === 0)}
            fill="#0088FE"
          />

          {/* Chấm đỏ cho người bị tiểu đường */}
          <Scatter
            name="Diabetes"
            data={dataChart2.filter((item) => item.diabetes === 1)}
            fill="#FF0000"
          />
        </ScatterChart>
      </div>
    </div>
  );
};

export default TrainChart;
