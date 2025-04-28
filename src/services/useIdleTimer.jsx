import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function useIdleTimer(timeout = 5 * 60 * 1000) {
  const navigate = useNavigate();

  useEffect(() => {
    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        sessionStorage.clear();
        // Using SweetAlert2 instead of the alert
        Swal.fire({
          icon: "warning",
          title: "Logged Out",
          text: "You have been logged out due to inactivity.",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/login");
        });
      }, timeout);
    };

    window.onload = resetTimer;
    window.onmousemove = resetTimer;
    window.onmousedown = resetTimer;
    window.ontouchstart = resetTimer;
    window.onclick = resetTimer;
    window.onkeypress = resetTimer;

    return () => {
      clearTimeout(timer);
      window.onload = null;
      window.onmousemove = null;
      window.onmousedown = null;
      window.ontouchstart = null;
      window.onclick = null;
      window.onkeypress = null;
    };
  }, [navigate, timeout]);
}
