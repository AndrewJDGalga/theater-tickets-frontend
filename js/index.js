const seatHost = document.querySelector('#theater--seats_host');

const seatCount = 66;

window.onload = () =>{
    const seatsFrag = document.createDocumentFragment();
    for(let i = 0; i < seatCount; i++) {
        const seat = document.createElement('button');
        seat.classList.add('theater--seat');
        seatsFrag.append(seat);
    }
    seatHost.append(seatsFrag);
}