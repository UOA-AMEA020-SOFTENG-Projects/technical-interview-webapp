import pandas as pd
import numpy as np
from scipy import stats


def wilcoxon_test_with_effect_size_and_descriptives(pre_series, post_series):
    pre = pre_series.dropna()
    post = post_series.dropna()
    common_index = pre.index.intersection(post.index)
    pre = pre.loc[common_index]
    post = post.loc[common_index]

    statistic, p_value = stats.wilcoxon(pre, post)

    # Calculate Z-score
    z_score = (statistic - (len(pre) * (len(pre) + 1) / 4)) / \
        np.sqrt(len(pre) * (len(pre) + 1) * (2 * len(pre) + 1) / 24)

    # Calculate effect size r
    effect_size = abs(z_score) / np.sqrt(len(pre) * 2)

    # Calculate mean and median
    pre_mean = pre.mean()
    post_mean = post.mean()
    pre_median = pre.median()
    post_median = post.median()

    return statistic, p_value, len(common_index), effect_size, pre_mean, post_mean, pre_median, post_median


# Read the CSV files
pre_data = pd.read_csv('pre.csv')
post_data = pd.read_csv('post.csv')

results = []

for col in pre_data.columns:
    if col in post_data.columns:
        statistic, p_value, n, effect_size, pre_mean, post_mean, pre_median, post_median = \
            wilcoxon_test_with_effect_size_and_descriptives(
                pre_data[col], post_data[col])

        results.append({
            'Question': col,
            'Wilcoxon test statistic': statistic,
            'p-value': p_value,
            'Number of paired responses': n,
            'Effect size (r)': effect_size,
            'Pre Mean': pre_mean,
            'Post Mean': post_mean,
            'Pre Median': pre_median,
            'Post Median': post_median
        })

# Convert results to DataFrame
results_df = pd.DataFrame(results)

# Add effect size interpretation


# def interpret_effect_size(r):
#     if r < 0.3:
#         return 'Small'
#     elif r < 0.5:
#         return 'Medium'
#     else:
#         return 'Large'


# results_df['Effect size interpretation'] = results_df['Effect size (r)'].apply(
#     interpret_effect_size)

# Save results to CSV
results_df.to_csv(
    'wilcoxon_test_results_with_effect_size_and_descriptives.csv', index=False)

print("Results with effect sizes and descriptive statistics have been saved to 'wilcoxon_test_results_with_effect_size_and_descriptives.csv'")

# Display results
pd.set_option('display.max_columns', None)  # Ensure all columns are displayed
# Ensure the full width of the DataFrame is displayed
pd.set_option('display.width', None)
print(results_df.to_string(index=False))
