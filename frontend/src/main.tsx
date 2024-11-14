import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import * as Pages from "./pages";
import Layout from "./components/Layout";
import AuthProvider, { AuthContext } from "./contexts/auth";
import SelectedSemesterProvider from "./contexts/selectedClassroom";

import "./global.css";

// If not logged in, route to login
const PrivateRoute = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      const currentUrl = location.pathname + location.search + location.hash;
      localStorage.setItem("redirectAfterLogin", currentUrl); // store the current url to redirect to after login
    }
  }, [isLoggedIn, location]);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <SelectedSemesterProvider>
        <Router>
          <Routes>
            {/******* LANDING PAGE & OAUTH CALLBACK *******/}
            <Route path="" element={<Pages.Login />} />
            <Route path="oauth/callback" element={<Pages.Callback />} />

            {/******* APP ROUTES: AUTHENTICATED USER *******/}
            <Route path="/app" element={<PrivateRoute />}>
              {/******* CLASS SELECTION: PRE-APP ACCESS STEP *******/}

              <Route path="classroom">
                <Route path="select" element={<Pages.ClassroomSelectPage />} />
                <Route path="create" element={<Pages.ClassroomCreatePage />} />
                <Route path="invite-tas" element={<Pages.InviteTAs />} />
                <Route path="invite-students" element={<Pages.InviteStudents />} />
                <Route path="success" element={<Pages.Success />} />
              </Route>
              <Route path="organization">
                <Route
                  path="select"
                  element={<Pages.OrganizationSelectPage />}
                />
              </Route>

              <Route path="token/apply" element={<Pages.RoleApply />} />

              {/******* CLASS SELECTED: INNER APP *******/}
              <Route path="" element={<Layout />}>
                <Route path="assignments" element={<Pages.Assignments />} />
                <Route
                  path="assignments/create"
                  element={<Pages.CreateAssignment />}
                />
                <Route
                  path="assignments/accept"
                  element={<Pages.AcceptAssignment />}
                />
                <Route path="assignments/:id" element={<Pages.Assignment />} />
                <Route path="grading" element={<Pages.Grading />} />
                <Route path="settings" element={<Pages.Settings />} />
                <Route path="students" element={<Pages.StudentListPage />} />
                <Route path="tas" element={<Pages.TAListPage />} />
                <Route
                  path="professors"
                  element={<Pages.ProfessorListPage />}
                />
                <Route
                  path="grading/assignment/:assignmentID/student/:studentWorkID"
                  element={<Pages.Grader />}
                />
                <Route path="settings" element={<Pages.Settings />} />
                <Route path="dashboard" element={<Pages.Dashboard />} />
              </Route>
            </Route>

            {/******* 404 CATCH ALL *******/}
            <Route path="404" element={<Pages.PageNotFound />} />
          </Routes>
        </Router>
      </SelectedSemesterProvider>
    </AuthProvider>
  );
}

let container: HTMLElement | null = null;
let root: ReactDOM.Root | null = null;

document.addEventListener("DOMContentLoaded", function () {
  if (!container) {
    container = document.getElementById("root");
    if (!container) {
      throw new Error("Root element not found. Unable to render React app.");
    }

    root = ReactDOM.createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
});
