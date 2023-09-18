const quiz = document.querySelector('.quiz')
const ques = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const radioBtn = document.querySelectorAll('.radio-btn');
const questionLength = document.getElementById('questionLength');
const submitBtn = document.querySelector('.btn')

let current = 0;
let score = 0;
let correctAns;
let len

async function quizData() {
    const result = await fetch('quizData.json');
    const data = await result.json();
    addQuestion(data);
}

function addQuestion(data) {
    len = data.length;
    const { question, a, b, c, d, correct } = data[current];

    questionLength.innerHTML = `${current + 1}/${len}`;
    ques.innerHTML = question;
    a_text.innerHTML = a;
    b_text.innerHTML = b;
    c_text.innerHTML = c;
    d_text.innerHTML = d;
    current++;
    correctAns = correct;
    submitBtn.setAttribute('disabled', 'disabled')
}

radioBtn.forEach(btn => {
    btn.addEventListener('change', () => {
        submitBtn.removeAttribute('disabled')

    })
})

function getSelected() {
    let answer
    radioBtn.forEach(btn => {
        if (btn.checked) {
            answer = btn.id
        }
    })
    return answer
}

function resetRadionBtn() {
    radioBtn.forEach(btn => {
        btn.checked = false;
    });
}

function reset(){
    current=0;
}


function submit() {
    if (correctAns == getSelected()) {
        score++
    }
    resetRadionBtn()

    quizData()
    if (current >= len) {
        quiz.innerHTML = `
        <h2 style="text-align:center">You have answerd correctly ${score} out of ${len}.</h2>
        <button onclick="reset()" class="btn" style="display:block";>Reset</button>
        `;
    }
}
quizData()