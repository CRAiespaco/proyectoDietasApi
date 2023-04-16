import React from 'react';
import ReactDOM from 'react-dom/client';
import PageHome from 'Components/Pages/PageHome';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Redirect,
  Route,
  RouterProvider,
} from "react-router-dom";
import PageLogin from 'Components/Pages/PageLogin';
import PageRegister from 'Components/Pages/PageRegister';
import PageCrear from 'Components/Pages/PageCrear';
import PageRecetas from 'Components/Pages/PageRecetas';
import PageIncidencias from 'Components/Pages/PageIncidencias';
import PageDetallesReceta from 'Components/Pages/PageDetallesReceta';
import PageError from 'Components/Pages/PageError';
import RecetasProvider from 'context/RecetasProvider';


const router = createBrowserRouter(
  createRoutesFromElements(
    <React.Fragment>
      <Route path="/" element={<PageHome/> }/>
      <Route path="/login" element={ <PageLogin/> }/>
      <Route path="/register" element={ <PageRegister/> }/>
      <Route path='/incidencias' element={<PageIncidencias/>}/>
      <Route path="/crear" element={ <PageCrear/> }/>
      <Route path="/buscador" element={ <PageRecetas/> }/>
      <Route path='/detallesReceta/:id' element={ <PageDetallesReceta/> }/>
      <Route path='*' element={ <PageError/> }/>
    </React.Fragment>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecetasProvider>
    <RouterProvider router={router} />
    </RecetasProvider>
  </React.StrictMode>
);