document.addEventListener("DOMContentLoaded", () => {
  loadSidebar("settings");

  const btn = document.getElementById("btn-reset");
  btn.onclick = () => {
    if (confirm("Reset season and clear all episodes?")) {
      resetState();
      alert("Season reset. Go back to Cast to start again.");
    }
  };
});
