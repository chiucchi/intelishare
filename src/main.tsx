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
import InvestigationEdit from "./pages/investigations/edit/InvestigationEdit";
import InvestigationDetail from "./pages/investigations/details/InvestigationDetail";

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
        />
        <Route
          path="profile/investigations"
          element={
            <App>
              <Investigationlist />{" "}
              {/* ver como que vai ser essa listagem aqui, pode ser passando uma prop avisando */}
            </App>
          }
        />
        <Route
          path="investigations/add"
          element={
            <App>
              <InvestigationsAdd />
            </App>
          }
        />
        <Route
          path="investigations/edit"
          element={
            <App>
              <InvestigationEdit />
            </App>
          }
        />
        <Route
          path="investigations/detail"
          element={
            <App>
              <InvestigationDetail />
            </App>
          }
        />
        {/* <Route path="*" element={<Empty />}></Route> */}
        <Route
          path="notifications"
          element={
            <App>
              <Notifications />
            </App>
          }
        />
        <Route
          path="profile"
          element={
            <App>
              <Profile />
            </App>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
