const child = require('child_process');
const fs = require('fs');
/**
 * get global package version installed by npm and yarn
 * @return {npm:'x.x.x',yarn:'x.x.x'} as a promise
 */

/**
 * get global path for npm and yarn, there are four possible situation
 * yarn+ npm-
 * yarn+ npm+
 * yarn- npm+
 * yarn- npm-
 * @private
 * @returns {object}
 */
const getGlobalDir = () => {
    // Let paths = [];
    let paths = {};
    return new Promise((resolve, reject) => {
        child.exec('yarn global dir', (error, stdout) => {
            if (error) {
                child.exec('npm root -g', (error, stdout) => {
                    if (error) {
                        // there is no npm and yarn installed locally
                        reject(error);
                    }
                    const path = stdout.replace('\n', '');
                    paths.npm = path + '/';
                    resolve(paths);
                });
                reject(error);
            } else {
                const path = stdout.concat('/node_modules').replace('\n', '');
                paths.yarn = path + '/';
                child.exec('npm root -g', (error, stdout) => {
                    if (error) {
                        resolve(paths);
                    }
                    const tempPath = stdout.replace('\n', '');
                    paths.npm = tempPath + '/';
                    resolve(paths);
                });
            }
        });
    });
};

/**
 * Retrive package version
 * @param {string} packageName - Name of the globally installed package
 * @returns {promise}
 */
const getPackageVersion = packageName => {
    return new Promise((resolve, reject) => {
        getGlobalDir()
            .then(globalDirs => {
                let versions = {};
                if (globalDirs.npm && !globalDirs.yarn) {
                    const path = globalDirs.npm + packageName + '/package.json';
                    if (fs.existsSync(path)) {
                        const packageJson = fs.readFileSync(path, 'utf-8');
                        versions.npm = JSON.parse(packageJson).version;
                        versions.yarn = '';
                    }
                    resolve(versions);
                } else if(globalDirs.npm && globalDirs.yarn){
                    const nPath = globalDirs.npm + packageName + '/package.json';
                    const yPath = globalDirs.yarn + packageName + '/package.json';
                    if (fs.existsSync(nPath)) {
                        const packageJson = fs.readFileSync(nPath, 'utf-8');
                        versions.npm = JSON.parse(packageJson).version;
                    }else {
                        versions.npm = '';
                    }
                    if (fs.existsSync(yPath)) {
                        const packageJson = fs.readFileSync(yPath, 'utf-8');
                        versions.yarn = JSON.parse(packageJson).version;
                    }else {
                        versions.yarn = '';
                    }
                    resolve(versions);
                } else if(!globalDirs.npm && globalDirs.yarn){
                    const path = globalDirs.yarn + packageName + '/package.json';
                    if (fs.existsSync(path)) {
                        const packageJson = fs.readFileSync(path, 'utf-8');
                        versions.yarn = JSON.parse(packageJson).version;
                        versions.npm = '';
                    }
                    resolve(versions);
                } else{
                    reject('Failed to find package, check whether the package installed globally?');
                }
            })
            .catch(() => {
                reject('Failed to retrieve global install directory');
            });
    });
};

module.exports = getPackageVersion;
