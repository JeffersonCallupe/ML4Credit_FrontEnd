import React, { useState, useEffect } from "react";

export const CampaignModal = ({ isOpen, onClose, onCreate, onEdit, campaign }) => {
  const [nombre, setNombre] = useState("");
  const [estado, setEstado] = useState("Activo");
  const [ultimaActualizacion, setUltimaActualizacion] = useState("");
  const [duracion, setDuracion] = useState("");
  const [estrategia, setEstrategia] = useState("");

  useEffect(() => {
    if (isOpen && !campaign) {
      // Modal abierto en modo creación: resetea campos
      setNombre("");
      setEstado("Activo");
      setUltimaActualizacion("");
      setDuracion("");
      setEstrategia("Cross-selling"); // o el valor por defecto que prefieras
    }

    if (isOpen && campaign) {
      // Modal abierto en modo edición: precarga valores
      setNombre(campaign.nombre);
      setEstado(campaign.estado);
      setUltimaActualizacion(campaign.ultima_actualizacion?.substring(0, 10) || "");
      setDuracion(campaign.duracion);
      setEstrategia(campaign.estrategia);
    }
  }, [isOpen, campaign]);


  const handleSubmit = () => {
    if (!nombre || !ultimaActualizacion || !duracion || !estrategia) {
      alert("Completa todos los campos.");
      return;
    }

    const newCampaign = {
      nombre,
      estado,
      ultima_actualizacion: ultimaActualizacion, // Formato YYYY-MM-DD
      duracion,
      estrategia,
    };

    if (campaign) {
      onEdit({ ...newCampaign, id: campaign.id });
    } else {
      onCreate(newCampaign);
    }

    onClose();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
        <div className="bg-white p-6 rounded-md w-96">
          <h2 className="text-xl font-semibold mb-4">
            {campaign ? "Editar Campaña" : "Crear Campaña"}
          </h2>

          {/* Campo Nombre */}
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
              Nombre de la campaña
            </label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="border p-2 rounded-md w-full"
            />
          </div>

          {/* Última Actualización */}
          <div className="mb-4">
            <label htmlFor="ultimaActualizacion" className="block text-sm font-medium text-gray-700">
              Última Actualización
            </label>
            <input
              id="ultimaActualizacion"
              type="date"
              value={ultimaActualizacion}
              onChange={(e) => setUltimaActualizacion(e.target.value)}
              className="border p-2 rounded-md w-full"
            />
          </div>

          {/* Duración */}
          <div className="mb-4">
            <label htmlFor="duracion" className="block text-sm font-medium text-gray-700">
              Duración
            </label>
            <input
              id="duracion"
              type="text"
              value={duracion}
              onChange={(e) => setDuracion(e.target.value)}
              className="border p-2 rounded-md w-full"
            />
          </div>

          {/* Estrategia */}
          <div className="mb-4">
            <label htmlFor="estrategia" className="block text-sm font-medium text-gray-700">
              Estrategia
            </label>
            <select
              id="estrategia"
              value={estrategia}
              onChange={(e) => setEstrategia(e.target.value)}
              className="border p-2 rounded-md w-full"
            >
              <option value="Cross-selling">Cross-selling</option>
              <option value="Generación de leads">Generación de leads</option>
              <option value="informativo">Informativo</option>
              <option value="Lanzamiento">Lanzamiento</option>
              <option value="Marketing">Marketing</option>
              <option value="Nurturing">Nurturing</option>
              <option value="Recuperación de leads">Recuperación de leads</option>
            </select>
          </div>

          {/* Estado */}
          <div className="mb-4">
            <label htmlFor="estado" className="block text-sm font-medium text-gray-700">
              Estado
            </label>
            <select
              id="estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              className="border p-2 rounded-md w-full"
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="bg-gray-400 text-white p-2 rounded-md"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white p-2 rounded-md"
            >
              {campaign ? "Guardar Cambios" : "Crear"}
            </button>
          </div>
        </div>
      </div>
    )
  );
};
