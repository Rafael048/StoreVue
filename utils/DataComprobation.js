export default function dataComprobation(){
    function sameData(oldValue, newValues){
        const data = {}
        const propertyNames = Object.getOwnPropertyNames(newValues)
        propertyNames.forEach(property=>{
            if(oldValue[property]){
                if(oldValue[property]!=newValues[property]){
                        data[property] = newValues[property]
                }
            }
        })
        return data
    }
    function isEmail(email){
        if(email.includes('@')&&email.includes('.')){
            return true
        }else{
            return false
        }
    }
    function isPhoneNumber(phone){
        if(phone.length===8){
            return true
        }else{
            return false
        }
    }
    return{
        sameData, isEmail, isPhoneNumber
    }
}