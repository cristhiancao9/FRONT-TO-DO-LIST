import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const TaskList = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
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
  const handleAddOrEditTask = async () => {
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

  return (
    <div>
      <div>
        <h2>{editingTaskId ? "Editar Tarea" : "Agregar Tarea"}</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          type="text"
          placeholder="Título"
          value={title || ""}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={description || ""}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>
          Completada:
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
        </label>
        <button onClick={handleAddOrEditTask}>
          {editingTaskId ? "Guardar Cambios" : "Agregar Tarea"}
        </button>
        <button onClick={handleLogout}>Cerrar Sesión</button>

        <h2>Lista de Tareas</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <strong>{task.title}</strong> - {task.description} -{" "}
              {task.completed ? "Completada" : "Pendiente"}
              <button onClick={() => handleEditTask(task)}>Editar</button>
              <button onClick={() => handleDeleteTask(task.id)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskList;
