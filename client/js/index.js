// Initialize first project and career
let projNum = 0;
let careerNum = 0;

let $nextProject = $('.projects__nav--next');
let $prevProject = $('.projects__nav--prev');

let $nextCareer = $('.career__nav--next');
let $prevCareer = $('.career__nav--prev');

// Click events for projects
$nextProject.click(() => {
    if(projects[projNum + 1]) {
        projNum++;
        updateProject();
    }
});

$prevProject.click(() => {
    if(projects[projNum - 1]) {
        projNum--;
        updateProject();
    }
});

$('.projects__project__title').click(() => {
    let win = window.open(projects[projNum].link, '_blank');
    win.focus();
});

// Click events for careers
$nextCareer.click(() => {
    if(careers[careerNum + 1]) {
        careerNum++;
        updateCareer();
    }
});

$prevCareer.click(() => {
    if(careers[careerNum - 1]) {
        careerNum--;
        updateCareer();
    }
});

$('.contact__form').submit((e) => {
    e.preventDefault();                     //prevents automatic redirect to '/submit'
    sendEmail($('#email').val(), $('#message').val());
});

// Updates projects view
const updateProject  = function updateProjectInfo() {
    let $projectSelector = $('.projects__project');
    let projectsTemplate = `
            <div class="projects__project__title">
                <a href='${projects[projNum].link}'>${projects[projNum].title}</a>
            </div>
            <div class="projects__project__stack">${projects[projNum].stack}</div>
            <div class="projects__project__desc">${projects[projNum].desc}</div>`;

    $projectSelector.animate({'opacity': 0}, 400, function(){
        $(this).html(projectsTemplate).animate({'opacity': 1}, 400);
    });

    projects[projNum + 1] ?
        $nextProject.addClass("projects__nav--black") :
        $nextProject.removeClass("projects__nav--black");

    projects[projNum - 1] ?
        $prevProject.addClass("projects__nav--black") :
        $prevProject.removeClass("projects__nav--black");
};

// Updates career view
const updateCareer = function updateCareerInfo() {
    let $careerAbtSelector = $('.career__about');
    let $careerImgSelector = $('.career__img');

    let careerImg = careers[careerNum].img;
    let imgDisplay = careerImg ? '' : 'hidden';

    let careerAbtTemplate = `
            <div class="career__about__title">${careers[careerNum].company}</div>
            <div class="career__about__date">${careers[careerNum].date}</div>
            <div class="career__about__desc">${careers[careerNum].desc}</div>`;

    let careerImgTemplate = `<img src="${careerImg || ''}" alt="company logo" class="career__img__src ${imgDisplay}">`;

    $careerAbtSelector.animate({'opacity': 0}, 400, function(){
        $(this).html(careerAbtTemplate).animate({'opacity': 1}, 400);
    });

    $careerImgSelector.animate({'opacity': 0}, 400, function(){
        $(this).html(careerImgTemplate).animate({'opacity': 1}, 400);
    });

    if (careers[careerNum + 1]) {
        $nextCareer.addClass("projects__nav--black");
        (new Image()).src = careers[careerNum+1].img;
    }
    else {
        $nextCareer.removeClass("projects__nav--black");
    }

    careers[careerNum - 1] ?
        $prevCareer.addClass("projects__nav--black") :
        $prevCareer.removeClass("projects__nav--black");
};

function sendEmail(email, msg) {
    $.ajax({
        type: 'POST',
        url: '/email',
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        data: {
            email: email,
            msg: msg
        },
        success: () => {
            console.log("Success!");
            $('#contact__form').trigger('reset');
        },
        error: (err) => {
            console.log(err);
            alert("Sorry, something went wrong. Please try to contact me another way.")
        }
    });

}

updateCareer();
updateProject();