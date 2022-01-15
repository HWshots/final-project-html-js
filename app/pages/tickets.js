

export default function (dom) {
    const images = dom.querySelectorAll('.slide img');
    const rssapp = dom.querySelector('.footer iframe');
    const logoImg = dom.querySelector('.logo img');
    const title = dom.querySelector('.title');
    const clock = dom.querySelector('.clock');

    let slideIndex = 0;

    function init() {
        fetch("app/data/settings.json")
        .then(res => res.json())
        .then(jsondata => {
        setPage(jsondata.tickets[0]);});
        const timer = setInterval(showSlides, 5000);        
    }

    function setPage(data){
        logoImg.src = data.logo;
        title.textContent = data.title;
        rssapp.src = data.rssapp;
        images[0].src = data.image1;
        images[1].src = data.image2;
        images[2].src = data.image3;
        
    }    
    
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
    
    showTime();

    
    

    function showSlides() {
        let i;
        const slides = document.getElementsByClassName("slide");
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1}    
            slides[slideIndex-1].style.display = "block";     
    }
    init();
        
    }