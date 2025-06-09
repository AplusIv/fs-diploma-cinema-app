import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <>
      <h2>Страница не найдена!</h2>
      <Link to="/">На Главную</Link>
    </>
  )
}

export default NotFound