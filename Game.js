const readline = require("readline");
const JohnemonMaster = require("./JohnemonMaster"); // Replace 'your_classes_filename' with the actual filename
const Johnemon = require("./Johnemon");
const JohnemonWorld = require("./JohnemonWorld");
const fs = require("fs");
const JohnemonArena = require("./JohnemonArena");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let johnemonMaster = new JohnemonMaster();
let johnemonWorld = new JohnemonWorld();
let johnemonArena = new JohnemonArena();
// johnemonMaster.addJohnemon(new Johnemon()); //commande pour ajouter un pokemon dans le showCollection

function gameMenu() {
  rl.question(
    `Salut aventurier ! Bienvenue dans l'univer de Johnemn World. Selectionnez une des options suivantes: \n1: Nouvelle partie \n2: Charger une partie \n3: Quitter \n`,
    (answer) => {
      if (answer === "1") {
        askForName();
      } else if (answer === "2") {
        gameLoad();
      } else {
        console.log("Au revoir !");
        rl.close();
      }
    }
  );
}
gameMenu();
console.log();

function saveGameState() {
  rl.question(
    "Voulez-vous sauvegarder votre progression \n1: Oui  \n2: Non \n:",
    (answer) => {
      if (answer === "1") {
        const gameState = {
          saved_on: new Date().toISOString(),
          johnemonMaster: {
            name: johnemonMaster.name,
            johnemonCollection: johnemonMaster.johnemonCollection.map(
              (johnemon) => ({
                name: johnemon.name,
                level: johnemon.level,
                healthPool: johnemon.healthPool,
                experienceMeter: johnemon.experienceMeter,
                attackRange: johnemon.attackRange,
                defenseRange: johnemon.defenseRange,
                catchPhrase: johnemon.catchPhrase,
              })
            ),
          },
          healingItems: "", //changer les strings par les functions dans JohnemonMaster.js
          reviveItems: "",
          JOHNBALLS: "",
          day: 1,
          logs: johnemonMaster.johnemonCollection.map(
            (johnemon) => `${johnemon.name} a été ajouté à votre collection!`
          ),
        };
        const gameStateJSON = JSON.stringify(gameState, null, 2);

        fs.writeFile("save.json", gameStateJSON, (err) => {
          if (err) {
            console.error("La sauvegarde n'a pas fonctionné:", err);
          } else {
            console.log("La sauvegarde à réussi!");
          }
        });
      } else {
        console.log("Sauvegarde annulée.");
      }
      setTimeout(() => {
        actionMenu();
      }, 1000);
    }
  );
}

function gameLoad() {
  if (fs.existsSync(`save.json`)) {
    // Fichier de sauvegarde trouvé, on demande si on charge la sauvegarde
    rl.question(
      `une partie a été trouvée. Voulez-vous la charger? \n1: Oui \n2: Non \n`,
      (answer) => {
        if (answer === "1") {
          // Charger la partie
          fs.readFile(`save.json`, `utf8`, (err, data) => {
            if (err) {
              console.error(`Erreur lors du chargement de la partie :`, err);
              gameMenu(); // Mettre ici la fonction pour revenir au menu principal
            } else {
              const gameState = JSON.parse(data);
              console.log("Partie chargée avec succès !");
              setTimeout(() => {
                actionMenu();
              }, 1000);
            }
          });
        } else {
          //ne charge pas de partie donc => new game
          console.log("Démarrage d'une nouvelle partie...");
          askForName(); // Démarrer une nouvelle partie
        }
      }
    );
  } else {
    // Aucun fichier de sauvegarde n'existe, démarrer une nouvelle partie
    rl.question(
      `Il n'y a pas de sauvegarde. Voulez-vous commencer une nouvelle partie? \n1: Yes \n2: No`,
      (answer) => {
        if (answer === "1") {
          askForName(); // Démarrer une nouvelle partie
        } else {
          console.log("Retour au menu principal.");
          gameMenu(); // Mettre ici la fonction pour revenir au menu principal
        }
      }
    );
  }
}

function askForName() {
  rl.question(
    `Te voilà parti pour une nouvelle aventure... \nMais avant tout, comment t'appelles-tu? \n`,
    (name) => {
      console.log(`Enchanté de faire votre connaissance ${name}!`);
      johnemonMaster.name = name;
      proposeFirstJohnemon();
    }
  );
}

function proposeFirstJohnemon() {
  const johnemon1 = new Johnemon();
  const johnemon2 = new Johnemon();
  const johnemon3 = new Johnemon();
  rl.question(
    `Vous devez choisir un compagnon d'aventure. Voici trois Johnemon: \n(1) ${johnemon1.name}, \n(2) ${johnemon2.name}, \n(3) ${johnemon3.name}. \nVeuillez en selectionner un (1, 2, or 3) \nAttention, ce choix sera définitif pour le reste de la partie!: `,
    (answer) => {
      let chosenJohnemon;
      if (answer === "1") {
        chosenJohnemon = johnemon1;
        console.log(`Vous avez choisi ${chosenJohnemon.name}!`);
      } else if (answer === "2") {
        chosenJohnemon = johnemon2;
        console.log(`Vous avez choisi ${chosenJohnemon.name}!`);
      } else if (answer === "3") {
        chosenJohnemon = johnemon3;
        console.log(`vous avez choisi ${chosenJohnemon.name}!`);
      } else {
        console.log(
          "Je n'ai pas bien compris votre réponse, je vais donc vous répéter les consignes:"
        );
        return proposeFirstJohnemon();
      }
      johnemonMaster.johnemonCollection.push(chosenJohnemon);
      saveGameState();
    }
  );
}

function actionMenu() {
  //menu principal servant à faire les actions ingame
  rl.question(
    `Que souhaitez-vous faire? \n1: Soigner un Johnemon \n2: Réssuciter un Johnemon \n3: Relacher un Johnemon \n4: Renomé un Johnemon \n5: Sauvegarder \n6: Charger une partie \n7: Quitter \n`,
    (answer) => {
      switch (answer) {
        case "1":
          johnemonMaster.showCollection();
          rl.question(`Quel Johnemon voulez-vous soigner?`, (answer) => {
            if (answer === "0") {
              johnemonMaster.healJohnemon();
            } else {
              actionMenu();
            }
          });
          break;
        case "2":
          console.log("Quel Johnemon voulez-vous ressuciter?");
          johnemonMaster.showCollection();
          break;
        case "3":
          console.log("Quel Johnemon voulez-vous relacher?");
          johnemonMaster.showCollection();
          break;
        case "4":
          console.log(`Quel Johnemon voulez-vous renommer?`);
          johnemonMaster.showCollection();
          break;
        case "5":
          saveGameState();
          break;
        case "6":
          console.log("Vous cherchez une partie...");
          gameLoad();
          break;
        default:
          console.log("Au revoir!");
          rl.close();
      }
    }
  );
}

function startGame() {
  gameMenu(); // fonction de base pour lancer le jeu et choisir une nouvelle game ou de charger une game
}

startGame();
