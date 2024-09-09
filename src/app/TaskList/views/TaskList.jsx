import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  addTask,
  editTask,
  deleteTask,
} from "../../../features/tasks/tasksSlice";

import { useNavigate } from "react-router-dom";
import Input from "../../../components/Input/Input";
import Table from "../../../components/Table/Table";
import classes from "./TaskList.module.css";

const {
  contenedor,
  contenedorForm,
  contenedorInput,
  nombreInput,
  contenedorSecundarioInput,
  styleInput,
  required,
  titulo,
  btnEnviar,
  btnEditar,
  btnCancelar,
} = classes;

const TaskList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const token = useSelector((state) => state.auth.token);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/public/login");
    } else {
      dispatch(fetchTasks(token));
    }
  }, [dispatch, token, navigate]);

  const handleAddOrEditTask = (e) => {
    e.preventDefault();
    if (editingTaskId) {
      dispatch(editTask({ id: editingTaskId, title, description, completed }));
    } else {
      dispatch(addTask({ title, description, completed }));
    }
    setTitle("");
    setDescription("");
    setCompleted(false);
    setEditingTaskId(null);
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  const handleEditTask = (task) => {
    setEditingTaskId(task.id);
    setTitle(task.title);
    setDescription(task.description);
    setCompleted(task.completed);
  };

  const headers = [
    { name: "Título" },
    { name: "Descripción" },
    { name: "Estado" },
    { name: "Acciones" },
  ];

  const data = tasks.map((task) => ({
    Título: task.title,
    Descripción: task.description,
    Estado: task.completed ? "Completada" : "Pendiente",
    Acciones: (
      <>
        <button
          className={btnEditar}
          onClick={() => handleEditTask(task)}
        ></button>
        <button
          className={btnCancelar}
          onClick={() => handleDeleteTask(task.id)}
        ></button>
      </>
    ),
  }));
  console.log("Estado de tareas en Redux:", tasks);
  return (
    <div className={contenedor}>
      <form onSubmit={handleAddOrEditTask} className={contenedorForm}>
        <h2 className={titulo}>
          {editingTaskId ? "Editar Tarea" : "Agregar Tarea"}
        </h2>
        <div className={contenedorInput}>
          <label htmlFor="title" className={`${nombreInput} ${required}`}>
            Título
          </label>
          <div className={contenedorSecundarioInput}>
            <Input
              className={styleInput}
              value={title}
              name="title"
              id="title"
              type="text"
              placeholder="Título"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
        </div>
        <div className={contenedorInput}>
          <label htmlFor="description" className={`${nombreInput} ${required}`}>
            Descripción
          </label>
          <div className={contenedorSecundarioInput}>
            <Input
              className={styleInput}
              value={description}
              name="description"
              id="description"
              type="text"
              placeholder="Descripción"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
        </div>
        <label className={nombreInput}>
          Tarea Completada:
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
        </label>
        <button type="submit" className={btnEnviar}>
          {editingTaskId ? "Guardar Cambios" : "Agregar Tarea"}
        </button>
      </form>
      <div className={contenedorForm}>
        <h2 className={titulo}>Lista de Tareas</h2>
        <Table headers={headers} data={data} />
        {loading && <p>Cargando tareas...</p>}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default TaskList;
