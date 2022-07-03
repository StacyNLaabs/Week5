// NFT Art Menu App


class NFT {
    constructor(name, rarity) {   //give our NFT a name, and what is the rarity rank for the NFT
        this.name = name;         // name of the NFT
        this.rarity = rarity;    // rarity of the NFT
    }

    describe() {
        return `${this.name} is this rare ${this.rarity}.`;  //describe to print out info about the nft and the rarity. 
    }
}

class Collector {            //Collector Team
    constructor(name) {
        this.name = name;        //name of collector
        this.allnftcards = []; //name of all the nft cards with the collector
    }

    addNFT(nft) {
        if (nft instanceof NFT) {  //is nft an instance of our NFT class
            this.allnftcards.push(nft);  //push the nft to the allnftcards
        } else {
            throw new Error(`You can only add an instance of NFT. Argument is not an NFT: ${nft}.`);
        }
    }

    describe() {
        return `${this.name} has ${this.allnftcards.length} NFT's.`; //this will return how many nft's are held by a collector.
    }
}

class Menu {                         //drives the app and all the choices.
    constructor() {                // not going to initialize any arguments.
        this.collectors = [];             //initilizes our colllectors; which itself is an array of collectors. *can have multi-collectors in this collection. 
        this.selectedCollector = null;   //For whatever Collector we have selected, set to null to start since when we start, no Collector is selected

    }

    start() {                         // add method start to startup our menu app

        let selection = this.showMainMenuOptions();  //will return the selection the user provides.

        while (selection != 0) {          //selection is a variable we are going to use to get user input of what options in the menu has our user selected.
            switch (selection) {           //We are taking a look at the users selection. 
                case '1':
                    this.createNft();   //creating a team that has NFTs
                    break;
                case '2':
                    this.viewNft();       //viewing a team that has NFTs
                    break;
                case '3':
                    this.deleteNft();      //delete team that has NFTs
                    break;
                case '4':
                    this.displayNft();     //display teams that have NFTs
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();   //get the selection again, while we are still inside of the loop; so it keeps looping as long as the user doesn't choose 0.
        }

        alert('Goodbye! You exited the NFT App!');      //if they select 0, they are now outside the loop

    }

    showMainMenuOptions() {            //creating a method of a prompt, that returns input from that prompt. 
        return prompt(`
        0) exit
        1) create new NFT team
        2) view NFT team
        3) delete NFT team
        4) display all NFT teams
        
        `);
    }

    showTeamMenuOptions(teamInfo) {
        return prompt(`
        0) back
        1) create NFT Card
        2) delete NFT Card
        ------------------

        ${teamInfo}
        
        `);
    }

    displayNft() {
        let teamString = '';           // we need to build an 'empty' string that has all the information of the team, so that we can put in a message box or a prompt.
        for (let i = 0; i < this.collectors.length; i++) {      //this.collectors is in the Menu class
            teamString += i + ' )' + this.collectors[i].name + '\n'; // the first i = to identify the INDEX of each team; the next [i] is grabbing the current team that we are looking at for this iteration (that's why you use the .name)
        }

        alert(teamString); //this way we can view all the teams.
    }
    createNft() {
        let name = prompt('Enter name for new nft collection:'); //name comes from the one argument in the class Collector (name). Prompt user for the new NFT collection)
        this.collectors.push(new Collector(name)); //not sure about this...need to ask for help.
    }

    viewNft() {
        let index = prompt('Enter the index of the team you wish to view'); //get index of what user wants to view.
        if (index > -1 && index < this.collectors.length) {     //index greater than -1 and less than length.
            this.selectedCollector = this.collectors[index];  //selected our class property that was null to the nft collection that was inputed by the user.
            let description = 'NFT Collection name: ' + this.selectedCollector.name + '\n';

            for (let i = 0; i < this.selectedCollector.allnftcards.length; i++) { //we want to add all the NFT's to the NFT Collection Name. Remember "selectedCollector" is a "collector"; and each "collector" has a "allnftcards" array. And we have to get the lenght of the "allnftcards" array and we have to iterate thru it - i++
                description += i + ')' + this.selectedCollector.allnftcards[i].name    // get clear on where the 'name' is coming from? There are 2 names in 2 different Classes. 
                    + ' - ' + this.selectedCollector.allnftcards[i].rarity + '\n';

            }

            let selection = this.showTeamMenuOptions(description);
            switch (selection) {
                case '1':
                    this.creatNFTcard();
                    break;

                case '2':
                    this.deleteNFTcard();
            }

        }
    }

    creatNFTcard() {                                                      //creating a card using user based input for the card name, set, color, and rarity, adds card to our collection array
        let name = prompt('Enter the name for a new NFT Card');
        let rarity = prompt('Enter the rarity of your NFT card:');
        this.selectedCollector.allnftcards.push(new NFT(name, rarity));
    }

    deleteNFTcard() {                                                                  //same as above, but splices a card out of our collection array
        let index = prompt('Enter the index of the NFT card you wish to delete:');
        if (index > -1 && index < this.selectedCollector.allnftcards.length) {
            this.selectedCollector.allnftcards.splice(index, 1);
        }
    }

}

let menu = new Menu();
menu.start()




