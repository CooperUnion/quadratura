//Updates the port that the admin app runs on
import { execSync } from 'child_process'
import { writeFileSync } from 'fs'

export default function updateHost() {

  console.log("update running...")
  //create update files

  const updateFile = '/home/pi/updates/2022-04-25-specific-host'
  execSync(`
    mkdir -p /home/pi/updates;
    touch ${updateFile};
  `)

  const updateLog = execSync(`cat ${updateFile}`).toString()

  if(updateLog === ""){
    console.log('Updating /usr/bin/autohotspot to allow for specific hosts.')

    const output = execSync(`
      cat /usr/bin/autohotspot
    `)
    
    let fileLines = output.toString().split('\n')

    const textToInsert = `
EnsureSpecificHostname()
{
    SPECIFICHOSTNAME=''
    hostname $SPECIFICHOSTNAME
}

#EnsureSpecificHostname `
.split('\n')

    let insertionIndex 
    for(let line of fileLines) {
      if(line === "EnsureRandomHostname") {
        insertionIndex = fileLines.indexOf(line)
      }
    }

    fileLines.splice(insertionIndex, 0, ...textToInsert)

    const reconstructedFile = fileLines.join('\n')
    writeFileSync('/usr/bin/autohotspot', reconstructedFile)
    
    execSync(`sudo date > ${updateFile}`)

  } else {
    console.log('/usr/bin/autohotspot was already updated. Doing nothing.')
  }

}
