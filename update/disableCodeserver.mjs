//Updates the port that the admin app runs on
import { execSync } from 'child_process'
import { writeFileSync } from 'fs'

export default function updateHost() {

  console.log("update running...")
  //create update files

  const updateFile = '/home/pi/updates/2022-04-25-disable-codeserver'
  execSync(`
    mkdir -p /home/pi/updates;
    touch ${updateFile};
  `)

  const updateLog = execSync(`cat ${updateFile}`).toString()

  if(updateLog === ""){
    console.log('Updating pi crontab to disable codeserver.')

    const output = execSync(`
      crontab -u pi -l
    `)
    
    let fileLines = output.toString().split('\n')

    const textToInsert = ['#@reboot PASSWORD=cooperunion /usr/bin/code-server --bind-addr 0.0.0.0:8080 --user-data-dir /home/pi/.codeserver --auth password /home/pi/playground']
    let insertionIndex 
    for(let line of fileLines) {
      if(line.substr(0,16) === "@reboot PASSWORD") {
        insertionIndex = fileLines.indexOf(line)
      }
    }

    fileLines.splice(insertionIndex, 1, ...textToInsert)

    const reconstructedFile = fileLines.join('\n')
    writeFileSync('/home/pi/pi-crontab', reconstructedFile)

    execSync(`
      sudo crontab -u pi /home/pi/pi-crontab;
      sudo rm /home/pi/pi-crontab;
      sudo date > ${updateFile};
    `)

  } else {
    console.log('pi crontab  was already updated to disable codeserver. Doing nothing.')
  }

}
