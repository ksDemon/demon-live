const msgs = [
    "...cómo estás?",
    "...salu2",
    "...epic website",
    "...mira, un perro 🐶"
  ];

  var msg = msgs[Math.floor(Math.random() * Math.floor(msgs.length))];

  document.querySelector(".random").append(msg);
