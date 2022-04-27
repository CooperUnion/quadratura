//tasks that can run as an admin on boot
import { exec, execSync } from 'child_process'
import updatePort from '../update/updatePort.mjs'
import updateForSpecificHost from '../update/updateForSpecificHost.mjs'
import disableCodeserver from '../update/disableCodeserver.mjs'
import rewriteServices from '../update/rewriteIPMenuAndDisplay.mjs'

export function update() {
  updatePort()
  updateForSpecificHost()
  disableCodeserver()
  rewriteServices()
}
