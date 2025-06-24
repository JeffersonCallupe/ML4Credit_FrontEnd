import React, { useState, useEffect } from "react";

export const CampaignModal = ({ isOpen, onClose, onCreate, onEdit, campaign }) => {
  const [nombre, setNombre] = useState("");
  const [estado, setEstado] = useState("Activo");
  const [ultimaActualizacion, setUltimaActualizacion] = useState("");
  const [duracion, setDuracion] = useState("");
  const [estrategia, setEstrategia] = useState("");

  // Si hay una campaña para editar, llenamos los campos con sus datos
  useEffect(() => {
    if (campaign) {
      setNombre(campaign.nombre);
      setEstado(campaign.estado);
      setUltimaActualizacion(campaign.ultimaActualizacion);
      setDuracion(campaign.duracion);
      setEstrategia(campaign.estrategia);
    } else {
      setNombre("");
      setEstado("Activo");
      setUltimaActualizacion("");
      setDuracion("");
      setEstrategia("");
    }
  }, [campaign]);

  const handleSubmit = () => {
    const newCampaign = {
      nombre,
      estado,
      ultimaActualizacion,
      duracion,
      estrategia,
    };

    if (campaign) {
      // Si estamos editando, llamamos a onEdit
      onEdit({ ...newCampaign, id: campaign.id });
    } else {
      // Si estamos creando, llamamos a onCreate
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
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre de la campaña</label>
            <input
              id="nombre"
              type="text"
              placeholder="Nombre de la campaña"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="border p-2 rounded-md w-full"
            />
          </div>

          {/* Campo Última Actualización */}
          <div className="mb-4">
            <label htmlFor="ultimaActualizacion" className="block text-sm font-medium text-gray-700">Última Actualización</label>
            <input
              id="ultimaActualizacion"
              type="date"
              value={ultimaActualizacion}
              onChange={(e) => setUltimaActualizacion(e.target.value)}
              className="border p-2 rounded-md w-full"
            />
          </div>

          {/* Campo Duración */}
          <div className="mb-4">
            <label htmlFor="duracion" className="block text-sm font-medium text-gray-700">Duración</label>
            <input
              id="duracion"
              type="text"
              placeholder="Duración"
              value={duracion}
              onChange={(e) => setDuracion(e.target.value)}
              className="border p-2 rounded-md w-full"
            />
          </div>

          {/* Campo Estrategia */}
          <div className="mb-4">
            <label htmlFor="estrategia" className="block text-sm font-medium text-gray-700">Estrategia</label>
            <select
              id="estrategia"
              value={estrategia}
              onChange={(e) => setEstrategia(e.target.value)}
              className="border p-2 rounded-md w-full"
            >
              <option value="Cross-selling">Cross-selling</option>
              <option value="Generación de leads">Generación de leads</option>
              <option value="informativo">informativo</option>
              <option value="Lanzamiento">Lanzamiento</option>
              <option value="Marketing">Marketing</option>
              <option value="Nurturing">Nurturing</option>
              <option value="Recuperación de leads">Recuperación de leads</option>
            </select>
          </div>

          {/* Campo Estado */}
          <div className="mb-4">
            <label htmlFor="estado" className="block text-sm font-medium text-gray-700">Estado</label>
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
