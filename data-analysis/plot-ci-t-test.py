import numpy as np
from scipy import stats
import matplotlib.pyplot as plt

def confidence_interval(data, alpha=0.05):
    """Calculate the 95% confidence interval using t-distribution."""
    mean = np.mean(data)
    std_err = np.std(data, ddof=1) / np.sqrt(len(data))
    df = len(data) - 1  # degrees of freedom
    ci = stats.t.interval(1 - alpha, df, loc=mean, scale=std_err)
    return ci

if __name__ == "__main__":
    # a-b test datasets for version a and b
    data_set_1 = [3,3,2,2,3,5,5,4,4,3,4,3]
    data_set_2 = [3,3,4,4,3,3,3,5,2,4,2,4]

    ci_data_set_1 = confidence_interval(data_set_1)
    ci_data_set_2 = confidence_interval(data_set_2)
    
    # Plotting
    labels = ['Version A', 'Version B']
    means = [np.mean(data_set_1), np.mean(data_set_2)]
    errors = [(means[0]-ci_data_set_1[0], ci_data_set_1[1]-means[0]),
              (means[1]-ci_data_set_2[0], ci_data_set_2[1]-means[1])]
    
    fig, ax = plt.subplots()
    ax.bar(labels, means, yerr=np.array(errors).T, align='center', alpha=0.7, ecolor='black', capsize=10)
    ax.set_ylabel('Mean Score')
    ax.set_title('A/B Testing Means and CI')
    ax.yaxis.grid(True)

    # Display the plot
    plt.tight_layout()
    plt.show()
