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
    $('.projects__project__title').html(`<a href="${projects[projNum].link}">${projects[projNum].title}</a>`);
    $('.projects__project__stack').text(projects[projNum].stack);
    $('.projects__project__desc').text(projects[projNum].desc);

    let next = $('.projects__nav--next');
    let prev = $('.projects__nav--prev');

    projects[projNum + 1] ? next.addClass("projects__nav--black") : next.removeClass("projects__nav--black");
    projects[projNum - 1] ? prev.addClass("projects__nav--black") : prev.removeClass("projects__nav--black");
}

// Updates career view
function updateCareerInfo() {
    $('.career__about__title').text(careers[careerNum].company);
    $('.career__about__about').text(careers[careerNum].date);
    $('.career__about__desc').text(careers[careerNum].desc);

    let careerImg = careers[careerNum].img;
    let imageTag = $('.career__img__src');

    careerImg ? imageTag.removeClass('hidden').attr('src', careerImg) : imageTag.addClass('hidden');

    let next = $('.career__nav--next');
    let prev = $('.career__nav--prev');

    careers[careerNum + 1] ? next.addClass("projects__nav--black") : next.removeClass("projects__nav--black");
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