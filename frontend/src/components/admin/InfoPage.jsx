import { server } from "@/main";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const InfoPage = () => {
  const [cod, setCod] = useState("");
  const [online, setOnline] = useState("");
  const [data, setData] = useState([]);

  async function fetchStats() {
    try {
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: {
          token: Cookies.get("token"),
        },
      });

      setCod(data.cod);
      setOnline(data.online);
      setData(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  const paymentData = [
    {
      method: "online",
      users: online,
      fill: "#03bafc",
    },
    {
      method: "cod",
      users: cod,
      fill: "#8c1251",
    },
  ];

  const paymentChartConfig = {
    users: {
      label: "Users",
    },
    online: {
      label: "Online",
      color: "#03bafc",
    },
    cod: {
      label: "COD",
      color: "#8c1251",
    },
  };

  const paymentPercentage = paymentData.map((data) => ({
    ...data,
    percentage: parseFloat(
      ((data.users / (cod + online)) * 100).toFixed(2)
    ),
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* ================= PAYMENT METHOD ================= */}
      <Card
        className="
          flex flex-col
          bg-[#17181c] 
          border-gray-800
          text-gray-100
          shadow-lg shadow-black/20
        "
      >
        <CardHeader className="items-center pb-0">
          <CardTitle className="text-gray-100">
            Payment Methods
          </CardTitle>

          <CardDescription className="text-gray-400">
            Payment Breakdown
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={paymentChartConfig}
            className="mx-auto aspect-square max-h-[280px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    hideLabel
                    className="
                      bg-[#1d1f24]
                      border-gray-700
                      text-gray-100
                    "
                  />
                }
              />

              <Pie
                data={paymentData}
                dataKey="users"
                nameKey="method"
                innerRadius={65}
                outerRadius={95}
                strokeWidth={4}
                stroke="#17181c"
              >
                <Label
                  content={({ viewBox }) => {
                    if (
                      viewBox &&
                      "cx" in viewBox &&
                      "cy" in viewBox
                    ) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-gray-400 text-xl font-bold"
                          >
                            {cod + online} Users
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>

        <CardFooter className="flex-col gap-2 text-sm">
          <div className="leading-none text-gray-400">
            Showing total users for payment methods
          </div>
        </CardFooter>
      </Card>

      {/* ================= PAYMENT PERCENTAGE ================= */}
      <Card
        className="
          flex flex-col
          bg-[#17181c]
          border-gray-800
          text-gray-100
          shadow-lg shadow-black/20
        "
      >
        <CardHeader className="items-center pb-0">
          <CardTitle className="text-gray-100">
            Payment Percentage
          </CardTitle>

          <CardDescription className="text-gray-400">
            Payment Breakdown
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={paymentChartConfig}
            className="mx-auto aspect-square max-h-[280px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    hideLabel
                    className="
                      bg-[#1d1f24]
                      border-gray-700
                      text-gray-100
                    "
                  />
                }
              />

              <Pie
                data={paymentPercentage}
                dataKey="percentage"
                nameKey="method"
                innerRadius={65}
                outerRadius={95}
                strokeWidth={4}
                stroke="#17181c"
              >
                <Label
                  content={({ viewBox }) => {
                    if (
                      viewBox &&
                      "cx" in viewBox &&
                      "cy" in viewBox
                    ) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-gray-400 text-xl font-bold"
                          >
                            100%
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>

        <CardFooter className="flex-col gap-2 text-sm">
          <div className="leading-none text-gray-400">
            Displaying percentage distribution of payment methods
          </div>
        </CardFooter>
      </Card>

      {/* ================= PRODUCTS SOLD ================= */}
      <Card
        className="
          lg:col-span-2
          bg-[#17181c]
          border-gray-800
          text-gray-100
          shadow-lg shadow-black/20
        "
      >
        <CardHeader>
          <CardTitle className="text-gray-100">
            Products Sold
          </CardTitle>

          <CardDescription className="text-gray-400">
            Units Sold for each product
          </CardDescription>
        </CardHeader>

        <CardContent className="overflow-x-auto">
          <div className="w-full min-w-[600px] flex justify-center">
            <BarChart
              width={700}
              height={400}
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 50,
              }}
            >
              {/* Grid */}
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#303238"
              />

              {/* X AXIS */}
              <XAxis
                dataKey="sold"
                tickLine={false}
                tickMargin={10}
                axisLine={{
                  stroke: "#4b4f58",
                }}
                tick={{
                  fill: "#9ca3af",
                  fontSize: 12,
                }}
              />

              {/* Y AXIS */}
              <YAxis
                tickLine={false}
                axisLine={{
                  stroke: "#4b4f58",
                }}
                tick={{
                  fill: "#9ca3af",
                  fontSize: 12,
                }}
              />

              {/* TOOLTIP */}
              <Tooltip
                cursor={{
                  fill: "rgba(255,255,255,0.05)",
                }}
                content={({ payload }) => {
                  if (payload && payload.length) {
                    const { name, sold } = payload[0].payload;

                    return (
                      <div
                        className="
                          bg-[#1d1f24]
                          border border-gray-700
                          rounded-lg
                          px-4 py-3
                          shadow-xl
                          text-gray-100
                        "
                      >
                        <p className="font-semibold text-white">
                          {name}
                        </p>

                        <p className="text-gray-400 text-sm mt-1">
                          Sold:{" "}
                          <span className="text-blue-400 font-semibold">
                            {sold}
                          </span>
                        </p>
                      </div>
                    );
                  }

                  return null;
                }}
              />

              {/* BAR */}
              <Bar
                dataKey="sold"
                fill="#3b82f6"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-2 text-sm">
          <div className="leading-none text-gray-400">
            Hover over a bar to see the product details
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default InfoPage;