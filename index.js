#!/usr/bin/env node

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const ncp = require('ncp').ncp;
ncp.limit = 16;
const path = require('path');
const fs = require('fs');

(async function () {
    const userArgs = process.argv.slice(2);

    console.log(userArgs);

    const command = userArgs[0];

    switch (command) {
        case 'new':
            const projectName = {};
            projectName.dash = userArgs[1];
            projectName.camel = projectName.dash.replace(/-([a-z])/g, g => g[1].toUpperCase());
            projectName.pascal = capitalizeFirstLetter(projectName.camel);

            console.log('Criando o projeto...');
            await execIt(`ng new ${projectName.dash} --style=scss`);
            console.log('Criando o projeto... Finalizado!');

            console.log('Instalando SMN UI no projeto...');
            await execIt(`cd ${projectName.dash} && npm install ng-smn-ui --save && cd ..`);
            console.log('Instalando SMN UI no projeto... Finalizado!');

            console.log('Preparando a estrutura padrão...');
            await ncpAsync(path.join(__dirname, '/replace'), `${projectName.dash}`);
            setTimeout(() => {
                const files = [
                    `${projectName.dash}/package.json`,
                    `${projectName.dash}/package-lock.json`,
                    `${projectName.dash}/src/index.html`,
                    `${projectName.dash}/src/app/views/main/main.component.ts`,
                    `${projectName.dash}/src/app/views/main/home/home.component.html`,
                ];
                files.forEach(async (file) => {
                    await replaceInFile(file, new RegExp('{{{projectname-dash}}}', 'g'), projectName.dash);
                    await replaceInFile(file, new RegExp('{{{projectname-camel}}}', 'g'), projectName.camel);
                    await replaceInFile(file, new RegExp('{{{projectname-pascal}}}', 'g'), projectName.pascal);
                });
                console.log('Preparando a estrutura padrão... Finalizado!');
            }, 1000);
            break;
    }

    console.log('O projeto foi gerado com sucesso. Para configurar o ambiente altere o arquivo "environment.js".');
})();

async function execIt(code) {
    const {stdout} = await exec(code);
    return stdout;
}

async function ncpAsync(source, destination) {
    return new Promise((resolve, reject) => {
        ncp(source, destination, function (err) {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function replaceInFile(file, source, replacement) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', function (err, data) {
            if (err) {
                return reject(err);
            }
            const result = data.replace(source, replacement);

            fs.writeFile(file, result, 'utf8', function (err) {
                if (err) return reject(err);

                resolve();
            });
        });
    });
}
