#!/usr/bin/env node
import chalk from "chalk";
import inquirer from 'inquirer';
import gradient from "gradient-string";
import chalkAnimation from 'chalk-animation';
import figlet from "figlet";
import { createSpinner } from "nanospinner";
import util from "util";
import { stdout } from "process";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
const figletPromise = util.promisify(figlet);

async function welcome() {
    const data = await figletPromise('Aditya', { font: 'isometric4', horizontalLayout: 'full' });
    const lines = data.split('\n');
    const width = stdout.columns;
    const centeredText = lines.map(line => line.padStart((width + line.length) / 2)).join('\n');
    console.log(gradient.retro.multiline(centeredText) + '\n');
    await sleep();
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
    );
}

async function showProjects() {
    const projects = [
        {
            name: 'Web-Frontend',
            description: 'A collection of frontend projects using HTML, CSS, and JavaScript.',
            link: 'https://github.com/Adityasinghvats/Web-Frontend'
        },
        {
            name: 'Backend',
            description: 'Backend projects using Node.js, Express, and MongoDB.',
            link: 'https://github.com/Adityasinghvats/express-app'
        },
        {
            name: 'Android',
            description: 'Android applications built using Kotlin.',
            link: 'https://github.com/Adityasinghvats?tab=repositories'
        },
        {
            name: 'Games',
            description: 'Game development projects using Raylib and Pygame',
            link: 'https://github.com/Adityasinghvats/Urta-Parinda'
        }
    ];

    const choices = projects.map(project => ({
        name: `${project.name} - ${project.description}`,
        value: project.link
    }));

    const answer = await inquirer.prompt({
        name: 'project',
        type: 'list',
        message: 'Which project would you like to know more about?',
        choices
    });

    console.log(`You can see the project here: ${chalk.blueBright(answer.project)}`);
}

async function showContactInfo() {
    console.log(`
${chalk.greenBright('Contact Information:')}
Email: ${chalk.blueBright('adityakumarbgs6@gmail.com')}
LinkedIn: ${chalk.blueBright('http://www.linkedin.com/in/aditya-kumar-6882b2308')}
GitHub: ${chalk.blueBright('https://github.com/Adityasinghvats')}
`);
}

async function showSkills() {
    console.log(`
${chalk.greenBright('Skills:')}
- ${chalk.yellowBright('JavaScript')}
- ${chalk.yellowBright('Node.js')}
- ${chalk.yellowBright('React')}
- ${chalk.yellowBright('Express')}
- ${chalk.yellowBright('MongoDB')}
- ${chalk.yellowBright('Java')}
- ${chalk.yellowBright('Kotlin')}
- ${chalk.yellowBright('C++')}
`);
}

async function question() {
    const options = await inquirer.prompt({
        name: 'section',
        type: 'list',
        message: 'What would you like to explore?',
        choices: [
            'Projects',
            'Contact Information',
            'Skills',
            'Exit'
        ],
    });

    switch (options.section) {
        case 'Projects':
            await showProjects();
            break;
        case 'Contact Information':
            await showContactInfo();
            break;
        case 'Skills':
            await showSkills();
            break;
        case 'Exit':
            await farewell();
            process.exit(0);
            break;
    }

    await question(); // Loop back to the main menu
}

async function farewell() {
    await sleep();
    const portfolioLink = `\x1b]8;;https://adityasinghvats.github.io/adix/\x1b\\${chalk.redBright("portfolio")}\x1b]8;;\x1b\\`;
    console.log(`Checkout my ${portfolioLink} website.`);
    const data = await figletPromise('Good Bye, Sayonara !!');
    console.log(gradient.retro.multiline(data) + '\n');
}

async function main() {
    await welcome();
    await question();
}

main();