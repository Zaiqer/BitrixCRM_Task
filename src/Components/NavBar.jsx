import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#" onClick={() => navigate("/")}>
          <img
            src="/images/ButaGrupLogo.png"
            alt="Logo"
            width="150"
            height="120"
            className="d-inline img-fluid"
          />
        </a>

        <button
          onClick={() => navigate("/lead-list")}
          className="btn btn-success"
        >
          Lead List
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
