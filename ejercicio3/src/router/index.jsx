import ProtectedRoute from "../layout/ProtectedRoute";
import RootLayout from "../layout/RootLayout";
import EditRecipe from "../pages/EditRecipe";
import Favorites from "../pages/Favorites";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NewRecipe from "../pages/NewRecipe";
import RecipeDetail from "../pages/RecipeDetail";
import Register from "../pages/Register";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Login />,
        }, 
        {
            path: "register",
            element: <Register />,
        },
        {
            element: <ProtectedRout />,
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
                {
                    path: "/recetas/nuevas",
                    element: <NewRecipe />,
                },
                {
                    path: "/recetas/:id",
                    element: <RecipeDetail />,
                },
                {
                    path: "/recetas/:id/editar",
                    element: <EditRecipe />,
                },  
                {
                    path: "favorites",
                    element: <Favorites />,
                },
            ]
        
        }
      ]
    }
])