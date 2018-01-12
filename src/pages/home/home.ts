import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    this.init();
  }

  init() {
    var win: any = window;
    if (win.navigator) {
      console.log('have');
      navigator.getUserMedia({ video: true },
        function (stream) {
          console.log('stream', stream);
          var video = document.querySelector('video');
          console.log('stream 1');
          video.setAttribute('src', URL.createObjectURL(stream));
          console.log('stream 2');
        }, function (err) {
          console.log("err: ", err);
        }
      );
    } else {
      console.log('phonertc is not defined');
    }

  }

}


