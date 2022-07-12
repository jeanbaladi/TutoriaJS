
var style = `
    @import "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css";
    .player {
        width: 50px;
        height: 50px;
        background: red;
        transition-duration: 500ms;
    }
    .space {
        width: 100%;
        height: 100%;
        position: relative;
    }
    .initialPos {

    }
    header {
        height: 350px;
        width: 100%;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
    }
    .flex {
        display: flex;
        align-items: flex-start;
    }
    .header--flex {
        display: flex;
        flex-direction: row-reverse;
    }
    form.flex {
        flex-direction: column;
        justify-content: center
    }
`

var styleSheet = document.createElement("style");
styleSheet.innerText = style;
document.head.appendChild(styleSheet);

const root = document.getElementById("root");
const life = document.getElementById("life");
const header = document.getElementById("header");
var stage = 0;
var movePY = 0;
class test {
    constructor(value , lvl, life){
        this.value = value
        this.lvl = 0;
        this.life = 3;
    }
    nextQuestions(){
        this.lvl++;
        return `./public/quest/quest-${this.lvl}.png`;
    }
    defeat(){
        return this.life -= 1;
    }
    playerLost(){
        return this.life >= 0 ? `<h2 class="container">Vida: ${this.life}</h2>` : `<h2>Perdistes 😳</h2>`
    }
}

window.addEventListener("load", () => {
    initialTest();
    createPlayer();
})

function initialTest(){
    let getName = `
            <div class="row flex" id="register">
                <input class="col s6" type="text" id="name" placeholder="ingrese su nombre (solo si quieres)">  
                <a id="btn" style="margin: 0 auto;" class="col s3 waves-effect waves-light btn">Iniciar</a>
            </div>`
    header.innerHTML = getName;
    let start = document.getElementById("btn");
    start.addEventListener("click" , () => {
        let name = document.getElementById("name").value;
        const player = new test(name);
        document.getElementById("register").remove();
        question(player);
        createLife(player);
    })
}

function question(player){
    let res = `
                <form class="col s2 flex" name="form">
                <p>Selecciona la respuesta</p>
                <p>
                <label>
                    <input name="response" value="A" type="radio" />
                    <span>A</span>
                </label>
                </p>
                <p>
                <label>
                    <input name="response" value="B" type="radio" />
                    <span>B</span>
                </label>
                </p>
                <p>
                <label>
                    <input name="response" value="C" type="radio"  />
                    <span>defaultCondition</span>
                </label>
                </p>
                <a id="btnNext" style="margin: 0 auto;" class="waves-effect waves-light btn">Siguiente</a>
            </form>
    `
    let img = document.createElement("img");
    img.src = player.nextQuestions();
    header.innerHTML = `${res}`;
    header.appendChild(img);
    header.classList.add("header--flex")
    img.classList.add("col")
    img.classList.add("s10")
    img.classList.add("l6")

    document.getElementById("btnNext").addEventListener("click", () => {
        if(document.form.response.value != false){
            let py = document.getElementById("py");
            movePY += 15;
            py.style.transform = `translateX(${movePY}vw)`
            stage++;
            let resQ1 = "B" == document.form.response.value;
            let resQ2 = "B" == document.form.response.value;
            let resQ3 = "A" == document.form.response.value;
            let resQ4 = "A" == document.form.response.value;
            let resQ5 = "B" == document.form.response.value;
            let resQ6 = "B" == document.form.response.value;
            let arrRes = [resQ1,resQ2,resQ3,resQ4,resQ5,resQ6]
            if(stage <= 5 && player.life > 0){
                for (let i = stage; i <= stage + 1; i++) {
                    if(stage == i){
                        img.src = player.nextQuestions();
                        if(arrRes[i - 1]) {
                            let music = new Audio('./public/effects/check.mp4');
                            music.play();
                            music.playbackRate = 2;
                        }else {  
                            player.defeat()
                            let music = new Audio('./public/effects/err.mp4');
                            music.play();
                            music.playbackRate = 2;
                        }
                        console.log(player);
                        break;
                    }
                }
            }else {
                finisGame(player)
            }
            createLife(player)
        }
    })
}

function createPlayer(){
    let player = `
                <div class="space">
                    <div id="py" class="player initialPos"></div>
                </div>`
    root.innerHTML = player;
}
function createLife(player){
    life.innerHTML = `${player.playerLost()}`;
}
function finisGame(player){
    Swal.fire({
        title: `${player.life > 0 ? "Juego terminado" : "Oh no, cubito no llego a la meta ☹"}`,
        text: `${player.life > 0 && `Excelente trabajo 🤓 errores: ${3 - player.life}`}`,
        icon: `${player.life > 0 ? "success" : "error"}`,
        confirmButtonText: 'Intentar de nuevo'
      }).then((result => {
        if (result.isConfirmed) {
            window.location.reload();
          }
      }))
}
