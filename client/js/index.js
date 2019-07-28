// Initialize first project and career
let projNum = 0;
let careerNum = 0;

updateProjectInfo();
updateCareerInfo();

// Click events for projects
$('.projects__nav--next').click(() => {
    if(projects[projNum + 1]) {
        projNum++;
        updateProjectInfo();
    }
});

$('.projects__nav--prev').click(() => {
    if(projects[projNum - 1]) {
        projNum--;
        updateProjectInfo();
    }
});

$('.projects__project__title').click(() => {
    let win = window.open(projects[projNum].link, '_blank');
    win.focus();
});

// Click events for careers
$('.career__nav--next').click(() => {
    if(careers[careerNum + 1]) {
        careerNum++;
        updateCareerInfo();
    }
});

$('.career__nav--prev').click(() => {
    if(careers[careerNum - 1]) {
        careerNum--;
        updateCareerInfo();
    }
});

$('.contact__form').submit((e) => {
    e.preventDefault();                     //prevents automatic redirect to '/submit'
    sendEmail($('#email').val(), $('#message').val());
});

// Updates projects view
function updateProjectInfo() {
    let next = $('.projects__nav--next');
    let prev = $('.projects__nav--prev');
    let projectSelector = $('.projects__project');

    let projectsTemplate = `
            <div class="projects__project__title">
                <a href='${projects[projNum].link}'>${projects[projNum].title}</a>
            </div>
            <div class="projects__project__stack">${projects[projNum].stack}</div>
            <div class="projects__project__desc">${projects[projNum].desc}</div>`;

    projectSelector.animate({'opacity': 0}, 400, function(){
        $(this).html(projectsTemplate).animate({'opacity': 1}, 400);
    });

    projects[projNum + 1] ? next.addClass("projects__nav--black") : next.removeClass("projects__nav--black");
    projects[projNum - 1] ? prev.addClass("projects__nav--black") : prev.removeClass("projects__nav--black");
}

// Updates career view
function updateCareerInfo() {
    let next = $('.career__nav--next');
    let prev = $('.career__nav--prev');
    let careerAbtSelector = $('.career__about');
    let careerImgSelector = $('.career__img');

    let careerImg = careers[careerNum].img;
    let imgDisplay = careerImg ? '' : 'hidden';

    let careerAbtTemplate = `
            <div class="career__about__title">${careers[careerNum].company}</div>
            <div class="career__about__date">${careers[careerNum].date}</div>
            <div class="career__about__desc">${careers[careerNum].desc}</div>`;

    let careerImgTemplate = `<img src="${careerImg || ''}" alt="company logo" class="career__img__src ${imgDisplay}">`;

    careerAbtSelector.animate({'opacity': 0}, 400, function(){
        $(this).html(careerAbtTemplate).animate({'opacity': 1}, 400);
    });

    careerImgSelector.animate({'opacity': 0}, 400, function(){
        $(this).html(careerImgTemplate).animate({'opacity': 1}, 400);
    });

    if (careers[careerNum + 1]) {
        next.addClass("projects__nav--black");
        (new Image()).src = careers[careerNum+1].img;
    }
    else {
        next.removeClass("projects__nav--black");
    }

    careers[careerNum - 1] ? prev.addClass("projects__nav--black") : prev.removeClass("projects__nav--black");
}

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