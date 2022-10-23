import { Link } from "react-router-dom"

const ButtonsBottomRow = ({destination, condition, setAll}) => {
  return (
    <div className="text-center">
    <button
      type="submit"
      className="btn btn-outline-primary"
      onClick={condition ? setAll : void(0)}
    >
      Submit
    </button>
    <Link to={destination} className="btn btn-outline-danger mx-2">
      Cancel
    </Link>
  </div>
  )
}

export default ButtonsBottomRow