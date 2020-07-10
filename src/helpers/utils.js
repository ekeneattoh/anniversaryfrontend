export function clearApiMsg(thisObj, clearFuntion) {
    setTimeout(() => {
        //close the dialog box
        thisObj.setState({ open: false });
        clearFuntion()
    }, 3000); //3 seconds
}