class SM2 {
  constructor() {
    this.easeFactor = 2.5; // Initial ease factor
    // Initial interval (days), inter-repetition interval after the n-th repetition
    this.interval = 1;
    this.repetitions = 0; // Number of repetitions
  }

  update(qualityOfResponse) {
    /*
        Parameters:
        qualityOfResponse (int): The quality of the response (0 to 5).
                       0: complete blackout,
                       1: incorrect response but remembered,
                       2: incorrect response but easy to recall,
                       3: correct response but hard to recall,
                       4: correct response with hesitation,
                       5: perfect response.
        */

    if (qualityOfResponse < 3) {
      console.log(this.repetitions);
      this.repetitions = 0;
      this.interval = 1;
    } else {
      if (this.repetitions === 0) {
        this.interval = 1;
      } else if (this.repetitions === 1) {
        this.interval = 6;
      } else {
        this.interval *= this.easeFactor;
      }

      this.repetitions += 1;
    }

    // EF':=EF+(0.1-(5-q)*(0.08+(5-q)*0.02))
    // Note: If EF is less than 1.3 then let EF be 1.3
    this.easeFactor = Math.max(
      1.3,
      this.easeFactor +
        0.1 -
        (5 - qualityOfResponse) * (0.08 + (5 - qualityOfResponse) * 0.02)
    );
  }

  getNextReviewDate(lastReviewDate) {
    return new Date(
      lastReviewDate.getTime() + this.interval * 24 * 60 * 60 * 1000
    );
  }
}

export default SM2;
