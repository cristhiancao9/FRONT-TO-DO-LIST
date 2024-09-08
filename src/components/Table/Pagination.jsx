import React from "react";
import { useState, useEffect, useCallback } from "react";
import classes from "./Table.module.css";

const Pagination = ({ 
  onClickPrev, 
  onClickNext, 
  currentPage = 1, 
  totalPages = 1,
  onSetPageData = (_) => {},
 }) => {

  const {
    flechaDerPaginacion
  } = classes;
  const [{ page, limit }, setPaginationData] = useState({ page: 1, limit: 10 });

  useEffect(() => {
    onSetPageData({ page, limit });
  }, [onSetPageData, page, limit]);

  useEffect(() => {
    if (totalPages < page) {
      setPaginationData(({ limit }) => ({ limit, page: 1 }));
    }
  }, [totalPages, page]);
  return (
    <div className="flex flex-row gap-6 items-center text-black my-2 mx-auto">
      <div className="flex flex-row gap-2 items-center  text-sky-400">
        <div 
        className="flex flex-row gap-1 items-center cursor-pointer"
        onClick={useCallback(() => {
          if (page < 2) {
            return;
          }
          setPaginationData?.(({ limit }) => ({
            limit,
            page: page - 1,
          }));
        }, [page])}
        >
          <span className={`bi bi-chevron-left`}/>
          <p>Anterior</p>
        </div>
        <p>{page ?? 0}</p>
        <p>de</p>
        <p>{totalPages ?? 0}</p>
        <div 
        className="flex flex-row gap-1 items-center cursor-pointer"
        onClick={useCallback(() => {
          if (page >= totalPages) {
            return;
          }
          setPaginationData?.(({ limit }) => ({
            limit,
            page: page + 1,
          }));
        }, [page, totalPages])}
        >
          <p>Siguiente</p>
          <span className={`bi bi-chevron-right`}/>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
