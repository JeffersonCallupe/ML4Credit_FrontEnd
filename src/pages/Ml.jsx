import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  PieChart,
  Pie,
  ComposedChart
} from "recharts";

const Ml = () => {
  const [sqlQuery, setSqlQuery] = useState("");
  const [output, setOutput] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRunQuery = () => {
    setLoading(true);
    setError(null);

    setTimeout(() => {
      try {
        // Simula la consulta SQL para fines demostrativos.
        const simulatedResult = [
          { first_name: "John", age: 31 },
          { first_name: "Robert", age: 22 },
          { first_name: "David", age: 25 },
        ];
        setOutput(simulatedResult);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError("Hubo un error al ejecutar la consulta.");
      }
    }, 1500);
  };

  // Datos de ejemplo para las gráficas
  const data = [
    { name: "Model 1", accuracy: 85, precision: 80, recall: 78, f1: 82 },
    { name: "Model 2", accuracy: 88, precision: 82, recall: 80, f1: 84 },
    { name: "Model 3", accuracy: 90, precision: 85, recall: 84, f1: 88 },
  ];

  return (
    <div className="container mx-auto p-8">
      {/* Card principal */}
      <div className="bg-white rounded-lg shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            Sistema Inteligente de Campañas de Crédito Efectivo
          </h1>
          <p className="text-xl text-gray-600">
            Visualiza y ejecuta consultas SQL sobre las bases de datos y ejecuta modelos de IA.
          </p>
        </div>

        {/* Editor SQL */}
        <div className="bg-gray-50 p-6 rounded-md shadow-md mb-8">
          <h2 className="text-3xl font-semibold mb-4">Editor SQL</h2>
          <textarea
            className="w-full p-4 border rounded-md h-36 mb-4 focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Escribe tu consulta SQL aquí..."
            value={sqlQuery}
            onChange={(e) => setSqlQuery(e.target.value)}
          />
          <button
            onClick={handleRunQuery}
            className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition"
          >
            {loading ? "Ejecutando..." : "Ejecutar SQL"}
          </button>
        </div>

        {/* Resultados */}
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Resultado de la Consulta</h2>
          {loading && <LoadingSpinner />}
          {error && <div className="text-red-500 text-center">{error}</div>}
          {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse rounded-lg">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="py-3 px-4 text-left font-medium text-gray-600">First Name</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-600">Age</th>
                  </tr>
                </thead>
                <tbody>
                  {output.length > 0 ? (
                    output.map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition">
                        <td className="py-2 px-4">{row.first_name}</td>
                        <td className="py-2 px-4">{row.age}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2} className="py-6 text-center text-gray-400">
                        No se han encontrado resultados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Gráficas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {/* Gráfico de Barras */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Gráfico de Barras</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="accuracy" fill="#8884d8" />
                <Bar dataKey="precision" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de Líneas */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Gráfico de Líneas</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="accuracy" stroke="#8884d8" />
                <Line type="monotone" dataKey="precision" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de Radar */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Gráfico de Radar</h3>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart outerRadius="80%" width="100%" height={250} data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <Radar name="Accuracy" dataKey="accuracy" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Radar name="Precision" dataKey="precision" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de Área */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Gráfico de Área</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="accuracy" fill="#8884d8" />
                <Area type="monotone" dataKey="precision" fill="#82ca9d" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de Dispersión */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Gráfico de Dispersión</h3>
            <ResponsiveContainer width="100%" height={250}>
              <ScatterChart>
                <CartesianGrid />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Scatter data={data} fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de Pastel */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Gráfico de Pastel</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="accuracy"
                  nameKey="name"
                  outerRadius="80%"
                  fill="#8884d8"
                  label
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ml;
