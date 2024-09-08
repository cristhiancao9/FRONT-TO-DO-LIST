import React, { lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./app/Login/views/Login";
import Register from "./app/Register/views/Register";
import TaskList from "./app/TaskList/views/TaskList";
import PrivateRoute from "./layout/private/Private";
const PublicLayout = lazy(() => import("./layout/public/Public"));
function App() {
  return (
    <Routes>
      <Route
        path="/tasks"
        element={
          <PrivateRoute>
            <TaskList />
          </PrivateRoute>
        }
      />
      {/* <Route path="/tasks" element={<TaskList />} /> */}
      <Route path="/public" element={<PublicLayout />}>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
