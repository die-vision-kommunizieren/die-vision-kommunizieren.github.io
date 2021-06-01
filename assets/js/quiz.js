var quiz = {
    // (A) PROPERTIES
    // (A1) QUESTIONS & ANSWERS
    // Q = QUESTION, O = OPTIONS, A = CORRECT ANSWER
    data: [
        {
            q : "Welche Faktoren sorgen für eine hohe Glaubwürdigkeit und beugen somit Widerstände vor?",
            o : [
                "offenes, aktives und konkreter Informationsverhalten",
                "konsistente, widerspruchsfreie, konstante und nachvollziehbare Aussagen",
                "häufige Wiederholung",
                "Veränderung wird aktiv von den Führungskräften vorgelebt"
            ],
            a : 0
        },
        {
            q : "Wieso ist die Anwendung einer Multikanalstrategie sinnvoll?",
            o : [
                "Menschen nehmen aus unterschiedlichen Kanälen unterschiedliche Informationen gut auf",
                "Menschen nehmen aus unterschiedlichen Kanälen unterschiedliche Informationen gut auf",
                "Menschen nehmen aus unterschiedlichen Kanälen unterschiedliche Informationen gut auf",
                "Menschen nehmen aus unterschiedlichen Kanälen unterschiedliche Informationen gut auf"
            ],
            a : 2
        },
        {
            q : "Welches Sie Beispiele für mögliche Kanäle.",
            o : [
                "Artikel im Intranet",
                "Quatsch2",
                "Quatsch3",
                "Quatsch4"
            ],
            a : 0
        },
        {
            q : "Wann wird die Vision an die Mitarbeiter kommuniziert?",
            o : [
                "Kurz nachdem die Veränderungen eingeführt worden sind",
                "Zeitgleich mit der Kommunikation an die Führungskräften",
                "Bevor sie an die Führungskräfte kommuniziert wird",
                "Nachdem sie an die Führungskräfte kommuniziert wurde"
            ],
            a : 0
        },
        {
            q : "Was ist bei der Kommunikation der Vision an die Mitarbeiter\n" +
                "wichtig?",
            o : [
                "Nicht nur kennen, sondern Verstehen der Vision",
                "Möglichst früh an die Mitarbeiter kommunizieren",
                "Unterstützung von Seiten der Führungskräfte",
                "Alle Mitarbeiter werden zeitgleich informiert"
            ],
            a : 3
        },
        {
            q : "Was passiert in der Visions-Informationsveranstaltung?",
            o : [
                "Die Vision wird den Mitarbeitern präsentiert",
                "Die Vision wird ausgearbeitet",
                "Es dürfen Fragen zur Vision gestellt werden",
                "Die Führungskräfte besprechen die Vision"
            ],
            a : 2
        },
        {
            q : "Was passiert beim Visionsdialog?",
            o : [
                "Die Teams besprechen mit ihren Vorgesetzten die Inhalte",
                "Jeder Mitarbeiter spricht einzeln mit seinem Vorgesetzten",
                "Die Teams erarbeiten die Bedeutung für ihren Arbeitsplatz",
                "Die Teams besprechen ohne ihre Vorgesetzten die Inhalte"
            ],
            a : 2
        },
        {
            q : "Was ist ein Visionshandbuch?",
            o : [
                "Enthält alle Informationen zur Vision und erläutert diese",
                "Adressiert offene Fragen",
                "Dient als Nachschlagewerk für alle Beteiligten",
                "Enthält Bilder aller beteiligten Personen"
            ],
            a : 1
        },
        {
            q : "Was soll mit den Teamrunden erreicht werden?",
            o : [
                "Die Mitarbeiter sollen bei den Veränderungen unterstützt werden",
                "Die Mitarbeiter sollen über die Vision informiert werden",
                "Die Vision soll im Gespräch gehalten werden",
                "Die Mitarbeiter sollen die Vision erarbeiten"
            ],
            a : 0
        }
    ],

    // (A2) HTML ELEMENTS
    hWrap: null, // HTML quiz container
    hQn: null, // HTML question wrapper
    hAns: null, // HTML answers wrapper

    // (A3) GAME FLAGS
    now: 0, // current question
    score: 0, // current score

    // (B) INIT QUIZ HTML
    init: function(){
        // (B1) WRAPPER
        quiz.hWrap = document.getElementById("quizWrap");

        // (B2) QUESTIONS SECTION
        quiz.hQn = document.createElement("div");
        quiz.hQn.id = "quizQn";
        quiz.hWrap.appendChild(quiz.hQn);

        // (B3) ANSWERS SECTION
        quiz.hAns = document.createElement("div");
        quiz.hAns.id = "quizAns";
        quiz.hWrap.appendChild(quiz.hAns);

        // (B4) GO!
        quiz.draw();
    },

    // (C) DRAW QUESTION
    draw: function(){
        // (C1) QUESTION
        quiz.hQn.innerHTML = quiz.data[quiz.now].q;

        // (C2) OPTIONS
        quiz.hAns.innerHTML = "";
        for (let i in quiz.data[quiz.now].o) {
            let radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "quiz";
            radio.id = "quizo" + i;
            quiz.hAns.appendChild(radio);
            let label = document.createElement("label");
            label.innerHTML = quiz.data[quiz.now].o[i];
            label.setAttribute("for", "quizo" + i);
            label.dataset.idx = i;
            label.addEventListener("click", quiz.select);
            quiz.hAns.appendChild(label);
        }

        quiz.hAns.append(`Frage ${quiz.now} von ${quiz.data.length}`);
    },

    // (D) OPTION SELECTED
    select: function(){
        // (D1) DETACH ALL ONCLICK
        let all = quiz.hAns.getElementsByTagName("label");
        for (let label of all) {
            label.removeEventListener("click", quiz.select);
        }

        // (D2) CHECK IF CORRECT
        let correct = this.dataset.idx == quiz.data[quiz.now].a;
        if (correct) {
            quiz.score++;
            this.classList.add("correct");
        } else {
            this.classList.add("wrong");
        }

        // (D3) NEXT QUESTION OR END GAME
        quiz.now++;
        setTimeout(function(){
            if (quiz.now < quiz.data.length) { quiz.draw(); }
            else {
                if (quiz.score <= 3) {
                    quiz.hQn.innerHTML = `Du hast ${quiz.score} von ${quiz.data.length} Fragen richtig beantwortet. Das geht aber besser.`;
                    quiz.hAns.innerHTML = "";
                    document.getElementById("readAgain").style.display = 'block';
                }
                else if (quiz.score <= 8) {
                    quiz.hQn.innerHTML = `Du hast ${quiz.score} von ${quiz.data.length} Fragen richtig beantwortet. Probier es doch nochmal. Da ist noch Luft nach oben.`;
                    quiz.hAns.innerHTML = "";
                    document.getElementById("backToQuiz").style.display = 'block';
                } else {
                    quiz.hQn.innerHTML = `Sehr gut, du hast ${quiz.score} von ${quiz.data.length} Fragen richtig beantwortet! Du bist jetzt gewappnet deine Vision zu kommunizieren.`;
                    quiz.hAns.innerHTML = "";
                    document.getElementById("endQuiz").style.display = 'block';
                }
            }
        }, 1000);
    }
};
window.addEventListener("load", quiz.init);
