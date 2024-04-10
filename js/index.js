const seatHost = document.querySelector('#theater--seats_host');
const zoomBtn = document.querySelector('#theater--zoom');
const trailerBtn = document.querySelector('#movie--trailer');

const seatCol = 11;
const seatRow = 6;
const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G','H','I','J'];
const activeSeats = [];
const popups = [];

const showtimeParent = document.querySelector('#movie--showtimes');
const showtimes = ['11:30 am', '12:30 pm', '3:30 pm', '4:30 pm', '7:30 pm', '8:30 pm'];
const showtimeDays = 5;

const createSeat = (seatClass, row, col) => {
    const seat = document.createElement('button');
    seat.classList.add(seatClass);
    seat.dataset.seatRow = row;
    seat.dataset.seatCol = col;
    return seat;
}
const createPopUp = (popupClass, row, col) => {
    const popup = document.createElement('p');
    popup.innerText = `Row ${col} Seat ${row}`;
    popup.classList.add(popupClass);
    return popup;
}
const setSeatActive = (seat) => {
    if(!activeSeats.includes(seat)){
        seat.classList.toggle('selected-seat');
        activeSeats.push(seat);
    }else{
        const index = activeSeats.findIndex((anySeat)=>anySeat===seat);
        activeSeats[index].classList.toggle('selected-seat');
        activeSeats.splice(index,1);
    }
}

const genSeats = ({seatClass, column, row})=>{
    const seatsFrag = document.createDocumentFragment();
    for(let y = 0; y < row; y++){
        let col = rows[y];
        for(let x = 0; x < column; x++){
            const seat = createSeat(seatClass, x+1, col);

            popups.push(createPopUp('theater--seat--popup', x+1, col));

            seat.dataset.popupIndex = popups.length -1;
            seat.append(popups[popups.length-1]);
            seat.onclick = () => setSeatActive(seat);
            seat.onmouseenter = () => popups[seat.dataset.popupIndex].style.display = 'block';
            seat.onmouseleave = () => popups[seat.dataset.popupIndex].style.display = 'none';

            seatsFrag.append(seat);
        }
    }
    return seatsFrag;
}

window.onload = () =>{
    const root = document.querySelector(':root');
    root.style.setProperty('--theater-row', seatRow.toString());
    root.style.setProperty('--theater-col', seatCol.toString());

    seatHost.append(genSeats({seatClass:'theater--seat', column:seatCol, row:seatRow}));

    zoomBtn.onclick = () => {
        seatHost.classList.toggle('double-em');
        seatHost.classList.toggle('theater--seats--zoom');

        for(let child of seatHost.children){
            child.classList.toggle('one-em');
            
            for(let notice of child.children){
                notice.classList.toggle('theater--seat--popup');
                notice.classList.toggle('theater--seat--popup--zoom');
            }    
        }
        (zoomBtn.innerText == '+') ? zoomBtn.innerText = '-' : zoomBtn.innerText = '+';
    }


    const showtimeFrag = document.createDocumentFragment();

    const today = new Date();
    const fiveDays = [];
    for(let i = 0; i < 5; i++){
        const day = new Date(today.getFullYear(), today.getMonth(), today.getDate()+i);
        fiveDays.push(day);
    }
    
    for(let d = 0; d < showtimeDays; d++) {
        const selectElement = document.createElement('select');
        const labelElement = document.createElement('label');

        selectElement.id = 'move--showtimes--' + d;
        labelElement.htmlFor = selectElement.id;
        labelElement.innerText = (d != 0) ? fiveDays[d].toLocaleDateString() : 'Today ' + fiveDays[d].toLocaleDateString();
        
        for(let t = 0; t < showtimes.length; t++){
            const timeElement = document.createElement('option');
            timeElement.innerText = showtimes[t];
            selectElement.append(timeElement);
        }
        showtimeFrag.append(labelElement, selectElement);
    }
    showtimeParent.append(showtimeFrag);
}