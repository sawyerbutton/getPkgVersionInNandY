# @sawyerB/getPkgVersionInNandY

- Get global package version installed by npm and yarn

## Install

```bash
npm install @sawyerB/getPkgVersionInNandY
```

## Usage

```javascript
const getPackageVersion = require('@sawyerB/@sawyerbutton/get-pkg-version-in-npm-and-yarn')

getPackageVersion('@angular/cli').then(version => {
    console.log(version.npm);
    // => 6.1.3
    console.log(version.yarn);
    // => 6.1.4
})
```

## License
MIT.2018.sawyerButton