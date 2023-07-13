import mongoose from "mongoose";
import Topic from "../models/topic.js";

export const topics = [
    {
      title: "Arrays",
      content: "64af63f3c50d319acd12e5bd", // ID of Content
      problems: [],
      length: "short",
      difficulty: "easy",
    },
    {
      title: "Stack",
      content: "64af69fde7b8e3839c5db07d", // ID of a Content
      problems: [],
      length: "short",
      difficulty: "easy",
    },
    {
      title: "Binary Search",
      content: "64af6b3a1dbd1835d54ade22", // ID of a Content
      problems: [],
      length: "short",
      difficulty: "medium",
    },
    {
      title: "Linked List",
      content: "64af740f8cb835b6e53616d0", // ID of a Content
      problems: [],
      length: "short",
      difficulty: "medium",
    },
    {
      title: "Trees",
      content: "64b06ad156a41ebc96130c62", // ID of a Content
      problems: [],
      length: "medium",
      difficulty: "medium",
    },
    {
      title: "Heap",
      content: "64b06c391035f07b0f5f65f8", // ID of a Content
      problems: [],
      length: "medium",
      difficulty: "medium",
    },
    {
      title: "Graphs",
      content: "64b06fc8864d3dce86f3a3e7", // ID of a Content
      problems: [],
      length: "long",
      difficulty: "hard",
    },
    {
      title: "Dynamic Programming",
      content: "64b070dc699bd986d145a182", // ID of a Content
      problems: [],
      length: "long",
      difficulty: "hard",
    },
  ];

export async function seedTopics() {
  await Topic.deleteMany({});
  console.log("Old topics cleared");
  await Topic.insertMany(topics);
  console.log("Topic data seeding completed");
}
