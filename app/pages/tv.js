

export default function (dom) {
    const rssapp = dom.querySelector('.footer iframe');
    const logoImg = dom.querySelector('.logo img');
    const hider = dom.querySelector('.hider');
    const hiderSpan = dom.querySelector('.hider span');
    const weather = dom.querySelector('.weatherwidget-io');
    const clock = dom.querySelector('.clock');

    let ytVideo
    
    hider.addEventListener('click', function () {
        hiderSpan.innerHTML = '';
    })

    function init() {
        fetch("app/data/settings.json")
        .then(res => res.json())
        .then(jsondata => {
        setPage(jsondata.tv[0]);});      
    }

    function setPage(data){
        logoImg.src = data.logo;
        rssapp.src = data.rssapp;
        ytVideo = data.ytID; 
        weather.href="https://forecast7.com/pt/41d53n8d78/" + data.weatherCity.toLowerCase() + "/";
        weather.dataset.label_1 = data.weatherCity.toUpperCase();
        weather.textContent = data.weatherCity.toUpperCase() + " WEATHER";
    }   
    
    !function (d, s, id) {
        let js, fjs = d.getElementsByTagName(s)[0];
        if (!d.getElementById(id)) {
            js = d.createElement(s);
            js.id = id;
            js.src = 'https://weatherwidget.io/js/widget.min.js'; fjs.parentNode.insertBefore(js, fjs);
        }
    }(document, 'script', 'weatherwidget-io-js');
    
    function showTime(){
        const date = new Date();
        let hour = date.getHours();
        let min = date.getMinutes();
        let day = date.getDate();
        let mon = date.getMonth();
        let year = date.getFullYear();
    
        hour = (hour < 10) ? "0" + hour : hour;
        min = (min < 10) ? "0" + min : min;
        day = (day < 10) ? "0" + day : day;
        mon = (mon < 10) ? "0" + (mon + 1) : (mon + 1);
        
        const time = hour + ":" + min + "<br>" + day + "/" + mon + "/" + year;
        clock.innerHTML = time;
    
        setTimeout(showTime, 1000);
    }

    let player;

    function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
            videoId: ytVideo,
            playerVars: {
                autoplay: 1,        // Auto-play the video on load
                controls: 0,        // Show pause/play buttons in player
                showinfo: 0,        // Hide the video title
                modestbranding: 1,  // Hide the Youtube Logo
                loop: 0,            // Run the video in a loop
                fs: 0,              // Hide the full screen button
                cc_load_policy: 0, // Hide closed captions
                iv_load_policy: 3,  // Hide the Video Annotations
                autohide: 0         // Hide video controls when playing
            },
            events: {
                onReady: function (e) {
                    e.target.mute();
                }
            }
        });
    };
    
    showTime();

    init();

    }