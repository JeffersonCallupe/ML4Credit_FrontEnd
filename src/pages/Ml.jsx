import React, { useState, useEffect } from "react";

// Componente para el spinner de carga
const LoadingSpinner = () => (
  <div className="flex justify-center items-center">
    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-4 border-gray-200 rounded-full" />
  </div>
);

const Ml = () => {
  const [sqlQuery, setSqlQuery] = useState("");
  const [output, setOutput] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDb, setSelectedDb] = useState("default");
  const [databases, setDatabases] = useState([]);
  const [tablas, setTablas] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [mlOutput, setMlOutput] = useState(null);
  const [tipoModelo, setTipoModelo] = useState("clasificacion");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8000/sql/metadata", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDatabases(data);
        if (data.length > 0) {
          setSelectedDb(data[0].base);
        }
      })
      .catch((err) => {
        console.error("❌ Error cargando metadata:", err);
      });
  }, []);

  useEffect(() => {
    const dbSeleccionada = databases.find((db) => db.base === selectedDb);
    if (dbSeleccionada) {
      setTablas(dbSeleccionada.tablas);
      setSelectedTable("");
    } else {
      setTablas([]);
      setSelectedTable("");
    }
  }, [selectedDb, databases]);

  const handleRunQuery = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:8000/sql/ejecutar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ consulta: sqlQuery }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Error ejecutando consulta");
      }

      const data = await response.json();
      setOutput(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEjecutarModelo = async () => {
    const token = localStorage.getItem("token");
    const codigos = output.map((row) => row.codinternocliente).filter(Boolean);

    if (codigos.length === 0) {
      alert("No hay codinternocliente en los resultados.");
      return;
    }

    const tipo_modelo = tipoModelo;

    try {
      const response = await fetch("http://localhost:8000/ml/ejecutar_desde_bd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ codigos, tipo_modelo }),
      });

      const data = await response.json();
      setMlOutput(data);
    } catch (error) {
      console.error("❌ Error ejecutando modelo:", error);
      alert("Error al ejecutar el modelo");
    }
  };

  return (
    <div className="container mx-auto">
      <div className="bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            Sistema Inteligente de Campañas de Crédito Efectivo
          </h1>
          <p className="text-xl text-gray-600">
            Visualiza y ejecuta consultas SQL sobre las bases de datos y ejecuta modelos de IA.
          </p>
        </div>

        <div className="flex justify-between mb-8 items-center">
          <div className="flex items-center">
            <label className="mr-3 font-medium text-lg">Seleccionar base de datos:</label>
            <select
              value={selectedDb}
              onChange={(e) => setSelectedDb(e.target.value)}
              className="p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              {databases.map((db) => (
                <option key={db.base} value={db.base}>
                  {db.base}
                </option>
              ))}
            </select>
          </div>

          <div className="ml-4">
            <label className="mr-2 font-medium">Tipo de Modelo:</label>
            <select
              value={tipoModelo}
              onChange={(e) => setTipoModelo(e.target.value)}
              className="p-2 border rounded-md"
            >
              <option value="clasificacion">Clasificación</option>
              <option value="regresion">Regresión</option>
            </select>
          </div>

          <div>
            <button
              onClick={handleEjecutarModelo}
              className="bg-indigo-600 text-white p-3 rounded-md shadow-md hover:bg-indigo-700 transition"
            >
              Ejecutar Modelo
            </button>
          </div>
        </div>

        <div className="flex flex-col mb-6">
          <label className="mb-1 font-medium text-lg">Tabla:</label>
          <select
            value={selectedTable}
            onChange={(e) => {
              setSelectedTable(e.target.value);
              setSqlQuery(`SELECT * FROM ${e.target.value};`);
            }}
            className="p-2 border rounded-lg shadow-md"
            disabled={tablas.length === 0}
          >
            <option value="">-- Seleccionar tabla --</option>
            {tablas.map((tabla, idx) => (
              <option key={idx} value={tabla}>
                {tabla}
              </option>
            ))}
          </select>
        </div>

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

        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Resultado de la Consulta</h2>
          {loading && <LoadingSpinner />}
          {error && <div className="text-red-500 text-center">{error}</div>}
          {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse rounded-lg">
                {output.length > 0 && (
                  <thead className="bg-blue-100">
                    <tr>
                      {Object.keys(output[0]).map((col) => (
                        <th key={col} className="py-3 px-4 text-left font-medium text-gray-600">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                )}
                <tbody>
                  {output.length > 0 ? (
                    output.map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition">
                        {Object.values(row).map((val, i) => (
                          <td key={i} className="py-2 px-4">{val}</td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={10} className="py-6 text-center text-gray-400">
                        No se han encontrado resultados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {mlOutput && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {tipoModelo === "clasificacion" ? (
              <>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Tasa de Conversión</h3>
                  <p className="text-3xl font-bold text-indigo-600">
                    {(mlOutput.tasa_conversion_estimada * 100).toFixed(2)}%
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Clientes Estimados</h3>
                  <p className="text-3xl font-bold text-green-600">
                    {mlOutput.conversiones_estimadas} / {mlOutput.total_clientes}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Monto Promedio</h3>
                  <p className="text-3xl font-bold text-indigo-600">
                    S/ {mlOutput.promedio_ofertado.toFixed(2)}
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Monto Máximo</h3>
                  <p className="text-3xl font-bold text-green-600">
                    S/ {mlOutput.monto_maximo.toFixed(2)}
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Monto Mínimo</h3>
                  <p className="text-3xl font-bold text-red-600">
                    S/ {mlOutput.monto_minimo.toFixed(2)}
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Ml;
