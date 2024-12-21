import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NotFoundPage from "./pages/404";
import ViewTeam from "./pages/view_team";
import AddTeam from "./pages/add_team";
import EditTeam from "./pages/edit_team";
import GetTeamsByYear from "./pages/year";
import MinWinsTeams from "./pages/wins";
import GetTeamsForYearWithAverageGoals from "./pages/stats";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/view" element={<ViewTeam />} />
      <Route path="/edit" element={<EditTeam />} />
      <Route path="/add" element={<AddTeam />} />
      <Route path="/stats" element={<GetTeamsForYearWithAverageGoals />} />
      <Route path="/wins" element={<MinWinsTeams />} />
      <Route path="/year" element={<GetTeamsByYear />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={routes}></RouterProvider>;
}

export default App;
