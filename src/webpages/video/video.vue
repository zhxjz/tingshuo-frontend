<template>
  <div class="container">
<el-container style="maxcon">
<el-container style="height: 450px; border: 1px solid #eee;border-radius:30px;">
  <el-aside width="300px" style="background-color: rgb(238, 241, 246);border-radius:30px;">
    <div v-for="vv in videos" class="textleft directory">
      {{vv.title}}
    </div>
  </el-aside>
  
  <el-container>
    
    <el-main style="background-color:black;maxwidth:100%;maxheight:100%;">
      <div class="video" @pointermove.prevent="handleMouseMove($event)"
         @pointerup.prevent="stopDragging"
         @pointerleave="handleMouseLeave"
         @pointerenter="handleMouseEnter" ref="vcontainer">
        <video class="video__player" ref="vv" @timeupdate="handleTimeUpdate" @ended="handleEnd">
            <source src="../../assets/ceshi.mp4"/>
        </video>
        <div class="controller" v-show="isControlVisible">
            <div class="controller__progress-wrapper">
                <div class="controller__progress" ref="p" @click="handleProgressClick($event)">
                    <div class="controller__progress controller__progress--passed"
                         :style="{width: videoProgressPercent}"></div>
                    <div class="controller__dot"
                         :style="{left: videoProgressPercent}"
                         @pointerdown="startDragging($event)">
                        <div class="controller__inner-dot"></div>
                    </div>
                </div>
            </div>
            <div class="controller__btn-wrapper">
                <div class="controller__btn" @click="togglePlaying">
                    <font-awesome-icon :icon="['fas', 'play']" v-if="isPaused"></font-awesome-icon>
                    <font-awesome-icon :icon="['fas', 'pause']" v-else></font-awesome-icon>
                </div>
                <div class="controller__btn" @click="stopPlaying">
                    <font-awesome-icon :icon="['fas', 'stop']"></font-awesome-icon>
                </div>
                <div class="controller__btn" @click="toggleMute">
                    <font-awesome-icon :icon="['fas', 'volume-up']"
                                       v-if="!isMuted"></font-awesome-icon>
                    <font-awesome-icon :icon="['fas', 'volume-mute']" v-else></font-awesome-icon>
                </div>
                <div class="volume_progress" ref="v" @click="handleVolumeClick($event)">
                    <div class="volume_progress volume_progress--passed"
                    :style="{width:videoVolumePercent}"></div>
                    <div class="volume__dot"
                    :style="{left:videoVolumePercent}"
                    @pointerdown="startVolumeDragging($event)">
                    </div>
                    
                    </div>
                <div class="controller__timer">
                    {{videoTime}}
                </div>
                <div class="controller__btn controller__btn--fullscreen" @click="toggleFullscreen">
                    <font-awesome-icon :icon="['fas', 'expand']"></font-awesome-icon>
                </div>
            </div>
        </div>
    </div>
    </el-main>
  </el-container>
</el-container>
</el-container>
</div>
</template>

<script>
  export default {
    name: "MyVideo",
    data() {
      const vid= {
        title:'okokok'
      };
      return {
         videos: Array(20).fill(vid),
          video: null,
                isPaused: true,
                isMuted: false,
                videoTime: '00:00 / 00:00',
                isDragging: false,
                isVolumeDragging: false,
                isControlVisible: false,
                hidingEvent: null,
                videoProgress: 0,
                draggingStartX: 0,
                dotOffsetX: 0,
                progress: null,
                volume:null,
                videoSrc:"../../assets/ceshi.mp4",
                // videoSrc:'',

                videoVolume:1,
                videoVolumeSave:1
      }
    },
  computed: {
            videoProgressPercent() {
                return `${this.videoProgress * 100}%`;
            },
            videoVolumePercent(){
                return `${this.videoVolume * 100}%`;
            }
        },
  methods:{
    add(){
      this.$refs.input1.value="22";
       this.video = this.$refs.vv;
     this.progress = this.$refs.p;
     this.volume=this.$refs.v;
    },
    toggleFullscreen() {
                const isFullscreen = document.webkitIsFullScreen || document.fullscreen;
                if (isFullscreen) {
                    const exitFunc = document.exitFullscreen || document.webkitExitFullscreen;
                    exitFunc.call(document);
                } else {
                    const element = this.$refs.vcontainer;
                    const fullscreenFunc = element.requestFullscreen || element.webkitRequestFullScreen;
                    fullscreenFunc.call(element);
                }
            },
            handleTimeUpdate() {
                this.videoTime = this.refreshTime();
                this.videoProgress = this.video.currentTime / this.video.duration;
              //  this.videoVolume=this.video.volume;
            },
            refreshTime() {
                if (!this.video) {
                    return `${secToTimer(0)} / ${secToTimer(0)}`;
                }
                const currTime = this.video.currentTime || 0;
                const duration = this.video.duration || 0;
                return `${secToTimer(currTime)} / ${secToTimer(duration)}`;
            },
            togglePlaying() {
                if (this.video.paused) {
                    this.playVideo();
                } else {
                    this.pauseVideo();
                }
            },
            stopPlaying() {
                this.video.currentTime = 0;
                this.pauseVideo();
            },
            toggleMute() {
                if(this.video.muted){
                    this.videoVolume=this.videoVolumeSave;
                }else{
                    this.videoVolumeSave=this.videoVolume;
                    this.videoVolume=0;
                }
                this.video.muted = !this.video.muted;
                this.isMuted = this.video.muted;
            },
            handleEnd() {
                this.pauseVideo();
            },
            playVideo() {
                this.isPaused = false;
                this.video.play();
                
            },
            pauseVideo() {
                this.isPaused = true;
                this.video.pause();
            },
            setProgress(x) {
                const progressRect = this.progress.getBoundingClientRect();
                let progressPercent = (x - progressRect.left) / progressRect.width;
                if (progressPercent < 0) {
                    progressPercent = 0;
                } else if (progressPercent > 1) {
                    progressPercent = 1;
                }
                this.video.currentTime = this.video.duration * progressPercent;
            },
            setVolume(x){
                const volumeRect=this.volume.getBoundingClientRect();
                let volumePercent=(x-volumeRect.left)/volumeRect.width;
                if(volumePercent<0){
                    volumePercent=0;
                }else if(volumePercent>1){
                    volumePercent=1;
                }
                this.video.volume=volumePercent;
                this.videoVolume=volumePercent;
                if(this.videoVolume==0){
                    this.isMuted=true;
                }else{
                    this.isMuted=false;
                }
            },
            hideControlBar() {
                const isFullscreen = document.webkitIsFullScreen || document.fullscreen;
                if (isFullscreen) {
                    this.hideCursor();
                }
                this.isControlVisible = false;
            },
            showControlBar() {
                this.isControlVisible = true;
            },
            hideCursor() {
                document.body.style.cursor = 'none';
            },
            showCursor() {
                document.body.style.cursor = 'default';
            },
            handleProgressClick(event) {
                const clickX = event.clientX;
                this.setProgress(clickX);
            },
            handleVolumeClick(event){
                console.log("handleVolumeCllick")
                const clickX =event.clientX;
                console.log("clickX:"+clickX);
                this.setVolume(clickX);
            },
            startDragging(event) {
                this.pauseVideo();
                this.isDragging = true;
                this.draggingStartX = event.clientX;
            },
            startVolumeDragging(event){
                this.isVolumeDragging=true;
            },
            moveDragging(event) {
                if (this.isDragging) {
                    const offsetX = event.clientX - this.draggingStartX;
                    this.dotOffsetX = offsetX < 0 ? 0 : offsetX;
                    this.setProgress(event.clientX);
                }
                if(this.isVolumeDragging){
                    this.setVolume(event.clientX);
                }
            },
            stopDragging() {
                this.isDragging = false;
                this.isVolumeDragging=false;
                this.dotOffsetX = 0;
            },
            handleMouseMove(event) {
                this.showControlBar();
                this.showCursor();
                if (this.hidingEvent !== null) {
                    clearInterval(this.hidingEvent);
                }
                this.hidingEvent = setInterval(this.hideControlBar, 3000);
                this.moveDragging(event);
            },
            handleMouseLeave() {
                this.hideControlBar();
                this.stopDragging();
                console.log("mouseleave")
            },
            handleMouseEnter() {
                this.showControlBar();
                console.log("mouseenter")
            },
  },
  mounted:function(){
   // this.$refs.input1.value="22"
    // this.video = this.$refs.vv;
    // this.progress = this.$refs.p;
    this.video = this.$refs.vv;
     this.progress = this.$refs.p;
     this.volume=this.$refs.v;
  }
  };
</script>

<style scoped>
.container{
  margin-top: 90px;
  margin-left: 60px;
  margin-right: 60px;
}
.directory{
  font-size: 20px;
  margin-top: 1em;
  margin-left: 1em;
  font-weight: 200;
}
.textleft{
  text-align: left;
}
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  .el-aside {
    color: #333;
  }
  .video {
        position: relative;
    }

    .video__player {
        width: 800px;
        height: 400px;
        display: flex;
    }

    .controller {
        flex-direction: column;
        height: 50px;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.5);   /* 最后一个是透明度*/ 
    }

    .controller__btn-wrapper {
        position: relative;
        height: calc(100% - 5px);
        display: flex;
        align-items: center;
        color: #fff;
        padding: 0 18px;
    }

    .controller__btn {
        cursor: pointer;
        transition: 0.5s;
        margin: 0 20px;
    }

    .controller__btn:hover {
         color: #409eff;   /*覆盖这个图标变成蓝色*/
    }

    .controller__timer {
        margin-left: 15px;
    }

    .controller__btn--fullscreen {
        position: absolute;
        right: 15px;
    }

    .controller__progress-wrapper {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    /*进度条*/
    .controller__progress {
        height: 5px;
        position: relative;
        width: calc(100% - 30px);
        border-radius: 100px;
        background: #dcdcdc;
        cursor: pointer;    /* 鼠标放到进度条上显示手指标志*/
    }

   /*走过的进度条颜色*/
    .controller__progress--passed {
        position: absolute;
        top: 0;
        left: 0;
        background: #409EFF;
        
    }

   
    .volume_progress{
        height:3px;
        position: relative;
        width: 12%;
        border-radius: 100px;
        background: #dcdcdc;
        cursor: pointer;    /* 鼠标放到进度条上显示手指标志*/
        
    }

    .volume_progress-passed{
        position: absolute;
        top:0;
        left:0;
        background: #409EFF;
    }

    .volume__dot{
        position: absolute;
        z-index: 50;
        left: 0;
        top: -3px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
    }

     /*进度条小点点*/
    .controller__dot {
        position: absolute;
        z-index: 50;
        left: 0;
        top: -8px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image:url(../../assets/222.jpg);
    }
    /*进度条小点点内部点点*/
    .controller__inner-dot {   
        width: 0px;
        height: 0px;
        border-radius: 50%;
        background-color: #409EFF;
    }
</style>

<!-- <template>
  <div class="container">
<el-container style="height: 450px; border: 1px solid #eee;border-radius:30px;">
  <el-aside width="300px" style="background-color: rgb(238, 241, 246);border-radius:30px;">
  	<div v-for="vv in videos" class="textleft directory">
  		{{vv.title}}
  	</div>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px;border-radius:30px;">
    </el-header>
    
    <el-main style="background-color:black">
      
    </el-main>
  </el-container>
</el-container>
</el-container>
</div>
</template>

<script>
  export default {
    data() {
      const video= {
        title:'okokok'
      };
      return {
         videos: Array(20).fill(video)
      }
    }
  };
</script>

<style scoped>
.container{
  margin-top: 90px;
  margin-left: 60px;
  margin-right: 60px;
}
.directory{
	font-size: 20px;
	margin-top: 1em;
	margin-left: 1em;
	font-weight: 200;
}
.textleft{
	text-align: left;
}
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  .el-aside {
    color: #333;
  }
</style>
 -->