import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import PageHome from "./pages/home/PageHome";
import Investigationlist from "./pages/investigations/InvestigationList";
import InvestigationsAdd from "./pages/investigations/create/InvestigationsAdd";
import Notifications from "./pages/notifications/Notifications";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Sign from "./pages/sign/Sign";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Sign />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign" element={<Sign />} />
        <Route
          path="home"
          element={
            <App>
              <PageHome />
            </App>
          }
        />
        <Route
          path="investigations"
          element={
            <App>
              <Investigationlist />
            </App>
          }
        ></Route>
        <Route
          path="investigations-add"
          element={
            <App>
              <InvestigationsAdd />
            </App>
          }
        ></Route>
        {/* <Route path="*" element={<Empty />}></Route> */}
        <Route
          path="notifications"
          element={
            <App>
              <Notifications />
            </App>
          }
        ></Route>
        <Route
          path="profile"
          element={
            <App>
              <Profile />
            </App>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
