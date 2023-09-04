// import express from "express";
// import { User } from "../models/user.js";
// import { StatusCodes } from "http-status-codes";
// import { invalidId } from "../util/validator.js";

// const analyticsRouter = new express.Router();

// /**
//  * Engagement Rate: Measure the rate/ratio at which users click on the suggested problems compared to the other problems. 
//  * Engagement is measured by them atleast attempting to run the code once for that specific problem. 
//  * Implemented through creating an endpoint to extract this data from db.
//  */
// analyticsRouter.get("/analytics/completed-ratio/:userId", authenticateToken, async (req, res) => {
//     try {
//         const userId = req.params.userId;
        
//         if (!invalidId(userId)) {
//             return res.status(StatusCodes.BAD_REQUEST).send('Invalid user ID');
//         }

//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(StatusCodes.NOT_FOUND).send('User not found');
//         }

//         const recommendedProblems = user.problemsRecommended;
//         const completedProblems = user.problemsCompleted;

//         // Find the intersection of recommended and completed problems
//         const completedRecommended = recommendedProblems.filter(problem => completedProblems.includes(problem));

//         const countRecommendedCompleted = completedRecommended.length;
//         const countNonRecommendedCompleted = completedProblems.length - countRecommendedCompleted;

//         res.status(StatusCodes.OK).json({
//             recommendedCompleted: countRecommendedCompleted,
//             nonRecommendedCompleted: countNonRecommendedCompleted,
//             ratio: countRecommendedCompleted / (countNonRecommendedCompleted + countRecommendedCompleted)  
//         });
//     } catch (err) {
//         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error fetching data", error: err });
//     }
// });

// analyticsRouter.get("/analytics/average-ratio", authenticateToken, async (req, res) => {
//     try {
//         const allUsers = await User.find();

//         let totalRatio = 0;

//         for (let user of allUsers) {
//             const recommendedProblems = user.problemsRecommended;
//             const completedProblems = user.problemsCompleted;

//             // Find the intersection of recommended and completed problems
//             const completedRecommended = recommendedProblems.filter(problem => completedProblems.includes(problem));

//             const countRecommendedCompleted = completedRecommended.length;
//             const countNonRecommendedCompleted = completedProblems.length - countRecommendedCompleted;

//             // To avoid division by zero, check if the denominator is not zero
//             if (countRecommendedCompleted + countNonRecommendedCompleted !== 0) {
//                 totalRatio += countRecommendedCompleted / (countRecommendedCompleted + countNonRecommendedCompleted);
//             }
//         }

//         // Calculate the average ratio
//         const averageRatio = totalRatio / allUsers.length;

//         res.status(StatusCodes.OK).json({
//             averageRatio: averageRatio
//         });

//     } catch (err) {
//         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error fetching data", error: err });
//     }
// });

// export default analyticsRouter;
