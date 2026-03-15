function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function generateEvents(state) {
  const events = [
    "A player finds an advantage.",
    "Two players bond strongly.",
    "A fight breaks out at camp.",
    "A secret alliance forms.",
    "Someone feels on the bottom.",
    "A player shares a personal story."
  ];
  return randomItem(events);
}

function runChallenge(state) {
  const winner = randomItem(state.tribes);
  return {
    type: "Immunity Challenge",
    winner: winner.name
  };
}

function generatePostChallengeEvents(state) {
  const events = [
    "A player scrambles for votes.",
    "A hidden idol is whispered about.",
    "A major argument erupts.",
    "A last‑minute alliance forms.",
    "Someone flips their vote plan.",
    "A decoy target is created."
  ];
  return randomItem(events);
}

function runElimination(state, safeTribeName) {
  const losingTribe = state.tribes.find(t => t.name !== safeTribeName);
  if (!losingTribe) return { tribe: null, eliminated: null };

  const eligible = losingTribe.members.filter(p => !p.eliminated);
  if (eligible.length === 0) return { tribe: losingTribe.name, eliminated: null };

  const eliminated = randomItem(eligible);
  eliminated.eliminated = true;

  return {
    tribe: losingTribe.name,
    eliminated: eliminated.name
  };
}

function updateTrackRecords(state) {
  state.cast.forEach(p => {
    if (!p.eliminated) {
      p.track.episodesSurvived++;
    }
  });
}

function runEpisode(state) {
  if (state.finished) return null;

  const remaining = state.cast.filter(p => !p.eliminated);
  if (remaining.length <= 1) {
    state.finished = true;
    saveState(state);
    return null;
  }

  const epNum = state.episodes.length + 1;
  const events = generateEvents(state);
  const challenge = runChallenge(state);
  const postEvents = generatePostChallengeEvents(state);
  const elimination = runElimination(state, challenge.winner);

  updateTrackRecords(state);

  const episode = {
    number: epNum,
    events,
    challenge,
    postEvents,
    elimination
  };

  state.episodes.push(episode);

  const remainingAfter = state.cast.filter(p => !p.eliminated);
  if (remainingAfter.length <= 1) {
    state.finished = true;
  }

  saveState(state);
  return episode;
}

function getWinner(state) {
  const remaining = state.cast.filter(p => !p.eliminated);
  return remaining.length === 1 ? remaining[0] : null;
}
