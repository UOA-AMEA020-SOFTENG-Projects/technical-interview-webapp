from scipy.stats import ttest_1samp

# differences: m2 - m1
differences = [1,1,1,2,0,1,1,2,1,1,2,1,1,1,0,1,1,1,1,1,0,2,1,0]

t_value, p_value = ttest_1samp(differences, 0)

print(f"T-Statistic: {t_value}")
print(f"P-value: {p_value}")

# 0.05 taken since that is the standard measure used
alpha = 0.05
if p_value > alpha:
    print('Not statistically significant.')
else:
    print('Statistically significant.')
