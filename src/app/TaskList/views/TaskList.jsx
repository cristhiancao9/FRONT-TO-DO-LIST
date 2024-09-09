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
  const [filterCompleted, setFilterCompleted] = useState(""); // Nuevo estado para el filtro

  // Ejecuta la consulta de tareas con el token y el filtro de estado
  useEffect(() => {
    if (!token) {
      navigate("/public/login");
    } else {
      dispatch(fetchTasks({ token, filterCompleted })); // Incluye el filtro en el fetchTasks
    }
  }, [dispatch, token, filterCompleted, navigate]);

  const handleAddOrEditTask = (e) => {
    e.preventDefault();
    const taskData = { title, description, completed };
    if (editingTaskId) {
      dispatch(editTask({ token, taskId: editingTaskId, taskData }));
    } else {
      dispatch(addTask({ token, taskData }));
    }
    setTitle("");
    setDescription("");
    setCompleted(false);
    setEditingTaskId(null);
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTask({ token, taskId: id }));
  };

  const handleEditTask = (task) => {
    setEditingTaskId(task.id);
    setTitle(task.title);
    setDescription(task.description);
    setCompleted(task.completed);
  };

  const optionsEstado = [
    { value: "", label: "Todos" },
    { value: "true", label: "Completada" },
    { value: "false", label: "Pendiente" },
  ];

  const handleFilterChange = (e) => {
    setFilterCompleted(e.target.value);
  };
  const headers = [
    { name: "Título" },
    { name: "Descripción" },
    {
      name: "Estado",
      filter: {
        type: "select",
        options: optionsEstado,
        onChange: (e) => setFilterCompleted(e.target.value), // Cambiar el estado del filtro
      },
    },
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
        <Table headers={headers} data={data} onChange={handleFilterChange} />
        {loading && <p>Cargando tareas...</p>}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default TaskList;
