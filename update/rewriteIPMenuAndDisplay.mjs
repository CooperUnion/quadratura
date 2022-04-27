const ipMenu = `
[Unit]
Description=Run the ip menu system
After=multi-user.target
[Service]
User=pi
ExecStartPre=-sudo systemctl stop display
ExecStartPre=-sudo systemctl stop ip-menu-quick 
ExecStartPre=-sudo systemctl stop ip-menu
ExecStart=/home/pi/quadratura/startup/ip.py 20
[Install]
WantedBy=multi-user.target
`
const ipMenuQuick = `
[Unit]
Description=Run the ip menu system
After=multi-user.target
[Service]
User=pi
ExecStartPre=-sudo systemctl stop display
ExecStartPre=-sudo systemctl stop ip-menu
ExecStart=/home/pi/quadratura/startup/ip.py 1
[Install]
WantedBy=multi-user.target
`

const display = `
[Unit]
Description=Run the playground display                                                                                                                 
After=multi-user.target                                                                                                                                
[Service]
User=pi
ExecStartPre=-sudo systemctl stop ip-menu
ExecStartPre=-sudo systemctl stop ip-menu-quick
ExecStart=/home/pi/playground/start.sh
ExecStop=sudo systemctl start ip-menu-quick
[Install]
WantedBy=multi-user.target
`

const crontab = `@reboot /home/pi/quadratura/update/update.sh`

//Updates various services to support removing codeserver
import { execSync } from 'child_process'
import { writeFileSync } from 'fs'

export default function rewriteServices() {

  console.log("update running...")
  //create update files
  const rewriteServicesFile = '/home/pi/updates/2022-04-26-rewrite-services'

  execSync(`
    mkdir -p /home/pi/updates;
    touch ${rewriteServicesFile};
  `)

  const rewriteServicesLog = execSync(`cat ${rewriteServicesFile}`).toString()

  if(rewriteServicesLog === ""){
    console.log('Updating services for removing codeserver.')
  
    writeFileSync('/etc/systemd/system/ip-menu.service', ipMenu)
    writeFileSync('/etc/systemd/system/ip-menu-quick.service', ipMenuQuick)
    writeFileSync('/etc/systemd/system/display.service', display)

    writeFileSync('/home/pi/pi-crontab', crontab)
    execSync(`
      sudo crontab -u pi crontab;
      sudo rm /home/pi/pi-crontab;
      sudo date > ${rewriteServicesFile}
    `)

    execSync(`
      sudo systemctl daemon-reload;
      sudo systemctl enable ip-menu;
      sudo systemctl enable ip-menu-quick;
    `)
  } else {
    console.log('Updating services was already updated. Doing nothing.')
  }

}


