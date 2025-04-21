import LoginForm from "../components/Login/LoginForm";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-image-section">
          <img
            src="/img/autos.jpg"
            alt="Autos disponibles para alquiler"
            className="login-image"
          />
        </div>
        <div className="login-form-section">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
