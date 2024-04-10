document.addEventListener("DOMContentLoaded", function() {
    const sortByOptions = document.getElementById("sortByOptions");
    const rooms = document.querySelectorAll(".room");

    sortByOptions.addEventListener("change", function() {
        const selectedOption = sortByOptions.value;
        const sortByAddress = selectedOption === "all" ? "" : selectedOption;

        rooms.forEach(room => {
            const roomAddress = room.getAttribute("data-address");
            const roomSize = room.getAttribute("data-size");
            const roomCapacity = room.getAttribute("data-capacity");

           
            if (sortByAddress === "" || roomAddress === sortByAddress ||
                (roomAddress === "all" && selectedOption.startsWith("add"))) {
                room.style.display = ""; 
            } else if (selectedOption === roomSize || selectedOption === roomCapacity) {
                room.style.display = ""; 
            } else {
                room.style.display = "none";
            }
        });
    });
});
