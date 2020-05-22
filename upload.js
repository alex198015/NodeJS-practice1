function uploadFile(event){
    let target = event.target || event.srcElement || event.currentTarget;
    console.log(target)
    let file = target.files[0];
    let xhr =new XMLHttpRequest();
    xhr.open('POST', '/uploads/' + file.name, true );
    xhr.setRequestHeader('Content-Type', 'application/octet-stream')
    xhr.onreadystatechange = function(){
        event = null;
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                console.log('success');
                
            } else{
                console.log('error');
                
            }
        }
    }
    xhr.send(file)
    event.target.value = "";
}

document.querySelector('#send').addEventListener('change',uploadFile)