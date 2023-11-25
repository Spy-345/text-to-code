import { Link, useNavigate } from "react-router-dom";
import brand from "../public/Brand.png";
import img1 from "../public/img-1.jpeg";
import "../public/styles.css";

export default function Home(props) {
  const navigate = useNavigate();

  function handleSignout() {
    localStorage.clear();
    navigate("/login");
  }

  if (localStorage.username === null && localStorage.password === null) {
    navigate("/signup");
  } else {
    return (
      <div>
        <section class='colored-section' id='title'>
          <div class='container-fluid'>
            <nav class='navbar navbar-expand-lg navbar-light'>
              <a class='navbar-brand' href='#title'>
                <img src={brand} alt='logo' width='150'></img>TextToCode
              </a>

              <button
                class='navbar-toggler'
                type='button'
                data-toggle='collapse'
                data-target='#navbarTogglerDemo02'
              >
                <span class='navbar-toggler-icon'></span>
              </button>
              <button onClick={handleSignout} className='btn btn-link mx-auto'>
                Sign Out
              </button>
              <span>{localStorage.getItem("name")}</span>
            </nav>

            <div class='row'>
              <div class='title-container col-lg-6'>
                <h1 class='big-heading'>
                  Get quick answers to your coding and programming queries.
                </h1>
                <h5 class='title-sub'>
                  Our website uses advanced AI technology to provide instant and
                  accurate solutions to your coding challenges.
                </h5>
                <a href='#prompt-solver'>
                  <button
                    type='button'
                    class='btn btn-outline-light btn-lg download-button'
                  >
                    <i class='fa-solid fa-circle-play'></i> Get Started
                  </button>
                </a>
              </div>

              <div class='col-lg-6'>
                <img
                  class='first-img shadow-lg rounded'
                  src={img1}
                  height='700rem'
                  width='550px'
                  alt='img'
                ></img>
              </div>
            </div>
          </div>
        </section>

        <section class='colored-section' id='prompt-solver'>
          <div class='container'>
            <h1 class='solver-h1'>
              Enter the correct prompt to solve your queries or enter an
              incomplete or incorrect code snippet to complete it.
            </h1>
            <form onSubmit={props.handleSubmit} className='background-dark'>
              <div class='form-group'>
                <input
                  class='form-control'
                  id='query'
                  name='prompt'
                  placeholder='Enter your query or question'
                  onChange={props.handleInputChange}
                ></input>
                <button
                  type='submit'
                  class='solve-btn btn btn-outline-light btn-lg'
                >
                  Solve
                </button>
              </div>
            </form>
            <div id='solution'>
              <h2>{props.data}</h2>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
