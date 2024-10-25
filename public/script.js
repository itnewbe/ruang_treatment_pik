const rooms = document.querySelectorAll(".room");
const totalRooms = rooms.length;
const totalRoomsDisplay = document.getElementById("totalRooms");
const usedRoomsDisplay = document.getElementById("usedRooms");
const availableRoomsDisplay = document.getElementById("availableRooms");

let roomData = {
  rooms: Array(totalRooms).fill({ nurseName: "", color: "green" }),
};

// Muat data dari file JSON
function loadRoomData() {
  fetch("/api/rooms")
    .then((response) => response.json())
    .then((data) => {
      roomData = data;
      rooms.forEach((room, index) => {
        const input = room.querySelector("input");
        const roomInfo = roomData.rooms[index];

        input.value = roomInfo.nurseName;
        room.classList.remove("green", "red");
        room.classList.add(roomInfo.color);
      });
      updateRoomStatus();
    });
}

// Perbarui status
function updateRoomStatus() {
  let usedRooms = 0;

  rooms.forEach((room) => {
    const input = room.querySelector("input");
    if (input.value.trim()) {
      usedRooms++;
    }
  });

  const availableRooms = totalRooms - usedRooms;

  usedRoomsDisplay.textContent = usedRooms;
  availableRoomsDisplay.textContent = availableRooms;
}

document.getElementById("submitButton").addEventListener("click", function () {
  rooms.forEach((room, index) => {
    const input = room.querySelector("input");
    const inputValue = input.value.trim();

    roomData.rooms[index].nurseName = inputValue;
    roomData.rooms[index].color = inputValue ? "red" : "green";

    room.classList.remove("green", "red");
    room.classList.add(roomData.rooms[index].color);
  });

  fetch("/api/rooms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(roomData),
  }).then((response) => {
    if (!response.ok) throw new Error("Network response was not ok");
    updateRoomStatus();
  });
});

document.getElementById("clearButton").addEventListener("click", function () {
  rooms.forEach((room, index) => {
    const input = room.querySelector("input");
    input.value = "";
    room.classList.remove("red");
    room.classList.add("green");
    roomData.rooms[index].nurseName = "";
    roomData.rooms[index].color = "green";
  });

  fetch("/api/rooms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(roomData),
  }).then((response) => {
    if (!response.ok) throw new Error("Network response was not ok");
    updateRoomStatus();
  });
});

// Muat data awal
loadRoomData();
