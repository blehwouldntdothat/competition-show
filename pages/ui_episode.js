function renderEpisodeView() {
  const state = getState();
  const viewRaw = localStorage.getItem("viewEpisode");
  const index = viewRaw === null ? state.episodes.length - 1 : parseInt(viewRaw, 10);

  loadSidebar("episode");

  const title = document.getElementById("ep-title");
  const body = document.getElementById("ep-body");

  if (!state.episodes.length || index < 0 || index >= state.episodes.length) {
    title.textContent = "No episode yet";
    body.textContent = "Run an episode from the Cast page.";
    return;
  }

  const ep = state.episodes[index];

  title.textContent = `Episode ${ep.number}`;

  const lines = [
    `Events:`,
    ep.events,
    "",
    `Challenge:`,
    `${ep.challenge.type} - Winner: ${ep.challenge.winner}`,
    "",
    `Post-challenge events:`,
    ep.postEvents,
    "",
    `Elimination:`,
    ep.elimination.eliminated
      ? `${ep.elimination.eliminated} from ${ep.elimination.tribe}`
      : "None"
  ];

  body.textContent = lines.join("\n");
}

document.addEventListener("DOMContentLoaded", renderEpisodeView);
