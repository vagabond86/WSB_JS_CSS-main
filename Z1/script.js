function prepareObject() {
    const form = document.getElementById("element-form");
    const data = new FormData(form);

    const object = {};
    for (let el of data.entries()) {
        object[el[0]] = el[1];
    }

    return object;
}

function addElement() {

    const object = prepareObject();

    const valid = validate(object);
    if (!valid) {
        return;
    }

    const newPre = document.createElement("pre");
    newPre.className = "column half-column element";
    newPre.innerText = JSON.stringify(object, null, 2);

    document.getElementById("db").append(newPre);
}


function validate(object) {

    // walidujemy wszystkie pola
    const validNumber = validateNumber(object.number);
    const validRadio = validateRadio(object.favouriteNumber);
    const validPassword = validatePassword(object.password);
    const validRepeatedPassword = validateRepeatedPassword(object.password, object.password2);

    // zwracamy wynik walidacji - że formularz ją przeszedł, wszystkie pola muszą być wypełnione poprawnie
    return validNumber && validRadio && validPassword && validRepeatedPassword;
}

function validateNumber(number) {

    // walidujemy numer, podany w argumencie - w tym wypadku sprawdzamy, czy jest większy lub równy 0
    const valid = number >= 0;

    // odszukujemy na stronie odpowiednie pole - input, w którym został wpisany numer
    const input = document.querySelector("input[name='number']");

    if (valid) {
        // jeśli numer pasuje do wzorca - usuwamy ewentualne komunikaty walidacyjne, jeśli są

        // ustawiamy pustą klasę - w razie jakby input był wcześniej oznaczony na czerwono
        input.className = "";

        const nameMessage = document.getElementById("number-input-message");
        if (nameMessage) {
            //jeśli wyświetla się komunikat - usuwamy go
            nameMessage.parentElement.removeChild(nameMessage);
        }
    } else {
        // numer nie pasuje do wzorca - dodajemy komunikaty walidacyjne, jeśli ich nie ma

        // dodajemy inputowi klasę, która oznacza, że coś z nim nie tak
        input.className = "invalid";

        // sprawdzamy, czy wyświetla się komunikat o błędzie w polu z numerem
        if (!document.getElementById("number-input-message")) {
            // tworzymy element, który będzie mówił o błędzie w wybranym polu
            const small = document.createElement("small");
            small.id = "number-input-message"; // nadajemy id - potem dzięki niemu dostaniemy się do elementu, żeby go usunąć
            small.className = "invalid"; // nadajemy klasę - żeby był czerwony
            small.innerText = "Niepoprawny numer - dopuszczalna tylko dodatnia liczba"; // dodajemy tekst, który wyświetli się użytkownikowi

            // doczepiamy element jako "rodzeństwo" inputa
            input.parentElement.appendChild(small);
        }
    }

    // zwracamy wynik walidacji
    return valid;
}

function validateRadio(radio) {
    const valid = radio !== undefined;
    if (valid) {
        const input = document.querySelector("input[name='favouriteNumber']:checked");
        input.className = "";

        const nameMessage = document.getElementById("radio-input-message");
        if (nameMessage) {
            nameMessage.parentElement.removeChild(nameMessage);
        }
    } else {
        const input = document.querySelector("input[name='favouriteNumber']");
        input.className = "invalid";

        if (!document.getElementById("radio-input-message")) {
            const small = document.createElement("small");
            small.id = "radio-input-message";
            small.className = "invalid";
            small.innerText = "Wybierz jedną z opcji";

            input.parentElement.appendChild(small);
        }
    }
    return valid;

}

function validatePassword(password) {
    const valid = password.length >= 8;

    if (valid) {
        const input = document.querySelector("input[name='password']");
        input.className = "";

        const nameMessage = document.getElementById("password-input-message");
        if (nameMessage) {
            nameMessage.parentElement.removeChild(nameMessage);
        }
    } else {
        const input = document.querySelector("input[name='password']");
        input.className = "invalid";

        if (!document.getElementById("password-input-message")) {
            const small = document.createElement("small");
            small.id = "password-input-message";
            small.className = "invalid";
            small.innerText = "Hasło musi zawierać co najmniej 8 znaków"

            input.parentElement.appendChild(small)
        }
    }
    return valid;
}

function validateRepeatedPassword(password, repeatedPassword) {
    const valid = password === repeatedPassword;

    if (valid) {
        const input = document.querySelector("input[name='password2']");
        input.className = "";

        const nameMessage = document.getElementById("repeated-password-input-message");
        if (nameMessage) {
            nameMessage.parentElement.removeChild(nameMessage);
        }
    } else {
        const input = document.querySelector("input[name='password2']");
        input.className = "invalid";

        if (!document.getElementById("repeated-password-input-message")){
            const small = document.createElement("small");
            small.id = "repeated-password-input-message";
            small.className = "invalid";
            small.innerText = "Podane hasła się różnią"

            input.parentElement.appendChild(small)
        }
    }
    return valid;
}