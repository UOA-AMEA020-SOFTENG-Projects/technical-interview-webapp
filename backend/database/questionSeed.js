import mongoose from "mongoose";
import Question from "../models/question.js";

export const questions = [
  {
    _id: "64c0c98571ec7fd03e996e7d",
    questionContent: "How long do you have left to prepare for your technical interview?",
    responses: ["Less than 1 week", "1-4 weeks", "More than 4 weeks"],
    order: 1
  },
  {
    _id: "64c0c98875d308de6c332210",
    questionContent: "What does this code print?",
    responses: ["6", "10", "15", "I'm not sure"],
    // correct answer is 6
    image: "arrays.png",
    order: 2
  },
  {
    _id: "64c0c98c7e53bf2a6d0d0228",
    questionContent: "What does this code print?",
    responses: ["20", "30", "40", "I'm not sure"],
    // correct answer is 40
    image: "stack.png",
    order: 3
  },
  {
    _id: "64c0c9926f37dbfa1d3b8760",
    questionContent: "What will this method return if the target value is not present in the arr array?",
    responses: ["It will throw an exception", "0", "-1", "I'm not sure"],
    // correct answer is -1
    image: "binarysearch.png",
    order: 4
  },
  {
    _id: "64c0c99668fe8a132f4d24d5",
    questionContent: "Consider the following Java method that is supposed to count the number of nodes in a singly linked list. What does the countNodes method return?",
    responses: ["Sum of data values in the linked list", "Count of nodes in the linked list", "Last node of the linked list", "I'm not sure"],
    // correct answer is count of nodes in the linked list
    image: "linkedlist.png",
    order: 5
  },
  {
    _id: "64c0c99a65d593917b5e8a1e",
    questionContent: "Consider the following Java method that calculates the height of a binary tree. What does the calculateHeight method return?",
    responses: ["Number of nodes in the binary tree", "Maximum depth or height of the binary tree", "Root node of the binary tree", "I'm not sure"],
    // correct answer is max depth/height of the binary tree
    image: "binarytree.png",
    order: 6
  },
  {
    _id: "64c0c99d80eeaa627d2bdf81",
    questionContent: "Consider the following Java method that checks if a binary tree is a min-heap. What does the isMinHeap method return?",
    responses: ["It checks if every parent node is smaller than or equal to its child/children in the tree, returning true if so, and false otherwise", "It checks if every parent node is larger than or equal to its child/children in the tree, returning true if so, and false otherwise", "It counts the number of nodes in the binary tree", "I'm not sure"],
    // correct answer is first option
    image: "heap.png",
    order: 7
  },
  {
    _id: "64c0c9a030f38f51c4f6820e",
    questionContent: "Consider the following Java code snippet for a Depth-First Search (DFS) in a graph. What is the purpose of the DFSUtil method?",
    responses: ["It finds the shortest path from the vertex 'v' to all other vertices in the graph", "It performs a Breadth-First Search (BFS) from the vertex 'v'", "It performs a Depth-First Search (DFS) from the vertex 'v'", "I'm not sure"],
    // correct answer is third option
    image: "graph.png",
    order: 8
  },
  {
    _id: "64c0c9a467be9993ba630b34",
    questionContent: "Consider the following Java code snippet for calculating the nth Fibonacci number using dynamic programming. What does this method return?",
    responses: ["The factorial of n", "nth Fibonacci number", "Sum of integers from 1 to n", "I'm not sure"],
    // correct answer is second option
    image: "dynamic.png",
    order: 9
  },
  {
    _id: "64f65a291e5bb26d4632b95f",
    questionContent: "How long do you have left to prepare for your technical interview?",
    responses: ["Less than 1 week", "1-4 weeks", "More than 4 weeks"],
    order: 10
  },
  {
    _id: "64f65ab8f789b22453eb5c97",
    questionContent: "Rate your proficiency in Arrays",
    responses: ["Low", "Average", "High"],
    order: 11
  },
  {
    _id: "64f65abe0089d830090858f9",
    questionContent: "Rate your proficiency in Stack",
    responses: ["Low", "Average", "High"],
    order: 12
  },
  {
    _id: "64f65ac2725bdeefc54106c8",
    questionContent: "Rate your proficiency in Binary Search",
    responses: ["Low", "Average", "High"],
    order: 13
  },
  {
    _id: "64f65ac6a2a45663db85cf94",
    questionContent: "Rate your proficiency in Linked List",
    responses: ["Low", "Average", "High"],
    order: 14
  },
  {
    _id: "64f65acad10de881a30680ff",
    questionContent: "Rate your proficiency in Trees",
    responses: ["Low", "Average", "High"],
    order: 15
  },
  {
    _id: "64f65ace6cff97e72cc51887",
    questionContent: "Rate your proficiency in Heap",
    responses: ["Low", "Average", "High"],
    order: 16
  },
  {
    _id: "64f65ad31a0037df63c06052",
    questionContent: "Rate your proficiency in Graphs",
    responses: ["Low", "Average", "High"],
    order: 17
  },
  {
    _id: "64f65ad63ee61f95a6159d1e",
    questionContent: "Rate your proficiency in Dynamic Programming",
    responses: ["Low", "Average", "High"],
    order: 18
  },

  ];

export async function seedQuestions() {
  await Question.deleteMany({});
  console.log("Old questions cleared");
  await Question.insertMany(questions);
  console.log("Question data seeding completed");
}
