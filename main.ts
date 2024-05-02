
import inquirer from "inquirer";
import chalk from "chalk";

// Math.floor = Roundoff
const randomNumber: number = Math.floor(10000 + Math.random() * 90000);
let myBalance: number = 0;

const answer = await inquirer.prompt(
[
    {
        name: "student",
        type: "input",
        message: chalk.blueBright.bold("Enter Student name:"),
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return chalk.green.bold("Please enter a non-empty value");
        }
    },
    {
        name: "courses",
        type: "list",
        message: chalk.yellowBright.bold("Select the course to enroll"),
        choices: ["MS.Office", "HTML", "Javascript", "Typescript", "Python"]
    }
]);

const tuitionFees: { [key: string]: number } = {
    "MS.Office": 3000,
    "HTML": 2500,
    "Javascript": 6000,
    "Typescript": 7000,
    "Python": 8000
};

console.log(chalk.blue.bold(`\nTuition fee: ${tuitionFees[answer.courses]} \n`));
console.log(chalk.blue.bold(`Balance: ${myBalance}\n`));

const paymentType = await inquirer.prompt(
[
    {
        name: "payment",
        type: "list",
        message: chalk.yellowBright.bold("Select payment method"),
        choices: ["Cash","Bank Transfer", "Easypaisa", "Jazzcash","Credit Card"]
    },
    {
        name: "amount",
        type: "input",
        message:chalk.greenBright.bold("Please transfer money:"),
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return chalk.redBright.bold("Please enter a non-empty value");
        }
    }
])

console.log(chalk.yellowBright.bold(`\nYou selected payment method: ${paymentType.payment}\n`));

const tuitionFee = tuitionFees[answer.courses];
const paymentAmount = parseFloat(paymentType.amount);

if (paymentAmount >= tuitionFee) {
    console.log(chalk.green.bold(`\nCongratulations! You have successfully enrolled in ${answer.courses}.\n`));

    let ans = await inquirer.prompt(
[ 
    {
        name: "select",
        type: "list",
        message: chalk.blueBright.bold("What would you like to do next"),
        choices: ["View Status", "Exit"]
    }
]
);
    if (ans.select === "View Status") {
        console.log(chalk.blueBright.bold("\n********Status******\n"));
        console.log(chalk.blueBright.bold(`Student Name: ${answer.student}`));
        console.log(chalk.blueBright.bold(`Student ID: ${randomNumber}`));
        console.log(chalk.blueBright.bold(`Course: ${answer.courses}`));
        console.log(chalk.blueBright.bold(`Tuition Fee Paid: ${paymentAmount}`));
        console.log(chalk.blueBright.bold(`Balance: ${myBalance}`));
    }  else{
           console.log(chalk.bgGray.bold("\nExiting Student Mangment System\n"))
    }
}else {
        console.log(chalk.redBright.bold("Sorry Insufficient payment amount."))
    }