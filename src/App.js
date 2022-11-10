import {
  Board, Calender, Chat, Timeline, Register, Login, Layout, Profile, DeveloperConsole,
  ManageWorkspace, UserSettingLayout, Preferences, PageNotFound, CardAsList,
} from "./components";
import { Routes, Route, Navigate } from "react-router-dom";
import { fetchUserToken } from './util/fetchUserToken';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import WorkspaceSettings from "./components/UserSettings/WorkspaceSettings";
import Tags from "./components/UserSettings/Tags";
import 'react-toastify/dist/ReactToastify.css';


const jwt = fetchUserToken() || false;

const AuthRoute = ({ children }) => jwt ? <Navigate to="/projects" /> : children;

const ProtectedRoute = ({ children }) => !jwt ? <Navigate to="/" /> : children;


const App = () => {

  const selectedSpaceId = useSelector(state => state.space.selectedSpace);

  return (
    <main className="overflow-hidden">
      <Routes>

        <Route path="/" />
        <Route index element={<AuthRoute><Login /></AuthRoute>} />
        <Route path="register" element={<AuthRoute><Register /></AuthRoute>} />


        <Route path="settings" element={<ProtectedRoute> <UserSettingLayout /> </ProtectedRoute>}>
          <Route index element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
          <Route path="manage-workspace" element={<ProtectedRoute> <ManageWorkspace /> </ProtectedRoute>} />
          <Route path="developer" element={<ProtectedRoute> <DeveloperConsole /> </ProtectedRoute>} />
          <Route path="preferences" element={<ProtectedRoute> <Preferences /> </ProtectedRoute>} />
          <Route path="workspace-settings" element={<ProtectedRoute> <WorkspaceSettings /> </ProtectedRoute>} />
          <Route path="tags" element={<ProtectedRoute> <Tags /> </ProtectedRoute>} />
        </Route>


        <Route path="projects" element={<ProtectedRoute> <Layout selectedSpaceId={selectedSpaceId} /> </ProtectedRoute>}>
          <Route index element={<ProtectedRoute> <Chat /> </ProtectedRoute>} />
          <Route path="kanban" element={<ProtectedRoute> <Board selectedSpaceId={selectedSpaceId} /> </ProtectedRoute>} />
          <Route path="list" element={<ProtectedRoute> <CardAsList selectedSpaceId={selectedSpaceId} /> </ProtectedRoute>} />
          <Route path="calendar" element={<ProtectedRoute> <Calender /> </ProtectedRoute>} />
          <Route path="timeline" element={<ProtectedRoute> <Timeline /> </ProtectedRoute>} />
        </Route>


        <Route path="*" element={<PageNotFound />} />

      </Routes>

      {/* theme="dark" */}
      <ToastContainer theme="colored" style={{ fontSize: "18px" }} />
    </main>
  );
};

export default App;
