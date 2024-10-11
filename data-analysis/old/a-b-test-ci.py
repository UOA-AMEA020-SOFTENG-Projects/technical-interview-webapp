import numpy as np
from scipy import stats

def confidence_interval(data,version, alpha=0.05):
    """Calculate the 95% confidence interval using t-distribution."""
    mean = np.mean(data)

    if version == 1: 
        print(f"mean for version A: {mean}")
    else: 
        print(f"mean for version B: {mean}")

    std_err = np.std(data, ddof=1) / np.sqrt(len(data))
    df = len(data) - 1  
    ci = stats.t.interval(1 - alpha, df, loc=mean, scale=std_err)
    return ci

if __name__ == "__main__":
    # data
    data_set_1 = [3,3,2,2,3,5,5,4,4,3,4,3]
    data_set_2 = [3,3,4,4,3,3,3,5,2,4,2,4]

    ci_data_set_1 = confidence_interval(data_set_1, 1)
    ci_data_set_2 = confidence_interval(data_set_2, 2)

    print(f"95% Confidence Interval for version A: {ci_data_set_1}")
    print(f"95% Confidence Interval for version B: {ci_data_set_2}")
