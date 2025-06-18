export default function validate(arr){
    const error = [] 
    arr.forEach(prop => {
        if(!prop||prop.trim()===''){
            error.push(prop)
        }
    });
    return error
}
