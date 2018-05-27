const canva = document.querySelector("canvas");

canva.width = window.innerWidth;
canva.height = window.innerHeight;

const contest = canva.getContext("2d");

contest.fillRect(10, 10, 40, 40);

console.log(canva);
