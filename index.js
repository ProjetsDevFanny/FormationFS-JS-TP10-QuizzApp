// === Classes ===
class Question {
  constructor(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }

  isCorrect(choice) {
    return choice === this.answer;
  }
}

class Quiz {
  constructor(questions) {
    this.questions = questions; // on stocke les questions dans la classe Quiz
    this.score = 0; // Le score de l'utilisateur
    this.currentIndex = 0; // L'index de la question courante
  }

  //  retourne la question en cours
  getCurrentQuestion() {
    return this.questions[this.currentIndex];
  }

  // Prendre la réponse de l’utilisateur, vérifier si elle est correcte, mettre à jour le score si besoin, et passer à la question suivante.
  guess(answer) {
    if (this.getCurrentQuestion().isCorrect(answer)) {
      this.score++;
      ringTrue();
    } else {
      ringFalse();
    }
    this.currentIndex++;
  }

  // Vérifie si le quizz est fini
  hasEnded() {
    return this.currentIndex >= this.questions.length;
  }
}

// === Données === // ou import d’un fichier externe avec les données
const questions = [
  new Question(
    "Quelle méthode Javascript permet de filtrer les éléments d'un tableau ?",
    ["indexOf()", "map()", "filter()", "reduce()"],
    "filter()"
  ),
  new Question(
    "Quelle méthode Javascript permet de vérifier si un élément figure dans un tableau ?",
    ["isNaN()", "includes()", "findIndex()", "isOdd()"],
    "includes()"
  ),
  new Question(
    "Quelle méthode transforme du JSON en un objet Javascript ?",
    ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.toJS"],
    "JSON.parse()"
  ),
  new Question(
    "Quel objet Javascript permet d'arrondir à l'entier le plus proche ?",
    ["Math.ceil()", "Math.floor()", "Math.round()", "Math.random()"],
    "Math.round()"
  ),
];

// === Fonctions d'affichage ===

// 3. Fonctions de rendu ou de mise à jour de l’interface (UI)
function showQuestion() {
  if (quiz.hasEnded()) {
    showScore();
    showResult();
  } else {
    const question = quiz.getCurrentQuestion();
    const questionElement = document.getElementById("question");
    questionElement.textContent = question.text;
    showScore();

    // Affichage du numéro de la question
    const questionNumber = document.getElementById("progress");
    questionNumber.textContent = `Question ${quiz.currentIndex + 1} / ${
      quiz.questions.length
    }`;

    // Affichage des choix
    question.choices.forEach((choice, index) => {
      const button = document.getElementById("choice" + index);
      button.textContent = choice;
      button.onclick = () => {
        quiz.guess(choice);
        showQuestion();
      };
    });
  }
}

// Affichage du score
function showScore() {
  const scoreH3 = document.getElementById("score");
  scoreH3.textContent = `Score : ${quiz.score} / ${quiz.questions.length}`;
}

// Affichage de la page de résultat
function showResult() {
  const quizEndDisplay = document.getElementById("quiz");
  // Affichage du bouton reload
  quizEndDisplay.innerHTML = `
    <h1><span>Quiz </span>Terminé ! </h1>
    <h3 id="score">Votre score est de ${quiz.score} / ${quiz.questions.length}</h3>
    <button id="reload" onclick="location.reload()">Recommencer</button>
       
   `;
}

// Sons
// Son de la mauvaise réponse
function ringFalse() {
  const audio = new Audio();
  audio.src = "./ringFalse.mp3";
  audio.play();
}
// Son de la bonne réponse
function ringTrue() {
  const audio = new Audio();
  audio.src = "./ringTrue.mp3";
  audio.play();
}

// 4. Initialisation
const quiz = new Quiz(questions); // Créer l'objet Quiz avec les questions

// 5. Event listeners (si besoin d'autres interactions)
// Par exemple, si tu veux un bouton "Recommencer"

// 6. Lancement du jeu
showQuestion(); // Afficher la première question
