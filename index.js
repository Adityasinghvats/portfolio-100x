#!/usr/bin/env node
import chalk from "chalk";
import inquirer from 'inquirer';
import gradient from "gradient-string";
import chalkAnimation from 'chalk-animation';
import figlet from "figlet";
import { createSpinner } from "nanospinner";
import util from "util";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
const figletPromise = util.promisify(figlet);

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        "Welcome to my portfolio, Nice meeting you !!"
    );
    await sleep();
    rainbowTitle.stop();
    console.log(
        `Hi, I am ${chalk.cyan.bold(" Aditya Singh.")}
    I am a Software Engineer and builder with multiple interests.
    I like to code out my ideas but sometimes they may be ${chalk.redBright("deadly.")}
    So go ahead with utmost caution.
    ${chalk.greenBright('Would you like to see some of my projects? 😉 ')}
    ${chalk.yellowBright("Fun fact:")} try pressing ${chalk.redBright("Ctrl + Click")} on the links.
    `
    )
}

async function farewell(){
    await sleep();
    const data = await figletPromise('Good Bye, Sayonara !!');
    console.log(gradient.retro.multiline(data)+'\n');
}

async function handleAnswer(optionChoosen) {
    const spinner = createSpinner('Bringing projects...').start();
    await sleep();

    if(optionChoosen==='FrontEnd'){
        spinner.success({text: `You can see the projects here " https://github.com/Adityasinghvats/Web-Frontend "` })
    }else if(optionChoosen==='Backend'){
        spinner.success({text: `You can see the projects here " https://github.com/Adityasinghvats?tab=repositories "` })
    }else if(optionChoosen==='Android'){
        spinner.success({text: `You can see the projects here " https://github.com/Adityasinghvats?tab=repositories "` })
    }else if(optionChoosen==='Games'){
        spinner.success({text: `You can see the projects here " https://github.com/Adityasinghvats?tab=repositories "` })
    }
    else if(optionChoosen==='Nah, Show me your problem solving skills'){
        spinner.success({text: `Take a look at my Leetcode profile " https://leetcode.com/u/adityasinghvats/ "` })
    }else{
        spinner.error({text: `Now you have entered the unchartered territory, Go Back!!`});
    }

    await farewell();
    process.exit(0);
}


async function question(params) {
    const options = await inquirer.prompt({
        name: 'skill',
        type: 'list',
        message: 'What kind of project would to like to see ?\n',
        choices: [
            'FrontEnd',
            'Backend',
            'Android',
            'Games',
            'Nah, Show me your problem solving skills',
            'I am not interested',
        ],
    });

    return handleAnswer(options.skill);
}


async function main(){
    await welcome();
    await question();
}
main();