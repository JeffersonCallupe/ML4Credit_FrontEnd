import React, { useState, useEffect } from "react";
import axios from "axios";

const EmailCampanas = () => {
  const [destinatario, setDestinatario] = useState("");
  const [asunto, setAsunto] = useState("");
  const [contenido, setContenido] = useState("");
  const [tracking, setTracking] = useState([]);

  const enviarCorreo = async () => {
    try {
      await axios.post("http://localhost:8000/campania-email/enviar", {
        asunto,
        html: contenido,
        destinatarios: [destinatario],
        usuario: "admin@ml4credit.com", // o extraer del token localStorage
      });
      alert("Correo enviado exitosamente.");
    } catch (err) {
      console.error("Error al enviar correo:", err);
      alert("Error al enviar correo.");
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/tracking")
      .then((res) => setTracking(res.data))
      .catch((err) => console.error("Error al obtener tracking:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Enviar Campaña de Marketing</h1>

      <div className="space-y-4">
        <input
          type="email"
          className="border p-2 w-full"
          placeholder="Correo destinatario"
          value={destinatario}
          onChange={(e) => setDestinatario(e.target.value)}
        />
        <input
          type="text"
          className="border p-2 w-full"
          placeholder="Asunto"
          value={asunto}
          onChange={(e) => setAsunto(e.target.value)}
        />
        <textarea
          className="border p-2 w-full"
          placeholder="Contenido HTML"
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
        />
        <button
          onClick={enviarCorreo}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Enviar correo
        </button>
      </div>

      <h2 className="text-lg font-semibold mt-8 mb-2">Eventos de Tracking</h2>
      <ul className="text-sm text-gray-700">
        {tracking.map((evento, idx) => (
          <li key={idx}>
            {evento.email} - {evento.evento} -{" "}
            {new Date(evento.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmailCampanas;
