document.addEventListener("DOMContentLoaded", function () {
    function scheduleFakeCall() {
        const callerName = document.getElementById("caller-name").value || "Unknown Caller";
        const delay = parseInt(document.getElementById("call-delay").value) * 1000;

        setTimeout(() => {
            document.getElementById("fake-caller").textContent = `${callerName} is calling...`;
            document.getElementById("incoming-call").classList.remove("hidden");
            document.getElementById("fake-ringtone").play();
        }, delay);
    }

    function answerCall() {
        document.getElementById("incoming-call").classList.add("hidden");
        document.getElementById("active-call").classList.remove("hidden");
        document.getElementById("fake-ringtone").pause();
        document.getElementById("fake-voice").play();
    }

    function declineCall() {
        document.getElementById("incoming-call").classList.add("hidden");
        document.getElementById("fake-ringtone").pause();
    }

    function endCall() {
        document.getElementById("active-call").classList.add("hidden");
        document.getElementById("fake-voice").pause();
    }

    window.scheduleFakeCall = scheduleFakeCall;
    window.answerCall = answerCall;
    window.declineCall = declineCall;
    window.endCall = endCall;
});
