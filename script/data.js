// Default cast: 2 tribes, 8 players each.
// Replace image paths with your own files in images/default_cast/.
const DEFAULT_TRIBES = [
  {
    name: "Tribe A",
    color: "#ffcc00",
    members: [
      { id: 1, name: "Player 1", img: "images/default_cast/p1.png" },
      { id: 2, name: "Player 2", img: "images/default_cast/p2.png" },
      { id: 3, name: "Player 3", img: "images/default_cast/p3.png" },
      { id: 4, name: "Player 4", img: "images/default_cast/p4.png" },
      { id: 5, name: "Player 5", img: "images/default_cast/p5.png" },
      { id: 6, name: "Player 6", img: "images/default_cast/p6.png" },
      { id: 7, name: "Player 7", img: "images/default_cast/p7.png" },
      { id: 8, name: "Player 8", img: "images/default_cast/p8.png" }
    ]
  },
  {
    name: "Tribe B",
    color: "#0099ff",
    members: [
      { id: 9,  name: "Player 9",  img: "images/default_cast/p9.png" },
      { id: 10, name: "Player 10", img: "images/default_cast/p10.png" },
      { id: 11, name: "Player 11", img: "images/default_cast/p11.png" },
      { id: 12, name: "Player 12", img: "images/default_cast/p12.png" },
      { id: 13, name: "Player 13", img: "images/default_cast/p13.png" },
      { id: 14, name: "Player 14", img: "images/default_cast/p14.png" },
      { id: 15, name: "Player 15", img: "images/default_cast/p15.png" },
      { id: 16, name: "Player 16", img: "images/default_cast/p16.png" }
    ]
  }
];

function createInitialState() {
  const tribes = JSON.parse(JSON.stringify(DEFAULT_TRIBES));

  const cast = [];
  tribes.forEach(tribe => {
    tribe.members.forEach(m => {
      m.tribe = tribe.name;
      m.eliminated = false;
      m.track = { episodesSurvived: 0 };
      cast.push(m);
    });
  });

  return {
    tribes,
    cast,
    episodes: [],
    safeTribe: null,
    finished: false
  };
}
