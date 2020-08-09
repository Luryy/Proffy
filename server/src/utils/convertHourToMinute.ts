export default function convertHourToMinute(time:string){
    const [hour, minutes] = time.split(':').map(Number);
    const total = (hour * 60 + minutes);

    return total
}