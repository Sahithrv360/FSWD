const quiz=[
    {
        question : "Which lang is used for webpage interactivity ?",
        options : ["HTML","CSS","JS","Python"],
        answer : "JS",
        time = 15
    },
    {
        question : "Which tag creates a heading ?",
        options : ["p - tag"," h1 - tag"," img - tag"," a - tag"],
        answer : " h1 - tag"
    }
];

let index = 0;
let score = 0;
let timer = 30;

const question = document.getElementById("question");
const options = document.getElementById("options");
const result = document.getElementById("result");

function loadQuestion(){
    question.innerHTML = quiz[index].question;
    options.innerHTML = "";

    quiz[index].options.forEach(option=>{
        options.innerHTML += `<input type="radio" name="ans" value="${option}">${option}<br>`;
    });
}

function nextQuestion(){
    const selected = document.querySelector('input[name="ans"]:checked');

    if(selected && selected.value == quiz[index].answer){
        score++;
    }
    index++;

    if(index < quiz.length){
        loadQuestion();
    }else{
        result.innerHTML = "Your Score : "+score+"/"+quiz.length;
        question.innerHTML = "";
        options.innerHTML = ""; 
    }
}
loadQuestion();
setInterval(function(){
    quiz[index].time--;
    document.getElementById("timer").innerHTML = "Time:"+quiz[index].time;
    if(time == 0){
        result.innerHTML = "TimeOver!!! Score : "+score+"/"+quiz.length;
        question.innerHTML = "";
        options.innerHTML = "";
        }
},1000);
