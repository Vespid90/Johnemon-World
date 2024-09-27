class JohnemonMaster {
  constructor() {
    this.name = "";
    this.johnemonCollection = [];
    this.healingItems = 5; // Initial number of healing items
    this.reviveItems = 3; // Initial number of revive items
    this.JOHNEBALLS = 10; // Initial number of JOHNEBALLS
  }

  renameJohnemon(chosenJohnemon) {}

  healJohnemon(johnemon) {}

  reviveJohnemon(johnemon) {}

  releaseJohnemon(johnemon) {}

  showCollection() {
    if (this.johnemonCollection.length === 0) {
      console.log("Vous 'avez aucun johnemon dans votre collection");
    } else {
      console.log("Voici les Johnemon dans votre collection :");
      this.johnemonCollection.forEach((johnemon, index) => {
        console.log(
          `${index + 1}. Nom: ${johnemon.name}, Niveau: ${
            johnemon.level
          }, Santé: ${johnemon.healthPool}`
        );
      });
    }
  }

  addJohnemon(johnemon) {
    this.johnemonCollection.push(johnemon);
  }
}

module.exports = JohnemonMaster;
