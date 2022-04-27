const ip-menu = `
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
const ip-menu-quick = `
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


write out all three of these as-is
enable all three
- sudo systemctl daemon-reload
- sudo systemctl enable ...
- sudo systemctl restart ip-menu // so it works on the first boot, rather than two

//Updates the port that the admin app runs on
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
  
    writeFileSync('/etc/systemd/system/ip-menu.service', ip-menu)
    writeFileSync('/etc/systemd/system/ip-menu-quick.service', ip-menu)
    writeFileSync('/etc/systemd/system/display.service', display)


    const output = execSync(`
      cd /home/pi;
      sudo crontab -l > admin-crontab;
      sudo sed -i "s/8888/80/" ./admin-crontab;
      sudo crontab admin-crontab;
      sudo rm admin-crontab;
      sudo date > ${rewriteServicesFile}
    `)
  } else {
    console.log('Updating services was already updated. Doing nothing.')
  }

}


