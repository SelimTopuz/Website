import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import SkipLink from "./components/SkipLink";
import HomePage from "./pages/HomePage";
import ProjectModelsPage from "./pages/ProjectModelsPage";
import TimelineDetailPage from "./pages/TimelineDetailPage";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <SkipLink />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projekte/:slug" element={<TimelineDetailPage />} />
          <Route
            path="/projekte/:slug/models"
            element={<ProjectModelsPage />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
