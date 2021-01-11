# i-AM: Independent Audio Management

I am is an Independent audio management application which lets users listen to instructions through their earbuds to complete structured and scheduled tasks that help them get through their day while learning new things and learning how to achieve independence​ I am offers all the features needed for individuals to personalize their schedules and activities.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Table of Contents
- [Architecture](#Architecture)
- [Prerequisites](#Prerequisites)
  - [NPM Installation](#NPM-Installation)
  - [Expo Installation](#Expo-Installation)
- [Installation](#Installation)
- [Development](#Development)
  - [Git Branching Model](#Git-Branching-Model)
  - [Development Workflow](#Development-Workflow)
- [Contributing](#Contributing)
  - [Commit Etiquette](#Commit-Etiquette)
  - [Pull Request Checklist & Etiquette](#Pull-Request-Checklist-and-Etiquette)

### Architecture
Architecture and folder descriptions in progress

### Prerequisites
##### NPM Installation

Before installing this Readme Generator you need to check if you have `Node.js`and `NPM` installed on your computer.

To check if you have `Node.js` installed, run this command in your terminal:

```sh
node -v
```

If you get an answer like this, it means that `Node.js` is installed and you may go to the [next section](#then-install-the-readme-generator).

```sh
v10.14.1
```

To confirm that you have `NPM` installed you can run this command in your terminal:

```sh
npm -v
```

If you get an answer like this, it means that `Node.js` is installed and you may go to the [next section](#then-install-the-readme-generator).

```sh
6.4.1
```

If `Node.js` or `NPM` is not installed you can install them on [this link](https://nodejs.org/en/)

Don't forget to update `NPM` after installing `Node.js`:

```sh
npm install npm@latest -g
```
##### Expo Installation
This application uses React Native Expo for building and deployment.
If `expo` or is not installed you can install them on [this link](https://docs.expo.io/get-started/installation/)

### Installation

To start working on the site, you should clone the repo to your local computer

```bash
git clone https://github.com/tasmainian/DigitalInclusionChallenge.git
```

Navigate to the root directory and install the site dependencies:

```bash
npm install
```

The site uses the [Expo](https://expo.io/) framework. To build and serve the site locally, you will need to install Expo as shown above:

Run the app
```bash
npm start
```

You can use your phone to run the app by scanning the QR code or running a simulator on your local computer. 

## Development - Setup In Progress

This section will outline the general development workflow as well as how to correctly start developing features for the site.

### Git Branching Model

Before starting development, it is important to understand the GitHub workflow for this repository. The `main` branch represents the official history and should always be deployable. As such, development **does not** take place on this branch. The source code of HEAD always reflects a production-ready state.

Instead, the `development` branch is used for development. In this branch, the source code of HEAD always reflects a state with the latest delivered development changes for the next release.

Feature branches are branched from `development` and created by team members to aid parallel development. It is in these branches most development will take place. It is important to note that these branches **must** be branched off from `development` and merged back to `development`.

### Development Workflow

To start developing a feature, checkout `development` and branch off a new feature branch.

```bash
git checkout development
git branch feature-[myfeature]
git checkout feature-[myfeature]
```

## Contributing

This section outlines how to properly contribute your work to the repository.

### Commit Etiquette

While developing on a feature branch, try to keep commits frequent and avoid committing large chunks of unrelated changes. Each commit should have a purpose that is briefly explained in the commit message. Commit messages should talk about **what** changed, and **why**. **Not how** – how is the diff, and you don’t need to repeat it.

### Pull Request Checklist and Etiquette

When developing a feature, it is encouraged that you create a `draft` pull request right after the first commit. This will let you easily track your progress, and more importantly allows you to get early feedback from team members. More visibility is always better for the team.

Before marking a PR ready for review, please ensure you've completed the following steps:

#### 1. Format your code

TBD: Will implement prettier soon

#### 2. Merge in `development` branch changes

This is something that should be done throughout the development process to keep up to date with upstream changes and to squash any merge conflicts quickly. It also needs to be done before submitting your PR to resolve the forked history.

```bash
git checkout development
git pull
git checkout feature-[myfeature]
git merge development
```

#### 3. Describe the request

Including a useful description for your PR is helpful to guide the reviewer through the code as much as possible; highlighting related files and grouping them into concepts or problems that are being solved or implemented.

Once you have completed your changes and completed everything on the checklist it's time to put your PR up for review!

## Deployment

TBD

## Built With

* [React Native](https://reactnative.dev/) - The mobile framework used
* [Expo](https://expo.io/) - Development Tool/Library
* [Firebase](https://firebase.google.com/) - Cloud Database and File Storage

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

See also the list of [contributors](https://github.com/tasmainian/DigitalInclusionChallenge/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
