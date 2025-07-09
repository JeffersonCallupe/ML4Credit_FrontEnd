import React, { useState, useEffect } from "react";
import CampaignTable from "../components/tablaCampania/CampaignTable";
import { CampaignModal } from "../components/tablaCampania/CampaignModal";

const API_URL = "http://localhost:8000";

const Campain = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCampaign, setCurrentCampaign] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [search, setSearch] = useState("");

  // Función para obtener el token desde localStorage
  const getToken = () => localStorage.getItem("token");

  // Cargar campañas al iniciar
  useEffect(() => {
    const token = getToken();
    if (!token) {
      window.location.href = "/login";
      return;
    }

    fetch(`${API_URL}/campanias`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          console.warn("🔒 Token inválido o expirado");
          localStorage.removeItem("token");
          window.location.href = "/login";
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data && Array.isArray(data)) {
          setCampaigns(data);
        } else if (data) {
          console.error("⚠️ Respuesta inesperada del backend:", data);
          setCampaigns([]);
        }
      })
      .catch((err) => console.error("❌ Error al cargar campañas:", err));
  }, []);

  // Crear campaña
  const handleCreateCampaign = async (newCampaign) => {
    const token = getToken();
    try {
      const res = await fetch(`${API_URL}/campanias`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newCampaign),
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      if (!res.ok) throw new Error("Error al crear campaña");

      const created = await res.json();
      setCampaigns((prev) => [...prev, created]);
    } catch (error) {
      console.error("❌", error);
    }
  };

  // Editar campaña
  const handleEditCampaign = async (editedCampaign) => {
    const token = getToken();
    try {
      const res = await fetch(`${API_URL}/campanias/${editedCampaign.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedCampaign),
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      if (!res.ok) throw new Error("Error al editar campaña");

      const updated = await res.json();
      setCampaigns((prev) =>
        prev.map((c) => (c.id === updated.id ? updated : c))
      );
      console.log("🟢 Campaña actualizada:", updated);
    } catch (error) {
      console.error("❌", error);
    }
  };

  // Eliminar campaña
  const handleDeleteCampaign = async (id) => {
    const token = getToken();
    try {
      const res = await fetch(`${API_URL}/campanias/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      if (!res.ok) throw new Error("Error al eliminar campaña");

      setCampaigns((prev) => prev.filter((c) => c.id !== id));
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
