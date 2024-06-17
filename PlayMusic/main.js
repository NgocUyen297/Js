var $ = document.querySelector.bind(document)
var $$ = document.querySelectorAll.bind(document)

var heading = $('header h2')
var cdThumb = $('.cd-thumb')
var audio  = $('#audio')
var btnPlay = $('.btn-toggle-play')
var player = $('.player')
var progress = $('#progress')
var nextBtn = $('.btn-next')
var prevBtn = $('.btn-prev')
var randomBtn = $('.btn-random')
var repeatBtn = $('.btn-repeat')
var playList = $('.playlist')

const PLAYER_STORAGE_KEY = 'Ngoc Uyen'
const app = {
    currentIndex: 0, 
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    setConfig: function(key, value){
        this.config[key] = value
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    loadConfig: function(){
        app.isRandom = app.config.isRandom
        app.isRepeat = app.config.isRepeat
    },
    songs: [
        {
            name:'Gone', 
            singer: 'Roses',
            path: './music/gone-roses.mp3',
            image: './asset/musicThumnail/musicthumnail.webp'
        },
        {
            name:'Sick enough to die', 
            singer: 'Don\' know',
            path: './music/SickEnoughToDie-MCMongMellow-617420.mp3',
            image: './asset/musicThumnail/musicthumnail.webp'
        },
        {
            name:'Ngu han the ', 
            singer: 'Roses',
            path: './music/NguHeThan-VanNhanThinhThuYiXiaoJiangHu-6607010.mp3',
            image: './asset/musicThumnail/nguhethan.jpeg'
        },
        {
            name:'My Nhan Hoa Quyen', 
            singer: 'Don\' know',
            path: './music/MyNhanHoaQuyen-VanNhanThinhThuYiXiaoJiangHu-6833681.mp3',
            image: './asset/musicThumnail/mynhan.jpeg'
        },
        {
            name:'Gone', 
            singer: 'Roses',
            path: './music/gone-roses.mp3',
            image: './asset/musicThumnail/musicthumnail.webp'
        },
        {
            name:'Sick enough to die', 
            singer: 'Don\' know',
            path: './music/SickEnoughToDie-MCMongMellow-617420.mp3',
            image: './asset/musicThumnail/musicthumnail.webp'
        },
        {
            name:'Ngu han the ', 
            singer: 'Roses',
            path: './music/NguHeThan-VanNhanThinhThuYiXiaoJiangHu-6607010.mp3',
            image: './asset/musicThumnail/nguhethan.jpeg'
        },
        {
            name:'My Nhan Hoa Quyen', 
            singer: 'Don\' know',
            path: './music/MyNhanHoaQuyen-VanNhanThinhThuYiXiaoJiangHu-6833681.mp3',
            image: './asset/musicThumnail/mynhan.jpeg'
        },
        {
            name:'Gone', 
            singer: 'Roses',
            path: './music/gone-roses.mp3',
            image: './asset/musicThumnail/musicthumnail.webp'
        },
        {
            name:'Sick enough to die', 
            singer: 'Don\' know',
            path: './music/SickEnoughToDie-MCMongMellow-617420.mp3',
            image: './asset/musicThumnail/musicthumnail.webp'
        },
        {
            name:'Ngu han the ', 
            singer: 'Roses',
            path: './music/NguHeThan-VanNhanThinhThuYiXiaoJiangHu-6607010.mp3',
            image: './asset/musicThumnail/nguhethan.jpeg'
        },
        {
            name:'My Nhan Hoa Quyen', 
            singer: 'Don\' know',
            path: './music/MyNhanHoaQuyen-VanNhanThinhThuYiXiaoJiangHu-6833681.mp3',
            image: './asset/musicThumnail/mynhan.jpeg'
        }
    ],
    render: function(){
        var html =  this.songs.map(function(song, index){
            return `<div class="song ${index == app.currentIndex ? 'active': ''}" data-index=${index}>
          <div
            class="thumb"
            style="
              background-image: url('${song.image}');
            "
          ></div>
          <div class="body">
            <h3 class="title">${song.name}</h3>
            <p class="author">${song.singer}</p>
          </div>
          <div class="option">
            <i class="fas fa-ellipsis-h"></i>
          </div>
        </div>`
        })
        playList.innerHTML = html.join('')
    },
    handelEvent: function(){
        const cd = $('.cd')
        const cdWith = cd.offsetWidth
        const _this =this
        // xử lý cd quay/ dừng
        var cdThumbAnimate = cdThumb.animate([{
            transform: 'rotate(360deg)'
        }], {
            duration: 1000,
            iterations: Infinity
        })
        cdThumbAnimate.pause()

        // Xử lý phóng to thu nhỏ CD 
        document.onscroll = function(){
           var scrollTop = window.scrollY || document.documentElement.scrollTop
           var newWidth = cdWith - scrollTop
           cd.style.width = newWidth  < 0 ? 0 : newWidth + 'px'
           cd.style.opacity = newWidth / cdWith
        } 
        // Xử lý khi bấn mút play
        btnPlay.onclick = function(){
            if(_this.isPlaying){
                audio.pause()
            }else{
                audio.play()
            }

            audio.onplay = function(){
                _this.isPlaying = true
                player.classList.add('playing')
                cdThumbAnimate.play()
            }

            audio.onpause = function(){
                _this.isPlaying = false
                player.classList.remove('playing')
                cdThumbAnimate.pause()
            }

            audio.ontimeupdate = function(){
              if(audio.duration){
                var progressPercent = Math.ceil((audio.currentTime/audio.duration)*100)
                progress.value = progressPercent
              }
            }
           
        }
        //  Xử lý khi tua 
        progress.onchange = function(event){
            // progress.value = ((event.target.value/audio.duration)*100)
            audio.currentTime =( audio.duration /100 ) * event.target.value
        }

        // Khi bấm nút next 
        nextBtn.onclick = function(){
            if(_this.isRandom){
                _this.randomSong()
            }else{
                app.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollActiveSong()
        } 

        // Khi bấm nút preve
        prevBtn.onclick = function(){
            if(_this.isRandom){
                _this.randomSong()
            }else{
            app.prevSong()
            }
            audio.play()
            _this.render()
            _this.scrollActiveSong()
        } 

        // Khi bấm nút random
        randomBtn.onclick = function(event){
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom)

            randomBtn.classList.toggle('active', _this.isRandom)
        }

        // xử lý khi audio ended
        audio.onended = function(){
           if(_this.isRepeat){
            audio.play()
           }else{
            nextBtn.click()
           }
        }

        // Xử lý khi bấm nút repeat
        repeatBtn.onclick = function(){
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat', _this.isRepeat)
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }
        
        // Xử lý chuyển bài khi bấm vào bài đó. 
        playList.onclick = function(event){
            var songNode = event.target.closest('.song:not(.active)')
            if(songNode &&  !event.target.closest('.option')){
                console.log()
                _this.currentIndex = Number(songNode.getAttribute('data-index'))
                _this.loadCurrentSong()
                _this.render()
                audio.play()
            }
        }
    },
    defineProperties: function(){
        Object.defineProperty(this, 'currentSong', {
            get: function(){
                return this.songs[this.currentIndex]
            }
        })
    },
    nextSong: function(){
        this.currentIndex++
        if(app.currentIndex >= app.songs.length){
            app.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    prevSong: function(){
        this.currentIndex--
        if(app.currentIndex <0){
            app.currentIndex = app.songs.length - 1
        }
        this.loadCurrentSong()
    },
    randomSong: function () {
        let newIndex; 
        do {
            newIndex = Math.ceil(Math.random()* this.songs.length)
            console.log(newIndex)
        }while(newIndex === this.currentIndex)
        app.currentIndex = newIndex
        app.loadCurrentSong()
    },
    loadCurrentSong: function(){
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
        audio.src = this.currentSong.path
    }, 
    scrollActiveSong: function(){
        setTimeout(()=>{
            $('.song.active').scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
        }, 300)
    },
    start: function(){
        //Load config
        this.loadConfig()
        // Định nghĩa các thuộc tính
       this.defineProperties()
       // Tải lên bài hát đầu tiên vào UI khi chạy app 
       this.loadCurrentSong()
       // Xử lý các sự kiện trên trang
        this.handelEvent()
        // render danh sách các bài hát
        this.render()

        //Hiển thị trạng thái ban đầu của repeat và random
        repeatBtn.classList.toggle('active', this.isRepeat)
        randomBtn.classList.toggle('active', this.isRandom)
    }
}

app.start()