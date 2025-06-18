import { Link } from "react-router-dom"
import { frontendBase } from "../services/api"
import dayjs from "dayjs"

const NotFound = () => {
  return (
    <>
      <h1>Страница не найдена!</h1>
      <p>
        Перейдите в <Link to={frontendBase}>Администраторскую</Link> при наличии соответствующих прав.<br />
        Или продолжите <Link to={frontendBase + "/client/schedule/" + dayjs().format('YYYY-MM-DD')}>выбор билетов</Link>.
      </p>
    </>
  )
}

export default NotFound