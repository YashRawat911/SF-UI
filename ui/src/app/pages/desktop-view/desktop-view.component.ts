import { Component, Input } from '@angular/core';
import { Config } from 'src/app/config/config';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'desktop-view',
  templateUrl: './desktop-view.component.html',
  styleUrls: ['./desktop-view.component.css']
})
export class DesktopViewComponent {
  IframeURL: SafeUrl

  DesktopRequested: boolean = false
  NoVNCClientReady: boolean = false

  LastPage: string = ""

  constructor(private sanitizer: DomSanitizer, private snackBar: MatSnackBar) {
    let secret = localStorage.getItem("secret");
    let shouldEncrypt = document.location.protocol == 'https:' ? 'true' : 'false'
    let desktopType = "novnc"
    let wsPath = "desktopws%3Fsecret%3D" + secret + "%26type%3D" + desktopType

    // this.IframeURL = sanitizer.bypassSecurityTrustResourceUrl("/assets/xpra_client/html5/index.html?server=" + Config.ApiHost
    //   + "&port=" + Config.ApiPort + "&path=" + wsPath + "&password=abc");
    this.IframeURL = sanitizer.bypassSecurityTrustResourceUrl("/assets/novnc_client/vnc.html?path=" + wsPath
      + "&host=" + Config.ApiHost + "&port=" + Config.ApiPort + "&encrypt=" + shouldEncrypt
      + "&autoconnect=true&shared=true&reconnect=false&logging=error&resize=scale");
  }

  requestDesktop() {
    this.DesktopRequested = true
  }

  stateChange = () => {
    this.NoVNCClientReady = true
  }
}
