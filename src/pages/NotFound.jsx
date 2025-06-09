import { Link } from "react-router-dom"
import { frontendBase } from "../services/api"

const NotFound = () => {
  return (
    <>
      <h2>Страница не найдена!</h2>
      {/* <Link to="/">На Главную</Link> */}
      <Link to={frontendBase}>На Главную</Link>

    </>
  )
}

export default NotFound