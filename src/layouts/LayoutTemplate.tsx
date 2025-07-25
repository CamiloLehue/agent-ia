import { Outlet, useNavigate } from "react-router";
import Button from "../components/ui/Button";
import logo from "../../public/ast-white.svg";
import {
  LuBotMessageSquare,
  LuCalendarDays,
  LuChartColumnIncreasing,
  LuGauge,
} from "react-icons/lu";

function LayoutTemplate() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const handleOutClick = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };
  return (
    <div className="relative h-screen w-full  flex flex-col">
      <div className="relative z-10 h-full">
        <div className="relative z-10 w-full flex-shrink-0 text-white flex items-center justify-between py-3 px-4">
          <div className="">
            <img src={logo} alt="Logo ast" className="w-10" />
          </div>
          <div className="absolute left-[50%] -translate-x-1/2">
            <h5 className="font-bold">
              <span className="text-danger">Wi</span>sensor{" "}
              <span className="text-accent">IA</span>
            </h5>
          </div>
          <div className="px-5 flex justify-center items-center gap-2">
            <Button
              onClick={() => navigate("/app")}
              variant="solid"
              size="sm"
              className="font-bold"
            >
              Chat Agent
            </Button>
        
            <Button 
            variant="solid"
              size="sm"
            onClick={() => window.location.href = "/mockups/"}>Ir a Mockups</Button>
          
            <Button variant="solid" size="sm" className="">
              {username ? `Hola, ${username}` : "Usuario"}
            </Button>

            {!token && (
              <Button variant="solid" size="sm">
                Iniciar Sesión
              </Button>
            )}
            <Button onClick={handleOutClick} variant="transparent" size="sm">
              Cerrar sesión
            </Button>
          </div>
        </div>
        <div className="flex justify-center items-start h-full w-full">
          <div className="relative w-20  h-full flex flex-col justify-start items-center px-2   ">
            <nav className="border-t border-t-accent/50 pt-5">
              <ul className="flex flex-col gap-2">
                <li>
                  <Button
                    variant="ghost"
                    size="md"
                    onClick={() => navigate("/app")}
                    className="border-s border-s-accent/30 border-b border-b-accent/30"
                  >
                    <LuBotMessageSquare />
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    size="md"
                    onClick={() => navigate("/app")}
                    className="border-s border-s-accent/30 border-b border-b-accent/30"
                  >
                    <LuChartColumnIncreasing />
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    size="md"
                    onClick={() => navigate("/app")}
                    className="border-s border-s-accent/30 border-b border-b-accent/30"
                  >
                    <LuGauge />
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    size="md"
                    onClick={() => navigate("/app")}
                    className="border-s border-s-accent/30 border-b border-b-accent/30"
                  >
                    <LuCalendarDays />
                  </Button>
                </li>
              </ul>
            </nav>
          </div>
          <div className="">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutTemplate;
