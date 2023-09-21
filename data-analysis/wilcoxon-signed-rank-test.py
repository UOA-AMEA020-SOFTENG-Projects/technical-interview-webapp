from scipy.stats import wilcoxon

# IMPORTANT TO CONSIDER:
# when there are zeroes in the data set, this means that the exact method for wilcoxon signed rank test cannot be used, but rather 
# an approximation is made for the p-value. We can filter out the zeros from the differences array, but in our context difference of 
# zero means that the participant did not feel any change before and after using the app for that specific thing (e.g. confidence) and 
# that is significant and important info, so it doesnt make sense to filter the zeros out. So we will go with the less accurate approximation 
# for p-value instead, which means the conclusion is less strong, but is still viable enough for our context.

# list of differences between m2 - m1
# change this for each paired question
differences = [1,1,1,2,0,1,1,2,1,1,2,1,1,1,0,1,1,1,1,1,0,2,1,0]

w_value, p_value = wilcoxon(differences)

# the w-value is gotten from the table for the test 
# by default it is is two sided test, so it is calculating and comparing w-value for a two sided test
# as we are not considering an initial prediction.
print(f"W value used: {w_value}")
print(f"P-value: {p_value}")

# setting confidence intervals at 95%, or 0.05 for the alpha value
alpha = 0.05

# if the calculated p-value is less than 0.05, then the results are statistically significant
# as in the differences between the two sets of data are significant enough to be considered definitive
if p_value > alpha:
    print('Not statistically significant.')
else:
    print('statistically significant')
