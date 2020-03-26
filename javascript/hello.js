// alert("Hello world");

// let.message = "Hello World";
// alert(message);
// message = "Hallo Welt";
// alert(message);   --> Strg+# für Ausklammern einzelner oder mehrerer Zeilen

const LINK_COLOR = "#ff0000"; // Unterstrich möglich bei Benennung;
console.log("Link bitte in der Farbe ", LINK_COLOR);

let highscore = 520233;
console.log(highscore / 10);

let firstname = "John";
let lastname = 'Smith';
console.log("Name: ", firstname, lastname);

let fullname = 'Jeffrey "The Dude" Lebowski';
console.log(fullname);

let template = `Dein Highscore sind ${highscore} Punkte`;
console.log(template);
// meistens verwendet, da häufig mit eingebauten Elementen!;

let isOver18 = true; // Klassische Variante für Benennung komplexer Variablen;
console.log(isOver18);

let age =19;
console.log("über 18?", age > 18); //Überprüfung einer Variable mit Ausage true/false;

let participants = [ "John", "Jane", "Max" ]; //Einträge in [] sind Arrays
console.log(participants);
console.log("Einträge im Array: ", participants.length);
console.log(participants[2]); //Zählung startet bei 0, deshalb für 3. Name, Angabe 2

let gameHighscore = [2099, 3010, 3333, 5000];
console.log(gameHighscore);

let user = {
firstname: "John",
lastname: "Smith",
age: 25
};
//Objekte, die mehrere Elemente (Properties) in einer Variable zulassen
//um einen Wert innerhalbe zuzuweisen hier : wichtig
console.log(user);
console.log(user.firstname);
// Zugriff auf ein Element innerhalb einer Variable über Varibale.Element
user.highscore = 200;
//zum weiteren Hinzufügen innerhalb der Variable dann mit =
user["highscore ever"] = 400;
//Besonderer Schlüssel um Leerzeichen im Syntax anzeigen zu können
console.log(user);

let a = 2;
let b = 4;
console.log(a + b);
console.log(b/(a-1));
a++;
console.log(a);

// let myAge = prompt("Wie alt bist du?"); //prompt macht ein Popup-Fenster mit Eintragungsmöglichkeit
// console.log(`Du bist ${myAge} Jahre alt.`)
// console.log(`über 18? , ${myAge > 18}`);

// If-Abfrage

// if (myAge > 18) {
//     console.log("Glückwunsch über 18");
// } else {
//     console.log("Leider unter 18")
// }

// Schleifen: for Schleife

for (let i=0; i<10; i++) {
    console.log(`Schleife ${i}`);
}
// for Gebinnt die Schleife, erster Wert erzeugt Variable, wie lange soll Schleife ausgeführt werden, was soll innerhalb der Schleife gemacht werden

for (let j = 0; j < participants.length; j++) {
    const participant = participants[j];
    console.log(`Teilnehmer ${j+1} ${participant}`);
}