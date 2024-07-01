document.getElementById("last-romaji").addEventListener("input", function () {
    this.value = this.value.toUpperCase();
});

document.getElementById("first-romaji").addEventListener("input", function () {
    this.value = this.value.toUpperCase();
});

function createNameCard() {
    const lastName = document.getElementById("last-name").value;
    const firstName = document.getElementById("first-name").value;
    const lastRomaji = document.getElementById("last-romaji").value;
    const firstRomaji = document.getElementById("first-romaji").value;
    const occupation = document.getElementById("occupation").value;
    const email = document.getElementById("email").value;
    const url = document.getElementById("url").value;
    const github = document.getElementById("github").value;
    const twitter = document.getElementById("twitter").value;
    const instagram = document.getElementById("instagram").value;

    if (!lastName || !firstName || !lastRomaji || !firstRomaji || !occupation || !email) {
        alert("必須項目をすべて入力してください。");
        return;
    }

    if (!validateEmail(email)) {
        alert("メールアドレスの形式が正しくありません。");
        return;
    }

    const nameCardContainer = document.getElementById("nameCardContainer");
    nameCardContainer.innerHTML = `
    <table class="name-card-front" id="nameCardFront">
        <tr>
            <td colspan="2"><br>${occupation}<br></td>
        </tr>
        <tr>
            <td colspan="2" style="font-size: 1.5em;"><br>
                ${lastName}<span> </span>${firstName}
                <span style="font-size: 0.6em;">${lastRomaji}<span> </span>${firstRomaji}</span>
            </td>
        </tr>
        <tr>
            <td>
                ${email ? `<strong><i class="fas fa-envelope"></i> </strong>${email}<br>` : ''}
                ${url ? `<strong><i class="fas fa-link"></i> </strong>${url}<br>` : ''}
                ${github ? `<strong><i class="fab fa-github"></i> </strong>${github}<br>` : ''}
                ${twitter ? `<strong><i class="fa-brands fa-x-twitter"></i> </strong>${twitter}<br>` : ''}
                ${instagram ? `<strong><i class="fab fa-instagram"></i> </strong>${instagram}<br>` : ''}
            </td>
            <td>
            <div class="shape">
                <div class="shape-1"></div>
                <div class="shape-2"></div>
                <div class="shape-3"></div>
                </div>
            </td>
        </tr>
    </table>
    <br>
    <br>
    <div class="name-card-back" id="nameCardBack">
        <div class="name-card-back-row">
            <img src="./assets/logo.png" alt="Logo" style="width:300px;height:auto;">
        </div>
    </div>
    `;

    document.querySelector('.output').scrollIntoView({ behavior: 'smooth' });
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}

function changeDesign(design) {
    const cardFront = document.querySelector('.name-card-front');
    const cardBack = document.querySelector('.name-card-back');
    const shapes = document.querySelectorAll('.shape-1, .shape-2, .shape-3');
    let textColor, backgroundColor, gradient;

    switch (design) {
        case 'design1':
            backgroundColor = 'white';
            textColor = 'black';
            gradient = 'linear-gradient(110deg, #fff 75%, #ddd 25%)';
            break;
        case 'design2':
            backgroundColor = 'black';
            textColor = 'gold';
            gradient = 'linear-gradient(110deg, #000 75%, #FFD700 25%)';
            break;
        case 'design3':
            backgroundColor = '#5462E9';
            textColor = 'white';
            gradient = 'linear-gradient(110deg, #5462E9 75%, #FFD700 25%)';
            break;
        case 'design4':
            backgroundColor = 'rgb(242, 114, 254)';
            textColor = 'white';
            gradient = 'linear-gradient(110deg, rgb(242, 114, 254) 75%, rgb(200, 50, 200) 25%)';
            break;
        default:
            backgroundColor = '';
            textColor = '';
            gradient = '';
    }

    cardFront.style.backgroundColor = backgroundColor;
    cardFront.style.color = textColor;
    cardBack.style.background = gradient;
    cardBack.style.color = textColor;
    shapes.forEach(shape => shape.style.backgroundColor = textColor);
}

function downloadPDF() {
    const scale = 2;
    const nameCardFront = document.getElementById('nameCardFront');
    const nameCardBack = document.getElementById('nameCardBack');

    html2canvas(nameCardFront, { scale }).then(canvas => {
        const imgData = canvas.toDataURL('image/jpeg');
        const pdf = new jsPDF('landscape', 'mm', [180, 110]);
        pdf.addImage(imgData, 'JPEG', 0, 0, 180, 110);
        pdf.save('name_card_front.pdf');
    });

    html2canvas(nameCardBack, { scale }).then(canvas => {
        const imgData = canvas.toDataURL('image/jpeg');
        const pdf = new jsPDF('landscape', 'mm', [180, 110]);
        pdf.addImage(imgData, 'JPEG', 0, 0, 180, 110);
        pdf.save('name_card_back.pdf');
    });
}