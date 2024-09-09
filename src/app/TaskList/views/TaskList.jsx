import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../../components/Card/views/Card";
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
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [user, setUser] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); //

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
      const fetchTasks = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/tasks", {
            headers: {
              Authorization: token,
            },
          });
          const data = await response.json();
          fetchUserData();
          if (Array.isArray(data)) {
            setTasks(data); // Asigna directamente el array de tareas
          } else {
            setError(data?.msg);
          }
        } catch (error) {
          setError("Error al cargar las tareas");
        }
      };

      fetchTasks();
    } else {
      navigate("/login");
    }
  }, [navigate]);
  const fetchUserData = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/api/auth/user", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });

    const data = await response.json();
    // setUser(`${data?.name}${data?.lastName}`);
    // console.log("Datos del usuario:", data);
  };
  const handleAddOrEditTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!title || !description) {
      setError("El título y la descripción son obligatorios.");
      return;
    }

    const taskData = { title, description, completed };

    if (editingTaskId) {
      // Editar tarea existente
      try {
        const response = await fetch(
          `http://localhost:5000/api/tasks/${editingTaskId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
            body: JSON.stringify(taskData),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const updatedTask = data.obj; // Obtener la tarea actualizada
          setTasks(
            tasks.map((task) =>
              task.id === editingTaskId ? updatedTask : task
            )
          );
          setEditingTaskId(null); // Limpiar el estado de edición
          setTitle("");
          setDescription("");
          setCompleted(false);
        } else {
          const data = await response.json();
          setError(data.msg || "Error al editar la tarea");
        }
      } catch (error) {
        setError("Error al editar la tarea");
      }
    } else {
      // Crear una nueva tarea
      try {
        const response = await fetch("http://localhost:5000/api/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(taskData),
        });

        if (response.ok) {
          const data = await response.json();
          const newTask = data.obj; // Obtener la nueva tarea
          setTasks([...tasks, newTask]); // Agregar la nueva tarea a la lista
          setTitle("");
          setDescription("");
          setCompleted(false);
        } else {
          const data = await response.json();
          setError(data.msg || "Error al agregar la tarea");
        }
      } catch (error) {
        setError("Error al agregar la tarea");
      }
    }
  };

  // Función para eliminar una tarea
  const handleDeleteTask = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });

      if (response.ok) {
        setTasks(tasks.filter((task) => task.id !== id)); // Eliminar tarea de la lista
      } else {
        const data = await response.json();
        setError(data.msg || "Error al eliminar la tarea");
      }
    } catch (error) {
      setError("Error al eliminar la tarea");
    }
  };

  // Función para cargar la tarea
  const handleEditTask = (task) => {
    setEditingTaskId(task.id);
    setTitle(task.title);
    setDescription(task.description);
    setCompleted(task.completed);
  };

  // Función para manejar el inicio de sesión
  const handleLogin = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        alert("Inicio de sesión exitoso");
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (error) {
      alert("Error al iniciar sesión");
    }
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setTasks([]);
    navigate("/login");
  };
  const headers = [
    { name: "Título" },
    { name: "Descripción" },
    { name: "Estado" },
    { name: "Acciones" },
  ];

  // Datos de la tabla (tareas)
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
    <>
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
                value={title || ""}
                name="title"
                id="title"
                minLength="1"
                maxLength="50"
                type="text"
                placeholder="Título"
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
          </div>
          <div className={contenedorInput}>
            <label
              htmlFor="Description"
              className={`${nombreInput} ${required}`}
            >
              Descripción
            </label>
            <div className={contenedorSecundarioInput}>
              <Input
                className={styleInput}
                value={description || ""}
                name="Description"
                id="Description"
                minLength="1"
                maxLength="50"
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
          <h2 className={titulo}>Lista de Tareas </h2>
          <Table headers={headers} data={data}></Table>
        </div>
      </div>
    </>
  );
};

export default TaskList;
