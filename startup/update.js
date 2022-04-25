//tasks that can run as an admin on boot
import { exec, execSync } from 'child_process'

function updatePort() {

  console.log("update running...")
  //create update files
  const portUpdateFile = '/home/pi/updates/2022-04-24-port-number'

  execSync(`
    mkdir -p /home/pi/updates;
    touch ${portUpdateFile};
  `)

  const portUpdateLog = execSync(`cat ${portUpdateFile}`).toString()

  if(portUpdateLog === ""){
    console.log('Updating port number of admin app.')

    const output = execSync(`
      cd /home/pi;
      sudo crontab -l > admin-crontab;
      sudo sed -i "s/8888/80/" ./admin-crontab;
      sudo crontab admin-crontab;
      sudo rm admin-crontab;
      sudo date > ${portUpdateFile}
    `)
  } else {
    console.log('Port was already updated. Doing nothing.')
  }

}

export function update() {
  updatePort()
}
