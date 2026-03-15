let state = null;

function renderCastShowcase(cast) {
  const container = document.getElementById("cast-showcase");
  container.innerHTML = "";

  cast.forEach(player => {
    const card = document.createElement("div");
    card.className = "player-card";

    card.innerHTML = `
      <img src="${player.img}" class="player-img" alt="${player.name}">
      <div class="player-name">${player.name}</div>
    `;

    container.appendChild(card);
  });
}

function renderEpisode(episode) {
  const out = document.getElementById("episode-output");

  if (!episode) {
    const winner = getWinner(state);
    if (winner) {
      out.textContent = `The game is over.\nWinner: ${winner.name} (${winner.tribe})`;
    } else {
      out.textContent = "The game is over.";
    }
    return;
  }

  const text = [
    `Episode ${episode.number}`,
    "",
    `Events: ${episode.events}`,
    `Challenge: ${episode.challenge.type} - Winner: ${episode.challenge.winner}`,
    `Post‑challenge events: ${episode.postEvents}`,
    episode.elimination.eliminated
      ? `Elimination: ${episode.elimination.eliminated} from ${episode.elimination.tribe}`
      : `Elimination: None`
  ].join("\n");

  out.textContent = text;
}

function renderTrackRecords(track) {
  const out = document.getElementById("track-output");
  let text = "";

  track.forEach(p => {
    text += `${p.name} (${p.tribe}) - Episodes survived: ${p.survived}`;
    if (p.eliminated) text += " [ELIMINATED]";
    text += "\n";
  });

  out.textContent = text;
}

document.addEventListener("DOMContentLoaded", () => {
  state = createInitialState();
  renderCastShowcase(state.cast);

  const startBtn = document.getElementById("start-season");
  const nextBtn = document.getElementById("next-episode");

  startBtn.addEventListener("click", () => {
    state = createInitialState();
    renderCastShowcase(state.cast);
    document.getElementById("episode-output").textContent = "";
    document.getElementById("track-output").textContent = "";
    nextBtn.disabled = false;
  });

  nextBtn.addEventListener("click", () => {
    const episode = runEpisode(state);
    renderEpisode(episode);
    if (episode) {
      renderTrackRecords(episode.track);
    } else {
      renderTrackRecords(updateTrackRecords(state));
      nextBtn.disabled = true;
    }
  });
});
