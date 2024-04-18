
document.getElementById('downloadLink').addEventListener('click', function(event) {
    event.preventDefault();
    var xhr = new XMLHttpRequest();
    xhr.open('GET', this.getAttribute('href'), true);
    xhr.responseType = 'blob';

    var messageDiv = document.getElementById('downloadMessage');
    messageDiv.innerText = 'Downloading file... Please wait....';

    setTimeout(function() {
        xhr.onload = function() {
            if (xhr.status === 200) {
                var blob = xhr.response;
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = 'resume.pdf';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                messageDiv.innerText = '';
            }
        };

        xhr.onprogress = function(event) {
            var percent = (event.loaded / event.total) * 100;
            console.log('Download progress: ' + percent + '%');
        };

        xhr.send();
    }, 2000);
});
