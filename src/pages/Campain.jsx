import React, { useState } from "react";
import CampaignTable from "../components/tablaCampania/CampaignTable";
import { CampaignModal } from "../components/tablaCampania/CampaignModal";
import campaignsData from "../app/dashboard/campaignsData.json"; // Asegúrate de que tienes los datos

const Campain = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCampaign, setCurrentCampaign] = useState(null); // Usado para editar
  const [campaigns, setCampaigns] = useState(campaignsData); // Lista de campañas
  const [search, setSearch] = useState("");

  // Función para crear campaña
  const handleCreateCampaign = (newCampaign) => {
    setCampaigns([...campaigns, { ...newCampaign, id: campaigns.length + 1 }]);
  };

  // Función para editar campaña
  const handleEditCampaign = (editedCampaign) => {
    const updatedCampaigns = campaigns.map((campaign) =>
      campaign.id === editedCampaign.id ? editedCampaign : campaign
    );
    setCampaigns(updatedCampaigns);
  };

  // Función para eliminar campaña
  const handleDeleteCampaign = (campaignId) => {
    const updatedCampaigns = campaigns.filter(
      (campaign) => campaign.id !== campaignId
    );
    setCampaigns(updatedCampaigns);
  };

  return (
    <div>
      {/* Tabla de campañas */}
      <CampaignTable
        data={campaigns}
        search={search}
        setSearch={setSearch}
        setIsModalOpen={setIsModalOpen}
        setCurrentCampaign={setCurrentCampaign}
        handleEditCampaign={handleEditCampaign}
        handleDeleteCampaign={handleDeleteCampaign}
      />

      {/* Modal para crear o editar campaña */}
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
