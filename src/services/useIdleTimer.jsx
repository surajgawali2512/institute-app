import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

export default function useIdleTimer(timeout = 10 * 60 * 1000) {
  const navigate = useNavigate();
  const location = useLocation();

  const excludedPaths = ["/login", "/register", "/choose-plan", "/"]; // Add more paths if needed

  useEffect(() => {
    if (excludedPaths.includes(location.pathname)) {
      return; // Skip idle timer logic on excluded pages
    }

    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        sessionStorage.clear();
        localStorage.clear();
        Swal.fire({
          icon: "warning",
          title: "Logged Out",
          text: "You have been logged out due to inactivity.",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/");
        });
      }, timeout);
    };

    // Attach events
    const events = [
      "load",
      "mousemove",
      "mousedown",
      "touchstart",
      "click",
      "keypress",
    ];
    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer(); // Initialize timer

    // Cleanup
    return () => {
      clearTimeout(timer);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [navigate, timeout, location.pathname]);
}

// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// export default function useIdleTimer(timeout = 5 * 60 * 1000) {
//   const navigate = useNavigate();

//   useEffect(() => {
//     let timer;

//     const resetTimer = () => {
//       clearTimeout(timer);
//       timer = setTimeout(() => {
//         sessionStorage.clear();
//         // Using SweetAlert2 instead of the alert
//         Swal.fire({
//           icon: "warning",
//           title: "Logged Out",
//           text: "You have been logged out due to inactivity.",
//           confirmButtonColor: "#3085d6",
//           confirmButtonText: "OK",
//         }).then(() => {
//           navigate("/login");
//         });
//       }, timeout);
//     };

//     window.onload = resetTimer;
//     window.onmousemove = resetTimer;
//     window.onmousedown = resetTimer;
//     window.ontouchstart = resetTimer;
//     window.onclick = resetTimer;
//     window.onkeypress = resetTimer;

//     return () => {
//       clearTimeout(timer);
//       window.onload = null;
//       window.onmousemove = null;
//       window.onmousedown = null;
//       window.ontouchstart = null;
//       window.onclick = null;
//       window.onkeypress = null;
//     };
//   }, [navigate, timeout]);
// }
