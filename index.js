
import express from "express";
import bodyParser from "body-parser";
//import JSDOM from "jsdom";

const app = express();
const port = 3000;
//global.document = new JSDOM(html).window.document;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
let newItems = [], newItems2 = [];
const currentDate = new Date().getDate();
let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let Day = weekDays[new Date().getDay()];
    let Month = months[new Date().getMonth()];
    let dd = new Date().getDate();
/*function addItem()
{
    let newDivElement = document.createElement('div');
let newCheckBox = document.createElement('input');
let newP = document.createElement('p');
newCheckBox.type = "checkbox";
let inputText = document.querySelector("#text").value;
newP.innerHTML = inputText;


newDivElement.appendChild(newCheckBox);
newDivElement.appendChild(newP);

newDivElement.setAttribute("class", "box item");

document.querySelector(".itemsBox").appendChild(newDivElement);
}
*/

function checkAndClearArrays(req, res, next) {
    const currentDate = new Date();
    if (currentDate.getDate() !== dd) {
      newItems = [];
      newItems2 = [];
      dd = currentDate.getDate();
      Month = months[currentDate.getMonth()];
      Day = weekDays[currentDate.getDay()];
      year = currentDate.getFullYear();
    }
    next();
  }

app.use(checkAndClearArrays);

app.get("/", (req,res)=>
{   
    
    const displayDate = Day + ", " + Month + " " + dd.toString();
    res.render("index.ejs", {D : displayDate, listItems : newItems });
})

app.get("/work", (req,res)=>
{   
    const display = "WORK"
    res.render("work.ejs", {dis : display, workItems : newItems2 });
})


/*app.post("/" , (req, res)=>{

    let Item = req.body.addItem;
    newItems.push(Item);
    res.redirect("/");

});*/
app.post("/", (req, res, next) => {
    var key = Object.keys(req.body)[0];
    var ItemToBeAdded = req.body[key];
    if (key == "workItem") {
      newItems2.push(ItemToBeAdded);
      res.redirect("/work");
      next();
    } else {
      newItems.push(ItemToBeAdded);
      res.redirect("/");
      next();
    }
  });
/*
app.post("", (req,res)=>{
    let wItem = req.body.workItem;
    newItems2.push(wItem);
    res.redirect("/work");
})
*/
app.listen(port, ()=>{
    console.log("Server running at port ", port);
});