
export default function (dom) {
    const video = dom.querySelector('video');
    const local = dom.querySelector('.sidebar .bottom p');
    const price = dom.querySelector('.footer .right span');
    const logoImg = dom.querySelector('.sidebar .top img');
    const text = dom.querySelector('.sidebar .top p');
    const nextBtn = dom.querySelector('#next');
    let destino1;
    let preco1;
    let video1;
    let destino2;
    let preco2;
    let video2;

    let currentSlide = 0;
    nextBtn.addEventListener('click', setSlide);

    function init() {
        const timer = setInterval(setSlide, 30000);
        fetch("app/data/settings.json")
        .then(res => res.json())
        .then(jsondata => {
        setPage(jsondata.holidays[0]);});
    }

    function setPage(data){
        logoImg.src = data.logo;
        text.textContent = data.texto;
        destino1 = data.destino1;
        preco1 = data.preco1;
        video1 = data.video1;
        destino2 = data.destino2;
        preco2 = data.preco2;
        video2 = data.video2;
        setSlide();
    }

    function setSlide() {
        let currentData = [];
        switch (currentSlide) {
            case 0:
            currentSlide = 1;
            currentData[0] = video1;
            currentData[1] = destino1;
            currentData[2] = preco1;
                break;
            case 1:
            currentSlide = 0;
            currentData[0] = video2;
            currentData[1] = destino2;
            currentData[2] = preco2;
                break;
        }
        update(currentData);
        console.log(currentData);
    }

    function update(string){
        video.src = string[0];
        local.textContent = string[1];
        price.textContent = string[2];
    }

    init()
}

