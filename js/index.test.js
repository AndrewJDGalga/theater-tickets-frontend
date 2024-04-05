
test('tomorrow from today', ()=> {
    const today = new Date();
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDay()+1);
    expect(tomorrow.getDate()).toBe(5);
})
test('next month from today', ()=>{
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth(), today.getDay()+28);
    expect(nextMonth.getDate()).toBe(2);
});