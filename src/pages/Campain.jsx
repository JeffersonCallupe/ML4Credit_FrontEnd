import React, { useState, useEffect } from "react";
import CampaignTable from "../components/tablaCampania/CampaignTable";
import { CampaignModal } from "../components/tablaCampania/CampaignModal";
import SendCampaignModal from "../components/tablaCampania/SendCampaignModal";
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [sendCampaign, setSendCampaign] = useState(null);
  // Manejar envío de campaña (estructura lista para API real)
  const handleSendCampaign = ({ campaignId, clients, message }) => {
    // Aquí se conectará con la API real de envío de correos
    console.log("Enviar campaña:", { campaignId, clients, message });
    // Puedes mostrar un toast o feedback aquí
  };

// Asegúrate de incluir tu token JWT
const API_URL = "http://localhost:8000";
const token = localStorage.getItem("token");

const Campain = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCampaign, setCurrentCampaign] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [search, setSearch] = useState("");

  // Cargar campañas al iniciar
  useEffect(() => {
    fetch(`${API_URL}/campanias`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setCampaigns(data))
      .catch(err => console.error("Error al cargar campañas:", err));
  }, []);

  // Crear campaña
  const handleCreateCampaign = async (newCampaign) => {
    try {
      const res = await fetch(`${API_URL}/campanias`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newCampaign),
      });

      if (!res.ok) throw new Error("Error al crear campaña");
      const created = await res.json();
      setCampaigns(prev => [...prev, created]);
    } catch (error) {
      console.error("❌", error);
    }
  };

  // Editar campaña
  const handleEditCampaign = async (editedCampaign) => {
    try {
      const res = await fetch(`${API_URL}/campanias/${editedCampaign.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedCampaign),
      });

      if (!res.ok) throw new Error("Error al editar campaña");
      const updated = await res.json();

      setCampaigns(prev =>
        prev.map(c => (c.id === updated.id ? updated : c))
      );
      console.log("🟢 Campaña actualizada:", updated);

    } catch (error) {
      console.error("❌", error);
    }
  };

  // Eliminar campaña
  const handleDeleteCampaign = async (id) => {
    try {
      const res = await fetch(`${API_URL}/campanias/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Error al eliminar campaña");

      setCampaigns(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      console.error("❌", error);
    }
  };

  return (
    <div>

      <CampaignTable
        data={campaigns}
        search={search}
        setSearch={setSearch}
        setIsModalOpen={setIsModalOpen}
        setCurrentCampaign={setCurrentCampaign}
        handleEditCampaign={handleEditCampaign}
        handleDeleteCampaign={handleDeleteCampaign}
        onSendCampaign={(campaign) => {
          setSendCampaign(campaign);
          setIsSendModalOpen(true);
        }}
      />
      <SendCampaignModal
        isOpen={isSendModalOpen}
        onClose={() => setIsSendModalOpen(false)}
        campaign={sendCampaign}
        onSend={handleSendCampaign}
      />

      <CampaignModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateCampaign}
        onEdit={handleEditCampaign}
        campaign={currentCampaign}
      />
    </div>
  );
};

export default Campain;
