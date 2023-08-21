import Error from "../error/Error";
import { Link } from "react-router-dom";

const Page404 = () => {
    return(
        <div>
            <Error/>
            <p> Page doesn't exist </p>
            <Link to='/'> Back to main page</Link>
        </div>
    )
}

export default Page404;