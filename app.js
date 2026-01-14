import { auth, createUserWithEmailAndPassword, updateProfile, RecaptchaVerifier, onAuthStateChanged, signOut, signInWithEmailAndPassword, sendEmailVerification, GoogleAuthProvider, signInWithPopup, provider, sendPasswordResetEmail } from "./firebase.js"
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const signUpBtn = document.getElementById("signUpBtn");
const logoutBtn = document.getElementById("logoutBtn")
const logInBtn = document.getElementById("logInBtn")
const signInGoogleBtn = document.getElementById("signInGoogleBtn")
const forgotBtn = document.getElementById("forgotBtn")
const backToLoginBtn = document.getElementById("backToLogin")
const FacebookBtn = document.getElementById("FacebookBtn")
const sendEmailPasswoedChangeBtn = document.getElementById("sendEmailPasswoedChangBtn")
const container = document.getElementById("product-list");
const categoryFilter = document.getElementById("categoryFilter");
const emailSendMessage = document.getElementById("email-send-mssg");



const validatePassword = () => {
    const pass = document.getElementById("password").value;
    let upper = document.getElementById("upper")
    let lower = document.getElementById("lower")
    let number = document.getElementById("number")
    let special = document.getElementById("special")
    let length = document.getElementById("length")

    upper.style.color =
        /[A-Z]/.test(pass) ? "green" : "red";
    upper.innerHTML =
        /[A-Z]/.test(pass) ? "✔ " + upper.innerText.slice(2)
            : "❌ " + upper.innerText.slice(2);

    lower.style.color =
        /[a-z]/.test(pass) ? "green" : "red";
    lower.innerHTML =
        /[a-z]/.test(pass) ? "✔ " + lower.innerText.slice(2)
            : "❌ " + lower.innerText.slice(2);

    number.style.color =
        /[0-9]/.test(pass) ? "green" : "red";
    number.innerHTML =
        /[0-9]/.test(pass) ? "✔ " + number.innerText.slice(2)
            : "❌ " + number.innerText.slice(2);

    special.style.color =
        /[!@#$%^&*]/.test(pass) ? "green" : "red";
    special.innerHTML =
        /[!@#$%^&*]/.test(pass) ? "✔ " + special.innerText.slice(2)
            : "❌ " + special.innerText.slice(2);

    length.style.color =
        pass.length >= 6 ? "green" : "red";
    length.innerHTML =
        pass.length >= 6 ? "✔ " + length.innerText.slice(2)
            : "❌ " + length.innerText.slice(2);
}

const checkConfirmPassword = () => {
    const confirmPassword = document.getElementById("confirm-password")
    const pass = document.getElementById("password").value;
    const msg = document.getElementById("confirm-msg");

    msg.innerText = confirmPassword.value === ""
        ? ""
        : pass === confirmPassword.value
            ? "Passwords match ✔"
            : "Passwords do not match ❌";

    msg.style.color =
        confirm.value === ""
            ? ""
            : pass === confirmPassword.value
                ? "green"
                : "red";
}
if (password) {
    password.addEventListener("input", validatePassword)
}
if (confirmPassword) {
    confirmPassword.addEventListener("input", checkConfirmPassword)
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(user)
    } else {
        console.log("user not found")
    }
});

const signUp = () => {
    const email = document.getElementById("email").value
    const confirmPassword = document.getElementById("confirm-password").value
    const password = document.getElementById("password").value
    const fullName = document.getElementById("fullName").value

    if (confirmPassword === password && fullName != "") {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
                console.log(user)
                sendEmailVerif();
                window.location.href = "./dashboard.html"
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
                // ..
            });
    } else {
        alert("please fill all info")
    }
}
if (signUpBtn) {
    signUpBtn.addEventListener("click", signUp)
}


const logOut = () => {
    signOut(auth).then(() => {
        console.log("Sign-out successful.")
        window.location.href = "./index.html"

    }).catch((error) => {
        console.log(error.message)
    });
}

if (logoutBtn) {
    logoutBtn.addEventListener("click", logOut)
}


const logIn = () => {
    const email = document.getElementById("login-email").value
    const password = document.getElementById("login-password").value
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user)
            window.location.href = "./dashboard.html"
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage)
        });
}

if (logInBtn) {
    logInBtn.addEventListener("click", logIn)
}

// sendEmailVerification 

const sendEmailVerif = () => {
    console.log(auth.currentUser)
    sendEmailVerification(auth.currentUser)
        .then(() => {
            alert("email verification sent")
        })
        .catch((error) => {
            console.log(error.message)
        }
        )
}

// sendEmailVerification end

// signInWithGoogle

const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log(credential, user, token)
            window.location.href = "./dashboard.html"
        }).catch((error) => {
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(credential, error.message)

        });
}

if (signInGoogleBtn) {
    signInGoogleBtn.addEventListener("click", signInWithGoogle)
}

// signInWithGoogle end




// forget-page and function 

const forgetBox = () => {
    const loginBox = document.getElementById("login-box")
    const forgetPasswordBox = document.getElementById("forget-passwordBox")
    loginBox.style.display = "none"
    forgetPasswordBox.style.display = "block"
}

if (forgotBtn) {
    forgotBtn.addEventListener("click", forgetBox)
}

const backToLogin = () => {
    const loginBox = document.getElementById("login-box")
    const forgetPasswordBox = document.getElementById("forget-passwordBox")
    const email = document.getElementById("forgetEmail")
    email.value = ""
    email.style.display = "block"
    sendEmailPasswoedChangeBtn.style.display = "block"
    emailSendMessage.style.display = "none"
    forgetPasswordBox.style.display = "none"
    loginBox.style.display = "block"
}

if (backToLoginBtn) {
    backToLoginBtn.addEventListener("click", backToLogin)
}

// forget-page and function end

let facebook = () => {
    alert("Not avialable yet")
}

if (FacebookBtn) {
    FacebookBtn.addEventListener("click", facebook)
}


const sendEmailToForgetPassword = () => {
    const email = document.getElementById("forgetEmail")
    sendPasswordResetEmail(auth, email.value)
        .then(() => {
            email.value = ""
            email.style.display = "none"
            sendEmailPasswoedChangeBtn.style.display = "none"
            emailSendMessage.style.display = "block"
        })
        .catch((error) => {
            console.log(error.message)
        });
}

if (sendEmailPasswoedChangeBtn) {
    sendEmailPasswoedChangeBtn.addEventListener("click", sendEmailToForgetPassword)
}




let allProducts = [];
if (container) {
    let produtsFetch = async () =>{
    awit fetch("https://dummyjson.com/products")
        .then(res => res.json())
        .then(res => {
            allProducts = res.products;
            console.log(allProducts)
            renderProducts(allProducts);
            loadCategories(allProducts);
        })
        .catch(err => console.error(err));

    const renderProducts = (products) => {
        container.innerHTML = "";

        products.forEach(product => {
            container.innerHTML += `
            <div class="product-card">
                <div class="image-box">
                  <img src="${product.images[0]}" alt="${product.title}">
                </div>
                <h4>${product.title}</h4>
                <div class="price">$${product.price}</div>
                <button>Add to Cart</button>
            </div>
        `;
        });
    }
        produtsFetch() 
    }

    const loadCategories = (products) => {
        const categories = ["all", ...new Set(products.map(p => p.category))];

        categories.forEach(cat => {
            const option = document.createElement("option");
            option.value = cat;
            option.textContent = cat.toUpperCase();
            categoryFilter.appendChild(option);
        });
    }

    categoryFilter.addEventListener("change", () => {
        const value = categoryFilter.value;

        if (value === "all") {
            renderProducts(allProducts);
        } else {
            const filtered = allProducts.filter(
                product => product.category === value
            );
            renderProducts(filtered);
        }
    });
}

















