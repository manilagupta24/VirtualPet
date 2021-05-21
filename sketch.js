var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed;
var lastFed;


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);


  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  fedTime=database.ref("FeedTime ");
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
    fill("yellow");
    textSize(15);
    if(lastFed>=12){
      text("lastFeed"+"="+lastFed%12+"PM",350,30);
    }
    else if(lastFed==0){
      text("lastFed:12AM", 350,30);

    }
    else{
      text("lastFeed"+lastFed+"AM",350,30);

    }

 
 

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

 var food_stock_val=foodObj.getFoodStock();
 if(food_stock_val<=0){
   foodObj.updateFoodStock(food_stock_val*0);

 }
 else{
   foodObj.updateFoodStock(food_stock_val*-1);

 }
 database.ref('/').update({
   Food:foodObj.getFoodStock(),
   FeedTime:hour()
 })

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
