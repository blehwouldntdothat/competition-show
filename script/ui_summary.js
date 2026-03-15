document.addEventListener("DOMContentLoaded", () => {
  const state = getState();
  loadSidebar("summary");

  const winnerEl = document.getElementById("winner");
  const trackEl = document.getElementById("track");

  const winner = getWinner(state);
  if (winner) {
    winnerEl.textContent = `${winner.name} (${winner.tribe})`;
  } else {
    winnerEl.textContent = "No winner yet. Finish the season.";
  }

  let text = "";
  state.cast.forEach(p => {
    text += `${p.name} (${p.tribe}) - Episodes survived: ${p.track.episodesSurvived}`;
    if (p.eliminated) text += " [ELIMINATED]";
    text += "\n";
  });

  trackEl.textContent = text;
});
