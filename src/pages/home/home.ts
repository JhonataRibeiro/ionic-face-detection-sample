import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import headtrackr from 'headtrackr';
import { Platform } from 'ionic-angular/platform/platform';
declare let cordova: any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public width = 320;    // width of photo which will be captured
  public height = 0;     // height of photo which will be captured

  @ViewChild('overlay') canvasOverlay: ElementRef;
  @ViewChild('image') canvasImage: ElementRef;
  public canvasOverlayNe: any;
  constructor(public navCtrl: NavController, public platform: Platform) {

  }

  ngAfterViewInit() {
    let canvasOverlayNe = this.canvasOverlay.nativeElement;
    this.init(canvasOverlayNe);
  }

  init(canvasOverlayNe) {
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.handleCameraPermission(() => {
          this.initDetection(canvasOverlayNe);
        });
      }
      this.initDetection(canvasOverlayNe);
    });
  }

  public initDetection(canvasOverlayNe) {
    var win: any = window;
    if (win.navigator) {
      navigator.getUserMedia({ video: true },
        function (stream) {

          let overlayContext = canvasOverlayNe.getContext('2d');

          canvasOverlayNe.style.position = "absolute";
          canvasOverlayNe.style.top = '0px';
          canvasOverlayNe.style.zIndex = '100001';
          canvasOverlayNe.style.display = 'block';

          var video = document.querySelector('video');
          video.setAttribute('src', win.URL.createObjectURL(stream));
          var htracker = new headtrackr.Tracker();
          let canvas = document.querySelector('canvas');
          htracker.init(video, canvas);
          htracker.start();

          document.addEventListener("facetrackingEvent", function (event: any) {
            // clear canvas
            console.log('event: ', event);
            overlayContext.clearRect(0, 0, 320, 240);
            // once we have stable tracking, draw rectangle
            if (event.detection == "CS") {
              overlayContext.translate(event.x, event.y)
              overlayContext.rotate(event.angle - (Math.PI / 2));
              overlayContext.strokeStyle = "#00CC00";
              overlayContext.strokeRect((-(event.width / 2)) >> 0, (-(event.height / 2)) >> 0, event.width, event.height);
              overlayContext.rotate((Math.PI / 2) - event.angle);
              overlayContext.translate(-event.x, -event.y);
            }
          });
        }, function (err) {
          console.log("err: ", err);
        }
      );
    } else {
      console.log('phonertc is not defined');
    }
  }

  public handleCameraPermission(cb) {
    let permissions = cordova.plugins.permissions;
    permissions.requestPermission(permissions.CAMERA, function (status) {
      cb(status);
    }, (err) => {
      console.log('error on request permissions: ', err);
    });
  }

  takePhoto() {
    let thatImage = "";
    let canvas = this.canvasImage.nativeElement;
    let videoGet = document.querySelector("video");
    canvas.width = videoGet.width;
    canvas.height = videoGet.height;
    canvas.getContext('2d').drawImage(videoGet, 0, 0, canvas.width, canvas.height);
    let img = canvas.toDataURL();
  }

  takeFace() {
    
  }

}


