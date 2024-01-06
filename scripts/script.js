let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["палка"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const image = document.querySelector("img");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: 'палка', power: 5 },
  { name: 'ножик', power: 30 },
  { name: 'дубина', power: 50 },
  { name: 'меч', power: 100 }
];
const monsters = [
  {
    name: "слизень",
    level: 2,
    health: 15
  },
  {
    name: "волк",
    level: 8,
    health: 60
  },
  {
    name: "дракон",
    level: 20,
    health: 300
  }
]
const locations = [
    {
        name: "площадь города",
        "button text": ["В магазин", "В пещеру", "К дракону"],
        "button functions": [goStore, goCave, fightDragon],
        text: "Вы на городской площади. Вы видете указатель \"Торговец\".",
        "picture":"./img/01_town.jpg"
    },
    {
        name: "Магазин",
        "button text": ["10 здоровья (10 золота)", "Оружие (30 золота)", "На городскую площадь"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "Вы зашли в магазин.",
        "picture":"./img/02_shop.jpg"
    },
    {
        name: "пещера",
        "button text": ["Напасть на слизня", "Напасть на волка", "На городскую площадь"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "Вы зашли в пещеру. Вас окружили монстры.",
        "picture":"./img/03_cave.jpg"
    },
    {
        name: "бой",
        "button text": ["Атака", "Защита", "Убежать"],
        "button functions": [attack, dodge, goTown],
        text: "Вы сражаетесь с монстром.",
        "picture":["./img/04_slimes.jpg",  "./img/04_wolf.jpg", "./img/04_dragon.jpg"]
    },
    {
        name: "враг повержен",
        "button text": ["На городскую площадь", "На городскую площадь", "На городскую площадь"],
        "button functions": [goTown, goTown, goTown],
        text: 'Монстр захрипел "Грр!" и умер. Вы получили опыт и нашли немного золота.',
        "picture":"./img/05_win.jpg"
    },
    {
        name: "смерть",
        "button text": ["Переиграть?", "Переиграть?", "Переиграть?"],
        "button functions": [restart, restart, restart],
        text: "Вы умерли. ☠️",
        "picture":"./img/06_death.jpg"
    },
    { 
        name: "победа", 
        "button text": ["Переиграть?", "Переиграть?", "Переиграть?"], 
        "button functions": [restart, restart, restart], 
        text: "Вы убили дракона!Вы прошли игру! 🎉",
        "picture":"./img/07_win.jpg" 
    },
    {
        name: "странник",
        "button text": ["2", "8", "Вернуться на городскую площадь?"],
        "button functions": [pickTwo, pickEight, goTown],
        text: "Вы встретили странника. Он предлагает сыграть в игру. Он загадает 10 чисел от 0 до 10 а вы загадаете одно. Если загаданное вами число совпадет с одним из загаданных странником, то вы победили!",
        "picture":"./img/08_stranger.jpg"
    }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  if (location !==3){
  image.src = location["picture"];
  }
  text.innerText = location.text;
}

function goTown() {
  let rand = Math.floor(Math.random() * (3 - 1 + 1) + 1)
  if (rand == 2) {
    easterEgg()
  }
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "Недостаточно золота.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "Теперь у вас есть " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " В вашем инвентаре есть: " + inventory;
    } else {
      text.innerText = "У вас недостаточно золота.";
    }
  } else {
    text.innerText = "У вас уже самое мощное оружие!";
    button2.innerText = "Продать оружие за 15 золота";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "Вы продали " + currentWeapon + ".";
    text.innerText += " В инвентаре осталось: " + inventory;
  } else {
    text.innerText = "Нельзя продавать последнее оружие!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
  console.log(fighting, typeof fighting)
  image.src = locations[3]["picture"][fighting];
}

function attack() {
  text.innerText = "Монстр " + monsters[fighting].name + " аттакует.";
  text.innerText += " Вы аттаковали монстра вашей " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " Вы промазали.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    fighting === 2 ? winGame() : defeatMonster();
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Ваше оружие - " + inventory.pop() + " сломалось.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "Вы увернулись от удара монстра " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["палка"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  let numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "Вы выбрали " + guess + ". Странник выбрал:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.indexOf(guess) !== -1) {
    text.innerText += "Есть! Вы выиграли 20 золота!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Мимо! Вы теряете 10 здоровья!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
  
}
