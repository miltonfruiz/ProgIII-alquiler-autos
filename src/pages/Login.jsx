import LoginForm from "../components/Login/LoginForm";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-image-section">
          <img src="images/auto.png" alt="auto azul" className="login-image" />
        </div>
        <div className="login-form-section">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
