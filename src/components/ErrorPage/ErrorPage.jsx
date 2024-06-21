import { useRouteError } from "react-router-dom";
import styles from "./errorpage.module.css"
import { Link } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);
    return (
        <div className={styles.error}>
            <h1>Oops!</h1>
            <p>It seems like an error ocurred...</p>
            <p>
                <i>{error.statusText || error.message} </i>
            </p>
            <Link to={"/"}>Go back to the desktop</Link>
        </div>

    )
}