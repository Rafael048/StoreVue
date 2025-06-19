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
    return{
        sameData
    }
}