making of problem scehma for leetcode 

dummy json data for adding the problem
{
  "title": "Add Two Numbers",
  "description": "Given two integers, return their sum.",
  "difficulty": "Easy",
  "tags": "Maths",
  "visibleTestCases": [
    {
      "input": "2 3",
      "output": "5",
      "explaination": "2 + 3 = 5"
    },
    {
      "input": "10 15",
      "output": "25",
      "explaination": "10 + 15 = 25"
    }
  ],
  "hiddenTestCases": [
    {
      "input": "-5 7",
      "output": "2"
    },
    {
      "input": "1000 2000",
      "output": "3000"
    }
  ],
  "boilerCode": [
    {
      "language": "C++",
      "code": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    // TODO: implement logic\n    return 0;\n}"
    },
    {
      "language": "Java",
      "code": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        // TODO: implement logic\n    }\n}"
    },
    {
      "language": "JavaScript",
      "code": "const readline = require('readline');\n\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout });\nlet input = [];\n\nrl.on('line', (line) => {\n  input.push(line);\n  if (input.length === 1) {\n    const [a, b] = input[0].split(' ').map(Number);\n    // TODO: implement logic\n    rl.close();\n  }\n});"
    }
  ],
  "refrenceSolution": [
    {
      "language": "C++",
      "completeCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << a + b << endl;\n    return 0;\n}"
    },
    {
      "language": "Java",
      "completeCode": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        System.out.println(a + b);\n    }\n}"
    },
    {
      "language": "JavaScript",
      "completeCode": "const readline = require('readline');\n\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout });\nlet input = [];\n\nrl.on('line', (line) => {\n  input.push(line);\n  if (input.length === 1) {\n    const [a, b] = input[0].split(' ').map(Number);\n    console.log(a + b);\n    rl.close();\n  }\n});"
    }
  ],
  "problemCreator": "652f0c9c8f1a2b001f9e8b91"
}
