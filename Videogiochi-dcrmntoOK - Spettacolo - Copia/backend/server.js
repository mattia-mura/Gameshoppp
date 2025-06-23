// eslint-disable-next-line @typescript-eslint/no-var-requires
const fastify = require("fastify")({ logger: true });
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require("@fastify/cors");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const crypto = require("crypto");

// Liste in memoria
const videogiochi = [
  {
    id: crypto.randomUUID(),
    name: "The Legend of Zelda",
    qnt: 10,
    price: 70.0,
    imgUrl: 
      "https://m.media-amazon.com/images/I/91zYKmF4jjL.jpg",
  },
  {
    id: crypto.randomUUID(),
    name: "Super Mario Bros",
    qnt: 5,
    price: 50.0,
    imgUrl: 
      "https://m.media-amazon.com/images/I/81PDm2hnsjL.jpg",
  },
  {
    id: crypto.randomUUID(),
    name: "Minecraft",
    qnt: 20,
    price: 10.0,
    imgUrl:
      "https://m.media-amazon.com/images/I/719YkrrEDnL._AC_UF894,1000_QL80_.jpg",
  },
  {
    id: crypto.randomUUID(),
    name: "Fortnite",
    qnt: 15,
    price: 5.0,
    imgUrl: 
      "https://m.media-amazon.com/images/I/917JLu3S8DL._UF1000,1000_QL80_.jpg",
  },
  {
    id: crypto.randomUUID(),
    name: "Overwatch",
    qnt: 8,
    price: 1.5,
    imgUrl:
      "https://m.media-amazon.com/images/I/81BzJqvWz9L._AC_UF894,1000_QL80_.jpg",
  },
];
const ordini = [];
const ordinivideogiochi = [];

fastify.register(cors, {
  // Configurazione predefinita
  origin: "*", // Permetti richieste da qualsiasi origine
  methods: ["GET", "POST", "PATCH", "DELETE"], // Metodi consentiti
});

// Rotte per la lista videogiochi
fastify.get("/videogiochi", async () => videogiochi);

fastify.post("/videogiochi", async (request, reply) => {
  const { name, qnt, price, imgUrl } = request.body;
  // eslint-disable-next-line
  if (!name || qnt == undefined || price == undefined || imgUrl == undefined) {
    return reply.status(400).send({ error: "Dati mancanti" });
  }
  const nuovoVideogioco = { id: crypto.randomUUID(), name, qnt, price, imgUrl };
  videogiochi.push(nuovoVideogioco);
  return { message: "Videogioco aggiunto", nuovoVideogioco };
});

fastify.patch("/videogiochi/:id", async (request, reply) => {
  const { id } = request.params;
  const update = request.body;
  // eslint-disable-next-line
  const gioco = videogiochi.find((v) => v.id == id);
  if (!gioco) {
    return reply.status(404).send({ error: "Videogioco non trovato" });
  }
  Object.assign(gioco, update);
  return { message: "Videogioco aggiornato", gioco };
});

fastify.delete("/videogiochi/:id", async (request, reply) => {
  const { id } = request.params;
  // eslint-disable-next-line
  const index = videogiochi.findIndex((v) => v.id == id);
  // eslint-disable-next-line
  if (index == -1) {
    return reply.status(404).send({ error: "Videogioco non trovato" });
  }
  videogiochi.splice(index, 1);
  return { message: "Videogioco rimosso", videogiochi };
});

// Rotte per la lista ordini
fastify.get("/ordini", async () => ordini);

fastify.post("/ordini", async (request, reply) => {
  const { date } = request.body;
  if (!date) {
    return reply.status(400).send({ error: "Date mancante" });
  }
  const nuovoOrdine = { id: crypto.randomUUID(), date };
  ordini.push(nuovoOrdine);
  return { message: "Ordine aggiunto", nuovoOrdine };
});

// Rotte per la lista ordinivideogiochi
fastify.get("/ordinivideogiochi", async (request) => {
  // Cerca il parametro in querystring
  const { idVideogioco, idOrdine } = request.query;

  // Copia di ordinivideogiochi
  let listToReturn = structuredClone(ordinivideogiochi);

  // Se ha trovato idVideogioco
  // eslint-disable-next-line
  if (idVideogioco != undefined && idVideogioco != null) {
    // Filtra per idVideogioco
    // eslint-disable-next-line
    listToReturn = listToReturn.filter((x) => x?.idVideogioco == idVideogioco);
  }

  // Se ha trovato idOrdine
  // eslint-disable-next-line
  if (idOrdine != undefined && idOrdine != null) {
    // Filtra per idOrdine
    // eslint-disable-next-line
    listToReturn = listToReturn.filter((x) => x?.idOrdine == idOrdine);
  }

  // ERitorna la lista lavorata
  return listToReturn;
});

fastify.post("/ordinivideogiochi", async (request, reply) => {
  const { idVideogioco, idOrdine, qnt } = request.body;
  if (!idVideogioco || !idOrdine || !qnt) {
    return reply.status(400).send({ error: "Dati mancanti" });
  }
  const nuovaCorrelazione = {
    id: crypto.randomUUID(),
    idVideogioco,
    idOrdine,
    qnt,
  };
  ordinivideogiochi.push(nuovaCorrelazione);
  return { message: "Correlazione aggiunta", nuovaCorrelazione };
});

// Avvio del server
const start = async () => {
  try {
    await fastify.listen({ port: 4321 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
