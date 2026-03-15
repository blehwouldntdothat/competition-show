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
  state.safeTribe = winner.name;

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

function runElimination(state) {
  const losingTribe = state.tribes.find(t => t.name !== state.safeTribe);

  if (!losingTribe) {
    return { tribe: null, eliminated: null };
  }

  const eligible = losingTribe.members.filter(p => !p.eliminated);
  if (eligible.length === 0) {
    return { tribe: losingTribe.name, eliminated: null };
  }

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

  return state.cast.map(p => ({
    name: p.name,
    tribe: p.tribe,
    eliminated: p.eliminated,
    survived: p.track.episodesSurvived
  }));
}

function runEpisode(state) {
  if (state.finished) return null;

  const remaining = state.cast.filter(p => !p.eliminated);
  if (remaining.length <= 1) {
    state.finished = true;
    return null;
  }

  const episode = {
    number: state.episodes.length + 1,
    events: generateEvents(state),
    challenge: runChallenge(state),
    postEvents: generatePostChallengeEvents(state),
    elimination: null,
    track: null
  };

  episode.elimination = runElimination(state);
  episode.track = updateTrackRecords(state);

  state.episodes.push(episode);

  const remainingAfter = state.cast.filter(p => !p.eliminated);
  if (remainingAfter.length <= 1) {
    state.finished = true;
  }

  return episode;
}

function getWinner(state) {
  const remaining = state.cast.filter(p => !p.eliminated);
  return remaining.length === 1 ? remaining[0] : null;
}
