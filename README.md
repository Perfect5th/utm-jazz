# UTM Jazz
## A (Hopefully) Not Terrible Turing-Machine-based Music Generator

### Development

#### Pre-requisites
  - You'll want to have [nvm](https://github.com/creationix/nvm) installed, but
  it's not an absolute requirement. If you're on Windows, try
  [nvm-windows](https://github.com/coreybutler/nvm-windows)
    - You'll need a version of
    [Node.js](https://nodejs.org) installed (the project uses v10.15). Install
    it yourself or use `nvm install 10.15`
  - That's it!

After cloning the repository, change directories into it and install the single
dependency, [parcel](https://parceljs.org), like so:

    $ cd utm-jazz
    $ git checkout dev
    $ nvm use 10.15   # Or just 'nvm use' if you're on mac/linux
    $ npm install

To run the project:

    $ npm run dev

Then visit http://localhost:1234 in your browser

To build for deployment:

    $ npm run build

That's it!
