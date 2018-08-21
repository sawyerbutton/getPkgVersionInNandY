# @sawyerbutton/get-pkg-version-in-npm-and-yarn

- Get global package version installed by npm and yarn

## Install

```bash
npm install @sawyerbutton/get-pkg-version-in-npm-and-yarn
```

## Usage

```javascript
const getPackageVersion = require('@sawyerbutton/get-pkg-version-in-npm-and-yarn')

getPackageVersion('@angular/cli').then(version => {
    console.log(version.npm);
    // => 6.1.3
    console.log(version.yarn);
    // => 6.1.4
})
```

## License
MIT.2018.sawyerButton