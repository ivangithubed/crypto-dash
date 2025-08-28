import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const CoinChart = ({ coinID }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      const response = await fetch(
        `${
          import.meta.env.VITE_COIN_API_URL
        }/${coinID}/market_chart?vs_currency=usd&days=7`
      );
      if (!response.ok) {
        throw new Error("Не вдалось отримати дані");
      }
      const data = await response.json();
      console.log(data);

      const prices = data.prices.map((price) => ({
        x: new Date(price[0]),
        y: price[1],
      }));
      setChartData({
        datasets: [
          {
            label: "Ціна (USD)",
            data: prices,
            fill: true,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            tension: 0.3,
            pointRadius: 0,
          },
        ],
      });
      setLoading(false);
    };
    fetchChartData();
  }, [coinID]);

  if (loading) {
    return <div>Loading chart...</div>;
  }

  return (
    <div style={{ marginTop: "30px" }}>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: false,
                // display: true
            },
            tooltip: {
              mode: "index",
              intersect: false,
            },
          //   scales: {
          //   x: {
          //     type: "time",
          //     time: {
          //       unit: "day",
          //       tooltipFormat: "ll",
          //     },
          //     ticks: {
          //       autoSkip: true,
          //       maxTicksLimit: 7,
          //     },
          //     // title: {
          //     //   display: true,
          //     //   text: "Дата",
          //     // },
          //   },
          //   y: {
          //     ticks: {
          //       callback: (value) => `$${value.toLocaleString()}`,
          //     },
          //     // title: {
          //     //   display: true,
          //     //   text: "Ціна (USD)",
          //     // },
          //   },
          // },
          },
          scales: {
            x: {
              type: "time",
              time: {
                unit: "day",
                tooltipFormat: "ll",
              },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 7,
              },
              title: {
                // display: true,
                display: false,
                text: "Дата",
              },
            },
            y: {
              ticks: {
                callback: (value) => `$${value.toLocaleString()}`,
              },
              title: {
                // display: true,
                display: false,
                text: "Ціна (USD)",
              },
            },
          },
        }}
      />
    </div>
  );
};
export default CoinChart;
