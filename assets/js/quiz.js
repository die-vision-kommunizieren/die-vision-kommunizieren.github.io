var quiz = {
    // (A) PROPERTIES
    // (A1) QUESTIONS & ANSWERS
    // Q = QUESTION, O = OPTIONS, A = CORRECT ANSWER
    data: [
        {
            q : "Welche Faktoren sorgen für eine hohe Unglaubwürdigkeit und sorgen für Widerstände bei  den Beteiligten? ",
            o : [
                "offenes, aktives und konkreter Informationsverhalten",
                "konsistente, widerspruchsfreie, konstante und nachvollziehbare Aussagen",
                "Veränderung wird aktiv von den Führungskräften vorgelebt",
                "keine Wiederholung",
            ],
            a : 3
        },
        {
            q : "Welcher Kanal eignet sich nicht für die Kommunikation?",
            o : [
                "Workshops",
                "Teamrunde",
                "Privater Chat",
                "Vier-Augen-Gespräch"
            ],
            a : 2
        },
        {
            q : "Wann wird die Vision an die Mitarbeiter kommuniziert?",
            o : [
                "Nachdem sie an die Führungskräfte kommuniziert wurde",
                "Kurz nachdem die Veränderungen eingeführt worden sind",
                "Zeitgleich mit der Kommunikation an die Führungskräften",
                "Bevor sie an die Führungskräfte kommuniziert wird"
            ],
            a : 0
        },
        {
            q : "Was ist bei der Kommunikation der Vision an die Mitarbeiter\n" +
                "wichtig?",
            o : [
                "Nur kennen der Vision",
                "Möglichst früh an die Mitarbeiter kommunizieren",
                "Alle Mitarbeiter werden zeitgleich informiert",
                "Vision muss an den Arbeitsalltag angepasst werden",
            ],
            a : 3
        },
        {
            q : "Was passiert in der Visions-Informationsveranstaltung?",
            o : [
                "Reine Informationsveranstaltung, keine Fragen erlaubt",
                "Die Vision wird ausgearbeitet",
                "Die Vision wird den Mitarbeitern präsentiert mit anschließender Fragerunde",
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
            q : "Was ist  nicht Teil des Visionshandbuch?",
            o : [
                "Alle Informationen zur Vision und erläutert diese",
                "Enthält Bilder aller beteiligten Personen",
                "Dient als Nachschlagewerk für alle Beteiligten",
                "Adressiert offene Fragen"
            ],
            a : 1
        },
        {
            q : "Was soll mit den Teamrunden erreicht werden?",
            o : [
                "Die Vision soll im Gespräch gehalten werden",
                "Die Mitarbeiter erstellen die Vision",
                "Die Mitarbeiter sollen über die Vision informiert werden",
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

        quiz.hAns.append(`Frage ${quiz.now + 1} von ${quiz.data.length}`);
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
                else if (quiz.score <= 7) {
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
