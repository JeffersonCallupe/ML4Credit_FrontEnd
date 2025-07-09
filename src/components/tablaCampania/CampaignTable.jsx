import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button"; // Suponiendo que usas un componente Button de tu librería UI
import { jsPDF } from "jspdf"; // Importando jsPDF

const CampaignTable = ({
  data,
  search,
  setSearch,
  setIsModalOpen,
  setCurrentCampaign,
  handleEditCampaign,
  handleDeleteCampaign,
}) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 8;

  const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter(item =>
      item.nombre.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  const pageCount = Math.ceil(filteredData.length / rowsPerPage);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, page]);

  const handlePageChange = (nextPage) => {
    if (nextPage < 1 || nextPage > pageCount) return;
    setPage(nextPage);
  };

  // Función para descargar el reporte como PDF
  const downloadReport = (campaign) => {
    const doc = new jsPDF();

    doc.text(`Reporte de la campaña: ${campaign.nombre}`, 10, 10);
    doc.text(`Estado: ${campaign.estado}`, 10, 20);
    doc.text(`Última Actualización: ${campaign.ultimaActualizacion}`, 10, 30);
    doc.text(`Duración: ${campaign.duracion}`, 10, 40);
    doc.text(`Estrategia: ${campaign.estrategia}`, 10, 50);

    // Guardar el archivo PDF
    doc.save(`${campaign.nombre}_Reporte.pdf`);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-700">
          Campañas - Todos ({filteredData.length})
        </h1>
        <Button
          onClick={() => {
            setIsModalOpen(true);
            setCurrentCampaign(null); // Para crear nueva campaña
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Crear Nueva Campaña
        </Button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          className="border p-2 rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-blue-100 text-gray-700">
            <th className="py-2 px-4 text-left">Nombre</th>
            <th className="py-2 px-4 text-left">Estado</th>
            <th className="py-2 px-4 text-left">Última Actualización</th>
            <th className="py-2 px-4 text-left">Duración</th>
            <th className="py-2 px-4 text-left">Estrategia</th>
            <th className="py-2 px-4 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((campaign) => (
              <tr key={campaign.id} className="hover:bg-gray-50">
                <td className="py-2 px-4">{campaign.nombre}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      campaign.estado === "Activo"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {campaign.estado}
                  </span>
                </td>
                <td className="py-2 px-4">{campaign.ultima_actualizacion?.substring(0, 10)}</td>
                <td className="py-2 px-4">{campaign.duracion}</td>
                <td className="py-2 px-4">{campaign.estrategia}</td>
                <td className="py-2 px-4 flex gap-2">
                  <Button
                    onClick={() => {
                      setIsModalOpen(true);
                      setCurrentCampaign(campaign); // Para editar la campaña
                    }}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={() => handleDeleteCampaign(campaign.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                  >
                    Eliminar
                  </Button>
                  <Button
                    onClick={() => downloadReport(campaign)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Descargar Reporte
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="py-6 text-center text-gray-400">
                No se encontraron campañas.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-500">
          Mostrando {paginatedData.length} de {filteredData.length} campaña(s)
        </span>
        <div className="flex gap-2">
          <Button
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
            className="px-3 py-1 rounded hover:bg-blue-200 disabled:opacity-50"
          >
            Anterior
          </Button>
          <span className="px-2 py-1 text-sm">{page} / {pageCount}</span>
          <Button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= pageCount}
            className="px-3 py-1 rounded hover:bg-blue-200 disabled:opacity-50"
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CampaignTable;
