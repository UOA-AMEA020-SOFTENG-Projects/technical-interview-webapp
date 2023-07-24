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
  {
    _id: "64b71662c5b9fafab1d170fe",
    title: "Daily Temperatures",
    topic: "64b0a79c4808f5b754ca2b19",
    description: "Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.",
    solution: "public int[] dailyTemperatures(int[] temperatures) {\n    // Initialize a stack to keep track of indices of temperatures\n    Stack<Integer> stack = new Stack<>();\n    // Initialize an array to store the result (number of days until a warmer temperature)\n    int[] ret = new int[temperatures.length];\n\n    // Iterate through the given temperatures\n    for(int i = 0; i < temperatures.length; i++) {\n        // While the stack is not empty and the current temperature is greater than the\n        // temperature at the index present at the top of the stack\n        while(!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {\n            // Pop the index from the stack as we've found a day with higher temperature\n            int idx = stack.pop();\n            // The number of days to wait for a warmer temperature is the difference \n            // between the current day and the day from the stack\n            ret[idx] = i - idx;\n        }\n        // Push the current day's index onto the stack\n        stack.push(i);\n    }\n    // The remaining indices in the stack represent days for which there is no warmer temperature in the future,\n    // so they are not popped out of the stack. Their corresponding positions in the result array will remain 0.\n\n    return ret;  // Return the result array\n}",
    exampleCase: "Input: temperatures = [30,60,90]\
    Output: [1,1,0]",
    modelDescription: "The solution uses a stack to track the indices of descending temperatures, popping an index when a higher temperature is found, and setting the corresponding result to the difference in indices, which represents the number of days until a warmer temperature.",
    hint: "Use a stack to keep track of the indices of the days.",
    boilerplateCode: [
      {
        language: "java",
        boilerplate: "import java.util.*;\n\npublic class Output {\n\tpublic int[] dailyTemperatures(int[] temperatures) {\n\t\t// to do: complete code\n\t}\n\n\tpublic static void main(String[] args) {\n\t\tScanner scanner = new Scanner(System.in);\n\n\t\tString input = scanner.nextLine();\n\t\tString[] numbers = input.substring(1, input.length()-1).split(\",\");\n\t\tint[] temperatures = new int[numbers.length];\n\n\t\tfor (int i = 0; i < numbers.length; i++) {\n\t\t\ttemperatures[i] = Integer.parseInt(numbers[i].trim());\n\t\t}\n\n\t\tOutput solution = new Output();\n\t\tint[] output = solution.dailyTemperatures(temperatures);\n\n\t\t// Print the output\n\t\tfor (int i = 0; i < output.length; i++) {\n\t\t\tSystem.out.print(output[i] + \" \");\n\t\t}\n\t}\n}",
      },
      {
        language: "python3",
        boilerplate: "class Output:\n    def dailyTemperatures(self, temperatures):\n        # Complete this code \n        pass\n\nif __name__ == \"__main__\":\n    input_string = input().strip()[1:-1]  # remove the square brackets\n    temperatures = list(map(int, input_string.split(',')))\n\n    solution = Output()\n    output = solution.dailyTemperatures(temperatures)\n\n    # Print the output\n    print(' '.join(map(str, output)))\n"
      },
      {
        language: "cpp",
        boilerplate: "#include <iostream>\n#include <vector>\n#include <stack>\n#include <sstream>\n\nclass Output {\npublic:\n    std::vector<int> dailyTemperatures(std::vector<int>& temperatures) {\n        // to do: complete this function\n    }\n};\n\nint main() {\n    std::string input;\n    std::getline(std::cin, input);\n    input = input.substr(1, input.size()-2);  // remove the square brackets\n\n    std::vector<int> temperatures;\n    std::stringstream ss(input);\n    for (int i; ss >> i;) {\n        temperatures.push_back(i);    \n        if (ss.peek() == ',')\n            ss.ignore();\n    }\n\n    Output solution;\n    std::vector<int> output = solution.dailyTemperatures(temperatures);\n\n    // Print the output\n    for(size_t i = 0; i < output.size(); i++) {\n        std::cout << output[i] << \" \";\n    }\n    \n    return 0;\n}\n"
      }
    ],
    testCases: [
      {
        input: "[73,74,75,71,69,72,76,73]",
        output: "1 1 4 2 1 1 0 0",
      },
      {
        input: "[30,40,50,60]",
        output: "1 1 1 0",
      },
      {
        input: "[30,60,90]",
        output: "1 1 0",
      },
    ],
    difficulty: "hard",
  },
  {
    _id: "64b7424aa9e904c794e46798",
    title: "Basic Binary Search",
    topic: "64b0a7a1664e6698b9720575",
    description: "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.\
    You must write an algorithm with O(log n) runtime complexity.",
    modelDescription: "This code uses a binary search algorithm to find a target value in a sorted integer array, returning the index of the target if found or -1 otherwise.",
    exampleCase: "Input: nums = [-1,0,3,5,9,12], target = 9\
    Output: 4\
    Explanation: 9 exists in nums and its index is 4",
    solution: "public class Solution {\n\n    public int search(int[] nums, int target) {\n        int left = 0; // initialize left pointer to 0\n        int right = nums.length - 1; // initialize right pointer to the last index of the array\n\n        while (left <= right) { // continue the loop till left pointer is less than or equal to right pointer\n            int mid = left + (right - left) / 2; // calculate the middle index of the array\n\n            if (nums[mid] == target) { // check if the middle element is equal to target\n                return mid; // return the middle index\n            } else if (nums[mid] < target) { // check if the middle element is less than target\n                left = mid + 1; // move the left pointer to the right of middle element\n            } else { // if the middle element is greater than target\n                right = mid - 1; // move the right pointer to the left of middle element\n            }\n        }\n\n        return -1; // target not found in the array\n    }\n\n}\n",
    hint: "Remember that there are no tricks here. Just a basic binary search implementaion.",
    boilerplateCode: [
      {
        language: "java",
        boilerplate: "import java.util.*;\n\npublic class Output {\n    public int search(int[] nums, int target) {\n        // To do: complete this function\n        return 1; // place holder return statement\n    }\n    \n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        String input = scanner.nextLine();\n\n        String[] parts = input.split(\", target = \");\n        String numsPart = parts[0].replace(\"nums = [\", \"\").replace(\"]\", \"\");\n        int[] nums = Arrays.stream(numsPart.split(\",\"))\n                           .map(String::trim)\n                           .mapToInt(Integer::parseInt)\n                           .toArray();\n\n        int target = Integer.parseInt(parts[1]);\n\n        Output output = new Output();\n        int result = output.search(nums, target);\n        \n        System.out.println(result);\n    }\n}",
      },
      {
        language: "python3",
        boilerplate: "class Output:\n    def search(self, nums, target):\n        # To do: complete this code\n        pass\n\nif __name__ == \"__main__\":\n    input_string = input()\n\n    parts = input_string.split(\", target = \")\n    nums_part = parts[0].replace(\"nums = [\", \"\").replace(\"]\", \"\")\n    nums = list(map(int, nums_part.split(\",\")))\n\n    target = int(parts[1])\n\n    output = Output()\n    result = output.search(nums, target)\n    \n    print(result)"
      },
      {
        language: "cpp",
        boilerplate: "#include <iostream>\n#include <vector>\n#include <sstream>\n#include <algorithm>\n\nclass Output {\npublic:\n    int search(std::vector<int>& nums, int target) {\n      // to do: complete this function \n      \n      return 1; // temp placeholder return statement\n    }\n};\n\nint main() {\n    std::string input;\n    std::getline(std::cin, input);\n    \n    std::size_t pos = input.find(\", target = \");\n    std::string numsPart = input.substr(0, pos); // \"nums = [-1,0,3,5,9,12]\"\n    std::string targetPart = input.substr(pos + 11); // \"9\"\n    \n    numsPart = numsPart.substr(8, numsPart.size() - 8); // remove \"nums = [\"\n    numsPart.pop_back(); // remove \"]\"\n    \n    std::vector<int> nums;\n    std::stringstream ss(numsPart);\n    for (int i; ss >> i;) {\n        nums.push_back(i);    \n        if (ss.peek() == ',')\n            ss.ignore();\n    }\n    \n    int target = std::stoi(targetPart); // directly convert targetPart to integer\n    \n    Output output;\n    int result = output.search(nums, target);\n    \n    std::cout << result << std::endl;\n    \n    return 0;\n}\n"
      }
    ],
    testCases: [
      {
        input: "nums = [-1,0,3,5,9,12], target = 9",
        output: "4",
      },
      {
        input: "nums = [-1,0,3,5,9,12], target = 2",
        output: "-1",
      },
    ],
    difficulty: "easy",
  },
  {
    _id: "64b7513e56a4d24f7eea88b8",
    title: "Koko Eating Bananas",
    topic: "64b0a7a1664e6698b9720575",
    description: "Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards have gone and will come back in h hours.\
    Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile of bananas and eats k bananas from that pile. If the pile has less than k bananas, she eats all of them instead and will not eat any more bananas during this hour.\
    Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.\
    Return the minimum integer k such that she can eat all the bananas within h hours.",
    modelDescription: "",
    exampleCase: "Input: piles = [3,6,7,11], h = 8\
    Output: 4",
    solution: "public class MinEatingSpeed {\n\n    public int minEatingSpeed(int[] piles, int H) {\n        // Initialize left boundary (l) and right boundary (r)\n        int l = 1, r = 1000000000;\n\n        // Perform binary search\n        while (l < r) {\n            // Compute the middle point to divide the search space\n            int m = (l + r) / 2, total = 0;\n\n            // Count the total hours to eat all bananas with speed m\n            for (int p : piles) {\n                total += (p + m - 1) / m; // This is equivalent to Math.ceil((double) p / m);\n            }\n\n            // If total hours is greater than H, we need a larger eating speed,\n            // hence we move the left boundary of the search space\n            if (total > H)\n                l = m + 1;\n            // If total hours is less or equal to H, we try to find a smaller valid eating speed\n            // hence we move the right boundary of the search space\n            else\n                r = m;\n        }\n\n        // After the binary search, l is the minimum eating speed required to eat all bananas within H hours\n        return l;\n    }\n}\n",
    hint: "Use binary search for this problem.",
    boilerplateCode: [
      {
        language: "java",
        boilerplate: "\nimport java.util.Arrays;\nimport java.util.Scanner;\n\npublic class Output {\n    public int minEatingSpeed(int[] piles, int H) {\n        // to do: complete this code\n    }\n\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n\n        String input = scanner.nextLine();\n        String[] parts = input.split(\", h = \");\n\n        String pilesPart = parts[0].replace(\"piles = [\", \"\").replace(\"]\", \"\");\n        int[] piles = Arrays.stream(pilesPart.split(\",\"))\n                .map(String::trim)\n                .mapToInt(Integer::parseInt)\n                .toArray();\n\n        int H = Integer.parseInt(parts[1]);\n\n        Output output = new Output();\n        int result = output.minEatingSpeed(piles, H);\n\n        System.out.println(result);\n    }\n}\n",
      },
      {
        language: "python3",
        boilerplate: "\nclass Output:\n    def minEatingSpeed(self, piles, H):\n        # to do: complete this code\n        pass\n\n\ndef main():\n    input_data = input()\n\n    parts = input_data.split(\", h = \")\n\n    piles_part = parts[0].replace(\"piles = [\", \"\").replace(\"]\", \"\")\n    piles = list(map(int, piles_part.split(\",\")))\n\n    H = int(parts[1])\n\n    output = Output()\n    result = output.minEatingSpeed(piles, H)\n\n    print(result)\n\n\nif __name__ == \"__main__\":\n    main()\n"
      },
      {
        language: "cpp",
        boilerplate: "\n#include <iostream>\n#include <sstream>\n#include <vector>\n#include <algorithm>\n\nint minEatingSpeed(std::vector<int>& piles, int H) {\n    // to do: complete this code\n    \n    // placeholder return statement\n    return 1;\n}\n\nint main() {\n    std::string input;\n    std::getline(std::cin, input);\n\n    size_t start = input.find('[') + 1;\n    size_t end = input.find(']');\n    std::string pilesPart = input.substr(start, end - start);\n\n    size_t found = input.find(\", h = \");\n    std::string HPart = input.substr(found + 6);\n\n    std::stringstream ss(pilesPart);\n    std::vector<int> piles;\n    for (int i; ss >> i;) {\n        piles.push_back(i);    \n        if (ss.peek() == ',')\n            ss.ignore();\n    }\n\n    int H = std::stoi(HPart);\n\n    int result = minEatingSpeed(piles, H);\n\n    std::cout << result << std::endl;\n\n    return 0;\n}\n"
      }
    ],
    testCases: [
      {
        input: "piles = [3,6,7,11], h = 8",
        output: "4",
      },
      {
        input: "piles = [30,11,23,4,20], h = 5",
        output: "30",
      },
      {
        input: "piles = [30,11,23,4,20], h = 6",
        output: "23",
      },
    ],
    difficulty: "medium",
  },
  {
    _id: "64bcf69e2f1ff54481e545ee",
    title: "Median of Two Sorted Arrays",
    topic: "64b0a7a1664e6698b9720575",
    description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
    modelDescription: "This code calculates the median of two sorted arrays by using a binary search method.",
    exampleCase: "Input: nums1 = [1,3], nums2 = [2]\
    Output: 2.00000\
    Explanation: merged array = [1,2,3] and median is 2.",
    solution: "public double findMedianSortedArrays(int[] A, int[] B) {\n    int m = A.length, n = B.length;\n    int l = (m + n + 1) / 2;\n    int r = (m + n + 2) / 2;\n    return (getkth(A, 0, B, 0, l) + getkth(A, 0, B, 0, r)) / 2.0;\n}\n\npublic double getkth(int[] A, int aStart, int[] B, int bStart, int k) {\n    if (aStart > A.length - 1) return B[bStart + k - 1];\n    if (bStart > B.length - 1) return A[aStart + k - 1];\n    if (k == 1) return Math.min(A[aStart], B[bStart]);\n    int aMid = Integer.MAX_VALUE, bMid = Integer.MAX_VALUE;\n    if (aStart + k/2 - 1 < A.length) aMid = A[aStart + k/2 - 1];\n    if (bStart + k/2 - 1 < B.length) bMid = B[bStart + k/2 - 1];\n    if (aMid < bMid) return getkth(A, aStart + k/2, B, bStart, k - k/2);\n    else return getkth(A, aStart, B, bStart + k/2, k - k/2);\n}",
    hint: "Ignore half part of A and B each step recursively by comparing the median of remaining A and B",
    boilerplateCode: [
      {
        language: "java",
        boilerplate: "import java.util.Scanner;\nimport java.util.Arrays;\n\npublic class Output {\n\n    public double findMedianSortedArrays(int[] A, int[] B) {\n        // complete this function\n\n        // placeholder return\n        return 1.0;\n    }\n\n\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        String input = scanner.nextLine();\n\n        String[] parts = input.split(\", \");\n\n        String[] nums1Parts = parts[0].split(\" = \");\n        String[] nums2Parts = parts[1].split(\" = \");\n\n        int[] nums1 = stringToArray(nums1Parts[1]);\n        int[] nums2 = stringToArray(nums2Parts[1]);\n\n        Output output = new Output();\n        double median = output.findMedianSortedArrays(nums1, nums2);\n        System.out.println(median);\n    }\n\n    private static int[] stringToArray(String str) {\n        str = str.replaceAll(\"\\\\[\", \"\").replaceAll(\"\\\\]\", \"\").replaceAll(\"\\\\s\", \"\");\n        String[] numsAsStr = str.split(\",\");\n        int[] nums = new int[numsAsStr.length];\n        for(int i = 0; i < numsAsStr.length; i++) {\n            nums[i] = Integer.parseInt(numsAsStr[i]);\n        }\n        return nums;\n    }\n}",
      },
      {
        language: "python3",
        boilerplate: "class Output:\n    def findMedianSortedArrays(self, A, B):\n        # complete this function \n        pass\n\n\ndef string_to_array(str):\n    str = str.replace('[', '').replace(']', '').replace(' ', '')\n    nums_as_str = str.split(',')\n    nums = [int(num) for num in nums_as_str]\n    return nums\n\n\nif __name__ == '__main__':\n    input_str = input()\n    parts = input_str.split(\", \")\n\n    nums1Parts = parts[0].split(\" = \")\n    nums2Parts = parts[1].split(\" = \")\n\n    nums1 = string_to_array(nums1Parts[1])\n    nums2 = string_to_array(nums2Parts[1])\n\n    output = Output()\n    median = output.findMedianSortedArrays(nums1, nums2)\n    print(median)\n"
      },
      {
        language: "cpp",
        boilerplate: "#include <iostream>\n#include <vector>\n#include <string>\n#include <sstream>\n#include <algorithm>\n#include <iterator>\n#include <climits>\n\nclass Output {\npublic:\n    double findMedianSortedArrays(std::vector<int>& A, std::vector<int>& B) {\n        // complete this code \n    }\n\n};\n\nstd::vector<int> string_to_array(std::string str) {\n    str.erase(std::remove(str.begin(), str.end(), '['), str.end());\n    str.erase(std::remove(str.begin(), str.end(), ']'), str.end());\n    str.erase(std::remove(str.begin(), str.end(), ' '), str.end());\n    \n    std::istringstream iss(str);\n    std::vector<int> nums;\n    int num;\n    while(iss >> num) {\n        nums.push_back(num);\n        if(iss.peek() == ',')\n            iss.ignore();\n    }\n    return nums;\n}\n\nint main() {\n    std::string input_str;\n    getline(std::cin, input_str);\n\n    std::size_t pos1 = input_str.find('=');\n    std::size_t pos2 = input_str.find('=', pos1 + 1);\n    std::string str1 = input_str.substr(pos1+2, pos2-pos1-3);\n    std::string str2 = input_str.substr(pos2+2);\n\n    std::vector<int> nums1 = string_to_array(str1);\n    std::vector<int> nums2 = string_to_array(str2);\n    \n    Output output;\n    double median = output.findMedianSortedArrays(nums1, nums2);\n    std::cout << median << std::endl;\n    \n    return 0;\n}\n"
      }
    ],
    testCases: [
      {
        input: "nums1 = [1,3], nums2 = [2]",
        output: "2.0",
      },
      {
        input: "nums1 = [1,2], nums2 = [3,4]",
        output: "2.5",
      },
    ],
    difficulty: "hard",
  },
];

export async function seedProblems() {
  await Problem.deleteMany({});
  console.log("Old problems cleared");
  await Problem.insertMany(problems);
  console.log("Problem data seeding completed");
}
