from scipy import stats
import numpy as np

def paired_t_test(differences):
    # Calculate the mean and standard error of the differences
    mean_diff = np.mean(differences)
    std_diff = np.std(differences, ddof=1)
    n = len(differences)
    
    # Calculate the standard error of the mean
    sem_diff = std_diff / np.sqrt(n)
    
    # Degrees of freedom and critical t-value
    df = n - 1
    alpha = 0.05
    t_critical = stats.t.ppf(1 - alpha/2, df)
    
    # Calculate the margin of error
    margin_error = t_critical * sem_diff
    
    # Calculate the 95% Confidence Interval
    lower_bound = mean_diff - margin_error
    upper_bound = mean_diff + margin_error
    
    return mean_diff, lower_bound, upper_bound

if __name__ == "__main__":
    # Take input from the user
    differences = [2,3,2,2,1,2,3,4,3,1,1,3,1,1,1,2,3,3,3,4,4,4,1,2]

    mean_diff, lower_bound, upper_bound = paired_t_test(differences)
    
    print(f"Mean of the differences: {mean_diff}")
    print(f"95% Confidence Interval for the mean difference: ({lower_bound}, {upper_bound})")
