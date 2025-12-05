import { Routes, Route } from "react-router";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <h1 className="text-4xl font-bold text-blue-600 text-center mt-10">
              Hello Tailwind 🚀
            </h1>
          }
        />
      </Routes>
    </>
  );
}

export default App;
