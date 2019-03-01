const WORKING_DIR = process.cwd()
const logger = require('debug-logger')('cli:createCmd')
const { loadConf, validateCreation } = require('../conf')

function registerCommand ({ cli }) {
  cli.command('create [--conf file]', 'Deploy a new dx-module based on the configuration file parameters. Resulting addresses are saved on the same file.', yargs => {
    yargs.option('conf', {
      type: 'string',
      describe: 'The file to read the configuration'
    })
  }, async function (argv) {
    const { conf } = argv

    const jsonConf = loadConf(conf)
    logger.info('Validating configuration file...')
    await validateCreation(jsonConf)
  })
}

module.exports = registerCommand