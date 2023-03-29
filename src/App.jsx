import {
    Route,
    createRoutesFromElements,
    RouterProvider,
    createBrowserRouter
} from 'react-router-dom';
import Layout from './layouts/Layout';
import Auth from './pages/Auth';
import Home from './pages/Home';
import './App.css';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<Auth />} />
            <Route path="/home" element={<Home />} />
        </Route>
    )
);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
