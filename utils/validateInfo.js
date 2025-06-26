export default function validate(arr){
    const error = [] 
    arr.forEach(prop => {
        if(!String(prop)||String(prop).trim()===''){
            error.push(prop)
        }
    });
    return error
}
