import Board from './board/board';
import Score from './score';

export default class Game {
  constructor() {
    this.board = new Board();
    this.score = new Score();
    this.monsterPosition = undefined;
    this.elementStrikes = document.getElementById('strikes');
    this.elementOmissions = document.getElementById('omissions');
  }

  startGame() {
    this.initMonster();
    this.setListeners();
  }

  stopGame() {
    clearInterval(this.monsterInterval);
    this.removeListeners();
  }

  initMonster() {
    this.monsterInterval = setInterval(() => {
      this.moveMonster();
    }, 1000);
  }

  setListeners() {
    this.board.element.addEventListener('click', this.onCellClick.bind(this));
  }

  removeListeners() {
    this.board.element.removeEventListener('click', this.onCellClick.bind(this));
  }

  onCellClick(e) {
    if (!e.target.classList.contains('board-cell')) {
      return;
    }

    e.stopPropagation();

    if (e.target.classList.contains('monster')) {
      this.score.strikesUp();
      this.elementStrikes.textContent = this.score.strikes;
      e.target.classList.remove('monster');
    }
  }

  moveMonster() {
    if (this.monsterPosition !== undefined) {
      if (this.board.cells[this.monsterPosition].classList.contains('monster')) {
        this.score.omissionsUp();
        this.elementOmissions.textContent = this.score.omissions;
        this.board.cells[this.monsterPosition].classList.remove('monster');
        if (this.score.omissions === 5) {
          this.stopGame();
          return;
        }
      }
    }

    let newPos;
    do {
      newPos = Math.trunc(Math.random() * this.board.boardSize ** 2);
    } while (this.monsterPosition === newPos);

    this.monsterPosition = newPos;
    this.board.cells[this.monsterPosition].classList.add('monster');
  }
}
