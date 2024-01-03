/*  Azalea Health
    Technical Interview
    Garrett Moore
    Jan 2, 2024 */

/*
Question 1:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Write a function that does the following:
Given an array of strings return an array with all of the duplicate strings removed.
Example: Given ['abc', 'ab', 'ab', 'cb', 'ab', 'abc'] return ['abc', 'ab', 'cb']
*/

function dedupe(array) {
    let originals = []
    for (i=0; i<array.length; i++){
        if (!originals.includes(array[i])){
            originals.push(array[i])
        }
    }
    return originals
}

let items = ['abc', 'ab', 'ab', 'cb', 'ab', 'abc'];

let result = dedupe(items);
console.log("Question 1: " + result);

/*
Question 2:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Modify the function so that the results are ordered by how many duplicates were found in the array, in descending order.
You may use built in sorting functions.
Example: Given ['abc', 'ab', 'ab', 'cb', 'ab', 'abc'] return ['ab', 'abc', 'cb']
*/

function orderdupes(array) {
    let originalsMap = new Map()
    for (i=0; i<array.length; i++){
        //check if string is new
        if (!originalsMap.has(array[i])){
            //if so, add to orignals with 1 instance
            originalsMap.set(array[i], 1)
        }
        else{
            //if not new, increase the number of occurences by 1
            originalsMap.set(array[i], originalsMap.get(array[i]) + 1)
        }
    }
    map1 = new Map([...originalsMap.entries()].sort(function(a, b){return a[1]-b[1]}).reverse());
    return [...map1.keys()]
}

let result2 = orderdupes(items);
console.log("\nQuestion 2: " + result2);

/*
Question 3:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Given an array of strings, write a function to determine the validity of each string based on the following:
-Valid strings contain valid pairs of digits within them
-A pair are two digits within a string that sum to 10
-A digit may be part of multiple pairs, so long as each pair sums to 10
-Valid pairs contain exactly 3 ?'s between each digit in the pair
-Strings with invalid pairs are invalid strings

Validated strings should return true and invalid strings should return false
*/

let tests = [
	"arrb6???4xxbl5???eee5",        //TRUE
	"acc?7??sss?3rr1??????5",       //TRUE
	"5??aaaaaaaaaaaaaaaaaaa?5?5",   //FALSE
	"9???1???9???1???9",            //FALSE
	"aa6?9",                        //FALSE
	"7???3??7???1???9",             //FALSE
	"2?3??88???1",                  //TRUE
	"2?3??8?8???1"                  //FALSE
];

function isPair(digitA, digitB) {
    //Overly-simple function to make for better readability 
    return digitA[0] + digitB[0] === 10
}

function isValidPair(str, digitA, digitB){
    //slicing the string for the characters between the indexes of each digit
    let str_slice = str.slice(digitA[1], digitB[1]+1);
    let mark_counter = 0;
    for (let i=0; i < str_slice.length; i++) {
        if (str_slice[i] == '?') 
            mark_counter += 1;
    }
    //checking for exactly 3 question marks within the slice
    return mark_counter === 3;
}

function testString(str) {
    //digits are stored as arrays of the form [digit, index] within digits_arr
    var digits_arr = []    
    for (i=0; i<str.length; i++) {
        //if char is a digit, push digit and index to digits_arr 
        let digit = parseInt(str[i]);
        if (!isNaN(digit)) 
            digits_arr.push([digit, i]);
    }
    //for each digit in the digits_arr multidimensional array, 
    //determine pairing capability with the digits that proceeds it
    for (let i=0; i < digits_arr.length; i++){
        let digit = digits_arr[i];
        for (let j=i+1; j < digits_arr.length; j++){
            let newdigit = digits_arr[j]
            //checking string slice between the indexes of both digits
            //if digits constitute a pair but is not valid, string is rejected
            if (isPair(digit, newdigit) && !isValidPair(str, digit, newdigit))
                return false
        }
    }
    //returns true if all pairs are valid
    return digits_arr.length > 0;        
}

console.log("\nQuestion 3: ");
for (let i = 0; i < tests.length; i++){
    console.log(tests[i] + " -> " + testString(tests[i]));
}