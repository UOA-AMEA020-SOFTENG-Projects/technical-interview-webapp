import numpy as np

def bootstrap_confidence_interval(data, n_bootstrap_samples=10000, alpha=0.05):
    # Initialize an array to store bootstrap sample means
    bootstrap_means = np.zeros(n_bootstrap_samples)
    
    # Generate bootstrap samples and calculate means
    for i in range(n_bootstrap_samples):
        bootstrap_sample = np.random.choice(data, size=len(data), replace=True)
        bootstrap_means[i] = np.mean(bootstrap_sample)
        
    # Calculate the lower and upper percentiles for the confidence interval
    lower_percentile = 100 * alpha / 2
    upper_percentile = 100 * (1 - alpha / 2)
    lower_bound = np.percentile(bootstrap_means, lower_percentile)
    upper_bound = np.percentile(bootstrap_means, upper_percentile)
    
    return lower_bound, upper_bound

if __name__ == "__main__":
    # Take input from the user
    differences = [0,-1,0,0,0,-1,0,0,0,1,2,1,0,1,-1,1,-1,0,1,0,0,1,2,1]

    # Mean of observed data
    observed_mean = np.mean(differences)
    
    # Calculate 95% Confidence Interval using bootstrapping
    lower_bound, upper_bound = bootstrap_confidence_interval(differences)
    
    print(f"Mean of the differences: {observed_mean}")
    print(f"95% Confidence Interval for the mean difference: ({lower_bound}, {upper_bound})")


