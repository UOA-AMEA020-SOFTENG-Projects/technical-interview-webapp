from scipy.stats import ttest_1samp
from scipy.stats import ttest_ind

# differences: m2 - m1
#differences = [1,1,1,2,0,1,1,2,1,1,2,1,1,1,0,1,1,1,1,1,0,2,1,0]

# this for differences, the below is for two data sets
# t_value, p_value = ttest_1samp(differences, 0)

data_set_1 = [3,3,2,2,3,5,5,4,4,3,4,3]
data_set_2 = [3,3,4,4,3,3,3,5,2,4,2,4]

t_value, p_value = ttest_ind(data_set_1, data_set_2)

print(f"T-Statistic: {t_value}")
print(f"P-value: {p_value}")

# 0.05 taken since that is the standard measure used
alpha = 0.05
if p_value > alpha:
    print('Not statistically significant.')
else:
    print('Statistically significant.')
