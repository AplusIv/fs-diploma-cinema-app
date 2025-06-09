import { Link, useRouteError } from "react-router-dom"


const ShowError = () => {
  const error = useRouteError();
  return (
    <div className="error">
      <h2>Error</h2>
      <p>{error.data}</p>
      <p>{error.message}</p>
      <Link to="/">На главную</Link>
    </div>
  )
}

export default ShowError