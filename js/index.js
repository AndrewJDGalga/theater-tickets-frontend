const seatHost = document.querySelector('#theater--seats_host');
const zoomBtn = document.querySelector('#theater--zoom');

const seatCount = 66;

const seatCol = 11;
const seatRow = 6;

const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G','H','I','J'];

const genSeats = ({numSeats, seatClass})=>{
    const seatsFrag = document.createDocumentFragment();
    for(let y = 0; y < seatRow; y++){
        let col = rows[y];
        for(let x = 0; x < seatCol; x++){
            const seat = document.createElement('button');
            seat.classList.add(seatClass);
            seatsFrag.append(seat);
        }
    }
    /*
    for(let i = 0; i < numSeats; i++) {
        const seat = document.createElement('button');
        seat.classList.add(seatClass);
        //seat.dataset.row = 
        seatsFrag.append(seat);
    }*/
    return seatsFrag;
}

window.onload = () =>{
    const root = document.querySelector(':root');
    root.style.setProperty('--theater-row', seatRow.toString());
    root.style.setProperty('--theater-col', seatCol.toString());

    seatHost.append(genSeats({numSeats:seatCount, seatClass:'theater--seat'}));

    zoomBtn.onclick = () => {
        seatHost.classList.toggle('double-em');
        for(let child of seatHost.children){
            child.classList.toggle('one-em');
        }
        (zoomBtn.innerText == '+') ? zoomBtn.innerText = '-' : zoomBtn.innerText = '+';
    }
}