import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
    <footer className="bg-gray-800 text-white text-center p-4">
      <header>
        <h1>Ejercicio 2</h1>
      </header>
    </footer>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
