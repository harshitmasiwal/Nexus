{
    "data": "error : problem validation failed: visibleTestCases.0.explaination: Path `explaination` is required., visibleTestCases.1.explaination: Path `explaination` is required.",
    "status": 200,
    "statusText": "OK",
    "headers": {
        "content-length": "167",
        "content-type": "text/html; charset=utf-8"
    },
    "config": {
        "transitional": {
            "silentJSONParsing": true,
            "forcedJSONParsing": true,
            "clarifyTimeoutError": false
        },
        "adapter": [
            "xhr",
            "http",
            "fetch"
        ],
        "transformRequest": [
            null
        ],
        "transformResponse": [
            null
        ],
        "timeout": 0,
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN",
        "maxContentLength": -1,
        "maxBodyLength": -1,
        "env": {},
        "headers": {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json"
        },
        "baseURL": "http://localhost:4000",
        "withCredentials": true,
        "method": "post",
        "url": "/problem/create",
        "data": "{\"title\":\"Two Sum\",\"description\":\"Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\\nYou can return the answer in any order.\",\"difficulty\":\"Easy\",\"tags\":\"Array\",\"visibleTestCases\":[{\"input\":\"4 2 7 11 15 9\",\"output\":\"0 1\",\"explanation\":\"Explanation: nums[0] + nums[1] = 2 + 7 = 9\"},{\"input\":\"3 3 2 4 6\",\"output\":\"1 2\",\"explanation\":\"Explanation: nums[1] + nums[2] = 2 + 4 = 6\"}],\"hiddenTestCases\":[{\"input\":\"5 1 2 3 4 5 10\",\"output\":\"4 5\"},{\"input\":\"6 3 3 5 7 2 8 10\",\"output\":\"2 5\"}],\"boilerCode\":[{\"language\":\"C++\",\"code\":\"#include <bits/stdc++.h>\\r\\nusing namespace std;\\r\\nvector<int> twoSum(vector<int>& nums, int target) {\\r\\n    // TODO: implement logic\\r\\n    return vector<int>{};\\r\\n}\\r\\nint main() {\\r\\n    int n, target;\\r\\n    cin >> n;\\r\\n    vector<int> nums(n);\\r\\n    for (int i = 0; i < n; i++) cin >> nums[i];\\r\\n    cin >> target;\\r\\n    vector<int> res = twoSum(nums, target);\\r\\n    for (int x : res) cout << x << \\\" \\\";\\r\\n    cout << endl;\\r\\n    return 0;\\r\\n}\\r\\n\"},{\"language\":\"Java\",\"code\":\"import java.util.*;\\r\\npublic class Main {\\r\\n    public static int[] twoSum(int[] nums, int target) {\\r\\n        // TODO: implement logic\\r\\n        return new int[]{};\\r\\n    }\\r\\n    public static void main(String[] args) {\\r\\n        Scanner sc = new Scanner(System.in);\\r\\n        int n = sc.nextInt();\\r\\n        int[] nums = new int[n];\\r\\n        for(int i=0;i<n;i++) nums[i] = sc.nextInt();\\r\\n        int target = sc.nextInt();\\r\\n        int[] res = twoSum(nums, target);\\r\\n        for(int x : res) System.out.print(x + \\\" \\\");\\r\\n        System.out.println();\\r\\n    }\\r\\n}\\r\\n\"},{\"language\":\"Javascript\",\"code\":\"const readline = require('readline');\\r\\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout });\\r\\nrl.on('line', line => {\\r\\n    const inputs = line.trim().split(' ').map(Number);\\r\\n    // TODO: implement logic\\r\\n    rl.close();\\r\\n});\\r\\n\"}],\"referenceSolution\":[{\"language\":\"C++\",\"completeCode\":\"#include <bits/stdc++.h>\\r\\nusing namespace std;\\r\\nvector<int> twoSum(vector<int>& nums, int target) {\\r\\n    unordered_map<int,int> mp;\\r\\n    for(int i=0;i<nums.size();i++) {\\r\\n        int comp = target - nums[i];\\r\\n        if(mp.count(comp)) return {mp[comp], i};\\r\\n        mp[nums[i]] = i;\\r\\n    }\\r\\n    return {};\\r\\n}\\r\\nint main() {\\r\\n    int n, target;\\r\\n    cin >> n;\\r\\n    vector<int> nums(n);\\r\\n    for (int i = 0; i < n; i++) cin >> nums[i];\\r\\n    cin >> target;\\r\\n    vector<int> res = twoSum(nums, target);\\r\\n    for (int x : res) cout << x << \\\" \\\";\\r\\n    cout << endl;\\r\\n    return 0;\\r\\n}\\r\\n\"},{\"language\":\"Java\",\"completeCode\":\"import java.util.*;\\r\\npublic class Main {\\r\\n    public static int[] twoSum(int[] nums, int target) {\\r\\n        Map<Integer,Integer> map = new HashMap<>();\\r\\n        for(int i=0;i<nums.length;i++) {\\r\\n            int comp = target - nums[i];\\r\\n            if(map.containsKey(comp)) return new int[]{map.get(comp), i};\\r\\n            map.put(nums[i], i);\\r\\n        }\\r\\n        return new int[]{};\\r\\n    }\\r\\n    public static void main(String[] args) {\\r\\n        Scanner sc = new Scanner(System.in);\\r\\n        int n = sc.nextInt();\\r\\n        int[] nums = new int[n];\\r\\n        for(int i=0;i<n;i++) nums[i] = sc.nextInt();\\r\\n        int target = sc.nextInt();\\r\\n        int[] res = twoSum(nums, target);\\r\\n        for(int x : res) System.out.print(x + \\\" \\\");\\r\\n        System.out.println();\\r\\n    }\\r\\n}\\r\\n\"},{\"language\":\"Javascript\",\"completeCode\":\"const readline = require('readline');\\r\\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout });\\r\\nlet lines = [];\\r\\nrl.on('line', line => {\\r\\n    lines.push(...line.trim().split(' ').map(Number));\\r\\n    const n = lines[0];\\r\\n    const nums = lines.slice(1, n+1);\\r\\n    const target = lines[n+1];\\r\\n    const map = new Map();\\r\\n    let res = [];\\r\\n    for(let i=0;i<nums.length;i++) {\\r\\n        const comp = target - nums[i];\\r\\n        if(map.has(comp)) { res = [map.get(comp), i]; break; }\\r\\n        map.set(nums[i], i);\\r\\n    }\\r\\n    console.log(res.join(' '));\\r\\n    rl.close();\\r\\n});\\r\\n\"}]}",
        "allowAbsoluteUrls": true
    },
    "request": {}
}