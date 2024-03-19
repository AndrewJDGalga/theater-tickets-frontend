const seatHost = document.querySelector('#theater--seats_host');
const zoomBtn = document.querySelector('#theater--zoom');

const seatCount = 66;

const genSeats = ({numSeats, seatClass})=>{
    const seatsFrag = document.createDocumentFragment();
    for(let i = 0; i < numSeats; i++) {
        const seat = document.createElement('button');
        seat.classList.add(seatClass);
        seatsFrag.append(seat);
    }
    return seatsFrag;
}

window.onload = () =>{
    seatHost.append(genSeats({numSeats:seatCount, seatClass:'theater--seat'}));

    zoomBtn.onclick = () => {
        seatHost.classList.toggle('double-em');
        for(let child of seatHost.children){
            child.classList.toggle('one-em');
        }
    }
}