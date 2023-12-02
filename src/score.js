export default class Score {
  #strikes;
  #omissions;

  constructor() {
    this.init();
  }

  init() {
    this.#strikes = 0;
    this.#omissions = 0;
  }

  strikesUp() {
    this.#strikes++;
  }

  omissionsUp() {
    this.#omissions++;
  }

  get strikes() {
    return this.#strikes;
  }

  get omissions() {
    return this.#omissions;
  }
}
