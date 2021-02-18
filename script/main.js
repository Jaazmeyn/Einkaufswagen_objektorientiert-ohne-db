class Warenkorb{
    constructor(){
        this.warenkorbProdukte = []; //bestimmte Sortimentauswahl von Kunde
    }
    hinzufuegen(produkt){
        console.log(this.warenkorbProdukte, 'warenkorbprodukte')
        //console.log('hinzufügen: ' + this.vorhanden(produkt.id))//geht nicht
        if(this.vorhanden(produkt.id)){
            console.log(" produkt vorhanden true");
        } else {
            console.log(" produkt vorhanden false");
            this.warenkorbProdukte.push(produkt);//id steckt drinnen
            $('#warenkorb').show();
        }//warenkorb.anzeigen();//aktualiesieren
    }
    anzeigen(){
        $('#warenkorb').html(''); console.log('warenkorb anzeigen')
        let summegesamt=0;
        this.warenkorbProdukte.forEach(p => {
            $('#warenkorb').append(p.html).addClass('gekauft');
            summegesamt +=p.preis*p.warenkorbanzahl;
        });
        $('#warenkorb').append("<div><hr>"+summegesamt+"€</div>")
    }
    vorhanden(id){ //produkt vorhanden?
            console.log('produkte',this.warenkorbProdukte, );
        let vorhanden = false;
        this.warenkorbProdukte.forEach(p => {
            console.log('foreach: p.id: '+p.id+' - id: '+ id);
            if(p.id == id){ 
                    console.log('vorhanden');
                vorhanden = true;
                    console.log(p);
                p.warenkorbanzahl++;
                // summe = anzahl mal preis
                p.create();
                    console.log(p);
                return;
            }
            else {
                console.log('noch nicht gefunden')
            }
        });
        if(vorhanden) {
            return true
        } else {
                return false
        };
    }
}

class Produkt {
    constructor(productname, preis, img, id){
        this.id = id;
        this.productname = productname;
        this.preis = preis;
        this.img = img;
        this.html;
        this.warenkorbanzahl = 1;
        this.create(productname, preis, id); //aufruf
    }
    create(){
        this.html = `
            <div id="${this.id}"><h3>${this.productname}</h3>
            <img src="img/item${this.img}.jpg" alt="bild">
            <div class="buttondiv">
                <p class="preis">Ab ${this.preis}€</p>
                <button class="btn btn-outline-primary add" onclick = sortiment.produkte[${this.id}].addButton()>+</button>
                <br>
            </div><br>
            <div class="anzahl">${this.warenkorbanzahl}Stk<br></div>`
    }
    addButton(){// produkte im array vom sortiment an der stelle(id)
        console.log('this',this); //funktionsaufruf auf dem objekt mitgegebenen im html
        warenkorb.hinzufuegen(this);
        warenkorb.anzeigen();
    }
}

class Sortiment { //alle produkte für die darstellung
    constructor(){            
    }
    produkte = [ ];
    hinzufuegen(uebergebeneProdukte){//jedes einzelne erstellte erst nach erstellen möglich
        uebergebeneProdukte.forEach(p=>{ //einzelnes produkt im sortimentarray
            this.produkte.push(p);
        });            
    }
    anzeigen(){
        $('#sortiment').html(''); //zuerst leeren damit nicht doppelt gepusht
        this.produkte.forEach(p => {// im p ein objekt aus produktearray
            $('#sortiment').append(p.html); //neues produkt html aus konstruktor
        });    
    }       
}

//Programmablauf

//Produkt aus Class( darin definiert: html, onclick add to Warenkorb -> wenn noch nicht vorhanden, sonst Anzahl erhöhen. sub)

let p1 = new Produkt('iphone12 Pro', 300, 1, 0);
let p2 = new Produkt('iphone12', 760, 2, 1);
let p3 = new Produkt('iphone12 mini', 760, 3, 2);
let p4 = new Produkt('iphone11 pro', 760, 4, 3);
let p5 = new Produkt('iPad Pro', 760, 5, 4);
let p6 = new Produkt('iPad Air', 760, 6, 5);
let p7 = new Produkt('iPad', 760, 7, 6);
let p8 = new Produkt('iPad mini', 760, 8, 7);


let sortiment = new Sortiment();    // alle Produkte
sortiment.hinzufuegen([p1, p2, p3, p4, p5, p6, p7, p8]); //in der Funktion einzeln ins html kommend vom
sortiment.anzeigen();

let warenkorb = new Warenkorb();    // eingekaufte Produkte


