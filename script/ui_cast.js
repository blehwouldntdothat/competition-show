function renderCastGrid(state) {
  const grid = document.getElementById("cast-grid");
  grid.innerHTML = "";

  state.cast.forEach(p => {
    const card = document.createElement("div");
    card.className = "player-card";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}" class="player-img">
      <div class="player-name">${p.name}</div>
      <div style="font-size:12px;">${p.tribe}${p.eliminated ? " - ELIMINATED" : ""}</div>
    `;
    grid.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const state = getState();
  loadSidebar("cast");
  renderCastGrid(state);

  const btnNew = document.getElementById("btn-new-season");
  const btnNext = document.getElementById("btn-next-episode");

  btnNew.onclick = () => {
    resetState();
    const fresh = getState();
    renderCastGrid(fresh);
  };

  btnNext.onclick = () => {
    const s = getState();
    const ep = runEpisode(s);
    if (!ep) {
      alert("Season is over.");
    } else {
      localStorage.setItem("viewEpisode", s.episodes.length - 1);
      window.location.href = "episode.html";
    }
  };
});
