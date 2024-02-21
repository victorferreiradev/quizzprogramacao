// Declaração de variáveis
const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ["a", "b", "c", "d"];
let points = 0;
let actualQuestion = 0;

// Array de perguntas e respostas
const questions = [{
        "question": "PHP foi desenvolvido para qual fim?",
        "answers": [{
                "answer": "back-end",
                "correct": true
            },
            {
                "answer": "front-end",
                "correct": false
            },
            {
                "answer": "Sistema operacional",
                "correct": false
            },
            {
                "answer": "Banco de dados",
                "correct": false
            },
        ]
    },
    {
        "question": "Uma forma de declarar variável em JavaScript:",
        "answers": [{
                "answer": "$var",
                "correct": false
            },
            {
                "answer": "var",
                "correct": true
            },
            {
                "answer": "@var",
                "correct": false
            },
            {
                "answer": "#let",
                "correct": false
            },
        ]
    },
    {
        "question": "Qual o seletor de id no CSS?",
        "answers": [{
                "answer": "#",
                "correct": true
            },
            {
                "answer": ".",
                "correct": false
            },
            {
                "answer": "@",
                "correct": false
            },
            {
                "answer": "/",
                "correct": false
            },
        ]
    },
];

// Inicializa o quizz
function init() {
    createQuestion(0);
}

// Cria uma pergunta
function createQuestion(i) {
    // Limpa a questão anterior
    const oldButtons = answersBox.querySelectorAll("button");
    oldButtons.forEach(function(btn) {
        btn.remove();
    });

    // Altera o texto da pergunta
    const questionText = question.querySelector("#question-text");
    const questionNumber = question.querySelector("#question-number");
    questionText.textContent = questions[i].question;
    questionNumber.textContent = i + 1;

    // Insere as alternativas
    questions[i].answers.forEach(function(answer, i) {
        // Cria o template do botão de resposta
        const answerTemplate = document.querySelector(".answer-template").cloneNode(true);
        const letterBtn = answerTemplate.querySelector(".btn-letter");
        const answerText = answerTemplate.querySelector(".question-answer");

        letterBtn.textContent = letters[i];
        answerText.textContent = answer['answer'];
        answerTemplate.setAttribute("correct-answer", answer["correct"]);

        // Remove a classe de ocultar e a classe de modelo
        answerTemplate.classList.remove("hide");
        answerTemplate.classList.remove("answer-template");

        // Insere a alternativa na tela
        answersBox.appendChild(answerTemplate);

        // Adiciona um evento de clique no botão
        answerTemplate.addEventListener("click", function() {
            checkAnswer(this);
        });
    });

    // Incrementa o número da questão
    actualQuestion++;
}

// Verifica a resposta do usuário
function checkAnswer(btn) {
    // Seleciona todos os botões
    const buttons = answersBox.querySelectorAll("button");
    // Verifica se a resposta está correta e adiciona classes aos botões
    buttons.forEach(function(button) {
        if (button.getAttribute("correct-answer") === "true") {
            button.classList.add("correct-answer");
            if (btn === button) {
                points++;
            }
        } else {
            button.classList.add("wrong-answer");
        }
    });

    // Exibe a próxima pergunta
    nextQuestion();
}

// Exibe a próxima pergunta no quizz
function nextQuestion() {
    // Timer para o usuário ver as respostas
    setTimeout(function() {
        if (actualQuestion >= questions.length) {
            showSuccessMessage();
            return;
        }
        createQuestion(actualQuestion);
    }, 700);
}

// Exibe a tela final
function showSuccessMessage() {
    hideOrShowQuizz();
    // Calcula a pontuação
    const score = ((points / questions.length) * 100).toFixed(2);
    const displayScore = document.querySelector("#display-score span");
    displayScore.textContent = score.toString();

    // Altera o número de perguntas corretas
    const correctAnswers = document.querySelector("#correct-answers");
    correctAnswers.textContent = points;

    // Altera o total de perguntas
    const totalQuestions = document.querySelector("#questions-qty");
    totalQuestions.textContent = questions.length;
}

// Mostra ou oculta o score
function hideOrShowQuizz() {
    quizzContainer.classList.toggle("hide");
    scoreContainer.classList.toggle("hide");
}

// Reinicia o quizz
const restartBtn = document.querySelector("#restart");
restartBtn.addEventListener("click", function() {
    actualQuestion = 0;
    points = 0;
    hideOrShowQuizz();
    init();
});

// Inicialização do quizz
init();