import React, { useId, useState } from "react";
import classes from "./Table.module.css"; // Asegúrate de que el archivo CSS está correctamente importado
import Pagination from "./Pagination.jsx";

const {
  header,
  tableStyle,
  content,
  contenedorInput,
  tableContainer,
  tableContainerMin,
  contendorFechas,
  filterButton, // Nueva clase para reemplazar flex justify-center cursor-pointer
  tableRow, // Nueva clase para reemplazar table-row
  hidden, // Clase para ocultar filtros
  roundedPill, // Clase personalizada para rounded-full
} = classes;

/**
 * Componente de tabla con soporte para seleccionar filas y doble clic.
 * @param {Object} props - Propiedades del componente.
 * @returns {React.JSX.Element} Componente de tabla.
 */
const Table = ({
  headers = [
    {
      name: "Encabezado 1",
      filter: {
        type: "number",
        name: "col1",
      },
    },
    {
      name: "Encabezado 2",
      filter: {
        type: "text",
        name: "col2",
      },
    },
  ],
  data = [
    {
      "Encabezado 1": 1,
      "Encabezado 2": 2,
    },
    {
      "Encabezado 1": "a",
      "Encabezado 2": "b",
    },
  ],
  onSelectRow = undefined,
  onDoubleClickRow = undefined,
  onChange = (e) => {
    // console.log(e.target.name, e.target.value);
  },
  onSubmit = (e) => e.preventDefault(),
  tamaño = "",
  numeracion = true,
  filtro = true,
}) => {
  const idForm = useId();
  const [showFilters, setShowFilters] = useState(false);

  return (
    <form
      className={
        tamaño === "tableContainerMin" ? tableContainerMin : tableContainer
      }
      onSubmit={onSubmit}
      onChange={onChange}
    >
      <table className={tableStyle}>
        <thead className={header}>
          <tr>
            <th onClick={() => setShowFilters((old) => !old)}>
              {filtro ? (
                <div className={filterButton}>
                  <img
                    title="Ver filtros"
                    src="/btn-filter.svg"
                    alt="Filter"
                    width={30}
                  />
                </div>
              ) : (
                ""
              )}
            </th>
            {headers.map(({ name }, idx) => (
              <th key={idx}>{name}</th>
            ))}
          </tr>
          <tr className={showFilters ? tableRow : hidden}>
            <th></th>
            {headers.map(({ filter }, idx) => (
              <th key={idx}>
                {filter &&
                  (filter?.type === "select" ? (
                    <select id={`${idForm}_${filter.name}`} name={filter.name}>
                      {filter?.options.map(({ value, label }) => {
                        return (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        );
                      })}
                    </select>
                  ) : filter?.type === "date" ? (
                    <div className={contendorFechas}>
                      <input
                        className={contenedorInput}
                        id={`${idForm}_${filter.name1}`}
                        type={filter.type}
                        name={filter.name1}
                      />
                      <input
                        className={contenedorInput}
                        id={`${idForm}_${filter.name2}`}
                        type={filter.type}
                        name={filter.name2}
                      />
                    </div>
                  ) : (
                    <input
                      className={contenedorInput}
                      id={`${idForm}_${filter.name}`}
                      type={
                        filter.type
                          ? filter.type === "number"
                            ? "tel"
                            : filter.type
                          : "text"
                      }
                      name={filter.name}
                    />
                  ))}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={content}>
          {!data?.length ? (
            <tr>
              <td colSpan={headers?.length + 1}>No hay datos</td>
            </tr>
          ) : (
            data.map((row, idxRow) => (
              <tr
                key={idxRow}
                onClick={(e) => onSelectRow?.(idxRow, e)}
                onDoubleClick={(e) => onDoubleClickRow?.(idxRow, e)}
              >
                <td>
                  {numeracion ? (
                    <p className={roundedPill}>{idxRow + 1}</p>
                  ) : (
                    ""
                  )}
                </td>
                {Object.entries(row).map(([, dataValue], inxDV) => (
                  <td key={inxDV}>{dataValue}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </form>
  );
};

Table.Pagination = Pagination;

export default Table;
