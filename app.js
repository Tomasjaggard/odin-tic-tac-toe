const playerFactory = (name, shape) =>{
    const getName = () => name;
    const getShape = () => shape
    return {getName, getShape}
}