import CoursesLayout from "./course/pages/CoursesLayout";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Course from "./course/pages/Course";
import { CoureseContextProvider } from "./shared/store/course-context";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<CoursesLayout />} />
        <Route
          path="/:id"
          element={
            <CoureseContextProvider>
              <Course />
            </CoureseContextProvider>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  );
}

export default App;
