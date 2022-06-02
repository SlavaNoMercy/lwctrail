import { LightningElement } from "lwc";

export default class VideoWrapper extends LightningElement {
  video = "https://www.w3schools.com/tags/movie.mp4";

  handlePlay() {
    this.template.querySelector("c-video-component").play();
  }
  handlePause() {
    this.template.querySelector("c-video-component").pause();
  }
}
