import express from "express";
import { User } from "../models/user.js";

const analyticsRouter = new express.Router();

/**
 * Engagement Rate: Measure the rate/ratio at which users click on the suggested problems compared to the other problems. 
 * Engagement is measured by them atleast attempting to run the code once for that specific problem. 
 * Implemented through creating an endpoint to extract this data from db.
 */
analyticsRouter.get("/completed-recommended-ratio/:userId", authenticateToken, async (req, res) => {
    try {
        const userId = req.params.userId;
        
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send('Invalid user ID');
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        const recommendedProblems = user.problemsRecommended;
        const completedProblems = user.problemsCompleted;

        // Find the intersection of recommended and completed problems
        const completedRecommended = recommendedProblems.filter(problem => completedProblems.includes(problem));

        const countRecommendedCompleted = completedRecommended.length;
        const countNonRecommendedCompleted = completedProblems.length - countRecommendedCompleted;

        res.status(200).json({
            recommendedCompleted: countRecommendedCompleted,
            nonRecommendedCompleted: countNonRecommendedCompleted,
            ratio: countRecommendedCompleted / (countNonRecommendedCompleted + countRecommendedCompleted)  
        });
    } catch (err) {
        res.status(500).json({ message: "Error fetching data", error: err });
    }
});



export default analyticsRouter;
