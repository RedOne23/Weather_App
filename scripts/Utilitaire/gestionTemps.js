
const joursSemaine = ["Monday", "Tuesday", "Wednesday", "Thursday","Friday", "Saturday","Sunday"];

let ajd = new Date();
let options = {weekday: 'long'}; 
let jourActuel = ajd.toLocaleDateString('en-EN', options);

// console.log(jourActuel, ajd);

jourActuel = jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1);

let tabJoursEnOrdre = joursSemaine.slice(joursSemaine.indexOf(jourActuel)).concat(joursSemaine.slice(0,joursSemaine.indexOf(jourActuel)));
// console.log(tabJoursEnOrdre);

export default tabJoursEnOrdre;