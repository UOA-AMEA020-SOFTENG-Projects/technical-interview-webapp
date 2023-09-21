from scipy.stats import shapiro

# enter the differences m2 - m1 
differences = [1,1,1,2,0,1,1,2,1,1,2,1,1,1,0,1,1,1,1,1,0,2,1,0]

# Perform the Shapiro-Wilk test
# change this for each paired question
w_value, p = shapiro(differences)

# the w value determines how well the data fits a bell curve/normal distribution 
# the closer to 1 the better
# it cant be used to make determination on its own, supplements the p-value
print('w_value=%.3f, p=%.10f' % (w_value, p))

# setting the alpha at 0.01, as it is the common value used to determine normal distribution alongside 0.05
# 0.01 is used instead of 0.05 because of the smaller sample size, so the benchmark for normal distribution is lowered.
alpha_value = 0.01
if p > alpha_value:
    print('Normal distribution can be assumed.')
else:
    print('Normal distribution cant be assumed.')
