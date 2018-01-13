import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import headtrackr from 'headtrackr';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // @ViewChild("overlay") noteCanvas: ElementRef;
  // @ViewChild('overlay') private noteCanvas: any;
  @ViewChild('overlay') canvasOverlay:ElementRef;
  public canvasOverlayNe: any;
  constructor(public navCtrl: NavController) {
    
  }

  ngAfterViewInit() {
    let canvasOverlayNe = this.canvasOverlay.nativeElement;
    this.init(canvasOverlayNe);
  }

  // <script>
	// 	  // set up video and canvas elements needed
		
	// 		var videoInput = document.getElementById('vid');
	// 		var canvasInput = document.getElementById('compare');
  //     var debugOverlay = document.getElementById('debug');
      
	// 		//var canvasOverlay = document.getElementById('overlay')
  //     var overlayContext = this.canvasOverlay.getContext('2d');
      
	// 		this.canvasOverlay.style.position = "absolute";
	// 		this.canvasOverlay.style.top = '0px';
	// 		this.canvasOverlay.style.zIndex = '100001';
	// 		this.canvasOverlay.style.display = 'block';
      
  //     debugOverlay.style.position = "absolute";
	// 		debugOverlay.style.top = '0px';
	// 		debugOverlay.style.zIndex = '100002';
	// 		debugOverlay.style.display = 'none';
			
	// 		// add some custom messaging
			
	// 		statusMessages = {
	// 			"whitebalance" : "checking for stability of camera whitebalance",
	// 			"detecting" : "Detecting face",
	// 			"hints" : "Hmm. Detecting the face is taking a long time",
	// 			"redetecting" : "Lost track of face, redetecting",
	// 			"lost" : "Lost track of face",
	// 			"found" : "Tracking face"
	// 		};
			
	// 		supportMessages = {
	// 			"no getUserMedia" : "Unfortunately, <a href='http://dev.w3.org/2011/webrtc/editor/getusermedia.html'>getUserMedia</a> is not supported in your browser. Try <a href='http://www.opera.com/browser/'>downloading Opera 12</a> or <a href='http://caniuse.com/stream'>another browser that supports getUserMedia</a>. Now using fallback video for facedetection.",
	// 			"no camera" : "No camera found. Using fallback video for facedetection."
	// 		};
			
	// 		document.addEventListener("headtrackrStatus", function(event) {
	// 			if (event.status in supportMessages) {
	// 				var messagep = document.getElementById('gUMMessage');
	// 				messagep.innerHTML = supportMessages[event.status];
	// 			} else if (event.status in statusMessages) {
	// 				var messagep = document.getElementById('headtrackerMessage');
	// 				messagep.innerHTML = statusMessages[event.status];
	// 			}
	// 		}, true);
			
	// 		// the face tracking setup
			
	// 		var htracker = new headtrackr.Tracker({altVideo : {ogv : "./media/capture5.ogv", mp4 : "./media/capture5.mp4"}, calcAngles : true, ui : false, headPosition : false, debug : debugOverlay});
	// 		htracker.init(videoInput, canvasInput);
	// 		htracker.start();
			
	// 		// for each facetracking event received draw rectangle around tracked face on canvas
			
	// 		document.addEventListener("facetrackingEvent", function( event ) {
	// 			// clear canvas
	// 			overlayContext.clearRect(0,0,320,240);
	// 			// once we have stable tracking, draw rectangle
	// 			if (event.detection == "CS") {
	// 				overlayContext.translate(event.x, event.y)
	// 				overlayContext.rotate(event.angle-(Math.PI/2));
	// 				overlayContext.strokeStyle = "#00CC00";
	// 				overlayContext.strokeRect((-(event.width/2)) >> 0, (-(event.height/2)) >> 0, event.width, event.height);
	// 				overlayContext.rotate((Math.PI/2)-event.angle);
	// 				overlayContext.translate(-event.x, -event.y);
	// 			}
	// 		});
			
	// 		// turn off or on the canvas showing probability
	// 		function showProbabilityCanvas() {
	// 			var debugCanvas = document.getElementById('debug');
	// 			if (debugCanvas.style.display == 'none') {
	// 				debugCanvas.style.display = 'block';
	// 			} else {
	// 				debugCanvas.style.display = 'none';
	// 			}
	// 		}
  //   </script>

    init(canvasOverlayNe) {
      var win: any = window;
      if (win.navigator) {
        console.log('have');
        navigator.getUserMedia({ video: true },
          function (stream) {
            console.log('stream');
            var videoInput = document.getElementById('vid');
            var canvasInput = document.getElementById('compare');
            var debugOverlay = document.getElementById('debug');

            console.log('canvasOverlayNe=> ', canvasOverlayNe);
            var overlayContext = canvasOverlayNe.getContext('2d');

            videoInput.setAttribute('src', win.URL.createObjectURL(stream));
      
            canvasOverlayNe.style.position = "absolute";
            canvasOverlayNe.style.top = '0px';
            canvasOverlayNe.style.zIndex = '100001';
            canvasOverlayNe.style.display = 'block';

            debugOverlay.style.position = "absolute";
            debugOverlay.style.top = '0px';
            debugOverlay.style.zIndex = '100002';
            debugOverlay.style.display = 'none';

            // add some custom messaging
			
            let statusMessages = {
              "whitebalance" : "checking for stability of camera whitebalance",
              "detecting" : "Detecting face",
              "hints" : "Hmm. Detecting the face is taking a long time",
              "redetecting" : "Lost track of face, redetecting",
              "lost" : "Lost track of face",
              "found" : "Tracking face"
            };
            
            let supportMessages = {
              "no getUserMedia" : "Unfortunately, <a href='http://dev.w3.org/2011/webrtc/editor/getusermedia.html'>getUserMedia</a> is not supported in your browser. Try <a href='http://www.opera.com/browser/'>downloading Opera 12</a> or <a href='http://caniuse.com/stream'>another browser that supports getUserMedia</a>. Now using fallback video for facedetection.",
              "no camera" : "No camera found. Using fallback video for facedetection."
            };

            // document.addEventListener("headtrackrStatus", function(event:any) {
            //   if (event.status in supportMessages) {
            //     var messagep = document.getElementById('gUMMessage');
            //     messagep.innerHTML = supportMessages[event.status];
            //   } else if (event.status in statusMessages) {
            //     var messagep = document.getElementById('headtrackerMessage');
            //     messagep.innerHTML = statusMessages[event.status];
            //   }
            // }, true);

            // the face tracking setup
			
              // var htracker = new headtrackr.Tracker({altVideo : {ogv : "./media/capture5.ogv", mp4 : "./media/capture5.mp4"}, calcAngles : true, ui : false, headPosition : false, debug : debugOverlay});
              var htracker = new headtrackr.Tracker({calcAngles : true, ui : false, headPosition : false, debug : debugOverlay});
              htracker.init(videoInput, canvasInput);
              htracker.start();

              	// for each facetracking event received draw rectangle around tracked face on canvas
			
              document.addEventListener("facetrackingEvent", function( event:any ) {
                // clear canvas
                overlayContext.clearRect(0,0,320,240);
                // once we have stable tracking, draw rectangle
                if (event.detection == "CS") {
                  overlayContext.translate(event.x, event.y)
                  overlayContext.rotate(event.angle-(Math.PI/2));
                  overlayContext.strokeStyle = "#00CC00";
                  overlayContext.strokeRect((-(event.width/2)) >> 0, (-(event.height/2)) >> 0, event.width, event.height);
                  overlayContext.rotate((Math.PI/2)-event.angle);
                  overlayContext.translate(-event.x, -event.y);
                }
              });
              
              // turn off or on the canvas showing probability
              function showProbabilityCanvas() {
                var debugCanvas = document.getElementById('debug');
                if (debugCanvas.style.display == 'none') {
                  debugCanvas.style.display = 'block';
                } else {
                  debugCanvas.style.display = 'none';
                }
              }


            // console.log('stream', stream);
            // var video = document.querySelector('video');
            // console.log('stream 1');
            // video.setAttribute('src', win.URL.createObjectURL(stream));
            // console.log('stream 2');
            // var htracker = new headtrackr.Tracker();
            // var canvas = document.querySelector('canvas');
            // htracker.init(video, canvas);
            // htracker.start();
          }, function (err) {
            console.log("err: ", err);
          }
        );
      } else {
        console.log('phonertc is not defined');
      }
  
    }
  
  
  // init() {
  //   var win: any = window;
  //   if (win.navigator) {
  //     console.log('have');
  //     navigator.getUserMedia({ video: true },
  //       function (stream) {
  //         console.log('stream', stream);
  //         var video = document.querySelector('video');
  //         console.log('stream 1');
  //         video.setAttribute('src', win.URL.createObjectURL(stream));
  //         console.log('stream 2');
  //         var htracker = new headtrackr.Tracker();
  //         var canvas = document.querySelector('canvas');
  //         htracker.init(video, canvas);
  //         // htracker.start();
  //         htracker.start();
  //         // document.addEventListener('facetrackingEvent', this.handleFaceTrackingEvent());
  //       }, function (err) {
  //         console.log("err: ", err);
  //       }
  //     );
  //   } else {
  //     console.log('phonertc is not defined');
  //   }

  // }

  public handleFaceTrackingEvent() {
    console.log('handleFaceTrackingEvent');
  }
  // public handleFaceTrackingEvent() {
  //   overlayContext.clearRect(0, 0, videoWidth, videoHeight);
  //   // once we have stable tracking, draw rectangle
  //   if (event.detection === 'CS') {
  //     overlayContext.translate(event.x, event.y);
  //     overlayContext.rotate(event.angle - (Math.PI / 2));
  //     overlayContext.strokeStyle = '#00CC00';
  //     overlayContext.strokeRect((-(event.width / 2)) >> 0,
  //       (-(event.height / 2)) >> 0, event.width, event.height);
  //     overlayContext.rotate((Math.PI / 2) - event.angle);
  //     overlayContext.translate(-event.x, -event.y);
  //   }
  // }
}


