let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");

let turnO = true; //playerX ,playerO
let count = 0; //only to check game draw.

// 2D array;
// let arr = [["apple,banana,orange"], ["patato,garlic"], ["pants,shirts,cap"]];

const winPattents = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  //   boxes.style.backgroundColor = "white";
};

/* VScode write small "t" in innertext because I write small t in innertext before and my code was not worked and find by own but I could not find what was the mistake 
   So I copy below code and ask Chatgpt what was the problem and I got the solution of capital ""T" so its innerText
*/

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("box was clicked!");
    // box.innerText = "abcd";
    if (turnO) {
      // for player O
      box.innerText = "O";
      box.style.color = "rgba(255,0,0,0.7)";
      turnO = false;
    } else {
      // For player X
      box.innerText = "X";
      box.style.color = "rgba(0,0,255,0.7)";
      turnO = true;
    }
    box.disabled = true; // Disable box to not overide once clicked..
    // checkWinner(); // remove to add game draw function.
    count++;
    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulation, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPattents) {
    let post1Val = boxes[pattern[0]].innerText;
    let post2Val = boxes[pattern[1]].innerText;
    let post3Val = boxes[pattern[2]].innerText;

    if (post1Val != "" && post2Val != "" && post3Val != "") {
      if (post1Val === post2Val && post2Val === post3Val) {
        console.log("Winner! is ", post1Val);
        showWinner(post1Val);
        return true;
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
