import React, { useState, useMemo } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function ClientTable({ data }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 8;

  const showCorreo = data.length > 0 && "correo" in data[0];
  const showDNI = data.length > 0 && "dni" in data[0];


  const filtered = useMemo(() => {
    if (!search) return data;
    return data.filter(item =>
      item.dni.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  const pageCount = Math.ceil(filtered.length / rowsPerPage);
  const paginated = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filtered.slice(start, start + rowsPerPage);
  }, [filtered, page]);

  const handlePageChange = (next) => {
    if (next < 1 || next > pageCount) return;
    setPage(next);
  };

  React.useEffect(() => setPage(1), [search]);

  const totalClientes = data.length;

  return (
    <div className="w-full bg-white rounded-xl shadow p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h2 className="text-xl font-semibold">
          Clientes - Todos <span className="text-blue-600">({totalClientes.toLocaleString()})</span>
        </h2>

        <input
          type="text"
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-64 transition"
          placeholder="Buscar por DNI..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-blue-100 text-gray-700">
              {showDNI && <th className="py-3 px-4 text-left font-semibold">DNI</th>}
              <th className="py-3 px-4 text-left font-semibold">Nombres</th>
              <th className="py-3 px-4 text-left font-semibold">Apellidos</th>
              {showCorreo && <th className="py-3 px-4 text-left font-semibold">Correo</th>}
              <th className="py-3 px-4 text-left font-semibold">Estado</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length > 0 ? (
              paginated.map((c, idx) => (
                <tr
                  key={c.id}
                  className={classNames(
                    idx % 2 === 0 ? "bg-white" : "bg-blue-50",
                    "transition hover:bg-blue-100"
                  )}
                >
                  {showDNI && <td className="py-2 px-4">{c.dni}</td>}
                  <td className="py-2 px-4">{c.nombres}</td>
                  <td className="py-2 px-4">{c.apellidos}</td>
                  {showCorreo && (
                    <td className="py-2 px-4">{c.correo ?? "--"}</td>
                  )}
                  <td className="py-2 px-4">
                    <span className={c.estado === "Activo"
                      ? "bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs"
                      : "bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs"
                    }>
                      {c.estado}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={ 3 + (showDNI ? 1 : 0) + (showCorreo ? 1 : 0)} className="py-6 px-4 text-center text-gray-400">
                  No se encontraron resultados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <span className="text-xs text-gray-500">
          Mostrando {paginated.length} de {filtered.length} resultado(s)
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
            className="px-3 py-1 rounded hover:bg-blue-200 disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="px-2 py-1 text-sm">{page} / {pageCount || 1}</span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= pageCount}
            className="px-3 py-1 rounded hover:bg-blue-200 disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
