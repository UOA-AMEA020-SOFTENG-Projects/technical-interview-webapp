class SM2:
    def __init__(self):
        self.ease_factor = 2.5  # Initial ease factor
        # Initial interval (days), inter-repetition interval after the n-th repetition
        self.interval = 1
        self.repetitions = 0    # Number of repetitions

    def update(self, quality_of_response):
        """
        Parameters:
        quality (int): The quality of the response (0 to 5).
                       0: complete blackout,
                       1: incorrect response but remembered,
                       2: incorrect response but easy to recall,
                       3: correct response but hard to recall,
                       4: correct response with hesitation,
                       5: perfect response.
        """
        if quality_of_response < 3:
            self.repetitions = 0
            self.interval = 1
        else:
            if self.repetitions == 0:
                self.interval = 1
            elif self.repetitions == 1:
                self.interval = 6
            else:
                self.interval *= self.ease_factor

            self.repetitions += 1

        # EF’:=EF+(0.1-(5-q)*(0.08+(5-q)*0.02))
        # Note: If EF is less than 1.3 then let EF be 1.3
        self.ease_factor = max(
            1.3, self.ease_factor + 0.1 - (5 - quality_of_response) * (0.08 + (5 - quality_of_response) * 0.02))

    def get_next_review_date(self, last_review_date):
        """
        Parameters:
        last_review_date: The date of the last review.

        Returns:
        datetime.date: The next review date.
        """
        return last_review_date + datetime.timedelta(days=self.interval)


if __name__ == "__main__":
    import datetime

    sm2 = SM2()

    today = datetime.date.today()
    review_dates = [today]

    # These qualities wil be calculated both by the user and also our unsupervised learning model
    qualities = [1, 2, 3, 5, 3, 2, 1]

    for quality in qualities:
        sm2.update(quality)
        next_review_date = sm2.get_next_review_date(review_dates[-1])
        review_dates.append(next_review_date)
        print(f"Quality: {quality}, Next Review Date: {next_review_date}, Interval: {sm2.interval}, Ease Factor: {sm2.ease_factor}")
