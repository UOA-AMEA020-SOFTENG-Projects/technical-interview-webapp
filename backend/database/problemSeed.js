import mongoose from "mongoose";
import Problem from "../models/problem.js";

export const problems = [
  {
    _id: "64b0a57d75537b0ab942edfd",
    title: "Contains Duplicate",
    topic: "64b0a79871ac5ad2b373f4a5",
    description:
      "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
    modelDescription:
      "Checks whether an array contains any duplicate elements. It utilizes a HashSet data structure to efficiently store and check for uniqueness of elements.",
    exampleCase: "Example input: nums = [1, 2, 3, 1]. Output: true.",
    solution: "import java.util.HashSet;\n\npublic class Solution {\n    public boolean containsDuplicate(int[] nums) {\n        // If the input array is null or empty, return false since there can be no duplicates\n        if (nums == null || nums.length == 0)\n            return false;\n        \n        // Create a new HashSet. HashSet stores unique elements, and its add method returns false if the element was already in the set.\n        HashSet<Integer> set = new HashSet<Integer>();\n        \n        // Loop through the array\n        for (int i: nums) {\n            // Attempt to add each element in the array to the set\n            if (!set.add(i)) {\n                // If the add method returns false, it means the element was already in the set and hence, is a duplicate.\n                return true;\n            }\n        }\n        \n        // If we've gone through the whole array and found no duplicates, return false.\n        return false;\n    }\n}",
    hint: "Try using a hash map.",
    boilerplateCode: [
      {
        language: "java",
        boilerplate: "import java.util.*;\n\npublic class Output {\n    public boolean containsDuplicate(int[] nums) {\n        // Write your code here\n        \n    }\n\n    public static void main(String[] args) {\n        Output solution = new Output();\n        Scanner scanner = new Scanner(System.in);\n\n        // Read the elements of the array\n        String[] numbers = scanner.nextLine().split(\" \");\n        int[] nums = new int[numbers.length];\n\n        // Convert the input strings to integers\n        for (int i = 0; i < numbers.length; i++) {\n            nums[i] = Integer.parseInt(numbers[i]);\n        }\n\n        // Check if the array contains duplicates\n        boolean result = solution.containsDuplicate(nums);\n        System.out.println(result);\n        \n        scanner.close();\n    }\n}",
      },
      {
        language: "python3",
        boilerplate: "def contains_duplicate(nums):\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    nums = list(map(int, input().split()))\n    result = contains_duplicate(nums)\n    print(str(result).lower())"
      },
      {
        language: "cpp",
        boilerplate: "\n#include <iostream>\n#include <sstream>\n#include <set>\n#include <vector>\n\nbool contains_duplicate(std::vector<int>& nums) {\n\t// Complete this code\n}\n\nint main() {\n\tstd::string line;\n\tgetline(std::cin, line);\n\tstd::istringstream stream(line);\n\tstd::vector<int> nums;\n\tint num;\n\twhile(stream >> num) {\n\t\tnums.push_back(num);\n\t}\n\tbool result = contains_duplicate(nums);\n\tstd::cout << std::boolalpha << result << std::endl;\n\treturn 0;\n}\n"
      }
    ],
    testCases: [
      {
        input: "1 2 3 1",
        output: "true",
      },
      {
        input: "1 2 3 4",
        output: "false",
      },
      {
        input: "1 1 1 3 3 4 3 2 4 2",
        output: "true",
      },
    ],
    difficulty: "easy",
  },
  {
    _id: "64b1d32abe0653857df5bfc4",
    title: "Two Sum",
    topic: "64b0a79871ac5ad2b373f4a5",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\
    You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    modelDescription: "Use a hash table. We can iterate through the array once, and for each element, check if the target minus the current element exists in the hash table.",
    exampleCase: "Input: nums = [2,7,11,15], target = 9\
    Output: [0,1]",
    solution: "\npublic int[] twoSum(int[] nums, int target) {\n\tMap<Integer, Integer> numMap = new HashMap<>();\n\tint n = nums.length;\n\n\tfor (int i = 0; i < n; i++) {\n\t\tint complement = target - nums[i];\n\t\tif (numMap.containsKey(complement)) {\n\t\t\treturn new int[] {numMap.get(complement), i};\n\t\t}\n\t\tnumMap.put(nums[i], i);\n\t}\n\n\treturn new int[] {}; // No solution found\n}\n",
    hint: "Try using a hash map.",
    boilerplateCode: [
      {
        language: "java",
        boilerplate: "\nimport java.util.*;\n\npublic class Output {\n\tpublic int[] twoSum(int[] nums, int target) {\n\t\t// Complete the code\n\t}\n\n\tpublic static void main(String[] args) {\n\t\tScanner scanner = new Scanner(System.in);\n\n\t\tString input = scanner.nextLine();\n\t\t\n\t\tString[] splitInput = input.split(\", target = \");\n\t\tint target = Integer.parseInt(splitInput[1]);\n\n\t\tString numStr = splitInput[0].substring(7, splitInput[0].length() - 1).replace(\"[\", \"\").replace(\"]\", \"\");\n\t\tString[] numStrArr = numStr.split(\",\");\n\t\tint[] nums = new int[numStrArr.length];\n\n\t\tfor(int i = 0; i < numStrArr.length; i++){\n\t\t\tnums[i] = Integer.parseInt(numStrArr[i].trim());\n\t\t}\n\t\t\n\t\tOutput output = new Output();\n\t\tint[] result = output.twoSum(nums, target);\n\t\t\n\t\tSystem.out.println(Arrays.toString(result));\n\t}\n}\n",
      },
      {
        language: "python3",
        boilerplate: "\ndef two_sum(nums, target):\n    # Complete the code\n    pass\n\nif __name__ == '__main__':\n    input_str = input()\n\n    split_input = input_str.split(', target = ')\n    target = int(split_input[1])\n\n    num_str = split_input[0][7:-1].replace('[', '').replace(']', '')\n    num_str_arr = num_str.split(',')\n    nums = [int(num.strip()) for num in num_str_arr]\n\n    result = two_sum(nums, target)\n\n    print(result)\n"
      },
      {
        language: "cpp",
        boilerplate: "#include <iostream>\n#include <sstream>\n#include <vector>\n#include <map>\n\nstd::vector<int> two_sum(std::vector<int>& nums, int target) {\n    // Complete the code\n    return {};\n}\n\nint main() {\n    std::string input_str;\n    getline(std::cin, input_str);\n\n    size_t split_pos = input_str.find(\", target = \");\n    int target = std::stoi(input_str.substr(split_pos + 11));\n\n    std::string num_str = input_str.substr(7, split_pos - 8);\n    std::istringstream num_stream(num_str);\n    std::vector<int> nums;\n    int num;\n\n    while(num_stream >> num) {\n        char comma;\n        num_stream >> comma;\n        nums.push_back(num);\n    }\n\n    std::vector<int> result = two_sum(nums, target);\n\n    if (!result.empty()) {\n        std::cout << \"[\" << result[0] << \", \" << result[1] << \"]\";\n    }\n\n    return 0;\n}\n"
      }
    ],
    testCases: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0, 1]",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1, 2]",
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0, 1]",
      },
    ],
    difficulty: "medium",
  },
  {
    _id: "64b1f070e2dabccf25d42671",
    title: "Group Anagrams",
    topic: "64b0a79871ac5ad2b373f4a5",
    description: "Given an array of strings strs, group the anagrams together. You can return the answer in any order.\
    An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
    modelDescription: "This solution categorizes anagrams by sorting individual strings into a standardized form, using these as keys in a hashmap that maps to vectors, thereby grouping all anagrams together, and finally returns these grouped anagrams as the result.",
	  exampleCase: "Input: strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]\
    Output: [[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]",
    solution: "import java.util.*;\n\npublic class GroupAnagrams {\n\n    public List<List<String>> groupAnagrams(String[] strs) {\n        // Create a HashMap to store sorted word as key and its anagrams as values\n        Map<String, List<String>> map = new HashMap<>();\n\n        // Iterate over each word in the given string array\n        for (String word : strs) {\n            // Convert the word to char array\n            char[] chars = word.toCharArray();\n\n            // Sort the chars in the array\n            // Anagrams, when sorted, will always end up as the same string\n            Arrays.sort(chars);\n\n            // Convert sorted chars back to string\n            String sortedWord = new String(chars);\n\n            // If the sorted word is not already in the map, add it with an empty ArrayList as value\n            if (!map.containsKey(sortedWord)) {\n                map.put(sortedWord, new ArrayList<>());\n            }\n\n            // Add the original word (anagram) to the list of the sortedWord in the map\n            map.get(sortedWord).add(word);\n        }\n\n        // Convert the values of the map to a list, as they represent the grouped anagrams\n        return new ArrayList<>(map.values());\n    }\n}",
    hint: "Use a HashMap",
    boilerplateCode: [
      {
        language: "java",
        boilerplate: "import java.util.*;\n\npublic class Output {\n  public List < List < String >> groupAnagrams(String[] strs) {\n    // Complete the code\n    return null;\n  }\n\n  public static void main(String[] args) {\n    Scanner scanner = new Scanner(System.in);\n    String input = scanner.nextLine().replaceAll(\"\\\\[\", \"\").replaceAll(\"\\\\]\", \"\");\n\n    String[] strs = input.split(\",\\\\s*\");\n\n    Output output = new Output();\n    List < List < String >> result = output.groupAnagrams(strs);\n\n    // Sort each group in alphabetical order\n    for (List < String > group: result) {\n      Collections.sort(group);\n    }\n\n    // Sort all the groups from smallest size to largest\n    result.sort(Comparator.comparing(List::size));\n\n    for (List < String > group: result) {\n      System.out.print(group);\n    }\n  }\n}",
      },
      {
        language: "python3",
        boilerplate: "import re\nfrom typing import List\nfrom collections import defaultdict\n\nclass Output:\n    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:\n        # Complete the code here\n        pass\n\nif __name__ == \"__main__\":\n    input_str = input().replace(\"[\", \"\").replace(\"]\", \"\")\n    strs = re.split(\",\\s*\", input_str)\n    # Removing extra quotes around words if any\n    strs = [word.replace('\"', '') for word in strs]\n\n    output = Output()\n    result = output.groupAnagrams(strs)\n\n    # Sort each group in alphabetical order\n    for group in result:\n        group.sort()\n\n    # Sort all the groups from smallest size to largest\n    result.sort(key=len)\n\n    for group in result:\n        formatted_group = '[\"' + '\", \"'.join(word for word in group) + '\"]'\n        print(formatted_group, end='')"
      },
      {
        language: "cpp",
        boilerplate: "\n#include <iostream>\n#include <vector>\n#include <string>\n#include <map>\n#include <algorithm>\n#include <sstream>\n\nclass Output {\npublic:\n    std::vector<std::vector<std::string>> groupAnagrams(std::vector<std::string>& strs) {\n        std::map<std::string, std::vector<std::string>> map;\n\n        for (const auto& word : strs) {\n            std::string sortedWord = word;\n            std::sort(sortedWord.begin(), sortedWord.end());\n\n            if (map.find(sortedWord) == map.end()) {\n                map[sortedWord] = std::vector<std::string>();\n            }\n\n            map[sortedWord].push_back(word);\n        }\n\n        std::vector<std::vector<std::string>> result;\n        for (auto& keyVal : map) {\n            result.push_back(keyVal.second);\n        }\n\n        return result;\n    }\n};\n\nint main() {\n    std::string input;\n    getline(std::cin, input);\n    input.erase(remove(input.begin(), input.end(), '['), input.end());\n    input.erase(remove(input.begin(), input.end(), ']'), input.end());\n\n    std::istringstream ss(input);\n    std::string word;\n    std::vector<std::string> strs;\n\n    while (getline(ss, word, ','))\n    {\n        word.erase(remove(word.begin(), word.end(), ' '), word.end());\n        strs.push_back(word);\n    }\n\n    Output output;\n    auto result = output.groupAnagrams(strs);\n\n    for (auto& group : result) {\n        std::sort(group.begin(), group.end());\n    }\n\n    std::sort(result.begin(), result.end(), [](const std::vector<std::string>& a, const std::vector<std::string>& b){\n        return a.size() < b.size();\n    });\n\n    for (auto& group : result) {\n        std::cout << \"[\";\n        for (size_t i = 0; i < group.size(); ++i) {\n            std::cout << group[i];\n            if (i != group.size() - 1) {\n                std::cout << \", \";\n            }\n        }\n        std::cout << \"]\";\n    }\n\n    return 0;\n}\n"
      }
    ],
    testCases: [
      {
        input: "[\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]",
        output: "[\"bat\"][\"nat\", \"tan\"][\"ate\", \"eat\", \"tea\"]",
      },
      {
        input: "[\"\"]",
        output: "[\"\"]",
      },
      {
        input: "[\"a\"]",
        output: "[\"a\"]",
      },
    ],
    difficulty: "hard",
  },
    {
    _id: "64b39ed613688bcd23cede06",
    title: "Valid Parentheses",
    topic: "64b0a79c4808f5b754ca2b19",
    description: "Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.\
    An input string is valid if:\
    Open brackets must be closed by the same type of brackets.\
    Open brackets must be closed in the correct order.\
    Every close bracket has a corresponding open bracket of the same type.",
    modelDescription: "This solution validates parentheses matching in a string by using a stack to track and match opening parentheses with their corresponding closing parentheses.",
    exampleCase: "Input: s = \"()\"\
    Output: true",
	  solution: "\n// method to check if the string of parentheses is valid\npublic boolean isValid(String s) {\n    // create a stack to store opening parentheses\n    Stack<Character> stack = new Stack<>();\n    \n    // iterate over each character in the string\n    for (char c : s.toCharArray()) {\n        // if the character is an opening parenthesis, push it onto the stack\n        if (c == '(' || c == '{' || c == '[') {\n            stack.push(c);\n        } else {\n            // if the stack is empty, then there's no opening parenthesis for the closing one; return false\n            if (stack.empty()) {\n                return false;\n            }\n            // if the character is a closing parenthesis and it matches the top of the stack (opening one), pop it from the stack\n            if (c == ')' && stack.peek() == '(') {\n                stack.pop();\n            } else if (c == '}' && stack.peek() == '{') {\n                stack.pop();\n            } else if (c == ']' && stack.peek() == '[') {\n                stack.pop();\n            } else {\n                // if the character is a closing parenthesis but it doesn't match the top of the stack, return false\n                return false;\n            }\n        }\n    }\n    // if the stack is empty after the loop, all opening parentheses had their matching closing ones; return true\n    return stack.empty();\n}",
    hint: "Parentheses must be mathced in the correct order - each closing parentheses must match the most recently opened opening parantheses.",
    boilerplateCode: [
      {
        language: "java",
        boilerplate: "\nimport java.util.*;\n\npublic class Output {\n    public boolean isValid(String s) {\n        // Complete the code here\n        return true; // placeholder return statement\n    }\n    \n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n\n        String input = scanner.nextLine();\n\n        Output checker = new Output();\n        boolean isValid = checker.isValid(input);\n\n        System.out.println(isValid);\n    }\n}",
      },
      {
        language: "python3",
        boilerplate: "\nclass Output:\n    def isValid(self, s: str) -> bool:\n        # Complete this code\n        return True\n\nif __name__ == '__main__':\n    input_string = input()\n\n    checker = Output()\n    is_valid = checker.isValid(input_string)\n\n    print(str(is_valid).lower())"
      },
      {
        language: "cpp",
        boilerplate: "\n#include <iostream>\n#include <string>\n#include <stack>\n\nusing namespace std;\n\nclass Output {\npublic:\n    bool isValid(string s) {\n        // Complete this code\n        return true;\n    }\n};\n\nint main() {\n    string input_string;\n    getline(cin, input_string);\n\n    Output checker;\n    bool is_valid = checker.isValid(input_string);\n\n    cout << boolalpha << is_valid << endl;\n\n    return 0;\n}"
      }
    ],
    testCases: [
      {
        input: "()",
        output: "true",
      },
      {
        input: "()[]{}",
        output: "true",
      },
      {
        input: "(]",
        output: "false",
      },
    ],
    difficulty: "easy",
  },
  {
    _id: "64b4bcf4d7055950382648ea",
    title: "Generate Parentheses",
    topic: "64b0a79c4808f5b754ca2b19",
    description: "Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.",
    modelDescription: "The solution generates all well-formed parentheses combinations by initiating a recursive function that tracks and matches opening and closing brackets, until the required length is reached.",
    exampleCase: "Input: n = 1\
    Output: [\"()\"]",
    solution: "import java.util.List;\nimport java.util.ArrayList;\n\npublic class GenerateParentheses {\n\n    public List<String> generateParenthesis(int n) {\n        List<String> result = new ArrayList<>();\n        generateParentheses(result, \"\", 0, 0, n);\n        return result;\n    }\n\n    private void generateParentheses(List<String> result, String current, int open, int close, int n) {\n        if (current.length() == 2 * n) {\n            result.add(current);\n            return;\n        }\n        if (open < n) {\n            generateParentheses(result, current + '(', open + 1, close, n);\n        }\n        if (close < open) {\n            generateParentheses(result, current + ')', open, close + 1, n);\n        }\n    }\n}\n",
    hint: "Consider the problem in terms of recursion, where you make progress by solving smaller versions of the original problem.",
    boilerplateCode: [
      {
        language: "java",
        boilerplate: "import java.util.*;\n\npublic class Output {\n\n    public List<String> generateParenthesis(int n) {\n      // complete this code\n    }\n\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        int input = scanner.nextInt();\n        \n        Output generator = new Output();\n        List<String> result = generator.generateParenthesis(input);\n\n        System.out.println(result);\n    }\n}\n",
      },
      {
        language: "python3",
        boilerplate: "\nimport ast\nfrom typing import List\n\nclass Output:\n    def generateParenthesis(self, n):\n        # Complete this code\n        pass\n\nif __name__ == \"__main__\":\n    n = int(input())\n    output = Output()\n    result = output.generateParenthesis(n)\n    result = [ast.literal_eval(\"'{}'\".format(i)) for i in result]\n    print(str(result).replace(\"'\", \"\"))\n"
      },
      {
        language: "cpp",
        boilerplate: "#include <iostream>\n#include <vector>\n#include <string>\n\nclass Output {\npublic:\n    std::vector<std::string> generateParenthesis(int n) {\n        // complete the code\n    }\n};\n\nint main() {\n    int n;\n    std::cin >> n;\n    Output output;\n    std::vector<std::string> result = output.generateParenthesis(n);\n\n    std::cout << \"[\";\n    for (size_t i = 0; i < result.size(); ++i) {\n        std::cout << result[i];\n        if (i < result.size() - 1) {\n            std::cout << \", \";\n        }\n    }\n    std::cout << \"]\" << std::endl;\n\n    return 0;\n}"
      }
    ],
    testCases: [
      {
        input: "3",
        output: "[((())), (()()), (())(), ()(()), ()()()]",
      },
      {
        input: "1",
        output: "[()]",
      },
    ],
    difficulty: "medium",
  },
];

export async function seedProblems() {
  await Problem.deleteMany({});
  console.log("Old problems cleared");
  await Problem.insertMany(problems);
  console.log("Problem data seeding completed");
}
