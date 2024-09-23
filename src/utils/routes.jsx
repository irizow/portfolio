import App from "../App";
import About from "../components/About/AboutMain";
import ErrorPage from "../components/ErrorPage/ErrorPage";

export const routes = [
    {
        path: '/',
        element: <App/>,
        errorElement: <ErrorPage/>

    },
    {
        path: '/about',
        element: <About/>,
        errorElement: <ErrorPage/>
    }
]