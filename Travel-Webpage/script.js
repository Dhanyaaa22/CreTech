document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    const submitBooking = document.getElementById("submitBooking");
    submitBooking.addEventListener("click", () => {
        const checkIn = document.getElementById("checkin").value;
        const checkOut = document.getElementById("checkout").value;
        const adults = document.getElementById("adults").value;
        const children = document.getElementById("child").value;

        if (!checkIn || !checkOut || !adults) {
            alert("Please fill in all fields.");
            return;
        }

        if (new Date(checkIn) >= new Date(checkOut)) {
            alert("Check-out date must be after check-in date.");
            return;
        }

        alert(`Booking Confirmed!\nCheck-In: ${checkIn}\nCheck-Out: ${checkOut}\nAdults: ${adults}\nChildren: ${children}`);
    });

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });
});