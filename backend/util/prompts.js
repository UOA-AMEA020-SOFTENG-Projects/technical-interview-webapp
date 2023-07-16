export const feedbackPrompts = [
    {
        order: 1,
        min: 0.0, 
        max: 0.30, 
        feedback: "Your response is quite off track, have a think about the steps you should follow to solve the problem and form another response. An example of a good explanation is provided below."
    }, 
    {
        order: 2,
        min: 0.31, 
        max: 0.50, 
        feedback: "Some aspects of your response are on the right track, however across multiple aspects of your response, there is room for improvement. An example of a good explanation is provided below. "
    },
    {
        order: 3,
        min: 0.51, 
        max: 0.89, 
        feedback: "Your explanation generally is on the right track, with improvements for only a few aspects of your response. See the example for a good explanation below to find out what your missing."
    },
    {
        order: 4,
        min: 0.90, 
        max: 1.1, 
        feedback: "Your explanation is very good, well done! See how it compares to our example for a good explanation given below"
    },

];