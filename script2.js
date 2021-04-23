window.addEventListener('load', function () {
    const requestURL = 'https://swapi.dev/api/people/';
    const buttons = document.querySelectorAll('#btn');
    const infoDiv = document.querySelectorAll('#info-divs');
    const infoDivClassName = document.querySelectorAll('.info-divs');
    const up = document.querySelector('#up');
    const down = document.querySelector('#down');
    const popup = document.querySelector('.popup');
    const preloader = document.querySelector('.preloader')
    const body = document.body;

    // ------------------------------------------------------------------------------------------------------------------------------------------------------------

    function createSound() {
        const hoverSound = new Audio();
        hoverSound.src = 'sound/hover-sound.mp3';
        hoverSound.autoplay = true;
        hoverSound.volume = 0.05;
    }

    // ------------------------------------------------------------------------------------------------------------------------------------------------------------

    function setClickSound() {
        body.addEventListener('click', (e) => {
            let target = e.target;

            if (target.localName === 'input') {
                createSound();
            }
        })
    }
    setClickSound()

    // ------------------------------------------------------------------------------------------------------------------------------------------------------------

    function slideButtons(index) {
        for (let i = 0; i < buttons.length; i++) {
            if (i > 4) {
                buttons[i].style.display = 'none';
            }
        }

        down.addEventListener('click', () => {
            if (index <= 4) {
                buttons[index].style.display = 'none';
                buttons[index + 5].style.display = 'flex';
                index++;
            }
            createSound();
        })

        up.addEventListener('click', () => {
            if (index > 0) {
                buttons[index + 4].style.display = 'none';
                buttons[index - 1].style.display = 'flex';
                index--;
            }
            createSound();
        })
    }
    slideButtons(0)

    // ------------------------------------------------------------------------------------------------------------------------------------------------------------

    function getAllInfo() {
        return new Promise((resolve, reject) => {
            fetch(requestURL)
                .then((response) => response.json())
                .then((data) => {

                    let resArray = data.results;

                    for (let [index, item] of resArray.entries()) {
                        let name = item.name;
                        let planetURL = item.homeworld;
                        let filmURL = item.films;
                        let speciesURL = item.species;
                        let newButtonsArr = Array.from(buttons);

                        newButtonsArr[index].value = name;
                        newButtonsArr[index].addEventListener('click', (e) => {
                            let target = e.target;

                            switch (target.value) {
                                case 'Luke Skywalker':
                                    body.style.backgroundImage = 'url(img/luke_skywalker.jpg)';
                                    break;
                                case 'C-3PO':
                                    body.style.backgroundImage = 'url(img/C-3PO.jpg)';
                                    break;
                                case 'R2-D2':
                                    body.style.backgroundImage = 'url(img/R2-D2.jpg)';
                                    break;
                                case 'Darth Vader':
                                    body.style.backgroundImage = 'url(img/darth_vader.jpg)';
                                    break;
                                case 'Leia Organa':
                                    body.style.backgroundImage = 'url(img/leia_organa.jpg)';
                                    break;
                                case 'Owen Lars':
                                    body.style.backgroundImage = 'url(img/owen_lars.jpg)';
                                    break;
                                case 'Beru Whitesun lars':
                                    body.style.backgroundImage = 'url(img/beru_whitesun_lars.jpg)';
                                    break;
                                case 'R5-D4':
                                    body.style.backgroundImage = 'url(img/R5-D4.jpg)';
                                    break;
                                case 'Biggs Darklighter':
                                    body.style.backgroundImage = 'url(img/biggs_darklighter.jpg)';
                                    break;
                                case 'Obi-Wan Kenobi':
                                    body.style.backgroundImage = 'url(img/obi-wan_kenobi.jpg)';
                                    break;
                            }

                            if (name == resArray[index].name) {
                                infoDiv[0].innerHTML = `Name: \b<span style = "color: rgb(0, 255, 179)">${resArray[index].name}</span>`;
                                infoDiv[1].innerHTML = `Birthday year: \b<span style = "color: rgb(0, 255, 179)">${resArray[index].birth_year}</span>`;
                                infoDiv[2].innerHTML = `Gender: \b<span style = "color: rgb(0, 255, 179)">${resArray[index].gender}</span>`;

                                let filmsStr = '';

                                for (let [index, item] of filmURL.entries()) {
                                    new Promise((resolve, reject) => {
                                        fetch(item)
                                            .then(response => response.json())
                                            .then(data => {
                                                filmsStr += data.title + ' || ';
                                                infoDiv[3].innerHTML = `Films: <span style = "color: rgb(0, 255, 179)">${filmsStr}</span>`;
                                                resolve();
                                            })
                                            .catch(error => reject(error));
                                    })
                                }

                                getPlanet('GET', planetURL)
                                    .then(planet => { infoDiv[4].innerHTML = `Planet: \b<span style = "color: rgb(0, 255, 179)">${planet}</span>`; })
                                getSpecies('GET', speciesURL)
                                    .then($species => { infoDiv[5].innerHTML = `Species: \b<span style = "color: rgb(0, 255, 179)">${$species}</span>`; })
                                    .catch(() => {
                                        infoDiv[5].innerHTML = `Species: \b<span style = "color: rgb(0, 255, 179)">Human</span>`;
                                    })
                            }

                            for (let item of infoDivClassName) {
                                item.classList.toggle('info-divs-visible');

                                setTimeout(() => {
                                    item.classList.add('info-divs-visible')
                                }, 500);
                            }
                        })
                    }
                    if (data) {
                        preloader.classList.add('preloader-unvisible');
                        function showPopup() {
                            setTimeout(() => {
                                popup.classList.add('popup-visible')
                            }, 5000)

                            popup.addEventListener('click', () => {
                                popup.classList.remove('popup-visible')
                            })
                        }
                        showPopup()
                    }
                    resolve();
                },
                    (error) => {
                        reject(error);
                    })
        })
    }
    getAllInfo()

    // ------------------------------------------------------------------------------------------------------------------------------------------------------------

    function getPlanet(method, url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    resolve(data.name);
                },
                    (error) => {
                        reject(error);
                    })
        })
    }

    // ------------------------------------------------------------------------------------------------------------------------------------------------------------

    function getSpecies(method, url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    resolve(data.name);
                },
                    (error) => {
                        reject(error);
                    })
        })
    }
})