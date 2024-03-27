const seatHost = document.querySelector('#theater--seats_host');
const zoomBtn = document.querySelector('#theater--zoom');

//const seatCount = 66;

const seatCol = 11;
const seatRow = 6;

const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G','H','I','J'];

let activeSeat;

const genSeats = ({seatClass, column, row})=>{
    const seatsFrag = document.createDocumentFragment();
    for(let y = 0; y < row; y++){
        let col = rows[y];
        for(let x = 0; x < column; x++){
            const seat = document.createElement('button');
            seat.classList.add(seatClass);
            seat.dataset.seatRow = x+1;
            seat.dataset.seatCol = col;

            const popup = document.createElement('p');
            popup.innerText = `Row ${seat.dataset.seatCol} Seat ${seat.dataset.seatRow }`;
            popup.classList.add('theater--seat--popup');

            seat.append(popup);
            
            seat.onclick = () => {
                if(activeSeat !== popup){
                    (activeSeat) && (activeSeat.style.display = 'none');
                    activeSeat = popup;
                    activeSeat.style.display = 'block';
                } else { 
                    activeSeat.style.display = (activeSeat.style.display === 'block') ? 'none' : 'block';
                }
            }

            seatsFrag.append(seat);
        }
    }
    return seatsFrag;
}

window.onload = () =>{
    const root = document.querySelector(':root');
    root.style.setProperty('--theater-row', seatRow.toString());
    root.style.setProperty('--theater-col', seatCol.toString());

    const box = document.querySelector('.theater--screen--seats');

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
}