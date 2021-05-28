var privateKey, publicKey, file, fileName, signature;

function sign() {
  var sign = new JSEncrypt();
  sign.setPrivateKey(privateKey);
  var signature = sign.sign(file, CryptoJS.SHA1, "sha1");
  download(fileName, signature);
}

function verify() {
  var verify = new JSEncrypt();
  verify.setPublicKey(publicKey);
  var verified = verify.verify(file, signature, CryptoJS.SHA1);
  display(verified);
}

function display(verified) {
  if (verified) {
    swal("¡Verificado!", "El mensaje pertenece a la persona", "success");
  } else {
    swal("Error", "No se puede verificar la identidad del emisor", "error");
  }
}

function readFile(e, callback) {
  let reader = new FileReader();
  let file = e.files[0];

  reader.onload = function () {
    callback(reader.result);
  };

  reader.readAsText(file);
}

function download(filename, content) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function getPrivateKey(key) {
  privateKey = key;
}

function getPublicKey(key) {
  publicKey = key;
}

function getSignature(file) {
  signature = file;
}

function getFile(file) {
  fileName = document.getElementById('file').files[0].name;
  let result = fileName.split(".");
  result[0] += "_sign";
  fileName = result[0] + "." + result[1];

  file = file;
}